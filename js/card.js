/* ==========================================================================
   Assistant Coach — Rendu des cartes
   ========================================================================== */
window.AC = window.AC || {};
AC.UI = AC.UI || {};

(function () {
  var esc = AC.esc = function (s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  };

  /* Variables CSS d'une carte, selon son thème */
  AC.themeVars = function (themeId) {
    var t = AC.themeOf(themeId);
    return '--c:' + t.color + ';--cd:' + t.deep + ';--cs:' + t.soft + ';--on:' + t.ink + ';--cs-line:' + t.soft +
      ';--shot:' + (t.shot || t.color) + ';';
  };

  function diagramOf(card) {
    if (card.diagram && (card.diagram.picto || card.diagram.zones || card.diagram.players || card.diagram.panels || card.diagram.orient || card.diagram.frames)) {
      return AC.court(card.diagram);
    }
    /* Carte sans schéma : grand pictogramme du thème */
    return '<div class="diagram diagram--empty">' + AC.icon(AC.themeOf(card.theme).icon) + '</div>';
  }
  AC.UI.diagram = diagramOf;

  /* Légende des codes de rôle présents dans le schéma (J1, J2… se lisent seuls) */
  var ROLES = { S: 'serveur', R: 'relanceur', P: 'partenaire', C: 'coach', A: 'attaquant', D: 'défenseur', J: 'joueur' };
  var ROLE_ORDER = ['J', 'S', 'P', 'R', 'A', 'D', 'C'];
  function legendOf(card) {
    var d = card.diagram;
    if (!d || d.picto) return '';
    /* Schéma d'appuis : une phrase de lecture à la place des codes de rôle */
    if (d.frames) return d.note ? '<p class="tcard-legend tcard-legend--note">' + esc(d.note) + '</p>' : '';
    var seen = {};
    AC.courtPlayers(d).forEach(function (p) { if (ROLES[p[3]]) seen[p[3]] = true; });
    var keys = ROLE_ORDER.filter(function (k) { return seen[k]; });
    if (!keys.length) return '';
    return '<p class="tcard-legend">' + keys.map(function (k) { return '<span><b>' + k + '</b> ' + ROLES[k] + '</span>'; }).join('') + '</p>';
  }
  AC.UI.legend = legendOf;

  function equipmentRow(card) {
    var has = card.equipment || [];
    return '<div class="tcard-eq" aria-label="Matériel">' +
      Object.keys(AC.EQUIPMENT).map(function (k) {
        var on = has.indexOf(k) !== -1;
        var eq = AC.EQUIPMENT[k];
        return '<span class="eq ' + (on ? 'is-on' : '') + '" title="' + esc(eq.label) + (on ? '' : ' (inutile)') + '">' + AC.icon(eq.icon) + '</span>';
      }).join('') +
      (card.eqNote ? '<span class="eq-note">' + esc(card.eqNote) + '</span>' : '') +
      '</div>';
  }

  function durationLabel(card) {
    if (!card.duration) return '';
    return card.duration[0] === card.duration[2] ? card.duration[0] + ' min' : card.duration[0] + '–' + card.duration[2] + ' min';
  }
  AC.UI.durationLabel = durationLabel;

  function playersLabel(card) {
    if (!card.players) return '';
    var p = card.players;
    return p[0] === p[1] ? p[0] + ' joueur' + (p[0] > 1 ? 's' : '') : p[0] + '–' + p[1] + ' joueurs';
  }

  function intensityDots(v) {
    var o = '<span class="dots" title="Intensité ' + (v || 1) + '/3">';
    for (var i = 1; i <= 3; i++) o += '<i class="' + (i <= (v || 1) ? 'on' : '') + '"></i>';
    return o + '</span>';
  }
  AC.UI.intensityDots = intensityDots;

  /* ---------------- Carte complète : recto ---------------- */
  AC.UI.cardFront = function (card) {
    var t = AC.themeOf(card.theme);
    if (card.theme === 'focus') return AC.UI.focusFront(card);
    var steps = (card.steps || []).map(function (s) {
      var numbered = /^\d+\.\s/.test(s);
      return '<li class="' + (numbered ? 'num' : '') + '">' + esc(s) + '</li>';
    }).join('');
    return '<article class="tcard tcard--full" style="' + AC.themeVars(card.theme) + '" data-theme="' + card.theme + '">' +
      '<header class="tcard-head">' +
        '<h3 class="tcard-title">' + esc(card.title) + (card.format === 'double' ? '<span class="tcard-format">Double</span>' : '') + '</h3>' +
        '<span class="tcard-icon">' + AC.icon(t.icon) + '</span>' +
      '</header>' +
      '<div class="tcard-body">' +
        '<div class="tcard-diagram">' + diagramOf(card) + legendOf(card) + '</div>' +
        '<ul class="tcard-steps">' + steps + '</ul>' +
        (card.score ? '<p class="tcard-score"><b>' + esc(card.scoreLabel || t.scoreLabel || 'Score') + '</b> ' + esc(card.score) + '</p>' : '') +
      '</div>' +
      '<footer class="tcard-foot">' +
        '<div class="tcard-foot-title">Conseil</div>' +
        '<p class="tcard-tip">' + esc(card.tip || '') + '</p>' +
        equipmentRow(card) +
      '</footer>' +
    '</article>';
  };

  /* ---------------- Carte complète : verso (fiche coach) ---------------- */
  AC.UI.cardBack = function (card) {
    var t = AC.themeOf(card.theme);
    var chips = function (list, dict) {
      return (list || []).map(function (k) { return '<span class="chip chip--sm">' + esc(dict[k] || k) + '</span>'; }).join('');
    };
    var variants = (card.variants || []).map(function (v) { return '<li>' + esc(v) + '</li>'; }).join('');
    var keys = (card.keys || []).map(function (v) { return '<li>' + esc(v) + '</li>'; }).join('');
    return '<article class="tcard tcard--full tcard--back" style="' + AC.themeVars(card.theme) + '">' +
      '<header class="tcard-head">' +
        '<h3 class="tcard-title">Fiche coach</h3>' +
        '<span class="tcard-icon">' + AC.icon(t.icon) + '</span>' +
      '</header>' +
      '<div class="tcard-body tcard-body--back">' +
        '<div class="back-theme"><span class="back-pill">' + esc(t.label) + '</span>' +
          (card.original && card.original !== card.title ? '<span class="back-orig">« ' + esc(card.original) + ' »</span>' : '') + '</div>' +
        '<h4>Objectif</h4><p>' + esc(card.objective || '—') + '</p>' +
        (keys ? '<h4>Points clés</h4><ul class="back-list back-list--keys">' + keys + '</ul>' : '') +
        (variants ? '<h4>Variantes</h4><ul class="back-list">' + variants + '</ul>' : '') +
        '<div class="back-grid">' +
          '<div><h4>Durée</h4><p>' + durationLabel(card) + '</p></div>' +
          '<div><h4>Joueurs</h4><p>' + playersLabel(card) + (card.format === 'double' ? ' · double' : '') + '</p></div>' +
          '<div><h4>Espace</h4><p>' + esc(AC.SPACES[card.space] || '—') + '</p></div>' +
          '<div><h4>Intensité</h4><p>' + intensityDots(card.intensity) + '</p></div>' +
        '</div>' +
        ((card.coups || []).length ? '<h4>Coups</h4><div class="chips">' + chips(card.coups, AC.COUPS) + '</div>' : '') +
        ((card.axes || []).length ? '<h4>Thèmes de travail</h4><div class="chips">' + chips(card.axes, AC.AXES) + '</div>' : '') +
      '</div>' +
      '<footer class="tcard-foot tcard-foot--back">' +
        '<span>Source : ' + esc(card.source || 'Création') + (card.refs ? ' · Repères : ' + esc(card.refs) : '') + '</span>' +
      '</footer>' +
    '</article>';
  };

  /* ---------------- Carte Focus ---------------- */
  AC.UI.focusFront = function (card) {
    var steps = (card.steps || []).map(function (s) { return '<li>' + esc(s) + '</li>'; }).join('');
    return '<article class="tcard tcard--full tcard--focus" style="' + AC.themeVars('focus') + '">' +
      '<header class="tcard-head">' +
        '<h3 class="tcard-title">' + esc(card.title) + (card.format === 'double' ? '<span class="tcard-format">Double</span>' : '') + '</h3>' +
        '<span class="tcard-icon">' + AC.icon('brain') + '</span>' +
      '</header>' +
      '<div class="tcard-body">' +
        '<div class="tcard-diagram">' + diagramOf(card) + '</div>' +
        '<p class="focus-lead">' + esc(card.objective) + '</p>' +
        '<ul class="tcard-steps tcard-steps--center">' + steps + '</ul>' +
      '</div>' +
      '<footer class="tcard-foot tcard-foot--focus"><span>Focus</span></footer>' +
    '</article>';
  };

  /* ---------------- Mini-carte (cartothèque) ---------------- */
  AC.UI.cardMini = function (card, opts) {
    opts = opts || {};
    var t = AC.themeOf(card.theme);
    var inSession = opts.inSession;
    return '<button class="mcard ' + (inSession ? 'is-in' : '') + '" style="' + AC.themeVars(card.theme) + '" data-action="open-card" data-id="' + esc(card.id) + '">' +
      '<span class="mcard-head">' +
        '<span class="mcard-title">' + esc(card.title) + '</span>' +
        '<span class="mcard-icon">' + AC.icon(t.icon) + '</span>' +
      '</span>' +
      '<span class="mcard-diagram">' + diagramOf(card) + '</span>' +
      '<span class="mcard-obj">' + esc(card.objective || '') + '</span>' +
      '<span class="mcard-foot">' +
        (card.theme !== 'focus' ? '<span class="mchip">' + AC.icon('clock') + durationLabel(card) + '</span>' + intensityDots(card.intensity) : '<span class="mchip">Intention de séance</span>') +
        (card.format === 'double' ? '<span class="mchip mchip--new">Double</span>' : '') +
        (AC.DB && AC.DB.isCustom(card.id) ? '<span class="mchip mchip--new">Perso</span>' : '') +
      '</span>' +
      (inSession ? '<span class="mcard-badge">' + AC.icon('check') + '</span>' : '') +
    '</button>';
  };
})();
