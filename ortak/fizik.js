// Ortak fizik animasyon motoru. Her ders bunu yükler ve Lab.start(scenes, opts) çağırır.
// Bir sahne: { tab, html, loop:true/false, draw:(g,t)=>{} }  (t: 0..1)

const F = { W:880, H:380, cx:440, midY:190 };

// ---- geometri/çizim yardımcıları ----
function rrect(g,x,y,w,h,r){
  g.beginPath();g.moveTo(x+r,y);g.arcTo(x+w,y,x+w,y+h,r);
  g.arcTo(x+w,y+h,x,y+h,r);g.arcTo(x,y+h,x,y,r);g.arcTo(x,y,x+w,y,r);g.closePath();
}
function arrow(g,x,y,dx,col){               // yatay ok
  if(Math.abs(dx)<3) return;
  g.strokeStyle=col;g.fillStyle=col;g.lineWidth=3;
  g.beginPath();g.moveTo(x,y);g.lineTo(x+dx,y);g.stroke();
  const s=Math.sign(dx);
  g.beginPath();g.moveTo(x+dx,y);g.lineTo(x+dx-9*s,y-5);g.lineTo(x+dx-9*s,y+5);g.closePath();g.fill();
}
function arrowXY(g,x,y,dx,dy,col){           // serbest yön ok
  const len=Math.hypot(dx,dy); if(len<3) return;
  g.strokeStyle=col;g.fillStyle=col;g.lineWidth=3;
  g.beginPath();g.moveTo(x,y);g.lineTo(x+dx,y+dy);g.stroke();
  const a=Math.atan2(dy,dx);
  g.beginPath();g.moveTo(x+dx,y+dy);
  g.lineTo(x+dx-10*Math.cos(a-0.4),y+dy-10*Math.sin(a-0.4));
  g.lineTo(x+dx-10*Math.cos(a+0.4),y+dy-10*Math.sin(a+0.4));g.closePath();g.fill();
}
function comLine(g,xc,label){
  g.strokeStyle='#46e08a';g.lineWidth=2;g.setLineDash([6,7]);
  g.beginPath();g.moveTo(xc,28);g.lineTo(xc,F.H-30);g.stroke();g.setLineDash([]);
  g.fillStyle='#46e08a';g.font='12px Segoe UI';g.textAlign='left';
  g.fillText(label||'kütle merkezi',xc+6,40);
}
function banner(g,txt,col){
  g.fillStyle=col||'#9fb0ff';g.font='bold 16px Segoe UI';g.textAlign='center';
  g.fillText(txt,F.cx,F.H-24);g.textAlign='left';
}
function label(g,txt,x,y,col,size){
  g.fillStyle=col||'#9fb0ff';g.font=(size||12)+'px Segoe UI';g.textAlign='center';
  g.fillText(txt,x,y);g.textAlign='left';
}
function ease(u){ return u<.5? 2*u*u : 1-Math.pow(-2*u+2,2)/2; }

// ---- nesne çizimleri ----
function glowCircle(g,x,y,r,col){
  const rg=g.createRadialGradient(x,y,0,x,y,r);
  rg.addColorStop(0,col);rg.addColorStop(1,'rgba(0,0,0,0)');
  g.fillStyle=rg;g.beginPath();g.arc(x,y,r,0,7);g.fill();
}
function drawShip(g,centerX,openBack){
  const w=300,h=90,x=centerX-w/2,y=F.midY-h/2;
  const grd=g.createLinearGradient(0,y,0,y+h);
  grd.addColorStop(0,'#3147a0');grd.addColorStop(.5,'#16205a');grd.addColorStop(1,'#0c1238');
  g.fillStyle=grd;g.strokeStyle='#7fb4ff';g.lineWidth=2.5;rrect(g,x,y,w,h,16);g.fill();g.stroke();
  g.globalAlpha=.15;g.fillStyle='#fff';rrect(g,x+12,y+8,w-24,15,8);g.fill();g.globalAlpha=1; // parlama
  g.fillStyle='#070c24';rrect(g,x+18,F.midY-22,w-36,44,8);g.fill();                          // iç boru
  for(let i=0;i<4;i++){ g.fillStyle='#3550b0';rrect(g,x+40+i*55,F.midY-30,8,60,3);g.fill();
    g.globalAlpha=.45;g.fillStyle='#5ad1ff';rrect(g,x+40+i*55,F.midY-30,8,60,3);g.fill();g.globalAlpha=1; }
  if(openBack){ glowCircle(g,x+14,F.midY,20,'rgba(255,107,107,.55)');g.fillStyle='#ff6b6b';rrect(g,x+10,F.midY-22,8,44,3);g.fill(); }
  else { g.fillStyle='#7fb4ff';rrect(g,x+w-26,F.midY-22,8,44,3);g.fill(); }
  g.fillStyle='#bfe3ff';g.beginPath();g.arc(x+w-46,y+22,7,0,7);g.fill();                      // pencere
  label(g,'UZAY ARACI',centerX,y-8,'#9fb0ff');
}
function drawSlug(g,sx,r){
  r=r||13;g.fillStyle='#ffcf5a';g.shadowColor='#ffcf5a';g.shadowBlur=14;
  g.beginPath();g.arc(sx,F.midY,r,0,7);g.fill();g.shadowBlur=0;
  g.fillStyle='#7a5a00';g.font='bold 11px Segoe UI';g.fillText('N',sx-9,F.midY+4);g.fillText('S',sx+3,F.midY+4);
}
function drawAstro(g,px,flip,col){
  g.save();g.translate(px,F.midY);if(flip)g.scale(-1,1);
  g.fillStyle=col||'#cdd6ff';g.beginPath();g.arc(0,-28,16,0,7);g.fill();
  g.fillStyle='#7e8bd6';g.beginPath();g.arc(0,-28,10,0,7);g.fill();
  g.fillStyle=col||'#cdd6ff';rrect(g,-14,-14,28,46,10);g.fill();
  g.restore();
}
function drawBox(g,x,col){
  g.fillStyle=col||'#c9a24b';g.strokeStyle='#ffe9a8';g.lineWidth=2;
  rrect(g,x-26,F.midY-26,52,52,8);g.fill();g.stroke();
  g.strokeStyle='#8a6a20';g.beginPath();g.moveTo(x-26,F.midY);g.lineTo(x+26,F.midY);g.moveTo(x,F.midY-26);g.lineTo(x,F.midY+26);g.stroke();
}
function drawRocket(g,x,y,scale){
  g.save();g.translate(x,y);g.scale(scale||1,scale||1);
  g.fillStyle='#dfe6ff';g.beginPath();g.moveTo(0,-34);g.quadraticCurveTo(16,-6,16,20);g.lineTo(-16,20);g.quadraticCurveTo(-16,-6,0,-34);g.fill();
  g.fillStyle='#ff6b6b';g.beginPath();g.moveTo(-16,20);g.lineTo(-28,34);g.lineTo(-16,34);g.closePath();g.fill();
  g.beginPath();g.moveTo(16,20);g.lineTo(28,34);g.lineTo(16,34);g.closePath();g.fill();
  g.fillStyle='#5ad1ff';g.beginPath();g.arc(0,-6,6,0,7);g.fill();
  g.restore();
}
function drawPlanet(g,x,y,r,col){
  const rg=g.createRadialGradient(x-r*.35,y-r*.35,r*.1,x,y,r);
  rg.addColorStop(0,'#a8ccff');rg.addColorStop(.5,col||'#3a6ea5');rg.addColorStop(1,'#0e2340');
  g.fillStyle=rg;g.beginPath();g.arc(x,y,r,0,7);g.fill();
}

// ---- motor: UI kurar + döngü ----
const Lab = {
  scenes:[], idx:0, t:0, playing:false, speed:1, last:0, g:null,
  start(scenes, opts){
    opts=opts||{};
    this.scenes=scenes;
    const root=document.getElementById('lab');
    const legend=(opts.legend||[
      {c:'#46e08a',t:'Kütle merkezi (sabit kalmalı)'},
      {c:'#ffcf5a',t:'Mıknatıslı top / fırlatılan kütle'},
      {c:'#5ad1ff',t:'Araç / ağır cisim'}
    ]).map(l=>`<span><span class="dot" style="background:${l.c}"></span>${l.t}</span>`).join('');
    root.innerHTML=`
      <div class="tabs" id="tabs"></div>
      <div class="stage"><canvas id="cv" width="${F.W}" height="${F.H}"></canvas></div>
      <div class="controls">
        <button class="ctl" id="play">▶ Oynat</button>
        <button class="ctl" id="replay">↺ Baştan</button>
        <div class="legend">${legend}</div>
        <div class="speed">Hız <input type="range" id="spd" min="0.3" max="2.5" step="0.1" value="1"></div>
      </div>
      <div class="explain" id="explain"></div>`;
    const tabs=document.getElementById('tabs');
    scenes.forEach((s,i)=>{
      const d=document.createElement('div');
      d.className='tab'+(i===0?' on':'');d.textContent=s.tab;
      d.onclick=()=>this.select(i);tabs.appendChild(d);
    });
    this.g=document.getElementById('cv').getContext('2d');
    document.getElementById('play').onclick=()=>{
      if(this.t>=1 && !this.scenes[this.idx].loop) this.t=0;
      this.playing=!this.playing;
      document.getElementById('play').textContent=this.playing?'⏸ Duraklat':'▶ Oynat';
    };
    document.getElementById('replay').onclick=()=>{
      this.t=0;this.playing=true;document.getElementById('play').textContent='⏸ Duraklat';
    };
    document.getElementById('spd').oninput=e=>this.speed=parseFloat(e.target.value);
    this.select(0);
    this.playing=true;
    requestAnimationFrame(ts=>this.loop(ts));
  },
  select(i){
    this.idx=i;this.t=0;this.playing=true;
    document.querySelectorAll('.tab').forEach((t,k)=>t.classList.toggle('on',k===i));
    document.getElementById('explain').innerHTML=this.scenes[i].html;
    const pb=document.getElementById('play');if(pb)pb.textContent='⏸ Duraklat';
  },
  loop(ts){
    if(!this.last)this.last=ts;
    const dt=(ts-this.last)/1000;this.last=ts;
    this.clock=(this.clock||0)+dt;
    const sc=this.scenes[this.idx];
    if(this.playing){
      this.t+=dt*0.32*this.speed;
      if(this.t>=1){
        if(sc.loop) this.t=0;
        else { this.t=1;this.playing=false;
          const pb=document.getElementById('play');if(pb)pb.textContent='▶ Oynat'; }
      }
    }
    this.g.clearRect(0,0,F.W,F.H);
    this.drawBg(this.g,this.clock);
    sc.draw(this.g,this.t);
    requestAnimationFrame(ts2=>this.loop(ts2));
  },
  drawBg(g,time){
    if(!this._stars){
      this._stars=[];
      for(let i=0;i<95;i++) this._stars.push({
        x:Math.random()*F.W,y:Math.random()*F.H,r:Math.random()*1.4+.3,
        ph:Math.random()*6.28,lay:Math.random()*.6+.2});
    }
    const grd=g.createLinearGradient(0,0,0,F.H);
    grd.addColorStop(0,'#0b1234');grd.addColorStop(.6,'#070a1c');grd.addColorStop(1,'#04060f');
    g.fillStyle=grd;g.fillRect(0,0,F.W,F.H);
    this._neb(g,F.W*.24,F.H*.34,230,'rgba(60,95,210,.12)');
    this._neb(g,F.W*.80,F.H*.62,270,'rgba(150,60,185,.09)');
    for(const s of this._stars){
      const x=((s.x - time*7*s.lay)%(F.W+10)+F.W+10)%(F.W+10);
      g.globalAlpha=.35+.5*Math.abs(Math.sin(time*1.4*s.lay+s.ph));
      g.fillStyle='#dfe8ff';g.beginPath();g.arc(x,s.y,s.r,0,7);g.fill();
    }
    g.globalAlpha=1;
  },
  _neb(g,x,y,r,col){
    const rg=g.createRadialGradient(x,y,0,x,y,r);
    rg.addColorStop(0,col);rg.addColorStop(1,'rgba(0,0,0,0)');
    g.fillStyle=rg;g.beginPath();g.arc(x,y,r,0,7);g.fill();
  }
};
