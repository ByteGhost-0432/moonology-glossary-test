/* Moonology site-wide night sky + brand palette.
 *
 * Loaded on EVERY page (Elementor Pro -> Custom Code, footer). Two jobs:
 *   1. a fixed starfield behind all content, so the whole site sits in the same sky
 *      the homepage hero does
 *   2. flip the default light theme to the Moonology palette, because dark text on a
 *      starfield is unreadable
 *
 * Palette is the SAME one used in the binaural thumbnails, the quiz Shorts, the glossary
 * test and the hero — ink #05060a, gold #d4af37 / #f5e5a7, cream #e8e4d8. Do not
 * introduce a new colour here; this file is what keeps the site matching the videos.
 *
 * Lives in the repo, not in WordPress, for the same reason hero.js does: tuning the look
 * must never require an Elementor session.
 */
(function () {
  if (window.__mngSite) return;
  window.__mngSite = 1;

  var INK = '#05060a', GOLD = '#d4af37', GOLD_LT = '#f5e5a7', CREAM = '#e8e4d8';

  // ---------------------------------------------------------------- palette
  var css = document.createElement('style');
  css.id = 'mng-site-css';
  css.textContent = [
    // html carries the ground colour; body must be transparent so the fixed canvas
    // (z-index:-1) can sit between them.
    'html{background:' + INK + ' !important;}',
    'body{background:transparent !important;color:' + CREAM + ';}',

    // Clear the light backgrounds the theme and Elementor paint over the sky.
    // .mng-hero is excluded everywhere — it owns its own look.
    '#page,#content,.site,.site-content,main,article,.hentry,.entry-content,.page-content,' +
    '.elementor,.elementor-section,.elementor-container,.elementor-widget-wrap,' +
    '.e-con,.e-con-inner,.elementor-widget-container' +
    '{background-color:transparent !important;}',

    // Type, on brand.
    'body h1,body h2,body h3,body h4,body h5,body h6{color:' + GOLD_LT + ';}',
    'body p,body li,body dd,body dt,body td,body th,body blockquote,body figcaption,' +
    'body .elementor-widget-text-editor,body .elementor-widget-theme-post-content' +
    '{color:' + CREAM + ';}',
    'body a:not(.elementor-button):not(.mng-btn){color:' + GOLD + ';}',
    'body a:not(.elementor-button):not(.mng-btn):hover{color:' + GOLD_LT + ';}',
    'body hr,body .elementor-divider-separator{border-color:rgba(212,175,55,.28) !important;}',

    // Buttons in brand rather than default blue.
    '.elementor-button{background-color:rgba(212,175,55,.08) !important;color:' + GOLD_LT +
      ' !important;border:1px solid rgba(212,175,55,.4) !important;}',
    '.elementor-button:hover{background-color:rgba(212,175,55,.18) !important;' +
      'border-color:' + GOLD + ' !important;}',

    // Header sits ON the sky instead of hiding it.
    'header.elementor,header.elementor .e-con,header.elementor .e-con-inner' +
      '{background-color:transparent !important;}',
    'header.elementor{border-bottom:1px solid rgba(212,175,55,.16);}',

    // Bluehost WonderBlocks (nfd-*) and core block groups ship their own light theme —
    // white panels and pure-blue headings — which sit on top of the sky. These are the
    // actual source of the white band on About, not the theme.
    // `is-style-nfd-theme-white` is the actual culprit — a WonderBlocks *style variation*,
    // not a plain background class. Found by reading the element's class list rather than
    // guessing; a .wp-block-group override alone did not beat it.
    'body .wp-block-group,body .wp-block-columns,body .wp-block-column,body .nfd-container,' +
    'body [class*="nfd-bg-white"],body .has-white-background-color,' +
    'body [class*="is-style-nfd-theme-"]' +
    '{background-color:transparent !important;background-image:none !important;}',
    'body [class*="is-style-nfd-theme-"]{--nfd-bg:transparent !important;' +
      '--nfd-theme-bg:transparent !important;}',
    'body .wp-block-group h1,body .wp-block-group h2,body .wp-block-group h3,' +
    'body .wp-block-group h4,body [class*="nfd-"] h1,body [class*="nfd-"] h2,' +
    'body [class*="nfd-"] h3,body [class*="nfd-"] h4,' +
    'body [class*="is-style-nfd-theme-"] h1,body [class*="is-style-nfd-theme-"] h2,' +
    'body [class*="is-style-nfd-theme-"] h3,body [class*="is-style-nfd-theme-"] h4' +
    '{color:' + GOLD_LT + ' !important;}',
    'body .wp-block-group p,body .wp-block-group li,body .wp-block-group span,' +
    'body [class*="nfd-"] p,body [class*="nfd-"] li,' +
    'body [class*="is-style-nfd-theme-"] p,body [class*="is-style-nfd-theme-"] span' +
    '{color:' + CREAM + ' !important;}',

    // The hero owns itself.
    '.mng-hero,.mng-hero *{}',

    // The canvas.
    '#mng-stars{position:fixed;inset:0;width:100vw;height:100vh;z-index:-1;' +
      'pointer-events:none;display:block;}'
  ].join('\n');
  document.head.appendChild(css);

  // Other plugins append stylesheets after ours, which cost us the cascade even with
  // !important at equal specificity. Re-park ours at the end once the page settles.
  function last(){ if (css.parentNode !== document.head ||
                       document.head.lastElementChild !== css) document.head.appendChild(css); }
  addEventListener('DOMContentLoaded', last);
  addEventListener('load', last);
  setTimeout(last, 400); setTimeout(last, 1600);

  // ---------------------------------------------------------------- starfield
  var cv = document.createElement('canvas');
  cv.id = 'mng-stars';
  cv.setAttribute('aria-hidden', 'true');
  (document.body || document.documentElement).appendChild(cv);

  var ctx = cv.getContext('2d', { alpha: false });
  var reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  var W = 0, H = 0, DPR = 1, stars = [], t0 = performance.now(), px = 0, py = 0, tx = 0, ty = 0;

  // Same three-depth model as the hero so the two read as one sky. Slightly sparser:
  // this canvas is behind body copy, and the hero's density would fight the text.
  var L = [
    { n: 210, s: 0.0020, sh: 4,  a: 0.50, r0: 0.4,  r1: 0.95 },
    { n: 120, s: 0.0055, sh: 11, a: 0.70, r0: 0.6,  r1: 1.4  },
    { n: 48,  s: 0.0115, sh: 22, a: 0.92, r0: 0.95, r1: 1.9  }
  ];

  function build() {
    stars = [];
    L.forEach(function (l, li) {
      var c = Math.round(l.n * (W * H) / (1600 * 900));
      for (var i = 0; i < c; i++) {
        stars.push({
          l: li, x: Math.random(), y: Math.random(),
          r: l.r0 + Math.random() * (l.r1 - l.r0),
          a: l.a * (0.45 + Math.random() * 0.55),
          tw: Math.random() * 6.283, ts: 0.4 + Math.random() * 1.1,
          warm: Math.random() < 0.15
        });
      }
    });
  }

  function resize() {
    DPR = Math.min(devicePixelRatio || 1, 2);
    W = innerWidth; H = innerHeight;
    cv.width = Math.round(W * DPR); cv.height = Math.round(H * DPR);
    ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
    build();
  }

  // One slow crossing on a long loop, behind everything — same idea as the hero's, but
  // rarer, because on a reading page a frequent moving object is a distraction.
  function sat(now) {
    var p = ((now + 9000) % 47000) / 47000;
    if (p > 0.40) return;
    var k = p / 0.40, x = -60 + k * (W + 120);
    var y = H * 0.14 + Math.sin(k * Math.PI) * -H * 0.03 + k * H * 0.05;
    var f = Math.sin(k * Math.PI);
    ctx.save(); ctx.globalCompositeOperation = 'lighter';
    var g = ctx.createLinearGradient(x - 200, y, x, y);
    g.addColorStop(0, 'rgba(232,228,216,0)');
    g.addColorStop(1, 'rgba(232,228,216,' + (0.5 * f) + ')');
    ctx.strokeStyle = g; ctx.lineWidth = 1.8;
    ctx.beginPath(); ctx.moveTo(x - 200, y + 7); ctx.lineTo(x, y); ctx.stroke();
    ctx.fillStyle = 'rgba(245,229,167,' + (0.9 * f) + ')';
    ctx.beginPath(); ctx.arc(x, y, 2.6, 0, 6.283); ctx.fill();
    ctx.fillStyle = 'rgba(245,229,167,' + (0.3 * f) + ')';
    ctx.beginPath(); ctx.arc(x, y, 12, 0, 6.283); ctx.fill();
    ctx.restore();
  }

  function frame(now) {
    if (W && H) {
      var t = now - t0;
      px += (tx - px) * 0.04; py += (ty - py) * 0.04;
      ctx.fillStyle = INK; ctx.fillRect(0, 0, W, H);
      for (var i = 0; i < stars.length; i++) {
        var s = stars[i], l = L[s.l];
        var x = (s.x * W - t * l.s * 0.06 + px * l.sh) % W; if (x < 0) x += W;
        var y = s.y * H + py * l.sh * 0.5;
        var tw = reduced ? 1 : 0.74 + 0.26 * Math.sin(s.tw + t * 0.001 * s.ts);
        ctx.fillStyle = (s.warm ? 'rgba(245,229,167,' : 'rgba(226,231,240,') + (s.a * tw) + ')';
        ctx.beginPath(); ctx.arc(x, y, s.r, 0, 6.283); ctx.fill();
      }
      if (!reduced) sat(now);
    }
    requestAnimationFrame(frame);
  }

  addEventListener('resize', resize, { passive: true });
  if (!reduced) addEventListener('pointermove', function (e) {
    tx = (e.clientX / innerWidth - 0.5) * 2;
    ty = (e.clientY / innerHeight - 0.5) * 2;
  }, { passive: true });

  resize();
  requestAnimationFrame(frame);
})();
