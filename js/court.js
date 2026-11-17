/* ==========================================================================
   Assistant Coach — Schémas de terrain (SVG)
   Coordonnées en mètres, les mêmes dans les deux orientations :
     x : 0 (fond du joueur 1) → 23,77 (fond du joueur 2), filet à 11,885
     y : 0 → 10,97 dans la largeur (lignes de simple à 1,37 et 9,6)
   Orientation horizontale (par défaut) : joueur 1 à gauche, y vers le bas.
   Orientation verticale (orient: 'v' ou panels: […]) : joueur 1 en bas,
     joueur 2 en haut ; le côté égalité du joueur 1 (y grand) est à droite.
   Schéma d'appuis (frames: […]) : vignettes de pieds vus de dessus, filet en haut.
   Format des schémas : voir README.md
   ========================================================================== */
window.AC = window.AC || {};

(function () {
  var W = 23.77, H = 10.97, N = 11.885, SL = 5.485, SR = 18.285, T = 1.37, B = 9.6, M = 5.485;
  var INK = 'var(--ink)';

  var ZONES = {
    'L': [0, T, N, B], 'R': [N, T, W, B],
    'L.top': [0, T, N, M], 'L.bot': [0, M, N, B],
    'R.top': [N, T, W, M], 'R.bot': [N, M, W, B],
    'L.boxes': [SL, T, N, B], 'R.boxes': [N, T, SR, B],
    'L.box.top': [SL, T, N, M], 'L.box.bot': [SL, M, N, B],
    'R.box.top': [N, T, SR, M], 'R.box.bot': [N, M, SR, B],
    'L.back': [0, T, SL, B], 'R.back': [SR, T, W, B],
    'L.back.top': [0, T, SL, M], 'L.back.bot': [0, M, SL, B],
    'R.back.top': [SR, T, W, M], 'R.back.bot': [SR, M, W, B],
    'L.alley.top': [0, 0, N, T], 'L.alley.bot': [0, B, N, H],
    'R.alley.top': [N, 0, W, T], 'R.alley.bot': [N, B, W, H],
    'court': [0, T, W, B], 'full': [0, 0, W, H],
    /* Double (couloirs compris) */
    'L.dbl': [0, 0, N, H], 'R.dbl': [N, 0, W, H],
    'L.dbl.top': [0, 0, N, M], 'L.dbl.bot': [0, M, N, H],
    'R.dbl.top': [N, 0, W, M], 'R.dbl.bot': [N, M, W, H]
  };

  var FILLS = {
    soft: 'var(--cs)',
    strong: 'var(--c)',
    grey: '#C8CBD2',
    dark: '#55575F'
  };

  function r2(v) { return Math.round(v * 100) / 100; }
  function esc(s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;'); }

  /* Repère de dessin : projection des mètres vers les unités SVG.
     k = facteur d'épaisseur des traits (le terrain vertical est plus petit). */
  function frame(vertical) {
    var S = vertical ? 6.4 : 10;
    return {
      v: !!vertical, S: S, k: vertical ? 0.8 : 1,
      pt: vertical
        ? function (x, y) { return [r2(y * S), r2((W - x) * S)]; }
        : function (x, y) { return [r2(x * S), r2(y * S)]; }
    };
  }

  function line(F, x1, y1, x2, y2, w, color, dash) {
    var a = F.pt(x1, y1), b = F.pt(x2, y2);
    return '<line x1="' + a[0] + '" y1="' + a[1] + '" x2="' + b[0] + '" y2="' + b[1] + '" stroke="' + (color || INK) +
      '" stroke-width="' + r2((w || 2) * F.k) + '"' + (dash ? ' stroke-dasharray="' + dash + '"' : '') + ' stroke-linecap="round"/>';
  }

  function box(F, r, attrs) {
    var a = F.pt(r[0], r[1]), b = F.pt(r[2], r[3]);
    var x = Math.min(a[0], b[0]), y = Math.min(a[1], b[1]);
    return '<rect x="' + x + '" y="' + y + '" width="' + r2(Math.abs(b[0] - a[0])) + '" height="' + r2(Math.abs(b[1] - a[1])) + '" ' + attrs + '/>';
  }

  function courtLines(F) {
    var o = '';
    o += box(F, [0, 0, W, H], 'fill="none" stroke="' + INK + '" stroke-width="' + r2(2.8 * F.k) + '"');
    o += line(F, 0, T, W, T, 2.1) + line(F, 0, B, W, B, 2.1);
    o += line(F, SL, T, SL, B, 2.1) + line(F, SR, T, SR, B, 2.1);
    o += line(F, SL, M, SR, M, 2.1);
    o += line(F, 0, M, 0.35, M, 2.1) + line(F, W, M, W - 0.35, M, 2.1);
    o += line(F, N, -0.55, N, H + 0.55, 3.2);
    return o;
  }

  function colorOf(c) {
    if (c === 'strong') return 'var(--c)';
    if (c === 'deep') return 'var(--cd)';
    if (c === 'ink') return INK;
    return c || INK;
  }

  /* Point et tangente sur un segment (droit ou en arc), en unités SVG.
     arc (en mètres) : flèche de la courbe ; un arc positif bombe vers le bas de l'image. */
  function segGeom(F, a, b, arc) {
    var A = F.pt(a[0], a[1]), Bp = F.pt(b[0], b[1]);
    var ax = A[0], ay = A[1], bx = Bp[0], by = Bp[1];
    if (!arc) {
      return {
        d: 'M' + ax + ' ' + ay + 'L' + bx + ' ' + by,
        at: function (t) { return [ax + (bx - ax) * t, ay + (by - ay) * t, bx - ax, by - ay]; }
      };
    }
    var dx = bx - ax, dy = by - ay, len = Math.sqrt(dx * dx + dy * dy) || 1;
    var nx = -dy / len, ny = dx / len;
    if (ny < 0 || (ny === 0 && nx < 0)) { nx = -nx; ny = -ny; }
    var cx = r2((ax + bx) / 2 + nx * arc * F.S), cy = r2((ay + by) / 2 + ny * arc * F.S);
    return {
      d: 'M' + ax + ' ' + ay + 'Q' + cx + ' ' + cy + ' ' + bx + ' ' + by,
      at: function (t) {
        var u = 1 - t;
        return [
          u * u * ax + 2 * u * t * cx + t * t * bx,
          u * u * ay + 2 * u * t * cy + t * t * by,
          2 * u * (cx - ax) + 2 * t * (bx - cx),
          2 * u * (cy - ay) + 2 * t * (by - cy)
        ];
      }
    };
  }

  function chevron(p, color, w, size) {
    var l = Math.sqrt(p[2] * p[2] + p[3] * p[3]) || 1;
    var ux = p[2] / l, uy = p[3] / l, s = size || 5.2;
    var x = p[0] + ux * s * 0.5, y = p[1] + uy * s * 0.5;
    var c = Math.cos(0.6), si = Math.sin(0.6);
    var l1 = [r2(x - s * (ux * c - uy * si)), r2(y - s * (uy * c + ux * si))];
    var l2 = [r2(x - s * (ux * c + uy * si)), r2(y - s * (uy * c - ux * si))];
    return '<path d="M' + l1.join(' ') + 'L' + r2(x) + ' ' + r2(y) + 'L' + l2.join(' ') + '" stroke="' + color + '" stroke-width="' + w + '" fill="none" stroke-linecap="round" stroke-linejoin="round"/>';
  }

  /* Frappe : { p: [[x, y], …], kind, tone, arc, n }
     n (facultatif) : numéro d'ordre posé sur la trajectoire (pastille), à la position at (0 à 1). */
  function shot(F, s) {
    var kind = s.kind || 'shot';
    var pts = s.p;
    var isMove = kind === 'move' || kind === 'move2';
    var color = isMove ? INK : (s.tone === 'deep' ? 'var(--cd)' : (s.tone === 'ink' ? INK : 'var(--shot, var(--c))'));
    var w = r2((isMove ? 1.9 : 2.5) * (F.v ? 0.9 : 1));
    var dash = (isMove || kind === 'throw') ? ' stroke-dasharray="4.5 4"' : '';
    var o = '';
    for (var i = 0; i < pts.length - 1; i++) {
      var g = segGeom(F, pts[i], pts[i + 1], s.arc);
      o += '<path d="' + g.d + '" stroke="' + color + '" stroke-width="' + w + '" fill="none" stroke-linecap="round"' + dash + '/>';
      if (kind === 'shot') o += chevron(g.at(s.n != null ? 0.86 : 0.56), color, w);
      if (kind === 'rally') {
        o += chevron(g.at(0.3), color, w);
        var back = g.at(0.7);
        o += chevron([back[0], back[1], -back[2], -back[3]], color, w);
      }
      if (i === pts.length - 2 && (kind === 'move' || kind === 'move2' || kind === 'throw')) {
        o += chevron(g.at(1), color, w, 4.6);
      }
      if (i === 0 && kind === 'move2') {
        var st = g.at(0);
        o += chevron([st[0], st[1], -st[2], -st[3]], color, w, 4.6);
      }
      if (i === 0 && s.n != null) {
        var m = g.at(s.at == null ? 0.5 : s.at);
        o += '<circle cx="' + r2(m[0]) + '" cy="' + r2(m[1]) + '" r="6.4" fill="' + INK + '" stroke="#fff" stroke-width="1.4"/>' +
          '<text x="' + r2(m[0]) + '" y="' + r2(m[1] + 2.9) + '" text-anchor="middle" font-size="8" font-weight="800" fill="#fff" class="dg-num">' + esc(s.n) + '</text>';
      }
    }
    return o;
  }

  /* Joueur : [x, y, 1 = plein | 2 = vide, code facultatif]
     Code dans le rond : J1…J4 (joueurs), J (joueur seul), C (coach), S / R (serveur / relanceur),
     P (partenaire), A / D (attaquant / défenseur), ou un numéro d'ordre (1, 2, 3…). */
  function player(F, p) {
    var c = F.pt(p[0], p[1]), x = c[0], y = c[1], t = p[2] || 1, num = p[3] == null ? '' : String(p[3]);
    var wide = num.length > 1;
    var r = num ? (wide ? 8.4 : 7.2) : 6.3;
    var fill = t === 1 ? 'var(--c)' : '#fff';
    var o = '<circle cx="' + x + '" cy="' + y + '" r="' + r + '" fill="' + fill + '" stroke="' + INK + '" stroke-width="2.3"/>';
    if (num) {
      var fs = wide ? 7.4 : 8.6;
      o += '<text x="' + x + '" y="' + r2(y + fs * 0.36) + '" text-anchor="middle" font-size="' + fs + '" font-weight="800"' +
        (wide ? ' letter-spacing="-0.3"' : '') + ' fill="' + (t === 1 ? 'var(--on)' : INK) + '" class="dg-num">' + esc(num) + '</text>';
    }
    return o;
  }

  function mark(F, m) {
    var type = m[0], c = F.pt(m[1], m[2]), x = c[0], y = c[1];
    switch (type) {
      case 'cone':
        return '<path d="M' + x + ' ' + (y - 5) + 'L' + (x + 4.4) + ' ' + (y + 3.6) + 'L' + (x - 4.4) + ' ' + (y + 3.6) + 'Z" fill="#FF7A1A" stroke="' + INK + '" stroke-width="1.4" stroke-linejoin="round"/>';
      case 'ring':
        return '<circle cx="' + x + '" cy="' + y + '" r="3.6" fill="#fff" stroke="' + INK + '" stroke-width="1.6"/>';
      case 'basket':
        return '<g><rect x="' + (x - 5.5) + '" y="' + (y - 4.5) + '" width="11" height="9" rx="2" fill="#fff" stroke="' + INK + '" stroke-width="1.6"/>' +
          '<circle cx="' + (x - 2.4) + '" cy="' + (y - 0.6) + '" r="1.7" fill="#D8EA4A" stroke="' + INK + '" stroke-width=".6"/>' +
          '<circle cx="' + (x + 1.2) + '" cy="' + (y - 1.4) + '" r="1.7" fill="#D8EA4A" stroke="' + INK + '" stroke-width=".6"/>' +
          '<circle cx="' + (x - 0.4) + '" cy="' + (y + 1.9) + '" r="1.7" fill="#D8EA4A" stroke="' + INK + '" stroke-width=".6"/></g>';
      case 'dot':
        return '<circle cx="' + x + '" cy="' + y + '" r="2.9" fill="var(--c)" stroke="' + INK + '" stroke-width="1.3"/>';
      case 'x':
        return '<path d="M' + (x - 4) + ' ' + (y - 4) + 'L' + (x + 4) + ' ' + (y + 4) + 'M' + (x + 4) + ' ' + (y - 4) + 'L' + (x - 4) + ' ' + (y + 4) + '" stroke="' + INK + '" stroke-width="2.4" stroke-linecap="round"/>';
      default:
        return '';
    }
  }

  /* Étiquette : [x, y, texte, style]
     Styles : plain, plainInk, plainWhite, plainStrong, tag, dark, bubble,
              big (grande lettre de couloir ou de zone), bigWhite. */
  function label(F, l) {
    var c = F.pt(l[0], l[1]), x = c[0], y = c[1], text = String(l[2]), style = l[3] || 'plain';
    var big = style === 'big' || style === 'bigWhite';
    var fs = big ? 9.6 : 7.2;
    var w = text.length * fs * 0.62 + 9, h = 12.5;
    var t = function (fill, extra) {
      return '<text x="' + x + '" y="' + r2(y + fs * 0.36) + '" text-anchor="middle" font-size="' + fs + '" font-weight="' + (big ? 800 : 700) + '" fill="' + fill + '"' + (extra || '') +
        ' class="dg-txt">' + esc(text) + '</text>';
    };
    switch (style) {
      case 'tag':
        return '<rect x="' + r2(x - w / 2) + '" y="' + r2(y - h / 2) + '" width="' + r2(w) + '" height="' + h + '" rx="2.5" fill="var(--c)"/>' + t('var(--on)');
      case 'dark':
        return '<rect x="' + r2(x - w / 2) + '" y="' + r2(y - h / 2) + '" width="' + r2(w) + '" height="' + h + '" rx="2.5" fill="' + INK + '"/>' + t('#fff');
      case 'bubble':
        return '<path d="M' + r2(x - w / 2) + ' ' + r2(y - h / 2) + 'h' + r2(w) + 'v' + h + 'h' + r2(-(w / 2 - 6)) + 'l-6 5v-5h' + r2(-(w / 2)) + 'Z" fill="#fff" stroke="var(--cs-line)" stroke-width="1.6" stroke-linejoin="round"/>' + t(INK);
      case 'plainWhite':
      case 'bigWhite':
        return t('#fff');
      case 'plainStrong':
        return t('var(--cd)');
      case 'big':
        return t(INK, ' opacity=".62"');
      default:
        return t(INK);
    }
  }

  /* Contenu d'un terrain (sans la balise svg) */
  function content(dg, F) {
    var o = '';
    (dg.zones || []).forEach(function (z) {
      var fill = FILLS[z[1]] || FILLS.soft;
      /* Polygone : [[x1, y1], [x2, y2], [x3, y3]…] (triangles du X, etc.) */
      if (Array.isArray(z[0]) && Array.isArray(z[0][0])) {
        o += '<polygon points="' + z[0].map(function (p) { return F.pt(p[0], p[1]).join(','); }).join(' ') + '" fill="' + fill + '"/>';
        return;
      }
      var r = typeof z[0] === 'string' ? ZONES[z[0]] : z[0];
      if (!r) return;
      o += box(F, r, 'fill="' + fill + '"');
    });
    o += courtLines(F);
    (dg.lines || []).forEach(function (l) {
      o += line(F, l.p[0][0], l.p[0][1], l.p[1][0], l.p[1][1], l.w || 1.8, colorOf(l.color), l.dash ? '4 3.5' : '');
    });
    if (dg.hole) {
      var hc = F.pt(dg.hole[0], dg.hole[1]);
      o += '<circle cx="' + hc[0] + '" cy="' + hc[1] + '" r="' + r2(dg.hole[2] * F.S) + '" fill="' + INK + '" stroke="var(--c)" stroke-width="2.6"/>';
    }
    (dg.marks || []).forEach(function (m) { o += mark(F, m); });
    (dg.shots || []).forEach(function (s) { o += shot(F, s); });
    (dg.players || []).forEach(function (p) { o += player(F, p); });
    (dg.labels || []).forEach(function (l) { o += label(F, l); });
    return o;
  }

  /* Dimensions d'un panneau vertical (unités SVG) */
  var PW = 124, P_LEFT = 27, P_TOP = 24, P_COURT = r2(W * 6.4), P_BOTTOM = 24, CAP_LINE = 10;

  function vertical(panels) {
    var F = frame(true);
    var lines = 0;
    panels.forEach(function (p) {
      var c = p.caption ? (Array.isArray(p.caption) ? p.caption.length : 1) : 0;
      if (c > lines) lines = c;
    });
    var PH = P_TOP + P_COURT + P_BOTTOM + (lines ? 4 + lines * CAP_LINE : 0);
    var o = '<svg class="diagram court diagram--v diagram--v' + panels.length + '" viewBox="0 0 ' + (PW * panels.length) + ' ' + r2(PH) + '" aria-hidden="true">';
    panels.forEach(function (p, i) {
      o += '<g transform="translate(' + (i * PW + P_LEFT) + ' ' + P_TOP + ')">' + content(p, F);
      if (p.caption) {
        (Array.isArray(p.caption) ? p.caption : [p.caption]).forEach(function (txt, j) {
          o += '<text x="' + r2(H * F.S / 2) + '" y="' + r2(P_COURT + P_BOTTOM + 9 + j * CAP_LINE) + '" text-anchor="middle" font-size="7.6" font-weight="800" fill="' + INK + '" class="dg-txt">' + esc(txt) + '</text>';
        });
      }
      o += '</g>';
    });
    return o + '</svg>';
  }

  /* ------------------------------------------------------------------
     Schéma d'appuis : une vignette par temps du geste, pieds vus de dessus, filet en haut.
     diagram: { frames: [ { caption, feet, arrows, cg, ball, labels } ], note }
     Repère d'une vignette : 100 × 100 (environ 2 m de côté), x vers la droite, y vers le bas.
       feet   : [x, y, angle, lettre, état]   angle 0 = pointe vers le filet, 90 = vers la droite
                état : 'on' (appui chargé, plein) | 'light' (posé, clair) | 'air' (en l'air, pointillé)
       arrows : { p: [[x1, y1], [x2, y2]], kind: 'push' | 'move' | 'ball' | 'turn', arc }
                push = le corps est poussé ; move = trajet d'un pied ; ball = balle ; turn = rotation
       cg     : [x, y] centre de gravité ; ball : [x, y] ; labels : [x, y, texte, style]
       lines  : [x1, y1, x2, y2, pointillé ?] (ligne au sol)
     ------------------------------------------------------------------ */
  var FR_W = 306, FR_MARGIN = 4, FR_GAP = 6, FR_TOP = 3, FR_H = 98, FR_MAXW = 118;

  function foot(F, f) {
    var c = F.pt(f[0], f[1]), state = f[4] || 'on', letter = f[3] || '';
    var shape = 'M0 -12.5C4.6 -12.5 6.4 -8.4 6 -3.4C5.6 1.6 5 4.4 4.8 7.2C4.5 10.6 3 12.5 0 12.5C-3 12.5 -4.5 10.6 -4.8 7.2C-5 4.4 -5.6 1.6 -6 -3.4C-6.4 -8.4 -4.6 -12.5 0 -12.5Z';
    var paint = state === 'on' ? 'fill="var(--c)" stroke="' + INK + '" stroke-width="1.7"'
      : state === 'light' ? 'fill="#fff" stroke="' + INK + '" stroke-width="1.7"'
      : 'fill="#fff" fill-opacity=".55" stroke="' + INK + '" stroke-width="1.3" stroke-dasharray="2.6 2.3"';
    var o = '<path transform="translate(' + c[0] + ' ' + c[1] + ') rotate(' + (f[2] || 0) + ')" d="' + shape + '" ' + paint + ' stroke-linejoin="round"/>';
    if (letter) {
      o += '<text x="' + c[0] + '" y="' + r2(c[1] + 2.7) + '" text-anchor="middle" font-size="7.4" font-weight="800" fill="' +
        (state === 'on' ? 'var(--on)' : INK) + '" class="dg-num">' + esc(letter) + '</text>';
    }
    return o;
  }

  function footArrow(F, a) {
    var kind = a.kind || 'move';
    var g = segGeom(F, a.p[0], a.p[1], a.arc);
    var color = kind === 'ball' ? 'var(--cd)' : INK;
    var w = kind === 'push' ? 3.1 : (kind === 'ball' ? 1.9 : 1.7);
    var dash = (kind === 'move' || kind === 'turn') ? ' stroke-dasharray="3.4 3"' : '';
    var o = '<path d="' + g.d + '" stroke="' + color + '" stroke-width="' + w + '" fill="none" stroke-linecap="round"' + dash + '/>';
    o += chevron(g.at(1), color, kind === 'push' ? 2.9 : w, kind === 'push' ? 6.2 : 4.6);
    return o;
  }

  function feetFrames(list) {
    var n = list.length;
    var fw = Math.min(FR_MAXW, (FR_W - 2 * FR_MARGIN - FR_GAP * (n - 1)) / n);
    var x0 = (FR_W - (fw * n + FR_GAP * (n - 1))) / 2;
    var lines = 0;
    list.forEach(function (f) {
      var c = f.caption ? (Array.isArray(f.caption) ? f.caption.length : 1) : 0;
      if (c > lines) lines = c;
    });
    /* Légendes : plus petites quand il y a 4 vignettes (moins de place par vignette) */
    var capSize = n > 3 ? 6.3 : (n === 3 ? 7.2 : 7.6), capLine = capSize + 2.3;
    var total = r2(FR_TOP + FR_H + (lines ? 5 + lines * capLine : 2));
    var o = '<svg class="diagram feet" viewBox="0 0 ' + FR_W + ' ' + total + '" aria-hidden="true">';
    list.forEach(function (f, i) {
      var ox = x0 + i * (fw + FR_GAP), oy = FR_TOP;
      var F = { v: false, S: 1, k: 1, pt: function (x, y) { return [r2(ox + x * fw / 100), r2(oy + y * FR_H / 100)]; } };
      o += '<rect x="' + r2(ox) + '" y="' + oy + '" width="' + r2(fw) + '" height="' + FR_H + '" rx="7" fill="var(--cs)"/>';
      (f.lines || []).forEach(function (l) { o += line(F, l[0], l[1], l[2], l[3], 1.6, INK, l[4] ? '3 3' : ''); });
      var arrows = f.arrows || [];
      arrows.forEach(function (a) { if (a.kind === 'ball') o += footArrow(F, a); });
      (f.feet || []).forEach(function (ft) { o += foot(F, ft); });
      arrows.forEach(function (a) { if (a.kind !== 'ball') o += footArrow(F, a); });
      if (f.cg) {
        var g = F.pt(f.cg[0], f.cg[1]);
        o += '<rect x="' + r2(g[0] - 8) + '" y="' + r2(g[1] - 5) + '" width="16" height="10" rx="5" fill="' + INK + '"/>' +
          '<text x="' + g[0] + '" y="' + r2(g[1] + 2.3) + '" text-anchor="middle" font-size="6.2" font-weight="800" fill="#fff" class="dg-num">CG</text>';
      }
      if (f.ball) {
        var b = F.pt(f.ball[0], f.ball[1]);
        o += '<circle cx="' + b[0] + '" cy="' + b[1] + '" r="3.7" fill="#D8EA4A" stroke="' + INK + '" stroke-width="1"/>';
      }
      (f.labels || []).forEach(function (l) { o += label(F, l); });
      /* Numéro de la vignette */
      o += '<circle cx="' + r2(ox + 9.5) + '" cy="' + (oy + 9.5) + '" r="6" fill="' + INK + '"/>' +
        '<text x="' + r2(ox + 9.5) + '" y="' + (oy + 12.3) + '" text-anchor="middle" font-size="7.6" font-weight="800" fill="#fff" class="dg-num">' + (i + 1) + '</text>';
      if (f.caption) {
        (Array.isArray(f.caption) ? f.caption : [f.caption]).forEach(function (txt, j) {
          o += '<text x="' + r2(ox + fw / 2) + '" y="' + r2(oy + FR_H + 4 + capSize + j * capLine) + '" text-anchor="middle" font-size="' + capSize + '" font-weight="800" fill="' + INK + '" class="dg-txt">' + esc(txt) + '</text>';
        });
      }
    });
    return o + '</svg>';
  }

  AC.court = function (dg) {
    if (!dg) return '';
    if (dg.picto) return AC.picto(dg.picto);
    if (dg.frames) return feetFrames(dg.frames);
    if (dg.panels) return vertical(dg.panels);
    if (dg.orient === 'v') return vertical([dg]);

    var F = frame(false);
    var o = '<svg class="diagram court" viewBox="-34 -24 306 158" aria-hidden="true">' + content(dg, F);
    if (dg.names) {
      o += '<text x="-30" y="-12" font-size="8" font-weight="800" fill="' + INK + '" class="dg-name">' + esc(dg.names[0]) + '</text>';
      o += '<text x="268" y="-12" font-size="8" font-weight="800" fill="' + INK + '" text-anchor="end" class="dg-name">' + esc(dg.names[1]) + '</text>';
    }
    if (dg.score) {
      var nx = r2(N * 10);
      o += '<rect x="' + (nx - 19) + '" y="-23" width="38" height="14" rx="2.5" fill="var(--c)"/>';
      o += '<text x="' + nx + '" y="-13" text-anchor="middle" font-size="8" font-weight="800" fill="var(--on)" class="dg-num">' + esc(dg.score) + '</text>';
    }
    o += '</svg>';
    return o;
  };

  /* Tous les joueurs d'un schéma, panneaux compris (pour la légende des codes) */
  AC.courtPlayers = function (dg) {
    if (!dg) return [];
    var list = (dg.players || []).slice();
    (dg.panels || []).forEach(function (p) { list = list.concat(p.players || []); });
    return list;
  };
})();
