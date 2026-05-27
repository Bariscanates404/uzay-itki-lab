# Uzay İtki Sistemleri — Bilgi Tabanı (AI Knowledge Base)

> Bu dosya, projeyle çalışan her AI oturumunun **önce okuması** gereken referanstır. Gerçek itki sistemlerinin doğrulanmış sayıları, durumları, sorunları ve beklentileri. Kaynak: Wikipedia (2026-05 itibarıyla indekslendi). Gelecekte yeni ders/araç/tasarım yaparken buradaki sayıları kullan.

## Temel kavramlar
- **İtki (thrust):** anlık kuvvet (Newton). Kalkış ve hızlı manevra için yüksek olmalı.
- **Özgül itki (Isp):** verim — birim yakıtla ne kadar itki-süre. Saniye cinsinden. Yüksek Isp = az yakıtla çok Δv. `Isp ≈ egzoz_hızı / 9.81`.
- **Δv (delta-v):** bir görevin "hız bütçesi". Tsiolkovsky: `Δv = egzoz_hızı × ln(m0/mf)`. Hız doğrusal, yakıt **üstel** artar.
- **Temel kanun:** itki için mutlaka dışarı kütle (ya da foton) atılmalı. Reaksiyonsuz itki = imkansız (momentum korunumu).
- **Çelişki:** yüksek itki VE yüksek Isp'yi birden elde etmek zor; her motor bir denge noktası. (Tek istisna: nükleer pulse/Orion ikisini birden vaat etti.)

## Motor karşılaştırma tablosu

| Motor | İtki | Isp (s) | Güç | İtici | Durum (TRL) | Egzoz hızı |
|---|---|---|---|---|---|---|
| Kimyasal (LOX/LH2) | ~MN | ~450 | — | LOX/LH2 | Uçuyor (9) | ~4.4 km/s |
| Hall (HET) | 40–600 mN (lab 5.4 N) | ~1600 (1000–8000) | 1.35–100 kW | Xenon/Kripton | Yaygın uçuyor (9) | 10–80 km/s |
| Gridli İyon (NASA NEXT) | 237 mN | 4170 (0.5kW'ta 1320) | 0.5–6.9 kW | Xenon | Uçtu, DART 2021 (9) | ~40 km/s |
| VASIMR (VX-200) | ~5 N (hedef) | ~5000 | 200 kW | Argon | Yer testi, uçmadı (~5) | — |
| Nükleer Termal (NERVA/DRACO) | ~10⁵ N | 850–1000 | — (reaktör) | Sıvı H2 | Yer testi 1955-73; DRACO iptal 2025 (~5) | ~9 km/s |
| Direct Fusion Drive (PFRC) | 5–10 N / MW füzyon | ~10000 | +200 kW elektrik üretir | He-3 + Döteryum | Konsept/lab (~3) | — |
| Güneş Yelkeni (LightSail-2) | ~µN–mN | ∞ (yakıtsız) | 0 (ışık) | Yok | Uçtu 2019 (7) | c (ışık) |
| Nükleer Pulse (Orion) | MEGANEWTON | ~2000–3100 | — | Bomba | İptal 1963, test yasağı (~2) | 19–31 km/s |
| Antimadde | değişken | 1000–2000+ (termal) | — | Antimadde | Teorik (~1) | çok yüksek |

## Motor profilleri — sorun & beklenti

### 1. Kimyasal roket — TRL 9
- **Sayılar:** Isp ~450 s, meganewton itki, egzoz ~4.4 km/s.
- **Sorun:** Düşük Isp → roket denkleminin laneti, yakıtın çoğu yakıt taşımak için harcanır. Δv tavanı düşük.
- **Beklenti:** Yerden kalkış ve yüksek-itki gereken her şey. Derin uzayda verimsiz. Hep gerekli ama tek başına yetersiz.

### 2. Hall-effect thruster (HET) — TRL 9
- **Sayılar:** Isp ~1600 s, 1.35 kW→83 mN, lab'da 5.4 N'a kadar, 100 kW gösterildi, verim %45-60. Xenon/kripton/argon/iyot.
- **Sorun:** Boşaltma kanalı duvarlarının iyon erozyonu → ömür sınırı. Gridli iyondan düşük Isp.
- **Beklenti:** Uydu istasyon-tutma, Starlink, kargo çekicileri. Elektrikli itkinin iş atı. Krypton/iyot ile ucuzlama.

### 3. Gridli iyon — NASA NEXT — TRL 9
- **Sayılar:** 6.9 kW→237 mN, Isp 4170 s (0.5 kW'ta 1320 s), egzoz ~40 km/s. 48.000 saat (5.5 yıl) yer testi. DART (2021) ile uçtu. Toplam impuls 17 MN·s (rekor).
- **Sorun:** Çok düşük itki (manevra yavaş), bol elektrik ister (güneş paneli/reaktör), grid erozyonu.
- **Beklenti:** Derin uzay kargo, örnek-getirme, dış gezegen görevleri. Kanıtlanmış en verimli uçan motor.

### 4. VASIMR (Ad Astra, Chang-Díaz) — TRL ~5
- **Sayılar:** VX-200, 200 kW (30 kW helikon iyonlaştırma + 170 kW ICRH), argon. Hedef: ~5 N itki, Isp ~5000 s, verim %60-65 (oda-sıcaklığı süperiletken VARSA). **Değişken Isp** (itki↔verim ayarlanabilir).
- **Sorun:** Henüz yüksek itki gösterilemedi. Dev güç kaynağı (pratikte nükleer) gerek. Girdinin ~%60'ı atık ısı → ısı yönetimi. Plazmanın motordan gerçekten ayrıldığı kanıtlanmadı.
- **Beklenti:** Nükleer reaktörle eşleşirse hızlı insanlı Mars. Değişken Isp ile "vites" gibi: kalkışta itki, seyirde verim.

### 5. Nükleer Termal (NTR: NERVA, DRACO) — TRL ~5
- **Sayılar:** Katı çekirdek, sıvı H2 reaktörle ~2500°C'ye ısıtılır. Isp 850-1000 s (kimyasalın ~2 katı), yüksek itki (~10⁵ N). Egzoz ~9 km/s.
- **Sorun:** Radyoaktif, hiç uçmadı (1955-73 sadece yer testi). Reaktör test gereksinimleri + politika/bütçe. **DRACO (DARPA/NASA/Lockheed/BWXT) ~2027 hedefliyordu ama 2025'te iptal edildi.**
- **Beklenti:** İnsanlı Mars transit süresini yarıya indirme. Yüksek itki + iyi Isp dengesi; kimyasal ile elektrikli arası "tatlı nokta".

### 6. Direct Fusion Drive (DFD, Princeton PSS/PFRC) — TRL ~3
- **Sayılar:** He-3 + döteryum füzyonu (100 keV). MW füzyon başına 5-10 N itki, Isp ~10.000 s, ayrıca +200 kW elektrik üretir. Güç dağılımı: %35 itki, %30 elektrik, %25 ısı, %10 RF geri besleme.
- **Sorun:** Aneutronik füzyon henüz Q>1 başaramadı. He-3 Dünya'da çok nadir (Ay'dan/üretim). Reaktör boyutu/kütlesi.
- **Beklenti:** 1000 kg aracı Plüton'a 4 yılda. Varışta 2 MW güç (bilim + lazer haberleşme). Gerçekleşirse oyun değiştirici.

### 7. Güneş Yelkeni (IKAROS 2010, LightSail-2 2019) — TRL 7
- **Sayılar:** İtki µN-mN, Isp sonsuz (yakıt yok). İtki ∝ alan / Güneş-uzaklığı². Yansıtıcı = 2× itki.
- **Sorun:** İtki minicik, Güneş'ten uzaklaşınca zayıflar, dev yelken alanı gerek.
- **Beklenti:** Yakıtsız uzun görevler, istasyon-tutma, lazerle itilirse (Starshot) yıldızlararası.

## "Hayal" konseptler (TRL 1-2)
- **Nükleer Pulse / Orion:** arkada atom bombası. Yüksek itki + yüksek Isp birden (eşsiz). Nükleer test yasağı (1963) ile öldü.
- **Antimadde:** birim kütle başına bilinen en yüksek enerji. Gram üretmek ~imkansız & astronomik pahalı.
- **Bussard Ramjet:** yıldızlararası H'yi manyetik huniyle topla & füzyonla yak. Bremsstrahlung ışıma kaybı ~1 milyar kat fazla → mevcut haliyle imkansız.
- **Lazer Yelken / Starshot:** Dünya'dan 100 GW lazer, gramlık graphene yelken → ışık hızının %15-20'si, Alpha Centauri 20-30 yıl.

## Tasarım için çıkarımlar (gelecekte fikir üretirken)
1. **Boş köşe ara:** yüksek itki + yüksek Isp + düşük güç ihtiyacı kimsede yok. Oraya yaklaşan = değerli.
2. **Güç kaynağı çoğu zaman asıl darboğaz** (VASIMR, iyon): itki ∝ güç. Kompakt nükleer/füzyon güç her şeyi açar.
3. **Reaksiyon kütlesini dışarıdan al** (magsail, Bussard, yelken): yakıt taşıma derdini bitirir ama itki zayıf/koşullu.
4. **Değişken Isp** (VASIMR) gerçek bir kazanç: göreve göre itki↔verim ayarı.
5. **Atık ısı** uzayda gizli düşman: sadece ışımayla atılır, radyatör = ağırlık.

_Güncelleme: 2026-05-27. Kaynaklar context-mode'da indexli: vasimr, next-ion, hall-thruster, nuclear-thermal, direct-fusion-drive, orion-nuclear-pulse, breakthrough-starshot, antimatter-rocket, fusion-rocket, bussard-ramjet._
