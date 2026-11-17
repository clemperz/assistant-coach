/* ==========================================================================
   Assistant Coach — Générateur de séances
   - tirage pondéré des cartes (objectifs, matériel, joueurs, diversité)
   - répartition du temps entre les blocs
   - bilan de séance (service, progression, matériel, objectifs)
   ========================================================================== */
window.AC = window.AC || {};

(function () {
  var Gen = AC.Gen = {};

  Gen.defaultParams = function () {
    var preset = AC.PRESETS[0];
    return {
      duration: 60,
      players: 2,
      goals: [],
      equipment: { plots: true, lignes: true, chrono: true },
      preset: preset.id,
      counts: Object.assign({}, preset.counts),
      focus: true,
      format: 'simple'      // simple | double
    };
  };

  /* ---------------- Filtrage ---------------- */
  function fitsEquipment(card, eq) {
    return (card.equipment || []).every(function (k) {
      return AC.EQUIPMENT[k] && AC.EQUIPMENT[k].always ? true : !!eq[k];
    });
  }
  function fitsPlayers(card, n) {
    return !card.players || n >= card.players[0];
  }
  /* Format : en simple, les cartes de double sont écartées */
  function fitsFormat(card, params) {
    return params.format === 'double' || card.format !== 'double';
  }
  Gen.fitsFormat = fitsFormat;
  Gen.fits = function (card, params) {
    return fitsFormat(card, params) && fitsEquipment(card, params.equipment) && fitsPlayers(card, params.players);
  };

  /* ---------------- Score d'une carte ---------------- */
  function tagsOf(card) { return (card.coups || []).concat(card.axes || []); }

  Gen.goalMatch = function (card, goals) {
    if (!goals || !goals.length) return 0;
    return tagsOf(card).filter(function (t) { return goals.indexOf(t) !== -1; }).length;
  };

  /* Poids de tirage d'une carte (plus il est grand, plus elle a de chances de sortir) */
  function weightOf(card, params, covered) {
    var goals = params.goals || [];
    var g = Gen.goalMatch(card, goals);
    var w = goals.length ? (g ? Math.pow(1 + g * 2, 2) : 0.35) : 1;
    /* Paquet nombreux (jeu de jambes, coups de fond) : poids réduit, sauf si la carte répond à un objectif
       par l'un de ses thèmes de travail. Un simple coup en commun (« Coup droit ») ne suffit pas : sinon
       ces paquets prendraient à eux seuls la majorité des tirages de leur type. */
    if (card.drawWeight != null) {
      var byTheme = (card.axes || []).some(function (t) { return goals.indexOf(t) !== -1; });
      if (!byTheme) w *= card.drawWeight;
    }
    /* Diversité : coups déjà travaillés dans la séance → léger malus */
    var repeat = (card.coups || []).filter(function (c) { return goals.indexOf(c) === -1 && covered[c]; }).length;
    w *= Math.max(0.55, 1 - 0.15 * repeat);
    if (card.players && params.players > card.players[1]) w *= 0.6;
    /* Séance de double : les cartes de double sont favorisées */
    if (params.format === 'double' && card.format === 'double') w *= 8;
    /* Carte trop longue pour la part de temps disponible (ex. un set dans une séance d'1 h) */
    if (fair && card.duration && card.duration[0] > fair * 1.4) w *= 0.03;
    return w;
  }
  var fair = 0;

  /* Part de temps « équitable » d'une carte de ce thème dans la séance */
  Gen.fairShare = function (theme, duration, counts) {
    var sumW = AC.THEME_ORDER.reduce(function (a, t) { return a + (counts[t] || 0) * AC.THEMES[t].weight; }, 0);
    return sumW ? duration * AC.THEMES[theme].weight / sumW : duration;
  };

  function weightedPick(list, weightFn) {
    var weights = list.map(weightFn);
    var total = weights.reduce(function (a, b) { return a + b; }, 0);
    if (!total) return list[Math.floor(Math.random() * list.length)];
    var r = Math.random() * total;
    for (var i = 0; i < list.length; i++) {
      r -= weights[i];
      if (r <= 0) return list[i];
    }
    return list[list.length - 1];
  }

  function coveredFrom(blocks) {
    var covered = {};
    blocks.forEach(function (b) {
      var c = AC.DB.get(b.cardId);
      if (!c) return;
      (c.coups || []).forEach(function (k) { covered[k] = (covered[k] || 0) + 1; });
    });
    return covered;
  }

  /* Tire une carte d'un thème, en évitant celles déjà utilisées */
  Gen.pick = function (theme, params, usedIds, covered) {
    fair = Gen.fairShare(theme, params.duration, params.counts || {});
    var pool = AC.DB.byTheme(theme).filter(function (c) { return usedIds.indexOf(c.id) === -1 && fitsFormat(c, params); });
    var fitting = pool.filter(function (c) { return Gen.fits(c, params); });
    var candidates = fitting.length ? fitting : pool.filter(function (c) { return fitsPlayers(c, params.players); });
    if (!candidates.length) return null;
    return weightedPick(candidates, function (c) { return weightOf(c, params, covered || {}); });
  };

  /* Focus : tirage pondéré par les objectifs de la séance (champ axes des cartes Focus) */
  Gen.pickFocus = function (excludeId, goals, format) {
    var params = { format: format || 'simple' };
    var list = AC.DB.focus().filter(function (c) { return c.id !== excludeId && fitsFormat(c, params); });
    if (!list.length) return null;
    return weightedPick(list, function (c) {
      var g = Gen.goalMatch(c, goals || []);
      var w = g ? 1 + g * 6 : 1;
      return (params.format === 'double' && c.format === 'double') ? w * 4 : w;
    });
  };

  function newBlock(card, theme) {
    return {
      uid: AC.uid('b'),
      cardId: card ? card.id : null,
      theme: theme,
      minutes: card ? card.duration[1] : 0,
      locked: false
    };
  }
  Gen.newBlock = newBlock;

  /* ---------------- Génération complète ---------------- */
  Gen.generate = function (params, previous) {
    var keep = previous ? previous.blocks.filter(function (b) { return b.locked && b.cardId; }) : [];
    var blocks = [];
    var used = keep.map(function (b) { return b.cardId; });

    AC.THEME_ORDER.forEach(function (theme) {
      var count = params.counts[theme] || 0;
      var lockedHere = keep.filter(function (b) { return b.theme === theme; });
      lockedHere.forEach(function (b) { blocks.push(b); });
      for (var i = lockedHere.length; i < count; i++) {
        var card = Gen.pick(theme, params, used, coveredFrom(blocks));
        if (!card) break;
        used.push(card.id);
        blocks.push(newBlock(card, theme));
      }
    });
    /* Cartes verrouillées d'un thème retiré de la structure : on les garde */
    keep.forEach(function (b) { if (blocks.indexOf(b) === -1) blocks.push(b); });

    var focusId = null;
    if (params.focus) {
      var keepFocus = previous && previous.focusLocked && previous.focusId;
      focusId = keepFocus ? previous.focusId : (Gen.pickFocus(null, params.goals, params.format) || {}).id || null;
    }

    var session = {
      id: previous && previous.id && !previous.savedAt ? previous.id : AC.uid('s'),
      name: previous && previous.name && previous.autoNamed === false ? previous.name : Gen.autoName(params),
      autoNamed: !(previous && previous.autoNamed === false),
      date: new Date().toISOString(),
      duration: params.duration,
      params: JSON.parse(JSON.stringify(params)),
      focusId: focusId,
      focusLocked: previous ? !!previous.focusLocked : false,
      blocks: blocks,
      notes: previous ? previous.notes || '' : ''
    };
    Gen.allocate(session);
    return session;
  };

  Gen.autoName = function (params) {
    var g = params.goals.slice(0, 2).map(function (k) { return AC.COUPS[k] || AC.AXES[k]; }).filter(Boolean);
    var d = new Date();
    var day = d.toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'short' });
    return (g.length ? g.join(' & ') : 'Séance') + ' · ' + day;
  };

  /* Remplace la carte d'un bloc par une autre du même thème */
  Gen.reroll = function (session, uid) {
    var block = session.blocks.find(function (b) { return b.uid === uid; });
    if (!block) return null;
    var used = session.blocks.map(function (b) { return b.cardId; });
    var others = session.blocks.filter(function (b) { return b !== block; });
    var counts = {};
    session.blocks.forEach(function (b) { counts[b.theme] = (counts[b.theme] || 0) + 1; });
    var params = Object.assign({}, session.params, { duration: session.duration, counts: counts });
    var card = Gen.pick(block.theme, params, used, coveredFrom(others));
    if (!card) return null;
    block.cardId = card.id;
    var c = card.duration;
    block.minutes = Math.min(c[2], Math.max(c[0], block.minutes || c[1]));
    return card;
  };

  /* ---------------- Répartition du temps ---------------- */
  function roundTo(v, step) { return Math.round(v / step) * step; }

  Gen.allocate = function (session) {
    var D = session.duration;
    var blocks = session.blocks.filter(function (b) { return b.cardId; });
    if (!blocks.length) return session;
    var info = blocks.map(function (b) {
      var c = AC.DB.get(b.cardId);
      var w = (AC.THEMES[b.theme] || { weight: 1 }).weight;
      return { b: b, w: w, min: c.duration[0], max: c.duration[2] };
    });
    var sumW = info.reduce(function (a, x) { return a + x.w; }, 0);
    info.forEach(function (x) {
      var raw = Math.min(x.max, Math.max(x.min, D * x.w / sumW));
      x.m = Math.max(5, roundTo(raw, 5));
    });
    var total = function () { return info.reduce(function (a, x) { return a + x.m; }, 0); };
    var guard = 0;
    while (total() !== D && guard++ < 60) {
      var diff = D - total();
      var step = Math.abs(diff) >= 5 ? 5 : Math.abs(diff);
      if (diff > 0) {
        /* D'abord les blocs qui ont encore de la marge ; sinon le moins « étiré » */
        var withRoom = info.filter(function (x) { return x.m + step <= x.max; });
        var up = withRoom.length
          ? withRoom.sort(function (a, b) { return (b.w - a.w) || (a.m / a.max - b.m / b.max); })[0]
          : info.slice().sort(function (a, b) { return (a.m / a.max - b.m / b.max) || (b.w - a.w); })[0];
        up.m += step;
      } else {
        var canGo = info.filter(function (x) { return x.m - step >= Math.max(5, x.min); });
        if (canGo.length) {
          canGo.sort(function (a, b) { return (b.m / b.min - a.m / a.min) || (b.m - a.m); })[0].m -= step;
        } else {
          /* Plus de marge de 5 min : on grignote minute par minute au-dessus des minimums */
          var slack = info.filter(function (x) { return x.m - 1 >= x.min; });
          if (slack.length) {
            slack.sort(function (a, b) { return (b.m - b.min) - (a.m - a.min); })[0].m -= 1;
          } else {
            /* Budget trop court pour tous les minimums : on réduit le bloc le moins pénalisé */
            var pool = info.filter(function (x) { return x.m - 1 >= 1; });
            if (!pool.length) break;
            pool.sort(function (a, b) { return (b.m / b.min - a.m / a.min) || (b.m - a.m); })[0].m -= 1;
          }
        }
      }
    }
    info.forEach(function (x) { x.b.minutes = x.m; });
    return session;
  };

  Gen.total = function (session) {
    return session.blocks.reduce(function (a, b) { return a + (b.cardId ? b.minutes || 0 : 0); }, 0);
  };

  /* ---------------- Bilan de séance ---------------- */
  Gen.insights = function (session) {
    var out = [];
    var cards = session.blocks.map(function (b) { return AC.DB.get(b.cardId); }).filter(Boolean);
    var total = Gen.total(session);
    var diff = total - session.duration;

    out.push({
      type: diff === 0 ? 'ok' : 'warn',
      icon: 'clock',
      text: diff === 0 ? 'Durée respectée : ' + total + ' min.' :
        'Total ' + total + ' min pour ' + session.duration + ' min prévues (' + (diff > 0 ? '+' : '') + diff + ').',
      action: diff !== 0 ? { id: 'allocate', label: 'Répartir' } : null
    });

    var sumMin = cards.reduce(function (a, c) { return a + (c.duration ? c.duration[0] : 0); }, 0);
    if (sumMin > session.duration) {
      out.push({ type: 'warn', icon: 'alert', text: 'Beaucoup de cartes pour ' + session.duration + ' min (minimum conseillé : ' + sumMin + ' min). Retire une carte ou allonge la séance.' });
    }

    var stretched = session.blocks.filter(function (b) {
      var c = AC.DB.get(b.cardId);
      return c && b.minutes > c.duration[2];
    });
    if (stretched.length) {
      out.push({
        type: 'info', icon: 'plus',
        text: stretched.length + ' situation' + (stretched.length > 1 ? 's dépassent leur' : ' dépasse sa') + ' durée conseillée : ajoute une carte pour varier.'
      });
    }

    var order = session.blocks.map(function (b) { return AC.THEME_ORDER.indexOf(b.theme); });
    var progressive = order.every(function (v, i) { return i === 0 || v >= order[i - 1]; });
    out.push(progressive
      ? { type: 'ok', icon: 'check', text: 'Progression du fermé vers l’ouvert.' }
      : { type: 'info', icon: 'shuffle', text: 'Ordre libre : la séance ne suit pas la progression fermé → ouvert.' });

    var serve = cards.some(function (c) { return (c.coups || []).indexOf('service') !== -1; });
    out.push(serve
      ? { type: 'ok', icon: 'check', text: 'Le service est travaillé.' }
      : { type: 'warn', icon: 'alert', text: 'Pas de service au programme : prévoir 5 à 10 min de services.', action: { id: 'add-serve', label: 'Ajouter' } });

    var goals = session.params.goals || [];
    goals.forEach(function (g) {
      var n = cards.filter(function (c) { return (c.coups || []).concat(c.axes || []).indexOf(g) !== -1; }).length;
      var label = AC.COUPS[g] || AC.AXES[g];
      out.push(n
        ? { type: 'ok', icon: 'check', text: label + ' : ' + n + ' situation' + (n > 1 ? 's' : '') + '.' }
        : { type: 'warn', icon: 'alert', text: label + ' : aucune situation ne le cible.' });
    });

    var eq = {};
    cards.forEach(function (c) { (c.equipment || []).forEach(function (k) { if (!AC.EQUIPMENT[k].always) eq[k] = true; }); });
    var eqList = Object.keys(eq).map(function (k) { return AC.EQUIPMENT[k].label.toLowerCase(); });
    out.push({ type: 'info', icon: 'cards', text: 'Matériel : balles, raquettes' + (eqList.length ? ', ' + eqList.join(', ') : '') + '.' });

    var counts = session.params.counts || {};
    AC.THEME_ORDER.forEach(function (t) {
      var wanted = counts[t] || 0;
      var have = session.blocks.filter(function (b) { return b.theme === t && b.cardId; }).length;
      if (wanted > have && AC.DB.byTheme(t).length <= have) {
        out.push({ type: 'warn', icon: 'alert', text: AC.THEMES[t].label + ' : pas assez de cartes dans la base (' + have + '/' + wanted + ').' });
      }
    });
    return out;
  };

  /* ---------------- Export texte ---------------- */
  Gen.toText = function (session) {
    var lines = [];
    lines.push(session.name.toUpperCase());
    lines.push(Gen.total(session) + ' min · ' + session.params.players + ' joueurs');
    var f = AC.DB.get(session.focusId);
    if (f) lines.push('Focus : ' + f.title + ' — ' + f.objective);
    lines.push('');
    var t = 0;
    session.blocks.forEach(function (b, i) {
      var c = AC.DB.get(b.cardId);
      if (!c) return;
      var start = t; t += b.minutes;
      lines.push((i + 1) + '. [' + AC.THEMES[b.theme].label + '] ' + c.title + ' — ' + b.minutes + ' min (' + start + '→' + t + ')');
      lines.push('   Objectif : ' + c.objective);
      (c.steps || []).forEach(function (s) { lines.push('   • ' + s); });
      if (c.score) lines.push('   Score : ' + c.score);
      if (c.tip) lines.push('   Conseil : ' + c.tip);
      lines.push('');
    });
    if (session.notes) { lines.push('Notes : ' + session.notes); }
    return lines.join('\n');
  };
})();
