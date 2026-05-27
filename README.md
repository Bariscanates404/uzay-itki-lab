# 🚀 Uzayda İtki Laboratuvarı

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
