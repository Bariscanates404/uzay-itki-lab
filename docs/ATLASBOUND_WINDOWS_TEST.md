# AtlasBound (DecisionBook + Handoff) — Windows test günlüğü

Amaç: `npm install -g atlasbound` ile kurulumu Windows 11'de denemek, bu repoda 2-3 gerçek iş
yaptırıp kararları kaydettirmek; sonra MacBook'taki AI bu repoyu çekip **kararlar / history
taşınıyor mu** kontrol edecek.

- Makine: Windows 11 Home 26200 · Node 25.6.1 · git 2.53.0.windows.1 · Claude Code 2.1.325 · shell: Git Bash
- Repo: `Bariscanates404/uzay-itki-lab` (doğrudan bu repo, kopya değil)
- Paket: atlasbound 0.25.0 (kaynak: github.com/Bariscanates404/decisionbook, tag v0.25.0)

## Adım adım

### 1. Kurulum — 2026-11-16
```
npm install -g atlasbound@0.25.0     # makinede 0.23.0 vardı, 952 ms'de yükseldi
```
- Sorun yok, soru sormadı.
- **BULGU B1:** `atlasbound --version` → `unknown` yazıyor (0.25.0 beklenirdi).

### 2. Setup — repo kökünde
```
cd uzay-itki-lab
atlasbound setup
```
Çıktı özeti:
- 6 hook + 4 komut/skill yazdı: `.claude/settings.local.json`, `.claude/commands/{decide,decisionbook,handoff}.md`, `.gitignore` bloğu.
- 6 "sadece bakan" komut için izin kuralı ekledi (prompt sormasın diye).
- Sadece `.gitignore` commit'lenecek; geri kalanı git dışında.
- **Sorduğu tek soru (AI'ya "sen cevaplama" diyor):**
  ```
  protect your source files?
    automatic: ortak/** (2 files), scripts/** (2 files)  ->  atlasbound protect --source
    choose: ...                                           ->  atlasbound protect "<path or glob>[,...]"
    not now:                                              ->  atlasbound protect --none
  ```
- **BULGU B2:** Otomatik seçim bu repo için yanlış hedef: asıl kaynak `dersler/*.html` (36 ders) ve `index.html`,
  ama "automatic" bunları görmüyor (HTML-ağırlıklı repolarda kaynak tespiti zayıf).
- **BULGU B3:** README "4 slash komut" diyor (`/resume-handoff` dahil), `.claude/commands/` altında 3 dosya var
  (`/resume-handoff` yok ya da başka yerde). Yeni oturumda kontrol edilecek.

### 3. Doctor
```
atlasbound doctor
```
- **BULGU B4 (Windows):** `paths failed: ENOENT`, `gate answering failed: the hook did not answer: ENOENT`,
  `on PATH: no atlasbound on PATH` (oysa `where atlasbound` buluyor). **Ama hook'u elle Git Bash'te
  çalıştırınca doğru JSON döndü** → hook'lar çalışıyor; doctor'ın Windows probu yanlış alarm veriyor
  (muhtemelen `spawn` .cmd/PATHEXT'i bulamıyor).
- **BULGU B5:** `release files: no MANIFEST.json: a checkout, not a release` — npm kurulumunda MANIFEST.json VAR.
- **BULGU B6:** `~/.atlasbound is open to others (666)` — Windows'ta POSIX izinleri anlamsız; uyarı gürültü.
- Hook komutları POSIX sh (`[ -x "C:\Program Files\nodejs\node.exe" ] && exec ...`): Claude Code Windows'ta
  hook'ları Git Bash ile çalıştırdığı için tutuyor; Git Bash olmayan makinede kırılır.

### 4. Koruma seçimi — KULLANICI YAPACAK (AI yapamaz)
Önerilen (kendi terminalinde):
```
cd C:\Users\katar\personal-projects\uzay-itki-lab
atlasbound protect "dersler/**,ortak/**,index.html"
atlasbound doctor
git add .gitignore docs/ATLASBOUND_WINDOWS_TEST.md && git commit -m "atlasbound setup" && git push
```

### 5. Örnek işler (yeni Claude Code oturumu, repo kökünde başlatılmış)
| # | Görev (Claude'a aynen yaz) | Beklenen |
|---|---|---|
| T1 | "16-hohmann-transfer.html dersine Dünya→Mars transfer süresini hesaplayan küçük bir hesaplayıcı ekle" | Plan + sorular (hangi yörünge değerleri, birim, UI yeri) → senin cevapların → READY → kod |
| T2 | "ortak/ altındaki ortak JS'e karanlık/aydınlık tema düğmesi ekle, tüm derslerde çalışsın" | `critical/normal` seviye, çok dosya; blast radius soruları |
| T3 | `/handoff` → `/clear` → `/resume-handoff` → "T1'deki hesaplayıcıya Venüs'ü de ekle" | T1 kararlarını TEKRAR SORMAMALI |

Her görevde not edilecek: sorduğu sorular · senin cevabın · plan seviyesi · kaç kere reddedildi ·
`.decisionbook/*.jsonl` oluştu mu · süre.

### 6. MacBook kontrolü (diğer AI için)
`git pull` sonrası:
- `.decisionbook/*.jsonl` geldi mi → `atlasbound decisionbook related dersler/16-hohmann-transfer.html`
- `atlasbound decisionbook resume` ne veriyor?
- Handoff notu **gelmez** (README: home klasöründe, branch başına) — beklenen davranış; bunu doğrula.

## Bulgu listesi (özet)
- B1 `--version` = unknown
- B2 automatic protect HTML derslerini kaçırıyor
- B3 `/resume-handoff` komut dosyası yok (doğrulanacak)
- B4 doctor Windows'ta ENOENT yanlış alarmı (hook'lar aslında çalışıyor)
- B5 MANIFEST.json var ama "checkout" diyor
- B6 666 izin uyarısı Windows'ta gürültü
- Not: ilk deneme olarak `atlasbound-toy-uzay` adında private bir kopya repo açıldı, sonra vazgeçildi
  (kopyada setup çalıştırıldı; silinmesi/uninstall kullanıcı kararı).
