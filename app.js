/* ═══════════════════════════════════════════════
   Silverback 180 – App Shell
   Handles: mode routing, speech TTS, toast
═══════════════════════════════════════════════ */

'use strict';

// ── Registered modes ─────────────────────────────
const MODES = [
  { id: 'x01',   label: 'X01',      script: 'modes/x01.js',   css: 'modes/x01.css' },
  // Future modes – add here:
  // { id: 'bobs27', label: "Bob's 27", script: 'modes/bobs27.js', css: 'modes/bobs27.css' },
  // { id: 'cricket', label: 'Cricket',  script: 'modes/cricket.js', css: 'modes/cricket.css' },
];

let currentMode = null;
let loadedStyles = {};
let loadedScripts = {};

// ── DOM refs ────────────────────────────────────
const modeNav       = document.getElementById('mode-nav');
const modeContainer = document.getElementById('mode-container');

// ── Build nav ────────────────────────────────────
MODES.forEach(m => {
  const btn = document.createElement('button');
  btn.className = 'mode-btn';
  btn.textContent = m.label;
  btn.dataset.mode = m.id;
  btn.addEventListener('click', () => loadMode(m.id));
  modeNav.appendChild(btn);
});

// ── Mode Loader ──────────────────────────────────
async function loadMode(id) {
  if (currentMode === id) return;

  // Cleanup previous mode
  if (currentMode && window.__modeCleanup) {
    window.__modeCleanup();
    window.__modeCleanup = null;
  }

  currentMode = id;
  const mode = MODES.find(m => m.id === id);

  // Nav highlight
  document.querySelectorAll('.mode-btn').forEach(b =>
    b.classList.toggle('active', b.dataset.mode === id)
  );

  // Loading state
  modeContainer.innerHTML = `<div class="mode-loading">Lade ${mode.label}…</div>`;

  // Load CSS once
  if (mode.css && !loadedStyles[id]) {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = mode.css;
    document.head.appendChild(link);
    loadedStyles[id] = true;
  }

  // Load JS once (modules)
  if (!loadedScripts[id]) {
    await new Promise((res, rej) => {
      const s = document.createElement('script');
      s.src = mode.script;
      s.defer = true;
      s.onload = res;
      s.onerror = () => rej(new Error(`Konnte ${mode.script} nicht laden`));
      document.head.appendChild(s);
    });
    loadedScripts[id] = true;
  }

  // Mount – each mode exposes window.__mountMode(container)
  if (window.__mountMode) {
    window.__mountMode(modeContainer);
  }
}

// ── TTS (German) ─────────────────────────────────
window.SB_speak = function(text, priority = false) {
  if (!window.speechSynthesis) return;
  if (priority) speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(text);
  u.lang = 'de-DE';
  u.rate = 1.05;
  u.pitch = 1.0;
  speechSynthesis.speak(u);
};

// ── Toast ─────────────────────────────────────────
const toastEl = document.getElementById('toast');
let toastTimer;
window.SB_toast = function(msg, duration = 2200) {
  toastEl.textContent = msg;
  toastEl.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toastEl.classList.remove('show'), duration);
};

// ── PWA Service Worker ────────────────────────────
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('./sw.js').catch(() => {});
}

// ── Boot ─────────────────────────────────────────
loadMode('x01');
