/* ═══════════════════════════════════════════════
   Silverback 180 – X01 Mode
   Mounts via: window.__mountMode(container)
   Cleanup via: window.__modeCleanup()
═══════════════════════════════════════════════ */
(function () {
  'use strict';

  // ── Checkout-Tabelle (Doppel-Out) ─────────────────
  const CHECKOUTS = {
    170:['T20','T20','Bull'], 167:['T20','T19','Bull'], 164:['T20','T18','Bull'],
    161:['T20','T17','Bull'], 160:['T20','T20','D20'], 158:['T20','T20','D19'],
    157:['T20','T19','D20'], 156:['T20','T20','D18'], 155:['T20','T19','D19'],
    154:['T20','T18','D20'], 153:['T20','T19','D18'], 152:['T20','T20','D16'],
    151:['T20','T17','D20'], 150:['T20','T18','D18'], 149:['T20','T19','D16'],
    148:['T20','T20','D14'], 147:['T20','T17','D18'], 146:['T20','T18','D16'],
    145:['T20','T15','D20'], 144:['T20','T20','D12'], 143:['T20','T17','D16'],
    142:['T20','T14','D20'], 141:['T20','T19','D12'], 140:['T20','T20','D10'],
    139:['T20','T13','D20'], 138:['T20','T18','D12'], 137:['T20','T19','D10'],
    136:['T20','T20','D8'],  135:['T20','T17','D12'], 134:['T20','T14','D16'],
    133:['T20','T19','D8'],  132:['T20','T16','D12'], 131:['T20','T13','D16'],
    130:['T20','T18','D8'],  129:['T19','T16','D12'], 128:['T18','T14','D16'],
    127:['T20','T17','D8'],  126:['T19','T19','D6'],  125:['T20','T15','D10'],
    124:['T20','T16','D8'],  123:['T19','T16','D9'],  122:['T18','T18','D7'],
    121:['T20','T11','D14'], 120:['T20','S20','D20'], 119:['T19','T12','D13'],
    118:['T20','S18','D20'], 117:['T20','S17','D20'], 116:['T20','S16','D20'],
    115:['T20','S15','D20'], 114:['T20','S14','D20'], 113:['T20','S13','D20'],
    112:['T20','S12','D20'], 111:['T20','S11','D20'], 110:['T20','S10','D20'],
    109:['T20','S9','D20'],  108:['T20','S8','D20'],  107:['T20','S7','D20'],
    106:['T20','S6','D20'],  105:['T20','S5','D20'],  104:['T20','S4','D20'],
    103:['T20','S3','D20'],  102:['T20','S2','D20'],  101:['T20','S1','D20'],
    100:['T20','D20'],       99: ['T19','T10','D16'], 98: ['T20','D19'],
    97: ['T19','D20'],       96: ['T20','D18'],       95: ['T19','D19'],
    94: ['T18','D20'],       93: ['T19','D18'],       92: ['T20','D16'],
    91: ['T17','D20'],       90: ['T18','D18'],       89: ['T19','D16'],
    88: ['T20','D14'],       87: ['T17','D18'],       86: ['T18','D16'],
    85: ['T15','D20'],       84: ['T20','D12'],       83: ['T17','D16'],
    82: ['T14','D20'],       81: ['T19','D12'],       80: ['T20','D10'],
    79: ['T13','D20'],       78: ['T18','D12'],       77: ['T19','D10'],
    76: ['T20','D8'],        75: ['T17','D12'],       74: ['T14','D16'],
    73: ['T19','D8'],        72: ['T16','D12'],       71: ['T13','D16'],
    70: ['T18','D8'],        69: ['T19','D6'],        68: ['T20','D4'],
    67: ['T17','D8'],        66: ['T10','D18'],       65: ['T19','D4'],
    64: ['T16','D8'],        63: ['T13','D12'],       62: ['T10','D16'],
    61: ['T15','D8'],        60: ['S20','D20'],       59: ['S19','D20'],
    58: ['S18','D20'],       57: ['S17','D20'],       56: ['T16','D4'],
    55: ['S15','D20'],       54: ['S14','D20'],       53: ['S13','D20'],
    52: ['S12','D20'],       51: ['S11','D20'],       50: ['Bull'],
    49: ['S9','D20'],        48: ['S16','D16'],       47: ['S15','D16'],
    46: ['S14','D16'],       45: ['S13','D16'],       44: ['S12','D16'],
    43: ['S11','D16'],       42: ['S10','D16'],       41: ['S9','D16'],
    40: ['D20'],             39: ['S7','D16'],        38: ['D19'],
    37: ['S5','D16'],        36: ['D18'],             35: ['S3','D16'],
    34: ['D17'],             33: ['S1','D16'],        32: ['D16'],
    31: ['S15','D8'],        30: ['D15'],             28: ['D14'],
    26: ['D13'],             24: ['D12'],             22: ['D11'],
    20: ['D10'],             18: ['D9'],              16: ['D8'],
    14: ['D7'],              12: ['D6'],              10: ['D5'],
    8:  ['D4'],              6:  ['D3'],              4:  ['D2'],
    2:  ['D1'],
  };

  // ── Sprachzahlen DE ───────────────────────────────
  function numToDE(n) {
    const map = {
      0:'Null',1:'Eins',2:'Zwei',3:'Drei',4:'Vier',5:'Fünf',
      6:'Sechs',7:'Sieben',8:'Acht',9:'Neun',10:'Zehn',
      11:'Elf',12:'Zwölf',13:'Dreizehn',14:'Vierzehn',15:'Fünfzehn',
      16:'Sechzehn',17:'Siebzehn',18:'Achtzehn',19:'Neunzehn',20:'Zwanzig',
      25:'Fünfundzwanzig',50:'Fünfzig',
    };
    if (map[n]) return map[n];
    if (n < 100) {
      const tens = ['','','Zwanzig','Dreißig','Vierzig','Fünfzig','Sechzig','Siebzig','Achtzig','Neunzig'];
      const u = n % 10;
      const t = Math.floor(n / 10);
      return u > 0 ? map[u] + 'und' + tens[t].toLowerCase() : tens[t];
    }
    if (n === 100) return 'Hundert';
    if (n < 200) return 'Hundert' + (n - 100 > 0 ? numToDE(n - 100).toLowerCase() : '');
    return String(n);
  }

  function speakScore(scored, remaining) {
    let text = numToDE(scored) + ' Punkte. ';
    if (remaining === 0) {
      text = 'Gewonnen! Doppel raus!';
    } else {
      text += numToDE(remaining) + ' verbleiben.';
    }
    window.SB_speak(text, true);
  }

  function speakBust() {
    window.SB_speak('Überworfen!', true);
  }

  // ── State ─────────────────────────────────────────
  let state = {};

  function initState(cfg) {
    state = {
      variant:   cfg.variant,   // 301 | 501 | 701
      players:   cfg.players,   // [{name, score, darts, turns, dartsThrown}]
      currentP:  0,
      turnDarts: [],             // [{value, label}]  max 3
      inputMode: cfg.inputMode, // 'kbd-single' | 'kbd-sum' | 'voice-single' | 'voice-sum'
      inDoubleOut: cfg.inDoubleOut,
      bust:      false,
    };
  }

  function currentPlayer() { return state.players[state.currentP]; }

  // ── Entry logic ───────────────────────────────────
  function submitDart(value) {
    if (state.bust) return;
    if (state.turnDarts.length >= 3) return;

    const p = currentPlayer();
    const label = String(value);
    state.turnDarts.push({ value, label });

    // Auto-confirm in single-dart mode after 3 darts
    if (state.inputMode === 'kbd-single' || state.inputMode === 'voice-single') {
      if (state.turnDarts.length === 3) {
        confirmTurn();
      } else {
        renderGame();
      }
    } else {
      renderGame();
    }
  }

  function confirmTurn() {
    const p = currentPlayer();
    const sum = state.turnDarts.reduce((a, d) => a + d.value, 0);
    const newScore = p.score - sum;

    if (newScore < 0 || newScore === 1 || (state.inDoubleOut && newScore === 0 && !endsOnDouble())) {
      // Bust
      state.bust = true;
      speakBust();
      p.dartsThrown += state.turnDarts.length;
      renderGame();
      setTimeout(() => {
        state.bust = false;
        state.turnDarts = [];
        nextPlayer();
      }, 1400);
      return;
    }

    p.score = newScore;
    p.dartsThrown += state.turnDarts.length;
    p.turns++;
    updateAvg(p);

    if (newScore === 0) {
      // Win
      const darts = p.dartsThrown;
      speakScore(sum, 0);
      setTimeout(() => renderWin(p, darts), 600);
      return;
    }

    speakScore(sum, newScore);
    state.turnDarts = [];
    nextPlayer();
  }

  function endsOnDouble() {
    // For sum mode we don't track per-dart, so allow
    if (state.inputMode === 'kbd-sum' || state.inputMode === 'voice-sum') return true;
    // Check last dart label
    const last = state.turnDarts[state.turnDarts.length - 1];
    return last && last.label.startsWith('D');
  }

  function updateAvg(p) {
    if (p.dartsThrown === 0) return;
    const thrown = p.dartsThrown;
    const orig   = state.variant;
    const scored = orig - p.score;
    p.avg = ((scored / thrown) * 3).toFixed(1);
  }

  function undoLast() {
    if (state.turnDarts.length === 0) return;
    state.turnDarts.pop();
    renderGame();
  }

  function nextPlayer() {
    state.currentP = (state.currentP + 1) % state.players.length;
    renderGame();
  }

  function addPlayer(cfg) {
    state.players.push(makePlayer(cfg.name, cfg.variant));
  }

  function makePlayer(name, startScore) {
    return { name, score: startScore, dartsThrown: 0, turns: 0, avg: '0.0' };
  }

  // ── Speech Recognition ────────────────────────────
  let recognition = null;
  let listeningActive = false;

  function startVoice() {
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SR) { window.SB_toast('Spracheingabe nicht unterstützt'); return; }

    recognition = new SR();
    recognition.lang = 'de-DE';
    recognition.interimResults = false;
    recognition.maxAlternatives = 3;

    recognition.onresult = (e) => {
      const transcript = e.results[0][0].transcript.trim().replace(/[.,!?]/g,'');
      const num = parseGermanNumber(transcript);
      if (num !== null && num >= 0 && num <= 180) {
        handleVoiceInput(num);
      } else {
        window.SB_toast(`Nicht erkannt: "${transcript}"`);
      }
    };

    recognition.onerror = (e) => {
      listeningActive = false;
      if (e.error !== 'no-speech') window.SB_toast('Fehler: ' + e.error);
      updateVoiceBtn(false);
    };

    recognition.onend = () => {
      listeningActive = false;
      updateVoiceBtn(false);
    };

    listeningActive = true;
    updateVoiceBtn(true);
    recognition.start();
  }

  function stopVoice() {
    if (recognition) recognition.stop();
    listeningActive = false;
    updateVoiceBtn(false);
  }

  function handleVoiceInput(num) {
    if (state.inputMode === 'voice-sum') {
      // Treat as complete turn sum
      state.turnDarts = [{ value: num, label: String(num) }];
      confirmTurn();
    } else {
      submitDart(num);
    }
  }

  function parseGermanNumber(text) {
    const deMap = {
      'null':0,'eins':1,'ein':1,'zwei':2,'zwo':2,'drei':3,'vier':4,'fünf':5,
      'sechs':6,'sieben':7,'acht':8,'neun':9,'zehn':10,'elf':11,'zwölf':12,
      'dreizehn':13,'vierzehn':14,'fünfzehn':15,'sechzehn':16,'siebzehn':17,
      'achtzehn':18,'neunzehn':19,'zwanzig':20,
      'einundzwanzig':21,'zweiundzwanzig':22,'dreiundzwanzig':23,'vierundzwanzig':24,
      'fünfundzwanzig':25,'sechsundzwanzig':26,'siebenundzwanzig':27,'achtundzwanzig':28,
      'neunundzwanzig':29,'dreißig':30,'einunddreißig':31,'zweiunddreißig':32,
      'dreiunddreißig':33,'vierunddreißig':34,'fünfunddreißig':35,'sechsunddreißig':36,
      'siebenunddreißig':37,'achtunddreißig':38,'neununddreißig':39,'vierzig':40,
      'einundvierzig':41,'zweiundvierzig':42,'dreiundvierzig':43,'vierundvierzig':44,
      'fünfundvierzig':45,'sechsundvierzig':46,'siebenundvierzig':47,'achtundvierzig':48,
      'neunundvierzig':49,'fünfzig':50,'einundfünfzig':51,'zweiundfünfzig':52,
      'dreiundfünfzig':53,'vierundfünfzig':54,'fünfundfünfzig':55,'sechsundfünfzig':56,
      'siebenundfünfzig':57,'achtundfünfzig':58,'neunundfünfzig':59,'sechzig':60,
      'einundsechzig':61,'zweiundsechzig':62,'dreiundsechzig':63,'vierundsechzig':64,
      'fünfundsechzig':65,'sechsundsechzig':66,'siebenundsechzig':67,'achtundsechzig':68,
      'neunundsechzig':69,'siebzig':70,'einundsiebzig':71,'zweiundsiebzig':72,
      'dreiundsiebzig':73,'vierundsiebzig':74,'fünfundsiebzig':75,'sechsundsiebzig':76,
      'siebenundsiebzig':77,'achtundsiebzig':78,'neunundsiebzig':79,'achtzig':80,
      'einundachtzig':81,'zweiundachtzig':82,'dreiundachtzig':83,'vierundachtzig':84,
      'fünfundachtzig':85,'sechsundachtzig':86,'siebenundachtzig':87,'achtundachtzig':88,
      'neunundachtzig':89,'neunzig':90,'einundneunzig':91,'zweiundneunzig':92,
      'dreiundneunzig':93,'vierundneunzig':94,'fünfundneunzig':95,'sechsundneunzig':96,
      'siebenundneunzig':97,'achtundneunzig':98,'neunundneunzig':99,'hundert':100,
      'hunderteins':101,'hundertzwei':102,'hundertdrei':103,'hundertvier':104,
      'hundertfünf':105,'hundertsechs':106,'hundertsieben':107,'hundertacht':108,
      'hundertneun':109,'hundertzehn':110,'hundertelf':111,'hundertzwölf':112,
      'hundertdreizehn':113,'hundertvierzehn':114,'hundertfünfzehn':115,
      'hundertsechzehn':116,'hundertsiebzehn':117,'hundertachtzehn':118,
      'hundertneunzehn':119,'hundertzwanzig':120,'hunderteinundzwanzig':121,
      'hundertzweiundzwanzig':122,'hundertdreiundzwanzig':123,'hundertvierundzwanzig':124,
      'hundertfünfundzwanzig':125,'hundertsechsundzwanzig':126,'hundertsiebenundzwanzig':127,
      'hundertachtundzwanzig':128,'hundertneunundzwanzig':129,'hundertdreißig':130,
      'hunderteinunddreißig':131,'hundertzweiunddreißig':132,'hundertdreiunddreißig':133,
      'hundertvierunddreißig':134,'hundertfünfunddreißig':135,'hundertsechsunddreißig':136,
      'hundertsiebenunddreißig':137,'hundertachtunddreißig':138,'hundertneununddreißig':139,
      'hundertvierzig':140,'hunderteinundvierzig':141,'hundertzweiundvierzig':142,
      'hundertdreiundvierzig':143,'hundertvierundvierzig':144,'hundertfünfundvierzig':145,
      'hundertsechsundvierzig':146,'hundertsiebenundvierzig':147,'hundertachtundvierzig':148,
      'hundertneunundvierzig':149,'hundertfünfzig':150,'hunderteinundfünfzig':151,
      'hundertzweiundfünfzig':152,'hundertdreiundfünfzig':153,'hundertvierundfünfzig':154,
      'hundertfünfundfünfzig':155,'hundertsechsundfünfzig':156,'hundertsiebenundfünfzig':157,
      'hundertachtundfünfzig':158,'hundertneunundfünfzig':159,'hundertsechzig':160,
      'hunderteinundsechzig':161,'hundertzweiundsechzig':162,'hundertdreiundsechzig':163,
      'hundertvierundsechzig':164,'hundertfünfundsechzig':165,'hundertsechsundsechzig':166,
      'hundertsiebenundsechzig':167,'hundertachtundsechzig':168,'hundertneunundsechzig':169,
      'hundertsiebzig':170,'einhundert':100,'einhundertachtzig':180,'hundertachtzig':180,
    };
    const lower = text.toLowerCase().trim();
    if (deMap[lower] !== undefined) return deMap[lower];
    const parsed = parseInt(text, 10);
    return isNaN(parsed) ? null : parsed;
  }

  // ── Render: Setup ─────────────────────────────────
  function renderSetup(container) {
    container.innerHTML = `
    <div class="x01-setup">
      <h2>X<span>01</span> Setup</h2>

      <div class="setup-group">
        <label>Variante</label>
        <div class="setup-chips" id="variant-chips">
          <button class="chip" data-v="301">301</button>
          <button class="chip active" data-v="501">501</button>
          <button class="chip" data-v="701">701</button>
        </div>
      </div>

      <div class="setup-group">
        <label>Spieler</label>
        <div class="setup-chips" id="player-chips">
          <button class="chip active" data-p="1">1</button>
          <button class="chip" data-p="2">2</button>
          <button class="chip" data-p="3">3</button>
          <button class="chip" data-p="4">4</button>
        </div>
      </div>

      <div class="setup-group">
        <label>Checkout</label>
        <div class="setup-chips" id="checkout-chips">
          <button class="chip active" data-c="double">Doppel Out</button>
          <button class="chip" data-c="single">Single Out</button>
        </div>
      </div>

      <div class="setup-group">
        <label>Eingabemodus</label>
        <div class="input-toggle-grid" id="input-chips">
          <button class="input-chip active" data-i="kbd-single">
            <span class="ic-icon">⌨️</span>Tastatur<br>Einzeldarts
          </button>
          <button class="input-chip" data-i="kbd-sum">
            <span class="ic-icon">🔢</span>Tastatur<br>Summe
          </button>
          <button class="input-chip" data-i="voice-single">
            <span class="ic-icon">🎤</span>Sprache<br>Einzeldarts
          </button>
          <button class="input-chip" data-i="voice-sum">
            <span class="ic-icon">🗣️</span>Sprache<br>Summe
          </button>
        </div>
      </div>

      <button class="btn-start" id="btn-start">SPIEL STARTEN</button>
    </div>`;

    let selVariant = 501, selPlayers = 1, selCheckout = 'double', selInput = 'kbd-single';

    function bindChips(groupId, cb) {
      container.querySelector('#' + groupId).addEventListener('click', e => {
        const btn = e.target.closest('.chip, .input-chip');
        if (!btn) return;
        [...e.currentTarget.children].forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        cb(btn);
      });
    }

    bindChips('variant-chips',  btn => selVariant   = +btn.dataset.v);
    bindChips('player-chips',   btn => selPlayers   = +btn.dataset.p);
    bindChips('checkout-chips', btn => selCheckout  = btn.dataset.c);
    bindChips('input-chips',    btn => selInput     = btn.dataset.i);

    container.querySelector('#btn-start').addEventListener('click', () => {
      const players = Array.from({ length: selPlayers }, (_, i) =>
        makePlayer(`Spieler ${i + 1}`, selVariant)
      );
      initState({
        variant: selVariant,
        players,
        inputMode: selInput,
        inDoubleOut: selCheckout === 'double',
      });
      renderGame();
    });
  }

  // ── Render: Game ─────────────────────────────────
  function renderGame() {
    const cont = window.__x01Container;
    if (!cont) return;

    const isVoice = state.inputMode.startsWith('voice');
    const isSum   = state.inputMode.endsWith('sum');
    const p       = currentPlayer();
    const sum     = state.turnDarts.reduce((a, d) => a + d.value, 0);
    const preview = state.turnDarts.length > 0 ? sum : '';
    const checkoutKey = p.score - sum;
    const hint    = CHECKOUTS[checkoutKey] ? 'Checkout: ' + CHECKOUTS[checkoutKey].join(' → ') : '';

    // Build dart slots
    const slotsHTML = isSum
      ? `<div class="dart-slot ${state.turnDarts.length > 0 ? (state.bust ? 'bust' : 'filled') : ''}">
           ${state.turnDarts.length > 0 ? sum : '–'}
         </div>`
      : [0,1,2].map(i => {
          const d = state.turnDarts[i];
          const cls = d ? (state.bust ? 'bust' : 'filled') : '';
          return `<div class="dart-slot ${cls}">${d ? d.label : '–'}</div>`;
        }).join('');

    // Scoreboard
    const scoreboardHTML = state.players.map((pl, idx) => `
      <div class="x01-player-col ${idx === state.currentP ? 'active-player' : ''}">
        <div class="x01-player-name">${pl.name}</div>
        <div class="x01-player-score">${pl.score}</div>
        <div class="x01-player-avg">⌀ ${pl.avg}</div>
      </div>
    `).join('');

    // Input area
    let inputHTML = '';
    if (isVoice) {
      inputHTML = `
        <div class="x01-voice-area">
          <div class="x01-score-display ${state.bust ? 'bust-flash' : ''}">${state.bust ? 'ÜBERWORFEN' : (preview !== '' ? preview : '')}</div>
          <div class="x01-checkout-hint">${hint}</div>
          <button class="btn-voice ${listeningActive ? 'listening' : ''}" id="btn-voice">🎤</button>
          <div class="voice-status">${listeningActive ? 'Höre zu…' : 'Tippen zum Sprechen'}</div>
        </div>`;
    } else {
      // Numpad
      const nums = ['1','2','3','4','5','6','7','8','9','⌫','0','✓'];
      const numpadHTML = nums.map(k => {
        if (k === '⌫') return `<button class="np-btn np-action" data-k="back">${k}</button>`;
        if (k === '✓') return `<button class="np-btn np-enter" data-k="enter">${k}</button>`;
        return `<button class="np-btn" data-k="${k}">${k}</button>`;
      }).join('');

      inputHTML = `
        <div class="x01-score-display ${state.bust ? 'bust-flash' : ''}">${state.bust ? 'ÜBERWORFEN' : (preview !== '' ? preview : '')}</div>
        <div class="x01-checkout-hint">${hint}</div>
        <div class="x01-numpad" id="numpad">${numpadHTML}</div>`;
    }

    // Input mode toggle
    const modeToggleHTML = `
      <div class="x01-input-toggle">
        ${[['kbd-single','⌨️ Einzeln'],['kbd-sum','🔢 Summe'],['voice-single','🎤 Einzeln'],['voice-sum','🗣️ Summe']].map(([id,lbl]) =>
          `<button class="itgl-btn ${state.inputMode === id ? 'active' : ''}" data-im="${id}">${lbl}</button>`
        ).join('')}
      </div>`;

    cont.innerHTML = `
    <div class="x01-game">
      <div class="x01-scoreboard">
        <div class="x01-players">${scoreboardHTML}</div>
      </div>

      <div class="x01-turn-info">
        <div class="x01-turn-darts">${slotsHTML}</div>
        <div class="x01-turn-label">${p.name} ist dran</div>
      </div>

      <div class="x01-input-area">
        ${modeToggleHTML}
        ${inputHTML}
      </div>

      <div class="x01-controls">
        <button class="ctrl-btn" id="btn-undo">↩ Rückgängig</button>
        <button class="ctrl-btn danger" id="btn-new">✕ Neu</button>
      </div>
    </div>`;

    // Bind numpad
    if (!isVoice) {
      let kbdBuffer = '';
      cont.querySelector('#numpad').addEventListener('click', e => {
        const k = e.target.closest('.np-btn')?.dataset.k;
        if (!k) return;
        if (k === 'back') {
          if (kbdBuffer.length > 0) {
            kbdBuffer = kbdBuffer.slice(0, -1);
          } else {
            undoLast();
            return;
          }
          updateDisplay();
          return;
        }
        if (k === 'enter') {
          const val = parseInt(kbdBuffer || '0', 10);
          kbdBuffer = '';
          if (isSum) {
            if (val >= 0 && val <= 180) {
              state.turnDarts = [{ value: val, label: String(val) }];
              confirmTurn();
            }
          } else {
            if (val >= 0 && val <= 60) submitDart(val);
          }
          return;
        }
        // digit
        const candidate = kbdBuffer + k;
        const num = parseInt(candidate, 10);
        const max = isSum ? 180 : 60;
        if (num <= max) kbdBuffer = candidate;
        else kbdBuffer = k; // reset to new digit if over max
        updateDisplay();

        // Auto-submit for single-dart mode on 3 digits or obvious max
        if (!isSum && kbdBuffer.length === 2) {
          const n = parseInt(kbdBuffer, 10);
          if (n > 6) { submitDart(n); kbdBuffer = ''; }
        }
      });

      function updateDisplay() {
        const disp = cont.querySelector('.x01-score-display');
        if (disp) disp.textContent = kbdBuffer || (preview !== '' ? preview : '');
      }
    }

    // Bind voice button
    if (isVoice) {
      cont.querySelector('#btn-voice').addEventListener('click', () => {
        if (listeningActive) stopVoice();
        else startVoice();
      });
    }

    // Input mode toggle
    cont.querySelector('.x01-input-toggle').addEventListener('click', e => {
      const btn = e.target.closest('.itgl-btn');
      if (!btn) return;
      if (listeningActive) stopVoice();
      state.inputMode = btn.dataset.im;
      state.turnDarts = [];
      renderGame();
    });

    // Controls
    cont.querySelector('#btn-undo').addEventListener('click', () => {
      if (listeningActive) stopVoice();
      undoLast();
    });
    cont.querySelector('#btn-new').addEventListener('click', () => {
      if (confirm('Neues Spiel starten?')) {
        if (listeningActive) stopVoice();
        renderSetup(cont);
      }
    });
  }

  // ── Render: Win ──────────────────────────────────
  function renderWin(player, darts) {
    const cont = window.__x01Container;
    if (!cont) return;
    const avg = darts > 0 ? ((state.variant / darts) * 3).toFixed(1) : '—';

    cont.innerHTML = `
    <div class="x01-win">
      <div class="win-trophy">🏆</div>
      <div class="win-title">GEWONNEN!</div>
      <div class="win-name">${player.name}</div>
      <div class="win-stats">
        <div class="win-stat-row"><span>Variante</span><span>${state.variant}</span></div>
        <div class="win-stat-row"><span>Darts geworfen</span><span>${darts}</span></div>
        <div class="win-stat-row"><span>3-Dart-Average</span><span>${avg}</span></div>
      </div>
      <button class="btn-new-game" id="btn-new-game">NEUES SPIEL</button>
    </div>`;

    window.SB_speak(`${player.name} hat gewonnen!`, true);

    cont.querySelector('#btn-new-game').addEventListener('click', () => {
      renderSetup(cont);
    });
  }

  // ── Mount / Cleanup ───────────────────────────────
  window.__mountMode = function (container) {
    window.__x01Container = container;
    listeningActive = false;
    recognition = null;
    renderSetup(container);
  };

  window.__modeCleanup = function () {
    if (listeningActive && recognition) recognition.stop();
    listeningActive = false;
    window.__x01Container = null;
  };

})();
