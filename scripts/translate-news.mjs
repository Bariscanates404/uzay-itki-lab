// Günlük: uzay haberlerini çek → Claude ile ÇOCUK-DOSTU Türkçeye çevir → data/news-tr.json yaz.
// Çalışma: GitHub Actions cron (bkz. .github/workflows/news.yml) veya elle: `node scripts/translate-news.mjs`
// Gereksinim: ortam değişkeni ANTHROPIC_API_KEY (GitHub Secrets). Anahtar yoksa sessizce çıkar →
//   site otomatik olarak canlı API + ücretsiz tarayıcı çevirisine düşer (bozulmaz).
// İsteğe bağlı: MODEL (varsayılan ucuz/hızlı haiku), LIMIT (haber sayısı).

import fs from 'node:fs/promises';

const KEY = process.env.ANTHROPIC_API_KEY;
if (!KEY) { console.log('ANTHROPIC_API_KEY yok — AI çeviri atlandı (site ücretsiz çeviriye düşecek).'); process.exit(0); }

const MODEL = process.env.MODEL || 'claude-haiku-4-5-20251001';
const LIMIT = +(process.env.LIMIT || 18);

// 1) Haberleri çek
const res = await fetch(`https://api.spaceflightnewsapi.net/v4/articles/?limit=${LIMIT}&ordering=-published_at`);
const data = await res.json();
const items = data.results.map(a => ({
  title: a.title, summary: (a.summary || '').slice(0, 320),
  news_site: a.news_site, published_at: a.published_at, url: a.url, image_url: a.image_url
}));

// 2) Tek istekte toplu çeviri (çocuk-dostu)
const prompt =
`Aşağıdaki uzay/uzay-bilim haberlerini Türkçeye çevir. Her haber için 8-12 yaş arası bir çocuğun
anlayacağı sadelikte, merak uyandıran kısa bir başlık (tr_title) ve EN FAZLA 2 cümlelik sade bir
özet (tr_summary) yaz. Teknik terimleri sadeleştir ama yanlış bilgi verme. SADECE şu biçimde geçerli
bir JSON dizisi döndür, başka hiçbir şey yazma:
[{"i":0,"tr_title":"...","tr_summary":"..."}]

Haberler:
${items.map((a, i) => `${i}. ${a.title}\n${a.summary}`).join('\n\n')}`;

const r = await fetch('https://api.anthropic.com/v1/messages', {
  method: 'POST',
  headers: { 'x-api-key': KEY, 'anthropic-version': '2023-06-01', 'content-type': 'application/json' },
  body: JSON.stringify({ model: MODEL, max_tokens: 4000, messages: [{ role: 'user', content: prompt }] })
});
if (!r.ok) { console.error('Anthropic hata:', r.status, await r.text()); process.exit(1); }
const j = await r.json();
const txt = j.content.map(c => c.text || '').join('');
const arr = JSON.parse(txt.slice(txt.indexOf('['), txt.lastIndexOf(']') + 1));
for (const t of arr) { if (items[t.i]) { items[t.i].tr_title = t.tr_title; items[t.i].tr_summary = t.tr_summary; } }

// 3) Yaz
await fs.mkdir('data', { recursive: true });
await fs.writeFile('data/news-tr.json', JSON.stringify({ generated: new Date().toISOString(), model: MODEL, items }, null, 2));
console.log(`data/news-tr.json yazıldı — ${items.length} haber, model ${MODEL}.`);
