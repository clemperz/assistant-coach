/* ==========================================================================
   Assistant Coach — Icônes et pictogrammes (SVG inline)
   - AC.icon(name)   : icônes d'interface 24×24 (trait, currentColor)
   - AC.picto(name)  : illustrations des cartes sans schéma de terrain
   Les pictos utilisent les variables CSS --c (couleur du thème),
   --cs (couleur douce) et --ink (encre).
   ========================================================================== */
window.AC = window.AC || {};

(function () {
  var ICONS = {
    /* Thèmes (pleins) */
    bolt: '<path d="M13.2 2 4.5 13.4h6.1L9.4 22l8.9-11.6h-6.2L13.2 2Z" fill="currentColor"/>',
    ball: '<circle cx="12" cy="12" r="9.5" fill="currentColor"/><path d="M7.2 3.9c2.6 2.2 2.6 13.9 0 16.2M16.8 3.9c-2.6 2.2-2.6 13.9 0 16.2" stroke="var(--icon-cut, #fff)" stroke-width="1.9" fill="none" stroke-linecap="round"/>',
    trophy: '<path d="M7 3h10v2h3.2v2.2c0 2.7-1.9 4.6-4.3 5A5 5 0 0 1 13.2 15v2.6H16V21H8v-3.4h2.8V15a5 5 0 0 1-2.7-2.8c-2.4-.4-4.3-2.3-4.3-5V5H7V3Zm-1.4 4v.3c0 1.2.6 2.2 1.6 2.7A9.6 9.6 0 0 1 7 7H5.6Zm11.4 0c0 1-.1 2-.3 3 1-.5 1.7-1.5 1.7-2.7V7H17Z" fill="currentColor"/>',
    brain: '<path d="M9 3.2a3 3 0 0 0-3 2.4A3.2 3.2 0 0 0 3.7 9a3.3 3.3 0 0 0 .4 5.3A3.4 3.4 0 0 0 7.5 19a2.8 2.8 0 0 0 4 1.6V4.4A2.9 2.9 0 0 0 9 3.2Zm6 0a2.9 2.9 0 0 0-2.5 1.2v16.2a2.8 2.8 0 0 0 4-1.6 3.4 3.4 0 0 0 3.4-4.7 3.3 3.3 0 0 0 .4-5.3A3.2 3.2 0 0 0 18 5.6a3 3 0 0 0-3-2.4Z" fill="currentColor"/><path d="M8.6 8.3c1 .2 1.7.9 1.9 1.9M6.6 13c1.2-.6 2.6-.4 3.6.6M15.4 8.3c-1 .2-1.7.9-1.9 1.9M17.4 13c-1.2-.6-2.6-.4-3.6.6" stroke="var(--icon-cut, #fff)" stroke-width="1.4" fill="none" stroke-linecap="round"/>',
    target: '<circle cx="12" cy="12" r="9.5" fill="currentColor"/><circle cx="12" cy="12" r="6" fill="none" stroke="var(--icon-cut, #fff)" stroke-width="1.9"/><circle cx="12" cy="12" r="2.4" fill="var(--icon-cut, #fff)"/>',
    mix: '<path d="M3 12h6.5" stroke="currentColor" stroke-width="3" stroke-linecap="round"/><path d="M9.5 12c3 0 3.6-6 8-6M9.5 12c3 0 3.6 6 8 6" stroke="currentColor" stroke-width="3" fill="none" stroke-linecap="round"/><path d="m16.5 2.6 4.3 3.4-4.3 3.4ZM16.5 14.6l4.3 3.4-4.3 3.4Z" fill="currentColor"/>',

    /* Interface (trait) */
    dice: '<rect x="3.5" y="3.5" width="17" height="17" rx="4" stroke="currentColor" stroke-width="2" fill="none"/><circle cx="8.5" cy="8.5" r="1.5" fill="currentColor"/><circle cx="15.5" cy="15.5" r="1.5" fill="currentColor"/><circle cx="15.5" cy="8.5" r="1.5" fill="currentColor"/><circle cx="8.5" cy="15.5" r="1.5" fill="currentColor"/><circle cx="12" cy="12" r="1.5" fill="currentColor"/>',
    shuffle: '<path d="M3 7h3.5c4.5 0 5.5 10 10 10H20M3 17h3.5c1.7 0 2.8-1.4 3.8-3.2M13.7 10.2c1-1.8 2.1-3.2 3.8-3.2H20" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round"/><path d="m17.5 4 3 3-3 3M17.5 14l3 3-3 3" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/>',
    lock: '<rect x="5" y="10.5" width="14" height="10" rx="2.5" stroke="currentColor" stroke-width="2" fill="none"/><path d="M8 10.5V7.8a4 4 0 0 1 8 0v2.7" stroke="currentColor" stroke-width="2" fill="none"/><circle cx="12" cy="15.5" r="1.5" fill="currentColor"/>',
    unlock: '<rect x="5" y="10.5" width="14" height="10" rx="2.5" stroke="currentColor" stroke-width="2" fill="none"/><path d="M8 10.5V7.8a4 4 0 0 1 7.6-1.7" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round"/>',
    trash: '<path d="M4 7h16M10 11v6M14 11v6M6 7l1 12.2A2 2 0 0 0 9 21h6a2 2 0 0 0 2-1.8L18 7M9 7V4.5h6V7" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/>',
    plus: '<path d="M12 5v14M5 12h14" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/>',
    minus: '<path d="M5 12h14" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/>',
    close: '<path d="m6 6 12 12M18 6 6 18" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/>',
    clock: '<circle cx="12" cy="12" r="8.5" stroke="currentColor" stroke-width="2" fill="none"/><path d="M12 7.5V12l3 2" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round"/>',
    users: '<circle cx="9" cy="8" r="3.4" stroke="currentColor" stroke-width="2" fill="none"/><path d="M3 20c.4-3.6 2.8-5.6 6-5.6s5.6 2 6 5.6" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round"/><path d="M16 4.9a3.3 3.3 0 0 1 0 6.3M18 14.8c1.8.8 2.8 2.5 3 5.2" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round"/>',
    up: '<path d="m6 15 6-6 6 6" stroke="currentColor" stroke-width="2.2" fill="none" stroke-linecap="round" stroke-linejoin="round"/>',
    down: '<path d="m6 9 6 6 6-6" stroke="currentColor" stroke-width="2.2" fill="none" stroke-linecap="round" stroke-linejoin="round"/>',
    left: '<path d="m15 6-6 6 6 6" stroke="currentColor" stroke-width="2.2" fill="none" stroke-linecap="round" stroke-linejoin="round"/>',
    right: '<path d="m9 6 6 6-6 6" stroke="currentColor" stroke-width="2.2" fill="none" stroke-linecap="round" stroke-linejoin="round"/>',
    play: '<path d="M8 5.5v13l10.5-6.5L8 5.5Z" fill="currentColor"/>',
    pause: '<rect x="6.5" y="5" width="4" height="14" rx="1.2" fill="currentColor"/><rect x="13.5" y="5" width="4" height="14" rx="1.2" fill="currentColor"/>',
    restart: '<path d="M4.5 12a7.5 7.5 0 1 0 2.2-5.3" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round"/><path d="M4 4v4.5h4.5" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/>',
    save: '<path d="M5 4h11l3 3v13H5V4Z" stroke="currentColor" stroke-width="2" fill="none" stroke-linejoin="round"/><path d="M8 4v5h7V4M8 20v-6h8v6" stroke="currentColor" stroke-width="2" fill="none" stroke-linejoin="round"/>',
    print: '<path d="M7 9V3.5h10V9M7 17H4.5V10a1 1 0 0 1 1-1h13a1 1 0 0 1 1 1v7H17" stroke="currentColor" stroke-width="2" fill="none" stroke-linejoin="round"/><path d="M7 14h10v6.5H7Z" stroke="currentColor" stroke-width="2" fill="none" stroke-linejoin="round"/>',
    copy: '<rect x="8.5" y="8.5" width="12" height="12" rx="2.5" stroke="currentColor" stroke-width="2" fill="none"/><path d="M15.5 8.5V6a2.5 2.5 0 0 0-2.5-2.5H6A2.5 2.5 0 0 0 3.5 6v7A2.5 2.5 0 0 0 6 15.5h2.5" stroke="currentColor" stroke-width="2" fill="none"/>',
    search: '<circle cx="11" cy="11" r="6.5" stroke="currentColor" stroke-width="2" fill="none"/><path d="m16 16 4.5 4.5" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>',
    sliders: '<path d="M4 7h9M17 7h3M4 17h3M11 17h9" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><circle cx="15" cy="7" r="2.3" stroke="currentColor" stroke-width="2" fill="none"/><circle cx="9" cy="17" r="2.3" stroke="currentColor" stroke-width="2" fill="none"/>',
    cards: '<rect x="3" y="6" width="11" height="15" rx="2.2" stroke="currentColor" stroke-width="2" fill="none"/><path d="M8 3.5h10.5A2.5 2.5 0 0 1 21 6v12" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round"/>',
    folder: '<path d="M3.5 6.5a2 2 0 0 1 2-2h4l2 2.5h7a2 2 0 0 1 2 2v8.5a2 2 0 0 1-2 2h-13a2 2 0 0 1-2-2v-11Z" stroke="currentColor" stroke-width="2" fill="none" stroke-linejoin="round"/>',
    flip: '<path d="M4 9a8 8 0 0 1 14-3.5L20 8M20 15a8 8 0 0 1-14 3.5L4 16" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round"/><path d="M20 3.5V8h-4.5M4 20.5V16h4.5" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/>',
    check: '<path d="m5 12.5 4.2 4.2L19 7" stroke="currentColor" stroke-width="2.4" fill="none" stroke-linecap="round" stroke-linejoin="round"/>',
    alert: '<path d="M12 4 2.8 19.5h18.4L12 4Z" stroke="currentColor" stroke-width="2" fill="none" stroke-linejoin="round"/><path d="M12 10v4.2" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><circle cx="12" cy="17" r="1.2" fill="currentColor"/>',
    edit: '<path d="M4 20h4L19 9a2.8 2.8 0 0 0-4-4L4 16v4Z" stroke="currentColor" stroke-width="2" fill="none" stroke-linejoin="round"/><path d="m13.5 6.5 4 4" stroke="currentColor" stroke-width="2"/>',
    download: '<path d="M12 4v11M7 10.5l5 5 5-5M5 20h14" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/>',
    upload: '<path d="M12 15V4M7 8.5l5-5 5 5M5 20h14" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/>',
    sparkle: '<path d="M12 3c.6 4.6 2.4 6.4 7 7-4.6.6-6.4 2.4-7 7-.6-4.6-2.4-6.4-7-7 4.6-.6 6.4-2.4 7-7Z" fill="currentColor"/><path d="M19 15c.3 2 1 2.7 3 3-2 .3-2.7 1-3 3-.3-2-1-2.7-3-3 2-.3 2.7-1 3-3Z" fill="currentColor"/>',
    expand: '<path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/>',
    sound: '<path d="M4 9.5h3.5L12 5.5v13l-4.5-4H4v-5Z" stroke="currentColor" stroke-width="2" fill="none" stroke-linejoin="round"/><path d="M15.5 9a4 4 0 0 1 0 6M18 6.5a7.5 7.5 0 0 1 0 11" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round"/>',
    mute: '<path d="M4 9.5h3.5L12 5.5v13l-4.5-4H4v-5Z" stroke="currentColor" stroke-width="2" fill="none" stroke-linejoin="round"/><path d="m16 9.5 5 5M21 9.5l-5 5" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>',
    grip: '<circle cx="9" cy="6" r="1.6" fill="currentColor"/><circle cx="15" cy="6" r="1.6" fill="currentColor"/><circle cx="9" cy="12" r="1.6" fill="currentColor"/><circle cx="15" cy="12" r="1.6" fill="currentColor"/><circle cx="9" cy="18" r="1.6" fill="currentColor"/><circle cx="15" cy="18" r="1.6" fill="currentColor"/>',
    moon: '<path d="M19.5 14.5A8 8 0 0 1 9.5 4.5a8 8 0 1 0 10 10Z" stroke="currentColor" stroke-width="2" fill="none" stroke-linejoin="round"/>',
    sun: '<circle cx="12" cy="12" r="4" stroke="currentColor" stroke-width="2" fill="none"/><path d="M12 2.5v2M12 19.5v2M2.5 12h2M19.5 12h2M5.3 5.3l1.4 1.4M17.3 17.3l1.4 1.4M5.3 18.7l1.4-1.4M17.3 6.7l1.4-1.4" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>',

    /* Matériel (pleins, style pictos des cartes) */
    'eq-ball': '<circle cx="12" cy="12" r="8" fill="currentColor"/><path d="M8 5.4c2.2 1.9 2.2 11.3 0 13.2M16 5.4c-2.2 1.9-2.2 11.3 0 13.2" stroke="var(--icon-cut, #fff)" stroke-width="1.6" fill="none"/>',
    'eq-racket': '<ellipse cx="12" cy="8.6" rx="5.6" ry="6.4" stroke="currentColor" stroke-width="2.4" fill="none"/><path d="M9 6.2h6M8.6 9h6.8M9.4 11.8h5.2M10.4 3.6v10M13.6 3.6v10" stroke="currentColor" stroke-width="1"/><path d="M12 15v6.5" stroke="currentColor" stroke-width="3" stroke-linecap="round"/>',
    'eq-cone': '<path d="M10.2 3.5h3.6l4.4 14H5.8l4.4-14Z" fill="currentColor"/><rect x="4" y="17.5" width="16" height="3" rx="1" fill="currentColor"/><path d="M8.6 9.5h6.8M7.6 13.5h8.8" stroke="var(--icon-cut, #fff)" stroke-width="1.6"/>',
    'eq-lines': '<rect x="10.5" y="3" width="3" height="18" rx="1" fill="currentColor"/><path d="m4 9 3.5 3L4 15ZM20 9l-3.5 3L20 15Z" fill="currentColor"/>',
    'eq-timer': '<circle cx="12" cy="13.5" r="7.5" stroke="currentColor" stroke-width="2.4" fill="none"/><path d="M10 2.5h4M12 2.5v3.5M12 13.5V9.5M12 13.5h3.5" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/>'
  };

  AC.icon = function (name, cls) {
    var body = ICONS[name] || ICONS.ball;
    return '<svg class="ico ' + (cls || '') + '" viewBox="0 0 24 24" aria-hidden="true" focusable="false">' + body + '</svg>';
  };

  /* ------------------------------------------------------------------
     Pictogrammes (viewBox 300 × 150)
     ------------------------------------------------------------------ */
  var INK = 'var(--ink)';
  var C = 'var(--c)';
  var CS = 'var(--cs)';

  function ground(y) {
    return '<line x1="38" y1="' + (y || 136) + '" x2="262" y2="' + (y || 136) + '" stroke="' + CS + '" stroke-width="6" stroke-linecap="round"/>';
  }
  function ball(cx, cy, r, fill) {
    var s = r * 0.18;
    return '<g><circle cx="' + cx + '" cy="' + cy + '" r="' + r + '" fill="' + (fill || C) + '"/>' +
      '<path d="M' + (cx - r * 0.55) + ' ' + (cy - r * 0.83) + ' Q' + (cx - r * 0.02) + ' ' + cy + ' ' + (cx - r * 0.55) + ' ' + (cy + r * 0.83) +
      ' M' + (cx + r * 0.55) + ' ' + (cy - r * 0.83) + ' Q' + (cx + r * 0.02) + ' ' + cy + ' ' + (cx + r * 0.55) + ' ' + (cy + r * 0.83) +
      '" stroke="#fff" stroke-width="' + s + '" fill="none" stroke-linecap="round"/></g>';
  }
  function head(x, y, r) {
    return '<circle cx="' + x + '" cy="' + y + '" r="' + (r || 10) + '" fill="#fff" stroke="' + INK + '" stroke-width="7"/>';
  }
  function limb(d, w) {
    return '<path d="' + d + '" stroke="' + INK + '" stroke-width="' + (w || 8) + '" fill="none" stroke-linecap="round" stroke-linejoin="round"/>';
  }
  function racket(cx, cy, rot) {
    return '<g transform="rotate(' + (rot || 0) + ' ' + cx + ' ' + cy + ')">' +
      '<ellipse cx="' + cx + '" cy="' + cy + '" rx="10" ry="14" fill="#fff" stroke="' + C + '" stroke-width="6"/>' +
      '<line x1="' + cx + '" y1="' + (cy + 14) + '" x2="' + cx + '" y2="' + (cy + 30) + '" stroke="' + C + '" stroke-width="7" stroke-linecap="round"/></g>';
  }
  function arrowHead(x, y, dx, dy, size, fill) {
    var l = Math.sqrt(dx * dx + dy * dy) || 1;
    dx /= l; dy /= l;
    var s = size || 12;
    var px = -dy, py = dx;
    var tip = [x + dx * s * 0.6, y + dy * s * 0.6];
    var b1 = [x - dx * s * 0.6 + px * s * 0.75, y - dy * s * 0.6 + py * s * 0.75];
    var b2 = [x - dx * s * 0.6 - px * s * 0.75, y - dy * s * 0.6 - py * s * 0.75];
    return '<path d="M' + tip.join(' ') + 'L' + b1.join(' ') + 'L' + b2.join(' ') + 'Z" fill="' + (fill || INK) + '"/>';
  }
  function txt(x, y, s, size, fill, anchor, weight) {
    return '<text x="' + x + '" y="' + y + '" font-size="' + (size || 14) + '" fill="' + (fill || INK) + '" text-anchor="' + (anchor || 'middle') + '" font-weight="' + (weight || 800) + '" class="pic-txt">' + s + '</text>';
  }
  function rect(x, y, w, h, fill, rx) {
    return '<rect x="' + x + '" y="' + y + '" width="' + w + '" height="' + h + '" rx="' + (rx == null ? 4 : rx) + '" fill="' + fill + '"/>';
  }

  /* Base des vues de profil : sol, filet (0,91 m) et corde du double filet */
  function profileBase() {
    return '<line x1="14" y1="128" x2="286" y2="128" stroke="' + INK + '" stroke-width="4" stroke-linecap="round"/>' +
      '<line x1="150" y1="128" x2="150" y2="98" stroke="' + INK + '" stroke-width="5" stroke-linecap="round"/>' +
      '<line x1="150" y1="98" x2="150" y2="70" stroke="' + INK + '" stroke-width="1.6" stroke-dasharray="3 3"/>' +
      '<line x1="126" y1="70" x2="174" y2="70" stroke="' + C + '" stroke-width="3" stroke-linecap="round" stroke-dasharray="6 4"/>';
  }

  var PICTOS = {
    plusminus: function () {
      return rect(66, 8, 168, 26, '#CDCFD6', 5) + txt(150, 27, '7 – 7', 17, INK) +
        rect(66, 42, 80, 100, INK, 6) + rect(154, 42, 80, 100, C, 6) +
        txt(106, 62, 'GAGNANT', 11, '#fff') + txt(106, 78, '+1', 15, '#fff') +
        ball(106, 102, 12, C) + txt(106, 133, '14 = GAGNÉ', 9.5, '#fff') +
        txt(194, 62, 'FAUTE', 11, '#fff') + txt(194, 78, '−1', 15, '#fff') +
        '<path d="M182 92l24 22M206 92l-24 22" stroke="' + INK + '" stroke-width="7" stroke-linecap="round"/>' +
        txt(194, 133, '0 = PERDU', 9.5, '#fff');
    },
    tug: function () {
      var out = '', w = 41, h = 17, g = 3;
      for (var k = 0; k <= 5; k++) {
        var n = k + 1;
        var total = n * w + (n - 1) * g;
        var x0 = 150 - total / 2;
        for (var i = 0; i < n; i++) {
          var a = 5 + k - 2 * i, b = 10 - a;
          var fill = a > b ? C : (a < b ? INK : (k === 0 ? '#CDCFD6' : CS));
          var tf = (a === b) ? INK : '#fff';
          var x = x0 + i * (w + g), y = 8 + k * (h + 5);
          out += rect(x, y, w, h, fill, 3) + txt(x + w / 2, y + 12.5, a + '–' + b, 10, tf);
        }
      }
      return out;
    },
    risk: function () {
      return ground() +
        '<path d="M176 20h96a6 6 0 0 1 6 6v34a6 6 0 0 1-6 6h-66l-18 14 4-14h-16a6 6 0 0 1-6-6V26a6 6 0 0 1 6-6Z" fill="#fff" stroke="' + CS + '" stroke-width="5"/>' +
        txt(224, 49, 'RISQUE !', 15, INK) +
        racket(76, 36, -18) +
        head(118, 56) +
        limb('M114 68 C108 82 102 92 100 104') +
        limb('M100 104 L80 134 M100 104 C112 112 122 120 126 134') +
        limb('M112 74 L88 66 L82 58') +
        ball(152, 70, 7);
    },
    serve: function () {
      var rays = '';
      [[60, 40, 112, 62], [52, 74, 112, 80], [60, 108, 112, 98], [240, 40, 188, 62], [248, 74, 188, 80], [240, 108, 188, 98]].forEach(function (r) {
        rays += '<line x1="' + r[0] + '" y1="' + r[1] + '" x2="' + r[2] + '" y2="' + r[3] + '" stroke="' + CS + '" stroke-width="6" stroke-linecap="round"/>';
      });
      return rays + ground() + racket(132, 24, -14) + ball(156, 12, 7) +
        head(154, 66) +
        limb('M152 78 C150 92 146 104 142 114') +
        limb('M142 114 L124 134 M142 114 L160 134') +
        limb('M150 84 L138 60');
    },
    rush: function () {
      return '<line x1="96" y1="64" x2="270" y2="76" stroke="' + CS + '" stroke-width="5"/><line x1="70" y1="112" x2="248" y2="44" stroke="' + CS + '" stroke-width="5"/>' +
        '<line x1="100" y1="58" x2="272" y2="70" stroke="' + INK + '" stroke-width="6" stroke-linecap="round"/>' +
        '<line x1="66" y1="118" x2="250" y2="38" stroke="' + INK + '" stroke-width="6" stroke-linecap="round"/>' +
        '<line x1="60" y1="92" x2="210" y2="98" stroke="' + INK + '" stroke-width="6" stroke-linecap="round"/>' +
        ball(64, 50, 24) + ball(240, 28, 21) + ball(232, 112, 21);
    },
    tempo: function () {
      var bars = '', labels = ['1 min', '50 s', '40 s', '30 s'];
      labels.forEach(function (l, i) {
        var y = 30 + i * 26, w = 124 - i * 14;
        bars += rect(166, y, w, 18, i === 3 ? C : CS, 9) + txt(175, y + 13.5, 'NIV. ' + (i + 1) + ' · ' + l, 9.5, i === 3 ? 'var(--on)' : INK, 'start');
      });
      return '<circle cx="96" cy="82" r="50" fill="#fff" stroke="' + C + '" stroke-width="12"/>' +
        rect(84, 14, 24, 14, C, 3) + rect(90, 24, 12, 12, C, 2) +
        '<line x1="96" y1="82" x2="96" y2="48" stroke="' + INK + '" stroke-width="7" stroke-linecap="round"/>' +
        '<line x1="96" y1="82" x2="120" y2="92" stroke="' + INK + '" stroke-width="7" stroke-linecap="round"/>' +
        '<circle cx="96" cy="82" r="6" fill="' + INK + '"/>' +
        txt(96, 122, '20', 14, INK) + bars;
    },
    collision: function () {
      var burst = '';
      [[150, 50, 150, 34], [138, 54, 128, 42], [162, 54, 172, 42], [134, 66, 120, 64], [166, 66, 180, 64]].forEach(function (l) {
        burst += '<line x1="' + l[0] + '" y1="' + l[1] + '" x2="' + l[2] + '" y2="' + l[3] + '" stroke="' + C + '" stroke-width="5" stroke-linecap="round"/>';
      });
      return ground(130) +
        '<path d="M62 104 Q104 18 150 66" stroke="' + INK + '" stroke-width="5" fill="none"/>' +
        '<path d="M238 104 Q196 18 150 66" stroke="' + INK + '" stroke-width="5" fill="none"/>' +
        '<path d="M150 66 Q170 30 214 108" stroke="' + INK + '" stroke-width="4" fill="none" stroke-dasharray="6 7"/>' +
        '<path d="M150 66 Q130 30 86 108" stroke="' + INK + '" stroke-width="4" fill="none" stroke-dasharray="6 7"/>' +
        burst + '<circle cx="150" cy="66" r="6" fill="#fff" stroke="' + INK + '" stroke-width="4"/>' +
        ball(62, 104, 13) + ball(238, 104, 13) + ball(104, 44, 11) + ball(196, 44, 11) +
        rect(22, 112, 86, 18, C, 4) + txt(65, 125, '+2 SANS REBOND', 8.5, '#fff') +
        rect(192, 112, 86, 18, C, 4) + txt(235, 125, '+1 APRÈS REBOND', 8.5, '#fff');
    },
    drops: function () {
      return txt(70, 20, 'LÂCHEUR', 12, INK) + txt(230, 20, 'ATTRAPEUR', 12, INK) +
        limb('M28 70 L146 66', 9) + rect(136, 58, 18, 10, INK, 4) +
        limb('M272 50 L160 54', 9) +
        ball(146, 80, 10) +
        '<line x1="146" y1="94" x2="146" y2="120" stroke="' + INK + '" stroke-width="4" stroke-dasharray="5 6"/>' +
        '<g opacity=".45">' + ball(146, 130, 10) + '</g>' +
        arrowHead(172, 112, 0, 1, 14, C) + '<line x1="172" y1="76" x2="172" y2="106" stroke="' + C + '" stroke-width="5" stroke-linecap="round"/>' +
        ground(144);
    },
    hand: function () {
      var hp = '<path d="M18 11V6a2 2 0 0 0-2-2a2 2 0 0 0-2 2M14 10V4a2 2 0 0 0-2-2a2 2 0 0 0-2 2v2M10 10.5V6a2 2 0 0 0-2-2a2 2 0 0 0-2 2v8M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-6-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15" stroke="' + INK + '" stroke-width="1.9" fill="#fff" stroke-linecap="round" stroke-linejoin="round"/>';
      return ground(138) +
        '<g transform="translate(28 34) scale(3.6) rotate(-14 12 12)">' + hp + '</g>' +
        '<g transform="translate(272 34) scale(-3.6 3.6) rotate(-14 12 12)">' + hp + '</g>' +
        '<path d="M140 46 L156 134 L178 40" stroke="' + INK + '" stroke-width="5" fill="none" stroke-linejoin="round"/>' +
        ball(134, 30, 13);
    },
    reset: function () {
      var cx = 150, cy = 75, r = 48;
      function pt(a) { a = a * Math.PI / 180; return [cx + r * Math.cos(a), cy + r * Math.sin(a)]; }
      var a1 = pt(200), a2 = pt(318), b1 = pt(20), b2 = pt(138);
      var t2 = 318 * Math.PI / 180, u2 = 138 * Math.PI / 180;
      return '<path d="M' + a1.join(' ') + ' A' + r + ' ' + r + ' 0 0 1 ' + a2.join(' ') + '" stroke="' + C + '" stroke-width="15" fill="none"/>' +
        '<path d="M' + b1.join(' ') + ' A' + r + ' ' + r + ' 0 0 1 ' + b2.join(' ') + '" stroke="' + C + '" stroke-width="15" fill="none"/>' +
        arrowHead(a2[0], a2[1], -Math.sin(t2), Math.cos(t2), 30, C) +
        arrowHead(b2[0], b2[1], -Math.sin(u2), Math.cos(u2), 30, C) +
        ball(cx, cy, 20);
    },
    gear: function () {
      var cx = 150, cy = 75, pts = [], n = 9;
      for (var i = 0; i < n * 4; i++) {
        var a = (i / (n * 4)) * Math.PI * 2;
        var rr = (i % 4 === 0 || i % 4 === 1) ? 64 : 50;
        pts.push((cx + rr * Math.cos(a)).toFixed(1) + ' ' + (cy + rr * Math.sin(a)).toFixed(1));
      }
      return '<path d="M' + pts.join('L') + 'Z" fill="' + C + '" stroke="' + C + '" stroke-width="6" stroke-linejoin="round"/>' +
        '<circle cx="' + cx + '" cy="' + cy + '" r="36" fill="#fff"/>' + ball(cx, cy, 29);
    },
    chase: function () {
      return ground(128) +
        '<path d="M40 56 Q92 -4 128 126 Q150 50 196 66" stroke="' + INK + '" stroke-width="5" fill="none"/>' +
        ball(212, 70, 12) +
        '<path d="M196 98l26 26M222 98l-26 26" stroke="' + C + '" stroke-width="10" stroke-linecap="round"/>';
    },
    bulb: function () {
      return rect(141, 6, 18, 22, C, 3) +
        '<g transform="rotate(-42 102 34)">' + rect(94, 22, 16, 22, C, 3) + '</g>' +
        '<g transform="rotate(42 198 34)">' + rect(190, 22, 16, 22, C, 3) + '</g>' +
        '<circle cx="150" cy="76" r="38" fill="' + C + '"/>' +
        rect(130, 100, 40, 20, C, 4) + rect(134, 124, 32, 10, C, 3) +
        '<circle cx="150" cy="74" r="15" fill="#fff"/>' +
        '<path d="M141 63 Q148 74 141 85 M159 63 Q152 74 159 85" stroke="' + C + '" stroke-width="3" fill="none"/>' +
        '<line x1="150" y1="88" x2="150" y2="104" stroke="#fff" stroke-width="4"/>';
    },
    bounce: function () {
      return ground(134) +
        racket(70, 46, -38) +
        head(122, 52) +
        limb('M118 64 C112 78 108 90 106 102') +
        limb('M106 102 L86 132 M106 102 C118 110 128 120 132 132') +
        limb('M114 72 L90 70 L80 62') +
        '<line x1="150" y1="88" x2="206" y2="124" stroke="' + INK + '" stroke-width="4" stroke-dasharray="4 7"/>' +
        '<line x1="282" y1="44" x2="216" y2="124" stroke="' + INK + '" stroke-width="5"/>' +
        arrowHead(242, 92, -66, 80, 16, INK) +
        '<circle cx="212" cy="128" r="9" fill="' + C + '"/>';
    },
    zones: function () {
      return rect(14, 30, 88, 88, '#CDCFD6', 6) + rect(106, 30, 70, 88, CS, 6) + rect(180, 30, 84, 88, C, 6) +
        '<line x1="276" y1="18" x2="276" y2="132" stroke="' + INK + '" stroke-width="6" stroke-linecap="round"/>' +
        txt(58, 78, 'CONSTRUIRE', 9.5, INK) + txt(141, 78, 'PRESSER', 9.5, INK) + txt(222, 78, 'CONCLURE', 9.5, '#fff') +
        txt(58, 22, 'FOND', 9, INK, 'middle', 700) + txt(141, 22, 'MI-COURT', 9, INK, 'middle', 700) + txt(222, 22, 'FILET', 9, INK, 'middle', 700) +
        '<line x1="30" y1="136" x2="246" y2="136" stroke="' + INK + '" stroke-width="5" stroke-linecap="round"/>' +
        arrowHead(252, 136, 1, 0, 16, INK) + '<circle cx="30" cy="136" r="7" fill="' + C + '" stroke="' + INK + '" stroke-width="3"/>';
    },
    /* Vue de profil : filet, corde du « double filet » et trajectoire neutre */
    doublenet: function () {
      return profileBase() +
        '<path d="M40 104 Q150 -8 262 128" stroke="' + C + '" stroke-width="5" fill="none" stroke-linecap="round"/>' +
        arrowHead(256, 121, 5, 6, 13, C) +
        '<circle cx="40" cy="104" r="7" fill="' + C + '" stroke="' + INK + '" stroke-width="3"/>' +
        '<line x1="176" y1="96" x2="176" y2="50" stroke="' + INK + '" stroke-width="2"/>' +
        arrowHead(176, 52, 0, -1, 8, INK) + arrowHead(176, 94, 0, 1, 8, INK) +
        txt(184, 62, '1 À 1,8 M', 9, INK, 'start') + txt(184, 74, 'AU-DESSUS', 8, INK, 'start', 700) + txt(184, 85, 'DU FILET', 8, INK, 'start', 700) +
        txt(118, 64, 'CORDE', 8.5, INK, 'end') + txt(118, 75, '≈ 0,9 M', 8, INK, 'end', 700);
    },
    /* Vue de profil : la hauteur de balle selon la zone (défense, neutre, attaque) */
    heights: function () {
      return profileBase() +
        '<path d="M26 108 Q150 -92 266 128" stroke="#8A8D96" stroke-width="4" fill="none" stroke-linecap="round" stroke-dasharray="7 6"/>' +
        '<path d="M44 104 Q150 -10 258 128" stroke="' + C + '" stroke-width="5" fill="none" stroke-linecap="round"/>' +
        '<path d="M84 98 Q146 62 236 128" stroke="' + INK + '" stroke-width="4" fill="none" stroke-linecap="round"/>' +
        '<circle cx="26" cy="108" r="6" fill="#8A8D96" stroke="' + INK + '" stroke-width="2.5"/>' +
        '<circle cx="44" cy="104" r="6" fill="' + C + '" stroke="' + INK + '" stroke-width="2.5"/>' +
        '<circle cx="84" cy="98" r="6" fill="#fff" stroke="' + INK + '" stroke-width="2.5"/>' +
        txt(14, 14, 'DÉFENSE : TRÈS HAUT', 8.5, '#6B6E77', 'start') +
        txt(150, 32, 'NEUTRE :', 8.5, C, 'middle') + txt(150, 43, 'AU-DESSUS DE LA CORDE', 7.5, C, 'middle', 700) +
        txt(286, 144, 'ATTAQUE : ENTRE FILET ET CORDE', 8, INK, 'end');
    },
    /* Fusée à 3 étages (Genevois) : jambes, tronc, bras et raquette */
    rocket: function () {
      var badge = function (x, y, n) {
        return '<circle cx="' + x + '" cy="' + y + '" r="9" fill="' + INK + '"/>' + txt(x, y + 4, n, 11, '#fff');
      };
      return rect(20, 94, 260, 42, CS, 6) + rect(20, 8, 260, 40, CS, 6) +
        head(96, 26, 9) +
        limb('M96 38 L94 90') +
        limb('M94 90 L76 132 M94 90 L116 112 L112 132') +
        limb('M96 50 L124 58 L140 44') +
        racket(150, 24, 32) +
        '<line x1="42" y1="130" x2="42" y2="22" stroke="' + INK + '" stroke-width="5" stroke-linecap="round"/>' + arrowHead(42, 18, 0, -1, 13, INK) +
        badge(186, 115, '1') + txt(202, 113, 'JAMBES', 11, INK, 'start') + txt(202, 125, 'poussée contre le sol', 7.5, INK, 'start', 600) +
        badge(186, 71, '2') + txt(202, 69, 'TRONC', 11, INK, 'start') + txt(202, 81, 'rotation hanches, épaules', 7.5, INK, 'start', 600) +
        badge(186, 28, '3') + txt(202, 26, 'BRAS', 11, INK, 'start') + txt(202, 38, 'rotations, raquette', 7.5, INK, 'start', 600);
    },
    /* Chaîne du service (Genevois) : rampe de lancement, zone de transmission, étages supérieurs */
    launch: function () {
      var badge = function (x, y, n) {
        return '<circle cx="' + x + '" cy="' + y + '" r="9" fill="' + INK + '"/>' + txt(x, y + 4, n, 11, '#fff');
      };
      return rect(16, 100, 268, 38, CS, 6) + rect(16, 6, 268, 46, CS, 6) +
        ball(66, 12, 5) +
        head(92, 44, 8) +
        limb('M92 54 L90 98', 7) +
        limb('M90 98 L76 114 L80 134 M90 98 L106 112 L100 134', 7) +
        limb('M92 60 L78 44 L70 24', 6) +
        limb('M92 60 L112 58 L118 40', 6) +
        racket(122, 22, 12) +
        '<line x1="36" y1="132" x2="36" y2="20" stroke="' + INK + '" stroke-width="5" stroke-linecap="round"/>' + arrowHead(36, 16, 0, -1, 13, INK) +
        badge(160, 119, '1') + txt(175, 117, 'RAMPE DE LANCEMENT', 8.8, INK, 'start') + txt(175, 129, 'sol, chevilles, genoux', 7.5, INK, 'start', 600) +
        badge(160, 76, '2') + txt(175, 74, 'TRANSMISSION', 8.8, INK, 'start') + txt(175, 86, 'hanches et tronc', 7.5, INK, 'start', 600) +
        badge(160, 29, '3') + txt(175, 27, 'ÉTAGES SUPÉRIEURS', 8.8, INK, 'start') + txt(175, 39, 'bras et raquette', 7.5, INK, 'start', 600);
    },
    /* Les 5 positions clés de la raquette (coup droit vu de profil, le joueur frappe vers la droite) */
    keypos: function () {
      var pts = [[104, 22, 'LA PLUS HAUTE', 104, 11, 'middle'], [46, 70, 'LA PLUS EN ARRIÈRE', 60, 92, 'start'], [112, 122, 'LA PLUS BASSE', 112, 142, 'middle'],
        [198, 92, 'CONTACT', 214, 100, 'start'], [252, 34, 'LA PLUS EN AVANT', 286, 17, 'end']];
      var o = ground(132) +
        '<circle cx="158" cy="44" r="8" fill="none" stroke="' + CS + '" stroke-width="6"/>' +
        '<path d="M158 54 L156 98 M156 98 L142 130 M156 98 L172 130" stroke="' + CS + '" stroke-width="7" fill="none" stroke-linecap="round"/>' +
        '<path d="M150 44 C132 22 118 20 104 22 C74 26 48 44 46 70 C46 100 78 122 112 122 C150 122 176 106 198 92" stroke="' + INK + '" stroke-width="3" fill="none" stroke-linecap="round" stroke-dasharray="5 4"/>' +
        '<path d="M198 92 C224 76 246 56 252 34" stroke="' + C + '" stroke-width="4" fill="none" stroke-linecap="round"/>' +
        arrowHead(251, 37, 0.25, -1, 11, C) +
        ball(212, 86, 6);
      pts.forEach(function (p, i) {
        o += '<circle cx="' + p[0] + '" cy="' + p[1] + '" r="8" fill="' + INK + '" stroke="#fff" stroke-width="1.5"/>' + txt(p[0], p[1] + 3.6, i + 1, 10, '#fff') +
          txt(p[3], p[4], p[2], 7.5, INK, p[5]);
      });
      return o;
    },
    /* Hauteur d'impact en coup droit : le tronc s'incline, la tête de raquette se règle par rapport à la main */
    impact3: function () {
      var fig = function (cx, lean, sh, hand, tip, label, sub) {
        var neck = [cx + lean, 62];
        var o = '<path d="M' + cx + ' 110 L' + (cx - 10) + ' 130 M' + cx + ' 110 L' + (cx + 10) + ' 130" stroke="' + INK + '" stroke-width="6" fill="none" stroke-linecap="round"/>' +
          '<line x1="' + cx + '" y1="110" x2="' + neck[0] + '" y2="' + neck[1] + '" stroke="' + INK + '" stroke-width="7" stroke-linecap="round"/>' +
          '<line x1="' + sh[0] + '" y1="' + sh[1] + '" x2="' + sh[2] + '" y2="' + sh[3] + '" stroke="' + INK + '" stroke-width="6" stroke-linecap="round"/>' +
          head(neck[0] + lean * 0.3, 46, 8) +
          '<line x1="' + sh[2] + '" y1="' + sh[3] + '" x2="' + hand[0] + '" y2="' + hand[1] + '" stroke="' + INK + '" stroke-width="5" stroke-linecap="round"/>' +
          '<line x1="' + hand[0] + '" y1="' + hand[1] + '" x2="' + tip[0] + '" y2="' + tip[1] + '" stroke="' + C + '" stroke-width="5" stroke-linecap="round"/>' +
          '<ellipse cx="' + tip[0] + '" cy="' + tip[1] + '" rx="8" ry="11" fill="#fff" stroke="' + C + '" stroke-width="4" transform="rotate(' +
            (Math.atan2(tip[1] - hand[1], tip[0] - hand[0]) * 180 / Math.PI + 90) + ' ' + tip[0] + ' ' + tip[1] + ')"/>' +
          '<circle cx="' + hand[0] + '" cy="' + hand[1] + '" r="3.4" fill="' + INK + '"/>';
        return o + txt(cx + 12, 14, label, 9.5, INK) + txt(cx + 12, 25, sub, 7.4, INK, 'middle', 600);
      };
      return '<line x1="10" y1="132" x2="290" y2="132" stroke="' + CS + '" stroke-width="6" stroke-linecap="round"/>' +
        fig(36, 8, [28, 58, 60, 68], [70, 92], [84, 112], 'BALLE BASSE', 'tête sous la main') +
        fig(136, 0, [120, 62, 152, 62], [170, 78], [194, 78], 'MI-HAUTEUR', 'tête à l’horizontale') +
        fig(236, -6, [214, 68, 246, 56], [262, 50], [278, 32], 'BALLE HAUTE', 'tête au-dessus');
    },
    /* Les 8 facettes du manche (droitier, manche vu depuis le bas) : prises de coup droit */
    grips: function () {
      var cx = 78, cy = 76, R = 50, o = '', i;
      var corner = function (k) { var a = (-112.5 + 45 * k) * Math.PI / 180; return [cx + R * Math.cos(a), cy + R * Math.sin(a)]; };
      var d = '';
      for (i = 0; i < 8; i++) { var c = corner(i); d += (i ? 'L' : 'M') + c[0].toFixed(1) + ' ' + c[1].toFixed(1); }
      o += '<path d="' + d + 'Z" fill="#fff" stroke="' + INK + '" stroke-width="4" stroke-linejoin="round"/>';
      for (i = 0; i < 8; i++) {
        var a = (-90 + 45 * i) * Math.PI / 180, on = i >= 2 && i <= 4;
        var c1 = corner(i), c2 = corner(i + 1);
        if (on) o += '<line x1="' + c1[0].toFixed(1) + '" y1="' + c1[1].toFixed(1) + '" x2="' + c2[0].toFixed(1) + '" y2="' + c2[1].toFixed(1) + '" stroke="' + C + '" stroke-width="8" stroke-linecap="round"/>';
        o += txt((cx + (R - 15) * Math.cos(a)).toFixed(1), (cy + (R - 15) * Math.sin(a) + 4.5).toFixed(1), i + 1, on ? 13 : 10, on ? INK : '#8A8D96');
      }
      var row = function (y, n, name, sub) {
        return '<circle cx="158" cy="' + y + '" r="9" fill="' + C + '"/>' + txt(158, y + 4, n, 11, 'var(--on)') +
          txt(174, y + 1, name, 10.5, INK, 'start') + txt(174, y + 12, sub, 7.4, INK, 'start', 600);
      };
      return o + row(30, '3', 'EASTERN', 'plus de vitesse vers l’avant') + row(72, '4', 'SEMI-WESTERN', 'le compromis') + row(114, '5', 'WESTERN', 'plus de vitesse vers le haut');
    },
    runner: function () {
      var lines = '';
      [[212, 64, 266, 52], [216, 86, 270, 86], [212, 108, 266, 120]].forEach(function (l) {
        lines += '<line x1="' + l[0] + '" y1="' + l[1] + '" x2="' + l[2] + '" y2="' + l[3] + '" stroke="' + CS + '" stroke-width="6" stroke-linecap="round"/>';
      });
      return lines + ground(138) +
        head(172, 34, 11) +
        limb('M164 48 C156 64 148 80 140 94') +
        limb('M140 94 L170 102 L162 130 M140 94 C130 108 120 120 108 128') +
        limb('M160 56 L188 64 L200 50') +
        limb('M160 56 L132 66') +
        racket(116, 84, 48);
    }
  };

  AC.picto = function (name) {
    var fn = PICTOS[name];
    return '<svg class="diagram picto" viewBox="0 0 300 150" aria-hidden="true">' + (fn ? fn() : '') + '</svg>';
  };
})();
