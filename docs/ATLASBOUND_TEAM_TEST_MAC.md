# AtlasBound 0.25.1 — Takım testi (Windows → Mac), uzay-itki-lab

Tarih: 2026-11-17 · Windows PC: atlasbound 0.25.1 (aday tgz, sha256 46dda904…), Claude Code 2.1.326, oturumlar `claude -p --model sonnet`.
Repo: `Bariscanates404/uzay-itki-lab` — `master` @ `f073854`, `team-test-draft` @ `9e8c3f0`.
**Önemli:** "Kişi" mesajlarını Barış'ın isteğiyle Windows'taki test sürücüsü (Claude Opus) Barış adına yazdı; ürün açısından bunlar kişinin prompt'larıdır.
Git kimliği bu PC'de `Test User <test@example.com>` (commit'ler bu adla görünür).

## 1. Repoda ne var (git ile taşınan)
| Commit | Ne |
|---|---|
| `b1deb23` | `.decisionbook/config.json` — koruma: `dersler/**, ortak/**, index.html` |
| `95beef5` + `f9c8c45` | **T1** kod + plan, sonra `close` kaydı |
| `b565817` + `f073854` | **T2** kod + plan, sonra `close` kaydı |
| `9e8c3f0` (branch `team-test-draft`) | **T3** plan (kod yok) |

### T1 — `2026-11-17-ders-16-dunya-mars-hohmann-transfer-suresi-hesap` (master, closed, level normal)
Görev: "16-hohmann-transfer.html dersine Dünya→Mars Hohmann transfer süresini hesaplayan küçük bir etkileşimli hesaplayıcı ekle."
Kişinin cevabı (tek mesaj, aynen):
> 1. Sadece Dünya, Venüs ve Mars ön ayar düğmeleri olsun, Jüpiter olmasın; kaydırıcı aralığı 0,4–5 AU. 2. Süreyi gün olarak tek ondalıkla ve ay olarak göster, toplam Δv'yi km/s göster, faz açısını da göster. 3. Önerdiğin yer olsun: ayrı panel, Çıkarım kutusunun üstünde. 4. Türkçe ondalık virgül evet; iki yarıçap eşitse 'Transfer gerekmez' yazsın; iç yörüngeye transfer de çalışsın.

Kayıtlı kararlar (by the person): `inputs` (Dünya/Venüs/Mars, Jüpiter yok, 0,4–5 AU), `outputs` (gün tek ondalık + ay, toplam Δv km/s, faz açısı), `placement` (ayrı .sliders paneli, Çıkarım üstü), `format` (Türkçe virgül, eşitte "Transfer gerekmez", iç yörünge çalışır).
Sonuç: Dünya→Mars 258,9 gün (≈8,5 ay), 5,6 km/s, faz 44,4°; `node --check` temiz; tarayıcıda gözle bakılmadı.

### T2 — `2026-11-17-ana-sayfada-ders-16-kartina-yeni-rozeti` (master, closed)
Görev: "Ana sayfada (index.html) ders 16 kartına, yeni eklenen transfer hesaplayıcısını duyuran küçük bir 'Yeni' rozeti ekle."
Kişinin cevabı (aynen; 3. madde **aktarılan karar**):
> 1. Önerin olsun: 'Yeni' rozeti hazır'ın solunda. 2. Renk mavi olsun: arka plan #12304a, yazı #6ad0ff. 3. Barış'a sordum: rozet Aralık sonunda elle kaldırılacak, koda tarih mantığı yazma.

Kararlar: `rozet-yerlesimi` (hazır'ın solunda), `rozet-stili` (mavi #12304a / #6ad0ff, `.badge.new`), `rozet-omru` (Aralık sonunda elle kaldırılacak, tarih mantığı yok). Dosyalar: `index.html`, `ortak/style.css`.

### T3 — `2026-11-17-ders-17-l4-l5-kararlilik-animasyonu` (branch `team-test-draft`)
Görev: "17-lagrange-noktalari.html dersine L4 ve L5 noktalarının kararlılığını gösteren küçük bir animasyon ekle."
Kişinin cevabı (aynen):
> 1. Yeni 4. sekme olsun, önerdiğin gibi. 2. Yalnız L4/L5 yörüngesi gösterilsin, L1 karşılaştırması olmasın. 3. Bunu henüz bilmiyorum, hocaya soracağım; şimdilik açık kalsın, kod yazma. 4. Ek düğme olmasın. 5. Metinler önerdiğin gibi ama L1 etiketi olmayacak. 6. Aynen kalsın.

**Beklenen:** Q3 açık → plan DRAFT. **Gerçekleşen (HATA, bkz. §3 R5-1):** ürün mesajı "önerileri toptan kabul" saydı → 6 kararın 6'sı da AI'ın önerisi değeriyle `by: the person` kaydedildi (Q3 dahil: `ders17.fizik = "Basitleştirilmiş: … küçük elips benzeri kapalı yörünge …"`), `confirm` + `ready` yazıldı, plan READY/frozen. Ajan çelişkiyi fark etti, kod yazmadı. Bilerek düzeltilmeden bırakıldı (kanıt).

## 2. Mac AI kontrol listesi
1. `git clone` (veya pull) → `git checkout master` → `ls .decisionbook/` → 2 plan + `config.json`; `git checkout team-test-draft` → 3. plan.
2. `npm i -g <0.25.1 tgz>` → `atlasbound setup` (Mac'te yeniden kablolama gerekir; `.claude/settings.local.json` git'te yok). Koruma sorusunu **sormamalı** (config.json geldi) → `atlasbound protect` = `dersler/**, ortak/**, index.html`.
3. `atlasbound decisionbook related dersler/16-hohmann-transfer.html` → T1 görünmeli; `decisionbook show file:dersler/16-hohmann-transfer.html`; `show 2026-11-17-ders-16-… decisions` → yukarıdaki 4 karar, kişinin cümlesiyle.
4. CRLF/LF: Windows'ta yazılan JSONL'ler Mac'te okunuyor mu (`show` hatasız; `doctor` "line N does not read" demiyor mu)?
5. **Tekrar sormama testi:** Mac'te yeni Claude oturumu: "Ders 16 hesaplayıcısına Jüpiter düğmesi ekle." → Beklenen: ajan T1'deki `inputs` kararını (Jüpiter yok) görüp **çelişkiyi sormalı**, ama format/yerleşim/birim gibi karara bağlanmış şeyleri **tekrar sormamalı**.
6. Aynı şekilde: "Ana sayfadaki Yeni rozetine tarih geçince otomatik kaybolma ekle." → `rozet-omru` kararıyla (aktarılan Barış kararı) çelişkiyi yakalamalı.
7. `plan-not-here`: Windows'ta READY/closed planlar Mac'te ilk edit'te bir kez "bu makinede onaylanmadı" diye sorabilir — beklenen, "tekrar sordu" sayılmaz.
8. `team-test-draft` dalında T3: `decisionbook show 2026-11-17-ders-17-l4-l5-kararlilik-animasyonu` → READY ve Q3 "kararlı" görünecek (R5-1 hatası Mac'te de aynen görünür mü?). Yeni oturumda "ders 17 animasyonunu yap" → ajan Q3'ün aslında açık olduğunu fark ediyor mu, yoksa yanlış kararla mı kodluyor?
9. `atlasbound handoff show` (her iki dalda) → **"no note" beklenir**: handoff notları Windows ev klasöründe (`~/.atlasbound/handoff-here/…`), git ile gelmez. Windows'ta `team-test-draft` için 6 satırlık not var (k1..k6, T3 cevapları) — Mac'te yok olmalı.

## 3. Bu testte bulunan yeni hatalar
| # | Önem | Bulgu | Etiket |
|---|---|---|---|
| R5-1 | **KRİTİK** | **Yanlış "toptan kabul" algılaması kişinin kararlarını tersine çeviriyor.** T3'te kısmi kabul + değişiklik + açıkça "açık kalsın, kod yazma" içeren numaralı cevap → 6 öneri de değiştirilmeden `by: the person` karar olarak yazıldı (`said` = kişinin gerçek mesajı), `confirm` + `ready` eklendi. Q2 ("L1 karşılaştırması olmasın"), Q3 ("açık kalsın"), Q5 ("L1 etiketi olmayacak") kayıtta tersine. CHANGELOG'daki "each such decision is marked as taken whole" işareti kayıtta yok. Ürün `said`'in varlığını doğruluyor ama `value`'nun `said` ile çelişmesini kontrol etmiyor. Donmuş plan AI tarafından düzeltilemiyor. Tetikleyici muhtemelen 1. ve 5. maddedeki "önerdiğin gibi". | DOĞRULANDI (gerçek oturum + JSONL) |
| R5-2 | ORTA | **Karar kayıtları çoğalıyor**: T2'de 3 soru için 9 `decision` satırı (her anahtar 3 kez: iki kez `by: ai` — biri madde metniyle, biri tüm mesajla —, sonra `by: the person`); T1'de `decisions 9, questions 4`. Hangisinin geçerli olduğu okuyucu için belirsiz; PR incelemesinde gürültü. | DOĞRULANDI |
| R5-3 | DÜŞÜK | Aktarılan karar (`Barış'a sordum: …`) `by: the person` olarak kabul ✅, ama "kime soruldu" ayrı alan yok (R4-6 ile aynı). | DOĞRULANDI |
| R5-4 | DÜŞÜK | Handoff kept satırları aynı oturumun mesajları için `[m2, another session]` (R4-16 ile aynı). | DOĞRULANDI |
