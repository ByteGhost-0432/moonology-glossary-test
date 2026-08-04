/* Moonology rotating hero — lives here, not in WordPress. WordPress holds only a mount
   div and a script tag, so hero changes never require an Elementor session. */
(function(){
  var mount=document.getElementById('mng-hero-mount');
  if(!mount||mount.dataset.mngBuilt) return;
  mount.dataset.mngBuilt='1';
  var st=document.createElement('style'); st.textContent="/* Everything is scoped under .mng-hero so nothing leaks into the rest of the site.\n   The theme is a night sky and deliberately does not follow a light mode. */\n.mng-hero{\n  --mng-ink:#05060a; --mng-gold:#d4af37; --mng-gold-lt:#f5e5a7;\n  --mng-cream:#e8e4d8; --mng-muted:#7f7a6d; --mng-rule:rgba(212,175,55,.28);\n  --mng-display:\"Didot\",\"Bodoni 72\",\"Playfair Display\",Georgia,serif;\n  --mng-util:\"Futura\",\"Avenir Next\",\"Gill Sans\",system-ui,sans-serif;\n  position:relative; overflow:hidden; background:var(--mng-ink);\n  min-height:86svh; display:flex; align-items:center;\n  margin:0; padding:0; isolation:isolate;\n}\n.mng-hero *{box-sizing:border-box}\n.mng-hero .mng-sky{position:absolute;inset:0;width:100%;height:100%;display:block;z-index:0}\n/* Whole sphere in the file, cropped by the viewport \u2014 never a straight cut edge. */\n.mng-hero .mng-moon{\n  position:absolute; z-index:1; right:-10vw; bottom:-46svh; height:132svh; width:auto;\n  max-width:none; pointer-events:none; user-select:none;\n  filter:contrast(1.02) drop-shadow(0 0 90px rgba(150,170,200,.10)); will-change:transform;\n}\n.mng-hero .mng-vig{\n  position:absolute;inset:0;z-index:2;pointer-events:none;\n  background:\n    radial-gradient(120% 90% at 6% 45%, rgba(5,6,10,.94) 0%, rgba(5,6,10,.55) 42%, transparent 74%),\n    linear-gradient(to bottom, rgba(5,6,10,.7) 0%, transparent 22%, transparent 66%, rgba(5,6,10,.92) 100%);\n}\n.mng-hero .mng-copy{\n  position:relative; z-index:4; width:100%; max-width:47rem;\n  padding:clamp(28px,6vh,64px) clamp(20px,5vw,64px); font-family:var(--mng-util);\n}\n.mng-hero .mng-eyebrow{\n  font-size:11px; letter-spacing:.34em; text-transform:uppercase;\n  color:var(--mng-muted); margin:0 0 20px;\n}\n.mng-hero .mng-h1{\n  font-family:var(--mng-display); font-weight:400; font-style:italic;\n  font-size:clamp(2.3rem,6.4vw,4.4rem); line-height:1.04; letter-spacing:.01em;\n  color:var(--mng-gold-lt); margin:0; text-wrap:balance;\n  text-shadow:0 2px 30px rgba(212,175,55,.16);\n}\n.mng-hero .mng-lede{\n  font-size:clamp(.95rem,1.5vw,1.05rem); line-height:1.65; color:var(--mng-cream);\n  opacity:.82; max-width:34rem; margin:24px 0 0;\n}\n.mng-hero .mng-now{\n  margin-top:clamp(26px,4.5vh,42px); display:flex; align-items:flex-start; gap:18px;\n  padding-left:18px; border-left:1px solid var(--mng-rule);\n}\n.mng-hero .mng-now-label{\n  font-size:10px; letter-spacing:.26em; text-transform:uppercase;\n  color:var(--mng-muted); padding-top:5px; white-space:nowrap;\n}\n.mng-hero .mng-now-body{display:flex;flex-direction:column;gap:5px}\n.mng-hero .mng-now-name{\n  font-family:var(--mng-display); font-size:clamp(1.5rem,3vw,2rem); letter-spacing:.05em;\n  text-transform:uppercase; color:var(--mng-cream); line-height:1;\n}\n.mng-hero .mng-now-spec{\n  font-size:12px; letter-spacing:.15em; color:var(--mng-gold);\n  font-variant-numeric:tabular-nums;\n}\n.mng-hero .mng-cta{margin-top:clamp(24px,4vh,38px)}\n.mng-hero .mng-btn{\n  display:inline-flex; align-items:center; gap:12px; padding:14px 26px;\n  border:1px solid var(--mng-rule); color:var(--mng-gold-lt); text-decoration:none;\n  font-size:12px; letter-spacing:.2em; text-transform:uppercase;\n  background:rgba(212,175,55,.04); transition:background .3s,border-color .3s,gap .3s;\n}\n.mng-hero .mng-btn:hover,.mng-hero .mng-btn:focus-visible{\n  background:rgba(212,175,55,.11); border-color:var(--mng-gold); gap:18px; color:var(--mng-gold-lt);\n}\n.mng-hero .mng-btn:focus-visible{outline:2px solid var(--mng-gold);outline-offset:4px}\n.mng-hero .mng-btn i{font-style:normal;transition:transform .3s}\n.mng-hero .mng-btn:hover i{transform:translateX(3px)}\n.mng-hero .mng-copy > *{opacity:0;transform:translateY(16px);animation:mngRise 1s cubic-bezier(.2,.7,.3,1) forwards}\n.mng-hero .mng-copy > *:nth-child(1){animation-delay:.10s}\n.mng-hero .mng-copy > *:nth-child(2){animation-delay:.22s}\n.mng-hero .mng-copy > *:nth-child(3){animation-delay:.34s}\n.mng-hero .mng-copy > *:nth-child(4){animation-delay:.46s}\n.mng-hero .mng-copy > *:nth-child(5){animation-delay:.58s}\n@keyframes mngRise{to{opacity:1;transform:none}}\n@media (prefers-reduced-motion:reduce){\n  .mng-hero .mng-copy > *{animation:none;opacity:1;transform:none}\n}\n@media (max-width:760px){\n  .mng-hero{min-height:82svh}\n  .mng-hero .mng-moon{right:-30vw;bottom:-28svh;height:104svh}\n  .mng-hero .mng-now{flex-direction:column;gap:10px}\n}"; document.head.appendChild(st);
  mount.innerHTML="<div class=\"mng-hero\" id=\"mngHero\">\n  <canvas class=\"mng-sky\" aria-hidden=\"true\"></canvas>\n  <img class=\"mng-moon\" alt=\"\" aria-hidden=\"true\"\n       src=\"https://test.moonologyartgallery.com/hero/current.webp\">\n  <div class=\"mng-vig\" aria-hidden=\"true\"></div>\n\n  <div class=\"mng-copy\">\n    <p class=\"mng-eyebrow\">A new moon every week</p>\n    <h1 class=\"mng-h1\">As above, so below.</h1>\n    <p class=\"mng-lede\">Hour-long binaural recordings built over a single moon. Two carriers,\n      one beat, headphones required \u2014 the beat only exists when each ear receives its own tone.</p>\n\n    <div class=\"mng-now\">\n      <div class=\"mng-now-label\">This week</div>\n      <div class=\"mng-now-body\">\n        <div class=\"mng-now-name\" id=\"mngName\">Enceladus</div>\n        <div class=\"mng-now-spec\" id=\"mngSpec\">528 Hz / 11 Hz &nbsp;\u00b7&nbsp; 60 minutes</div>\n      </div>\n    </div>\n\n    <div class=\"mng-cta\">\n      <a class=\"mng-btn\" id=\"mngBtn\" href=\"https://youtu.be/uCvlbYvNe9Q\" target=\"_blank\"\n         rel=\"noopener\">Listen to this week's hour <i>&rarr;</i></a>\n    </div>\n  </div>\n</div>";
  (function(){
  var root = document.getElementById('mngHero');
  if (!root || root.dataset.mngInit) return;
  root.dataset.mngInit = '1';

  var cv = root.querySelector('.mng-sky');
  var ctx = cv.getContext('2d', { alpha:false });
  var moonEl = root.querySelector('.mng-moon');
  var reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Pull the week's moon from the same fixed URL the image comes from, so the NAME and
  // FREQUENCY rotate with the art. Falls back silently to whatever is already in the
  // markup, which means a fetch failure degrades to last week's text, never to blank.
  fetch('https://test.moonologyartgallery.com/hero/current.json', { cache:'no-cache' })
    .then(function(r){ return r.ok ? r.json() : null; })
    .then(function(d){
      if (!d) return;
      if (d.name) root.querySelector('#mngName').textContent = d.name;
      if (d.spec) root.querySelector('#mngSpec').textContent = d.spec;
      var b = root.querySelector('#mngBtn');
      if (d.link) b.href = d.link;
      if (d.cta)  b.innerHTML = d.cta + ' <i>&rarr;</i>';
      if (d.image) moonEl.src = d.image;
    })
    .catch(function(){});

  var W=0,H=0,DPR=1,stars=[],t0=performance.now(),px=0,py=0,tx=0,ty=0;
  // Three depths. Nearer layers drift faster and shift further with the pointer — that
  // DIFFERENCE in rate is the parallax; one layer alone would just be drift.
  // Counts and alphas raised after measuring the live page: only ~880 lit pixels across a
  // 2400x1242 buffer, peak channel sum 494/765. It was drawing and animating correctly and
  // still read as a plain black background. Density and brightness both up; drift and
  // parallax rates unchanged because those were right.
  var L=[{n:330,s:0.0022,sh:5, a:0.62,r0:0.4, r1:1.0},
         {n:190,s:0.0060,sh:13,a:0.82,r0:0.65,r1:1.5},
         {n:80, s:0.0125,sh:26,a:1.0, r0:1.0, r1:2.1}];

  function build(){
    stars=[];
    L.forEach(function(l,li){
      var c=Math.round(l.n*(W*H)/(1600*900));
      for(var i=0;i<c;i++) stars.push({l:li,x:Math.random(),y:Math.random(),
        r:l.r0+Math.random()*(l.r1-l.r0), a:l.a*(0.45+Math.random()*0.55),
        tw:Math.random()*6.283, ts:0.4+Math.random()*1.1, warm:Math.random()<0.16});
    });
  }
  function resize(){
    DPR=Math.min(devicePixelRatio||1,2); W=cv.clientWidth; H=cv.clientHeight;
    if(!W||!H) return;
    cv.width=Math.round(W*DPR); cv.height=Math.round(H*DPR);
    ctx.setTransform(DPR,0,0,DPR,0,0); build();
  }
  function sat(now){
    // One crossing every ~34s. Rare enough to read as a sighting, not a screensaver.
    var p=((now+4000)%21000)/21000; if(p>0.46) return;
    var k=p/0.46, x=-40+k*(W+80), y=H*0.18+Math.sin(k*Math.PI)*-H*0.045+k*H*0.06, f=Math.sin(k*Math.PI);
    ctx.save(); ctx.globalCompositeOperation='lighter';
    var g=ctx.createLinearGradient(x-230,y,x,y);
    g.addColorStop(0,'rgba(232,228,216,0)'); g.addColorStop(1,'rgba(232,228,216,'+(0.72*f)+')');
    ctx.strokeStyle=g; ctx.lineWidth=2.1;
    ctx.beginPath(); ctx.moveTo(x-230,y+8); ctx.lineTo(x,y); ctx.stroke();
    ctx.fillStyle='rgba(245,229,167,'+(0.95*f)+')';
    ctx.beginPath(); ctx.arc(x,y,3.1,0,6.283); ctx.fill();
    ctx.fillStyle='rgba(245,229,167,'+(0.38*f)+')';
    ctx.beginPath(); ctx.arc(x,y,15,0,6.283); ctx.fill();
    ctx.restore();
  }
  function frame(now){
    if(W&&H){
      var t=now-t0; px+=(tx-px)*0.045; py+=(ty-py)*0.045;
      ctx.fillStyle='#05060a'; ctx.fillRect(0,0,W,H);
      for(var i=0;i<stars.length;i++){
        var s=stars[i], l=L[s.l];
        var x=(s.x*W - t*l.s*0.06 + px*l.sh)%W; if(x<0) x+=W;
        var y=s.y*H + py*l.sh*0.55;
        var tw=reduced?1:0.72+0.28*Math.sin(s.tw+t*0.001*s.ts);
        ctx.fillStyle=(s.warm?'rgba(245,229,167,':'rgba(226,231,240,')+(s.a*tw)+')';
        ctx.beginPath(); ctx.arc(x,y,s.r,0,6.283); ctx.fill();
      }
      if(!reduced) sat(now);
      moonEl.style.transform='translate3d('+(px*17)+'px,'+(py*9)+'px,0)';
    }
    requestAnimationFrame(frame);
  }
  addEventListener('resize',resize,{passive:true});
  if(!reduced) addEventListener('pointermove',function(e){
    var b=root.getBoundingClientRect();
    tx=((e.clientX-b.left)/b.width-0.5)*2; ty=((e.clientY-b.top)/b.height-0.5)*2;
  },{passive:true});
  resize(); requestAnimationFrame(frame);
})();
})();
