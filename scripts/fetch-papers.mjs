// Günlük: arXiv astro-ph kategorilerinden en yeni makaleleri çek → data/papers.json'a birleştir.
// GitHub Actions cron çalıştırır (.github/workflows/papers.yml). Yerel test: `node scripts/fetch-papers.mjs`
// Anahtar gerektirmez. arXiv API'sine saygılı: 3 sn'de bir istek (rate-limit).

import fs from 'node:fs/promises';

const CATS = ['astro-ph.GA', 'astro-ph.CO', 'astro-ph.SR', 'astro-ph.EP', 'astro-ph.HE', 'astro-ph.IM'];
const PER_CAT = 60;
const CAP = 8000;   // toplam makale sınırı (boyut kontrolü)

const sleep = ms => new Promise(r => setTimeout(r, ms));

async function fetchCat(cat) {
  const url = `https://export.arxiv.org/api/query?search_query=cat:${cat}&start=0&max_results=${PER_CAT}&sortBy=submittedDate&sortOrder=descending`;
  const r = await fetch(url, { headers: { 'User-Agent': 'uzay-itki-lab/1.0' } });
  if (!r.ok) { console.error('arXiv hata', cat, r.status); return []; }
  const text = await r.text();
  const entries = text.split('<entry>').slice(1);
  return entries.map(e => {
    const get = (re, d = '') => (e.match(re) || [])[1] || d;
    return {
      id: get(/<id>(.*?)<\/id>/),
      t: get(/<title>([\s\S]*?)<\/title>/).replace(/\s+/g, ' ').trim(),
      s: get(/<summary>([\s\S]*?)<\/summary>/).replace(/\s+/g, ' ').trim().slice(0, 420),
      p: get(/<published>(.*?)<\/published>/).slice(0, 10),
      a: [...e.matchAll(/<name>(.*?)<\/name>/g)].map(m => m[1]).slice(0, 3),
      c: cat
    };
  });
}

// mevcut JSON oku
let existing = { papers: [] };
try { existing = JSON.parse(await fs.readFile('data/papers.json', 'utf-8')); } catch (e) { console.log('papers.json yok, sıfırdan'); }
const existingIds = new Set(existing.papers.map(p => p.id));

// her kategoriden çek
const fresh = [];
for (const cat of CATS) {
  console.log('Fetching', cat);
  await sleep(3200);
  try { fresh.push(...await fetchCat(cat)); } catch (e) { console.error('err', cat, e.message); }
}

// dedupe + birleştir
const seen = new Set(existingIds);
const newOnes = fresh.filter(p => { if (seen.has(p.id)) return false; seen.add(p.id); return true; });
const allPapers = [...newOnes, ...existing.papers].slice(0, CAP);

const out = {
  generated: new Date().toISOString().slice(0, 10),
  count: allPapers.length,
  newToday: newOnes.length,
  categories: Object.fromEntries(CATS.map(c => [c, allPapers.filter(p => p.c === c).length])),
  papers: allPapers
};

await fs.mkdir('data', { recursive: true });
await fs.writeFile('data/papers.json', JSON.stringify(out));
console.log(`OK: ${allPapers.length} toplam · ${newOnes.length} yeni eklendi`);
