/* ==========================================================================
   Assistant Coach — Paquet « Tennis Tactics »
   Cartes construites à partir des schémas tactiques de The Book On Tennis
   Strategy (Joshua Hinkle, TennisTactics.com), reformulées en français et
   vérifiées avec la synthèse Sources/Tennis/Strategie_tennis_synthese_FR.pdf :
   - le mur et la fenêtre (viser grand), défense / neutre / attaque ;
   - les couloirs : 2, 3 puis 4 couloirs (A B C D), le X (angle 1 / angle 2) ;
   - les ouvertures codées des 4 premières balles (service, retour,
     balle 3 du serveur, balle 4 du relanceur).

   Schémas : terrains VERTICAUX, comme dans le livre. J1 est en bas, J2 en haut,
   tous deux droitiers. Les séquences sont découpées en deux terrains.
   Coordonnées en mètres (voir court.js) : x = 0 sur la ligne de fond de J1,
   y grand = côté égalité de J1 (à droite sur le schéma).

   Codes d'ouverture (ex. 3222) — chiffre 1 : cible de service
     1 extérieur, 2 corps, 3 T (côté égalité) · 4 T, 5 corps, 6 extérieur (avantage).
   Chiffres 2 à 4 : zone d'arrivée chez celui qui reçoit la balle,
     1 couloir extérieur côté égalité, 2 tiers central côté égalité, 3 tiers
     central côté avantage, 4 couloir extérieur côté avantage (balles profondes) ;
     5 à 8 : mêmes couloirs, balles courtes (avant la ligne de service). 0 = balle libre.
   4 couloirs de chaque joueur : A (coup droit, extérieur), B, C, D (revers, extérieur).
   ========================================================================== */
window.AC = window.AC || {};
AC.CARDS = AC.CARDS || [];

(function () {
  var L = -1.3, R = 25.1, N = 11.885, SL = 5.485, SR = 18.285, T = 1.37, B = 9.6, M = 5.485, W = 23.77;
  var SRC = 'Tennis Tactics';
  var REF = 'J. Hinkle, The Book On Tennis Strategy';
  var BR = ['balles', 'raquettes'];
  var BRP = ['balles', 'raquettes', 'plots'];
  var BRL = ['balles', 'raquettes', 'lignes'];

  /* Couloirs (en mètres, dans la largeur du simple) */
  var T3a = 4.113, T3b = 6.857;            // 3 couloirs
  var Q1 = 3.43, Q3 = 7.54;                // 4 couloirs (avec le milieu M)

  function dashLine(y, w) { return { p: [[0, y], [W, y]], dash: true, w: w || 1.3 }; }
  var MID = [dashLine(M, 1.5)];
  var LANES3 = [dashLine(T3a), dashLine(T3b)];
  var LANES4 = [dashLine(Q1), dashLine(M), dashLine(Q3)];
  var X_LINES = [
    { p: [[0, T], [W, B]], dash: true, color: 'deep', w: 1.6 },
    { p: [[0, B], [W, T]], dash: true, color: 'deep', w: 1.6 }
  ];
  /* Triangles du X dans la moitié de J2 : angle 1 (à travers le X), angle 2 (par la ligne de côté) */
  var ANGLE1 = [[[N, M], [W, T], [W, B]], 'soft'];
  var ANGLE2_A = [[[N, M], [W, T], [N, T]], 'strong'];
  var ANGLE2_B = [[[N, M], [W, B], [N, B]], 'strong'];

  /* Grandes lettres A B C D des 4 couloirs, pour chaque joueur */
  function laneLetters() {
    var mine = { A: 8.57, B: 6.51, C: 4.46, D: 2.4 };
    var his = { A: 2.4, B: 4.46, C: 6.51, D: 8.57 };
    var out = [];
    Object.keys(mine).forEach(function (k) {
      out.push([2.4, mine[k], k, 'big']);
      out.push([W - 2.4, his[k], k, 'big']);
    });
    return out;
  }

  /* ---------- Ouvertures : deux terrains calculés à partir du code ---------- */
  var SERVE_BAND = [null, [T, 2.74], [2.74, 4.11], [4.11, M], [M, 6.86], [6.86, 8.23], [8.23, B]];
  var LANE_1 = [null, [T3b, B], [M, T3b], [T3a, M], [T, T3a]];   // moitié de J1 (serveur)
  var LANE_2 = [null, [T, T3a], [T3a, M], [M, T3b], [T3b, B]];   // moitié de J2 (relanceur)
  function zone1(n) { var l = LANE_1[(n - 1) % 4 + 1], deep = n <= 4; return [deep ? 0 : SL, l[0], deep ? SL : N, l[1]]; }
  function zone2(n) { var l = LANE_2[(n - 1) % 4 + 1], deep = n <= 4; return [deep ? SR : N, l[0], deep ? W : SR, l[1]]; }
  function mid(a, b) { return (a + b) / 2; }

  function opening(code, plain) {
    var d = String(code).split('').map(Number);
    var s = d[0], r = d[1], a = d[2], b = d[3];
    var j1 = plain ? null : 'J1', j2 = plain ? null : 'J2';
    function pl(p, t, c) { return c ? [p[0], p[1], t, c] : [p[0], p[1], t]; }
    var srv = [-0.7, s <= 3 ? 6.6 : 4.4];
    var sb = SERVE_BAND[s];
    var sPt = [16.4, mid(sb[0], sb[1])];
    /* Le relanceur se place dans l'axe du service */
    var yr = srv[1] + (sPt[1] - srv[1]) * (24.4 - srv[0]) / (sPt[0] - srv[0]);
    var ret = [24.7, Math.max(-0.6, Math.min(11.6, yr))];
    var zr = zone1(r), rPt = [r <= 4 ? 2.4 : 8.4, mid(zr[1], zr[3])];
    var za = zone2(a), aPt = [a <= 4 ? 21.4 : 15.4, mid(za[1], za[3])];
    /* Balle 3 : J1 frappe là où le retour est arrivé ; balle 4 : J2 là où la balle 3 est arrivée */
    var hit1 = r <= 4 ? [-0.9, rPt[1]] : [rPt[0] - 1.8, rPt[1]];
    var hit2 = a <= 4 ? [24.7, aPt[1]] : [aPt[0] + 1.8, aPt[1]];
    var p1 = {
      caption: 'SERVICE + RETOUR',
      zones: [[[N, sb[0], SR, sb[1]], 'strong'], [zr, 'soft']],
      lines: LANES3,
      shots: [
        { p: [[srv[0] + 0.4, srv[1]], sPt], n: '1', at: 0.42 },
        { p: [[ret[0] - 0.5, ret[1]], rPt], tone: 'deep', n: '2', at: 0.42 }
      ],
      players: [pl(srv, 1, j1), pl(ret, 2, j2)]
    };
    var p2 = {
      caption: b ? 'BALLES 3 + 4' : 'BALLE 3',
      zones: [[za, 'strong']],
      lines: LANES3,
      shots: [{ p: [[hit1[0] + 0.5, hit1[1]], aPt], n: '3', at: 0.42 }],
      players: [pl(hit1, 1, j1), pl(hit2, 2, j2)]
    };
    if (b) {
      var zb = zone1(b), bPt = [b <= 4 ? 2.4 : 8.4, mid(zb[1], zb[3])];
      p2.zones.push([zb, 'soft']);
      p2.shots.push({ p: [[hit2[0] - 0.5, hit2[1]], bPt], tone: 'deep', n: '4', at: 0.42 });
    }
    return { panels: [p1, p2] };
  }

  /* Fenêtre de 4 m et mur de 8 m (cartes tt-w2 et tt-f1) */
  function wallAndWindow(withShot) {
    var dg = {
      orient: 'v',
      zones: [['R', 'soft']],
      lines: [
        { p: [[-0.4, M], [W, T]], dash: true, color: 'deep', w: 1.6 },
        { p: [[-0.4, M], [W, B]], dash: true, color: 'deep', w: 1.6 },
        { p: [[W, T], [W, B]], color: 'strong', w: 6 }
      ],
      marks: [['cone', N, 3.4], ['cone', N, 7.57]],
      players: [[L, M, 1]],
      labels: [[W + 2.3, M, 'MUR DE 8 M', 'tag'], [N + 1.5, M, 'FENÊTRE 4 M', 'dark'], [4.6, M, '19°', 'plainStrong']]
    };
    if (withShot) dg.shots = [{ p: [[0, M], [21.4, 6.9]] }];
    return dg;
  }

  AC.CARDS.push(

    /* ==================================================================
       ÉCHAUFFEMENT
       ================================================================== */
    {
      id: 'tt-w1', theme: 'echauffement', source: SRC, refs: REF,
      title: 'Au-dessus du double filet', original: 'The Double Net',
      objective: 'Installer une balle neutre qui passe 1 à 1,8 m au-dessus du filet : la meilleure assurance contre la faute de filet.',
      steps: [
        'Tendre une corde environ 90 cm au-dessus de la bande du filet, entre deux perches fixées aux poteaux : c’est le double filet.',
        'Échanger en coopération au-dessus de la corde, d’abord depuis la ligne de service, puis depuis la ligne de fond.',
        'Balle sous la corde : le compteur repart de zéro.',
        'Dernière minute : accélérer en restant au-dessus de la corde, ce qui oblige à lifter davantage.'
      ],
      score: 'Record d’échanges au-dessus de la corde.',
      tip: 'Geste du bas vers le haut : c’est la trajectoire qui protège du filet, pas la prudence.',
      variants: ['Sans corde : deux plots posés sur la bande du filet servent de repères.', 'Ne compter que les balles qui tombent après la ligne de service.'],
      coups: ['coup-droit', 'revers'], axes: ['regularite', 'profondeur'],
      equipment: BR, eqNote: 'Corde au-dessus du filet', players: [2, 4], space: 'complet', duration: [5, 8, 10], intensity: 1,
      diagram: { picto: 'doublenet' }
    },
    {
      id: 'tt-w2', theme: 'echauffement', source: SRC, refs: REF,
      title: 'La fenêtre de 4 m', original: 'The 27 Foot Wall & 13 Foot Window',
      objective: 'Viser grand et sûr : le mur de 8 m (la ligne de fond adverse) et la fenêtre de 4 m au milieu du filet.',
      steps: [
        'Poser deux plots sur la bande du filet, à 2 m de part et d’autre de la sangle : c’est la fenêtre.',
        'Échanger depuis le centre de la ligne de fond : la balle passe dans la fenêtre et sort par la ligne de fond adverse, pas par le côté.',
        'Ce cône d’environ 19° contient presque tout le jeu de fond de court : on joue à travers l’adversaire, pas autour.',
        'Balle hors de la fenêtre ou tombée avant la ligne de service : elle ne compte pas.'
      ],
      score: 'Record de balles consécutives dans la fenêtre et au-delà de la ligne de service.',
      tip: 'En difficulté ? Viser simplement la sangle du filet.',
      variants: ['Échanges croisés : la fenêtre se décale vers la diagonale.', 'Compter en 1 minute, puis battre son score.'],
      coups: ['coup-droit', 'revers'], axes: ['precision', 'regularite', 'profondeur'],
      equipment: BRP, players: [2, 4], space: 'complet', duration: [5, 8, 10], intensity: 1,
      diagram: wallAndWindow(true)
    },

    /* ==================================================================
       ÉDUCATIF
       ================================================================== */
    {
      id: 'tt-e1', theme: 'educatif', source: SRC, refs: REF,
      title: 'La croix espagnole', original: 'The Spanish Cross',
      objective: 'Ajuster ses appuis vers l’avant et vers l’arrière pour frapper toujours entre la taille et les épaules.',
      steps: [
        'Le coach envoie 4 balles : 1 coup droit long, 2 coup droit court, 3 revers long, 4 revers court.',
        'Retour au centre entre chaque frappe : le joueur dessine une croix sur le terrain.',
        'Balle longue : reculer, se caler, puis avancer dans la frappe pour une balle haute et profonde.',
        'Balle courte : avancer dans le terrain, passer sous la balle et traverser.'
      ],
      score: '3 croix sur 4 avec les 4 balles au-delà de la ligne de service.',
      tip: 'En cas de faute, regarder d’abord les appuis, pas le geste.',
      variants: ['Ordre des balles au hasard.', 'Enchaîner deux croix sans pause.'],
      keys: [
        'Espacement latéral : 60 à 90 cm entre le corps et la balle au coup droit.',
        'Hauteur de frappe de la balle neutre : entre la taille et les épaules.',
        'Appui arrière posé, puis transfert du poids vers l’avant dans la frappe.',
        'Replacé au centre avant le départ de la balle suivante.'
      ],
      coups: ['coup-droit', 'revers'], axes: ['deplacement', 'equilibre', 'profondeur'],
      equipment: BR, eqNote: 'Panier de balles', players: [1, 4], space: 'demi', duration: [6, 8, 10], intensity: 2,
      diagram: {
        orient: 'v',
        zones: [['L', 'soft']],
        marks: [['basket', 17.4, 7.6], ['dot', -2.3, 8.4], ['dot', 3.8, 8.4], ['dot', -2.3, 2.6], ['dot', 3.8, 2.6]],
        shots: [
          { p: [[-0.1, 6.3], [-1.9, 8.0]], kind: 'move' }, { p: [[1.1, 6.3], [3.4, 8.0]], kind: 'move' },
          { p: [[-0.1, 4.7], [-1.9, 3.0]], kind: 'move' }, { p: [[1.1, 4.7], [3.4, 3.0]], kind: 'move' },
          { p: [[16.6, 5.7], [5.0, 8.0]], tone: 'deep' }
        ],
        players: [[0.5, M, 1, 'J'], [17.4, M, 2, 'C']],
        labels: [[-2.3, 10.2, '1', 'dark'], [3.8, 10.2, '2', 'dark'], [-2.3, 0.8, '3', 'dark'], [3.8, 0.8, '4', 'dark'], [7.4, 9.0, 'CD', 'big'], [7.4, 2.0, 'RV', 'big']]
      }
    },
    {
      id: 'tt-e2', theme: 'educatif', source: SRC, refs: REF,
      title: 'Défense, neutre, attaque', original: 'Defense, Neutral, Offense',
      objective: 'Adapter hauteur et intention à sa position : défendre haut et au centre, construire avec la balle neutre, attaquer en avançant.',
      steps: [
        'Le coach envoie au hasard une balle longue, moyenne ou courte.',
        'Plus de 1,8 m derrière la ligne de fond (défense) : très haut, bien au-dessus du double filet, et vers le centre.',
        'Entre 1 et 1,5 m derrière (neutre) : au-dessus du double filet, soit 1 à 1,8 m au-dessus de la bande ; la balle monte encore en passant la ligne de fond adverse.',
        'Dans le terrain (attaque) : à travers le double filet (entre la bande et la corde), un coup qui met en difficulté, puis avancer.'
      ],
      score: '8 réponses adaptées sur 10 (le coach valide : « défense », « neutre » ou « attaque »).',
      tip: 'Annoncer sa zone avant de frapper : reconnaître la situation, c’est déjà bien choisir.',
      variants: ['La grille : en neutre, passer entre deux « poteaux » imaginaires à 1,5 m à l’intérieur des lignes de côté ; en défense, à 2,1 m ; en attaque, jusqu’à 0,9 m.', 'Finir en point libre après la troisième balle.'],
      keys: [
        'Défense : on n’y gagne pas le point, on revient en position neutre.',
        'Neutre : frappe solide sans risque excessif, assez forte pour empêcher l’adversaire d’attaquer.',
        'Attaque : un coup qui force, pas forcément gagnant, puis on avance pour conclure.',
        'Les limites bougent avec le niveau : chez les pros, un pied sur la ligne suffit pour attaquer.'
      ],
      coups: ['coup-droit', 'revers'], axes: ['tactique', 'defense', 'attaque'],
      equipment: BRP, players: [1, 4], space: 'demi', duration: [8, 10, 15], intensity: 2,
      diagram: {
        orient: 'v',
        zones: [[[-3.6, T, -2.0, B], 'dark'], [[-1.7, T, -0.2, B], 'grey'], [[0, T, N, B], 'strong']],
        lines: [
          { p: [[N, T + 1.5], [W, T + 1.5]], dash: true, color: 'deep', w: 1.6 },
          { p: [[N, B - 1.5], [W, B - 1.5]], dash: true, color: 'deep', w: 1.6 }
        ],
        marks: [['basket', 19.4, 7.5]],
        players: [[19.4, M, 2, 'C']],
        labels: [[-2.8, M, 'DÉFENSE', 'plainWhite'], [-0.95, M, 'NEUTRE', 'plainInk'], [5.6, M, 'ATTAQUE', 'bigWhite'], [15.0, M, 'POTEAUX 1,5 M', 'tag']]
      }
    },

    /* ==================================================================
       DRILLS
       ================================================================== */
    {
      id: 'tt-d1', theme: 'drill', source: SRC, refs: REF,
      title: 'Les 4 motifs', original: '1-1, 1-2, 2-1 & 3-1 Patterns',
      objective: 'Enchaîner ses cibles selon une cadence choisie pour déplacer l’adversaire… ou l’enfermer.',
      steps: [
        'J2 renvoie toutes les balles au centre ; J1 joue un motif entre les deux moitiés du terrain adverse.',
        '1-1 : un côté, puis l’autre (écarter). 1-2 : un côté, l’autre, puis de nouveau l’autre (prendre à contre-pied).',
        '2-1 : deux fois le même côté, puis l’autre (créer l’ouverture). 3-1 : trois fois le même côté (isoler un point faible).',
        '2 minutes par motif, puis on inverse les rôles.'
      ],
      score: 'Nombre de motifs complets sans faute en 2 minutes.',
      tip: 'Contre un adversaire rapide, le 1-2 (rejouer derrière lui) paie plus que viser toujours le côté ouvert.',
      variants: ['J2 joue aussi un motif annoncé : l’échange devient un duel de cadences.', 'Finir chaque motif par un point libre.'],
      coups: ['coup-droit', 'revers'], axes: ['tactique', 'precision', 'regularite'],
      equipment: BR, players: [2, 4], space: 'complet', duration: [8, 10, 15], intensity: 2,
      diagram: {
        panels: [
          {
            caption: ['MOTIF 2-1', 'CRÉER L’OUVERTURE'],
            zones: [['R', 'soft']], lines: MID,
            players: [[L, M, 1, 'J1'], [R, M, 2, 'J2']],
            shots: [
              { p: [[0, M], [20.6, 7.2]], n: '1', at: 0.62 }, { p: [[0, M], [22.2, 8.7]], n: '2', at: 0.86 },
              { p: [[0, M], [21.4, 2.5]], n: '3', at: 0.8 }
            ]
          },
          {
            caption: ['MOTIF 1-2', 'CONTRE-PIED'],
            zones: [['R', 'soft']], lines: MID,
            players: [[L, M, 1, 'J1'], [R, M, 2, 'J2']],
            shots: [
              { p: [[0, M], [21.4, 2.5]], n: '1', at: 0.8 },
              { p: [[0, M], [20.6, 7.2]], n: '2', at: 0.62 }, { p: [[0, M], [22.2, 8.7]], n: '3', at: 0.86 }
            ]
          }
        ]
      }
    },
    {
      id: 'tt-d2', theme: 'drill', source: SRC, refs: REF,
      title: 'Le 2-1 tournant', original: 'The 21 Pattern in the 3 Lanes',
      objective: 'Tenir la diagonale, changer de direction au bon moment… et reprendre la diagonale sur le changement adverse.',
      steps: [
        'Terrain découpé en 3 couloirs. J1 met en jeu croisé côté égalité.',
        'J2 joue deux croisés dans le couloir extérieur, puis un long de ligne.',
        'J1 se déplace et rejoue croisé (son premier), joue un deuxième croisé, puis change à son tour le long de la ligne.',
        'Le schéma tourne en continu : chacun tient deux croisés, puis change.'
      ],
      score: 'Record de séquences 2-1 sans faute.',
      tip: 'Exercice continu : pas de coup gagnant, mais des balles fortes dans les couloirs extérieurs, avec de la marge.',
      variants: ['Toutes les balles doivent passer la ligne de service.', 'Étape suivante : la même séquence après service et retour.'],
      coups: ['coup-droit', 'revers'], axes: ['regularite', 'tactique', 'deplacement'],
      equipment: BRL, eqNote: 'Cordes ou lignes pour les 3 couloirs', players: [2, 4], space: 'complet', duration: [8, 10, 15], intensity: 2,
      diagram: {
        panels: [
          {
            caption: ['J2 : DEUX CROISÉS,', 'PUIS UN LONG DE LIGNE'],
            zones: [[[0, T3b, N, B], 'soft'], [[N, T, W, T3a], 'soft']], lines: LANES3,
            players: [[L, 8.2, 1, 'J1'], [R, 2.8, 2, 'J2']],
            shots: [
              { p: [[0, 8.2], [23.2, 2.8]], kind: 'rally' },
              { p: [[23.2, 2.2], [1.2, 2.2]], tone: 'deep', n: '3', at: 0.5 }
            ]
          },
          {
            caption: ['J1 REPREND', 'LA DIAGONALE'],
            zones: [[[0, T, N, T3a], 'soft'], [[N, T3b, W, B], 'soft']], lines: LANES3,
            players: [[L, 2.8, 1, 'J1'], [R, 8.2, 2, 'J2']],
            shots: [{ p: [[0, 2.8], [23.2, 8.2]], kind: 'rally' }]
          }
        ]
      }
    },
    {
      id: 'tt-d3', theme: 'drill', source: SRC, refs: REF,
      title: '4 couloirs : B contre B', original: 'The 4 Lane Framework — Matching Principle',
      objective: 'Accorder sa cible à sa position (couloir de frappe = couloir visé) et se replacer au bon endroit.',
      steps: [
        'Terrain en 4 couloirs : pour chaque joueur, A, B, C, D, de son coup droit vers son revers.',
        'Règle 1, l’appariement : depuis le couloir B, viser le B adverse ; depuis C, viser C… On suit les grandes diagonales.',
        'Règle 2 : pour changer de direction, jouer droit devant soi, et seulement avec un pied sur ou dans la ligne de fond.',
        'Replacement dans le couloir que l’on vient de viser ; après un A ou un D, sur la ligne intérieure de ce couloir.'
      ],
      score: 'Record d’échanges qui respectent les règles ; 2 minutes en B contre B, puis 2 minutes en C contre C.',
      tip: 'On frappe la balle bien de face : B vers B laisse plus de marge que B vers A.',
      variants: ['Joueurs en progression : changement de direction seulement avec les deux pieds dans le terrain.', 'Points libres ; une règle non respectée fait perdre le point.'],
      coups: ['coup-droit', 'revers'], axes: ['precision', 'tactique', 'deplacement'],
      equipment: BRL, eqNote: 'Cordes ou lignes pour les 4 couloirs', players: [2, 4], space: 'complet', duration: [8, 10, 15], intensity: 2,
      diagram: {
        panels: [
          {
            caption: ['RÈGLE 1', 'B VERS B'],
            zones: [[[0, M, N, Q3], 'soft'], [[N, Q1, W, M], 'soft']], lines: LANES4,
            players: [[L, 6.5, 1], [R, 4.45, 2]],
            shots: [{ p: [[0, 6.5], [23.3, 4.5]], kind: 'rally' }],
            labels: laneLetters()
          },
          {
            caption: ['RÈGLE 2 : CHANGER', '= DROIT DEVANT'],
            zones: [[[N, T, W, Q1], 'strong']], lines: LANES4,
            players: [[-0.2, 2.4, 1], [R, 8.57, 2]],
            shots: [{ p: [[0.5, 2.4], [21.6, 2.4]] }],
            labels: laneLetters()
          }
        ]
      }
    },
    {
      id: 'tt-d4', theme: 'drill', source: SRC, refs: REF,
      title: 'Ouverture sûre côté égalité (3222)', original: 'Openings to Avoid Unforced Errors — 3222',
      objective: 'Passer les 4 premières balles sans faute : servir sur le revers, puis jouer croisé dans le tiers central.',
      steps: [
        'Balle 1 : J1 sert au T côté égalité (sur le revers d’un droitier).',
        'Balle 2 : J2 retourne profond et croisé, dans le tiers central.',
        'Balles 3 et 4 : J1, puis J2, jouent croisé dans le tiers central. Arrêt après la 4e balle.',
        'Chacun vise sa cible même si la balle précédente a manqué la sienne. 10 séquences, puis on inverse.'
      ],
      score: 'Séquences complètes sur 10 (objectif : 7).',
      tip: 'Trois principes : jouer le centre, jouer croisé, prendre sa balle 3 ou 4 en coup droit dès que possible.',
      variants: ['3333 : retour profond long de ligne (tiers central), puis croisés.', 'Après la 4e balle, finir le point.'],
      coups: ['service', 'retour', 'coup-droit', 'revers'], axes: ['regularite', 'tactique'],
      equipment: BR, players: [2, 4], space: 'complet', duration: [8, 10, 15], intensity: 2,
      diagram: opening(3222)
    },
    {
      id: 'tt-d5', theme: 'drill', source: SRC, refs: REF,
      title: 'Ouverture sûre côté avantage (6333)', original: 'Openings to Avoid Unforced Errors — 6333',
      objective: 'Commencer sans faute les points importants, joués côté avantage : service extérieur sur le revers, puis croisés dans le tiers central.',
      steps: [
        'Balle 1 : J1 sert extérieur côté avantage, sur le revers d’un droitier (la plus longue diagonale).',
        'Balle 2 : J2 retourne profond et croisé, dans le tiers central.',
        'Balles 3 et 4 : J1, puis J2, jouent croisé dans le tiers central. Arrêt après la 4e balle.',
        '10 séquences, puis on inverse les rôles.'
      ],
      score: 'Séquences complètes sur 10 (objectif : 7).',
      tip: '30-15, 40-30, avantage : les points décisifs se jouent côté avantage. Y avoir une ouverture rodée rassure.',
      variants: ['6222 : retour profond long de ligne (tiers central), puis croisés.', 'Contre un gaucher : servir au T (4) pour viser son revers.'],
      coups: ['service', 'retour', 'coup-droit', 'revers'], axes: ['regularite', 'tactique'],
      equipment: BR, players: [2, 4], space: 'complet', duration: [8, 10, 15], intensity: 2,
      diagram: opening(6333)
    },
    {
      id: 'tt-d6', theme: 'drill', source: SRC, refs: REF,
      title: 'Service 80 / 20', original: 'Standard Serving Framework',
      objective: 'Servir avec une intention : 4 services sur 5 sur le côté faible du relanceur, 1 sur 5 pour le garder dans le doute.',
      steps: [
        'Couper chaque carré de service en deux (plots ou ligne) : côté coup droit (CD) et côté revers (RV) du relanceur.',
        'J1 sert des séries de 5 : 4 sur le revers, 1 sur le coup droit, dans l’ordre qu’il veut.',
        'J2 retourne en jeu ; le service sur le coup droit sert à l’empêcher de se décaler ou de prendre son rythme.',
        '10 services côté égalité, 10 côté avantage, puis on inverse.'
      ],
      score: 'Services dans la bonne moitié sur 20 ; bonus pour chaque retour court provoqué.',
      tip: 'Contre un droitier, le revers c’est le T côté égalité et l’extérieur côté avantage.',
      variants: ['Jouer le point après le retour (service + balle 3).', 'Contre un gaucher : inverser les cibles.'],
      coups: ['service', 'retour'], axes: ['precision', 'tactique'],
      equipment: BRP, players: [2, 4], space: 'complet', duration: [8, 10, 15], intensity: 2,
      diagram: {
        orient: 'v', caption: ['REVERS : 4 SERVICES SUR 5', 'COUP DROIT : 1 SUR 5'],
        zones: [[[N, Q1, SR, M], 'strong'], [[N, Q3, SR, B], 'strong'], [[N, T, SR, Q1], 'soft'], [[N, M, SR, Q3], 'soft']],
        lines: [{ p: [[N, Q1], [SR, Q1]], dash: true }, { p: [[N, Q3], [SR, Q3]], dash: true }],
        players: [[-0.7, 6.6, 1, 'J1'], [24.7, 2.8, 2, 'J2']],
        shots: [{ p: [[-0.3, 6.5], [13.4, 4.5]] }],
        labels: [
          [16.8, 2.4, 'CD', 'plainInk'], [16.8, 4.46, 'RV', 'plainInk'], [16.8, 6.51, 'CD', 'plainInk'], [16.8, 8.57, 'RV', 'plainInk']
        ]
      }
    },
    {
      id: 'tt-d7', theme: 'drill', source: SRC, refs: REF,
      title: 'Servir hors du carré', original: 'Advanced Serving — Serving Framework 3',
      objective: 'Penser le service à l’endroit où sera la balle quand le relanceur la frappe : effet et angle pour le sortir du terrain.',
      steps: [
        'Poser des cibles hors du terrain, à hauteur du relanceur, de chaque côté.',
        'Côté égalité : service slicé extérieur, qui continue de s’écarter après le rebond.',
        'Côté avantage : service lifté extérieur, qui sort le relanceur au-delà du couloir.',
        'La balle doit atteindre la cible après le rebond. Séries de 10 par côté.'
      ],
      score: 'Services qui atteignent la cible, sur 10.',
      tip: 'L’effet avant la vitesse : c’est la trajectoire après le rebond qui déplace le relanceur.',
      variants: ['Slice au T côté avantage, qui attire le relanceur vers le côté égalité.', 'Enchaîner la balle 3 dans le côté ouvert.'],
      coups: ['service'], axes: ['precision', 'tactique'],
      equipment: BRP, players: [1, 4], space: 'complet', duration: [8, 10, 15], intensity: 2,
      diagram: {
        orient: 'v',
        zones: [[[N, T, SR, M], 'soft'], [[N, M, SR, B], 'soft'], [[19.2, -2.9, 23.2, -0.3], 'strong'], [[19.2, 11.3, 23.2, 13.9], 'strong']],
        players: [[-0.7, 7.3, 1, 'S'], [-0.7, 3.7, 1, 'S']],
        shots: [
          { p: [[-0.3, 7.2], [16.4, 2.0], [21.0, -1.5]] },
          { p: [[-0.3, 3.8], [16.4, 9.0], [21.0, 12.5]], tone: 'deep' }
        ],
        labels: [[17.6, -1.9, 'SLICE', 'plainStrong'], [17.6, 12.9, 'LIFT', 'plainStrong']]
      }
    },

    /* ==================================================================
       MIXTE — début de point imposé ou contrainte, puis jeu libre
       ================================================================== */
    {
      id: 'tt-m1', theme: 'mixte', source: SRC, refs: REF,
      title: 'Ouverture 1233 : écarter, puis changer de direction', original: 'First Strike Patterns — 1233',
      objective: 'Un grand classique du circuit : écarter au service, puis faire traverser le terrain au relanceur pour un revers en course.',
      steps: [
        'Balle 1 : J1 sert extérieur côté égalité, J2 sort dans le couloir.',
        'Balle 2 : J2 retourne vers le centre, légèrement croisé.',
        'Balle 3 : J1 change de direction, long de ligne dans le tiers central ; J2 doit couvrir tout le terrain et frapper en revers.',
        'Le point est ensuite libre. 5 points par série, puis on inverse.'
      ],
      score: 'Point classique ; un point gagné après l’ouverture complète vaut 2.',
      tip: 'Un seul risque pour le serveur, deux difficultés pour le relanceur. Retour rapide et profond : rejouer croisé et attendre.',
      variants: ['Jouer dans le dos : J1 rejoue côté égalité quand J2 part trop tôt couvrir le côté ouvert.', 'Premières balles de service uniquement, frappe à 7-8 sur 10 en intensité.'],
      coups: ['service', 'retour', 'coup-droit'], axes: ['tactique', 'attaque'],
      equipment: BR, players: [2, 4], space: 'complet', duration: [10, 12, 15], intensity: 3,
      diagram: opening(1233)
    },
    {
      id: 'tt-m2', theme: 'mixte', source: SRC, refs: REF,
      title: 'Premières frappes offensives', original: 'Openings for First Strike Patterns — 1243, 3343, 4343, 6312',
      objective: 'Quatre ouvertures pour prendre l’initiative dès la balle 3, avec un risque contrôlé.',
      steps: [
        'Choisir et annoncer l’ouverture. 1243 (schéma) : service extérieur côté égalité, retour au centre, balle 3 le long de la ligne dans le couloir extérieur.',
        '3343 : service au T côté égalité, retour au centre, balle 3 croisée dans le couloir extérieur.',
        '4343 : service au T côté avantage, balle 3 croisée extérieure. 6312 : service extérieur côté avantage, balle 3 le long de la ligne.',
        'Premières balles de service, frappe à 7-8 sur 10 en intensité ; le point est ensuite libre.'
      ],
      score: 'Point classique ; ouverture réussie et point gagné = 2 points.',
      tip: 'Une balle 3 qui met la pression, pas forcément gagnante : améliorer sa position suffit.',
      variants: ['J2 retourne où il veut : J1 choisit l’ouverture qui correspond au retour.', 'Sur seconde balle de service : c’est J2 qui attaque au retour.'],
      coups: ['service', 'retour', 'coup-droit', 'revers'], axes: ['tactique', 'attaque'],
      equipment: BR, players: [2, 4], space: 'complet', duration: [10, 12, 15], intensity: 3,
      diagram: opening(1243)
    },
    {
      id: 'tt-m3', theme: 'mixte', source: SRC, refs: REF,
      title: 'Service au corps, balle courte', original: 'Advanced Serving Framework — 2640, 2740, 2710',
      objective: 'Après un service au corps qui gêne le relanceur, conclure la balle courte sans faute.',
      steps: [
        'Balle 1 : J1 sert au corps côté égalité (vers le revers). Balle 2 : J2, gêné, retourne court.',
        'Balle 3 : J1 avance, prend la balle tôt (en montée ou de volée) et joue une grande diagonale : couloir extérieur côté avantage (2640, 2740) ou côté égalité (2710).',
        'Le point continue si la balle revient.',
        'Côté avantage : 5640, 5740, 5710.'
      ],
      score: 'Point classique ; point conclu sur la balle 3 = 2 points.',
      tip: 'Ces points « offerts » se perdent souvent dans les pieds : travailler la course vers l’avant jusqu’à la balle.',
      variants: ['Le coach met en jeu la balle courte pour multiplier les répétitions.', 'Monter au filet derrière la balle 3.'],
      coups: ['service', 'coup-droit'], axes: ['attaque', 'tactique', 'deplacement'],
      equipment: BR, players: [2, 4], space: 'complet', duration: [8, 10, 15], intensity: 3,
      diagram: opening(2640)
    },
    {
      id: 'tt-m4', theme: 'mixte', source: SRC, refs: REF,
      title: 'Super B', original: 'Super B',
      objective: 'Construire en coup droit contre coup droit dans un couloir B élargi, jusqu’à la balle à jouer de l’autre côté.',
      steps: [
        'Échange appuyé coup droit contre coup droit côté égalité, chacun dans son couloir B légèrement élargi.',
        'Quand l’autre frappe en retard et que la balle arrive plus au centre : tourner autour et jouer un coup droit décalé croisé (inside-out) vers le côté ouvert.',
        'Poussé dans le couloir A sur une balle plus courte : angle court en A ou long de ligne en D. Sans occasion nette : revenir en B profond.',
        'Le point est libre dès la première frappe hors du B.'
      ],
      score: 'Point classique ; tester tôt dans le match qui tient le plus longtemps l’échange B contre B.',
      tip: 'Le B élargi pardonne : frapper lourd et profond, la marge vient de la largeur de la cible.',
      variants: ['Gaucher contre droitier : le duel se joue côté avantage.', 'Bonus : 2 points pour un coup gagnant en décalé croisé.'],
      coups: ['coup-droit'], axes: ['tactique', 'attaque', 'profondeur'],
      equipment: BR, players: [2, 4], space: 'complet', duration: [10, 12, 15], intensity: 3,
      diagram: {
        panels: [
          {
            caption: ['1. DUEL DE COUPS DROITS', 'DANS LE B ÉLARGI'],
            zones: [[[0, M - 0.5, N, Q3 + 0.5], 'soft'], [[N, Q1 - 0.5, W, M + 0.5], 'soft']], lines: LANES4,
            players: [[L, 6.6, 1], [R, 4.4, 2]],
            shots: [{ p: [[0, 6.6], [23.3, 4.4]], kind: 'rally' }],
            labels: laneLetters()
          },
          {
            caption: ['2. BALLE AU CENTRE :', 'DÉCALÉ CROISÉ'],
            zones: [[[N, M + 0.5, W, B], 'strong']], lines: LANES4,
            players: [[L, 4.2, 1], [R, 4.4, 2]],
            shots: [
              { p: [[23.2, 4.6], [1.4, 5.0]], tone: 'deep' },
              { p: [[0.3, 4.0], [21.4, 8.5]] }
            ],
            labels: laneLetters()
          }
        ]
      }
    },
    {
      id: 'tt-m5', theme: 'mixte', source: SRC, refs: REF,
      title: 'Construire de l’intérieur', original: 'Building Points From The Inside Out',
      objective: 'Gagner le duel des couloirs centraux, puis attaquer les couloirs extérieurs dès que l’adversaire en ouvre un.',
      steps: [
        'Terrain en 4 couloirs. Le point commence par une mise en jeu au centre.',
        'Tant qu’aucune balle n’est tombée dans un couloir extérieur (A ou D), on ne joue que dans B et C.',
        'Dès qu’une balle tombe en A ou en D, c’est le feu vert : viser à son tour l’extérieur, sur une grande diagonale.',
        'Le point est ensuite libre.'
      ],
      score: 'Point classique ; faute dans les couloirs centraux = 2 points.',
      tip: 'Jouer le centre avec assez de puissance : sinon c’est l’adversaire qui ouvrira le terrain le premier.',
      variants: ['Celui qui ouvre l’extérieur sans y avoir été invité perd le point.', 'Ajouter le service.'],
      coups: ['coup-droit', 'revers'], axes: ['regularite', 'tactique', 'profondeur'],
      equipment: BRL, eqNote: 'Cordes ou lignes pour les 4 couloirs', players: [2, 4], space: 'complet', duration: [10, 12, 15], intensity: 2,
      diagram: {
        panels: [
          {
            caption: ['1. D’ABORD', 'B ET C'],
            zones: [[[0, Q1, W, Q3], 'soft']], lines: LANES4,
            players: [[L, M, 1], [R, M, 2]],
            shots: [{ p: [[0, 4.9], [23.3, 6.1]], kind: 'rally' }],
            labels: laneLetters()
          },
          {
            caption: ['2. BALLE REÇUE EN A OU D :', 'L’EXTÉRIEUR S’OUVRE'],
            zones: [[[0, Q3, N, B], 'soft'], [[N, T, W, Q1], 'strong']], lines: LANES4,
            players: [[L, 8.6, 1], [R, 6.2, 2]],
            shots: [
              { p: [[23.2, 6.4], [1.6, 8.5]], tone: 'deep' },
              { p: [[0.3, 8.8], [21.6, 2.3]] }
            ],
            labels: laneLetters()
          }
        ]
      }
    },
    {
      id: 'tt-m6', theme: 'mixte', source: SRC, refs: REF,
      title: 'Revers qui change de direction', original: 'Changing Direction With The Backhand (D Zone)',
      objective: 'Tenir la diagonale de revers, puis changer de direction en revers, droit devant, dès que l’occasion se présente.',
      steps: [
        'Échange revers contre revers croisé, côté avantage (couloirs D).',
        'Avec un pied sur ou dans la ligne de fond, on peut changer de direction : revers droit devant soi, de D vers le couloir A adverse.',
        'L’adversaire répond croisé et profond pour relancer une diagonale ; le point est ensuite libre.',
        'Points de 3 minutes, puis même jeu en coup droit (couloirs A).'
      ],
      score: 'Point classique ; point gagné sur un changement de direction en revers = 2 points.',
      tip: 'Droit devant, pas sur la ligne : viser le couloir en face de soi, avec de la marge.',
      variants: ['Le changement de direction n’est permis qu’après 3 revers croisés.', 'Celui qui subit le changement doit rejouer croisé, sinon il perd le point.'],
      coups: ['revers'], axes: ['tactique', 'attaque', 'precision'],
      equipment: BR, players: [2, 4], space: 'complet', duration: [10, 12, 15], intensity: 3,
      diagram: {
        panels: [
          {
            caption: ['1. REVERS CROISÉS', 'D CONTRE D'],
            zones: [[[0, T, N, Q1], 'soft'], [[N, Q3, W, B], 'soft']], lines: LANES4,
            players: [[L, 2.4, 1], [R, 8.57, 2]],
            shots: [{ p: [[0, 2.4], [23.3, 8.5]], kind: 'rally' }],
            labels: laneLetters()
          },
          {
            caption: ['2. PIED SUR LA LIGNE :', 'DROIT DEVANT, D VERS A'],
            zones: [[[N, T, W, Q1], 'strong']], lines: LANES4,
            players: [[-0.2, 2.4, 1], [R, 8.57, 2]],
            shots: [{ p: [[0.5, 2.4], [21.6, 2.4]] }],
            labels: laneLetters()
          }
        ]
      }
    },
    {
      id: 'tt-m7', theme: 'mixte', source: SRC, refs: REF,
      title: 'Angle 1, puis angle 2', original: 'The X — Angle 1 & Angle 2',
      objective: 'Construire en profondeur à travers le X, puis écarter court et large une fois dans le terrain.',
      steps: [
        'Imaginer (ou tracer) un grand X d’un coin à l’autre du terrain de simple.',
        'Derrière la ligne de fond : seulement des angles 1 (la balle sort par la ligne de fond avant la ligne de côté).',
        'Avec un pied dans le terrain, on peut jouer un angle 2 : la balle sort par la ligne de côté, donc plus large et plus courte.',
        'Le point est ensuite libre.'
      ],
      score: 'Point classique ; un angle 2 joué depuis derrière la ligne de fond fait perdre le point.',
      tip: 'Plus large = plus court, toujours les deux à la fois. Large sans raccourcir, c’est la faute de côté.',
      variants: ['Repère pour changer de direction depuis le fond : le point où le X croise la ligne de service.', 'Au filet : première volée en angle 1 (profonde, basse), volée de conclusion en angle 2.'],
      coups: ['coup-droit', 'revers'], axes: ['profondeur', 'attaque', 'tactique'],
      equipment: BR, players: [2, 4], space: 'complet', duration: [10, 12, 15], intensity: 3,
      diagram: {
        panels: [
          {
            caption: ['DERRIÈRE LA LIGNE :', 'ANGLE 1, DANS LE X'],
            zones: [ANGLE1], lines: X_LINES,
            players: [[L, 7.6, 1], [R, M, 2]],
            shots: [{ p: [[0, 7.5], [22.4, 3.6]], n: '1', at: 0.5 }]
          },
          {
            caption: ['DANS LE TERRAIN : ANGLE 2,', 'PLUS LARGE ET PLUS COURT'],
            zones: [ANGLE2_A, ANGLE2_B], lines: X_LINES,
            players: [[3.6, 7.6, 1], [R, M, 2]],
            shots: [{ p: [[4.2, 7.4], [16.0, 2.0]], n: '2', at: 0.5 }]
          }
        ]
      }
    },
    {
      id: 'tt-m8', theme: 'mixte', source: SRC, refs: REF,
      title: 'Service-volée en 3 temps', original: 'Serve + Volleys With The X',
      objective: 'Le service-volée moderne : service, balle de transition profonde (angle 1), volée de conclusion (angle 2).',
      steps: [
        'Temps 1 : J1 sert (au T, ou sur le revers) et avance.',
        'Temps 2 : balle de transition, volée ou coup de fond, en angle 1 : profonde, de préférence du côté d’où vient le retour, dans le dos de J2 qui veut couvrir le côté ouvert.',
        'Temps 3 : volée de conclusion en angle 2, courte et large, de préférence sur une balle haute.',
        'Le point est libre si la balle revient. 5 points par série, puis on inverse.'
      ],
      score: 'Point classique ; point conclu en 3 temps = 2 points.',
      tip: 'Plus la volée est haute, plus l’angle 2 est facile : sur une balle basse, rester en angle 1.',
      variants: ['Service, coup droit, volée : la balle de transition est un coup droit d’approche.', 'Secondes balles de service uniquement pour J1.'],
      coups: ['service', 'volee', 'coup-droit'], axes: ['filet', 'attaque', 'tactique'],
      equipment: BR, players: [2, 4], space: 'complet', duration: [10, 12, 15], intensity: 3,
      diagram: {
        panels: [
          {
            caption: ['1 SERVICE · 2 TRANSITION', 'PROFONDE (ANGLE 1)'],
            zones: [ANGLE1], lines: X_LINES,
            players: [[-0.7, 6.6, 1, 'J1'], [6.0, 6.6, 1, 'J1'], [24.7, 4.2, 2, 'J2']],
            shots: [
              { p: [[-0.3, 6.5], [16.4, 4.8]], n: '1', at: 0.7 },
              { p: [[24.2, 4.2], [7.0, 6.4]], tone: 'deep', kind: 'throw' },
              { p: [[6.6, 6.3], [21.6, 3.4]], n: '2', at: 0.62 }
            ]
          },
          {
            caption: ['3 VOLÉE DE CONCLUSION', 'COURTE ET LARGE (ANGLE 2)'],
            zones: [ANGLE2_B], lines: X_LINES,
            players: [[9.4, 5.8, 1, 'J1'], [24.7, 3.4, 2, 'J2']],
            shots: [
              { p: [[24.2, 3.5], [10.2, 5.6]], tone: 'deep', kind: 'throw' },
              { p: [[10.0, 6.2], [16.2, 9.2]], n: '3', at: 0.5 }
            ]
          }
        ]
      }
    },
    {
      id: 'tt-m9', theme: 'mixte', source: SRC, refs: REF,
      title: '3 couloirs : déplacer le terrain', original: 'A 3 Lane Tennis Practice',
      objective: 'Passer d’échanges dans l’axe à des échanges en diagonale, puis à des points en terrain ouvert.',
      steps: [
        '1. Échanges dans l’axe, couloir central : profondeur et rythme.',
        '2. Diagonale côté égalité : croisés dans le couloir extérieur, en gardant la profondeur. 3. Même chose côté avantage.',
        '4. Points en terrain ouvert : mise en jeu sur un côté, croisés, puis changement de direction le long de la ligne.',
        '5. Finir par des points avec service et retour.'
      ],
      score: 'Étapes 1 à 3 sans score (3 minutes chacune) ; points classiques aux étapes 4 et 5.',
      tip: 'Dans l’axe, le terrain reste fermé : il faut une diagonale pour l’ouvrir.',
      variants: ['Matérialiser les couloirs avec deux cordes posées dans la longueur.', 'Étape 4 jouée en 2-1 tournant.'],
      coups: ['coup-droit', 'revers'], axes: ['tactique', 'regularite', 'precision'],
      equipment: BRL, eqNote: 'Cordes ou lignes pour les 3 couloirs', players: [2, 4], space: 'complet', duration: [15, 18, 25], intensity: 2,
      diagram: {
        panels: [
          {
            caption: ['ÉCHANGE DANS L’AXE', 'TERRAIN FERMÉ'],
            zones: [[[0, T3a, W, T3b], 'soft']], lines: LANES3,
            players: [[L, M, 1], [R, M, 2]],
            shots: [{ p: [[0, M], [23.4, M]], kind: 'rally' }]
          },
          {
            caption: ['DIAGONALE, PUIS LIGNE', 'TERRAIN OUVERT'],
            zones: [[[0, T3b, N, B], 'soft'], [[N, T, W, T3a], 'soft'], [[N, T3b, W, B], 'strong']], lines: LANES3,
            players: [[L, 8.2, 1], [R, 2.8, 2]],
            shots: [
              { p: [[0, 8.0], [23.2, 2.8]], kind: 'rally' },
              { p: [[0.4, 8.8], [21.6, 8.6]] }
            ]
          }
        ]
      }
    },

    /* ==================================================================
       SITUATIONS OUVERTES — jeux à score
       ================================================================== */
    {
      id: 'tt-o1', theme: 'ouvert', source: SRC, refs: REF,
      title: 'Tennis à deux couloirs', original: '2 Lane Framework',
      objective: 'Prendre le risque au bon moment : croisé derrière la ligne de fond, long de ligne une fois dans le terrain.',
      steps: [
        'Terrain coupé en deux dans la longueur : une moitié « croisé », une moitié « long de ligne ».',
        'Pieds derrière la ligne de fond : jouer croisé.',
        'Pieds dans le terrain : jouer long de ligne (changer de direction, c’est attaquer).',
        'Points avec service ; une frappe qui ne respecte pas la règle fait perdre le point.'
      ],
      score: 'Tie-breaks en 10 points.',
      tip: 'Pour un joueur confirmé, la vraie difficulté est de s’y tenir.',
      variants: ['Annoncer un motif avant le point (2-1 ou 3-1) et s’y tenir.', 'Seul J1 suit la règle, J2 joue librement.'],
      coups: ['coup-droit', 'revers'], axes: ['tactique', 'attaque'],
      equipment: BR, players: [2, 4], space: 'complet', duration: [10, 15, 20], intensity: 2,
      diagram: {
        panels: [
          {
            caption: ['PIEDS DERRIÈRE', 'LA LIGNE : CROISÉ'],
            zones: [[[N, T, W, M], 'strong']], lines: MID,
            players: [[L, 7.6, 1, 'J1'], [R, M, 2, 'J2']],
            shots: [{ p: [[0, 7.5], [21.4, 3.2]] }]
          },
          {
            caption: ['PIEDS DANS LE TERRAIN :', 'LONG DE LIGNE'],
            zones: [[[N, M, W, B], 'strong']], lines: MID,
            players: [[2.4, 7.6, 1, 'J1'], [R, M, 2, 'J2']],
            shots: [{ p: [[3.1, 7.6], [21.4, 7.8]] }]
          }
        ]
      }
    },
    {
      id: 'tt-o2', theme: 'ouvert', source: SRC, refs: REF,
      title: 'La bataille de la profondeur', original: 'The Depth Battle',
      objective: 'Gagner le tir à la corde inversé du match : celui qui joue le plus souvent profond repousse l’autre et gagne le droit d’avancer.',
      steps: [
        'Points avec service.',
        'Une frappe jouée depuis le fond de court qui tombe avant la ligne de service fait perdre le point.',
        'Depuis l’intérieur du terrain, tout est permis : attaque, volée, amorti, smash.'
      ],
      score: 'Tie-breaks en 10 points.',
      tip: 'Regarder aussi les positions : un joueur loin derrière sa ligne, l’autre dessus, et l’on sait qui gagne la bataille.',
      variants: ['Un repère de chaque côté à 2 m de la ligne de fond : balle au-delà = 1 point bonus.', 'Version douce : balle courte = 1 point de pénalité, sans perdre le point.'],
      coups: ['coup-droit', 'revers'], axes: ['profondeur', 'pression', 'tactique'],
      equipment: BR, players: [2, 4], space: 'complet', duration: [10, 15, 20], intensity: 2,
      diagram: {
        orient: 'v',
        zones: [['L.back', 'soft'], ['R.back', 'soft'], ['L.boxes', 'grey'], ['R.boxes', 'grey']],
        players: [[L, 6.8, 1], [R, 4.2, 2]],
        shots: [{ p: [[0, 6.8], [21.6, 4.4]] }],
        labels: [[21.0, 7.4, 'PROFOND', 'plainStrong'], [2.8, 3.6, 'PROFOND', 'plainStrong'], [N, M, 'COURTE = PERDU', 'dark']]
      }
    },
    {
      id: 'tt-o3', theme: 'ouvert', source: SRC, refs: REF,
      title: 'Le jeu des ouvertures', original: 'Mapping Tennis Openings',
      objective: 'Jouer ses ouvertures en match : annoncer son plan des premières balles et l’exécuter sous pression.',
      steps: [
        'Avant chaque point, le serveur annonce au coach (ou note sur une fiche) sa cible de service et sa balle 3, par exemple « 3, puis croisé au centre ».',
        'Le point se joue normalement.',
        'Si le serveur réussit son plan (service et balle 3 dans les cibles annoncées), le point gagné vaut 2.',
        'Le relanceur marque 2 points s’il gagne le point après avoir remis sa balle 4 dans le tiers central.'
      ],
      score: 'Set court en 4 jeux, ou tie-breaks en 10 points.',
      tip: 'Préparer une ouverture par côté, deux au maximum : on ne joue bien que celles qu’on a répétées.',
      variants: ['Le coach impose l’ouverture à chaque point.', 'Sur seconde balle de service, le relanceur annonce à son tour son plan.'],
      coups: ['service', 'retour'], axes: ['tactique', 'pression'],
      equipment: BR, players: [2, 4], space: 'complet', duration: [15, 20, 30], intensity: 3,
      diagram: {
        panels: [
          {
            caption: ['SERVICE : 1 À 6', 'RETOUR : 1 À 8'],
            zones: [[[N, T, SR, B], 'soft']],
            lines: [
              { p: [[N, 2.74], [SR, 2.74]], dash: true, w: 1.3 }, { p: [[N, 4.11], [SR, 4.11]], dash: true, w: 1.3 },
              { p: [[N, 6.86], [SR, 6.86]], dash: true, w: 1.3 }, { p: [[N, 8.23], [SR, 8.23]], dash: true, w: 1.3 },
              { p: [[0, T3a], [N, T3a]], dash: true, w: 1.3 }, { p: [[0, T3b], [N, T3b]], dash: true, w: 1.3 }, { p: [[0, M], [SL, M]], dash: true, w: 1.3 }
            ],
            players: [[-1.5, 6.6, 1, 'S'], [25.3, 3.0, 2, 'R']],
            labels: [
              [15.1, 2.05, '1', 'plainInk'], [15.1, 3.43, '2', 'plainInk'], [15.1, 4.8, '3', 'plainInk'],
              [15.1, 6.17, '4', 'plainInk'], [15.1, 7.54, '5', 'plainInk'], [15.1, 8.91, '6', 'plainInk'],
              [2.7, 8.2, '1', 'plainInk'], [2.7, 6.17, '2', 'plainInk'], [2.7, 4.8, '3', 'plainInk'], [2.7, 2.74, '4', 'plainInk'],
              [8.7, 8.2, '5', 'plainInk'], [8.7, 6.17, '6', 'plainInk'], [8.7, 4.8, '7', 'plainInk'], [8.7, 2.74, '8', 'plainInk']
            ]
          },
          {
            caption: ['BALLE 3 (EN HAUT)', 'BALLE 4 (EN BAS)'],
            zones: [['R', 'soft']],
            lines: [
              { p: [[0, T3a], [W, T3a]], dash: true, w: 1.3 }, { p: [[0, T3b], [W, T3b]], dash: true, w: 1.3 },
              { p: [[0, M], [SL, M]], dash: true, w: 1.3 }, { p: [[SR, M], [W, M]], dash: true, w: 1.3 }
            ],
            players: [[-1.5, 6.6, 1, 'S'], [25.3, 3.0, 2, 'R']],
            labels: [
              [21.0, 2.74, '1', 'plainInk'], [21.0, 4.8, '2', 'plainInk'], [21.0, 6.17, '3', 'plainInk'], [21.0, 8.2, '4', 'plainInk'],
              [15.1, 2.74, '5', 'plainInk'], [15.1, 4.8, '6', 'plainInk'], [15.1, 6.17, '7', 'plainInk'], [15.1, 8.2, '8', 'plainInk'],
              [2.7, 8.2, '1', 'plainInk'], [2.7, 6.17, '2', 'plainInk'], [2.7, 4.8, '3', 'plainInk'], [2.7, 2.74, '4', 'plainInk'],
              [8.7, 8.2, '5', 'plainInk'], [8.7, 6.17, '6', 'plainInk'], [8.7, 4.8, '7', 'plainInk'], [8.7, 2.74, '8', 'plainInk']
            ]
          }
        ]
      }
    },
    {
      id: 'tt-o4', theme: 'ouvert', source: SRC, refs: REF,
      title: 'Isolation sur le revers', original: '3-1 Patterns & Isolations',
      objective: 'Enfermer l’adversaire sur son côté faible… et frapper dans le côté ouvert quand il ne pense plus qu’à le protéger.',
      steps: [
        'Points avec service.',
        'Chaque joueur doit jouer 3 balles de suite dans la moitié revers adverse avant d’avoir le droit de jouer côté coup droit.',
        'Le compteur repart de zéro après chaque changement de côté.',
        'Le point gagné juste après l’ouverture (frappe côté coup droit) vaut 2.'
      ],
      score: 'Tie-breaks en 10 points.',
      tip: 'Plus l’isolation dure, plus l’adversaire s’inquiète du côté ouvert : il finit par laisser un trou.',
      variants: ['Contre un gaucher, l’isolation se joue de l’autre côté.', 'Seul J1 suit la règle : J2 cherche à casser l’isolation en changeant de direction.'],
      coups: ['coup-droit', 'revers'], axes: ['tactique', 'pression', 'regularite'],
      equipment: BR, players: [2, 4], space: 'complet', duration: [10, 15, 20], intensity: 2,
      diagram: {
        panels: [
          {
            caption: ['3 BALLES DE SUITE', 'SUR LE REVERS'],
            zones: [[[N, M, W, B], 'soft']], lines: MID,
            players: [[L, M, 1, 'J1'], [R, 7.6, 2, 'J2']],
            shots: [
              { p: [[0, M], [20.4, 6.6]], n: '1', at: 0.55 }, { p: [[0, M], [21.6, 7.7]], n: '2', at: 0.72 },
              { p: [[0, M], [22.6, 8.8]], n: '3', at: 0.9 }
            ]
          },
          {
            caption: ['PUIS LE CÔTÉ OUVERT', 'POINT × 2'],
            zones: [[[N, T, W, M], 'strong']], lines: MID,
            players: [[L, M, 1, 'J1'], [R, 8.4, 2, 'J2']],
            shots: [{ p: [[0, M], [21.4, 2.6]], n: '4', at: 0.6 }]
          }
        ]
      }
    },

    /* ==================================================================
       FOCUS
       ================================================================== */
    {
      id: 'tt-f1', theme: 'focus', source: SRC, refs: REF,
      title: 'Le mur et la fenêtre', original: 'Don’t Miss Wide',
      objective: 'Viser grand : le mur de 8 m de la ligne de fond adverse et la fenêtre de 4 m au milieu du filet.',
      steps: [
        'Faute de filet (la pire) : un défaut de geste, jouer plus haut.',
        'Faute large : trop d’ambition ou d’impatience, revenir vers le centre.',
        'Faute longue (la moins grave) : garder la vitesse et ajouter du lift.'
      ],
      axes: ['precision', 'regularite'],
      diagram: wallAndWindow(false)
    },
    {
      id: 'tt-f2', theme: 'focus', source: SRC, refs: REF,
      title: 'À chaque zone sa hauteur', original: 'Defense, Neutral, Offense',
      objective: 'Ma position décide de mon intention et de ma hauteur de balle.',
      steps: [
        'Défense (plus de 1,8 m derrière la ligne) : très haut et au centre, pour revenir en neutre.',
        'Neutre (1 à 1,5 m derrière) : au-dessus du double filet, une balle qui monte encore à la ligne de fond adverse.',
        'Attaque (dans le terrain) : à travers le double filet, puis avancer.'
      ],
      axes: ['tactique', 'defense', 'attaque'],
      diagram: { picto: 'heights' }
    },
    {
      id: 'tt-f3', theme: 'focus', source: SRC, refs: REF,
      title: 'Passer les 4 premières balles', original: 'The Power of the First 4 Balls',
      objective: 'Au service, garder l’avantage ; au retour, revenir à égalité : d’abord remettre sa balle 3 ou sa balle 4.',
      steps: [
        'Jouer le centre.',
        'Jouer croisé.',
        'Prendre cette balle en coup droit dès que possible.'
      ],
      axes: ['regularite', 'tactique'],
      diagram: opening(3222, true)
    }
  );
})();
