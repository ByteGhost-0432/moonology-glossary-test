/* Moonology channel page — the YouTube channel, mirrored on moonologyartgallery.com.
 *
 * Loaded by hero/hero.js, so it needs NO WordPress edit: it mounts itself directly under the
 * hero. Data comes from channel/feed.json, which a GitHub Action rebuilds from the channel's
 * public RSS every 3 hours (tools/build_feed.py). Upload to YouTube and the site follows.
 *
 * Same palette as hero.js and site.js — ink, gold, cream. Do not add a colour here.
 * Everything is scoped under .mng-ch so nothing leaks into the rest of the site.
 */
(function () {
  if (window.__mngChannel) return;
  window.__mngChannel = 1;

  var BASE = window.MNG_CHANNEL_BASE || 'https://test.moonologyartgallery.com/channel/';  // override = local test only
  var hero = document.getElementById('mng-hero-mount');
  var mount = document.getElementById('mng-channel-mount');
  if (!mount) {
    if (!hero) return;
    mount = document.createElement('div');
    mount.id = 'mng-channel-mount';
    hero.parentNode.insertBefore(mount, hero.nextSibling);
  }

  // Shorts lettering: Herculanum on Macs (system font, cannot be hosted); Metamorphous, the
  // closest free match (compared side by side 2026-09-24), everywhere else.
  if (!document.getElementById('mng-font')) {
    var fl = document.createElement('link'); fl.id = 'mng-font'; fl.rel = 'stylesheet';
    fl.href = 'https://fonts.googleapis.com/css2?family=Metamorphous&display=swap';
    document.head.appendChild(fl);
  }

  var css = document.createElement('style');
  css.textContent = [
    '.mng-ch{--ink:#05060a;--gold:#d4af37;--gold-lt:#f5e5a7;--cream:#e8e4d8;--muted:#8a8475;',
    '--rule:rgba(212,175,55,.22);--card:rgba(232,228,216,.035);',
    '--display:"Herculanum","Metamorphous",Georgia,serif;',
    '--util:"Futura","Avenir Next","Gill Sans",system-ui,sans-serif;',
    'font-family:var(--util);color:var(--cream);background:var(--ink);',
    'width:100vw;max-width:100vw;margin-left:calc(50% - 50vw);margin-right:calc(50% - 50vw);',
    'padding:clamp(18px,2.5vw,28px) 0 72px;}',
    '.mng-ch *{box-sizing:border-box}',
    '.mng-ch .in{max-width:1240px;margin:0 auto;padding:0 clamp(16px,4vw,40px)}',
    /* header */
    '.mng-ch .hd{display:flex;align-items:center;gap:20px;flex-wrap:wrap}',
    '.mng-ch .mark{width:72px;height:72px;border-radius:50%;border:1px solid var(--rule);',
    'display:grid;place-items:center;font-size:34px;background:radial-gradient(circle at 35% 35%,#1b1a14,#05060a)}',
    '.mng-ch .mark img{width:100%;height:100%;display:block;border-radius:50%;}',
    '.mng-ch .who{flex:1;min-width:220px}',
    '.mng-ch .nm{font-family:var(--display);font-weight:400;text-transform:uppercase;letter-spacing:.02em;font-size:clamp(1.05rem,2vw,1.55rem);',
    'color:var(--gold-lt);margin:0;line-height:1.1}',
    '.mng-ch .meta{font-size:13px;color:var(--muted);margin-top:6px;letter-spacing:.04em}',
    '.mng-ch .sub{display:inline-flex;align-items:center;gap:10px;padding:12px 22px;border-radius:999px;',
    'background:var(--gold);color:#05060a !important;text-decoration:none;font-size:13px;',
    'letter-spacing:.14em;text-transform:uppercase;font-weight:600}',
    '.mng-ch .sub:hover{background:var(--gold-lt)}',
    /* tabs */
    '.mng-ch .tabs{display:flex;gap:4px;margin:28px 0 26px;border-bottom:1px solid var(--rule);overflow-x:auto}',
    '.mng-ch .tab{background:none;border:0;border-bottom:2px solid transparent;color:var(--muted);',
    'font:inherit;font-size:13px;letter-spacing:.16em;text-transform:uppercase;padding:12px 16px;cursor:pointer;white-space:nowrap}',
    '.mng-ch .tab[aria-selected=true]{color:var(--gold-lt);border-bottom-color:var(--gold)}',
    '.mng-ch .tab:focus-visible{outline:2px solid var(--gold);outline-offset:-2px}',
    /* shelves + grids */
    '.mng-ch h3{font-family:var(--display);font-weight:400;font-size:1.3rem;color:var(--cream);text-transform:uppercase;letter-spacing:.04em;',
    'margin:34px 0 14px;display:flex;justify-content:space-between;align-items:baseline;gap:12px}',
    '.mng-ch h3 button{background:none;border:0;color:var(--gold);font:inherit;font-family:var(--util);',
    'font-size:12px;letter-spacing:.14em;text-transform:uppercase;cursor:pointer;white-space:nowrap}',
    '.mng-ch .row{display:grid;grid-auto-flow:column;grid-auto-columns:minmax(240px,1fr);gap:16px;',
    'overflow-x:auto;padding-bottom:8px;scroll-snap-type:x mandatory}',
    '.mng-ch .row.s{grid-auto-columns:minmax(150px,180px)}',
    '.mng-ch .grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(260px,1fr));gap:22px 16px}',
    '.mng-ch .grid.s{grid-template-columns:repeat(auto-fill,minmax(160px,1fr))}',
    '.mng-ch .v{display:block;text-decoration:none;color:inherit;scroll-snap-align:start;cursor:pointer;',
    'background:none;border:0;padding:0;text-align:left;font:inherit;width:100%}',
    '.mng-ch .th{position:relative;aspect-ratio:16/9;border-radius:10px;overflow:hidden;background:#111;',
    'border:1px solid rgba(212,175,55,.12)}',
    '.mng-ch .s .th{aspect-ratio:9/16}',
    '.mng-ch .th img{width:100%;height:100%;object-fit:cover;display:block;transition:transform .4s}',
    '.mng-ch .v:hover .th img{transform:scale(1.04)}',
    '.mng-ch .v:focus-visible{outline:2px solid var(--gold);outline-offset:3px;border-radius:10px}',
    '.mng-ch .badge{position:absolute;left:8px;bottom:8px;background:rgba(5,6,10,.82);color:var(--gold-lt);',
    'font-size:10px;letter-spacing:.14em;padding:3px 7px;border-radius:4px;text-transform:uppercase}',
    '.mng-ch .t{font-size:14px;line-height:1.35;margin:10px 0 4px;color:var(--cream);',
    'display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden}',
    '.mng-ch .m{font-size:12px;color:var(--muted)}',
    /* featured */
    '.mng-ch .feat{display:grid;grid-template-columns:minmax(0,1.2fr) minmax(0,1fr);gap:28px;align-items:start;max-width:980px}',
    '.mng-ch .feat .fr{aspect-ratio:16/9;border-radius:12px;overflow:hidden;border:1px solid var(--rule);background:#000}',
    '.mng-ch .feat.s{grid-template-columns:auto minmax(0,1fr)}',
    '.mng-ch .feat.s .fr{aspect-ratio:auto;height:min(56vh,480px);width:calc(min(56vh,480px) * 9 / 16)}',
    '.mng-ch .feat iframe{width:100%;height:100%;border:0;display:block}',
    '.mng-ch .feat .tx{padding-top:8px}',
    '.mng-ch .feat .k{display:inline-block;font-family:var(--display);font-size:15px;letter-spacing:.06em;text-transform:uppercase;color:var(--gold);border-bottom:1px solid var(--gold);padding-bottom:4px}',
    '.mng-ch .feat .ft{font-family:var(--display);font-size:clamp(1.4rem,2.6vw,2.1rem);color:var(--cream);text-transform:uppercase;letter-spacing:.03em;line-height:1.25;margin:14px 0 10px}',
    /* playlist cards */
    '.mng-ch .pl .th:after{content:attr(data-n);position:absolute;right:0;top:0;bottom:0;width:38%;',
    'background:rgba(5,6,10,.78);display:grid;place-items:center;color:var(--gold-lt);font-size:14px;letter-spacing:.08em}',
    '.mng-ch .back{background:none;border:0;color:var(--gold);font:inherit;font-size:12px;',
    'letter-spacing:.14em;text-transform:uppercase;cursor:pointer;padding:0;margin-bottom:6px}',
    '.mng-ch .foot{margin-top:40px;font-size:12px;color:var(--muted);text-align:center}',
    /* lightbox */
    '.mng-lb{position:fixed;inset:0;z-index:99999;background:rgba(5,6,10,.92);display:flex;',
    'align-items:center;justify-content:center;padding:16px;flex-direction:column;gap:14px}',
    '.mng-lb .box{width:min(1100px,100%);aspect-ratio:16/9;max-height:80vh}',
    '.mng-lb .box.s{aspect-ratio:auto;height:min(82vh,900px);width:calc(min(82vh,900px) * 9 / 16);max-width:100%}',
    '.mng-lb iframe{width:100%;height:100%;border:0;border-radius:10px;background:#000}',
    '.mng-lb .bar{display:flex;gap:18px;align-items:center;font-family:"Futura","Avenir Next",system-ui,sans-serif}',
    '.mng-lb a,.mng-lb button{color:#f5e5a7;background:none;border:1px solid rgba(212,175,55,.4);',
    'padding:10px 18px;font-size:12px;letter-spacing:.14em;text-transform:uppercase;text-decoration:none;cursor:pointer;border-radius:999px}',
    '@media (max-width:760px){.mng-ch .feat{grid-template-columns:1fr}',
    '.mng-ch .feat.s{grid-template-columns:1fr}.mng-ch .feat.s .fr{height:60vh;width:calc(60vh * 9 / 16);justify-self:center}.mng-ch .grid{grid-template-columns:1fr 1fr;gap:18px 12px}',
    '.mng-ch .grid.s{grid-template-columns:1fr 1fr}.mng-ch .t{font-size:13px}}'
  ].join('');
  document.head.appendChild(css);

  // ---------------------------------------------------------------- helpers
  function el(tag, cls, txt) {
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    if (txt != null) e.textContent = txt;          // textContent only — titles are never HTML
    return e;
  }
  function views(n) {
    if (n == null) return '';
    if (n >= 1e6) return (n / 1e6).toFixed(1).replace(/\.0$/, '') + 'M views';
    if (n >= 1e3) return (n / 1e3).toFixed(1).replace(/\.0$/, '') + 'K views';
    return n + (n === 1 ? ' view' : ' views');
  }
  function ago(iso) {
    var s = (Date.now() - new Date(iso).getTime()) / 1000, u = [
      [31536000, 'year'], [2592000, 'month'], [604800, 'week'], [86400, 'day'], [3600, 'hour'], [60, 'minute']];
    for (var i = 0; i < u.length; i++) {
      var n = Math.floor(s / u[i][0]);
      if (n >= 1) return n + ' ' + u[i][1] + (n > 1 ? 's' : '') + ' ago';
    }
    return 'just now';
  }
  // Shorts carry a true 9:16 thumbnail at oar2.jpg (1080x1920); hqdefault is 4:3 and cuts
  // through the title card. oar2 is not guaranteed, so img.onerror falls back to hqdefault.
  function thumb(v) { return 'https://i.ytimg.com/vi/' + v.id + (v.short ? '/oar2.jpg' : '/mqdefault.jpg'); }
  function fallback(im, v) { im.onerror = function () { im.onerror = null; im.src = 'https://i.ytimg.com/vi/' + v.id + '/hqdefault.jpg'; }; }
  function ytUrl(v) { return 'https://www.youtube.com/' + (v.short ? 'shorts/' : 'watch?v=') + v.id; }
  function embed(v, auto) {
    return 'https://www.youtube-nocookie.com/embed/' + v.id + '?rel=0&modestbranding=1' + (auto ? '&autoplay=1' : '');
  }

  // ---------------------------------------------------------------- lightbox
  function play(v) {
    var lb = el('div', 'mng-lb');
    lb.setAttribute('role', 'dialog'); lb.setAttribute('aria-modal', 'true');
    lb.setAttribute('aria-label', v.title);
    var box = el('div', 'box' + (v.short ? ' s' : ''));
    var f = document.createElement('iframe');
    f.src = embed(v, true); f.title = v.title;
    f.allow = 'autoplay; encrypted-media; picture-in-picture; fullscreen'; f.allowFullscreen = true;
    box.appendChild(f);
    var bar = el('div', 'bar');
    var a = el('a', null, 'Watch on YouTube ↗'); a.href = ytUrl(v); a.target = '_blank'; a.rel = 'noopener';
    var x = el('button', null, 'Close ✕');
    bar.appendChild(a); bar.appendChild(x);
    lb.appendChild(box); lb.appendChild(bar);
    function close() { lb.remove(); document.removeEventListener('keydown', key); }
    function key(e) { if (e.key === 'Escape') close(); }
    x.onclick = close;
    lb.onclick = function (e) { if (e.target === lb) close(); };
    document.addEventListener('keydown', key);
    document.body.appendChild(lb); x.focus();
  }

  function card(v) {
    var b = el('button', 'v');
    b.type = 'button';
    var th = el('div', 'th'), im = el('img');
    fallback(im, v); im.src = thumb(v); im.alt = ''; im.loading = 'lazy';
    th.appendChild(im);
    if (v.short) th.appendChild(el('span', 'badge', 'Short'));
    b.appendChild(th);
    b.appendChild(el('div', 't', v.title));
    b.appendChild(el('div', 'm', [views(v.views), ago(v.published)].filter(Boolean).join(' · ')));
    b.onclick = function () { play(v); };
    return b;
  }

  function shelf(title, items, isShort, more) {
    var wrap = el('section');
    var h = el('h3', null, title);
    if (more) { var m = el('button', null, 'See all →'); m.onclick = more; h.appendChild(m); }
    wrap.appendChild(h);
    var row = el('div', 'row' + (isShort ? ' s' : ''));
    items.forEach(function (v) { row.appendChild(card(v)); });
    wrap.appendChild(row);
    return wrap;
  }

  function grid(items, isShort) {
    var g = el('div', 'grid' + (isShort ? ' s' : ''));
    items.forEach(function (v) { g.appendChild(card(v)); });
    return g;
  }

  // ---------------------------------------------------------------- render
  function render(d) {
    var root = el('div', 'mng-ch'), inn = el('div', 'in');
    root.appendChild(inn);

    var hd = el('div', 'hd');
    var mk = el('div', 'mark'), mi = document.createElement('img');
    mi.src = BASE + 'mark.png'; mi.alt = 'Moonology Art Gallery';   // circle mark, waxing crescent (9/24)
    mk.appendChild(mi); hd.appendChild(mk);
    var who = el('div', 'who');
    who.appendChild(el('h2', 'nm', d.channel.name));
    // subline + store link are set in WordPress on the hero mount: data-subline, data-store.
    var cfg = hero ? hero.dataset : {};
    who.appendChild(el('div', 'meta', '@moonologyartgallery \u00b7 ' +
      (cfg.subline || 'Ancient Egypt & the Moon')));
    hd.appendChild(who);
    var sub = el('a', 'sub', '🔔 Subscribe');
    sub.href = d.channel.subscribe; sub.target = '_blank'; sub.rel = 'noopener';
    hd.appendChild(sub);
    inn.appendChild(hd);

    var names = ['Home', 'Videos', 'Shorts', 'Playlists'].concat(cfg.store ? ['Store'] : []);
    var tabs = el('div', 'tabs'); tabs.setAttribute('role', 'tablist');
    var body = el('div');
    var btns = names.map(function (n) {
      var b = el('button', 'tab', n);
      b.type = 'button'; b.setAttribute('role', 'tab');
      b.onclick = function () { show(n); };
      tabs.appendChild(b); return b;
    });
    inn.appendChild(tabs); inn.appendChild(body);

    function show(n, pl) {
      btns.forEach(function (b) { b.setAttribute('aria-selected', b.textContent === n); });
      body.textContent = '';
      if (n === 'Home') home();
      if (n === 'Videos') body.appendChild(grid(d.videos, false));
      if (n === 'Shorts') body.appendChild(grid(d.shorts, true));
      if (n === 'Playlists') pl ? playlist(pl) : playlists();
      if (n === 'Store') { window.open(cfg.store, '_blank', 'noopener'); show('Home'); }
    }

    function home() {
      var v = d.latest[0];
      if (v) {
        var f = el('div', 'feat' + (v.short ? ' s' : ''));
        var fr = el('div', 'fr'), ifr = document.createElement('iframe');
        ifr.src = embed(v, false); ifr.title = v.title; ifr.loading = 'lazy';
        ifr.allow = 'encrypted-media; picture-in-picture; fullscreen'; ifr.allowFullscreen = true;
        fr.appendChild(ifr); f.appendChild(fr);
        var tx = el('div', 'tx');
        tx.appendChild(el('div', 'k', 'Latest upload'));
        tx.appendChild(el('div', 'ft', v.title));
        tx.appendChild(el('div', 'm', [views(v.views), ago(v.published)].filter(Boolean).join(' · ')));
        f.appendChild(tx);
        body.appendChild(f);
      }
      body.appendChild(shelf('🎬 Shorts', d.shorts.slice(0, 12), true, function () { show('Shorts'); }));
      body.appendChild(shelf('🎞️ Videos', d.videos.slice(0, 8), false, function () { show('Videos'); }));
      d.playlists.forEach(function (p) {
        var isS = p.items.filter(function (x) { return x.short; }).length > p.items.length / 2;
        body.appendChild(shelf(p.title, p.items, isS, function () { show('Playlists', p); }));
      });
    }

    function playlists() {
      var g = el('div', 'grid');
      d.playlists.forEach(function (p) {
        var b = el('button', 'v pl'); b.type = 'button';
        var th = el('div', 'th'), im = el('img');
        var first = { id: p.items[0].id, short: false };   // playlist cards are 16:9
        fallback(im, first); im.src = thumb(first); im.alt = ''; im.loading = 'lazy';
        th.setAttribute('data-n', p.items.length + (p.items.length >= 15 ? '+' : '') + ' ▶');
        th.appendChild(im); b.appendChild(th);
        b.appendChild(el('div', 't', p.title));
        b.appendChild(el('div', 'm', 'View full playlist'));
        b.onclick = function () { show('Playlists', p); };
        g.appendChild(b);
      });
      body.appendChild(g);
    }

    function playlist(p) {
      var back = el('button', 'back', '← All playlists');
      back.onclick = function () { show('Playlists'); };
      body.appendChild(back);
      var h = el('h3', null, p.title);
      var yt = el('button', null, 'Open on YouTube ↗');
      yt.onclick = function () { window.open('https://www.youtube.com/playlist?list=' + p.id, '_blank', 'noopener'); };
      h.appendChild(yt); body.appendChild(h);
      var isS = p.items.filter(function (x) { return x.short; }).length > p.items.length / 2;
      body.appendChild(grid(p.items, isS));
    }

    var foot = el('div', 'foot');
    var fa = el('a', null, '📺 See the full channel on YouTube');
    fa.href = d.channel.url; fa.target = '_blank'; fa.rel = 'noopener';
    foot.appendChild(fa);
    inn.appendChild(foot);

    mount.textContent = '';
    mount.appendChild(root);
    show('Home');
  }

  fetch(BASE + 'feed.json', { cache: 'no-cache' })
    .then(function (r) { return r.ok ? r.json() : null; })
    .then(function (d) { if (d && d.latest && d.latest.length) render(d); })
    .catch(function () {});           // no feed -> no section, never a broken box
})();
