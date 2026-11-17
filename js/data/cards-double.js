/* ==========================================================================
   Assistant Coach — Paquet « Double » (Pressure Tennis, chapitre 7)
   Situations de double reformulées en français. Toutes ont format: 'double'
   (écartées des séances en simple, favorisées en séance de double).
   Formats : 1 contre 1 sur un demi-terrain de double (2 joueurs),
   2 contre 1 (3 joueurs), 2 contre 2 (4 joueurs).
   Schémas : équipe de gauche (pleine) = équipe au service ;
   équipe de droite (vide) = équipe au retour. Droitiers.
   Numérotation : à 4, J1 et J2 (pleins) contre J3 et J4 (vides) ; à 2, J1 contre J2.
   Codes de rôle dans les ronds : S serveur, R relanceur, P partenaire.
   ========================================================================== */
window.AC = window.AC || {};
AC.CARDS = AC.CARDS || [];

(function () {
  var L = -1.3, R = 25.1, N = 11.885, SL = 5.485, SR = 18.285, M = 5.485, W = 23.77, H = 10.97;
  var SRC = 'Pressure Tennis';
  var BR = ['balles', 'raquettes'];
  var DBL = 'double';

  /* Positions types (mètres) */
  var SERVER = [-0.6, 7.8];        // serveur, côté égalité
  var SERVER_IN = [6.6, 7.6];      // serveur après sa montée
  var PARTNER = [9, 3];            // partenaire du serveur au filet
  var RETURNER = [24.4, 2.6];      // relanceur, côté égalité
  var RET_PARTNER = [17.4, 7.8];   // partenaire du relanceur, ligne de service
  var SERVE = { p: [[-0.2, 7.6], [16.8, 3]] };
  var CLOSE = { p: [[0.2, 8.4], [6, 8.2]], kind: 'move' };

  function pl(pos, t, n) { return n ? [pos[0], pos[1], t, n] : [pos[0], pos[1], t]; }

  AC.CARDS.push(

    /* ==================================================================
       ÉCHAUFFEMENT
       ================================================================== */
    {
      id: 'pd-w1', theme: 'echauffement', source: SRC, format: DBL,
      title: 'Un au filet, un au fond', original: 'One-Up/One-Back Warm-Up',
      objective: 'Préparer une séance de double : volées contre frappes de fond, en croisé.',
      steps: [
        'J1 en fond de court, J2 à la volée ; uniquement des balles croisées (outside).',
        'J2 part de la ligne de service et avance après sa première volée.',
        '2 minutes côté égalité, 2 minutes côté avantage, puis on inverse les rôles.'
      ],
      score: 'Pas de score : régularité et précision.',
      tip: 'Poser une cible aux 3/4 du court, devant J1 : J2 la vise.',
      keys: [
        'Uniquement des balles croisées.',
        'Volées contrôlées vers la cible.',
        'Frappes de fond basses, dans les pieds du volleyeur.'
      ],
      variants: ['J1 avance d’un pas après chaque frappe ; J2 vise un nouvel endroit à chaque fois.', 'Volées en trois étapes : près du filet, ligne de service, 3/4 du court.'],
      coups: ['volee', 'coup-droit', 'revers'], axes: ['filet', 'regularite', 'inside-outside'],
      equipment: ['balles', 'raquettes', 'plots'], players: [2, 4], space: 'demi', duration: [6, 8, 10], intensity: 1,
      diagram: {
        zones: [['L.dbl.bot', 'soft'], ['R.dbl.top', 'soft']],
        players: [[L, 7.8, 1, 'J1'], [17.4, 3, 2, 'J2']],
        marks: [['cone', 3, 7.2]],
        shots: [
          { p: [[0, 7.8], [16.8, 3.2]], kind: 'rally' },
          { p: [[17.4, 1.8], [14.4, 1.8]], kind: 'move' }
        ]
      }
    },
    {
      id: 'pd-w2', theme: 'echauffement', source: SRC, format: DBL,
      title: 'Double à deux balles', original: 'Doubles Warm-Up',
      objective: 'Échauffer les quatre joueurs en même temps, puis basculer en point de double.',
      steps: [
        'Deux échanges croisés en même temps : deux joueurs de fond mettent en jeu croisé vers la ligne de service, les deux autres approchent en croisé.',
        'Les joueurs de fond jouent croisé, les volleyeurs volleyent croisé.',
        'Dès qu’un échange s’arrête, les quatre joueurs finissent ensemble l’autre balle, comme un point de double.',
        'On change de côté toutes les 2 minutes ; les lanceurs changent après 4 minutes.'
      ],
      score: 'Pas de score, ou 1 point pour l’équipe qui gagne la balle restante.',
      tip: 'Idéal pour passer de l’échauffement à l’intensité du double.',
      keys: [
        'Rester croisé tant que les deux balles sont en jeu.',
        'Réagir vite quand une balle s’arrête.',
        'Communiquer avec son partenaire.'
      ],
      variants: ['Les deux équipes démarrent au fond ; dès qu’un échange s’arrête, n’importe qui peut prendre le filet.'],
      coups: ['coup-droit', 'revers', 'volee'], axes: ['reaction', 'filet', 'regularite'],
      equipment: BR, players: [4, 4], space: 'complet', duration: [6, 8, 10], intensity: 2,
      diagram: {
        zones: [['L.dbl', 'soft'], ['R.dbl', 'soft']],
        players: [[L, 8.2, 1], [L, 2.8, 1], [16.6, 2.8, 2], [16.6, 8.2, 2]],
        shots: [
          { p: [[0, 8.2], [16, 3]], kind: 'rally' },
          { p: [[0, 2.8], [16, 8]], kind: 'rally' }
        ],
        labels: [[N, 10.4, '2 BALLES EN JEU', 'tag']]
      }
    },

    /* ==================================================================
       DRILLS
       ================================================================== */
    {
      id: 'pd-d1', theme: 'drill', source: SRC, format: DBL,
      title: 'Seconde balle en double : 4 séquences', original: 'Doubles 20 Second Serves — Window / Lob / Short-Angle / Returner Approach',
      objective: 'Travailler les premières frappes d’un point de double à partir d’une seconde balle.',
      steps: [
        'Demi-terrain de double en croisé. J1 sert 20 secondes balles en montant (10 égalité, 10 avantage) ; J2 retourne bas et croisé.',
        'Séquence « fenêtre » : première volée croisée de J1, puis J2 passe entre J1 et un partenaire imaginaire.',
        'Séquence « lob » : J2 lobe le long de la ligne, au-dessus du partenaire imaginaire.',
        'Séquence « volée courte » : J2 offre une volée outside que J1 joue courte et croisée. Séquence « retour-montée » : J1 reste au fond, J2 retourne et monte.'
      ],
      score: 'Secondes balles réussies sur 20 (objectif 17).',
      tip: 'Le retour bas, dans les pieds du serveur qui monte, ouvre la fenêtre ou le lob.',
      keys: [
        'Seconde balle avec effet, pour avoir le temps de monter.',
        'Retour bas et croisé.',
        'La « fenêtre » : l’espace entre les deux joueurs au filet.'
      ],
      variants: ['Imposer la zone de la seconde balle.', 'Retours en slice pour la séquence « retour-montée ».'],
      coups: ['service', 'retour', 'volee', 'lob'], axes: ['regularite', 'filet', 'pression'],
      equipment: BR, players: [2, 4], space: 'demi', duration: [10, 15, 20], intensity: 2,
      diagram: {
        zones: [['R.box.top', 'soft']],
        marks: [['ring', PARTNER[0], PARTNER[1]]],
        players: [pl(SERVER, 1, 'J1'), pl(SERVER_IN, 1, 'J1'), pl(RETURNER, 2, 'J2')],
        shots: [
          SERVE, CLOSE,
          { p: [[23.8, 2.8], [7.2, 7.2]], tone: 'deep' },
          { p: [[7.2, 7.6], [21.6, 3.8]] },
          { p: [[23.6, 3.4], [2.6, 5.3]], tone: 'deep' }
        ],
        labels: [[4.4, 4.3, 'FENÊTRE', 'tag']]
      }
    },
    {
      id: 'pd-d2', theme: 'drill', source: SRC, format: DBL,
      title: 'Service et poacheur', original: '20 Serves With Server’s Partner',
      objective: 'Développer le poach du partenaire du serveur.',
      steps: [
        'J1 sert 20 secondes balles (10 égalité, 10 avantage).',
        'J2 retourne au-dessus de la sangle centrale du filet.',
        'J3, partenaire du serveur, poache le retour et volleye croisé.',
        'Rotation : le serveur devient poacheur, le poacheur relanceur, le relanceur serveur.'
      ],
      score: 'Secondes balles réussies sur 20.',
      tip: 'Le poacheur se déplace en diagonale vers la sangle centrale.',
      keys: [
        'Partir quand le relanceur s’engage sur sa frappe.',
        'Diagonale vers la sangle centrale.',
        'Volée de poach vers le partenaire du relanceur, ou entre les deux.'
      ],
      variants: ['Le relanceur change de direction sur un service inside : le poacheur doit lire la situation avant de partir.', 'Service-volée et retour libre : le partenaire cherche toujours à poacher.'],
      coups: ['volee', 'service', 'retour'], axes: ['filet', 'reaction', 'tactique'],
      equipment: BR, players: [3, 4], space: 'complet', duration: [15, 20, 20], intensity: 2,
      diagram: {
        zones: [['R.box.top', 'soft']],
        players: [pl(SERVER, 1, 'J1'), pl(PARTNER, 1, 'J3'), pl(RETURNER, 2, 'J2')],
        shots: [
          SERVE,
          { p: [[23.8, 2.8], [12.4, 5.4]], tone: 'deep' },
          { p: [[9.4, 3.5], [10.9, 5]], kind: 'move' },
          { p: [[11.4, 5.5], [20.8, 9.6]] }
        ],
        labels: [[7.2, 1.0, 'POACH', 'tag']]
      }
    },
    {
      id: 'pd-d3', theme: 'drill', source: SRC, format: DBL,
      title: 'Poach du partenaire du relanceur', original: '20 Serves With Returner’s Partner',
      objective: 'Développer le déplacement et le poach du partenaire du relanceur.',
      steps: [
        'J1 sert 20 secondes balles en montant ; J2 retourne croisé sur le serveur.',
        'J1 volleye au-dessus de la sangle centrale.',
        'J3, partenaire du relanceur, avance en diagonale vers la sangle centrale et poache la volée du serveur.',
        'Rotation des trois rôles après 20 services.'
      ],
      score: 'Secondes balles réussies sur 20.',
      tip: 'Le relanceur prépare le poach : retour bas, dans les pieds du serveur.',
      keys: [
        'Retour bas, dans les pieds du serveur.',
        'Le partenaire avance, puis glisse vers le centre.',
        'Assez près pour toucher le filet avec la raquette après le déplacement.'
      ],
      variants: ['Le serveur choisit la zone de sa volée : le partenaire doit la respecter.', 'Imposer la zone de la seconde balle.'],
      coups: ['volee', 'retour', 'service'], axes: ['filet', 'reaction', 'tactique'],
      equipment: BR, players: [3, 4], space: 'complet', duration: [15, 20, 20], intensity: 2,
      diagram: {
        zones: [['R.dbl', 'soft']],
        players: [pl(SERVER_IN, 1, 'J1'), pl(RETURNER, 2, 'J2'), pl(RET_PARTNER, 2, 'J3')],
        shots: [
          { p: [[23.8, 2.8], [7.2, 7.2]], tone: 'deep' },
          { p: [[7.2, 7.4], [13.4, 5.4]] },
          { p: [[17, 7.4], [13.4, 5.8]], kind: 'move' },
          { p: [[13.2, 5.4], [2.8, 3]], tone: 'deep' }
        ],
        labels: [[17.4, 9.6, 'POACH', 'tag']]
      }
    },

    /* ==================================================================
       MIXTE
       ================================================================== */
    {
      id: 'pd-m1', theme: 'mixte', source: SRC, format: DBL,
      title: 'Croisés en double', original: 'Doubles Crosscourts',
      objective: 'Construire un point de double depuis le fond de court, couloirs compris.',
      steps: [
        'Points en croisé sur un demi-terrain de double (couloir compris).',
        'Coups droits côté égalité, revers côté avantage ; replacement sur une marque après chaque frappe.',
        'Chacun sert deux points, puis on change.'
      ],
      score: 'Point classique (3-4 min).',
      tip: 'La ligne de simple sert de cible : on garde de la marge avec le couloir.',
      keys: [
        'Croisé et profond, avec de la marge.',
        'Utiliser l’angle que donne le couloir.',
        'Patience : le double ne se gagne pas du fond.'
      ],
      variants: ['Jokers : service-volée, amorti, retour-montée ou lob autorisés une fois par point.', 'Faute dans le filet = 2 points.'],
      coups: ['coup-droit', 'revers'], axes: ['regularite', 'tactique', 'inside-outside'],
      equipment: BR, players: [2, 4], space: 'demi', duration: [8, 10, 12], intensity: 2,
      diagram: {
        zones: [['L.dbl.bot', 'soft'], ['R.dbl.top', 'soft']],
        players: [[L, 8.4, 1], [R, 2.6, 2]],
        shots: [{ p: [[0, 8.4], [23, 2.6]], kind: 'rally' }],
        labels: [[5.6, 10.3, 'COULOIR EN JEU', 'tag']]
      }
    },
    {
      id: 'pd-m2', theme: 'mixte', source: SRC, format: DBL,
      title: 'Volées réflexes en double', original: 'Doubles Crosscourt Pinch Volleys',
      objective: 'Mains rapides en double : volées contre frappes de fond jouées dans le court, en croisé.',
      steps: [
        'Demi-terrain de double en croisé. J1 sur la ligne de service, J2 sur ou dans la ligne de fond.',
        'J1 met en jeu croisé ; J2 lui fait jouer une volée ; J1 volleye puis avance.',
        'J2 joue le point sans reculer derrière sa ligne. Pas de lob.',
        '2 minutes chacun au filet, toujours du même côté (égalité ou avantage).'
      ],
      score: 'Seul le volleyeur marque ; le joueur de fond perd le point s’il recule.',
      tip: 'Contrôler ses volées dans les échanges rapides.',
      keys: [
        'Tamis devant soi, gestes courts.',
        'Fond : rester dans le court.',
        'Volleyeur : fermer après chaque volée.'
      ],
      variants: ['Lob autorisé après deux volées.', 'Balles dans les pieds du volleyeur (demi-volées).'],
      coups: ['volee', 'coup-droit', 'revers'], axes: ['reaction', 'filet', 'pression'],
      equipment: BR, players: [2, 4], space: 'demi', duration: [4, 6, 8], intensity: 3,
      diagram: {
        zones: [['L.dbl.bot', 'soft'], ['R.dbl.top', 'soft']],
        players: [[SL, 7.8, 1, 'J1'], [23.1, 2.8, 2, 'J2']],
        shots: [
          { p: [[6.1, 7.7], [22.5, 3]], kind: 'rally' },
          { p: [[6.2, 9.4], [9, 9.4]], kind: 'move' }
        ]
      }
    },
    {
      id: 'pd-m3', theme: 'mixte', source: SRC, format: DBL,
      title: 'Approche et volées en double', original: 'Doubles One-Player Closing Volleys (1v1)',
      objective: 'Enchaîner approche croisée, première volée profonde et conclusion.',
      steps: [
        'Demi-terrain de double en croisé, les deux joueurs au fond.',
        'J2 met en jeu croisé vers la ligne de service et reste au fond ; J1 approche croisé.',
        'J2 fait jouer une volée ou une demi-volée à J1, puis le point est libre.',
        'Chacun met en jeu deux points.'
      ],
      score: 'Point classique (3-4 min).',
      tip: 'Une première volée profonde et contrôlée pour se placer avant la volée gagnante.',
      keys: [
        'Approche croisée, préparation courte.',
        'Première volée profonde.',
        'Conclure en une ou deux frappes.'
      ],
      variants: ['Au service : le relanceur approche sur son retour.', 'Approche en slice ; lobs autorisés ou non.'],
      coups: ['volee', 'coup-droit', 'revers', 'smash'], axes: ['filet', 'attaque'],
      equipment: BR, players: [2, 4], space: 'demi', duration: [6, 8, 12], intensity: 3,
      diagram: {
        zones: [['L.dbl.bot', 'soft'], ['R.dbl.top', 'soft']],
        players: [[3, 7.6, 1, 'J1'], [8.4, 7.2, 1, 'J1'], [R, 2.6, 2, 'J2']],
        shots: [
          { p: [[24.2, 2.8], [3.8, 7.4]], tone: 'deep' },
          { p: [[3.6, 7.6], [22.2, 3]] },
          { p: [[3.4, 8.8], [8, 8.6]], kind: 'move' }
        ]
      }
    },
    {
      id: 'pd-m4', theme: 'mixte', source: SRC, format: DBL,
      title: 'Duel de volées en double', original: 'Doubles Two-Player Closing Volleys',
      objective: 'Gagner les échanges rapides de volées quand les deux joueurs ferment le filet, en croisé.',
      steps: [
        'Demi-terrain de double en croisé, les deux joueurs au fond.',
        'J1 met en jeu croisé vers la ligne de service et monte ; J2 approche en jouant sur lui (pas de passing sur la mise en jeu).',
        'Échange de volées croisées en avançant, puis le point est libre.'
      ],
      score: 'Point classique (3-4 min).',
      tip: 'Celui qui remonte une volée est en danger : volées basses.',
      keys: [
        'Volées basses, dans les pieds.',
        'Avancer à chaque volée.',
        'Rester croisé.'
      ],
      variants: ['Première volée obligatoirement devant le joueur qui monte.', 'Approche en slice ; lobs autorisés ou non.'],
      coups: ['volee'], axes: ['filet', 'reaction'],
      equipment: BR, players: [2, 4], space: 'demi', duration: [6, 8, 10], intensity: 3,
      diagram: {
        zones: [['L.dbl.bot', 'soft'], ['R.dbl.top', 'soft']],
        players: [[5, 7.6, 1, 'J1'], [18.8, 3.2, 2, 'J2']],
        shots: [
          { p: [[5.6, 7.5], [18.2, 3.3]], kind: 'rally' },
          { p: [[5, 9], [8.4, 9]], kind: 'move' },
          { p: [[18.8, 1.8], [15.4, 1.8]], kind: 'move' }
        ]
      }
    },
    {
      id: 'pd-m5', theme: 'mixte', source: SRC, format: DBL,
      title: 'Smash contre deux au fond', original: 'Doubles Overhead Game (2v1)',
      objective: 'Ouvrir le terrain au smash face à une équipe qui défend à deux au fond.',
      steps: [
        'J1 au T de la ligne de service, J2 et J3 en fond de court.',
        'J1 met en jeu vers J2 ou J3, qui lui font jouer une volée ; J1 avance et volleye ; J2 ou J3 lobe.',
        'Le point démarre au premier smash : J2 et J3 frappent sur J1, les lobs peuvent aller partout.',
        'Rotation dans le sens des aiguilles d’une montre toutes les 3 minutes.'
      ],
      score: 'Nombre de points gagnés par le smasheur.',
      tip: 'Sonder le milieu avant de chercher l’angle, surtout sur les lobs profonds.',
      keys: [
        'Smash au milieu d’abord, angle ensuite.',
        'Plus on est près du filet, plus l’angle est grand.',
        'Défense : lober, et frapper sur le joueur au filet.'
      ],
      variants: ['Après la volée de J1, J2 et J3 ne jouent plus que des lobs.'],
      coups: ['smash', 'volee', 'lob'], axes: ['filet', 'attaque', 'defense'],
      equipment: BR, players: [3, 3], space: 'complet', duration: [9, 9, 12], intensity: 3,
      diagram: {
        zones: [['R.dbl', 'soft']],
        players: [[6.2, 5.5, 1, 'J1'], [R, 2.6, 2, 'J2'], [R, 8.4, 2, 'J3']],
        shots: [
          { p: [[24.4, 2.8], [6.6, 4.4]], arc: -3.6, tone: 'deep' },
          { p: [[6.8, 5.4], [21, 5.6]] }
        ],
        labels: [[17.2, 4.4, 'MILIEU D’ABORD', 'tag']]
      }
    },
    {
      id: 'pd-m6', theme: 'mixte', source: SRC, format: DBL,
      title: 'Volées rapides à quatre', original: 'Doubles Quick Volleys',
      objective: 'Échanges de volées réflexes et déplacements en équipe.',
      steps: [
        'Les quatre joueurs démarrent sur la ligne de service, chacun avec 2-3 balles.',
        'Mises en jeu à tour de rôle (J1, J3, J2, J4), au moins à hauteur de genou, vers l’équipe adverse.',
        'Volée de retour, puis le point est libre. On revient sur la ligne de service après chaque point.'
      ],
      score: 'Point classique ; parties de 3 à 5 minutes.',
      tip: 'Se déplacer ensemble, comme reliés par une corde de 2,5 m.',
      keys: [
        'Bouger avec son partenaire.',
        'Garder l’initiative : volées vers le bas.',
        'Réflexes : tamis devant soi.'
      ],
      variants: ['Le coach met en jeu.', 'Sur un terrain de simple.', 'Lobs autorisés ou non.'],
      coups: ['volee'], axes: ['reaction', 'filet', 'tactique'],
      equipment: BR, players: [4, 4], space: 'complet', duration: [3, 5, 8], intensity: 3,
      diagram: {
        zones: [['L.dbl', 'soft'], ['R.dbl', 'soft']],
        players: [[SL, 3, 1, 'J2'], [SL, 8, 1, 'J1'], [SR, 3, 2, 'J3'], [SR, 8, 2, 'J4']],
        shots: [
          { p: [[6.1, 3.2], [17.6, 7.6]], kind: 'rally' },
          { p: [[6.1, 7.8], [17.6, 3.4]], kind: 'rally' }
        ],
        labels: [[SL, 10.3, 'LIGNE DE SERVICE', 'plainInk']]
      }
    },
    {
      id: 'pd-m7', theme: 'mixte', source: SRC, format: DBL,
      title: 'Deux au filet contre position classique', original: 'Doubles One-Player Closing Volleys (2v2)',
      objective: 'Jouer à deux au filet contre une équipe en position classique (un au filet, un au fond)… et construire le point contre elle.',
      steps: [
        'Positions classiques de double.',
        'J1 (au fond) met en jeu croisé vers la ligne de service et y reste ; J3, en face, approche croisé et rejoint J4 au filet.',
        'J1 fait jouer une volée ou une demi-volée, puis le point est libre.',
        'Rotation : chacun met en jeu deux points.'
      ],
      score: 'Point classique (5 min).',
      tip: 'J1 : jouer entre J3 et J4, ou bas et croisé pour faire remonter la volée vers J2.',
      keys: [
        'Équipe au filet : garder l’initiative jusqu’à la deuxième volée.',
        'Fond : entre les deux ou bas croisé.',
        'Lob efficace après la première volée adverse.'
      ],
      variants: ['Lobs autorisés ou non.', 'Approche en slice.'],
      coups: ['volee', 'coup-droit', 'revers', 'lob'], axes: ['filet', 'tactique', 'attaque'],
      equipment: BR, players: [4, 4], space: 'complet', duration: [5, 5, 8], intensity: 3,
      diagram: {
        zones: [['L.dbl', 'soft'], ['R.dbl', 'soft']],
        players: [[L, 8.2, 1, 'J1'], [9, 3, 1, 'J2'], [R, 3, 2, 'J3'], [15, 8, 2, 'J4']],
        shots: [
          { p: [[0, 7.8], [17.8, 3.2]], kind: 'throw' },
          { p: [[24.2, 3.1], [16.4, 3.4]], kind: 'move' },
          { p: [[0, 8.6], [14.4, 5.7]] }
        ],
        labels: [[19.4, 6.3, 'ENTRE LES DEUX', 'tag']]
      }
    },
    {
      id: 'pd-m8', theme: 'mixte', source: SRC, format: DBL,
      title: 'Monter à deux contre deux au fond', original: 'Doubles One-Team Closing Volleys',
      objective: 'Monter au filet en équipe face à deux défenseurs… et apprendre à neutraliser.',
      steps: [
        'Les deux équipes démarrent en fond de court.',
        'J3 met en jeu croisé vers la ligne de service ; J1 approche par le milieu et monte avec J2.',
        'J3 ou J4 font jouer une volée ou une demi-volée, puis le point est libre.',
        'Chaque équipe met en jeu 4 points (2 égalité, 2 avantage).'
      ],
      score: 'Point classique (5 min).',
      tip: 'Équipe au filet : sonder le milieu, jouer entre les deux, volées courtes et larges, s’isoler sur un joueur.',
      keys: [
        'Approche par le milieu.',
        'Patience au filet.',
        'Défense : lob après la première volée.'
      ],
      variants: ['Lobs autorisés ou non.', 'Approche en slice.'],
      coups: ['volee', 'coup-droit', 'revers', 'lob'], axes: ['filet', 'attaque', 'defense'],
      equipment: BR, players: [4, 4], space: 'complet', duration: [5, 5, 8], intensity: 3,
      diagram: {
        zones: [['L.dbl', 'soft'], ['R.dbl', 'soft']],
        players: [[6.4, 3.2, 1, 'J2'], [6.4, 7.8, 1, 'J1'], [R, 2.6, 2, 'J3'], [R, 8.4, 2, 'J4']],
        shots: [
          { p: [[24.4, 2.9], [7.4, 7.4]], kind: 'throw', tone: 'deep' },
          { p: [[7.2, 7.5], [22.4, 5.5]] },
          { p: [[0.4, 3.2], [5.6, 3.2]], kind: 'move' },
          { p: [[0.4, 7.8], [5.6, 7.8]], kind: 'move' }
        ],
        labels: [[16.4, 4.4, 'MILIEU', 'tag']]
      }
    },
    {
      id: 'pd-m9', theme: 'mixte', source: SRC, format: DBL,
      title: 'Smash à deux', original: 'Doubles Overhead Game (2v2)',
      objective: 'Contrôler et finir le point au smash en équipe, face à deux défenseurs au fond.',
      steps: [
        'L’équipe qui met en jeu attaque, l’autre défend à deux au fond.',
        'J1 met en jeu croisé depuis les 3/4 du court et monte ; J3 frappe croisé sur J1 ; J1 volleye au milieu.',
        'J3 ou J4 lobe : le point commence, J1 ou J2 smashent.',
        'Chacun met en jeu deux points, puis on inverse les rôles.'
      ],
      score: 'Point classique (4 ou 6 min).',
      tip: 'Volées courtes et croisées : très efficaces contre une équipe à deux au fond.',
      keys: [
        'Smash au milieu avant l’angle.',
        'Fermer le filet après chaque smash.',
        'Défense : lober en variant hauteur et profondeur.'
      ],
      variants: ['La défense lobe toutes les balles après la première volée.', 'Seuls les points joués après un smash comptent.'],
      coups: ['smash', 'volee', 'lob'], axes: ['filet', 'attaque', 'defense'],
      equipment: BR, players: [4, 4], space: 'complet', duration: [4, 6, 8], intensity: 3,
      diagram: {
        zones: [['L.dbl', 'soft'], ['R.dbl', 'soft']],
        players: [[7.6, 3.2, 1, 'J2'], [7.6, 7.8, 1, 'J1'], [R, 2.8, 2, 'J3'], [R, 8.2, 2, 'J4']],
        shots: [
          { p: [[24.4, 8], [6.6, 7]], arc: -3.4, tone: 'deep' },
          { p: [[8, 7.6], [21.4, 5.4]] }
        ],
        labels: [[N, 10.4, 'LE POINT DÉMARRE AU LOB', 'tag']]
      }
    },
    {
      id: 'pd-m10', theme: 'mixte', source: SRC, format: DBL,
      title: 'Retour-montée', original: 'Doubles With Returner Pressuring',
      objective: 'Prendre le filet en équipe sur retour de seconde balle… et défendre contre ça.',
      steps: [
        'Positions classiques de double, une seule balle de service ; le serveur monte ou reste au fond.',
        'Le relanceur retourne croisé et monte au filet ; le point est ensuite libre.',
        'Chaque joueur sert 4 points, en alternant les équipes.'
      ],
      score: 'Point classique (5 min).',
      tip: 'Retour en slice : il laisse le temps de monter jusqu’à une bonne position de première volée.',
      keys: [
        'Retour bas, dans les pieds du serveur qui monte.',
        'Avancer pendant le retour.',
        'Première volée dans le carré de service.'
      ],
      variants: ['Le serveur reste au fond.', 'Le partenaire du relanceur poache.', 'Lob de retour au-dessus du partenaire du serveur, puis montée.', 'Poach réussi = 2 points.'],
      coups: ['retour', 'volee', 'service'], axes: ['attaque', 'filet', 'pression'],
      equipment: BR, players: [4, 4], space: 'complet', duration: [5, 5, 8], intensity: 3,
      diagram: {
        zones: [['L.dbl', 'soft'], ['R.dbl', 'soft']],
        players: [pl(SERVER, 1, 'S'), pl(PARTNER, 1, 'P'), pl(RETURNER, 2, 'R'), [19, 3.8, 2, 'R'], pl(RET_PARTNER, 2, 'P')],
        shots: [
          SERVE,
          { p: [[23.8, 2.8], [6.8, 7.8]], tone: 'deep' },
          { p: [[23.8, 3.4], [19.6, 3.8]], kind: 'move' }
        ],
        labels: [[21.6, 5.4, 'JE MONTE', 'tag']]
      }
    },
    {
      id: 'pd-m11', theme: 'mixte', source: SRC, format: DBL,
      title: 'Le partenaire du relanceur poache', original: 'Doubles With Returner’s Partner Poaching',
      objective: 'Préparer le poach du partenaire du relanceur… et défendre contre ce poach.',
      steps: [
        'Positions classiques de double, une seule balle de service ; le serveur monte ou reste au fond.',
        'Le relanceur retourne croisé sur le serveur ; le serveur volleye ou frappe croisé.',
        'Le partenaire du relanceur avance puis se décale vers la sangle centrale pour poacher.',
        'Chaque joueur sert 4 points, en alternant les équipes.'
      ],
      score: 'Point classique (5 min).',
      tip: 'Retour bas si le serveur monte, profond s’il reste au fond : le relanceur prépare le poach.',
      keys: [
        'Retour bas ou profond selon le serveur.',
        'Le partenaire avance, puis glisse vers le centre.',
        'Assez près du filet pour le toucher avec la raquette.'
      ],
      variants: ['Le serveur reste au fond.', 'Le relanceur monte derrière son retour.', 'Poach réussi = 2 points.'],
      coups: ['retour', 'volee'], axes: ['filet', 'tactique', 'reaction'],
      equipment: BR, players: [4, 4], space: 'complet', duration: [5, 5, 8], intensity: 3,
      diagram: {
        zones: [['L.dbl', 'soft'], ['R.dbl', 'soft']],
        players: [pl(SERVER_IN, 1, 'S'), pl(PARTNER, 1, 'P'), pl(RETURNER, 2, 'R'), pl(RET_PARTNER, 2, 'P')],
        shots: [
          { p: [[23.8, 2.8], [7.2, 7.2]], tone: 'deep' },
          { p: [[7.2, 7.4], [13.4, 5.4]] },
          { p: [[17, 7.4], [13.4, 5.8]], kind: 'move' },
          { p: [[13.2, 5.4], [3, 5.4]], tone: 'deep' }
        ],
        labels: [[17.4, 9.6, 'POACH', 'tag']]
      }
    },

    /* ==================================================================
       SITUATIONS OUVERTES
       ================================================================== */
    {
      id: 'pd-o1', theme: 'ouvert', source: SRC, format: DBL,
      title: 'Service-volée croisé', original: 'Doubles Crosscourt Serve and Volley (1v1)',
      objective: 'Le cœur du double : service, retour et première volée, en point réel.',
      steps: [
        'Demi-terrain de double en croisé, une seule balle de service.',
        'Le serveur monte au filet ; le relanceur retourne toujours croisé ; le serveur volleye croisé.',
        'Le point se joue ensuite librement en croisé.',
        'Chacun sert deux points (égalité puis avantage).'
      ],
      score: 'Point classique (3-4 min).',
      tip: 'Sans couloir libre, il faut travailler le point : dans les pieds, en lob, dans le corps ou au milieu.',
      keys: [
        'Première balle avec effet pour avoir le temps de monter.',
        'Retour bas et croisé.',
        'Première volée profonde et croisée.'
      ],
      variants: ['Faute au service, au retour ou à la première volée = 2 points.', 'Le relanceur doit monter derrière son retour.', 'Deux balles de service.'],
      coups: ['service', 'retour', 'volee'], axes: ['filet', 'pression', 'attaque'],
      equipment: BR, players: [2, 4], space: 'demi', duration: [6, 8, 10], intensity: 3,
      diagram: {
        zones: [['L.dbl.bot', 'soft'], ['R.dbl.top', 'soft']],
        players: [pl(SERVER, 1, 'S'), pl(SERVER_IN, 1, 'S'), [24.4, 2.8, 2, 'R']],
        shots: [
          SERVE, CLOSE,
          { p: [[23.8, 2.9], [7.2, 7.4]], tone: 'deep' },
          { p: [[7.2, 7.8], [22.4, 3.6]] }
        ]
      }
    },
    {
      id: 'pd-o2', theme: 'ouvert', source: SRC, format: DBL,
      title: 'Équipe au retour contre serveur', original: 'Returning Team vs. a Server (2v1)',
      objective: 'Faire travailler l’équipe au retour : obliger le serveur à volleyer et lancer le poach du partenaire.',
      steps: [
        'Le serveur sert une seconde balle, monte et joue seul contre l’équipe au retour.',
        'Le relanceur ne joue que croisé ; le serveur et le partenaire du relanceur jouent partout.',
        'Le partenaire du relanceur avance et cherche à poacher. Service alterné égalité / avantage.',
        '3 minutes par rôle (serveur, relanceur, partenaire) : partie de 9 minutes.'
      ],
      score: 'Points gagnés par chaque joueur quand il est au service.',
      tip: 'Le serveur sert au milieu pour fermer les angles de retour.',
      keys: [
        'Relanceur : obliger le serveur à jouer une première volée.',
        'Partenaire : fermer et poacher.',
        'Serveur : servir au T.'
      ],
      variants: ['Le serveur reste au fond et ne monte que sur balle courte.', 'Deux balles de service, mais seulement deux secondes balles par tranche de 3 minutes.', 'Le relanceur doit monter sur le service.'],
      coups: ['service', 'retour', 'volee'], axes: ['filet', 'tactique', 'pression'],
      equipment: BR, players: [3, 3], space: 'complet', duration: [9, 9, 12], intensity: 3,
      diagram: {
        zones: [['R.dbl', 'soft']],
        players: [pl(SERVER, 1, 'S'), pl(SERVER_IN, 1, 'S'), pl(RETURNER, 2, 'R'), pl(RET_PARTNER, 2, 'P')],
        shots: [
          { p: [[-0.2, 7.6], [17.6, 5.1]] }, CLOSE,
          { p: [[23.8, 2.8], [7.2, 7.4]], tone: 'deep' },
          { p: [[17, 7.4], [13.4, 5.8]], kind: 'move' }
        ]
      }
    },
    {
      id: 'pd-o3', theme: 'ouvert', source: SRC, format: DBL,
      title: 'Équipe au service contre relanceur', original: 'Serving Team vs. a Returner (2v1)',
      objective: 'Faire travailler l’équipe au service : service-volée et jeu du partenaire (feinte ou poach).',
      steps: [
        'Le serveur sert une seconde balle et monte, son partenaire au filet ; le relanceur est seul.',
        'Le serveur ne joue que croisé ; le relanceur et le partenaire du serveur jouent partout.',
        'Le partenaire du serveur feinte ou poache. Service alterné égalité / avantage.',
        '3 minutes par rôle : partie de 9 minutes.'
      ],
      score: 'Points gagnés par chaque joueur quand il est au retour.',
      tip: 'Relanceur : faire jouer une première volée au serveur, puis lober ou jouer entre les deux pour créer l’ouverture.',
      keys: [
        'Combinaisons annoncées entre serveur et partenaire.',
        'Feinte ou poach du partenaire.',
        'Relanceur : lob ou balle entre les deux.'
      ],
      variants: ['Le serveur reste au fond et ne monte que sur balle courte.', 'Deux balles de service, avec deux secondes balles maximum par tranche de 3 minutes.'],
      coups: ['service', 'retour', 'volee', 'lob'], axes: ['filet', 'tactique', 'pression'],
      equipment: BR, players: [3, 3], space: 'complet', duration: [9, 9, 12], intensity: 3,
      diagram: {
        zones: [['L.dbl', 'soft']],
        players: [pl(SERVER, 1, 'S'), pl(SERVER_IN, 1, 'S'), pl(PARTNER, 1, 'P'), pl(RETURNER, 2, 'R')],
        shots: [
          SERVE, CLOSE,
          { p: [[23.8, 2.8], [12.4, 5.4]], tone: 'deep' },
          { p: [[9.4, 3.5], [10.9, 5]], kind: 'move' }
        ],
        labels: [[7, 1.0, 'FEINTE OU POACH', 'tag']]
      }
    },
    {
      id: 'pd-o4', theme: 'ouvert', source: SRC, format: DBL,
      title: 'Service-volée contre deux au fond', original: 'Doubles Serve and Volley vs. Two Back',
      objective: 'Servir-volleyer contre une équipe qui retourne à deux au fond… et retourner à deux au fond.',
      steps: [
        'Points de double classiques : l’équipe au service fait service-volée, l’équipe au retour joue à deux au fond.',
        'Chaque équipe sert 4 minutes (2 minutes par joueur).'
      ],
      score: 'Point classique (2 × 4 min).',
      tip: 'Sans cible au filet, l’équipe qui monte doit être patiente : jouer au milieu pour ouvrir les angles.',
      keys: [
        'Équipe au filet : patience, le milieu d’abord.',
        'Équipe au fond : faire jouer des volées, provoquer la faute.',
        'Lobs et balles basses pour casser le rythme.'
      ],
      variants: ['Sur seconde balle, l’équipe au retour revient en position classique (un au filet, un au fond), voire retourne et monte.', 'Faute directe dans le filet de l’équipe au retour = 2 points.'],
      coups: ['service', 'volee', 'retour', 'lob'], axes: ['filet', 'tactique', 'defense'],
      equipment: BR, players: [4, 4], space: 'complet', duration: [8, 8, 10], intensity: 3,
      diagram: {
        zones: [['L.dbl', 'soft'], ['R.dbl', 'soft']],
        players: [pl(SERVER, 1, 'S'), pl(SERVER_IN, 1, 'S'), pl(PARTNER, 1, 'P'), [R, 2.6, 2, 'R'], [R, 8.4, 2, 'P']],
        shots: [
          SERVE, CLOSE,
          { p: [[23.8, 2.8], [7.2, 7.4]], tone: 'deep' },
          { p: [[7.2, 7.8], [21.6, 5.5]] }
        ]
      }
    },
    {
      id: 'pd-o5', theme: 'ouvert', source: SRC, format: DBL,
      title: 'Deux rebonds seulement', original: 'Two-Touch Doubles',
      objective: 'Jouer un double ultra-offensif : après le service et le retour, tout se joue de volée.',
      steps: [
        'La balle n’a droit qu’à deux rebonds : sur le service et sur le retour.',
        'Le serveur fait service-volée, le relanceur monte derrière son retour.',
        'Tout rebond suivant fait perdre le point.',
        'À 2 : demi-terrain de double en croisé, une seule balle de service. À 4 : set de double complet.'
      ],
      score: 'Point classique ; à 4 joueurs, set de double.',
      tip: 'Jouer dans les pieds de l’adversaire le plus souvent possible.',
      keys: [
        'Fermer vite le filet, sans attendre.',
        'Volées et demi-volées vers les pieds.',
        'Échanges de volées rapides et contrôlés.'
      ],
      variants: ['Deux balles de service.', 'Faute au service, au retour ou à la première volée = 2 points.', 'Lobs interdits.'],
      coups: ['volee', 'service', 'retour'], axes: ['filet', 'attaque', 'reaction', 'pression'],
      equipment: BR, players: [2, 4], space: 'complet', duration: [6, 10, 30], intensity: 3,
      diagram: {
        zones: [['L.dbl.bot', 'soft'], ['R.dbl.top', 'soft']],
        players: [pl(SERVER, 1, 'S'), pl(SERVER_IN, 1, 'S'), [24.4, 2.8, 2, 'R'], [17.6, 3.4, 2, 'R']],
        marks: [['dot', 16.8, 3], ['dot', 7.4, 7.2]],
        shots: [
          SERVE, CLOSE,
          { p: [[23.8, 2.9], [7.4, 7.2]], tone: 'deep' },
          { p: [[23.8, 3.6], [18.2, 3.6]], kind: 'move' }
        ],
        labels: [[15.6, 1.0, 'REBOND 1', 'tag'], [4.6, 9.6, 'REBOND 2', 'tag'], [N, 5.5, 'PUIS TOUT DE VOLÉE', 'dark']]
      }
    },
    {
      id: 'pd-o6', theme: 'ouvert', source: SRC, format: DBL,
      title: 'Sets à un contre un', original: '1v1 Sets',
      objective: 'Révéler et développer service-volée, retour et première volée en duel.',
      steps: [
        'Sets à deux joueurs en croisé, sur un demi-terrain de double (ligne imaginaire au milieu).',
        'Décompte normal.'
      ],
      score: 'Set classique, ou tie-breaks à un contre un.',
      tip: 'Excellent outil pour évaluer les qualités de double de chaque joueur.',
      keys: [
        'Service-volée.',
        'Retour bas et croisé.',
        'Première volée.'
      ],
      variants: ['Une seule balle de service, ou deux secondes balles par jeu de service.', 'Service-volée obligatoire ; le relanceur avance sur son retour.', 'Deux rebonds seulement (service et retour).'],
      coups: ['service', 'retour', 'volee'], axes: ['pression', 'filet'],
      equipment: BR, players: [2, 2], space: 'demi', duration: [20, 30, 45], intensity: 3,
      diagram: {
        zones: [['L.dbl.bot', 'soft'], ['R.dbl.top', 'soft']],
        lines: [{ p: [[0, M], [W, M]], dash: true, color: 'deep', w: 2.6 }],
        players: [pl(SERVER, 1), [24.4, 2.8, 2]],
        shots: [SERVE, { p: [[23.8, 2.9], [3, 8.4]], tone: 'deep' }],
        labels: [[5.4, 4.6, 'LIGNE IMAGINAIRE', 'plainStrong']]
      }
    },
    {
      id: 'pd-o7', theme: 'ouvert', source: SRC, format: DBL,
      title: 'Double à variantes', original: 'Doubles Sets / Doubles Tiebreakers',
      objective: 'Jouer en conditions de match, avec des contraintes pour travailler un point précis.',
      steps: [
        'Set de double (classique ou pro-set en 8 jeux) ou tie-breaks en 7 ou 11.',
        'En tie-breaks : quand un terrain termine, tous les terrains s’arrêtent.',
        'Choisir une variante ; en tie-breaks, les vainqueurs choisissent celle du suivant.'
      ],
      score: 'Décompte classique.',
      tip: 'Donner des variantes différentes à chaque équipe pour travailler leurs points forts et leurs points faibles.',
      keys: [
        'Une contrainte = un objectif clair.',
        'Communiquer entre partenaires.',
        'Chaque point compte.'
      ],
      variants: [
        'Relanceurs à deux au fond (sur première balle, ou sur les deux).',
        'Le partenaire du relanceur poache sur toutes les secondes balles.',
        'Le relanceur avance sur son retour (ou toute l’équipe au retour).',
        'Faute directe dans le filet = 2 points.',
        'Une seule balle de service, ou deux secondes balles par jeu.',
        'Service-volée obligatoire ; deux rebonds seulement.'
      ],
      coups: [], axes: ['pression', 'tactique', 'filet'],
      equipment: BR, players: [4, 4], space: 'complet', duration: [15, 30, 45], intensity: 3,
      diagram: {
        score: '6 – 6',
        zones: [['L.dbl', 'soft'], ['R.dbl', 'soft']],
        players: [pl(SERVER, 1, 'S'), pl(PARTNER, 1, 'P'), pl(RETURNER, 2, 'R'), pl(RET_PARTNER, 2, 'P')],
        labels: [[N, 5.5, 'DOUBLE', 'dark']]
      }
    },

    /* ==================================================================
       FOCUS
       ================================================================== */
    {
      id: 'pd-f1', theme: 'focus', source: SRC, format: DBL,
      title: 'Le trio gagnant', original: 'Serve, Return, First Volley',
      axes: ['filet', 'pression'],
      objective: 'En double, tout part de trois coups : la première balle, le retour et la première volée.',
      steps: [
        'Première balle avec effet : haut pourcentage et temps pour monter.',
        'Retour bas, loin du joueur au filet.',
        'Première volée profonde ou dans les pieds.'
      ],
      diagram: {
        zones: [['L.dbl', 'soft'], ['R.dbl', 'soft']],
        players: [pl(SERVER, 1, '1'), [6.6, 7.6, 1, '3'], pl(PARTNER, 1), [24.4, 2.6, 2, '2'], pl(RET_PARTNER, 2)],
        shots: [
          SERVE,
          { p: [[23.8, 2.8], [7.4, 7.4]], tone: 'deep' },
          { p: [[7.4, 7.8], [22, 4]] }
        ]
      }
    },
    {
      id: 'pd-f2', theme: 'focus', source: SRC, format: DBL,
      title: 'Dans les pieds', original: 'Keep It Low',
      axes: ['filet', 'tactique'],
      objective: 'Faire remonter la balle à l’adversaire : jouer bas, dans les pieds de celui qui monte.',
      steps: [
        'Celui qui remonte une volée est en danger.',
        'Contre deux au fond : jouer au milieu pour ouvrir les angles.'
      ],
      diagram: {
        zones: [['L.dbl', 'soft'], ['R.dbl', 'soft']],
        players: [[7.6, 3, 1], [7.6, 8, 1], [R, 2.8, 2], [16.6, 8, 2]],
        marks: [['dot', 15.6, 8.4]],
        shots: [{ p: [[8, 7.8], [15.6, 8.4]] }],
        labels: [[17, 10.3, 'DANS LES PIEDS', 'tag']]
      }
    }
  );
})();
