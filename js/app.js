/* ==========================================================================
   Assistant Coach — Interface
   Vues : Générer · Cartothèque · Mes séances
   Calques : carte (modale), sélecteur, éditeur de carte, mode terrain
   ========================================================================== */
(function () {
  'use strict';

  const esc = AC.esc;
  const icon = AC.icon;
  const Gen = AC.Gen;
  const clone = (o) => JSON.parse(JSON.stringify(o));

  /* ------------------------------------------------------------------
     État
     ------------------------------------------------------------------ */
  function loadParams() {
    const d = Gen.defaultParams();
    const p = AC.store.get('params', null);
    if (!p) return d;
    /* Les anciens axes (ex. « tactique ») n'existent plus : on ne garde que les objectifs connus */
    if (Array.isArray(p.goals)) p.goals = p.goals.filter((k) => AC.COUPS[k] || AC.AXES[k]);
    return Object.assign(d, p, {
      equipment: Object.assign(d.equipment, p.equipment || {}),
      counts: Object.assign(d.counts, p.counts || {})
    });
  }

  function validSession(s) {
    if (!s || !Array.isArray(s.blocks)) return null;
    s.blocks = s.blocks.filter((b) => AC.DB.get(b.cardId));
    if (s.focusId && !AC.DB.get(s.focusId)) s.focusId = null;
    return s;
  }

  const state = {
    view: AC.store.get('view', 'generate'),
    params: loadParams(),
    session: validSession(AC.store.get('current', null)),
    saved: AC.store.get('sessions', []),
    lib: { mode: 'types', axis: '', axisScroll: 0, sheetOpen: false, theme: 'all', q: '', coups: [], axes: [], space: '', source: '', format: '', filtersOpen: false },
    modal: null,
    terrain: null,
    settingsOpen: !AC.store.get('current', null),
    deal: false,
    flash: null,
    dark: AC.store.get('dark', null)
  };

  function persist() {
    AC.store.set('params', state.params);
    AC.store.set('current', state.session);
    AC.store.set('view', state.view);
  }

  /* ------------------------------------------------------------------
     Coquille
     ------------------------------------------------------------------ */
  const root = document.getElementById('app');

  function brandMark() {
    return '<span class="brand-mark" aria-hidden="true">' +
      '<i style="--c:#21A47B"></i><i style="--c:#F5C928"></i><i style="--c:#E4243B"></i></span>';
  }

  function renderShell() {
    root.innerHTML =
      '<header class="topbar">' +
        '<div class="brand">' + brandMark() + '<span class="brand-name">Assistant <b>Coach</b></span></div>' +
        '<nav class="tabs" id="tabs"></nav>' +
        '<button class="icon-btn theme-toggle" data-action="toggle-dark" title="Thème clair / sombre">' + icon('moon') + '</button>' +
      '</header>' +
      '<main id="view" class="view"></main>' +
      '<div id="modal-root"></div>' +
      '<div id="terrain-root"></div>' +
      '<div id="confirm-root"></div>' +
      '<div id="toast-root" class="toasts" aria-live="polite"></div>' +
      '<div id="print-root"></div>';
  }

  function renderTabs() {
    const tabs = [
      ['generate', 'dice', 'Générer'],
      ['library', 'cards', 'Cartothèque'],
      ['sessions', 'folder', 'Mes séances']
    ];
    document.getElementById('tabs').innerHTML = tabs.map(([id, ic, label]) =>
      '<button class="tab ' + (state.view === id ? 'is-active' : '') + '" data-action="nav" data-view="' + id + '">' +
        icon(ic) + '<span>' + label + '</span>' +
        (id === 'sessions' && state.saved.length ? '<em class="tab-count">' + state.saved.length + '</em>' : '') +
      '</button>').join('');
  }

  function applyDark() {
    const el = document.documentElement;
    if (state.dark === true) el.setAttribute('data-theme', 'dark');
    else if (state.dark === false) el.setAttribute('data-theme', 'light');
    else el.removeAttribute('data-theme');
    const isDark = state.dark === true || (state.dark == null && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches);
    const btn = document.querySelector('.theme-toggle');
    if (btn) btn.innerHTML = icon(isDark ? 'sun' : 'moon');
  }

  /* ------------------------------------------------------------------
     Défilement : chaque re-rendu remplace le HTML, on garde donc la position
     des zones qui défilent (marquées data-scroll) et celle de la page.
     ------------------------------------------------------------------ */
  const reduceMotion = () => window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const smooth = () => (reduceMotion() ? 'auto' : 'smooth');
  const isMobile = () => window.matchMedia('(max-width: 960px)').matches;

  function keepScroll(container, fn) {
    const saved = {};
    container.querySelectorAll('[data-scroll]').forEach((el) => { saved[el.dataset.scroll] = [el.scrollLeft, el.scrollTop]; });
    fn();
    container.querySelectorAll('[data-scroll]').forEach((el) => {
      const s = saved[el.dataset.scroll];
      if (s) { el.scrollLeft = s[0]; el.scrollTop = s[1]; }
    });
  }

  /* Rend visible l'onglet de thème actif dans une barre qui défile horizontalement */
  function revealActiveTab(container) {
    container.querySelectorAll('.ttabs').forEach((bar) => {
      const on = bar.querySelector('.ttab.is-on');
      if (!on) return;
      const b = bar.getBoundingClientRect();
      const r = on.getBoundingClientRect();
      if (r.left < b.left) bar.scrollLeft -= b.left - r.left + 24;
      else if (r.right > b.right) bar.scrollLeft += r.right - b.right + 24;
    });
  }

  /* Amène une situation dans l'écran (après ajout, déplacement, remplacement) */
  function revealBlock(uid) {
    const node = document.getElementById('blk-' + uid);
    if (!node) return;
    /* Position calculée sans la transformation de l'animation « flash » (qui écrase la carte) */
    let top = 0;
    for (let n = node; n; n = n.offsetParent) top += n.offsetTop;
    const cs = getComputedStyle(node);
    const mt = parseFloat(cs.scrollMarginTop) || 0;
    const mb = parseFloat(cs.scrollMarginBottom) || 0;
    const y = window.scrollY;
    let target = null;
    if (top - mt < y) target = top - mt;
    else if (top + node.offsetHeight + mb > y + window.innerHeight) target = top + node.offsetHeight + mb - window.innerHeight;
    if (target !== null) window.scrollTo({ top: Math.max(0, target), behavior: smooth() });
  }

  function render() {
    renderTabs();
    const v = document.getElementById('view');
    const y = window.scrollY;
    v.className = 'view view--' + state.view;
    keepScroll(v, () => {
      if (state.view === 'library') v.innerHTML = viewLibrary();
      else if (state.view === 'sessions') v.innerHTML = viewSessions();
      else v.innerHTML = viewGenerate();
    });
    if (window.scrollY !== y) window.scrollTo(0, y);
    revealActiveTab(v);
    const flash = state.flash;
    state.deal = false;
    state.flash = null;
    if (flash) revealBlock(flash);
  }

  /* ------------------------------------------------------------------
     Navigation : onglets, historique du navigateur (bouton retour)
     ------------------------------------------------------------------ */
  const viewScroll = {};
  let skipPop = false;
  /* C'est l'appli qui gère le défilement : sinon, fermer une fenêtre (retour dans l'historique)
     ferait revenir la page là où elle était à l'ouverture */
  try { if ('scrollRestoration' in history) history.scrollRestoration = 'manual'; } catch (e) { /* ignore */ }

  function histSet(push, data) {
    try {
      const st = Object.assign({ ac: 1, view: state.view }, data || {});
      /* Fiche d'un thème de travail ouverte : « retour » doit ramener au sommaire des thèmes */
      if (state.view === 'library' && state.lib.mode === 'themes' && state.lib.axis) st.axis = state.lib.axis;
      if (push) history.pushState(st, ''); else history.replaceState(st, '');
    } catch (e) { /* historique indisponible (aperçu, file://) : on ignore */ }
  }
  const onOverlayEntry = () => !!(history.state && history.state.ac && history.state.overlay);

  /* Une modale ou le mode terrain s'ouvre : une entrée d'historique, pour que « retour » la ferme */
  function overlayOpened() {
    if (!onOverlayEntry()) histSet(true, { overlay: true });
  }
  /* Fermée depuis l'interface : on retire cette entrée */
  function overlayClosed() {
    if (!onOverlayEntry()) return;
    skipPop = true;
    try { history.back(); } catch (e) { skipPop = false; }
  }

  /* Change de vue en gardant la position de défilement de chacune */
  function go(view, fromHistory) {
    if (view !== state.view) viewScroll[state.view] = window.scrollY;
    state.view = view;
    persist();
    render();
    window.scrollTo(0, viewScroll[view] || 0);
    if (!fromHistory) histSet(true);
  }

  window.addEventListener('popstate', (e) => {
    if (skipPop) { skipPop = false; histSet(false); return; }
    if (state.confirm) {
      /* « Retour » pendant une question : on la referme sans rien décider */
      closeConfirm(false);
      if (state.modal || state.terrain) { histSet(true, { overlay: true }); return; }
    }
    if (state.terrain) { closeTerrain(true); return; }
    if (state.modal) {
      /* Carte en cours de saisie : on reste sur la fenêtre et on pose la question */
      if (editorDirty()) { histSet(true, { overlay: true }); requestCloseModal(); return; }
      closeModal(true);
      return;
    }
    const v = e.state && e.state.ac && e.state.view;
    if (e.state && e.state.overlay) histSet(false);
    if (v && v !== state.view) go(v, true);
    if (state.view === 'library' && e.state && e.state.ac) {
      const ax = e.state.axis || '';
      if (ax !== state.lib.axis && (ax ? !!AC.AXE_INFO[ax] : true)) {
        if (state.lib.mode === 'themes') showAxis(ax); else state.lib.axis = ax;
      }
    }
  });

  /* Cartothèque par thème : ouvre la fiche d'un thème, ou revient au sommaire là où on l'avait quitté */
  function showAxis(k) {
    if (k && !state.lib.axis) state.lib.axisScroll = window.scrollY;
    state.lib.axis = k;
    render();
    window.scrollTo(0, k ? 0 : (state.lib.axisScroll || 0));
  }

  /* ------------------------------------------------------------------
     Vue : Générer
     ------------------------------------------------------------------ */
  function stepper(action, value, extra, min, max, suffix) {
    return '<div class="stepper">' +
      '<button class="step-btn" data-action="' + action + '" data-dir="-1" ' + extra + (value <= min ? ' disabled' : '') + ' aria-label="Moins">' + icon('minus') + '</button>' +
      '<span class="step-val"><b>' + value + '</b>' + (suffix ? ' ' + suffix : '') + '</span>' +
      '<button class="step-btn" data-action="' + action + '" data-dir="1" ' + extra + (value >= max ? ' disabled' : '') + ' aria-label="Plus">' + icon('plus') + '</button>' +
    '</div>';
  }

  function settingsPanel() {
    const p = state.params;
    const durations = AC.DURATIONS.map((d) =>
      '<button class="seg-btn ' + (p.duration === d ? 'is-on' : '') + '" data-action="set-duration" data-value="' + d + '">' + d + '</button>').join('');

    const presets = AC.PRESETS.map((pr) =>
      '<button class="preset ' + (p.preset === pr.id ? 'is-on' : '') + '" data-action="set-preset" data-id="' + pr.id + '">' +
        '<b>' + esc(pr.label) + '</b><small>' + esc(pr.hint) + '</small></button>').join('');

    const themeRows = AC.THEME_ORDER.map((t) => {
      const th = AC.THEMES[t];
      const avail = AC.DB.byTheme(t).length;
      const n = p.counts[t] || 0;
      return '<div class="trow ' + (n ? '' : 'is-off') + '" style="' + AC.themeVars(t) + '">' +
        '<span class="trow-chip">' + icon(th.icon) + '</span>' +
        '<span class="trow-label"><b>' + esc(th.label) + '</b><small>' + (avail ? avail + ' carte' + (avail > 1 ? 's' : '') : 'aucune carte pour l’instant') + '</small></span>' +
        stepper('set-count', n, 'data-theme="' + t + '"', 0, 4) +
      '</div>';
    }).join('');

    const focusRow = '<label class="trow trow--focus ' + (p.focus ? '' : 'is-off') + '" style="' + AC.themeVars('focus') + '">' +
      '<span class="trow-chip">' + icon('brain') + '</span>' +
      '<span class="trow-label"><b>Carte Focus</b><small>Une intention mentale pour la séance</small></span>' +
      '<input type="checkbox" class="switch" data-input="focus" ' + (p.focus ? 'checked' : '') + '>' +
    '</label>';

    const goalChips = (dict) => Object.keys(dict).map((k) =>
      '<button class="chip ' + (p.goals.indexOf(k) !== -1 ? 'is-on' : '') + '" data-action="toggle-goal" data-key="' + k + '">' + esc(dict[k]) + '</button>').join('');

    const eq = ['plots', 'lignes', 'chrono'].map((k) =>
      '<label class="eq-toggle ' + (p.equipment[k] ? 'is-on' : '') + '">' + icon(AC.EQUIPMENT[k].icon) +
        '<span>' + AC.EQUIPMENT[k].label + '</span>' +
        '<input type="checkbox" class="switch switch--sm" data-input="equipment" data-key="' + k + '" ' + (p.equipment[k] ? 'checked' : '') + '></label>').join('');

    const totalCards = AC.THEME_ORDER.reduce((a, t) => a + (p.counts[t] || 0), 0);

    return '<aside class="panel settings ' + (state.settingsOpen ? 'is-open' : '') + '">' +
      '<button class="panel-head" data-action="toggle-settings">' +
        '<span><b>Réglages</b><small>' + p.duration + ' min · ' + p.players + ' joueur' + (p.players > 1 ? 's' : '') + (p.format === 'double' ? ' · double' : '') + ' · ' + totalCards + ' cartes</small></span>' +
        icon('down', 'chev') +
      '</button>' +
      '<div class="panel-body" data-scroll="settings">' +
        '<section class="field">' +
          '<h3 class="field-title">Durée <span class="field-val">' + p.duration + ' min</span></h3>' +
          '<div class="seg">' + durations + '</div>' +
          '<div class="field-inline"><span>Ajuster</span>' + stepper('nudge-duration', p.duration, '', 20, 180, 'min') + '</div>' +
        '</section>' +
        '<section class="field">' +
          '<h3 class="field-title">Joueurs et format</h3>' +
          '<div class="field-inline">' + icon('users') + '<span>Sur le terrain</span>' + stepper('set-players', p.players, '', 1, 12) + '</div>' +
          '<div class="seg seg--2">' +
            '<button class="seg-btn ' + (p.format !== 'double' ? 'is-on' : '') + '" data-action="set-format" data-value="simple">Simple</button>' +
            '<button class="seg-btn ' + (p.format === 'double' ? 'is-on' : '') + '" data-action="set-format" data-value="double">Double</button>' +
          '</div>' +
        '</section>' +
        '<section class="field">' +
          '<h3 class="field-title">Structure</h3>' +
          '<div class="presets">' + presets + '</div>' +
          '<div class="trows">' + themeRows + focusRow + '</div>' +
        '</section>' +
        '<section class="field">' +
          '<h3 class="field-title">Objectifs <small>facultatif</small></h3>' +
          '<p class="field-sub">Coups</p><div class="chips">' + goalChips(AC.COUPS) + '</div>' +
          AC.AXE_FAMILIES.map((f) => '<p class="field-sub" title="' + esc(f.hint) + '">' + esc(f.label) + '</p><div class="chips">' +
            f.axes.map((k) => '<button class="chip ' + (p.goals.indexOf(k) !== -1 ? 'is-on' : '') + '" data-action="toggle-goal" data-key="' + k + '" title="' + esc(AC.AXE_INFO[k].short) + '">' + esc(AC.AXES[k]) + '</button>').join('') + '</div>').join('') +
        '</section>' +
        '<section class="field">' +
          '<h3 class="field-title">Matériel disponible</h3>' +
          '<div class="eq-toggles">' + eq + '</div>' +
          '<p class="field-note">Balles et raquettes sont toujours comptées.</p>' +
        '</section>' +
      '</div>' +
      '<div class="panel-cta">' +
        '<button class="btn btn--primary btn--big" data-action="generate">' + icon('dice') +
          '<span>' + (state.session ? 'Nouveau tirage' : 'Tirer les cartes') + '</span></button>' +
        (state.session && state.session.blocks.some((b) => b.locked) ? '<p class="cta-note">' + icon('lock') + ' Les cartes verrouillées sont conservées</p>' : '') +
      '</div>' +
    '</aside>';
  }

  function emptyBoard() {
    const fan = ['echauffement', 'drill', 'mixte', 'ouvert'].map((t, i) =>
      '<span class="fan-card" style="' + AC.themeVars(t) + ';--i:' + i + '">' + icon(AC.THEMES[t].icon) + '</span>').join('');
    return '<div class="board-empty">' +
      '<div class="fan">' + fan + '</div>' +
      '<h2>Prêt pour la séance ?</h2>' +
      '<p>Choisis la durée, la structure et tes objectifs, puis tire tes cartes. Tu pourras ensuite verrouiller, remplacer, réordonner et ajuster chaque situation.</p>' +
      '<button class="btn btn--primary btn--big" data-action="generate">' + icon('dice') + '<span>Tirer les cartes</span></button>' +
      '<div class="legend">' + AC.THEME_ORDER.map((t) =>
        '<span class="legend-item" style="' + AC.themeVars(t) + '"><i>' + icon(AC.THEMES[t].icon) + '</i><span><b>' + esc(AC.THEMES[t].label) + '</b><small>' + esc(AC.THEMES[t].pitch) + '</small></span></span>').join('') +
      '</div>' +
    '</div>';
  }

  function timeline(s) {
    const total = Math.max(1, Gen.total(s));
    let t = 0;
    const segs = s.blocks.map((b) => {
      const c = AC.DB.get(b.cardId);
      const start = t; t += b.minutes;
      return '<button class="tl-seg" style="' + AC.themeVars(b.theme) + ';flex:' + b.minutes + '" data-action="scroll-block" data-uid="' + b.uid + '" title="' + esc(c.title) + ' · ' + b.minutes + ' min">' +
        '<span>' + (b.minutes / total > 0.08 ? b.minutes + '′' : '') + '</span></button>';
    }).join('');
    return '<div class="timeline">' + segs + '</div>' +
      '<div class="tl-scale"><span>0′</span><span>' + Math.round(total / 2) + '′</span><span>' + total + '′</span></div>';
  }

  function focusStrip(s) {
    const f = AC.DB.get(s.focusId);
    if (!f) {
      return '<button class="focus-add" style="' + AC.themeVars('focus') + '" data-action="focus-reroll">' + icon('brain') + '<span>Ajouter une carte Focus</span></button>';
    }
    return '<div class="focus-strip" style="' + AC.themeVars('focus') + '">' +
      '<span class="fs-icon">' + icon('brain') + '</span>' +
      '<button class="fs-main" data-action="open-card" data-id="' + f.id + '">' +
        '<small>Focus de la séance</small><b>' + esc(f.title) + '</b><span>' + esc(f.objective) + '</span>' +
      '</button>' +
      '<div class="fs-actions">' +
        '<button class="icon-btn ' + (s.focusLocked ? 'is-on' : '') + '" data-action="focus-lock" title="' + (s.focusLocked ? 'Déverrouiller' : 'Verrouiller') + '">' + icon(s.focusLocked ? 'lock' : 'unlock') + '</button>' +
        '<button class="icon-btn" data-action="focus-reroll" title="Tirer un autre Focus">' + icon('shuffle') + '</button>' +
        '<button class="icon-btn" data-action="focus-remove" title="Retirer">' + icon('close') + '</button>' +
      '</div>' +
    '</div>';
  }

  function blockRow(b, i, start, n) {
    const c = AC.DB.get(b.cardId);
    const tags = (c.coups || []).slice(0, 3).map((k) => '<span class="tag">' + esc(AC.COUPS[k]) + '</span>').join('') +
      (c.axes || []).slice(0, 2).map((k) => '<span class="tag tag--axe">' + esc(AC.AXES[k]) + '</span>').join('');
    const goalHit = Gen.goalMatch(c, state.session.params.goals);
    const cls = ['block', b.locked ? 'is-locked' : '', state.deal ? 'deal' : '', state.flash === b.uid ? 'flash' : ''].join(' ');
    return '<div class="' + cls + '" id="blk-' + b.uid + '" style="' + AC.themeVars(b.theme) + ';--d:' + (i * 70) + 'ms">' +
      '<button class="block-thumb" data-action="open-block" data-uid="' + b.uid + '" aria-label="Voir la carte">' + AC.UI.diagram(c) + '</button>' +
      '<button class="block-main" data-action="open-block" data-uid="' + b.uid + '">' +
        '<span class="block-kicker"><span class="block-idx">' + (i + 1) + '</span>' +
          '<span class="block-time">' + start + '′ → ' + (start + b.minutes) + '′</span>' +
          (goalHit ? '<span class="block-goal">' + icon('sparkle') + ' objectif</span>' : '') +
        '</span>' +
        '<span class="block-title">' + esc(c.title) + '</span>' +
        '<span class="block-obj">' + esc(c.objective) + '</span>' +
        '<span class="block-tags">' + tags + '</span>' +
      '</button>' +
      '<div class="block-side">' +
        '<div class="block-dur">' +
          '<button class="step-btn" data-action="dur" data-dir="-1" data-uid="' + b.uid + '" aria-label="Moins de temps">' + icon('minus') + '</button>' +
          '<span><b>' + b.minutes + '</b><small>min</small></span>' +
          '<button class="step-btn" data-action="dur" data-dir="1" data-uid="' + b.uid + '" aria-label="Plus de temps">' + icon('plus') + '</button>' +
        '</div>' +
        '<div class="block-actions">' +
          '<button class="icon-btn ' + (b.locked ? 'is-on' : '') + '" data-action="lock" data-uid="' + b.uid + '" title="' + (b.locked ? 'Déverrouiller' : 'Verrouiller (gardée au prochain tirage)') + '">' + icon(b.locked ? 'lock' : 'unlock') + '</button>' +
          '<button class="icon-btn" data-action="reroll" data-uid="' + b.uid + '" title="Tirer une autre carte du même thème" ' + (b.locked ? 'disabled' : '') + '>' + icon('shuffle') + '</button>' +
          '<button class="icon-btn" data-action="move" data-dir="-1" data-uid="' + b.uid + '" title="Monter" ' + (i === 0 ? 'disabled' : '') + '>' + icon('up') + '</button>' +
          '<button class="icon-btn" data-action="move" data-dir="1" data-uid="' + b.uid + '" title="Descendre" ' + (i === n - 1 ? 'disabled' : '') + '>' + icon('down') + '</button>' +
          '<button class="icon-btn icon-btn--danger" data-action="remove" data-uid="' + b.uid + '" title="Retirer">' + icon('trash') + '</button>' +
        '</div>' +
      '</div>' +
    '</div>';
  }

  function missingSlot(theme, missing) {
    const th = AC.THEMES[theme];
    return '<div class="block block--missing" style="' + AC.themeVars(theme) + '">' +
      '<span class="missing-icon">' + icon(th.icon) + '</span>' +
      '<span class="missing-text"><b>' + missing + ' carte' + (missing > 1 ? 's' : '') + ' « ' + esc(th.label) + ' » demandée' + (missing > 1 ? 's' : '') + '</b>' +
      '<small>La base n’en contient pas encore assez. Crée la tienne ou génère-en de nouvelles.</small></span>' +
      '<button class="btn btn--ghost" data-action="new-card" data-theme="' + theme + '">' + icon('plus') + ' Créer</button>' +
    '</div>';
  }

  function blocksList(s) {
    let html = '';
    let t = 0;
    let lastTheme = null;
    const n = s.blocks.length;
    const groupMinutes = (from) => {
      let m = 0;
      for (let j = from; j < n && s.blocks[j].theme === s.blocks[from].theme; j++) m += s.blocks[j].minutes;
      return m;
    };
    s.blocks.forEach((b, i) => {
      if (b.theme !== lastTheme) {
        if (lastTheme) html += '</div>';
        const th = AC.THEMES[b.theme];
        html += '<div class="group" style="' + AC.themeVars(b.theme) + '">' +
          '<div class="group-head"><span class="group-chip">' + icon(th.icon) + esc(th.label) + '</span>' +
          '<span class="group-time">' + groupMinutes(i) + ' min</span>' +
          '<button class="link-btn" data-action="add-card" data-theme="' + b.theme + '">' + icon('plus') + ' Ajouter</button></div>';
        lastTheme = b.theme;
      }
      html += blockRow(b, i, t, n);
      t += b.minutes;
    });
    if (lastTheme) html += '</div>';

    /* Thèmes demandés mais introuvables dans la base */
    const counts = s.params.counts || {};
    AC.THEME_ORDER.forEach((theme) => {
      const have = s.blocks.filter((b) => b.theme === theme).length;
      const avail = AC.DB.byTheme(theme).length;
      const missing = Math.min((counts[theme] || 0) - have, (counts[theme] || 0) - avail);
      if (missing > 0 && have >= avail) html += missingSlot(theme, missing);
    });

    html += '<div class="add-row"><span>Ajouter une situation :</span>' + AC.THEME_ORDER.map((t2) =>
      '<button class="add-chip" style="' + AC.themeVars(t2) + '" data-action="add-card" data-theme="' + t2 + '">' + icon(AC.THEMES[t2].icon) + esc(AC.THEMES[t2].label) + '</button>').join('') + '</div>';
    return html;
  }

  function insightsPanel(s) {
    const items = Gen.insights(s);
    return '<section class="insights">' +
      '<h3>Bilan de la séance</h3>' +
      '<ul>' + items.map((it) =>
        '<li class="ins ins--' + it.type + '">' + icon(it.icon) + '<span>' + esc(it.text) + '</span>' +
        (it.action ? '<button class="link-btn" data-action="insight" data-id="' + it.action.id + '">' + esc(it.action.label) + '</button>' : '') + '</li>').join('') +
      '</ul>' +
      '<label class="notes"><span>Notes du coach</span><textarea data-input="notes" rows="3" placeholder="Consignes, joueurs, ressenti…">' + esc(s.notes || '') + '</textarea></label>' +
    '</section>';
  }

  function viewGenerate() {
    const s = state.session;
    let board;
    if (!s) {
      board = emptyBoard();
    } else {
      const total = Gen.total(s);
      board =
        '<div class="board-head">' +
          '<div class="board-title">' +
            '<input class="session-name" data-input="session-name" value="' + esc(s.name) + '" aria-label="Nom de la séance">' +
            '<div class="board-meta">' +
              '<span>' + icon('clock') + total + ' min</span>' +
              '<span>' + icon('users') + s.params.players + ' joueur' + (s.params.players > 1 ? 's' : '') + '</span>' +
              '<span>' + icon('cards') + s.blocks.length + ' carte' + (s.blocks.length > 1 ? 's' : '') + '</span>' +
              (s.savedAt ? '<span class="saved-pill">' + icon('check') + 'Enregistrée</span>' : '') +
            '</div>' +
          '</div>' +
          '<div class="board-actions">' +
            '<button class="btn btn--primary" data-action="terrain" ' + (s.blocks.length ? '' : 'disabled') + '>' + icon('play') + '<span>Mode terrain</span></button>' +
            '<button class="btn" data-action="save">' + icon('save') + '<span>Enregistrer</span></button>' +
            '<button class="icon-btn icon-btn--box" data-action="print" title="Imprimer">' + icon('print') + '</button>' +
            '<button class="icon-btn icon-btn--box" data-action="copy" title="Copier le texte de la séance">' + icon('copy') + '</button>' +
          '</div>' +
        '</div>' +
        (s.blocks.length ? timeline(s) : '') +
        focusStrip(s) +
        '<div class="blocks">' + blocksList(s) + '</div>' +
        insightsPanel(s);
    }
    return '<div class="gen">' + settingsPanel() + '<section class="board">' + board + '</section></div>';
  }

  /* ------------------------------------------------------------------
     Vue : Cartothèque
     ------------------------------------------------------------------ */
  function libraryList() {
    const L = state.lib;
    const q = L.q.trim().toLowerCase();
    return AC.DB.all().filter((c) => {
      if (L.mode === 'themes') { if (L.axis && (c.axes || []).indexOf(L.axis) === -1) return false; }
      else if (L.theme !== 'all' && c.theme !== L.theme) return false;
      if (L.coups.length && !L.coups.some((k) => (c.coups || []).indexOf(k) !== -1)) return false;
      if (L.mode !== 'themes' && L.axes.length && !L.axes.some((k) => (c.axes || []).indexOf(k) !== -1)) return false;
      if (L.space && c.space !== L.space) return false;
      if (L.source && (c.source || 'Création') !== L.source) return false;
      if (L.format === 'double' && c.format !== 'double') return false;
      if (L.format === 'simple' && c.format === 'double') return false;
      if (q) {
        /* La recherche couvre aussi les points clés, les variantes et l'origine (« jeu de jambes », « Genevois »…) */
        const hay = [c.title, c.original, c.objective, (c.steps || []).join(' '), c.tip,
          (c.keys || []).join(' '), (c.variants || []).join(' '), c.source, c.refs].join(' ').toLowerCase();
        if (hay.indexOf(q) === -1) return false;
      }
      return true;
    }).sort((a, b) => {
      const order = AC.THEME_ORDER.concat(['focus']);
      return order.indexOf(a.theme) - order.indexOf(b.theme);
    });
  }

  function viewLibrary() {
    const L = state.lib;
    const all = AC.DB.all();
    const themes = ['all'].concat(AC.THEME_ORDER, ['focus']);
    const tabs = themes.map((t) => {
      const th = t === 'all' ? null : AC.themeOf(t);
      const count = t === 'all' ? all.length : all.filter((c) => c.theme === t).length;
      return '<button class="ttab ' + (L.theme === t ? 'is-on' : '') + '" ' + (th ? 'style="' + AC.themeVars(t) + '"' : '') + ' data-action="lib-theme" data-theme="' + t + '">' +
        (th ? '<i>' + icon(th.icon) + '</i>' : '') + '<span>' + (th ? esc(th.plural) : 'Toutes') + '</span><em>' + count + '</em></button>';
    }).join('');

    const list = libraryList();
    const inSession = state.session ? state.session.blocks.map((b) => b.cardId).concat([state.session.focusId]) : [];
    const pitch = L.theme !== 'all' ? AC.themeOf(L.theme) : null;
    const chipSet = (dict, key) => Object.keys(dict).map((k) =>
      '<button class="chip chip--sm ' + (L[key].indexOf(k) !== -1 ? 'is-on' : '') + '" data-action="lib-filter" data-key="' + key + '" data-value="' + k + '">' + esc(dict[k]) + '</button>').join('');
    const nFilters = L.coups.length + (L.mode === 'themes' ? 0 : L.axes.length) + (L.space ? 1 : 0) + (L.source ? 1 : 0) + (L.format ? 1 : 0);
    const sources = all.reduce((acc, c) => { const s = c.source || 'Création'; if (acc.indexOf(s) === -1) acc.push(s); return acc; }, []);

    const themesMode = L.mode === 'themes';
    const mini = (c) => AC.UI.cardMini(c, { inSession: inSession.indexOf(c.id) !== -1 });
    let grid;
    if (themesMode && !L.axis) {
      grid = '';
    } else if (themesMode) {
      /* Cartes du thème, regroupées par type de situation */
      const order = AC.THEME_ORDER.concat(['focus']);
      grid = order.map((t) => {
        const sub = list.filter((c) => c.theme === t);
        if (!sub.length) return '';
        const th = AC.themeOf(t);
        return '<div class="group-head" style="' + AC.themeVars(t) + '"><span class="group-chip">' + icon(th.icon) + esc(th.plural) + '</span>' +
          '<span class="group-time">' + sub.length + ' carte' + (sub.length > 1 ? 's' : '') + '</span></div>' +
          '<div class="grid">' + sub.map(mini).join('') + '</div>';
      }).join('') || '<div class="lib-empty"><p>Aucune carte ne correspond à ces filtres.</p><button class="btn" data-action="lib-reset">Réinitialiser les filtres</button></div>';
    } else if (list.length) {
      grid = '<div class="grid">' + list.map(mini).join('') + '</div>';
    } else if (L.theme === 'educatif' && !q(L)) {
      grid = libEmpty('educatif');
    } else {
      grid = '<div class="lib-empty"><p>Aucune carte ne correspond à ces filtres.</p><button class="btn" data-action="lib-reset">Réinitialiser les filtres</button></div>';
    }

    /* Fiche « en savoir plus » : détail, repères, sources */
    const sheetBody = (info) => '<p>' + esc(info.detail) + '</p>' +
      '<ul>' + info.points.map((x) => '<li>' + esc(x) + '</li>').join('') + '</ul>' +
      '<p class="sheet-src">Sources : ' + info.sources.map(esc).join(' · ') + '</p>';

    const modeSwitch = '<div class="seg seg--2 lib-mode">' +
      '<button class="seg-btn ' + (!themesMode ? 'is-on' : '') + '" data-action="lib-mode" data-value="types">Par type de situation</button>' +
      '<button class="seg-btn ' + (themesMode ? 'is-on' : '') + '" data-action="lib-mode" data-value="themes">Par thème de travail</button>' +
    '</div>';

    let top;
    if (!themesMode) {
      const info = pitch && AC.TYPE_INFO ? AC.TYPE_INFO[L.theme] : null;
      top = '<div class="ttabs" data-scroll="lib-tabs">' + tabs + '</div>' +
        (pitch ? '<div class="lib-pitch" style="' + AC.themeVars(L.theme) + '"><p><i>' + icon(pitch.icon) + '</i>' + esc(pitch.pitch) +
          (pitch.tm && pitch.tm !== '—' ? ' <small>Tennis Mentor : ' + esc(pitch.tm) + '</small>' : '') + '</p>' +
          (info ? '<details class="sheet" data-sheet' + (L.sheetOpen ? ' open' : '') + '><summary>En savoir plus sur ce type de situation</summary>' + sheetBody(info) + '</details>' : '') + '</div>' : '');
    } else if (!L.axis) {
      /* Sommaire des thèmes, par famille */
      top = AC.AXE_FAMILIES.map((f) => '<section class="tfam"><h2>' + esc(f.label) + '</h2><p class="tfam-hint">' + esc(f.hint) + '</p>' +
        '<div class="ttiles">' + f.axes.map((k) => {
          const n = all.filter((c) => (c.axes || []).indexOf(k) !== -1).length;
          return '<button class="ttile" data-action="lib-axis" data-value="' + k + '"><b>' + esc(AC.AXE_INFO[k].label) + '</b>' +
            '<span>' + esc(AC.AXE_INFO[k].short) + '</span><em>' + n + ' carte' + (n > 1 ? 's' : '') + '</em></button>';
        }).join('') + '</div></section>').join('');
    } else {
      const info = AC.AXE_INFO[L.axis];
      const fam = AC.AXE_FAMILIES.find((f) => f.id === info.family);
      top = '<div class="sheet sheet--theme">' +
        '<button class="link-btn" data-action="lib-axis" data-value="">' + icon('left') + ' Tous les thèmes</button>' +
        '<p class="sheet-fam">' + esc(fam.label) + '</p><h2>' + esc(info.label) + '</h2>' + sheetBody(info) + '</div>';
    }

    const tools = themesMode && !L.axis ? '' :
      '<div class="lib-tools">' +
        '<label class="search">' + icon('search') + '<input type="search" data-input="lib-q" placeholder="Rechercher une situation, un coup, une consigne…" value="' + esc(L.q) + '"></label>' +
        '<button class="btn ' + (L.filtersOpen || nFilters ? 'is-on' : '') + '" data-action="lib-toggle-filters">' + icon('sliders') + '<span>Filtres' + (nFilters ? ' (' + nFilters + ')' : '') + '</span></button>' +
      '</div>' +
      (L.filtersOpen ? '<div class="lib-filters">' +
        '<div><p class="field-sub">Coups</p><div class="chips">' + chipSet(AC.COUPS, 'coups') + '</div></div>' +
        (themesMode ? '' : AC.AXE_FAMILIES.map((f) => '<div><p class="field-sub">' + esc(f.label) + '</p><div class="chips">' + f.axes.map((k) =>
          '<button class="chip chip--sm ' + (L.axes.indexOf(k) !== -1 ? 'is-on' : '') + '" data-action="lib-filter" data-key="axes" data-value="' + k + '">' + esc(AC.AXES[k]) + '</button>').join('') + '</div></div>').join('')) +
        '<div><p class="field-sub">Espace</p><div class="chips">' + Object.keys(AC.SPACES).map((k) =>
          '<button class="chip chip--sm ' + (L.space === k ? 'is-on' : '') + '" data-action="lib-space" data-value="' + k + '">' + esc(AC.SPACES[k]) + '</button>').join('') + '</div></div>' +
        '<div><p class="field-sub">Format</p><div class="chips">' + [['simple', 'Simple'], ['double', 'Double']].map(([k, lab]) =>
          '<button class="chip chip--sm ' + (L.format === k ? 'is-on' : '') + '" data-action="lib-format" data-value="' + k + '">' + lab + '</button>').join('') + '</div></div>' +
        '<div><p class="field-sub">Source</p><div class="chips">' + sources.map((s) =>
          '<button class="chip chip--sm ' + (L.source === s ? 'is-on' : '') + '" data-action="lib-source" data-value="' + esc(s) + '">' + esc(s) + ' <small>' + all.filter((c) => (c.source || 'Création') === s).length + '</small></button>').join('') + '</div></div>' +
        (nFilters ? '<button class="link-btn" data-action="lib-reset">Effacer les filtres</button>' : '') +
      '</div>' : '');

    return '<div class="lib">' +
      '<div class="lib-head">' +
        '<div><h1>Cartothèque</h1><p>' + all.length + ' cartes · ' + AC.DB.custom().length + ' perso</p></div>' +
        '<div class="lib-head-actions">' +
          '<button class="btn" data-action="export-cards" ' + (AC.DB.custom().length ? '' : 'disabled') + ' title="Exporter mes cartes perso">' + icon('download') + '<span>Exporter</span></button>' +
          '<button class="btn" data-action="import-cards" title="Importer des cartes (JSON)">' + icon('upload') + '<span>Importer</span></button>' +
          '<button class="btn btn--primary" data-action="new-card" data-theme="' + (L.theme !== 'all' && L.theme !== 'focus' ? L.theme : 'educatif') + '">' + icon('plus') + '<span>Créer une carte</span></button>' +
        '</div>' +
      '</div>' +
      modeSwitch + top + tools +
      '<div id="lib-grid">' + grid + '</div>' +
    '</div>';

    function q(l) { return l.q.trim() || l.coups.length || l.axes.length || l.space; }
  }

  function libEmpty(theme) {
    const th = AC.THEMES[theme];
    return '<div class="lib-empty lib-empty--theme" style="' + AC.themeVars(theme) + '">' +
      '<span class="lib-empty-icon">' + icon(th.icon) + '</span>' +
      '<h3>Pas encore de cartes « ' + esc(th.label) + ' »</h3>' +
      '<p>' + esc(th.pitch) + ' Ce thème n’existe pas dans le jeu Tennis Mentor : ses cartes seront générées dans un second temps, ou tu peux créer les tiennes dès maintenant.</p>' +
      '<button class="btn btn--primary" data-action="new-card" data-theme="' + theme + '">' + icon('plus') + ' Créer une carte ' + esc(th.label) + '</button>' +
    '</div>';
  }

  function refreshLibraryGrid() {
    /* Re-rendu partiel pour garder le focus dans la recherche */
    const tmp = document.createElement('div');
    tmp.innerHTML = viewLibrary();
    const fresh = tmp.querySelector('#lib-grid');
    const cur = document.getElementById('lib-grid');
    if (fresh && cur) cur.innerHTML = fresh.innerHTML;
  }

  /* ------------------------------------------------------------------
     Vue : Mes séances
     ------------------------------------------------------------------ */
  function viewSessions() {
    const list = state.saved.slice().sort((a, b) => (b.savedAt || '').localeCompare(a.savedAt || ''));
    const tiles = list.map((s) => {
      const total = Gen.total(s);
      const bar = s.blocks.map((b) => '<i style="' + AC.themeVars(b.theme) + ';flex:' + b.minutes + '"></i>').join('');
      const f = AC.DB.get(s.focusId);
      const date = new Date(s.savedAt || s.date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' });
      const names = s.blocks.slice(0, 4).map((b) => { const c = AC.DB.get(b.cardId); return c ? esc(c.title) : ''; }).join(' · ');
      return '<article class="stile">' +
        '<div class="stile-bar">' + bar + '</div>' +
        '<div class="stile-body">' +
          '<h3>' + esc(s.name) + '</h3>' +
          '<p class="stile-meta">' + date + ' · ' + total + ' min · ' + s.blocks.length + ' cartes</p>' +
          '<p class="stile-cards">' + names + (s.blocks.length > 4 ? ' …' : '') + '</p>' +
          (f ? '<p class="stile-focus" style="' + AC.themeVars('focus') + '">' + icon('brain') + esc(f.title) + '</p>' : '') +
        '</div>' +
        '<div class="stile-actions">' +
          '<button class="btn btn--primary" data-action="open-saved" data-id="' + s.id + '">Ouvrir</button>' +
          '<button class="icon-btn icon-btn--box" data-action="terrain-saved" data-id="' + s.id + '" title="Mode terrain">' + icon('play') + '</button>' +
          '<button class="icon-btn icon-btn--box" data-action="duplicate-saved" data-id="' + s.id + '" title="Dupliquer">' + icon('copy') + '</button>' +
          '<button class="icon-btn icon-btn--box icon-btn--danger" data-action="delete-saved" data-id="' + s.id + '" title="Supprimer">' + icon('trash') + '</button>' +
        '</div>' +
      '</article>';
    }).join('');

    return '<div class="sessions">' +
      '<div class="lib-head">' +
        '<div><h1>Mes séances</h1><p>' + list.length + ' séance' + (list.length > 1 ? 's' : '') + ' enregistrée' + (list.length > 1 ? 's' : '') + '</p></div>' +
        '<div class="lib-head-actions">' +
          '<button class="btn" data-action="export-sessions" ' + (list.length ? '' : 'disabled') + '>' + icon('download') + '<span>Exporter</span></button>' +
          '<button class="btn" data-action="import-sessions">' + icon('upload') + '<span>Importer</span></button>' +
          '<button class="btn btn--primary" data-action="new-session">' + icon('dice') + '<span>Nouvelle séance</span></button>' +
        '</div>' +
      '</div>' +
      (list.length ? '<div class="stiles">' + tiles + '</div>' :
        '<div class="lib-empty"><p>Aucune séance enregistrée pour l’instant.</p><button class="btn btn--primary" data-action="nav" data-view="generate">' + icon('dice') + ' Générer une séance</button></div>') +
    '</div>';
  }

  /* ------------------------------------------------------------------
     Modales
     ------------------------------------------------------------------ */
  const modalRoot = () => document.getElementById('modal-root');

  let modalOpener = null;

  function openModal(m) {
    if (!state.modal) modalOpener = document.activeElement;
    if (m.type === 'editor') m.initial = JSON.stringify(m.draft);
    state.modal = m;
    renderModal();
    document.body.classList.add('has-modal');
    overlayOpened();
    const box = modalRoot().querySelector('.modal');
    if (box) box.focus({ preventScroll: true });
  }
  function closeModal(fromHistory) {
    if (!state.modal) return;
    state.modal = null;
    modalRoot().innerHTML = '';
    document.body.classList.remove('has-modal');
    if (!fromHistory) overlayClosed();
    if (modalOpener && document.contains(modalOpener)) modalOpener.focus({ preventScroll: true });
    modalOpener = null;
  }

  /* ------------------------------------------------------------------
     Question de confirmation intégrée à l'appli.
     On n'utilise pas window.confirm : certains navigateurs intégrés et applis installées le bloquent
     sans rien afficher (il répond « non »). L'éditeur ne pouvait alors plus se fermer, et les
     suppressions ne faisaient rien.
     ------------------------------------------------------------------ */
  let confirmOpener = null;
  function askConfirm(message, opts, onYes) {
    const o = opts || {};
    confirmOpener = document.activeElement;
    state.confirm = { onYes: onYes };
    document.getElementById('confirm-root').innerHTML =
      '<div class="confirm-backdrop" data-confirm-backdrop>' +
        '<div class="confirm" role="alertdialog" aria-modal="true" aria-labelledby="confirm-msg">' +
          '<p id="confirm-msg">' + esc(message) + '</p>' +
          '<div class="confirm-actions">' +
            '<button class="btn" data-action="confirm-no">' + esc(o.no || 'Annuler') + '</button>' +
            '<button class="btn ' + (o.danger ? 'btn--danger' : 'btn--primary') + '" data-action="confirm-yes">' + esc(o.yes || 'Confirmer') + '</button>' +
          '</div>' +
        '</div>' +
      '</div>';
    document.body.classList.add('has-confirm');
    const safe = document.querySelector('#confirm-root [data-action="confirm-no"]');
    if (safe) safe.focus({ preventScroll: true });
  }
  function closeConfirm(yes) {
    const c = state.confirm;
    if (!c) return;
    state.confirm = null;
    document.getElementById('confirm-root').innerHTML = '';
    document.body.classList.remove('has-confirm');
    if (confirmOpener && document.contains(confirmOpener)) confirmOpener.focus({ preventScroll: true });
    confirmOpener = null;
    if (yes && c.onYes) c.onYes();
  }

  /* L'éditeur contient des changements non enregistrés ? */
  function editorDirty() {
    const m = state.modal;
    return !!m && m.type === 'editor' && JSON.stringify(m.draft) !== m.initial;
  }
  /* Fermeture demandée par l'utilisateur (croix, Échap, clic à côté, Annuler, bouton retour) */
  function requestCloseModal() {
    if (!editorDirty()) { closeModal(); return; }
    askConfirm('Quitter sans enregistrer la carte ?', { yes: 'Quitter sans enregistrer', no: 'Continuer la carte', danger: true },
      () => closeModal());
  }

  function renderModal() {
    const m = state.modal;
    if (!m) { closeModal(); return; }
    let inner = '';
    if (m.type === 'card') inner = modalCard(m);
    else if (m.type === 'picker') inner = modalPicker(m);
    else if (m.type === 'editor') inner = modalEditor(m);
    const root = modalRoot();
    const bd = root.querySelector('.modal-backdrop');
    if (bd && bd.dataset.type === m.type) {
      /* Même fenêtre (changement d'onglet, carte suivante) : pas d'animation d'ouverture,
         on garde le défilement des onglets */
      keepScroll(bd, () => { bd.innerHTML = inner.replace('class="modal ', 'class="modal is-static '); });
      revealActiveTab(bd);
    } else {
      root.innerHTML = '<div class="modal-backdrop" data-backdrop data-type="' + m.type + '">' + inner + '</div>';
    }
  }

  function modalCard(m) {
    const c = AC.DB.get(m.id);
    if (!c) return '';
    const s = state.session;
    const block = m.uid && s ? s.blocks.find((b) => b.uid === m.uid) : null;
    const inSession = s && (s.blocks.some((b) => b.cardId === c.id) || s.focusId === c.id);
    let main;
    if (c.theme === 'focus') {
      main = inSession ? '<span class="pill-ok">' + icon('check') + ' Focus de la séance</span>' :
        '<button class="btn btn--primary" data-action="use-focus" data-id="' + c.id + '">' + icon('brain') + ' Choisir comme Focus</button>';
    } else if (block) {
      main = '<button class="btn" data-action="replace-open" data-uid="' + block.uid + '">' + icon('shuffle') + ' Remplacer…</button>';
    } else if (inSession) {
      main = '<span class="pill-ok">' + icon('check') + ' Déjà dans la séance</span>';
    } else {
      main = '<button class="btn btn--primary" data-action="add-to-session" data-id="' + c.id + '">' + icon('plus') + ' Ajouter à la séance</button>';
    }
    const custom = AC.DB.isCustom(c.id);
    const hasNav = m.list && m.list.length > 1;
    return '<div class="modal modal--card" role="dialog" aria-modal="true" tabindex="-1" aria-label="' + esc(c.title) + '">' +
      '<button class="modal-close icon-btn" data-action="close-modal" aria-label="Fermer">' + icon('close') + '</button>' +
      '<div class="card-stage">' +
        (hasNav ? '<button class="nav-arrow" data-action="modal-nav" data-dir="-1" aria-label="Carte précédente">' + icon('left') + '</button>' : '') +
        '<div class="flip ' + (m.flipped ? 'is-flipped' : '') + '" data-action="flip">' +
          '<div class="flip-inner">' +
            '<div class="flip-face flip-front">' + AC.UI.cardFront(c) + '</div>' +
            '<div class="flip-face flip-back">' + (c.theme === 'focus' ? AC.UI.focusFront(c) : AC.UI.cardBack(c)) + '</div>' +
          '</div>' +
        '</div>' +
        (hasNav ? '<button class="nav-arrow" data-action="modal-nav" data-dir="1" aria-label="Carte suivante">' + icon('right') + '</button>' : '') +
      '</div>' +
      '<div class="modal-actions">' +
        (c.theme !== 'focus' ? '<button class="btn" data-action="flip">' + icon('flip') + (m.flipped ? ' Recto' : ' Fiche coach') + '</button>' : '') +
        main +
        (custom ? '<button class="icon-btn icon-btn--box" data-action="edit-card" data-id="' + c.id + '" title="Modifier">' + icon('edit') + '</button>' +
          '<button class="icon-btn icon-btn--box icon-btn--danger" data-action="delete-card" data-id="' + c.id + '" title="Supprimer">' + icon('trash') + '</button>' : '') +
      '</div>' +
      '<p class="modal-hint">Touche la carte pour la retourner' + (hasNav ? ' · ← → pour naviguer' : '') + '</p>' +
    '</div>';
  }

  function modalPicker(m) {
    const s = state.session;
    const used = s ? s.blocks.map((b) => b.cardId) : [];
    const q = (m.q || '').trim().toLowerCase();
    const list = AC.DB.byTheme(m.theme).filter((c) =>
      !q || [c.title, c.objective, (c.steps || []).join(' ')].join(' ').toLowerCase().indexOf(q) !== -1);
    const th = AC.THEMES[m.theme];
    const tabs = AC.THEME_ORDER.map((t) =>
      '<button class="ttab ttab--sm ' + (m.theme === t ? 'is-on' : '') + '" style="' + AC.themeVars(t) + '" data-action="picker-theme" data-theme="' + t + '"><i>' + icon(AC.THEMES[t].icon) + '</i><span>' + esc(AC.THEMES[t].label) + '</span></button>').join('');
    const grid = list.length ? '<div class="grid grid--picker">' + list.map((c) => {
      const isUsed = used.indexOf(c.id) !== -1;
      return '<div class="pick ' + (isUsed ? 'is-used' : '') + '">' + AC.UI.cardMini(c, { inSession: isUsed }).replace('data-action="open-card"', 'data-action="pick-card"') + '</div>';
    }).join('') + '</div>' : libEmpty(m.theme);
    return '<div class="modal modal--wide" role="dialog" aria-modal="true" tabindex="-1" aria-label="Choisir une carte">' +
      '<button class="modal-close icon-btn" data-action="close-modal" aria-label="Fermer">' + icon('close') + '</button>' +
      '<h2 class="modal-title">' + (m.replaceUid ? 'Remplacer par…' : 'Ajouter une carte') + ' <span style="' + AC.themeVars(m.theme) + '" class="title-pill">' + icon(th.icon) + esc(th.label) + '</span></h2>' +
      '<div class="ttabs ttabs--sm" data-scroll="picker-tabs">' + tabs + '</div>' +
      '<label class="search search--sm">' + icon('search') + '<input type="search" data-input="picker-q" placeholder="Rechercher…" value="' + esc(m.q || '') + '"></label>' +
      '<div class="picker-grid">' + grid + '</div>' +
    '</div>';
  }

  /* ---------------- Éditeur de carte ---------------- */
  const DIAGRAM_TEMPLATES = {
    none: { label: 'Pictogramme du thème', dg: null },
    court: { label: 'Terrain complet', dg: { names: ['P1', 'P2'], zones: [['L', 'soft'], ['R', 'soft']], players: [[-1.3, 5.5, 1], [25.1, 5.5, 2]], shots: [{ p: [[0, 5.5], [23.8, 5.5]], kind: 'rally' }] } },
    cross: { label: 'Demi-terrain croisé', dg: { zones: [['L.bot', 'soft'], ['R.top', 'soft']], players: [[-1.3, 7.8, 1], [25.1, 3, 2]], shots: [{ p: [[0, 7.8], [22.8, 3.1]], kind: 'rally' }] } },
    line: { label: 'Long de ligne', dg: { zones: [['L.bot', 'soft'], ['R.bot', 'soft']], players: [[-1.3, 7.6, 1], [25.1, 7.6, 2]], shots: [{ p: [[0, 7.6], [23.8, 7.6]], kind: 'rally' }] } },
    boxes: { label: 'Carrés de service', dg: { zones: [['L.boxes', 'soft'], ['R.boxes', 'soft']], players: [[4.6, 5.5, 1], [19.2, 5.5, 2]], shots: [{ p: [[5.2, 5.5], [18.6, 5.5]], kind: 'rally' }] } },
    net: { label: 'Filet contre fond', dg: { zones: [['L', 'soft'], ['R', 'soft']], players: [[8, 5.5, 1], [25.1, 5.5, 2]], shots: [{ p: [[8.6, 5.3], [23.8, 3.2]] }, { p: [[23.8, 7.6], [8.6, 5.8]] }] } },
    serve: { label: 'Service', dg: { zones: [['R.box.top', 'soft']], players: [[-1.3, 7.2, 1], [25.1, 2.6, 2]], shots: [{ p: [[-0.4, 7.1], [16.8, 2.8]] }] } },
    feed: { label: 'Panier (coach → joueur)', dg: { names: ['COACH', 'JOUEUR'], zones: [['R', 'soft']], players: [[10.6, 5.5, 2], [25.1, 7.2, 1]], marks: [['cone', 21.5, 3.2], ['cone', 21.5, 7.8]], shots: [{ p: [[11.2, 5.5], [21.8, 7.4]], tone: 'deep' }, { p: [[24.4, 7.2], [3, 3]] }] } }
  };

  function blankCard(theme) {
    return {
      id: AC.uid('perso'), theme: theme || 'educatif', source: 'Création',
      title: '', original: '', objective: '', steps: [], score: '', tip: '', variants: [],
      coups: [], axes: [], equipment: ['balles', 'raquettes'], players: [2, 4], space: 'complet',
      duration: [8, 10, 15], intensity: 2, diagram: null, _tpl: 'none'
    };
  }

  function modalEditor(m) {
    const d = m.draft;
    const themeOpts = AC.THEME_ORDER.map((t) => '<option value="' + t + '" ' + (d.theme === t ? 'selected' : '') + '>' + esc(AC.THEMES[t].label) + '</option>').join('');
    const tplOpts = Object.keys(DIAGRAM_TEMPLATES).map((k) => '<option value="' + k + '" ' + (d._tpl === k ? 'selected' : '') + '>' + esc(DIAGRAM_TEMPLATES[k].label) + '</option>').join('');
    const spaceOpts = Object.keys(AC.SPACES).map((k) => '<option value="' + k + '" ' + (d.space === k ? 'selected' : '') + '>' + esc(AC.SPACES[k]) + '</option>').join('');
    const chipToggle = (dict, field) => Object.keys(dict).map((k) =>
      '<button type="button" class="chip chip--sm ' + (d[field].indexOf(k) !== -1 ? 'is-on' : '') + '" data-action="ed-toggle" data-field="' + field + '" data-value="' + k + '">' + esc(dict[k]) + '</button>').join('');
    const eqDict = {}; Object.keys(AC.EQUIPMENT).forEach((k) => { eqDict[k] = AC.EQUIPMENT[k].label; });
    const num = (field, i, min, max) => '<input type="number" min="' + min + '" max="' + max + '" data-input="ed-num" data-field="' + field + '" data-i="' + i + '" value="' + d[field][i] + '">';

    return '<div class="modal modal--editor" role="dialog" aria-modal="true" tabindex="-1" aria-label="Éditeur de carte">' +
      '<button class="modal-close icon-btn" data-action="close-modal" aria-label="Fermer">' + icon('close') + '</button>' +
      '<h2 class="modal-title">' + (m.isNew ? 'Créer une carte' : 'Modifier la carte') + '</h2>' +
      '<div class="editor">' +
        '<form class="editor-form" onsubmit="return false">' +
          '<div class="erow2">' +
            '<label class="ef"><span>Titre *</span><input data-input="ed" data-field="title" value="' + esc(d.title) + '" placeholder="Ex. : Coup droit en appui"></label>' +
            '<label class="ef"><span>Thème</span><select data-input="ed" data-field="theme">' + themeOpts + '</select></label>' +
          '</div>' +
          '<label class="ef"><span>Objectif</span><input data-input="ed" data-field="objective" value="' + esc(d.objective) + '" placeholder="Ce que le joueur doit apprendre ou améliorer"></label>' +
          '<label class="ef"><span>Déroulement <small>une consigne par ligne</small></span><textarea rows="4" data-input="ed-lines" data-field="steps">' + esc(d.steps.join('\n')) + '</textarea></label>' +
          '<div class="erow2">' +
            '<label class="ef"><span>Score / fin</span><input data-input="ed" data-field="score" value="' + esc(d.score) + '"></label>' +
            '<label class="ef"><span>Conseil</span><input data-input="ed" data-field="tip" value="' + esc(d.tip) + '"></label>' +
          '</div>' +
          '<label class="ef"><span>Variantes <small>une par ligne</small></span><textarea rows="2" data-input="ed-lines" data-field="variants">' + esc(d.variants.join('\n')) + '</textarea></label>' +
          '<div class="erow3">' +
            '<label class="ef"><span>Schéma</span><select data-input="ed-tpl">' + tplOpts + '</select></label>' +
            '<label class="ef"><span>Espace</span><select data-input="ed" data-field="space">' + spaceOpts + '</select></label>' +
            '<label class="ef"><span>Intensité</span><select data-input="ed-int">' + [1, 2, 3].map((v) => '<option ' + (d.intensity === v ? 'selected' : '') + '>' + v + '</option>').join('') + '</select></label>' +
          '</div>' +
          '<div class="erow3">' +
            '<div class="ef"><span>Durée min · conseillée · max</span><div class="nums">' + num('duration', 0, 1, 60) + num('duration', 1, 1, 60) + num('duration', 2, 1, 60) + '</div></div>' +
            '<div class="ef"><span>Joueurs min · max</span><div class="nums">' + num('players', 0, 1, 12) + num('players', 1, 1, 12) + '</div></div>' +
          '</div>' +
          '<div class="ef"><span>Coups</span><div class="chips">' + chipToggle(AC.COUPS, 'coups') + '</div></div>' +
          '<div class="ef"><span>Thèmes de travail</span><div class="chips">' + chipToggle(AC.AXES, 'axes') + '</div></div>' +
          '<div class="ef"><span>Matériel</span><div class="chips">' + chipToggle(eqDict, 'equipment') + '</div></div>' +
        '</form>' +
        '<div class="editor-preview"><div id="ed-preview">' + AC.UI.cardFront(previewCard(d)) + '</div>' +
          '<div class="editor-actions">' +
            '<button class="btn" data-action="close-modal">Annuler</button>' +
            '<button class="btn btn--primary" data-action="ed-save">' + icon('check') + ' Enregistrer la carte</button>' +
          '</div>' +
        '</div>' +
      '</div>' +
    '</div>';
  }

  function previewCard(d) {
    const c = clone(d);
    if (!c.title) c.title = 'Titre de la carte';
    if (!c.steps.length) c.steps = ['Première consigne…'];
    if (!c.tip) c.tip = 'Un conseil pour réussir.';
    return c;
  }

  function refreshPreview() {
    const el = document.getElementById('ed-preview');
    if (el && state.modal && state.modal.draft) el.innerHTML = AC.UI.cardFront(previewCard(state.modal.draft));
  }

  /* ------------------------------------------------------------------
     Mode terrain
     ------------------------------------------------------------------ */
  let tick = null;
  let wakeLock = null;

  function openTerrain(session) {
    if (!session || !session.blocks.length) return;
    state.terrain = { session: session, i: 0, remaining: session.blocks[0].minutes * 60, running: false, last: 0, sound: true };
    renderTerrain();
    document.body.classList.add('has-terrain');
    overlayOpened();
  }

  function closeTerrain(fromHistory) {
    if (!state.terrain) return;
    stopTimer();
    state.terrain = null;
    document.getElementById('terrain-root').innerHTML = '';
    document.body.classList.remove('has-terrain');
    if (!fromHistory) overlayClosed();
  }

  function fmt(sec) {
    const s = Math.max(0, Math.ceil(sec));
    const m = Math.floor(s / 60);
    return m + ':' + String(s % 60).padStart(2, '0');
  }

  function renderTerrain() {
    const T = state.terrain;
    if (!T) return;
    const s = T.session;
    const b = s.blocks[T.i];
    const c = AC.DB.get(b.cardId);
    const th = AC.THEMES[b.theme];
    const f = AC.DB.get(s.focusId);
    const next = s.blocks[T.i + 1] ? AC.DB.get(s.blocks[T.i + 1].cardId) : null;
    const dots = s.blocks.map((x, j) => '<button class="tdot ' + (j === T.i ? 'is-on' : '') + (j < T.i ? ' is-done' : '') + '" style="' + AC.themeVars(x.theme) + '" data-action="t-goto" data-i="' + j + '" title="' + esc(AC.DB.get(x.cardId).title) + '"></button>').join('');
    const R = 54, C = 2 * Math.PI * R;
    document.getElementById('terrain-root').innerHTML =
      '<div class="terrain" style="' + AC.themeVars(b.theme) + '">' +
        '<header class="t-top">' +
          '<div class="t-title"><small>' + esc(s.name) + '</small><b>' + (T.i + 1) + ' / ' + s.blocks.length + ' · ' + esc(th.label) + '</b></div>' +
          (f ? '<div class="t-focus" style="' + AC.themeVars('focus') + '">' + icon('brain') + '<span>Focus : <b>' + esc(f.title) + '</b></span></div>' : '') +
          '<button class="icon-btn t-close" data-action="t-close" aria-label="Quitter le mode terrain">' + icon('close') + '</button>' +
        '</header>' +
        '<div class="t-main">' +
          '<button class="t-nav" data-action="t-step" data-dir="-1" ' + (T.i === 0 ? 'disabled' : '') + ' aria-label="Précédente">' + icon('left') + '</button>' +
          '<div class="t-card">' + AC.UI.cardFront(c) + keysBlock(c, 't-keys') + '</div>' +
          '<div class="t-side">' +
            '<div class="t-timer ' + (T.remaining <= 0 ? 'is-over' : '') + '">' +
              '<svg viewBox="0 0 120 120" class="t-ring"><circle cx="60" cy="60" r="' + R + '" class="ring-bg"/><circle cx="60" cy="60" r="' + R + '" class="ring-fg" stroke-dasharray="' + C + '" stroke-dashoffset="' + (C * (1 - T.remaining / (b.minutes * 60))) + '"/></svg>' +
              '<div class="t-time"><b id="t-time">' + fmt(T.remaining) + '</b><small>sur ' + b.minutes + ' min</small></div>' +
            '</div>' +
            '<div class="t-controls">' +
              '<button class="icon-btn icon-btn--round" data-action="t-reset" title="Remettre à zéro">' + icon('restart') + '</button>' +
              '<button class="icon-btn icon-btn--play" data-action="t-play" title="Démarrer / pause (espace)">' + icon(T.running ? 'pause' : 'play') + '</button>' +
              '<button class="icon-btn icon-btn--round" data-action="t-add" title="+1 minute">+1′</button>' +
            '</div>' +
            '<button class="link-btn t-sound" data-action="t-sound">' + icon(T.sound ? 'sound' : 'mute') + (T.sound ? ' Signal sonore activé' : ' Son coupé') + '</button>' +
            (next ? '<div class="t-next"><small>Ensuite</small><b>' + esc(next.title) + '</b><span>' + s.blocks[T.i + 1].minutes + ' min</span></div>' : '<div class="t-next"><small>Dernière situation</small><b>Bon match !</b></div>') +
          '</div>' +
          '<button class="t-nav" data-action="t-step" data-dir="1" ' + (T.i === s.blocks.length - 1 ? 'disabled' : '') + ' aria-label="Suivante">' + icon('right') + '</button>' +
        '</div>' +
        '<footer class="t-dots">' + dots + '</footer>' +
      '</div>';
  }

  function keysBlock(c, cls) {
    if (!c.keys || !c.keys.length) return '';
    return '<div class="' + cls + '"><b>Points clés</b><ul>' + c.keys.map((k) => '<li>' + esc(k) + '</li>').join('') + '</ul></div>';
  }

  function updateTimerDisplay() {
    const T = state.terrain;
    if (!T) return;
    const b = T.session.blocks[T.i];
    const el = document.getElementById('t-time');
    if (el) el.textContent = fmt(T.remaining);
    const ring = document.querySelector('.ring-fg');
    if (ring) {
      const C = 2 * Math.PI * 54;
      ring.setAttribute('stroke-dashoffset', String(C * (1 - Math.max(0, T.remaining) / (b.minutes * 60))));
    }
    const box = document.querySelector('.t-timer');
    if (box) box.classList.toggle('is-over', T.remaining <= 0);
  }

  function startTimer() {
    const T = state.terrain;
    if (!T) return;
    T.running = true;
    T.last = performance.now();
    if (tick) clearInterval(tick);
    tick = setInterval(() => {
      const now = performance.now();
      const before = T.remaining;
      T.remaining -= (now - T.last) / 1000;
      T.last = now;
      if (before > 0 && T.remaining <= 0) { signal(); }
      updateTimerDisplay();
    }, 250);
    try { if (navigator.wakeLock) navigator.wakeLock.request('screen').then((l) => { wakeLock = l; }).catch(() => {}); } catch (e) { /* ignore */ }
  }

  function stopTimer() {
    if (tick) clearInterval(tick);
    tick = null;
    if (state.terrain) state.terrain.running = false;
    try { if (wakeLock) { wakeLock.release(); wakeLock = null; } } catch (e) { /* ignore */ }
  }

  function signal() {
    const T = state.terrain;
    try { if (navigator.vibrate) navigator.vibrate([200, 100, 200]); } catch (e) { /* ignore */ }
    if (!T || !T.sound) return;
    try {
      const Ctx = window.AudioContext || window.webkitAudioContext;
      const ctx = new Ctx();
      [0, 0.35, 0.7].forEach((d, i) => {
        const o = ctx.createOscillator();
        const g = ctx.createGain();
        o.frequency.value = i === 2 ? 1175 : 880;
        o.type = 'sine';
        g.gain.setValueAtTime(0.0001, ctx.currentTime + d);
        g.gain.exponentialRampToValueAtTime(0.35, ctx.currentTime + d + 0.02);
        g.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + d + 0.28);
        o.connect(g); g.connect(ctx.destination);
        o.start(ctx.currentTime + d); o.stop(ctx.currentTime + d + 0.3);
      });
    } catch (e) { /* ignore */ }
  }

  function terrainGoto(i) {
    const T = state.terrain;
    const n = T.session.blocks.length;
    T.i = Math.max(0, Math.min(n - 1, i));
    T.remaining = T.session.blocks[T.i].minutes * 60;
    const wasRunning = T.running;
    stopTimer();
    renderTerrain();
    if (wasRunning) { startTimer(); renderTerrain(); }
  }

  /* ------------------------------------------------------------------
     Impression
     ------------------------------------------------------------------ */
  function printSession() {
    const s = state.session;
    if (!s) return;
    const f = AC.DB.get(s.focusId);
    let t = 0;
    const rows = s.blocks.map((b, i) => {
      const c = AC.DB.get(b.cardId);
      const start = t; t += b.minutes;
      return '<div class="p-item"><div class="p-time" style="' + AC.themeVars(b.theme) + '"><b>' + (i + 1) + '</b><span>' + start + '′–' + t + '′</span><span>' + b.minutes + ' min</span></div>' + AC.UI.cardFront(c) + keysBlock(c, 'p-keys') + '</div>';
    }).join('');
    document.getElementById('print-root').innerHTML =
      '<div class="p-head"><h1>' + esc(s.name) + '</h1><p>' + Gen.total(s) + ' min · ' + s.params.players + ' joueurs · ' + s.blocks.length + ' situations</p>' +
      (f ? '<p class="p-focus"><b>Focus :</b> ' + esc(f.title) + ' — ' + esc(f.objective) + '</p>' : '') +
      (s.notes ? '<p class="p-notes"><b>Notes :</b> ' + esc(s.notes) + '</p>' : '') + '</div>' +
      '<div class="p-grid">' + rows + '</div>';
    setTimeout(() => window.print(), 60);
  }

  /* ------------------------------------------------------------------
     Utilitaires
     ------------------------------------------------------------------ */
  function toast(msg, kind) {
    const rootEl = document.getElementById('toast-root');
    const el = document.createElement('div');
    el.className = 'toast ' + (kind ? 'toast--' + kind : '');
    el.innerHTML = icon(kind === 'warn' ? 'alert' : 'check') + '<span>' + esc(msg) + '</span>';
    rootEl.appendChild(el);
    requestAnimationFrame(() => el.classList.add('is-in'));
    setTimeout(() => { el.classList.remove('is-in'); setTimeout(() => el.remove(), 300); }, 2600);
  }

  function copyText(text) {
    const done = () => toast('Séance copiée dans le presse-papiers');
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(done).catch(fallback);
    } else fallback();
    function fallback() {
      const ta = document.createElement('textarea');
      ta.value = text; document.body.appendChild(ta); ta.select();
      try { document.execCommand('copy'); done(); } catch (e) { toast('Copie impossible', 'warn'); }
      ta.remove();
    }
  }

  function download(filename, data) {
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = filename;
    document.body.appendChild(a); a.click();
    setTimeout(() => { URL.revokeObjectURL(a.href); a.remove(); }, 500);
  }

  function pickJSON(cb) {
    const input = document.createElement('input');
    input.type = 'file'; input.accept = 'application/json,.json';
    input.onchange = () => {
      const file = input.files && input.files[0];
      if (!file) return;
      const r = new FileReader();
      r.onload = () => { try { cb(JSON.parse(r.result)); } catch (e) { toast('Fichier JSON invalide', 'warn'); } };
      r.readAsText(file);
    };
    input.click();
  }

  function ensureSession() {
    if (!state.session) {
      state.session = {
        id: AC.uid('s'), name: Gen.autoName(state.params), date: new Date().toISOString(),
        duration: state.params.duration, params: clone(state.params), focusId: null, focusLocked: false, blocks: [], notes: ''
      };
    }
    return state.session;
  }

  function syncParams() {
    state.params.preset = (AC.PRESETS.find((p) => AC.THEME_ORDER.every((t) => (p.counts[t] || 0) === (state.params.counts[t] || 0))) || { id: 'custom' }).id;
    if (state.session) {
      const counts = state.session.params.counts;
      state.session.params = clone(state.params);
      state.session.params.counts = counts;
    }
  }

  function findBlock(uid) {
    return state.session ? state.session.blocks.find((b) => b.uid === uid) : null;
  }

  function insertByTheme(block) {
    const s = ensureSession();
    const order = AC.THEME_ORDER.indexOf(block.theme);
    let idx = s.blocks.length;
    for (let i = s.blocks.length - 1; i >= 0; i--) {
      if (AC.THEME_ORDER.indexOf(s.blocks[i].theme) <= order) { idx = i + 1; break; }
      idx = i;
    }
    s.blocks.splice(idx, 0, block);
  }

  function addCard(card) {
    const block = Gen.newBlock(card, card.theme);
    insertByTheme(block);
    state.flash = block.uid;
    delete state.session.savedAt;
    return block;
  }

  /* ------------------------------------------------------------------
     Actions
     ------------------------------------------------------------------ */
  const A = {
    nav(el) {
      /* Toucher l'onglet déjà ouvert : retour en haut, comme dans une appli */
      if (el.dataset.view === state.view) { window.scrollTo({ top: 0, behavior: smooth() }); return; }
      go(el.dataset.view);
    },
    'new-session'() {
      whenReplaceOk(() => {
        state.session = null;
        state.settingsOpen = true;
        viewScroll.generate = 0;
        go('generate');
      });
    },
    'toggle-dark'() {
      const isDark = document.documentElement.getAttribute('data-theme') === 'dark' ||
        (!document.documentElement.getAttribute('data-theme') && window.matchMedia('(prefers-color-scheme: dark)').matches);
      state.dark = !isDark;
      AC.store.set('dark', state.dark);
      applyDark();
    },
    'toggle-settings'() {
      state.settingsOpen = !state.settingsOpen;
      document.querySelector('.settings').classList.toggle('is-open', state.settingsOpen);
    },

    /* Réglages */
    'set-duration'(el) { setDuration(+el.dataset.value); },
    'nudge-duration'(el) { setDuration(Math.max(20, Math.min(180, state.params.duration + 5 * +el.dataset.dir))); },
    'set-players'(el) {
      state.params.players = Math.max(1, Math.min(12, state.params.players + +el.dataset.dir));
      syncParams(); persist(); render();
    },
    'set-format'(el) {
      state.params.format = el.dataset.value;
      if (state.params.format === 'double' && state.params.players < 4) {
        state.params.players = 4;
        toast('Double : 4 joueurs sélectionnés (ajuste si besoin)');
      }
      syncParams(); persist(); render();
    },
    'set-preset'(el) {
      const p = AC.PRESETS.find((x) => x.id === el.dataset.id);
      state.params.counts = Object.assign({}, p.counts);
      syncParams(); persist(); render();
    },
    'set-count'(el) {
      const t = el.dataset.theme;
      state.params.counts[t] = Math.max(0, Math.min(4, (state.params.counts[t] || 0) + +el.dataset.dir));
      syncParams(); persist(); render();
    },
    'toggle-goal'(el) {
      const k = el.dataset.key;
      const g = state.params.goals;
      const i = g.indexOf(k);
      if (i === -1) g.push(k); else g.splice(i, 1);
      syncParams(); persist(); render();
    },

    /* Tirage */
    generate() {
      const prev = state.session;
      state.session = Gen.generate(state.params, prev);
      state.deal = true;
      if (isMobile()) state.settingsOpen = false;
      persist();
      render();
      /* Ramène le haut de la séance à l'écran (sur mobile elle est sous les réglages,
         sur ordinateur on peut être descendu jusqu'au bilan) */
      const board = document.querySelector('.board');
      if (board && (isMobile() || board.getBoundingClientRect().top < 70)) {
        board.scrollIntoView({ behavior: smooth(), block: 'start' });
      }
    },
    reroll(el) {
      const card = Gen.reroll(state.session, el.dataset.uid);
      if (!card) { toast('Plus d’autre carte disponible dans ce thème', 'warn'); return; }
      state.flash = el.dataset.uid;
      delete state.session.savedAt;
      persist(); render();
    },
    lock(el) {
      const b = findBlock(el.dataset.uid);
      b.locked = !b.locked;
      persist(); render();
    },
    move(el) {
      const s = state.session;
      const i = s.blocks.findIndex((b) => b.uid === el.dataset.uid);
      const j = i + +el.dataset.dir;
      if (j < 0 || j >= s.blocks.length) return;
      const tmp = s.blocks[i]; s.blocks[i] = s.blocks[j]; s.blocks[j] = tmp;
      state.flash = tmp.uid;
      persist(); render();
    },
    remove(el) {
      const s = state.session;
      s.blocks = s.blocks.filter((b) => b.uid !== el.dataset.uid);
      delete s.savedAt;
      persist(); render();
    },
    dur(el) {
      const b = findBlock(el.dataset.uid);
      const step = b.minutes >= 10 || (+el.dataset.dir > 0 && b.minutes >= 5) ? 5 : 1;
      b.minutes = Math.max(1, Math.min(60, b.minutes + step * +el.dataset.dir));
      if (b.minutes > 5 && b.minutes % 5 && step === 5) b.minutes = Math.round(b.minutes / 5) * 5;
      persist(); render();
    },
    'scroll-block'(el) {
      const node = document.getElementById('blk-' + el.dataset.uid);
      if (node) {
        node.scrollIntoView({ behavior: smooth(), block: 'center' });
        node.classList.remove('flash'); void node.offsetWidth; node.classList.add('flash');
      }
    },
    insight(el) {
      const s = state.session;
      if (el.dataset.id === 'allocate') { Gen.allocate(s); toast('Durées réparties sur ' + s.duration + ' min'); }
      if (el.dataset.id === 'add-serve') {
        const used = s.blocks.map((b) => b.cardId);
        const serveCards = AC.DB.situations().filter((c) => (c.coups || []).indexOf('service') !== -1 && used.indexOf(c.id) === -1 && Gen.fits(c, s.params));
        const pref = serveCards.filter((c) => c.theme === 'drill');
        const pool = pref.length ? pref : serveCards;
        if (!pool.length) { toast('Aucune carte de service disponible', 'warn'); return; }
        const card = pool[Math.floor(Math.random() * pool.length)];
        addCard(card);
        toast('« ' + card.title + ' » ajoutée');
      }
      persist(); render();
    },

    /* Focus */
    'focus-reroll'() {
      const s = ensureSession();
      const f = Gen.pickFocus(s.focusId, (s.params || {}).goals, (s.params || {}).format);
      s.focusId = f ? f.id : null;
      persist(); render();
    },
    'focus-lock'() { state.session.focusLocked = !state.session.focusLocked; persist(); render(); },
    'focus-remove'() { state.session.focusId = null; state.session.focusLocked = false; persist(); render(); },
    'use-focus'(el) {
      const s = ensureSession();
      s.focusId = el.dataset.id;
      persist(); closeModal(); render();
      toast('Focus de la séance mis à jour');
    },

    /* Cartes / modales */
    'open-card'(el) {
      const ids = state.view === 'library' ? libraryList().map((c) => c.id) : null;
      openModal({ type: 'card', id: el.dataset.id, flipped: false, list: ids });
    },
    'open-block'(el) {
      const b = findBlock(el.dataset.uid);
      const list = state.session.blocks.map((x) => x.cardId);
      openModal({ type: 'card', id: b.cardId, uid: b.uid, flipped: false, list: list, blockNav: true });
    },
    flip() {
      const c = AC.DB.get(state.modal.id);
      if (c && c.theme === 'focus') return;
      state.modal.flipped = !state.modal.flipped;
      const f = document.querySelector('.flip');
      if (f) f.classList.toggle('is-flipped', state.modal.flipped);
      const btn = document.querySelector('.modal-actions [data-action="flip"]');
      if (btn) btn.innerHTML = icon('flip') + (state.modal.flipped ? ' Recto' : ' Fiche coach');
    },
    'modal-nav'(el) { modalNav(+el.dataset.dir); },
    'close-modal'() { requestCloseModal(); },
    'add-to-session'(el) {
      const card = AC.DB.get(el.dataset.id);
      addCard(card);
      persist();
      closeModal();
      render();
      toast('« ' + card.title + ' » ajoutée à la séance');
    },
    'add-card'(el) { openModal({ type: 'picker', theme: el.dataset.theme, q: '' }); },
    'replace-open'(el) {
      const b = findBlock(el.dataset.uid);
      openModal({ type: 'picker', theme: b.theme, q: '', replaceUid: b.uid });
    },
    'picker-theme'(el) {
      state.modal.theme = el.dataset.theme;
      renderModal();
    },
    'pick-card'(el) {
      const card = AC.DB.get(el.dataset.id);
      const m = state.modal;
      const s = ensureSession();
      if (m.replaceUid) {
        const b = findBlock(m.replaceUid);
        if (s.blocks.some((x) => x.cardId === card.id && x !== b)) { toast('Carte déjà dans la séance', 'warn'); return; }
        b.cardId = card.id; b.theme = card.theme;
        b.minutes = Math.min(card.duration[2], Math.max(card.duration[0], b.minutes));
        state.flash = b.uid;
      } else {
        if (s.blocks.some((x) => x.cardId === card.id)) { toast('Carte déjà dans la séance', 'warn'); return; }
        addCard(card);
      }
      delete s.savedAt;
      persist(); closeModal();
      if (state.view !== 'generate') {
        viewScroll[state.view] = window.scrollY;
        state.view = 'generate';
        persist();
      }
      render();
      toast('« ' + card.title + ' » ' + (m.replaceUid ? 'en place' : 'ajoutée'));
    },

    /* Éditeur */
    'new-card'(el) {
      const theme = el.dataset.theme && el.dataset.theme !== 'focus' ? el.dataset.theme : 'educatif';
      openModal({ type: 'editor', isNew: true, draft: blankCard(theme) });
    },
    'edit-card'(el) {
      const c = clone(AC.DB.get(el.dataset.id));
      c._tpl = c._tpl || (c.diagram ? 'custom' : 'none');
      c.steps = c.steps || []; c.variants = c.variants || []; c.coups = c.coups || []; c.axes = c.axes || [];
      openModal({ type: 'editor', isNew: false, draft: c });
    },
    'ed-toggle'(el) {
      const d = state.modal.draft;
      const list = d[el.dataset.field];
      const i = list.indexOf(el.dataset.value);
      if (i === -1) list.push(el.dataset.value); else list.splice(i, 1);
      el.classList.toggle('is-on', i === -1);
      refreshPreview();
    },
    'ed-save'() {
      const d = clone(state.modal.draft);
      if (!d.title.trim()) { toast('Donne un titre à la carte', 'warn'); const t = document.querySelector('[data-field="title"]'); if (t) t.focus(); return; }
      d.duration = d.duration.map((v) => Math.max(1, +v || 1)).sort((a, b) => a - b);
      d.players = d.players.map((v) => Math.max(1, +v || 1)).sort((a, b) => a - b);
      if (d.equipment.indexOf('balles') === -1) d.equipment.unshift('balles');
      AC.DB.saveCustom(d);
      closeModal();
      state.lib.theme = d.theme;
      render();
      toast('Carte « ' + d.title + ' » enregistrée');
    },
    'delete-card'(el) {
      const c = AC.DB.get(el.dataset.id);
      askConfirm('Supprimer définitivement la carte « ' + c.title + ' » ?', { yes: 'Supprimer', danger: true }, () => {
        AC.DB.deleteCustom(c.id);
        if (state.session) state.session.blocks = state.session.blocks.filter((b) => b.cardId !== c.id);
        persist(); closeModal(); render();
        toast('Carte supprimée');
      });
    },
    'export-cards'() { download('assistant-coach-cartes.json', AC.DB.custom()); },
    'import-cards'() {
      pickJSON((data) => {
        const n = AC.DB.importCustom(Array.isArray(data) ? data : data.cards);
        render();
        toast(n + ' carte' + (n > 1 ? 's' : '') + ' importée' + (n > 1 ? 's' : ''), n ? '' : 'warn');
      });
    },

    /* Cartothèque */
    'lib-theme'(el) { state.lib.theme = el.dataset.theme; render(); },
    'lib-mode'(el) { state.lib.mode = el.dataset.value; render(); },
    'lib-axis'(el) {
      const k = el.dataset.value || '';
      if (k) { showAxis(k); histSet(true); return; }
      /* Retour au sommaire : on défait l'entrée d'historique de la fiche si on est dessus */
      if (history.state && history.state.ac && history.state.axis && !history.state.overlay) {
        try { history.back(); return; } catch (e) { /* on continue sans l'historique */ }
      }
      showAxis('');
    },
    'lib-toggle-filters'() { state.lib.filtersOpen = !state.lib.filtersOpen; render(); },
    'lib-filter'(el) {
      const list = state.lib[el.dataset.key];
      const i = list.indexOf(el.dataset.value);
      if (i === -1) list.push(el.dataset.value); else list.splice(i, 1);
      render();
    },
    'lib-space'(el) { state.lib.space = state.lib.space === el.dataset.value ? '' : el.dataset.value; render(); },
    'lib-format'(el) { state.lib.format = state.lib.format === el.dataset.value ? '' : el.dataset.value; render(); },
    'lib-source'(el) { state.lib.source = state.lib.source === el.dataset.value ? '' : el.dataset.value; render(); },
    'lib-reset'() { Object.assign(state.lib, { q: '', coups: [], axes: [], space: '', source: '', format: '' }); render(); },

    /* Séance */
    save() {
      const s = state.session;
      s.savedAt = new Date().toISOString();
      const i = state.saved.findIndex((x) => x.id === s.id);
      if (i >= 0) state.saved[i] = clone(s); else state.saved.push(clone(s));
      AC.store.set('sessions', state.saved);
      persist(); render();
      toast('Séance enregistrée dans « Mes séances »');
    },
    print() { printSession(); },
    copy() { copyText(Gen.toText(state.session)); },
    terrain() { openTerrain(state.session); },
    'open-saved'(el) {
      const s = state.saved.find((x) => x.id === el.dataset.id);
      const open = () => {
        state.session = validSession(clone(s));
        state.params = Object.assign(Gen.defaultParams(), clone(s.params));
        state.settingsOpen = false;
        viewScroll.generate = 0;
        go('generate');
      };
      if (state.session && state.session.id === s.id) open(); else whenReplaceOk(open);
    },
    'terrain-saved'(el) {
      const s = validSession(clone(state.saved.find((x) => x.id === el.dataset.id)));
      openTerrain(s);
    },
    'duplicate-saved'(el) {
      const s = clone(state.saved.find((x) => x.id === el.dataset.id));
      s.id = AC.uid('s'); s.name = s.name + ' (copie)'; s.autoNamed = false; s.savedAt = new Date().toISOString();
      state.saved.push(s);
      AC.store.set('sessions', state.saved);
      render();
      toast('Séance dupliquée');
    },
    'delete-saved'(el) {
      const s = state.saved.find((x) => x.id === el.dataset.id);
      askConfirm('Supprimer la séance « ' + s.name + ' » ?', { yes: 'Supprimer', danger: true }, () => {
        state.saved = state.saved.filter((x) => x.id !== s.id);
        AC.store.set('sessions', state.saved);
        if (state.session && state.session.id === s.id) delete state.session.savedAt;
        persist(); render();
        toast('Séance supprimée');
      });
    },
    'export-sessions'() { download('assistant-coach-seances.json', state.saved); },
    'import-sessions'() {
      pickJSON((data) => {
        const list = (Array.isArray(data) ? data : []).filter((s) => s && s.id && Array.isArray(s.blocks));
        list.forEach((s) => {
          const i = state.saved.findIndex((x) => x.id === s.id);
          if (i >= 0) state.saved[i] = s; else state.saved.push(s);
        });
        AC.store.set('sessions', state.saved);
        render();
        toast(list.length + ' séance' + (list.length > 1 ? 's' : '') + ' importée' + (list.length > 1 ? 's' : ''), list.length ? '' : 'warn');
      });
    },

    /* Terrain */
    't-close'() { closeTerrain(); },
    't-play'() {
      const T = state.terrain;
      if (T.running) stopTimer(); else startTimer();
      const btn = document.querySelector('[data-action="t-play"]');
      if (btn) btn.innerHTML = icon(T.running ? 'pause' : 'play');
    },
    't-reset'() {
      const T = state.terrain;
      T.remaining = T.session.blocks[T.i].minutes * 60;
      updateTimerDisplay();
    },
    't-add'() { state.terrain.remaining += 60; updateTimerDisplay(); },
    't-step'(el) { terrainGoto(state.terrain.i + +el.dataset.dir); },
    't-goto'(el) { terrainGoto(+el.dataset.i); },
    't-sound'(el) {
      /* Mise à jour sur place : un re-rendu ramènerait la carte en haut sur mobile */
      const T = state.terrain;
      T.sound = !T.sound;
      el.innerHTML = icon(T.sound ? 'sound' : 'mute') + (T.sound ? ' Signal sonore activé' : ' Son coupé');
    }
  };

  /* La séance en cours n'est pas enregistrée : demander avant de la remplacer */
  function whenReplaceOk(fn) {
    const s = state.session;
    if (!s || !s.blocks.length || s.savedAt) { fn(); return; }
    askConfirm('La séance en cours n’est pas enregistrée. La remplacer quand même ?', { yes: 'Remplacer', danger: true }, fn);
  }

  function setDuration(d) {
    state.params.duration = d;
    syncParams();
    if (state.session) {
      state.session.duration = d;
      Gen.allocate(state.session);
    }
    persist(); render();
  }

  function modalNav(dir) {
    const m = state.modal;
    if (!m || m.type !== 'card' || !m.list || m.list.length < 2) return;
    const i = m.list.indexOf(m.id);
    const j = (i + dir + m.list.length) % m.list.length;
    m.id = m.list[j];
    m.flipped = false;
    if (m.blockNav && state.session) {
      const b = state.session.blocks[j];
      m.uid = b ? b.uid : null;
    }
    renderModal();
  }

  /* ------------------------------------------------------------------
     Événements
     ------------------------------------------------------------------ */
  /* Un clic ne ferme la fenêtre que s'il commence ET finit sur le fond :
     sélectionner du texte dans l'éditeur en relâchant à côté ne ferme plus rien */
  let downOnBackdrop = false;
  document.addEventListener('pointerdown', (e) => {
    downOnBackdrop = !!(e.target.hasAttribute && e.target.hasAttribute('data-backdrop'));
  });

  /* Après un re-rendu déclenché au clavier, redonner le focus au bouton équivalent */
  function refocus(el) {
    if (document.contains(el) || state.modal || state.terrain || !window.CSS || !CSS.escape) return;
    const sel = ['action', 'uid', 'theme', 'key', 'value', 'dir', 'id', 'view']
      .filter((k) => el.dataset[k] != null)
      .map((k) => '[data-' + k + '="' + CSS.escape(el.dataset[k]) + '"]').join('');
    const twin = sel && document.querySelector(sel);
    if (twin && !twin.disabled) twin.focus({ preventScroll: true });
  }

  document.addEventListener('click', (e) => {
    if (state.confirm) {
      /* Une question est posée : seuls ses deux boutons (ou un clic à côté = non) répondent */
      const b = e.target.closest && e.target.closest('[data-action="confirm-yes"], [data-action="confirm-no"]');
      if (b) closeConfirm(b.dataset.action === 'confirm-yes');
      else if (e.target.hasAttribute && e.target.hasAttribute('data-confirm-backdrop')) closeConfirm(false);
      return;
    }
    const backdrop = e.target.hasAttribute && e.target.hasAttribute('data-backdrop');
    if (backdrop) { if (downOnBackdrop) requestCloseModal(); return; }
    const el = e.target.closest('[data-action]');
    if (!el || el.disabled) return;
    const fn = A[el.dataset.action];
    if (fn) {
      e.preventDefault();
      fn(el, e);
      if (e.detail === 0) refocus(el);
    }
  });

  /* La fiche « En savoir plus » reste ouverte (ou fermée) d'un re-rendu à l'autre */
  document.addEventListener('toggle', (e) => {
    if (e.target && e.target.hasAttribute && e.target.hasAttribute('data-sheet')) state.lib.sheetOpen = e.target.open;
  }, true);

  document.addEventListener('input', (e) => {
    const el = e.target.closest('[data-input]');
    if (!el) return;
    const k = el.dataset.input;
    const s = state.session;
    if (k === 'session-name' && s) { s.name = el.value; s.autoNamed = false; delete s.savedAt; persist(); }
    else if (k === 'notes' && s) { s.notes = el.value; persist(); }
    else if (k === 'lib-q') { state.lib.q = el.value; refreshLibraryGrid(); }
    else if (k === 'picker-q') {
      state.modal.q = el.value;
      const tmp = document.createElement('div');
      tmp.innerHTML = modalPicker(state.modal);
      document.querySelector('.picker-grid').innerHTML = tmp.querySelector('.picker-grid').innerHTML;
    }
    else if (k === 'ed') { state.modal.draft[el.dataset.field] = el.value; refreshPreview(); }
    else if (k === 'ed-lines') { state.modal.draft[el.dataset.field] = el.value.split('\n').map((x) => x.trim()).filter(Boolean); refreshPreview(); }
    else if (k === 'ed-num') { state.modal.draft[el.dataset.field][+el.dataset.i] = +el.value; refreshPreview(); }
  });

  document.addEventListener('change', (e) => {
    const el = e.target.closest('[data-input]');
    if (!el) return;
    const k = el.dataset.input;
    if (k === 'focus') {
      state.params.focus = el.checked; syncParams(); persist(); render();
    } else if (k === 'equipment') {
      state.params.equipment[el.dataset.key] = el.checked; syncParams(); persist(); render();
    } else if (k === 'ed-tpl') {
      const d = state.modal.draft;
      d._tpl = el.value;
      d.diagram = DIAGRAM_TEMPLATES[el.value] ? clone(DIAGRAM_TEMPLATES[el.value].dg) : d.diagram;
      refreshPreview();
    } else if (k === 'ed-int') {
      state.modal.draft.intensity = +el.value; refreshPreview();
    } else if (k === 'ed' && el.tagName === 'SELECT') {
      state.modal.draft[el.dataset.field] = el.value; refreshPreview();
    }
  });

  document.addEventListener('keydown', (e) => {
    const typing = /INPUT|TEXTAREA|SELECT/.test((e.target.tagName || ''));
    if (state.confirm) {
      if (e.key === 'Escape') { e.preventDefault(); closeConfirm(false); }
      else if (e.key === 'Tab') {
        /* Le focus reste dans la question */
        const btns = Array.prototype.slice.call(document.querySelectorAll('#confirm-root button'));
        const i = btns.indexOf(document.activeElement);
        e.preventDefault();
        (btns[(i + (e.shiftKey ? -1 : 1) + btns.length) % btns.length] || btns[0]).focus();
      }
      return;
    }
    if (state.terrain) {
      if (e.key === 'Escape') closeTerrain();
      else if (e.key === 'ArrowRight') terrainGoto(state.terrain.i + 1);
      else if (e.key === 'ArrowLeft') terrainGoto(state.terrain.i - 1);
      else if (e.key === ' ' && !typing) { e.preventDefault(); A['t-play'](); }
      return;
    }
    if (state.modal) {
      if (e.key === 'Escape') requestCloseModal();
      else if (!typing && state.modal.type === 'card') {
        /* Espace sur un bouton : on laisse le bouton agir au lieu de retourner la carte */
        const onButton = e.target.closest && e.target.closest('button');
        if (e.key === 'ArrowRight') modalNav(1);
        else if (e.key === 'ArrowLeft') modalNav(-1);
        else if (e.key === 'f' || (e.key === ' ' && !onButton)) { e.preventDefault(); A.flip(); }
      }
    }
  });

  if (window.matchMedia) {
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', applyDark);
  }

  /* ------------------------------------------------------------------
     Démarrage
     ------------------------------------------------------------------ */
  renderShell();
  applyDark();
  render();
  histSet(false);
  AC.app = { state: state, render: render, A: A };
})();
