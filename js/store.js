/* ==========================================================================
   Assistant Coach — Persistance locale et accès à la base de cartes
   ========================================================================== */
window.AC = window.AC || {};

(function () {
  var PREFIX = 'ac.v1.';

  AC.store = {
    get: function (key, fallback) {
      try {
        var raw = window.localStorage.getItem(PREFIX + key);
        return raw == null ? fallback : JSON.parse(raw);
      } catch (e) {
        return fallback;
      }
    },
    set: function (key, value) {
      try {
        window.localStorage.setItem(PREFIX + key, JSON.stringify(value));
        return true;
      } catch (e) {
        return false;
      }
    }
  };

  AC.uid = function (prefix) {
    return (prefix || 'id') + '-' + Date.now().toString(36) + '-' + Math.random().toString(36).slice(2, 7);
  };

  /* ------------------------------------------------------------------
     Base de cartes = cartes intégrées (cards.js) + cartes perso (local)
     ------------------------------------------------------------------ */
  var custom = AC.store.get('customCards', []);
  var index = null;

  /* Cartes perso créées avant la refonte des thèmes de travail : on écarte les anciens axes disparus
     (ex. « tactique »), en mémoire seulement — la carte enregistrée n'est réécrite qu'à sa prochaine modification */
  function knownAxes(c) {
    if (c && Array.isArray(c.axes) && AC.AXES) c.axes = c.axes.filter(function (k) { return !!AC.AXES[k]; });
    return c;
  }
  custom.forEach(knownAxes);

  function reindex() {
    index = {};
    AC.CARDS.concat(custom).forEach(function (c) { index[c.id] = c; });
  }

  AC.DB = {
    all: function () { return AC.CARDS.concat(custom); },
    situations: function () { return this.all().filter(function (c) { return c.theme !== 'focus'; }); },
    focus: function () { return this.all().filter(function (c) { return c.theme === 'focus'; }); },
    byTheme: function (theme) { return this.all().filter(function (c) { return c.theme === theme; }); },
    get: function (id) { if (!index) reindex(); return index[id] || null; },
    isCustom: function (id) { return custom.some(function (c) { return c.id === id; }); },
    custom: function () { return custom.slice(); },
    saveCustom: function (card) {
      var i = custom.findIndex(function (c) { return c.id === card.id; });
      if (i >= 0) custom[i] = card; else custom.push(card);
      AC.store.set('customCards', custom);
      reindex();
    },
    deleteCustom: function (id) {
      custom = custom.filter(function (c) { return c.id !== id; });
      AC.store.set('customCards', custom);
      reindex();
    },
    importCustom: function (list) {
      var n = 0;
      (list || []).forEach(function (c) {
        if (!c || !c.id || !c.title || !c.theme) return;
        if (AC.CARDS.some(function (b) { return b.id === c.id; })) return;
        var i = custom.findIndex(function (x) { return x.id === c.id; });
        knownAxes(c);
        if (i >= 0) custom[i] = c; else custom.push(c);
        n++;
      });
      AC.store.set('customCards', custom);
      reindex();
      return n;
    }
  };
})();
