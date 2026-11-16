/* Grafici in SVG disegnati a mano dai file di risultati dei repository (nessuna libreria).
   Ogni grafico si ridisegna alla larghezza reale del contenitore e al cambio di lingua. */
(function () {
  'use strict';
  var NS = 'http://www.w3.org/2000/svg';

  /* physics-surrogate-benchmarks/results: Burgers 1D a t = 0,5, 101 dei 200 punti valutati */
  var PINN = {"x":[-1.0,-0.9799,-0.9598,-0.9397,-0.9196,-0.8995,-0.8794,-0.8593,-0.8392,-0.8191,-0.799,-0.7789,-0.7588,-0.7387,-0.7186,-0.6985,-0.6784,-0.6583,-0.6382,-0.6181,-0.598,-0.5779,-0.5578,-0.5377,-0.5176,-0.4975,-0.4774,-0.4573,-0.4372,-0.4171,-0.397,-0.3769,-0.3568,-0.3367,-0.3166,-0.2965,-0.2764,-0.2563,-0.2362,-0.2161,-0.196,-0.1759,-0.1558,-0.1357,-0.1156,-0.0955,-0.0754,-0.0553,-0.0352,-0.0151,0.005,0.0251,0.0452,0.0653,0.0854,0.1055,0.1256,0.1457,0.1658,0.1859,0.206,0.2261,0.2462,0.2663,0.2864,0.3065,0.3266,0.3467,0.3668,0.3869,0.407,0.4271,0.4472,0.4673,0.4874,0.5075,0.5276,0.5477,0.5678,0.5879,0.608,0.6281,0.6482,0.6683,0.6884,0.7085,0.7286,0.7487,0.7688,0.7889,0.809,0.8291,0.8492,0.8693,0.8894,0.9095,0.9296,0.9497,0.9698,0.9899,1.0],"ref":[0.0,0.0245,0.049,0.0735,0.098,0.1224,0.1468,0.1712,0.1955,0.2198,0.2441,0.2682,0.2923,0.3163,0.3403,0.3641,0.3879,0.4115,0.4351,0.4584,0.4817,0.5048,0.5278,0.5506,0.5732,0.5956,0.6177,0.6397,0.6614,0.6829,0.704,0.7249,0.7454,0.7655,0.7853,0.8046,0.8234,0.8417,0.8595,0.8766,0.893,0.9086,0.9233,0.9369,0.9494,0.9605,0.97,0.9774,0.9823,0.9655,-0.6396,-0.9828,-0.9802,-0.974,-0.9655,-0.9552,-0.9433,-0.9303,-0.9161,-0.9009,-0.8849,-0.8681,-0.8507,-0.8327,-0.8141,-0.795,-0.7755,-0.7555,-0.7352,-0.7145,-0.6935,-0.6722,-0.6506,-0.6288,-0.6067,-0.5844,-0.5619,-0.5392,-0.5163,-0.4933,-0.4701,-0.4468,-0.4233,-0.3997,-0.376,-0.3522,-0.3283,-0.3043,-0.2803,-0.2561,-0.2319,-0.2077,-0.1834,-0.159,-0.1346,-0.1102,-0.0857,-0.0612,-0.0368,-0.0123,-0.0],"pinn":[0.0009,0.0259,0.0508,0.0758,0.1008,0.1257,0.1506,0.1754,0.2001,0.2248,0.2493,0.2737,0.2979,0.322,0.3459,0.3696,0.3932,0.4165,0.4396,0.4626,0.4853,0.5079,0.5303,0.5525,0.5746,0.5965,0.6183,0.64,0.6617,0.6833,0.7048,0.7263,0.7478,0.7692,0.7905,0.8116,0.8325,0.8531,0.8731,0.8925,0.911,0.9284,0.9442,0.9582,0.9701,0.9794,0.9856,0.9875,0.9844,0.9632,-0.4723,-0.9564,-0.9585,-0.9566,-0.9514,-0.9438,-0.9339,-0.9219,-0.9079,-0.8924,-0.8756,-0.8578,-0.8394,-0.8205,-0.8014,-0.782,-0.7626,-0.7431,-0.7235,-0.7038,-0.6839,-0.664,-0.6438,-0.6234,-0.6027,-0.5817,-0.5604,-0.5388,-0.5168,-0.4944,-0.4718,-0.4488,-0.4255,-0.402,-0.3782,-0.3542,-0.33,-0.3057,-0.2813,-0.2567,-0.2321,-0.2075,-0.1829,-0.1582,-0.1336,-0.1091,-0.0846,-0.0602,-0.0359,-0.0117,0.0003]};

  /* physics-surrogate-benchmarks/results: FNO, errore L2 relativo per risoluzione */
  var FNO = [[64, 0.000493], [128, 0.000505], [256, 0.000513]];

  /* hybrid-rag-mcp/results: 28 query, overall */
  var RAG = {
    rows: ['Recall@1', 'Recall@3', 'Recall@5', 'MRR@5'],
    series: [
      { key: 'js.hybrid', cls: 's1', v: [0.9286, 1.0, 1.0, 0.9524] },
      { key: 'js.vector', cls: 's2', v: [0.9286, 0.9643, 1.0, 0.9476] },
      { key: 'js.bm25', cls: 's3', v: [0.9286, 0.9286, 1.0, 0.9446] }
    ]
  };

  /* agent-finops-router/results: 1.000 richieste, seed 42 */
  var FIN = [['priority', 21.47, 5], ['latency_optimized', 2.51, 126], ['cost_optimized', 0.71, 149]];

  var t = function (k) { return window.I18N ? window.I18N.t(k) : k; };
  var f = function (n, d) { return window.I18N ? window.I18N.fmt(n, d) : n.toFixed(d); };
  var usd = function (n) {
    var lang = window.I18N ? window.I18N.lang() : 'it';
    return lang === 'en' ? '$' + f(n, 2) : f(n, 2) + ' $';
  };

  function el(tag, attrs, parent, text) {
    var n = document.createElementNS(NS, tag);
    for (var k in attrs) if (Object.prototype.hasOwnProperty.call(attrs, k)) n.setAttribute(k, attrs[k]);
    if (text !== undefined) n.textContent = text;
    if (parent) parent.appendChild(n);
    return n;
  }

  function frame(host, h) {
    host.textContent = '';
    var w = Math.max(260, Math.round(host.clientWidth));
    var svg = el('svg', { width: w, height: h, viewBox: '0 0 ' + w + ' ' + h, 'aria-hidden': 'true', focusable: 'false' }, host);
    var tip = document.createElement('div');
    tip.className = 'tip';
    host.appendChild(tip);
    return { svg: svg, w: w, h: h, tip: tip };
  }

  function showTip(c, x, y, html) {
    c.tip.innerHTML = html;
    c.tip.style.left = Math.min(Math.max(x, 70), c.w - 70) + 'px';
    c.tip.style.top = y + 'px';
    c.tip.classList.add('on');
  }
  function hideTip(c) { c.tip.classList.remove('on'); }
  function dot(cls) { return '<i style="background:var(--' + cls + ')"></i>'; }

  /* ---- PINN contro soluzione esatta: linee + mirino ---------------------------------------- */
  function drawPinn(host) {
    var c = frame(host, host.clientWidth < 420 ? 220 : 260);
    var m = { l: 36, r: 12, t: 10, b: 26 };
    var iw = c.w - m.l - m.r, ih = c.h - m.t - m.b;
    var sx = function (x) { return m.l + (x + 1) / 2 * iw; };
    var sy = function (y) { return m.t + (1.1 - y) / 2.2 * ih; };
    var g = c.svg;

    [-1, -0.5, 0, 0.5, 1].forEach(function (v) {
      el('line', { x1: m.l, x2: c.w - m.r, y1: sy(v), y2: sy(v), class: v === 0 ? 'axis' : 'grid' }, g);
      el('text', { x: m.l - 6, y: sy(v) + 4, 'text-anchor': 'end' }, g, f(v, 1));
    });
    [-1, -0.5, 0, 0.5, 1].forEach(function (v) {
      el('text', { x: v === 1 ? c.w - 1 : sx(v), y: c.h - 8, 'text-anchor': v === 1 ? 'end' : 'middle' }, g, (v === 1 ? 'x = ' : '') + f(v, 1));
    });

    var path = function (arr) {
      return arr.map(function (y, i) { return (i ? 'L' : 'M') + sx(PINN.x[i]).toFixed(1) + ' ' + sy(y).toFixed(1); }).join('');
    };
    el('path', { d: path(PINN.ref), class: 's1 line' }, g);
    el('path', { d: path(PINN.pinn), class: 's2 line dash' }, g);

    /* annotazione sull’errore massimo, al fronte d’urto */
    var k = 50, ax = sx(PINN.x[k]);
    el('line', { x1: ax, x2: ax, y1: sy(PINN.pinn[k]), y2: sy(PINN.ref[k]), class: 'cross' }, g);
    el('text', { x: ax + 8, y: sy(-0.56), class: 'lbl' }, g, 'max |Δ| ' + f(0.1673, 2));

    var cross = el('line', { y1: m.t, y2: c.h - m.b, class: 'cross', visibility: 'hidden' }, g);
    var d1 = el('circle', { r: 4.5, class: 's1 ring', visibility: 'hidden' }, g);
    var d2 = el('circle', { r: 4.5, class: 's2 ring', visibility: 'hidden' }, g);
    var hit = el('rect', { x: m.l, y: m.t, width: iw, height: ih, class: 'hit' }, g);

    function move(evt) {
      var r = c.svg.getBoundingClientRect();
      var px = (evt.touches ? evt.touches[0].clientX : evt.clientX) - r.left;
      var xv = (px - m.l) / iw * 2 - 1, i = 0, best = 9;
      PINN.x.forEach(function (x, j) { var dd = Math.abs(x - xv); if (dd < best) { best = dd; i = j; } });
      var X = sx(PINN.x[i]);
      cross.setAttribute('x1', X); cross.setAttribute('x2', X); cross.setAttribute('visibility', 'visible');
      d1.setAttribute('cx', X); d1.setAttribute('cy', sy(PINN.ref[i])); d1.setAttribute('visibility', 'visible');
      d2.setAttribute('cx', X); d2.setAttribute('cy', sy(PINN.pinn[i])); d2.setAttribute('visibility', 'visible');
      showTip(c, X, Math.min(sy(PINN.ref[i]), sy(PINN.pinn[i])),
        'x = ' + f(PINN.x[i], 3) + '<br>' + dot('s1') + t('js.exact') + ' ' + f(PINN.ref[i], 3) +
        '<br>' + dot('s2') + 'PINN ' + f(PINN.pinn[i], 3) +
        '<br>' + t('js.diff') + ' ' + f(Math.abs(PINN.ref[i] - PINN.pinn[i]), 3));
    }
    function leave() {
      [cross, d1, d2].forEach(function (n) { n.setAttribute('visibility', 'hidden'); });
      hideTip(c);
    }
    hit.addEventListener('mousemove', move);
    hit.addEventListener('touchstart', move, { passive: true });
    hit.addEventListener('touchmove', move, { passive: true });
    hit.addEventListener('mouseleave', leave);
    hit.addEventListener('touchend', leave);
  }

  /* ---- FNO: colonne dall’origine, una per risoluzione ------------------------------------- */
  function drawFno(host) {
    var c = frame(host, 220);
    var m = { l: 48, r: 12, t: 22, b: 40 };
    var iw = c.w - m.l - m.r, ih = c.h - m.t - m.b, max = 0.06;
    var sy = function (v) { return m.t + (1 - v / max) * ih; };
    var g = c.svg;
    [0, 0.02, 0.04, 0.06].forEach(function (v) {
      el('line', { x1: m.l, x2: c.w - m.r, y1: sy(v), y2: sy(v), class: v === 0 ? 'axis' : 'grid' }, g);
      el('text', { x: m.l - 6, y: sy(v) + 4, 'text-anchor': 'end' }, g, f(v, 2) + ' %');
    });
    var slot = iw / FNO.length, bw = Math.min(56, slot * 0.46);
    FNO.forEach(function (d, i) {
      var pct = d[1] * 100, cx = m.l + slot * (i + 0.5), top = sy(pct), bh = sy(0) - top;
      var hit = el('rect', { x: cx - slot / 2, y: m.t, width: slot, height: ih, class: 'hit' }, g);
      var bar = el('path', {
        d: 'M' + (cx - bw / 2) + ' ' + sy(0) + 'V' + (top + 4) + 'Q' + (cx - bw / 2) + ' ' + top + ' ' + (cx - bw / 2 + 4) + ' ' + top +
           'H' + (cx + bw / 2 - 4) + 'Q' + (cx + bw / 2) + ' ' + top + ' ' + (cx + bw / 2) + ' ' + (top + 4) + 'V' + sy(0) + 'Z',
        class: 's1 mark'
      }, g);
      el('text', { x: cx, y: top - 6, 'text-anchor': 'middle', class: 'val' }, g, f(pct, 3) + ' %');
      el('text', { x: cx, y: c.h - 22, 'text-anchor': 'middle', class: 'lbl' }, g, d[0] + ' ' + t('js.points'));
      if (i === 0) { var tr = el('text', { x: cx, y: c.h - 8, 'text-anchor': 'middle' }, g, t('js.trained')); if (cx - tr.getComputedTextLength() / 2 < 0) { tr.setAttribute('x', 0); tr.setAttribute('text-anchor', 'start'); } }
      var on = function () {
        bar.classList.add('on');
        showTip(c, cx, top, t('js.grid') + ' ' + d[0] + ' ' + t('js.points') + '<br>' + t('js.err') + ' ' + f(pct, 4) + ' %');
      };
      var off = function () { bar.classList.remove('on'); hideTip(c); };
      hit.addEventListener('mouseenter', on); hit.addEventListener('mouseleave', off);
      hit.addEventListener('touchstart', on, { passive: true }); hit.addEventListener('touchend', off);
    });
  }

  /* ---- RAG: dot plot, asse da 0,85 a 1,00 --------------------------------------------------- */
  function drawRag(host) {
    var rowH = 40;
    var c = frame(host, RAG.rows.length * rowH + 34);
    var m = { l: 74, r: 18, t: 8, b: 26 };
    var iw = c.w - m.l - m.r, lo = 0.85, hi = 1.0;
    var sx = function (v) { return m.l + (v - lo) / (hi - lo) * iw; };
    var g = c.svg;
    [0.85, 0.9, 0.95, 1.0].forEach(function (v) {
      el('line', { x1: sx(v), x2: sx(v), y1: m.t, y2: c.h - m.b, class: 'grid' }, g);
      el('text', { x: sx(v), y: c.h - 8, 'text-anchor': 'middle' }, g, f(v, 2));
    });
    RAG.rows.forEach(function (name, r) {
      var cy = m.t + rowH * (r + 0.5);
      el('text', { x: 0, y: cy + 4, class: 'lbl' }, g, name);
      el('line', { x1: m.l, x2: c.w - m.r, y1: cy, y2: cy, class: 'axis' }, g);
      RAG.series.forEach(function (s, i) {
        var y = cy + (i - 1) * 9, x = sx(s.v[r]);
        var hit = el('circle', { cx: x, cy: y, r: 11, class: 'hit' }, g);
        var mk = el('circle', { cx: x, cy: y, r: 5, class: s.cls + ' ring mark' }, g);
        var on = function () {
          mk.classList.add('on');
          showTip(c, x, y - 6, dot(s.cls) + t(s.key) + '<br>' + name + ' ' + f(s.v[r], 3));
        };
        var off = function () { mk.classList.remove('on'); hideTip(c); };
        hit.addEventListener('mouseenter', on); hit.addEventListener('mouseleave', off);
        hit.addEventListener('touchstart', on, { passive: true }); hit.addEventListener('touchend', off);
      });
    });
  }

  /* ---- FinOps: barre orizzontali dall’origine ---------------------------------------------- */
  function drawFin(host) {
    var narrow = host.clientWidth < 460, rowH = narrow ? 52 : 40;
    var c = frame(host, FIN.length * rowH + 8);
    var m = { l: narrow ? 0 : 128, r: narrow ? 64 : 176 };
    var iw = c.w - m.l - m.r - (narrow ? 60 : 64), max = 22; /* spazio riservato all'etichetta del valore */
    var g = c.svg;
    FIN.forEach(function (d, i) {
      var y0 = 4 + i * rowH, by = narrow ? y0 + 20 : y0 + 10, bh = 16, bw = Math.max(3, d[1] / max * iw);
      el('text', { x: 0, y: narrow ? y0 + 12 : by + 12, class: 'lbl' }, g, d[0]);
      var hit = el('rect', { x: 0, y: y0, width: c.w, height: rowH - 4, class: 'hit' }, g);
      var r = Math.min(4, bw / 2);
      var bar = el('path', {
        d: 'M' + m.l + ' ' + by + 'H' + (m.l + bw - r) + 'Q' + (m.l + bw) + ' ' + by + ' ' + (m.l + bw) + ' ' + (by + r) +
           'V' + (by + bh - r) + 'Q' + (m.l + bw) + ' ' + (by + bh) + ' ' + (m.l + bw - r) + ' ' + (by + bh) + 'H' + m.l + 'Z',
        class: 's1 mark'
      }, g);
      el('text', { x: m.l + bw + 6, y: by + 12, class: 'val' }, g, usd(d[1]));
      el('text', { x: c.w, y: by + 12, 'text-anchor': 'end' }, g, narrow ? '↻ ' + d[2] : d[2] + ' ' + t('js.wasted'));
      var on = function () {
        bar.classList.add('on');
        showTip(c, m.l + bw / 2 + 20, by, d[0] + '<br>' + t('js.cost') + ' ' + usd(d[1]) + '<br>' + d[2] + ' ' + t('js.wasted'));
      };
      var off = function () { bar.classList.remove('on'); hideTip(c); };
      hit.addEventListener('mouseenter', on); hit.addEventListener('mouseleave', off);
      hit.addEventListener('touchstart', on, { passive: true }); hit.addEventListener('touchend', off);
    });
  }

  /* ---- schema del banco HIL ---------------------------------------------------------------- */
  function drawHil(host) {
    var w = Math.max(260, host.clientWidth), vertical = w < 620;
    var boxes = [
      { lines: [t('js.hil_tool'), t('js.hil_tool2')] },
      { lines: ['STM32G474', t('js.hil_mcu2'), 'HRTIM · CORDIC · SVPWM · MTPA'], hl: true },
      { lines: ['RT Box 3', t('js.hil_rt2'), t('js.hil_rt3')], hl: true }
    ];
    /* misura i testi reali (lingua e font correnti) per dimensionare riquadri e frecce */
    var probe = frame(host, 10).svg;
    var measure = function (s, cls) {
      var n = el('text', { x: 0, y: 0, class: cls }, probe, s);
      var len = n.getComputedTextLength();
      probe.removeChild(n);
      return len;
    };
    var need = boxes.map(function (b) {
      return Math.max.apply(null, b.lines.map(function (s, j) { return measure(s, j === 0 ? 't-strong' : 't-body'); })) + 26;
    });
    var gapA = measure(t('js.hil_flash'), 't-body') + 34;
    var gapB = Math.max(measure(t('js.hil_pwm'), 't-sig'), measure(t('js.hil_meas'), 't-body')) + 34;
    var total = need[0] + need[1] + need[2] + gapA + gapB;
    vertical = total > w;
    var row2 = need[1] + gapB + need[2], hybrid = vertical && row2 <= w;
    var c, g, pos = [];
    if (hybrid) {
      /* toolchain sopra, MCU e RT Box affiancati sotto: niente colonna stretta su schermi medi */
      var ex = (w - row2) / 2, th = 64, ry = th + 50, rh = 82;
      c = frame(host, ry + rh + 34); g = c.svg;
      pos.push({ x: 0, y: 0, w: need[1] + ex, h: th });
      pos.push({ x: 0, y: ry, w: need[1] + ex, h: rh });
      pos.push({ x: need[1] + ex + gapB, y: ry, w: need[2] + ex, h: rh });
      var hx = 40, rm = ry + rh / 2, f1 = pos[1].x + pos[1].w;
      arrow(g, hx, th, hx, ry - 2);
      el('text', { x: hx + 12, y: th + 29, class: 't-body' }, g, t('js.hil_flash'));
      arrow(g, f1, rm - 12, pos[2].x - 2, rm - 12);
      el('text', { x: (f1 + pos[2].x) / 2, y: rm - 20, 'text-anchor': 'middle', class: 't-sig' }, g, t('js.hil_pwm'));
      arrow(g, pos[2].x, rm + 12, f1 + 2, rm + 12);
      el('text', { x: (f1 + pos[2].x) / 2, y: rm + 30, 'text-anchor': 'middle', class: 't-body' }, g, t('js.hil_meas'));
      el('text', { x: 0, y: c.h - 6, class: 't-body' }, g, t('js.hil_cases'));
    } else if (!vertical) {
      c = frame(host, 150); g = c.svg;
      var extra = (w - total) / 3, bh = 82, y = 22, xx = 0, gaps = [gapA, gapB, 0];
      need.forEach(function (n, i) { pos.push({ x: xx, y: y, w: n + extra, h: bh }); xx += n + extra + gaps[i]; });
      var mid = y + bh / 2, e0 = pos[0].x + pos[0].w, e1 = pos[1].x + pos[1].w;
      arrow(g, e0, mid, pos[1].x - 2, mid);
      el('text', { x: (e0 + pos[1].x) / 2, y: mid - 8, 'text-anchor': 'middle', class: 't-body' }, g, t('js.hil_flash'));
      arrow(g, e1, mid - 12, pos[2].x - 2, mid - 12);
      el('text', { x: (e1 + pos[2].x) / 2, y: mid - 20, 'text-anchor': 'middle', class: 't-sig' }, g, t('js.hil_pwm'));
      arrow(g, pos[2].x, mid + 12, e1 + 2, mid + 12);
      el('text', { x: (e1 + pos[2].x) / 2, y: mid + 30, 'text-anchor': 'middle', class: 't-body' }, g, t('js.hil_meas'));
      el('text', { x: pos[1].x, y: 140, class: 't-body' }, g, t('js.hil_cases'));
    } else {
      var bh2 = 70, gap2 = 46;
      c = frame(host, bh2 * 3 + gap2 * 2 + 26); g = c.svg;
      var bw2 = Math.min(w, Math.max(300, need[0], need[1], need[2])), x0 = 0;
      boxes.forEach(function (b, i) { pos.push({ x: x0, y: i * (bh2 + gap2), w: bw2, h: bh2 }); });
      var cx = x0 + 40;
      arrow(g, cx, pos[0].y + bh2, cx, pos[1].y - 2);
      el('text', { x: cx + 12, y: pos[0].y + bh2 + gap2 / 2 + 4, class: 't-body' }, g, t('js.hil_flash'));
      arrow(g, cx, pos[1].y + bh2, cx, pos[2].y - 2);
      el('text', { x: cx + 12, y: pos[1].y + bh2 + gap2 / 2 + 4, class: 't-sig' }, g, t('js.hil_pwm'));
      var cx2 = x0 + bw2 - 40;
      arrow(g, cx2, pos[2].y, cx2, pos[1].y + bh2 + 2);
      el('text', { x: cx2 - 12, y: pos[1].y + bh2 + gap2 / 2 + 4, 'text-anchor': 'end', class: 't-body' }, g, t('js.hil_meas'));
      el('text', { x: 0, y: c.h - 6, class: 't-body' }, g, t('js.hil_cases'));
    }
    boxes.forEach(function (b, i) {
      var p = pos[i];
      el('rect', { x: p.x + 0.5, y: p.y + 0.5, width: p.w - 1, height: p.h - 1, rx: 3, class: 'box' + (b.hl ? ' box--hl' : '') }, g);
      b.lines.forEach(function (s, j) {
        el('text', { x: p.x + 12, y: p.y + 24 + j * 18, class: j === 0 ? 't-strong' : 't-body' }, g, s);
      });
    });
  }

  function arrow(g, x1, y1, x2, y2) {
    var a = Math.atan2(y2 - y1, x2 - x1), L = 7;
    el('line', { x1: x1, y1: y1, x2: x2 - Math.cos(a) * L, y2: y2 - Math.sin(a) * L, class: 'wire' }, g);
    var p = function (da) { return (x2 - Math.cos(a + da) * L) + ',' + (y2 - Math.sin(a + da) * L); };
    el('polygon', { points: x2 + ',' + y2 + ' ' + p(0.45) + ' ' + p(-0.45), class: 'arrow' }, g);
  }

  var CHARTS = { 'chart-pinn': drawPinn, 'chart-fno': drawFno, 'chart-rag': drawRag, 'chart-fin': drawFin, 'chart-hil': drawHil };

  function renderAll() {
    Object.keys(CHARTS).forEach(function (id) {
      var host = document.getElementById(id);
      if (host) CHARTS[id](host);
    });
  }

  function start() {
    renderAll();
    document.addEventListener('langchange', renderAll);
    var lastW = window.innerWidth, timer = 0;
    window.addEventListener('resize', function () {
      if (window.innerWidth === lastW) return;
      lastW = window.innerWidth;
      clearTimeout(timer);
      timer = setTimeout(renderAll, 120);
    });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start);
  else start();
})();
