# Uzayda İtki Laboratuvarı (Space Propulsion Lab)

An animated, interactive course on space physics and propulsion, in Turkish, written in plain HTML5 Canvas and JavaScript with no build step.

## What it is

A static website: a curriculum home page (`index.html`) linking 36 interactive lessons in `dersler/`, from Newton's laws, momentum and the rocket equation through ion thrusters, solar sails, orbital mechanics, black holes, gravitational waves, tides and seasons. Lessons share an animation engine (`ortak/fizik.js`). Two extra pages, `haberler/` (science news) and `arsiv/` (arXiv astro-ph archive), are fed by JSON data that GitHub Actions refreshes daily.

## Why it exists

From the repo's own text (`docs/ROADMAP.md`): to build a visual space-physics documentation that explains the science to children and everyone, and to follow scientific papers regularly. The original README below describes the course's goal of progressing from basic physics to designing an unconventional propulsion system.

## Contents

| Path | What it is |
| --- | --- |
| `index.html` | Curriculum home page |
| `dersler/` | The 36 lesson pages (`01-eylemsizlik.html` ... `36-atmosfer-aurora.html`) |
| `ortak/` | Shared styles and the animation engine `fizik.js` |
| `haberler/`, `arsiv/` | News page and paper archive page |
| `data/papers.json` | Daily-updated arXiv astro-ph paper list |
| `scripts/fetch-papers.mjs` | Fetches new astro-ph papers from the arXiv API (no key needed) into `data/papers.json` |
| `scripts/translate-news.mjs` | Fetches space news and translates it to child-friendly Turkish with the Anthropic API (needs `ANTHROPIC_API_KEY`) |
| `.github/workflows/` | `papers.yml` (daily 08:00 UTC) and `news.yml` (daily 06:00 UTC) cron jobs that run the scripts and commit the result |
| `docs/` | `ROADMAP.md` (vision, lesson plan) and `AI-KNOWLEDGE-BASE.md` (real engine data) |

## How to run / use

```bash
# open index.html in a browser: no dependencies, no build, no network needed for the lessons
node scripts/fetch-papers.mjs      # refresh data/papers.json (arXiv API)
node scripts/translate-news.mjs    # needs ANTHROPIC_API_KEY in the environment; exits quietly without it
```

## Tech stack

Vanilla HTML5 Canvas and JavaScript, Node.js scripts (ES modules), GitHub Actions, arXiv API, Anthropic API (news translation).

## Status

Active: the last commit is 2026-10-31 (an automated daily arXiv update). The original README below lists only lessons 01-04; the repo now holds 36 lessons and `docs/ROADMAP.md` tracks what comes next.

## Related repos

None referenced in the repository.

---

## Original README content (Turkish)


En basit fizik yasalarından başlayıp, sıra dışı bir uzay itki sistemi tasarlamaya doğru ilerleyen, **animasyonlu interaktif bir kurs**. Tamamen vanilla HTML5 Canvas + JavaScript — bağımlılık yok, build yok, internet gerekmez.

## Çalıştırma
`index.html` dosyasını tarayıcıda aç. Hepsi bu.

## Yapı
```
index.html              müfredat / ana sayfa
ortak/
  style.css             ortak stiller
  fizik.js              yeniden kullanılabilir animasyon motoru
dersler/
  01-eylemsizlik.html   Newton 1
  02-etki-tepki.html    Newton 3
  03-momentum.html      momentum korunumu (coilgun / mass driver)
  04-itki-kutle-hiz.html  itki = m × v, yakıt ekonomisi (interaktif)
```

## Motor (`ortak/fizik.js`)
Her ders motoru yükleyip `Lab.start(scenes, opts)` çağırır. Bir sahne:
```js
{ tab:'Sekme adı', html:'<h2>açıklama</h2>', loop:true, draw:(g,t)=>{ /* t: 0..1 */ } }
```
Motor; sekmeleri, canvas'ı, oynat/duraklat/hız kontrollerini, açıklama panelini ve canlı yıldız-alanı arka planını otomatik kurar.

**Hazır çizim yardımcıları:** `arrow, arrowXY, comLine, banner, label, ease, rrect, glowCircle, drawShip, drawSlug, drawAstro, drawBox, drawRocket, drawPlanet`. Sabitler: `F = {W, H, cx, midY}`.

Yeni ders eklemek = `dersler/` içine yeni bir HTML, `fizik.js`'i yükle, `Lab.start([...])` çağır.

## Yol Haritası
- [x] 01–04
- [ ] 05 Roket denklemi (Tsiolkovsky)
- [ ] 06 İyon thruster
- [ ] 07 Güneş yelkeni
- [ ] 08 Magsail
- [ ] 09 Özgün itki sistemi tasarımı (hedef)
