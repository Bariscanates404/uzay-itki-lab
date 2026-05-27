# Yol Haritası & Vizyon

## Büyük hedef
Dünyanın en iyi **görsel uzay fiziği dokümantasyonu** + bilimsel makaleleri düzenli takip edip **çocuklara/herkese görselleştirerek** sunan bir site.

## Şu an (2026-05)
- 15 interaktif ders (eylemsizlik → warp → yörünge mekaniği), vanilla HTML5 Canvas, motor: `ortak/fizik.js`.
- Bilgi tabanı: `docs/AI-KNOWLEDGE-BASE.md` (gerçek motor verileri).

## Sıradaki içerik (Bölüm 6 · Yörünge Mekaniği — derinleşme)
- [x] 15 Kütle çekimi & yörüngeler (gerçek sim)
- [ ] 16 Kepler 3 yasası detay + yörünge elemanları (a, e, i, periapsis)
- [ ] 17 Hohmann transfer & yörünge manevraları (gezegenler arası rota)
- [ ] 18 Lagrange noktaları (L1-L5, JWST neden L2'de)
- [ ] 19 Üç cisim problemi & kaos
- [ ] 20 Atmosfer girişi, aerobraking, yörünge bozulması

## Bilim Haberleri Görselleştirici (yeni modül fikri)
Düzenli makale akışını çekip sade görsellerle sunmak. Veri kaynakları (ücretsiz API):
- **NASA APOD** (Astronomy Picture of the Day) — `api.nasa.gov` (DEMO_KEY veya ücretsiz key)
- **arXiv** astro-ph/gr-qc RSS/Atom feed — `export.arxiv.org/api/query`
- **NASA Image and Video Library** — `images-api.nasa.gov`
- **Spaceflight News API** — `api.spaceflightnewsapi.net` (haber akışı, key gerekmez)

**Mimari notu:** Statik site (şu anki yapı) tek başına otomatik güncellenemez — bir backend/cron ya da build-time fetch gerekir. Seçenekler:
1. **GitHub Actions cron** → her gün feed'leri çekip `data/*.json` üretir, site statik okur (bedava, basit). ÖNERİLEN ilk adım.
2. Vercel/Netlify serverless function → canlı fetch.
3. Supabase + edge function (kullanıcının diğer projeleri bu stack'te).

**Çocuk-dostu katman:** her makale için 1 cümle "ne oldu", 1 görsel/animasyon (fizik motoruyla), 1 "neden önemli". Türkçe + sade.

## Açık sorular (kullanıcıyla netleştir)
- Site herkese açık mı, yoksa kişisel mi? (deploy hedefi: Vercel?)
- Çocuk yaş aralığı? (görsel/dil seviyesi)
- Otomatik mi (cron) yoksa elle seçilmiş makaleler mi?
