/* ============= CUSTOM CURSOR ============= */
const cursor = document.getElementById('cursor');
const ring = document.getElementById('cursor-ring');
let mx = 0, my = 0, rx = 0, ry = 0;

if (window.matchMedia('(min-width: 769px)').matches) {
  document.addEventListener('mousemove', (e) => {
    mx = e.clientX;
    my = e.clientY;
    cursor.style.transform = `translate(${mx - 4}px, ${my - 4}px)`;
  });

  function animateRing() {
    rx += (mx - rx) * 0.18;
    ry += (my - ry) * 0.18;
    ring.style.left = rx + 'px';
    ring.style.top = ry + 'px';
    requestAnimationFrame(animateRing);
  }
  animateRing();

  document.querySelectorAll('a, button, .showcase-card, textarea, .doc-card').forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursor.classList.add('hover-state');
      ring.classList.add('hover-state');
    });
    el.addEventListener('mouseleave', () => {
      cursor.classList.remove('hover-state');
      ring.classList.remove('hover-state');
    });
  });
}

/* ============= NAV SCROLL ============= */
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  if (window.scrollY > 40) nav.classList.add('scrolled');
  else nav.classList.remove('scrolled');
});

/* ============= MOBILE MENU ============= */
const menuToggle = document.getElementById('menu-toggle');
const navLinks = document.getElementById('nav-links');
menuToggle?.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});
navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => navLinks.classList.remove('open')));

/* ============= REVEAL ON SCROLL ============= */
const reveals = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });
reveals.forEach(r => observer.observe(r));

/* ============= PARTICLES ============= */
const canvas = document.getElementById('particles');
const ctx = canvas.getContext('2d');
let particles = [];

function sizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
sizeCanvas();
window.addEventListener('resize', sizeCanvas);

class Particle {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.vx = (Math.random() - 0.5) * 0.3;
    this.vy = (Math.random() - 0.5) * 0.3;
    this.radius = Math.random() * 1.5 + 0.3;
    const colors = ['rgba(255, 0, 110,', 'rgba(0, 240, 255,', 'rgba(139, 0, 255,', 'rgba(198, 255, 0,'];
    this.color = colors[Math.floor(Math.random() * colors.length)];
    this.alpha = Math.random() * 0.5 + 0.1;
    this.alphaDir = Math.random() > 0.5 ? 1 : -1;
  }
  update() {
    this.x += this.vx;
    this.y += this.vy;
    if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
    if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
    this.alpha += this.alphaDir * 0.003;
    if (this.alpha > 0.6 || this.alpha < 0.05) this.alphaDir *= -1;
  }
  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = this.color + this.alpha + ')';
    ctx.shadowBlur = 8;
    ctx.shadowColor = this.color + '0.8)';
    ctx.fill();
  }
}

function initParticles() {
  particles = [];
  const count = window.innerWidth < 768 ? 30 : 70;
  for (let i = 0; i < count; i++) particles.push(new Particle());
}
initParticles();
window.addEventListener('resize', initParticles);

function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach(p => { p.update(); p.draw(); });
  requestAnimationFrame(animateParticles);
}
animateParticles();

/* ============= PLAYGROUND ============= */
const presets = {
  levitate: `/* levitate :: floating + glow */
@keyframes pulse-levitate {
  0%, 100% {
    transform: translateY(0) rotate(0deg);
    box-shadow: 0 0 30px #ff006e;
  }
  50% {
    transform: translateY(-30px) rotate(180deg);
    box-shadow: 0 30px 60px #ff006e;
  }
}

#playground-target {
  animation: pulse-levitate 3s
    cubic-bezier(.4, 0, .2, 1) infinite;
}`,
  orbit: `/* orbit :: circular motion */
@keyframes pulse-orbit {
  0% {
    transform: rotate(0deg)
      translateX(60px) rotate(0deg);
  }
  100% {
    transform: rotate(360deg)
      translateX(60px) rotate(-360deg);
  }
}

#playground-target {
  animation: pulse-orbit 4s linear infinite;
  border-radius: 50%;
  background: linear-gradient(135deg, #00f0ff, #8b00ff);
  box-shadow: 0 0 40px #00f0ff;
}`,
  warp: `/* warp :: dimensional distortion */
@keyframes pulse-warp {
  0%, 100% {
    transform: scale(1) skew(0deg);
    border-radius: 0;
  }
  25% {
    transform: scale(1.4, 0.6) skew(15deg);
    border-radius: 50% 0;
  }
  50% {
    transform: scale(0.6, 1.4) skew(-15deg);
    border-radius: 0 50%;
  }
  75% {
    transform: scale(1.2) skew(5deg);
    border-radius: 50%;
  }
}

#playground-target {
  animation: pulse-warp 2.5s
    cubic-bezier(.68, -0.55, .27, 1.55) infinite;
  background: linear-gradient(135deg, #c6ff00, #ff006e);
}`,
  glitch: `/* glitch :: chromatic shift */
@keyframes pulse-glitch {
  0%, 90%, 100% {
    transform: translate(0);
    filter: hue-rotate(0deg);
  }
  10% { transform: translate(-5px, 3px); filter: hue-rotate(90deg); }
  20% { transform: translate(5px, -3px); filter: hue-rotate(180deg); }
  30% { transform: translate(-3px, -5px); filter: hue-rotate(270deg); }
  40% { transform: translate(3px, 5px); filter: hue-rotate(360deg); }
  70% { transform: translate(-4px, 1px); filter: hue-rotate(45deg); }
}

#playground-target {
  animation: pulse-glitch 1.2s steps(8) infinite;
  background: linear-gradient(135deg, #ff006e, #00f0ff);
}`,
  bounce: `/* bounce :: spring physics */
@keyframes pulse-bounce {
  0%   { transform: translateY(0) scaleX(1) scaleY(1); }
  30%  { transform: translateY(-50px) scaleX(0.9) scaleY(1.1); }
  50%  { transform: translateY(0) scaleX(1.15) scaleY(0.85); }
  65%  { transform: translateY(-20px) scaleX(0.95) scaleY(1.05); }
  80%  { transform: translateY(0) scaleX(1.05) scaleY(0.95); }
  100% { transform: translateY(0) scaleX(1) scaleY(1); }
}

#playground-target {
  animation: pulse-bounce 1.4s
    cubic-bezier(.36, .07, .19, .97) infinite;
  background: linear-gradient(135deg, #ffaa00, #ff006e);
  box-shadow: 0 0 30px #ffaa00;
  transform-origin: center bottom;
}`,
  shake: `/* shake :: high-frequency vibration */
@keyframes pulse-shake {
  0%, 100% { transform: translateX(0) rotate(0deg); }
  10%  { transform: translateX(-8px) rotate(-2deg); }
  20%  { transform: translateX(8px) rotate(2deg); }
  30%  { transform: translateX(-6px) rotate(-1deg); }
  40%  { transform: translateX(6px) rotate(1deg); }
  50%  { transform: translateX(-10px) rotate(-3deg); }
  60%  { transform: translateX(10px) rotate(3deg); }
  70%  { transform: translateX(-4px) rotate(-1deg); }
  80%  { transform: translateX(4px) rotate(1deg); }
  90%  { transform: translateX(-2px) rotate(0deg); }
}

#playground-target {
  animation: pulse-shake 0.6s
    cubic-bezier(.36, .07, .19, .97) infinite;
  background: linear-gradient(135deg, #ff006e, #ffaa00);
  box-shadow: 0 0 30px rgba(255,0,110,0.8);
}`,
  flip: `/* flip :: 3D card rotation */
@keyframes pulse-flip {
  0%   { transform: perspective(400px) rotateY(0deg); }
  40%  { transform: perspective(400px) rotateY(-180deg) scale(1.1); }
  60%  { transform: perspective(400px) rotateY(-180deg) scale(1.1); }
  100% { transform: perspective(400px) rotateY(-360deg); }
}

#playground-target {
  animation: pulse-flip 2s ease-in-out infinite;
  background: linear-gradient(
    135deg, #8b00ff, #00f0ff
  );
  box-shadow: 0 0 40px rgba(139,0,255,0.6);
  backface-visibility: visible;
}`,
  morph: `/* morph :: fluid shape shifting */
@keyframes pulse-morph {
  0%   { border-radius: 0; transform: rotate(0deg); background: #ff006e; }
  20%  { border-radius: 50% 0 50% 0; transform: rotate(72deg); background: #ffaa00; }
  40%  { border-radius: 50%; transform: rotate(144deg) scale(1.2); background: #c6ff00; }
  60%  { border-radius: 0 50% 0 50%; transform: rotate(216deg); background: #00f0ff; }
  80%  { border-radius: 30%; transform: rotate(288deg) scale(0.9); background: #8b00ff; }
  100% { border-radius: 0; transform: rotate(360deg); background: #ff006e; }
}

#playground-target {
  animation: pulse-morph 3s ease-in-out infinite;
  box-shadow: 0 0 40px rgba(255,0,110,0.5);
}`
};

const editor = document.getElementById('code-editor');
const target = document.getElementById('playground-target');
const lineNumbers = document.getElementById('line-numbers');
const editorStat = document.getElementById('editor-stat');
const styleTag = document.createElement('style');
document.head.appendChild(styleTag);
let currentPreset = 'levitate';

function updateLineNumbers() {
  const lines = editor.value.split('\n').length;
  lineNumbers.innerHTML = Array.from({ length: lines }, (_, i) => i + 1).join('<br>');
  editorStat.textContent = `${lines} lines`;
  lineNumbers.scrollTop = editor.scrollTop;
}

function applyCode(code) {
  styleTag.textContent = code;
}

function loadPreset(name) {
  currentPreset = name;
  editor.value = presets[name];
  applyCode(presets[name]);
  updateLineNumbers();
}

loadPreset('levitate');

document.querySelectorAll('.preset-tab').forEach(tab => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.preset-tab').forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    loadPreset(tab.dataset.preset);
  });
});

editor.addEventListener('input', () => {
  applyCode(editor.value);
  updateLineNumbers();
});
editor.addEventListener('scroll', () => {
  lineNumbers.scrollTop = editor.scrollTop;
});

/* shape selector */
document.querySelectorAll('.shape-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.shape-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const shape = btn.dataset.shape;
    target.classList.remove('shape-circle', 'shape-text');
    if (shape === 'circle') target.classList.add('shape-circle');
    if (shape === 'text') {
      target.classList.add('shape-text');
      target.textContent = 'PULSE';
    } else {
      target.textContent = '';
    }
    applyCode(editor.value);
  });
});

/* speed slider */
const speedSlider = document.getElementById('speed-slider');
const speedVal = document.getElementById('speed-val');
speedSlider.addEventListener('input', () => {
  const rate = speedSlider.value / 100;
  speedVal.textContent = `${rate.toFixed(2).replace(/\.?0+$/, '')}×`;
  target.getAnimations().forEach(a => { a.playbackRate = rate; });
});

/* controls */
document.getElementById('ctrl-replay').addEventListener('click', () => {
  target.style.animation = 'none';
  target.offsetHeight;
  target.style.animation = '';
  applyCode(editor.value);
  const rate = speedSlider.value / 100;
  setTimeout(() => { target.getAnimations().forEach(a => { a.playbackRate = rate; }); }, 50);
});

document.getElementById('ctrl-pause').addEventListener('click', (e) => {
  const isPaused = target.style.animationPlayState === 'paused';
  target.style.animationPlayState = isPaused ? 'running' : 'paused';
  e.currentTarget.textContent = isPaused ? '⏸ Pause' : '▶ Resume';
});

document.getElementById('ctrl-copy').addEventListener('click', (e) => {
  navigator.clipboard.writeText(editor.value);
  const original = e.currentTarget.textContent;
  e.currentTarget.textContent = '✓ Copied';
  setTimeout(() => { e.currentTarget.textContent = original; }, 1400);
});

document.getElementById('ctrl-export').addEventListener('click', () => {
  const blob = new Blob([editor.value], { type: 'text/css' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = `pulse-${currentPreset}.css`;
  a.click();
  URL.revokeObjectURL(a.href);
});

/* ============= DOCS MODAL ============= */
const docsData = {
  'quick-start': {
    num: '01', title: 'Quick Start',
    intro: 'Get Pulse running in your project in under 60 seconds. Install via npm or drop a CDN link — no bundler, no config, no surprises.',
    points: [
      { icon: '⚡', heading: 'Install', text: 'npm install @pulse/core or use the CDN link in your HTML head.' },
      { icon: '🎯', heading: 'Import', text: 'Import the base stylesheet once. All 142+ presets load on demand.' },
      { icon: '✨', heading: 'Animate', text: 'Add a single CSS class or use the animation() shorthand. Done.' },
    ],
    code: `<span class="c-cm">/* Option 1 — npm */</span>
<span class="c-kw">import</span> <span class="c-str">'@pulse/core/base.css'</span>;

<span class="c-cm">/* Option 2 — CDN */</span>
&lt;<span class="c-kw">link</span> <span class="c-prop">rel</span>=<span class="c-str">"stylesheet"</span>
  <span class="c-prop">href</span>=<span class="c-str">"https://cdn.pulse.dev/v3/base.css"</span>&gt;

<span class="c-cm">/* Use any preset instantly */</span>
<span class="c-sel">.my-element</span> {
  <span class="c-prop">animation</span>: <span class="c-fn">pulse</span>(<span class="c-str">'levitate'</span>);
}

<span class="c-cm">/* Or with config */</span>
<span class="c-sel">.my-element</span> {
  <span class="c-prop">animation</span>: <span class="c-fn">pulse</span>(<span class="c-str">'orbit'</span>);
  <span class="c-prop">--velocity</span>: <span class="c-num">0.8</span>;
  <span class="c-prop">--ease</span>: <span class="c-str">elastic-out</span>;
  <span class="c-prop">--delay</span>: <span class="c-num">200ms</span>;
}`
  },
  'core-concepts': {
    num: '02', title: 'Core Concepts',
    intro: 'Pulse is built on three primitives — presets, tokens, and timelines. Master these and you can express any motion imaginable.',
    points: [
      { icon: '🎨', heading: 'Presets', text: 'Named animation bundles. Each preset is a self-contained keyframe + easing + timing definition.' },
      { icon: '🔑', heading: 'Tokens', text: 'CSS custom properties like --velocity, --ease, --delay that override preset defaults without rewriting keyframes.' },
      { icon: '⏱', heading: 'Timelines', text: 'Chain and stagger multiple animations across elements using the timeline() compositor.' },
    ],
    code: `<span class="c-cm">/* Preset — named animation bundle */</span>
<span class="c-sel">.card</span> {
  <span class="c-prop">animation</span>: <span class="c-fn">pulse</span>(<span class="c-str">'levitate'</span>);
}

<span class="c-cm">/* Token overrides — tune without rewriting */</span>
<span class="c-sel">.card-fast</span> {
  <span class="c-prop">animation</span>: <span class="c-fn">pulse</span>(<span class="c-str">'levitate'</span>);
  <span class="c-prop">--velocity</span>: <span class="c-num">2.0</span>;
  <span class="c-prop">--ease</span>: <span class="c-str">spring-bounce</span>;
}

<span class="c-cm">/* Timeline — stagger across elements */</span>
<span class="c-sel">.list-item</span> {
  <span class="c-prop">animation</span>: <span class="c-fn">pulse-timeline</span>(<span class="c-str">'fade-up'</span>);
  <span class="c-prop">--stagger</span>: <span class="c-num">80ms</span>;
}`
  },
  'easing-curves': {
    num: '03', title: 'Easing Curves',
    intro: '42 hand-tuned cubic-bezier functions grouped by feel. From brutally linear to impossibly springy — every curve you will ever need.',
    points: [
      { icon: '📐', heading: 'Mechanical', text: 'ease-in, ease-out, ease-in-out — classic CSS curves, precision-tuned.' },
      { icon: '🌊', heading: 'Fluid', text: 'elastic-out, spring-bounce, overshoot — curves that feel physically real.' },
      { icon: '⚡', heading: 'Expressive', text: 'warp, snap, slam — opinionated curves for UI that has personality.' },
    ],
    code: `<span class="c-cm">/* Built-in named curves */</span>
<span class="c-sel">.element</span> {
  <span class="c-prop">--ease</span>: <span class="c-str">elastic-out</span>;
  <span class="c-prop">--ease</span>: <span class="c-str">spring-bounce</span>;
  <span class="c-prop">--ease</span>: <span class="c-str">overshoot</span>;
  <span class="c-prop">--ease</span>: <span class="c-str">expo-out</span>;
  <span class="c-prop">--ease</span>: <span class="c-str">back-out</span>;
  <span class="c-prop">--ease</span>: <span class="c-str">snap</span>;
}

<span class="c-cm">/* Or use raw cubic-bezier */</span>
<span class="c-sel">.element</span> {
  <span class="c-prop">--ease</span>: <span class="c-fn">cubic-bezier</span>(
    <span class="c-num">0.34</span>, <span class="c-num">1.56</span>,
    <span class="c-num">0.64</span>, <span class="c-num">1.0</span>
  );
}

<span class="c-cm">/* Preview any curve */</span>
<span class="c-kw">@pulse-preview</span> <span class="c-str">elastic-out</span>;`
  },
  'choreography': {
    num: '04', title: 'Choreography',
    intro: 'Move beyond individual animations. Pulse Choreography lets you compose sequences, stagger groups, and synchronize motion across your entire UI.',
    points: [
      { icon: '🎬', heading: 'Sequences', text: 'Chain animations so one starts exactly when another ends — no setTimeout hacks.' },
      { icon: '🔀', heading: 'Stagger', text: 'Apply a delay offset automatically across a NodeList using --stagger token.' },
      { icon: '🔗', heading: 'Sync', text: 'Lock multiple elements to a shared timeline — they animate as one.' },
    ],
    code: `<span class="c-cm">/* Stagger children automatically */</span>
<span class="c-sel">.cards > .card</span> {
  <span class="c-prop">animation</span>: <span class="c-fn">pulse</span>(<span class="c-str">'fade-up'</span>);
  <span class="c-prop">--stagger</span>: <span class="c-num">80ms</span>;
  <span class="c-prop">--stagger-from</span>: <span class="c-str">start</span>;
}

<span class="c-cm">/* Sequence: A then B then C */</span>
<span class="c-sel">.step-a</span> { <span class="c-prop">--timeline-order</span>: <span class="c-num">1</span>; }
<span class="c-sel">.step-b</span> { <span class="c-prop">--timeline-order</span>: <span class="c-num">2</span>; }
<span class="c-sel">.step-c</span> { <span class="c-prop">--timeline-order</span>: <span class="c-num">3</span>; }
<span class="c-sel">[class*="step-"]</span> {
  <span class="c-prop">animation</span>: <span class="c-fn">pulse-timeline</span>(<span class="c-str">'slide-in'</span>);
  <span class="c-prop">--gap</span>: <span class="c-num">120ms</span>;
}`
  },
  'scroll-triggers': {
    num: '05', title: 'Scroll Triggers',
    intro: 'Scroll-linked animations powered by the native View Timeline API. Zero JS. Zero IntersectionObserver. Pure CSS with a single token.',
    points: [
      { icon: '📜', heading: 'View Timeline', text: 'Animations driven directly by scroll position — no requestAnimationFrame loops.' },
      { icon: '🎯', heading: 'Range Control', text: 'Define exactly when an animation starts and ends within the viewport.' },
      { icon: '♻️', heading: 'Zero JS', text: 'Entirely declarative. Works without any JavaScript at all.' },
    ],
    code: `<span class="c-cm">/* Animate on scroll — no JS needed */</span>
<span class="c-sel">.hero-text</span> {
  <span class="c-prop">animation</span>: <span class="c-fn">pulse</span>(<span class="c-str">'fade-up'</span>);
  <span class="c-prop">animation-timeline</span>: <span class="c-fn">view</span>();
  <span class="c-prop">animation-range</span>: <span class="c-str">entry 0% entry 40%</span>;
}

<span class="c-cm">/* Parallax scroll effect */</span>
<span class="c-sel">.bg-layer</span> {
  <span class="c-prop">animation</span>: <span class="c-fn">pulse</span>(<span class="c-str">'parallax'</span>);
  <span class="c-prop">animation-timeline</span>: <span class="c-fn">scroll</span>();
  <span class="c-prop">--parallax-speed</span>: <span class="c-num">0.4</span>;
}

<span class="c-cm">/* Sticky progress bar */</span>
<span class="c-sel">.progress</span> {
  <span class="c-prop">animation</span>: <span class="c-fn">pulse</span>(<span class="c-str">'fill-x'</span>);
  <span class="c-prop">animation-timeline</span>: <span class="c-fn">scroll</span>(<span class="c-str">root block</span>);
}`
  },
  'performance': {
    num: '06', title: 'Performance',
    intro: 'Every Pulse preset is engineered for 60fps on low-end devices. GPU compositing, will-change hints, and frame-budget awareness are baked in.',
    points: [
      { icon: '🚀', heading: 'GPU Only', text: 'Presets exclusively animate transform and opacity — the two GPU-composited properties.' },
      { icon: '💡', heading: 'will-change', text: 'Pulse auto-applies will-change hints before animation starts and removes them after.' },
      { icon: '📊', heading: 'Budget Aware', text: 'The profiler CLI flags animations that exceed a 4ms frame budget on mid-range hardware.' },
    ],
    code: `<span class="c-cm">/* Pulse ALWAYS uses GPU-safe properties */</span>
<span class="c-cm">/* ✅ These are composited — 60fps */</span>
<span class="c-kw">@keyframes</span> safe {
  <span class="c-kw">from</span> { <span class="c-prop">transform</span>: <span class="c-fn">translateY</span>(<span class="c-num">0</span>); <span class="c-prop">opacity</span>: <span class="c-num">0</span>; }
  <span class="c-kw">to</span>   { <span class="c-prop">transform</span>: <span class="c-fn">translateY</span>(<span class="c-num">-20px</span>); <span class="c-prop">opacity</span>: <span class="c-num">1</span>; }
}

<span class="c-cm">/* ❌ These cause layout/paint — avoid */</span>
<span class="c-kw">@keyframes</span> bad {
  <span class="c-kw">from</span> { <span class="c-prop">width</span>: <span class="c-num">0</span>; <span class="c-prop">margin-top</span>: <span class="c-num">20px</span>; }
  <span class="c-kw">to</span>   { <span class="c-prop">width</span>: <span class="c-num">200px</span>; <span class="c-prop">margin-top</span>: <span class="c-num">0</span>; }
}

<span class="c-cm">/* Profile from CLI */</span>
<span class="c-fn">npx pulse profile</span> --budget <span class="c-num">4ms</span>`
  },
  'theming': {
    num: '07', title: 'Theming',
    intro: 'Every visual aspect of Pulse is a CSS custom property. Override globally or per-component. Build a completely custom motion language on top of the Pulse foundation.',
    points: [
      { icon: '🎨', heading: 'Global Tokens', text: 'Set defaults for duration, easing, and delay once in :root — all presets inherit them.' },
      { icon: '🧩', heading: 'Per-Component', text: 'Override any token on a specific selector without touching the global theme.' },
      { icon: '🌙', heading: 'Dark / Reduced', text: 'Pulse ships media-query-aware token sets for dark mode and prefers-reduced-motion.' },
    ],
    code: `<span class="c-cm">/* Global theme — set once */</span>
<span class="c-sel">:root</span> {
  <span class="c-prop">--pulse-duration</span>: <span class="c-num">400ms</span>;
  <span class="c-prop">--pulse-ease</span>: <span class="c-str">spring-bounce</span>;
  <span class="c-prop">--pulse-delay</span>: <span class="c-num">0ms</span>;
  <span class="c-prop">--pulse-color-primary</span>: <span class="c-str">#ff006e</span>;
}

<span class="c-cm">/* Per-component override */</span>
<span class="c-sel">.hero-section</span> {
  <span class="c-prop">--pulse-ease</span>: <span class="c-str">expo-out</span>;
  <span class="c-prop">--pulse-duration</span>: <span class="c-num">800ms</span>;
}

<span class="c-cm">/* Reduced motion support */</span>
<span class="c-kw">@media</span> (prefers-reduced-motion: reduce) {
  <span class="c-sel">:root</span> { <span class="c-prop">--pulse-duration</span>: <span class="c-num">1ms</span>; }
}`
  },
  'migration': {
    num: '08', title: 'Migration',
    intro: 'Moving from Framer Motion, GSAP, or Anime.js? Pulse ships compatibility shims and a migration CLI that converts most animations automatically.',
    points: [
      { icon: '🔄', heading: 'Auto-Convert', text: 'Run npx pulse migrate and watch your GSAP / Framer code convert to Pulse CSS.' },
      { icon: '🤝', heading: 'Shims', text: 'Drop-in API shims let you keep existing JS code while Pulse handles the rendering.' },
      { icon: '📦', heading: 'Bundle Size', text: 'Typical projects shrink from 60–120kb of JS to 2.4kb of CSS after migration.' },
    ],
    code: `<span class="c-cm">/* BEFORE — Framer Motion (React) */</span>
<span class="c-kw">&lt;motion.div</span>
  <span class="c-prop">animate</span>=<span class="c-str">{{ y: -20, opacity: 1 }}</span>
  <span class="c-prop">transition</span>=<span class="c-str">{{ duration: 0.4 }}</span>
<span class="c-kw">/&gt;</span>

<span class="c-cm">/* AFTER — Pulse CSS */</span>
<span class="c-sel">.my-div</span> {
  <span class="c-prop">animation</span>: <span class="c-fn">pulse</span>(<span class="c-str">'fade-up'</span>);
  <span class="c-prop">--velocity</span>: <span class="c-num">0.4</span>;
}

<span class="c-cm">/* Run migration CLI */</span>
<span class="c-fn">npx pulse migrate</span> ./src
<span class="c-cm">/* ✔ 47 animations converted */</span>
<span class="c-cm">/* ✔ Bundle reduced by 94kb */</span>`
  }
};

const docsOverlay = document.getElementById('docs-overlay');
const docsClose  = document.getElementById('docs-close');
const docsCopy   = document.getElementById('docs-copy');

function openDocsModal(key) {
  const d = docsData[key];
  if (!d) return;
  document.getElementById('docs-num').textContent   = d.num;
  document.getElementById('docs-title').textContent = d.title;
  document.getElementById('docs-intro').textContent = d.intro;
  document.getElementById('docs-code').innerHTML    = d.code;
  const pointsEl = document.getElementById('docs-points');
  pointsEl.innerHTML = d.points.map(p => `
    <div class="doc-point">
      <span class="doc-point-icon">${p.icon}</span>
      <div class="doc-point-text"><strong>${p.heading}</strong>${p.text}</div>
    </div>`).join('');
  docsOverlay.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeDocsModal() {
  docsOverlay.classList.remove('open');
  document.body.style.overflow = '';
}

document.querySelectorAll('.doc-card[data-doc]').forEach(card => {
  card.addEventListener('click', (e) => {
    e.preventDefault();
    openDocsModal(card.dataset.doc);
  });
});

docsClose.addEventListener('click', closeDocsModal);
docsOverlay.addEventListener('click', (e) => { if (e.target === docsOverlay) closeDocsModal(); });

docsCopy.addEventListener('click', () => {
  const raw = document.getElementById('docs-code').textContent;
  navigator.clipboard.writeText(raw);
  const orig = docsCopy.textContent;
  docsCopy.textContent = '✓ Copied!';
  setTimeout(() => { docsCopy.textContent = orig; }, 1400);
});

/* ============= SHOWCASE MODAL ============= */
const showcaseData = {
  'neon-pulse': {
    id: '#PUL-001',
    name: 'Neon Pulse',
    desc: 'Radiating glow with cubic-bezier easing. Perfect for status indicators, CTAs, and live activity badges.',
    preview: `<div style="width:80px;height:80px;border-radius:50%;background:var(--neon-magenta);box-shadow:0 0 30px var(--neon-magenta);animation:previewPulse 2s ease-in-out infinite"></div>`,
    css: `@keyframes neon-pulse {
  0%, 100% {
    transform: scale(1);
    box-shadow:
      0 0 20px #ff006e,
      0 0 40px #ff006e;
  }
  50% {
    transform: scale(1.4);
    box-shadow:
      0 0 40px #ff006e,
      0 0 80px #ff006e,
      0 0 120px #ff006e;
  }
}

.element {
  border-radius: 50%;
  background: #ff006e;
  animation: neon-pulse 2s
    ease-in-out infinite;
}`
  },
  'audio-bars': {
    id: '#PUL-014',
    name: 'Audio Bars',
    desc: 'Staggered scale-Y animation simulating a live audio waveform. Six bars with offset delays create organic rhythm.',
    preview: `<div style="display:flex;gap:8px;align-items:center;height:80px">
      <div style="width:6px;height:40%;background:var(--neon-cyan);box-shadow:0 0 10px var(--neon-cyan);animation:bars 1.4s ease-in-out infinite;animation-delay:0s"></div>
      <div style="width:6px;height:60%;background:var(--neon-cyan);box-shadow:0 0 10px var(--neon-cyan);animation:bars 1.4s ease-in-out infinite;animation-delay:0.1s"></div>
      <div style="width:6px;height:80%;background:var(--neon-cyan);box-shadow:0 0 10px var(--neon-cyan);animation:bars 1.4s ease-in-out infinite;animation-delay:0.2s"></div>
      <div style="width:6px;height:50%;background:var(--neon-cyan);box-shadow:0 0 10px var(--neon-cyan);animation:bars 1.4s ease-in-out infinite;animation-delay:0.3s"></div>
      <div style="width:6px;height:70%;background:var(--neon-cyan);box-shadow:0 0 10px var(--neon-cyan);animation:bars 1.4s ease-in-out infinite;animation-delay:0.4s"></div>
      <div style="width:6px;height:30%;background:var(--neon-cyan);box-shadow:0 0 10px var(--neon-cyan);animation:bars 1.4s ease-in-out infinite;animation-delay:0.5s"></div>
    </div>`,
    css: `@keyframes audio-bars {
  0%, 100% { transform: scaleY(0.5); }
  50%       { transform: scaleY(1); }
}

.bar {
  width: 6px;
  background: #00f0ff;
  box-shadow: 0 0 10px #00f0ff;
  animation: audio-bars 1.4s
    ease-in-out infinite;
}
.bar:nth-child(1) { animation-delay: 0s; }
.bar:nth-child(2) { animation-delay: .1s; }
.bar:nth-child(3) { animation-delay: .2s; }
.bar:nth-child(4) { animation-delay: .3s; }
.bar:nth-child(5) { animation-delay: .4s; }
.bar:nth-child(6) { animation-delay: .5s; }`
  },
  'orbit-loader': {
    id: '#PUL-027',
    name: 'Orbit Loader',
    desc: 'Counter-rotating rings with chromatic aberration effect. Loading states that feel alive and futuristic.',
    preview: `<div style="width:100px;height:100px;border:2px solid transparent;border-top-color:var(--neon-violet);border-right-color:var(--neon-magenta);border-radius:50%;animation:spin 1.5s linear infinite;filter:drop-shadow(0 0 8px var(--neon-violet));position:relative">
      <div style="position:absolute;inset:-12px;border:1px solid transparent;border-bottom-color:var(--neon-cyan);border-left-color:var(--neon-amber);border-radius:50%;animation:spin 2s linear reverse infinite"></div>
    </div>`,
    css: `@keyframes spin {
  to { transform: rotate(360deg); }
}

.ring {
  width: 100px;
  height: 100px;
  border: 2px solid transparent;
  border-top-color: #8b00ff;
  border-right-color: #ff006e;
  border-radius: 50%;
  animation: spin 1.5s linear infinite;
  filter: drop-shadow(0 0 8px #8b00ff);
  position: relative;
}
.ring::after {
  content: '';
  position: absolute;
  inset: -12px;
  border: 1px solid transparent;
  border-bottom-color: #00f0ff;
  border-left-color: #ffaa00;
  border-radius: 50%;
  animation: spin 2s linear reverse infinite;
}`
  },
  'data-stream': {
    id: '#PUL-031',
    name: 'Data Stream',
    desc: 'Asynchronous horizontal sweep with opacity pulse. Built for dashboards, live data feeds, and loading skeletons.',
    preview: `<div style="display:flex;flex-direction:column;gap:6px;width:160px">
      <div style="height:3px;width:70%;background:linear-gradient(90deg,transparent,var(--neon-lime),transparent);animation:wave 2s ease-in-out infinite;box-shadow:0 0 8px var(--neon-lime)"></div>
      <div style="height:3px;width:50%;background:linear-gradient(90deg,transparent,var(--neon-lime),transparent);animation:wave 2s ease-in-out infinite;animation-delay:0.2s;box-shadow:0 0 8px var(--neon-lime)"></div>
      <div style="height:3px;width:60%;background:linear-gradient(90deg,transparent,var(--neon-lime),transparent);animation:wave 2s ease-in-out infinite;animation-delay:0.4s;box-shadow:0 0 8px var(--neon-lime)"></div>
      <div style="height:3px;width:40%;background:linear-gradient(90deg,transparent,var(--neon-lime),transparent);animation:wave 2s ease-in-out infinite;animation-delay:0.6s;box-shadow:0 0 8px var(--neon-lime)"></div>
    </div>`,
    css: `@keyframes data-stream {
  0%, 100% {
    transform: translateX(-30%);
    opacity: 0.3;
  }
  50% {
    transform: translateX(30%);
    opacity: 1;
  }
}

.wave {
  height: 3px;
  background: linear-gradient(
    90deg,
    transparent,
    #c6ff00,
    transparent
  );
  box-shadow: 0 0 8px #c6ff00;
  animation: data-stream 2s
    ease-in-out infinite;
}
.wave:nth-child(2) { animation-delay: .2s; }
.wave:nth-child(3) { animation-delay: .4s; }
.wave:nth-child(4) { animation-delay: .6s; }`
  },
  'holo-cube': {
    id: '#PUL-058',
    name: 'Holo Cube',
    desc: 'CSS-only 3D rotation using preserve-3d and six-face transforms. Zero JavaScript, pure GPU compositing.',
    preview: `<div style="width:80px;height:80px;position:relative;transform-style:preserve-3d;animation:cube 5s linear infinite">
      <div style="position:absolute;width:80px;height:80px;border:1px solid var(--neon-cyan);background:rgba(0,240,255,0.05);box-shadow:inset 0 0 20px rgba(0,240,255,0.2);transform:translateZ(40px)"></div>
      <div style="position:absolute;width:80px;height:80px;border:1px solid var(--neon-cyan);background:rgba(0,240,255,0.05);transform:translateZ(-40px) rotateY(180deg)"></div>
      <div style="position:absolute;width:80px;height:80px;border:1px solid var(--neon-magenta);background:rgba(255,0,110,0.05);transform:rotateY(90deg) translateZ(40px)"></div>
      <div style="position:absolute;width:80px;height:80px;border:1px solid var(--neon-magenta);background:rgba(255,0,110,0.05);transform:rotateY(-90deg) translateZ(40px)"></div>
      <div style="position:absolute;width:80px;height:80px;border:1px solid var(--neon-violet);background:rgba(139,0,255,0.05);transform:rotateX(90deg) translateZ(40px)"></div>
      <div style="position:absolute;width:80px;height:80px;border:1px solid var(--neon-violet);background:rgba(139,0,255,0.05);transform:rotateX(-90deg) translateZ(40px)"></div>
    </div>`,
    css: `@keyframes holo-cube {
  0%   { transform: rotateX(0) rotateY(0); }
  100% { transform: rotateX(360deg) rotateY(360deg); }
}

.cube {
  width: 80px;
  height: 80px;
  position: relative;
  transform-style: preserve-3d;
  animation: holo-cube 5s linear infinite;
}
.face {
  position: absolute;
  width: 80px;
  height: 80px;
  border: 1px solid #00f0ff;
  background: rgba(0,240,255,0.05);
}
.face-f { transform: translateZ(40px); }
.face-b { transform: translateZ(-40px) rotateY(180deg); }
.face-r { transform: rotateY(90deg) translateZ(40px); }
.face-l { transform: rotateY(-90deg) translateZ(40px); }
.face-t { transform: rotateX(90deg) translateZ(40px); }
.face-bo { transform: rotateX(-90deg) translateZ(40px); }`
  },
  'glitch-text': {
    id: '#PUL-073',
    name: 'Glitch Text',
    desc: 'RGB channel split using CSS pseudo-elements and clip-path masking. Brings cyberpunk energy to any typography.',
    preview: `<div style="font-family:'Orbitron',sans-serif;font-weight:900;font-size:32px;color:var(--ink);position:relative;letter-spacing:0.05em">
      PULSE
      <span style="position:absolute;inset:0;color:var(--neon-magenta);animation:glitch1 2.5s infinite;clip-path:polygon(0 0,100% 0,100% 45%,0 45%)">PULSE</span>
      <span style="position:absolute;inset:0;color:var(--neon-cyan);animation:glitch2 2.5s infinite;clip-path:polygon(0 60%,100% 60%,100% 100%,0 100%)">PULSE</span>
    </div>`,
    css: `@keyframes glitch-top {
  0%,90%,100% { transform: translate(0); }
  92% { transform: translate(-3px, 1px); }
  94% { transform: translate(3px, -1px); }
  96% { transform: translate(-2px, 2px); }
}
@keyframes glitch-bottom {
  0%,90%,100% { transform: translate(0); }
  92% { transform: translate(3px, -1px); }
  94% { transform: translate(-3px, 1px); }
  96% { transform: translate(2px, -2px); }
}

.glitch {
  position: relative;
}
.glitch::before,
.glitch::after {
  content: attr(data-text);
  position: absolute;
  inset: 0;
}
.glitch::before {
  color: #ff006e;
  clip-path: polygon(0 0,100% 0,100% 45%,0 45%);
  animation: glitch-top 2.5s infinite;
}
.glitch::after {
  color: #00f0ff;
  clip-path: polygon(0 60%,100% 60%,100% 100%,0 100%);
  animation: glitch-bottom 2.5s infinite;
}`
  }
};

const modalOverlay = document.getElementById('modal-overlay');
const modalClose = document.getElementById('modal-close');
const modalCopy = document.getElementById('modal-copy');

function openModal(cardKey) {
  const data = showcaseData[cardKey];
  if (!data) return;

  document.getElementById('modal-id').textContent = data.id;
  document.getElementById('modal-name').textContent = data.name;
  document.getElementById('modal-desc').textContent = data.desc;
  document.getElementById('modal-preview').innerHTML = data.preview;
  document.getElementById('modal-code').textContent = data.css;

  modalOverlay.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  modalOverlay.classList.remove('open');
  document.body.style.overflow = '';
  setTimeout(() => { document.getElementById('modal-preview').innerHTML = ''; }, 400);
}

document.querySelectorAll('.showcase-card[data-card]').forEach(card => {
  card.addEventListener('click', () => openModal(card.dataset.card));
});

modalClose.addEventListener('click', closeModal);
modalOverlay.addEventListener('click', (e) => { if (e.target === modalOverlay) closeModal(); });

modalCopy.addEventListener('click', () => {
  const code = document.getElementById('modal-code').textContent;
  navigator.clipboard.writeText(code);
  const orig = modalCopy.textContent;
  modalCopy.textContent = '✓ Copied!';
  setTimeout(() => { modalCopy.textContent = orig; }, 1400);
});

/* ============= API EXPLORER ============= */
const apiData = {
  compile: {
    curl: `<span class="c-cm"># Compile an animation to production-ready CSS</span>
curl -X <span class="c-kw">POST</span> <span class="c-url">https://api.pulse.dev/v1/compile</span> \\
  -H <span class="c-str">"Authorization: Bearer YOUR_API_KEY"</span> \\
  -H <span class="c-str">"Content-Type: application/json"</span> \\
  -d <span class="c-str">'{
    "preset": "neon-pulse",
    "duration": 1400,
    "easing": "ease-in-out",
    "iterations": "infinite",
    "target": ".my-element"
  }'</span>`,
    node: `<span class="c-kw">import</span> Pulse <span class="c-kw">from</span> <span class="c-str">'@pulse/node'</span>;

<span class="c-kw">const</span> client = <span class="c-kw">new</span> Pulse({ apiKey: process.env.<span class="c-key">PULSE_API_KEY</span> });

<span class="c-kw">const</span> result = <span class="c-kw">await</span> client.compile({
  preset:     <span class="c-str">'neon-pulse'</span>,
  duration:   <span class="c-num">1400</span>,
  easing:     <span class="c-str">'ease-in-out'</span>,
  iterations: <span class="c-str">'infinite'</span>,
  target:     <span class="c-str">'.my-element'</span>,
});

console.log(result.<span class="c-key">css</span>);`,
    python: `<span class="c-kw">from</span> pulse <span class="c-kw">import</span> PulseClient

client = PulseClient(api_key=<span class="c-str">"YOUR_API_KEY"</span>)

result = client.compile(
    preset=<span class="c-str">"neon-pulse"</span>,
    duration=<span class="c-num">1400</span>,
    easing=<span class="c-str">"ease-in-out"</span>,
    iterations=<span class="c-str">"infinite"</span>,
    target=<span class="c-str">".my-element"</span>,
)

<span class="c-kw">print</span>(result.css)`,
    response: {
      ok: true,
      status: '200 OK',
      time: '38ms',
      body: `{
  <span class="c-key">"id"</span>:       <span class="c-str">"anim_01HXYZ9KQ"</span>,
  <span class="c-key">"preset"</span>:  <span class="c-str">"neon-pulse"</span>,
  <span class="c-key">"css"</span>:      <span class="c-str">"@keyframes neon-pulse { ... }"</span>,
  <span class="c-key">"minified"</span>: <span class="c-str">"@keyframes neon-pulse{0%,100%{...}}"</span>,
  <span class="c-key">"size"</span>:     <span class="c-num">412</span>,
  <span class="c-key">"cached"</span>:   <span class="c-bool">false</span>,
  <span class="c-key">"ms"</span>:       <span class="c-num">38</span>
}`
    }
  },
  presets: {
    curl: `<span class="c-cm"># Fetch all available animation presets</span>
curl -X <span class="c-kw">GET</span> <span class="c-url">https://api.pulse.dev/v1/presets</span> \\
  -H <span class="c-str">"Authorization: Bearer YOUR_API_KEY"</span> \\
  -G \\
  -d <span class="c-str">"category=entrance"</span> \\
  -d <span class="c-str">"limit=20"</span>`,
    node: `<span class="c-kw">const</span> presets = <span class="c-kw">await</span> client.presets.list({
  category: <span class="c-str">'entrance'</span>,
  limit:    <span class="c-num">20</span>,
});

<span class="c-kw">for</span> (<span class="c-kw">const</span> p <span class="c-kw">of</span> presets.<span class="c-key">data</span>) {
  console.log(p.<span class="c-key">id</span>, p.<span class="c-key">name</span>);
}`,
    python: `presets = client.presets.list(
    category=<span class="c-str">"entrance"</span>,
    limit=<span class="c-num">20</span>,
)

<span class="c-kw">for</span> p <span class="c-kw">in</span> presets.data:
    <span class="c-kw">print</span>(p.id, p.name)`,
    response: {
      ok: true,
      status: '200 OK',
      time: '22ms',
      body: `{
  <span class="c-key">"data"</span>: [
    { <span class="c-key">"id"</span>: <span class="c-str">"neon-pulse"</span>,   <span class="c-key">"category"</span>: <span class="c-str">"entrance"</span> },
    { <span class="c-key">"id"</span>: <span class="c-str">"orbit-loader"</span>, <span class="c-key">"category"</span>: <span class="c-str">"loader"</span>   },
    { <span class="c-key">"id"</span>: <span class="c-str">"data-stream"</span>,  <span class="c-key">"category"</span>: <span class="c-str">"text"</span>     },
    { <span class="c-key">"id"</span>: <span class="c-str">"glitch-text"</span>,  <span class="c-key">"category"</span>: <span class="c-str">"text"</span>     }
  ],
  <span class="c-key">"total"</span>:   <span class="c-num">512</span>,
  <span class="c-key">"cursor"</span>:  <span class="c-str">"next_crs_XGH91"</span>
}`
    }
  },
  webhook: {
    curl: `<span class="c-cm"># Register a webhook endpoint</span>
curl -X <span class="c-kw">POST</span> <span class="c-url">https://api.pulse.dev/v1/webhooks</span> \\
  -H <span class="c-str">"Authorization: Bearer YOUR_API_KEY"</span> \\
  -H <span class="c-str">"Content-Type: application/json"</span> \\
  -d <span class="c-str">'{
    "url":    "https://yourapp.com/hooks/pulse",
    "events": ["compile.done", "preset.updated"],
    "secret": "whsec_your_signing_secret"
  }'</span>`,
    node: `<span class="c-kw">const</span> webhook = <span class="c-kw">await</span> client.webhooks.create({
  url:    <span class="c-str">'https://yourapp.com/hooks/pulse'</span>,
  events: [<span class="c-str">'compile.done'</span>, <span class="c-str">'preset.updated'</span>],
  secret: process.env.<span class="c-key">PULSE_WEBHOOK_SECRET</span>,
});

console.log(webhook.<span class="c-key">id</span>);`,
    python: `webhook = client.webhooks.create(
    url=<span class="c-str">"https://yourapp.com/hooks/pulse"</span>,
    events=[<span class="c-str">"compile.done"</span>, <span class="c-str">"preset.updated"</span>],
    secret=<span class="c-str">"whsec_your_signing_secret"</span>,
)

<span class="c-kw">print</span>(webhook.id)`,
    response: {
      ok: true,
      status: '201 Created',
      time: '55ms',
      body: `{
  <span class="c-key">"id"</span>:       <span class="c-str">"wh_01HYABC3K"</span>,
  <span class="c-key">"url"</span>:      <span class="c-str">"https://yourapp.com/hooks/pulse"</span>,
  <span class="c-key">"events"</span>:   [<span class="c-str">"compile.done"</span>, <span class="c-str">"preset.updated"</span>],
  <span class="c-key">"enabled"</span>:  <span class="c-bool">true</span>,
  <span class="c-key">"created"</span>:  <span class="c-str">"2026-05-22T10:41:00Z"</span>
}`
    }
  },
  validate: {
    curl: `<span class="c-cm"># Validate an API key and check quota</span>
curl -X <span class="c-kw">GET</span> <span class="c-url">https://api.pulse.dev/v1/validate</span> \\
  -H <span class="c-str">"Authorization: Bearer YOUR_API_KEY"</span>`,
    node: `<span class="c-kw">const</span> status = <span class="c-kw">await</span> client.validate();

console.log(status.<span class="c-key">plan</span>);      <span class="c-cm">// "pro"</span>
console.log(status.<span class="c-key">quota</span>.<span class="c-key">used</span>); <span class="c-cm">// 18240</span>
console.log(status.<span class="c-key">quota</span>.<span class="c-key">max</span>);  <span class="c-cm">// 100000</span>`,
    python: `status = client.validate()

<span class="c-kw">print</span>(status.plan)        <span class="c-cm"># "pro"</span>
<span class="c-kw">print</span>(status.quota.used) <span class="c-cm"># 18240</span>
<span class="c-kw">print</span>(status.quota.max)  <span class="c-cm"># 100000</span>`,
    response: {
      ok: true,
      status: '200 OK',
      time: '14ms',
      body: `{
  <span class="c-key">"valid"</span>:  <span class="c-bool">true</span>,
  <span class="c-key">"plan"</span>:   <span class="c-str">"pro"</span>,
  <span class="c-key">"quota"</span>: {
    <span class="c-key">"used"</span>:    <span class="c-num">18240</span>,
    <span class="c-key">"max"</span>:     <span class="c-num">100000</span>,
    <span class="c-key">"resets"</span>: <span class="c-str">"2026-06-01T00:00:00Z"</span>
  }
}`
    }
  }
};

let currentEp = 'compile';
let currentLang = 'curl';

function renderApiReq() {
  const reqEl = document.getElementById('api-req-code');
  if (reqEl) reqEl.innerHTML = apiData[currentEp][currentLang];
}

function resetApiRes() {
  const resEl = document.getElementById('api-res-code');
  const badge = document.getElementById('api-status-badge');
  const meta  = document.getElementById('api-res-meta');
  if (resEl)  resEl.innerHTML = '<span style="color:var(--ink-mute)">// Hit "Send Request" to see the response</span>';
  if (badge)  { badge.textContent = '— awaiting'; badge.className = 'api-status-badge'; }
  if (meta)   meta.innerHTML = '';
}

document.querySelectorAll('.api-ep-tab').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.api-ep-tab').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    currentEp = btn.dataset.ep;
    renderApiReq();
    resetApiRes();
  });
});

document.querySelectorAll('.api-lang').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.api-lang').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    currentLang = btn.dataset.lang;
    renderApiReq();
  });
});

const apiTryBtn = document.getElementById('api-try-btn');
if (apiTryBtn) {
  apiTryBtn.addEventListener('click', () => {
    const tryText   = apiTryBtn.querySelector('.api-try-text');
    const tryLoader = apiTryBtn.querySelector('.api-try-loader');
    const resEl     = document.getElementById('api-res-code');
    const badge     = document.getElementById('api-status-badge');
    const meta      = document.getElementById('api-res-meta');

    apiTryBtn.disabled = true;
    tryText.style.display   = 'none';
    tryLoader.style.display = 'inline';

    const delay = 600 + Math.random() * 600;
    setTimeout(() => {
      const ep = apiData[currentEp].response;
      resEl.innerHTML = ep.body;
      badge.textContent = ep.status;
      badge.className = 'api-status-badge ' + (ep.ok ? 'ok' : 'err');
      meta.innerHTML = `
        <span>⏱ ${ep.time}</span>
        <span>📦 ${resEl.textContent.replace(/\s+/g,' ').trim().length} bytes</span>
        <span style="color:var(--neon-lime)">✓ application/json</span>
      `;
      apiTryBtn.disabled = false;
      tryText.style.display   = 'inline';
      tryLoader.style.display = 'none';
    }, delay);
  });
}

renderApiReq();

/* ============= PRICING ============= */
let isAnnual = false;

const ptoggleBtn = document.getElementById('ptoggle-btn');
if (ptoggleBtn) {
  ptoggleBtn.addEventListener('click', () => {
    isAnnual = !isAnnual;
    ptoggleBtn.classList.toggle('annual', isAnnual);

    document.querySelectorAll('.price-num[data-monthly]').forEach(el => {
      el.textContent = isAnnual ? el.dataset.annual : el.dataset.monthly;
    });
    document.getElementById('core-annual-note').style.display   = isAnnual ? 'block' : 'none';
    document.getElementById('studio-annual-note').style.display = isAnnual ? 'block' : 'none';
  });
}

const pricingOverlay = document.getElementById('pricing-overlay');
const pricingClose   = document.getElementById('pricing-close');
const pricingInner   = document.getElementById('pricing-modal-inner');

const pricingContent = {
  free: () => `
    <div class="pm-plan-tag">Free Plan</div>
    <div class="pm-title">Get Started Free</div>
    <div class="pm-price">$0 <span>/forever</span></div>
    <ul class="pm-features-mini">
      <li>All 142+ motion presets</li>
      <li>Local CLI compiler</li>
      <li>Community Discord access</li>
      <li>MIT licensed — personal &amp; commercial</li>
    </ul>
    <div class="pm-divider"></div>
    <p style="font-size:12px;color:var(--ink-mute);margin-bottom:8px">Install with npm:</p>
    <div class="pm-code-box">
      <code>npm install @pulse/core</code>
      <button class="pm-copy-btn" id="pm-copy-npm">Copy</button>
    </div>
    <label class="pm-label">Your email (get release notes)</label>
    <input class="pm-input" type="email" id="pm-email-free" placeholder="you@yourproject.dev" />
    <button class="pm-submit" id="pm-submit-free">Install Now →</button>
    <p class="pm-fine-print">No account needed · No credit card · Just install and ship</p>
    <div class="pm-success" id="pm-success-free">
      <div class="pm-success-icon">✓</div>
      <h3>You're all set!</h3>
      <p>Run <code style="color:var(--neon-cyan)">npm install @pulse/core</code> in your project.<br>We'll send release notes to your inbox.</p>
    </div>
  `,
  core: () => `
    <div class="pm-plan-tag">Core Plan · ${isAnnual ? 'Annual' : 'Monthly'}</div>
    <div class="pm-title">Start Your Trial</div>
    <div class="pm-price">$${isAnnual ? '15' : '19'} <span>/mo${isAnnual ? ' · billed $190/yr' : ''}</span></div>
    <ul class="pm-features-mini">
      <li>Everything in Free</li>
      <li>Cloud compiler API — 50k req/mo</li>
      <li>Visual editor with live preview</li>
      <li>Private preset collections</li>
      <li>Priority email support</li>
    </ul>
    <div class="pm-divider"></div>
    <label class="pm-label">Full Name <span style="color:var(--neon-magenta)">*</span></label>
    <div class="pm-field-wrap">
      <input class="pm-input" type="text" id="pm-name-core" placeholder="Your name" autocomplete="name" />
      <div class="pm-field-error" id="err-name-core">Name is required</div>
    </div>
    <label class="pm-label">Work Email <span style="color:var(--neon-magenta)">*</span></label>
    <div class="pm-field-wrap">
      <input class="pm-input" type="email" id="pm-email-core" placeholder="you@company.dev" autocomplete="email" />
      <div class="pm-field-error" id="err-email-core">Enter a valid email address</div>
    </div>
    <div class="pm-hint" id="pm-hint-core">Fill in all fields to continue</div>
    <button class="pm-submit locked" id="pm-submit-core" disabled>Start 14-Day Free Trial →</button>
    <p class="pm-fine-print">No credit card required · Cancel anytime · Trial ends automatically</p>
    <div class="pm-success" id="pm-success-core">
      <div class="pm-success-icon">🚀</div>
      <h3>Trial Started!</h3>
      <p>Check your inbox for your API key and onboarding guide.<br>Your 14-day trial starts now.</p>
    </div>
  `,
  studio: () => `
    <div class="pm-plan-tag">Studio Plan</div>
    <div class="pm-title">Talk to Us</div>
    <div class="pm-price">$${isAnnual ? '71' : '89'} <span>/mo${isAnnual ? ' · billed $850/yr' : ''}</span></div>
    <ul class="pm-features-mini">
      <li>Everything in Core</li>
      <li>Unlimited API requests</li>
      <li>Team workspaces up to 20</li>
      <li>SLA + Slack Connect support</li>
      <li>Custom preset development</li>
    </ul>
    <div class="pm-divider"></div>
    <label class="pm-label">Full Name <span style="color:var(--neon-magenta)">*</span></label>
    <div class="pm-field-wrap">
      <input class="pm-input" type="text" id="pm-name-studio" placeholder="Your name" autocomplete="name" />
      <div class="pm-field-error" id="err-name-studio">Name is required</div>
    </div>
    <label class="pm-label">Work Email <span style="color:var(--neon-magenta)">*</span></label>
    <div class="pm-field-wrap">
      <input class="pm-input" type="email" id="pm-email-studio" placeholder="you@company.dev" autocomplete="email" />
      <div class="pm-field-error" id="err-email-studio">Enter a valid email address</div>
    </div>
    <label class="pm-label">Company <span style="color:var(--neon-magenta)">*</span></label>
    <div class="pm-field-wrap">
      <input class="pm-input" type="text" id="pm-company" placeholder="Your company name" autocomplete="organization" />
      <div class="pm-field-error" id="err-company">Company name is required</div>
    </div>
    <label class="pm-label">Team Size <span style="color:var(--neon-magenta)">*</span></label>
    <div class="pm-field-wrap">
      <select class="pm-select" id="pm-teamsize">
        <option value="">Select team size…</option>
        <option>1–5 people</option>
        <option>6–20 people</option>
        <option>21–50 people</option>
        <option>50+ people</option>
      </select>
      <div class="pm-field-error" id="err-teamsize">Please select your team size</div>
    </div>
    <div class="pm-hint" id="pm-hint-studio">Fill in all fields to continue</div>
    <button class="pm-submit locked" id="pm-submit-studio" disabled>Request a Demo →</button>
    <p class="pm-fine-print">We reply within 24 hours · No sales pressure</p>
    <div class="pm-success" id="pm-success-studio">
      <div class="pm-success-icon">📬</div>
      <h3>Request Received!</h3>
      <p>A member of our team will reach out within 24 hours to schedule your demo.</p>
    </div>
  `
};

function openPricingModal(plan) {
  pricingInner.innerHTML = pricingContent[plan]();
  pricingOverlay.classList.add('open');
  document.body.style.overflow = 'hidden';

  const npmCopy = document.getElementById('pm-copy-npm');
  if (npmCopy) {
    npmCopy.addEventListener('click', () => {
      navigator.clipboard.writeText('npm install @pulse/core');
      npmCopy.textContent = '✓';
      setTimeout(() => { npmCopy.textContent = 'Copy'; }, 1400);
    });
  }

  const submitEl  = document.getElementById(`pm-submit-${plan}`);
  const successEl = document.getElementById(`pm-success-${plan}`);
  const hintEl    = document.getElementById(`pm-hint-${plan}`);
  if (!submitEl) return;

  const validationRules = {
    core:   [
      { id: 'pm-name-core',   errId: 'err-name-core',   check: v => v.trim().length > 0 },
      { id: 'pm-email-core',  errId: 'err-email-core',  check: v => /\S+@\S+\.\S+/.test(v) }
    ],
    studio: [
      { id: 'pm-name-studio',  errId: 'err-name-studio',  check: v => v.trim().length > 0 },
      { id: 'pm-email-studio', errId: 'err-email-studio', check: v => /\S+@\S+\.\S+/.test(v) },
      { id: 'pm-company',      errId: 'err-company',      check: v => v.trim().length > 0 },
      { id: 'pm-teamsize',     errId: 'err-teamsize',     check: v => v !== '' }
    ]
  };

  const rules = validationRules[plan];
  if (!rules) {
    submitEl.addEventListener('click', () => {
      submitEl.textContent = '⟳ Processing…';
      submitEl.disabled = true;
      setTimeout(() => {
        submitEl.style.display = 'none';
        if (successEl) successEl.style.display = 'block';
      }, 1200);
    });
    return;
  }

  function isFormValid() {
    return rules.every(r => {
      const el = document.getElementById(r.id);
      return el && r.check(el.value);
    });
  }

  function updateBtn() {
    const valid = isFormValid();
    submitEl.disabled = !valid;
    submitEl.classList.toggle('locked', !valid);
    if (hintEl) {
      hintEl.textContent = valid ? 'Everything looks good — ready to submit' : 'Fill in all fields to continue';
      hintEl.classList.toggle('ready', valid);
    }
  }

  rules.forEach(r => {
    const el = document.getElementById(r.id);
    if (!el) return;

    el.addEventListener('input', updateBtn);
    el.addEventListener('change', updateBtn);

    el.addEventListener('blur', () => {
      const errEl = document.getElementById(r.errId);
      if (!r.check(el.value) && el.value !== '') {
        el.classList.add('invalid');
        if (errEl) errEl.classList.add('show');
      } else {
        el.classList.remove('invalid');
        if (errEl) errEl.classList.remove('show');
      }
    });

    el.addEventListener('focus', () => {
      el.classList.remove('invalid');
      const errEl = document.getElementById(r.errId);
      if (errEl) errEl.classList.remove('show');
    });
  });

  submitEl.addEventListener('click', (e) => {
    if (submitEl.disabled) {
      e.preventDefault();
      rules.forEach(r => {
        const el = document.getElementById(r.id);
        const errEl = document.getElementById(r.errId);
        if (el && !r.check(el.value)) {
          el.classList.add('invalid');
          if (errEl) errEl.classList.add('show');
        }
      });
      const modal = document.getElementById('pricing-modal');
      modal.classList.remove('pm-shake');
      void modal.offsetWidth;
      modal.classList.add('pm-shake');
      setTimeout(() => modal.classList.remove('pm-shake'), 450);
      return;
    }
    submitEl.textContent = '⟳ Processing…';
    submitEl.disabled = true;
    submitEl.classList.remove('locked');
    setTimeout(() => {
      submitEl.style.display = 'none';
      if (successEl) successEl.style.display = 'block';
    }, 1200);
  });
}

function closePricingModal() {
  pricingOverlay.classList.remove('open');
  document.body.style.overflow = '';
}

document.querySelectorAll('.price-btn[data-plan]').forEach(btn => {
  btn.addEventListener('click', (e) => {
    e.stopPropagation();
    openPricingModal(btn.dataset.plan);
  });
});

document.querySelectorAll('.price-card[data-plan]').forEach(card => {
  card.addEventListener('click', (e) => {
    if (e.target.closest('.price-btn')) return;
    openPricingModal(card.dataset.plan);
  });
});

pricingClose.addEventListener('click', closePricingModal);
pricingOverlay.addEventListener('click', (e) => { if (e.target === pricingOverlay) closePricingModal(); });

/* ============= COMMUNITY MODAL ============= */
const commData = {
  discord: {
    tag: 'Discord HQ',
    html: `
      <h3>14,200 devs. One server.</h3>
      <p>The Pulse Discord is the fastest way to get unstuck, share what you built, and connect with the people shipping motion-rich products every day.</p>
      <div class="comm-modal-stat-row">
        <div class="comm-modal-stat"><span class="s-num">14.2k</span><span class="s-lbl">Members</span></div>
        <div class="comm-modal-stat"><span class="s-num">340+</span><span class="s-lbl">Online now</span></div>
        <div class="comm-modal-stat"><span class="s-num">Thu</span><span class="s-lbl">Office Hours</span></div>
      </div>
      <div class="comm-modal-channels">
        <div class="comm-modal-channel"><div class="ch-name">#showcase</div><div class="ch-desc">Share what you built</div></div>
        <div class="comm-modal-channel"><div class="ch-name">#help</div><div class="ch-desc">Get unstuck fast</div></div>
        <div class="comm-modal-channel"><div class="ch-name">#presets</div><div class="ch-desc">Trade animation recipes</div></div>
        <div class="comm-modal-channel"><div class="ch-name">#feedback</div><div class="ch-desc">Direct line to the team</div></div>
        <div class="comm-modal-channel"><div class="ch-name">#hiring</div><div class="ch-desc">Jobs in motion-first teams</div></div>
        <div class="comm-modal-channel"><div class="ch-name">#offtopic</div><div class="ch-desc">The usual chaos</div></div>
      </div>
      <button class="comm-modal-btn">Join the Server →</button>
    `
  },
  github: {
    tag: 'Open Source',
    html: `
      <h3>Built in the open.</h3>
      <p>Pulse is MIT-licensed. Every line of code is public. Read the source, file an issue, ship a PR — contributors are welcome at every level.</p>
      <div class="comm-modal-stat-row">
        <div class="comm-modal-stat"><span class="s-num">38k</span><span class="s-lbl">Stars</span></div>
        <div class="comm-modal-stat"><span class="s-num">4.1k</span><span class="s-lbl">Forks</span></div>
        <div class="comm-modal-stat"><span class="s-num">218</span><span class="s-lbl">Contributors</span></div>
        <div class="comm-modal-stat"><span class="s-num">MIT</span><span class="s-lbl">License</span></div>
      </div>
      <p style="margin-bottom: 12px; font-size: 12px; color: var(--neon-cyan); letter-spacing: 0.1em; text-transform: uppercase;">Recent Activity</p>
      <ul class="comm-modal-list">
        <li><span class="li-icon">✦</span><div><strong>feat: add scroll-timeline support</strong><br>merged by @pulse-core · 2h ago</div></li>
        <li><span class="li-icon">✦</span><div><strong>fix: cubic-bezier precision on Safari</strong><br>merged by @trez · 8h ago</div></li>
        <li><span class="li-icon">✦</span><div><strong>docs: improve choreography examples</strong><br>merged by @maya · 1d ago</div></li>
      </ul>
      <button class="comm-modal-btn cyan">View on GitHub →</button>
    `
  },
  presets: {
    tag: 'Community Presets',
    html: `
      <h3>512 presets. All free.</h3>
      <p>Every preset is community-submitted, reviewed, and MIT-licensed. Browse by category, vote your favorites up, or submit your own.</p>
      <div class="comm-modal-stat-row">
        <div class="comm-modal-stat"><span class="s-num">512</span><span class="s-lbl">Presets</span></div>
        <div class="comm-modal-stat"><span class="s-num">12</span><span class="s-lbl">Categories</span></div>
        <div class="comm-modal-stat"><span class="s-num">3.2k</span><span class="s-lbl">Votes Cast</span></div>
      </div>
      <p style="margin-bottom: 12px; font-size: 12px; color: var(--neon-cyan); letter-spacing: 0.1em; text-transform: uppercase;">Top Categories</p>
      <ul class="comm-modal-list">
        <li><span class="li-icon">⬡</span><div><strong>Entrance</strong> — fade, slide, pop, bounce variants</div></li>
        <li><span class="li-icon">⬡</span><div><strong>Loaders</strong> — spinners, bars, dots, morph loops</div></li>
        <li><span class="li-icon">⬡</span><div><strong>Text FX</strong> — glitch, typewriter, scramble</div></li>
        <li><span class="li-icon">⬡</span><div><strong>Hover</strong> — tilt, glow, lift, ripple</div></li>
        <li><span class="li-icon">⬡</span><div><strong>Scroll</strong> — reveal, parallax, sticky transitions</div></li>
      </ul>
      <button class="comm-modal-btn">Browse Presets →</button>
    `
  },
  'testimonial-maya': {
    tag: 'Developer Story',
    html: `
      <div class="comm-modal-quote">"Pulse replaced 60kb of animation library with 2.4kb of pure CSS. Our LCP dropped 380ms overnight."</div>
      <div class="comm-modal-author">
        <div class="comm-modal-avatar">MK</div>
        <div class="comm-modal-author-info">
          <div class="a-name">Maya Kowalski</div>
          <div class="a-role">Lead Engineer, Parabola · @maya</div>
        </div>
      </div>
      <div class="comm-modal-divider"></div>
      <p>Maya's team was shipping a data-viz dashboard with heavy GSAP-based transitions. After migrating the entrance animations and microinteractions to Pulse, they measured a 380ms improvement in Largest Contentful Paint — dropping total animation payload from 61kb to 2.4kb minified + gzipped.</p>
      <ul class="comm-modal-list">
        <li><span class="li-icon">✦</span><div>61kb → 2.4kb animation payload</div></li>
        <li><span class="li-icon">✦</span><div>LCP improved by 380ms on mobile</div></li>
        <li><span class="li-icon">✦</span><div>Zero JS runtime for all entrance animations</div></li>
      </ul>
    `
  },
  'testimonial-tomas': {
    tag: 'Developer Story',
    html: `
      <div class="comm-modal-quote">"The choreography API changed how I think about motion. It's not animations anymore. It's storytelling."</div>
      <div class="comm-modal-author">
        <div class="comm-modal-avatar" style="background: linear-gradient(135deg, var(--neon-cyan), var(--neon-violet));">TR</div>
        <div class="comm-modal-author-info">
          <div class="a-name">Tomás Reyes</div>
          <div class="a-role">Design Engineer, Vector · @trez</div>
        </div>
      </div>
      <div class="comm-modal-divider"></div>
      <p>Tomás uses the Pulse choreography system to coordinate multi-element sequences across Vector's design system. Instead of managing animation timelines manually, he composes named motion tokens that the whole team shares.</p>
      <ul class="comm-modal-list">
        <li><span class="li-icon">✦</span><div>Shared motion tokens across 40+ components</div></li>
        <li><span class="li-icon">✦</span><div>Zero animation conflicts in production</div></li>
        <li><span class="li-icon">✦</span><div>Design + eng speaking the same motion language</div></li>
      </ul>
    `
  }
};

const commOverlay = document.getElementById('comm-overlay');
const commClose   = document.getElementById('comm-close');
const commTag     = document.getElementById('comm-modal-tag');
const commBody    = document.getElementById('comm-modal-body');

function openCommModal(key) {
  const d = commData[key];
  if (!d) return;
  commTag.textContent   = d.tag;
  commBody.innerHTML    = d.html;
  commOverlay.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeCommModal() {
  commOverlay.classList.remove('open');
  document.body.style.overflow = '';
}

document.querySelectorAll('.comm-card[data-comm]').forEach(card => {
  card.addEventListener('click', () => openCommModal(card.dataset.comm));
});

commClose.addEventListener('click', closeCommModal);
commOverlay.addEventListener('click', (e) => { if (e.target === commOverlay) closeCommModal(); });
document.addEventListener('keydown', (e) => { if (e.key === 'Escape') { closeFooterModal(); closePricingModal(); closeCommModal(); closeDocsModal(); closeModal(); } });

/* ============= SDK BADGES ============= */
const sdkPopup    = document.getElementById('sdk-popup');
const sdkPopupCmd = document.getElementById('sdk-popup-cmd');
const sdkPopupCopy = document.getElementById('sdk-popup-copy');
let activeSdkBadge = null;

document.querySelectorAll('.sdk-badge[data-sdk]').forEach(badge => {
  badge.addEventListener('click', (e) => {
    e.stopPropagation();
    if (activeSdkBadge === badge) {
      sdkPopup.classList.remove('open');
      badge.classList.remove('active');
      activeSdkBadge = null;
      return;
    }
    if (activeSdkBadge) activeSdkBadge.classList.remove('active');
    activeSdkBadge = badge;
    badge.classList.add('active');
    sdkPopupCmd.textContent = badge.dataset.cmd;
    sdkPopup.classList.add('open');
    sdkPopupCopy.textContent = 'Copy';
  });
});

sdkPopupCopy.addEventListener('click', () => {
  navigator.clipboard.writeText(sdkPopupCmd.textContent);
  sdkPopupCopy.textContent = '✓ Copied!';
  setTimeout(() => { sdkPopupCopy.textContent = 'Copy'; }, 1400);
});

document.addEventListener('click', () => {
  if (sdkPopup.classList.contains('open')) {
    sdkPopup.classList.remove('open');
    if (activeSdkBadge) { activeSdkBadge.classList.remove('active'); activeSdkBadge = null; }
  }
});

/* ============= FOOTER LINKS ============= */
document.getElementById('footer-logo').addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

const footerOverlay   = document.getElementById('footer-overlay');
const footerClose     = document.getElementById('footer-close');
const footerModalTag  = document.getElementById('footer-modal-tag');
const footerModalBody = document.getElementById('footer-modal-body');

const footerData = {
  changelog: {
    tag: 'Changelog',
    html: `
      <h3>Release History</h3>
      <p>Every release ships with a full changelog and migration notes.</p>
      <div class="changelog-entry">
        <div class="changelog-ver">v3.1.0</div>
        <div class="changelog-date">May 2026 — Current</div>
        <ul>
          <li>Scroll-timeline support via <code style="color:var(--neon-cyan)">@pulse/scroll</code></li>
          <li>12 new presets in Entrance category</li>
          <li>Fixed cubic-bezier precision bug on Safari 17</li>
          <li>CLI: new <code style="color:var(--neon-cyan)">--watch</code> flag for live recompile</li>
          <li>TypeScript types improved across all modules</li>
        </ul>
      </div>
      <div class="comm-modal-divider"></div>
      <div class="changelog-entry">
        <div class="changelog-ver">v3.0.0</div>
        <div class="changelog-date">March 2026</div>
        <ul>
          <li>New choreography API — compose multi-element sequences</li>
          <li>Visual editor (beta) — live preview + export</li>
          <li>Full TypeScript rewrite of core engine</li>
          <li>Breaking: <code style="color:var(--neon-magenta)">pulse.animate()</code> → <code style="color:var(--neon-cyan)">pulse.compile()</code></li>
        </ul>
      </div>
      <div class="comm-modal-divider"></div>
      <div class="changelog-entry">
        <div class="changelog-ver">v2.9.0</div>
        <div class="changelog-date">January 2026</div>
        <ul>
          <li>Performance: 40% faster compile times</li>
          <li>New easing library — 28 named curves added</li>
          <li>CDN bundle size reduced to 2.4kb gzipped</li>
        </ul>
      </div>
    `
  },
  migration: {
    tag: 'Migration Guide',
    html: `
      <h3>v2 → v3 Migration</h3>
      <p>v3 is a major release with a cleaner API. Most projects migrate in under 30 minutes.</p>
      <div class="comm-modal-stat-row">
        <div class="comm-modal-stat"><span class="s-num">3</span><span class="s-lbl">Breaking Changes</span></div>
        <div class="comm-modal-stat"><span class="s-num">~30</span><span class="s-lbl">Min to Migrate</span></div>
        <div class="comm-modal-stat"><span class="s-num">v2.9+</span><span class="s-lbl">Min Required</span></div>
      </div>
      <ul class="comm-modal-list">
        <li>
          <span class="li-icon">01</span>
          <div><strong>Update the package</strong><br>
          <code style="color:var(--neon-cyan);font-size:12px">npm install @pulse/core@3</code></div>
        </li>
        <li>
          <span class="li-icon">02</span>
          <div><strong>Rename <code style="color:var(--neon-magenta)">pulse.animate()</code> → <code style="color:var(--neon-cyan)">pulse.compile()</code></strong><br>
          Options object is unchanged — just the method name.</div>
        </li>
        <li>
          <span class="li-icon">03</span>
          <div><strong>Update config file</strong><br>
          Rename <code style="color:var(--neon-magenta)">pulse.config.js</code> → <code style="color:var(--neon-cyan)">pulse.config.ts</code> and add <code style="color:var(--neon-cyan)">export default</code>.</div>
        </li>
        <li>
          <span class="li-icon">04</span>
          <div><strong>Remove deprecated easing aliases</strong><br>
          <code style="color:var(--neon-magenta)">easeInCubic</code> → <code style="color:var(--neon-cyan)">cubic-in</code>. Full list in the docs.</div>
        </li>
      </ul>
      <button class="comm-modal-btn">Read Full Migration Docs →</button>
    `
  },
  roadmap: {
    tag: 'Roadmap',
    html: `
      <h3>What's coming next</h3>
      <p>Pulse is built in the open. Vote on features, follow progress, and contribute on GitHub.</p>
      <div class="roadmap-row">
        <div class="roadmap-quarter">Q2 2026</div>
        <div class="roadmap-items">
          <div class="roadmap-item"><span class="roadmap-tag done">Done</span>Scroll-timeline API</div>
          <div class="roadmap-item"><span class="roadmap-tag done">Done</span>TypeScript rewrite</div>
          <div class="roadmap-item"><span class="roadmap-tag progress">In progress</span>Visual editor v1</div>
        </div>
      </div>
      <div class="comm-modal-divider"></div>
      <div class="roadmap-row">
        <div class="roadmap-quarter">Q3 2026</div>
        <div class="roadmap-items">
          <div class="roadmap-item"><span class="roadmap-tag planned">Planned</span>React component library</div>
          <div class="roadmap-item"><span class="roadmap-tag planned">Planned</span>Vue + Svelte adapters</div>
          <div class="roadmap-item"><span class="roadmap-tag planned">Planned</span>3D transform presets</div>
        </div>
      </div>
      <div class="comm-modal-divider"></div>
      <div class="roadmap-row">
        <div class="roadmap-quarter">Q4 2026</div>
        <div class="roadmap-items">
          <div class="roadmap-item"><span class="roadmap-tag planned">Planned</span>AI preset generator</div>
          <div class="roadmap-item"><span class="roadmap-tag planned">Planned</span>Figma plugin</div>
        </div>
      </div>
      <div class="comm-modal-divider"></div>
      <div class="roadmap-row">
        <div class="roadmap-quarter">2027</div>
        <div class="roadmap-items">
          <div class="roadmap-item"><span class="roadmap-tag planned">Planned</span>Native iOS / Android support</div>
          <div class="roadmap-item"><span class="roadmap-tag planned">Planned</span>Motion accessibility engine</div>
        </div>
      </div>
      <button class="comm-modal-btn" style="margin-top:16px">Vote on GitHub →</button>
    `
  },
  brand: {
    tag: 'Brand Assets',
    html: `
      <h3>Pulse Brand Kit</h3>
      <p>Use these assets to talk about Pulse in your blog posts, talks, and projects. Please don't modify the logo or use our colors to imply endorsement.</p>
      <p style="font-size:12px;color:var(--neon-cyan);text-transform:uppercase;letter-spacing:0.15em;margin-bottom:8px">Color Palette</p>
      <div class="brand-swatch-row">
        <div class="brand-swatch" style="background:#ff006e"><span>#ff006e</span></div>
        <div class="brand-swatch" style="background:#00f0ff"><span style="color:rgba(0,0,0,0.7)">#00f0ff</span></div>
        <div class="brand-swatch" style="background:#8b00ff"><span>#8b00ff</span></div>
        <div class="brand-swatch" style="background:#c6ff00"><span style="color:rgba(0,0,0,0.7)">#c6ff00</span></div>
        <div class="brand-swatch" style="background:#050208;border:1px solid rgba(255,255,255,0.15)"><span>#050208</span></div>
      </div>
      <div class="comm-modal-divider"></div>
      <ul class="comm-modal-list">
        <li><span class="li-icon">⬡</span><div><strong>Logo (SVG)</strong> — Light + Dark variants, full + mark only</div></li>
        <li><span class="li-icon">⬡</span><div><strong>Logo (PNG)</strong> — 1x, 2x, 3x transparent background</div></li>
        <li><span class="li-icon">⬡</span><div><strong>Social banner</strong> — 1200×630 Twitter/OG card</div></li>
        <li><span class="li-icon">⬡</span><div><strong>Figma source</strong> — All assets in a shared Figma file</div></li>
      </ul>
      <button class="comm-modal-btn">Download Brand Kit →</button>
    `
  },
  status: {
    tag: 'System Status',
    html: `
      <h3 style="color:var(--neon-lime)">All Systems Operational</h3>
      <p>Live status for all Pulse infrastructure. Updated every 60 seconds.</p>
      <div class="comm-modal-divider"></div>
      <div class="status-row"><span>API — api.pulse.dev</span><span class="status-ok"><span class="status-dot-green"></span> 100% uptime</span></div>
      <div class="status-row"><span>CDN — cdn.pulse.dev</span><span class="status-ok"><span class="status-dot-green"></span> 100% uptime</span></div>
      <div class="status-row"><span>Cloud Compiler</span><span class="status-ok"><span class="status-dot-green"></span> 100% uptime</span></div>
      <div class="status-row"><span>Visual Editor</span><span class="status-ok"><span class="status-dot-green"></span> 100% uptime</span></div>
      <div class="status-row"><span>Dashboard</span><span class="status-ok"><span class="status-dot-green"></span> 100% uptime</span></div>
      <div class="status-row"><span>npm registry</span><span class="status-ok"><span class="status-dot-green"></span> 100% uptime</span></div>
      <div class="comm-modal-divider"></div>
      <p style="font-size:11px;color:var(--ink-mute)">Last incident: Feb 14 2026 — 12-min CDN latency spike. Resolved. <a href="javascript:void(0)" style="color:var(--neon-cyan)">View incident report →</a></p>
    `
  },
  discord: null,
  github: null,
  twitter: {
    tag: 'X / Twitter',
    html: `
      <h3>@pulsecss</h3>
      <p>Follow us on X for release announcements, motion tips, community highlights, and behind-the-scenes from the core team.</p>
      <div class="comm-modal-stat-row">
        <div class="comm-modal-stat"><span class="s-num">28k</span><span class="s-lbl">Followers</span></div>
        <div class="comm-modal-stat"><span class="s-num">Daily</span><span class="s-lbl">Posts</span></div>
      </div>
      <ul class="comm-modal-list">
        <li><span class="li-icon">✦</span><div>Release announcements and changelogs</div></li>
        <li><span class="li-icon">✦</span><div>Motion tips and animation breakdowns</div></li>
        <li><span class="li-icon">✦</span><div>Community showcases and reposts</div></li>
        <li><span class="li-icon">✦</span><div>Early previews of what's in the lab</div></li>
      </ul>
      <button class="comm-modal-btn" style="background:linear-gradient(135deg,#1d9bf0,#0d6efd)">Follow @pulsecss →</button>
    `
  },
  youtube: {
    tag: 'YouTube',
    html: `
      <h3>Pulse on YouTube</h3>
      <p>Deep-dives, tutorials, and live coding sessions. If you learn better by watching than reading — this is the channel.</p>
      <div class="comm-modal-stat-row">
        <div class="comm-modal-stat"><span class="s-num">6.2k</span><span class="s-lbl">Subscribers</span></div>
        <div class="comm-modal-stat"><span class="s-num">48</span><span class="s-lbl">Videos</span></div>
        <div class="comm-modal-stat"><span class="s-num">2×/mo</span><span class="s-lbl">Upload cadence</span></div>
      </div>
      <ul class="comm-modal-list">
        <li><span class="li-icon">▶</span><div><strong>Getting Started with Pulse v3</strong><br><span style="font-size:11px;color:var(--ink-mute)">28 min · 14k views</span></div></li>
        <li><span class="li-icon">▶</span><div><strong>Building a Cyberpunk UI — live session</strong><br><span style="font-size:11px;color:var(--ink-mute)">1h 12 min · 8.4k views</span></div></li>
        <li><span class="li-icon">▶</span><div><strong>Scroll-Linked Animations: Deep Dive</strong><br><span style="font-size:11px;color:var(--ink-mute)">42 min · 6.1k views</span></div></li>
      </ul>
      <button class="comm-modal-btn" style="background:linear-gradient(135deg,#ff0000,#c00)">Subscribe →</button>
    `
  },
  newsletter: {
    tag: 'Newsletter',
    html: `
      <h3>Pulse Weekly</h3>
      <p>A short email every week — new presets, motion design breakdowns, community picks, and early access to features. No spam, ever. Unsubscribe any time.</p>
      <div class="comm-modal-stat-row">
        <div class="comm-modal-stat"><span class="s-num">9.4k</span><span class="s-lbl">Subscribers</span></div>
        <div class="comm-modal-stat"><span class="s-num">62%</span><span class="s-lbl">Open Rate</span></div>
        <div class="comm-modal-stat"><span class="s-num">Weekly</span><span class="s-lbl">Cadence</span></div>
      </div>
      <div class="comm-modal-divider"></div>
      <label class="pm-label" style="color:var(--ink-mute);font-size:11px;text-transform:uppercase;letter-spacing:0.15em;display:block;margin-bottom:8px">Your email</label>
      <input class="pm-input" type="email" id="newsletter-email" placeholder="you@yourproject.dev" style="margin-bottom:14px" />
      <button class="comm-modal-btn" id="newsletter-submit" style="width:100%;justify-content:center">Subscribe to Pulse Weekly →</button>
      <div id="newsletter-success" style="display:none;text-align:center;padding:20px 0">
        <div style="font-size:36px;margin-bottom:10px">📬</div>
        <strong style="font-family:'Orbitron',sans-serif;font-size:15px;display:block;margin-bottom:8px;text-transform:uppercase">You're in!</strong>
        <p style="font-size:13px;color:var(--ink-dim)">First issue lands in your inbox this Friday. Welcome to the collective.</p>
      </div>
      <p class="pm-fine-print" style="margin-top:10px">No spam · Unsubscribe anytime · ~3 min read per issue</p>
    `
  }
};

function openFooterModal(key) {
  if (key === 'discord') { openCommModal('discord'); return; }
  if (key === 'github')  { openCommModal('github');  return; }

  const d = footerData[key];
  if (!d) return;
  footerModalTag.textContent  = d.tag;
  footerModalBody.innerHTML   = d.html;
  footerOverlay.classList.add('open');
  document.body.style.overflow = 'hidden';

  const newsletterSubmit = document.getElementById('newsletter-submit');
  if (newsletterSubmit) {
    newsletterSubmit.addEventListener('click', () => {
      newsletterSubmit.textContent = '⟳ Subscribing…';
      newsletterSubmit.disabled = true;
      setTimeout(() => {
        newsletterSubmit.style.display = 'none';
        document.getElementById('newsletter-success').style.display = 'block';
      }, 1000);
    });
  }
}

function closeFooterModal() {
  footerOverlay.classList.remove('open');
  document.body.style.overflow = '';
}

document.querySelectorAll('[data-footer]').forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    openFooterModal(link.dataset.footer);
  });
});

footerClose.addEventListener('click', closeFooterModal);
footerOverlay.addEventListener('click', (e) => { if (e.target === footerOverlay) closeFooterModal(); });

/* ============= PARALLAX ORBS ============= */
let scrollY = 0;
window.addEventListener('scroll', () => {
  scrollY = window.scrollY;
  document.querySelector('.orb-1').style.transform = `translateY(${scrollY * 0.15}px)`;
  document.querySelector('.orb-2').style.transform = `translateY(${scrollY * -0.1}px)`;
  document.querySelector('.orb-3').style.transform = `translateY(${scrollY * 0.08}px)`;
});
