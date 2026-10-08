/* Flow-field background — a calm CFD-style field of warped iso-contours.
 *
 * Built to be cheap and to degrade gracefully:
 *  - renders at 25–50% of CSS resolution (the soft look hides the upscale)
 *  - 3 domain-warped fbm layers, 4 octaves (≈1/3 of the ALU work of the old shader)
 *  - capped at 30 fps (24 on touch devices) and paused while the tab is hidden
 *  - on touch devices it also pauses while the page is scrolling, so scroll never competes with the GPU
 *  - an adaptive governor lowers the resolution, then freezes the field, if frames get slow
 *  - reduced motion / data saver / very low-end devices: a single static frame
 *  - no WebGL, context loss or shader failure: the CSS gradient behind the canvas simply stays
 */
(function () {
  'use strict';

  var canvas = document.getElementById('flow');
  if (!canvas) return;

  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var coarse = window.matchMedia('(pointer: coarse)').matches;
  var conn = navigator.connection || {};
  var weak = (navigator.hardwareConcurrency || 4) <= 2 || (navigator.deviceMemory || 4) <= 2;
  var staticOnly = reduce || conn.saveData === true || weak;

  var gl = null;
  try { gl = canvas.getContext('webgl', { alpha: false, antialias: false, depth: false, stencil: false, powerPreference: 'low-power', preserveDrawingBuffer: false }); } catch (e) { gl = null; }
  if (!gl) return;

  var hasDeriv = !!gl.getExtension('OES_standard_derivatives');
  var highp = gl.getShaderPrecisionFormat && gl.getShaderPrecisionFormat(gl.FRAGMENT_SHADER, gl.HIGH_FLOAT).precision > 0;

  var VS = 'attribute vec2 a;void main(){gl_Position=vec4(a,0.,1.);}';
  var FS = [
    hasDeriv ? '#extension GL_OES_standard_derivatives : enable' : '',
    highp ? 'precision highp float;' : 'precision mediump float;',
    'uniform vec2 uRes;uniform float uTime;',
    'float hash(vec2 p){vec3 q=fract(vec3(p.xyx)*.1031);q+=dot(q,q.yzx+33.33);return fract((q.x+q.y)*q.z);}',
    'float noise(vec2 p){vec2 i=floor(p),f=fract(p);f=f*f*(3.-2.*f);',
    ' return mix(mix(hash(i),hash(i+vec2(1.,0.)),f.x),mix(hash(i+vec2(0.,1.)),hash(i+vec2(1.,1.)),f.x),f.y);}',
    'float fbm(vec2 p){float v=0.,a=.5;for(int i=0;i<4;i++){v+=a*noise(p);p=p*2.03+vec2(7.1,3.7);a*=.5;}return v;}',
    'void main(){',
    ' vec2 uv=gl_FragCoord.xy/uRes;',
    ' vec2 p=(uv-.5)*vec2(uRes.x/uRes.y,1.)*2.6;',
    ' float t=uTime*.035;',
    ' vec2 q=vec2(fbm(p+vec2(0.,t)),fbm(p+vec2(5.2,1.3)-vec2(t,0.)));',
    ' float f=fbm(p+2.4*q+vec2(t*.6,-t*.4));',
    ' float x=f*8.;',
    ' float c=abs(fract(x)-.5);',
    hasDeriv ? ' float w=max(fwidth(x)*.9,.0001);float line=1.-smoothstep(0.,w,c);float halo=1.-smoothstep(0.,w*5.,c);'
             : ' float line=1.-smoothstep(0.,.045,c);float halo=1.-smoothstep(0.,.2,c);',
    ' vec3 base=vec3(.020,.031,.075);',
    ' vec3 col=base+vec3(.012,.040,.080)*f*f;',
    ' vec3 cy=vec3(.20,.91,1.),vi=vec3(.56,.49,1.),go=vec3(1.,.83,.47);',
    ' vec3 hue=mix(cy,vi,smoothstep(.30,.75,q.x));',
    ' col+=hue*(line*.60+halo*.16);',
    ' col+=go*line*smoothstep(.74,.96,q.y)*.55;',
    ' col*=1.-.55*dot(uv-.5,uv-.5);',
    ' gl_FragColor=vec4(col,1.);',
    '}',
  ].join('\n');

  var program = null, uRes = null, uTime = null, buffer = null;

  function compile(type, src) {
    var s = gl.createShader(type);
    gl.shaderSource(s, src); gl.compileShader(s);
    if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) { gl.deleteShader(s); return null; }
    return s;
  }
  function init() {
    var vs = compile(gl.VERTEX_SHADER, VS), fs = compile(gl.FRAGMENT_SHADER, FS);
    if (!vs || !fs) return false;
    program = gl.createProgram();
    gl.attachShader(program, vs); gl.attachShader(program, fs); gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return false;
    gl.useProgram(program);
    buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    var loc = gl.getAttribLocation(program, 'a');
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
    uRes = gl.getUniformLocation(program, 'uRes');
    uTime = gl.getUniformLocation(program, 'uTime');
    return true;
  }
  if (!init()) return;

  /* ---- sizing ----------------------------------------------------------------------- */
  var scale = coarse ? 0.4 : 0.5;
  var MIN_SCALE = 0.25;
  var lastW = 0, lastH = 0;
  function resize(force) {
    var w = Math.max(2, Math.round(window.innerWidth * scale));
    var h = Math.max(2, Math.round(window.innerHeight * scale));
    // ignore tiny height jitter (mobile URL bar) to avoid re-allocating the drawing buffer while scrolling
    if (!force && w === lastW && Math.abs(h - lastH) < Math.max(12, lastH * 0.12)) return false;
    lastW = w; lastH = h;
    canvas.width = w; canvas.height = h;
    gl.viewport(0, 0, w, h);
    return true;
  }
  resize(true);

  function draw(ms) {
    gl.uniform2f(uRes, canvas.width, canvas.height);
    gl.uniform1f(uTime, ms / 1000);
    gl.drawArrays(gl.TRIANGLES, 0, 3);
    if (!canvas.classList.contains('is-ready')) canvas.classList.add('is-ready');
  }

  var resizeTimer = null;
  window.addEventListener('resize', function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function () { if (resize(false) && (staticOnly || stopped)) draw(14000); }, 180);
  }, { passive: true });

  /* ---- static modes ------------------------------------------------------------------- */
  var stopped = false;
  if (staticOnly) { draw(14000); return; }

  /* ---- animation loop -------------------------------------------------------------------- */
  var interval = 1000 / (coarse ? 24 : 30);
  var last = 0, acc = 0, frames = 0, raf = 0;
  var visible = !document.hidden;
  var scrolling = false, scrollTimer = 0;

  function downgrade() {
    if (scale > MIN_SCALE + 0.001) { scale = Math.max(MIN_SCALE, scale - 0.1); resize(true); return; }
    stopped = true; cancelAnimationFrame(raf);           // slow even at the lowest quality: freeze on the last frame
  }

  function frame(now) {
    raf = requestAnimationFrame(frame);
    if (!visible || (coarse && scrolling)) { last = now; return; }
    var dt = now - last;
    if (dt < interval - 2) return;
    last = now;
    draw(now);
    acc += dt; frames++;
    if (frames === 50) {
      if (acc / frames > interval * 1.6) downgrade();
      acc = 0; frames = 0;
    }
  }

  document.addEventListener('visibilitychange', function () {
    visible = !document.hidden; last = performance.now(); acc = 0; frames = 0;
  });
  if (coarse) {
    window.addEventListener('scroll', function () {
      scrolling = true; clearTimeout(scrollTimer);
      scrollTimer = setTimeout(function () { scrolling = false; }, 160);
    }, { passive: true });
  }
  canvas.addEventListener('webglcontextlost', function (e) { e.preventDefault(); stopped = true; cancelAnimationFrame(raf); });
  canvas.addEventListener('webglcontextrestored', function () {
    if (init()) { resize(true); stopped = false; last = performance.now(); raf = requestAnimationFrame(frame); }
  });

  // brighter over the hero, calmer behind long reading sections (no per-frame work: one class toggle)
  var hero = document.getElementById('top');
  if (hero && 'IntersectionObserver' in window) {
    new IntersectionObserver(function (e) {
      document.documentElement.style.setProperty('--flow-o', e[0].isIntersecting ? '0.62' : '0.44');
    }, { threshold: 0.25 }).observe(hero);
  }

  raf = requestAnimationFrame(function (t) { last = t; frame(t); });
})();
