/* ==========================================================================
   Assistant Coach — Base de cartes
   Première base : les 54 cartes du jeu Tennis Mentor (traduites et
   reformulées), réparties dans les 5 thèmes + les cartes Focus.
   Le format d'une carte est décrit dans README.md.
   ========================================================================== */
window.AC = window.AC || {};

(function () {
  /* Repères du terrain (en mètres) pour écrire les schémas.
     Terrain vu de dessus, filet vertical au centre. */
  var L = -1.3;       // joueur derrière la ligne de fond gauche
  var R = 25.1;       // joueur derrière la ligne de fond droite
  var N = 11.885;     // filet
  var SL = 5.485;     // ligne de service gauche
  var SR = 18.285;    // ligne de service droite
  var T = 1.37;       // ligne de simple (haut)
  var B = 9.6;        // ligne de simple (bas)
  var M = 5.485;      // ligne médiane de service
  var W = 23.77;      // longueur
  var H = 10.97;      // largeur double

  var TM = 'Tennis Mentor';
  var BR = ['balles', 'raquettes'];

  /* Schémas réutilisés */
  function bowtie() {
    return {
      zones: [['L', 'soft'], ['R', 'soft']],
      players: [[L, 2.9, 1, 'J1'], [L, 8.1, 1, 'J1'], [R, 2.9, 2, 'J2'], [R, 8.1, 2, 'J2']],
      shots: [
        { p: [[0.6, 2.5], [23, 8.3]] },
        { p: [[23, 8.6], [0.6, 8.6]] },
        { p: [[0.6, 8.2], [23, 2.6]] },
        { p: [[23, 2.2], [0.6, 2.2]] },
        { p: [[L, 3.8], [L, 7.2]], kind: 'move2' },
        { p: [[R, 3.8], [R, 7.2]], kind: 'move2' }
      ]
    };
  }

  function stepLines(y1, y2, side) {
    var xs = [0.92, 1.83, 2.74, 3.66, 4.57];
    return xs.map(function (x) {
      var X = side === 'R' ? W - x : x;
      return { p: [[X, y1], [X, y2]], dash: true };
    });
  }

  function thirds(x1, x2) {
    return [2.74, 4.11, 6.857, 8.23].map(function (y) {
      return { p: [[x1, y], [x2, y]], dash: true };
    });
  }

  AC.CARDS = [

    /* ==================================================================
       ÉCHAUFFEMENT (cartes vertes « Activator »)
       ================================================================== */
    {
      id: 'tm-a01', theme: 'echauffement', source: TM,
      title: 'Tennis deux touches', original: 'Two-Touch Tennis',
      objective: 'Trouver le toucher et le placement dans un petit espace, en contrôlant la balle avant de la renvoyer.',
      steps: [
        'Les deux joueurs se placent derrière la ligne de service.',
        '2 touches par côté : un contrôle vers le haut, puis la frappe par-dessus le filet.',
        'On peut laisser rebondir une fois avant chaque touche, ou jouer de volée.'
      ],
      score: 'Un point sur chaque faute adverse. Partie en points ou au temps.',
      tip: 'Un seul carré chacun pour le contrôle, tout le terrain pour l’agilité.',
      variants: ['Facile : un carré de service chacun.', 'Difficile : contrôle obligatoire de volée.'],
      coups: ['volee'], axes: ['toucher', 'reaction'],
      equipment: BR, players: [2, 4], space: 'mini', duration: [5, 8, 10], intensity: 1,
      diagram: {
        score: '0 – 1',
        zones: [['L.boxes', 'soft'], ['R.boxes', 'soft']],
        players: [[4.5, 5.5, 1], [19.3, 5.5, 2]],
        shots: [{ p: [[5.2, 5.3], [17, 5.7]], arc: -2.6 }],
        labels: [[7.4, 2.4, 'CONTRÔLE', 'plain'], [16.4, 2.4, 'FRAPPE', 'plain']]
      }
    },
    {
      id: 'tm-a02', theme: 'echauffement', source: TM,
      title: 'Match attrape', original: 'Catch Match',
      objective: 'Lire les trajectoires et viser les espaces libres, sans raquette.',
      steps: [
        'Derrière la ligne de service, une balle pour deux.',
        'J1 lance pour commencer ; on se renvoie la balle à la main en visant les espaces libres des carrés.',
        'Interdit de bouger balle en main ; un seul rebond autorisé avant d’attraper.'
      ],
      score: 'Un point sur chaque faute adverse. Partie en points ou au temps.',
      tip: 'Un seul carré pour un échauffement doux, les deux pour plus d’intensité.',
      variants: ['Lancer avec la main non dominante.', 'Balle attrapée sans rebond = 2 points.'],
      coups: [], axes: ['deplacement', 'reaction', 'tactique'],
      equipment: ['balles'], players: [2, 4], space: 'mini', duration: [4, 6, 8], intensity: 2,
      diagram: {
        score: '0 – 1',
        zones: [['L.boxes', 'soft'], ['R.boxes', 'soft']],
        players: [[4.6, 3.4, 1, 'J1'], [19.2, 7.2, 2, 'J2']],
        shots: [
          { p: [[5.2, 3.6], [16.6, 7.8]], arc: -2.8, kind: 'throw' },
          { p: [[3.4, 7.6], [3.4, 4.6]], kind: 'move' }
        ],
        labels: [[20.6, 3.0, 'DEHORS !', 'bubble']]
      }
    },
    {
      id: 'tm-a03', theme: 'echauffement', source: TM,
      title: 'Échanges en recul', original: 'Step Back Rallies',
      objective: 'Monter progressivement en distance et en vitesse de balle en gardant la régularité.',
      steps: [
        'Tracer 5 lignes entre la ligne de service et la ligne de fond, de chaque côté.',
        'Commencer sur la ligne la plus proche du filet.',
        'Échange de 20 frappes réussi : on recule d’une ligne.',
        '3 échecs sur un niveau : on avance d’une ligne.'
      ],
      score: 'Valider les 5 niveaux le plus vite possible.',
      tip: 'Revenir sur sa « ligne de niveau » après chaque frappe.',
      variants: ['Chronométrer et battre son record.', 'Coup droit croisé uniquement.'],
      coups: ['coup-droit', 'revers'], axes: ['regularite', 'profondeur', 'deplacement'],
      equipment: ['balles', 'raquettes', 'lignes'], players: [2, 4], space: 'complet', duration: [6, 8, 12], intensity: 2,
      diagram: {
        zones: [['L', 'soft'], ['R', 'soft']],
        lines: stepLines(1.8, 9.2, 'L').concat(stepLines(1.8, 9.2, 'R')),
        players: [[4.57, 3.4, 1], [19.2, 3.4, 2]],
        shots: [{ p: [[5.2, 3.4], [18.6, 3.4]], kind: 'rally' }],
        labels: [[N, 6.4, '✓ 20 FRAPPES = ON RECULE', 'tag'], [N, 8.3, '✗ 3 ÉCHECS = ON AVANCE', 'dark']]
      }
    },
    {
      id: 'tm-a04', theme: 'echauffement', source: TM,
      title: 'Collision', original: 'Collision',
      objective: 'Réveiller les réflexes et la coordination œil-main avec des lancers simultanés.',
      steps: [
        'Face à face à 2 m, chacun avec une balle.',
        'Lancer en même temps et attraper la balle de l’autre.',
        'Si les balles se percutent, réagir vite pour en attraper une.'
      ],
      score: '1 point pour une balle attrapée après un rebond, 2 points sans rebond. Partie en points ou au temps.',
      tip: 'Appuis larges, position basse et athlétique.',
      variants: ['Reculer d’un pas à chaque réussite.', 'Lancer de la main non dominante.'],
      coups: [], axes: ['reaction', 'deplacement'],
      equipment: ['balles'], eqNote: '2 balles', players: [2, 2], space: 'hors', duration: [3, 5, 6], intensity: 1,
      diagram: { picto: 'collision' }
    },
    {
      id: 'tm-a05', theme: 'echauffement', source: TM,
      title: 'Angles', original: 'Angles',
      objective: 'Développer le toucher et la sensibilité dans un tout petit espace près du filet.',
      steps: [
        'Délimiter une zone de 2 m de chaque côté du filet.',
        'Lâcher la balle sur la bande du filet pour engager.',
        'Jouer uniquement dans la zone, sans volée.'
      ],
      score: 'Partie en points ou au temps.',
      tip: 'Prise marteau (continentale) pour un maximum de sensations.',
      variants: ['Autoriser les volées.', 'Zone réduite à 1 m.'],
      coups: ['amorti'], axes: ['toucher', 'precision'],
      equipment: ['balles', 'raquettes', 'lignes'], players: [2, 4], space: 'mini', duration: [4, 6, 8], intensity: 1,
      diagram: {
        zones: [[[N - 2.2, T, N + 2.2, B], 'soft']],
        lines: [{ p: [[N - 2.2, T], [N - 2.2, B]], dash: true }, { p: [[N + 2.2, T], [N + 2.2, B]], dash: true }],
        players: [[N - 1.3, 4.2, 1], [N + 1.3, 6.9, 2]],
        marks: [['dot', N, 5.5]],
        shots: [{ p: [[N - 0.8, 4.5], [N + 1.6, 7.9]], arc: -1.4 }]
      }
    },
    {
      id: 'tm-a06', theme: 'echauffement', source: TM,
      title: 'Frappe et bouge', original: 'Hit and Move',
      objective: 'Associer frappe et déplacement latéral dès l’échauffement.',
      steps: [
        'Échanger dans le carré de service, en coopération ou en compétition.',
        'Après chaque frappe, aller toucher une ligne de côté avant de rejouer.'
      ],
      score: 'Coopération : record d’échanges. Compétition : partie en points.',
      tip: 'Un carré pour un échauffement doux, les deux pour plus d’intensité.',
      variants: ['Toucher la ligne avec la raquette.', 'Alterner coup droit / revers.'],
      coups: ['coup-droit', 'revers'], axes: ['deplacement', 'regularite'],
      equipment: BR, players: [2, 4], space: 'mini', duration: [4, 6, 8], intensity: 2,
      diagram: {
        zones: [['L.box.top', 'soft'], ['R.box.top', 'soft']],
        players: [[4.6, 3.4, 1], [19.2, 3.4, 2]],
        shots: [
          { p: [[5.4, 3.4], [18.4, 3.4]], kind: 'rally' },
          { p: [[4.6, 1.7], [4.6, 2.6]], kind: 'move' },
          { p: [[4.6, 4.2], [4.6, 5.1]], kind: 'move' },
          { p: [[19.2, 1.7], [19.2, 2.6]], kind: 'move' },
          { p: [[19.2, 4.2], [19.2, 5.1]], kind: 'move' }
        ]
      }
    },
    {
      id: 'tm-a07', theme: 'echauffement', source: TM,
      title: 'Lâcher réflexe', original: 'Reaction Drops',
      objective: 'Travailler le temps de réaction et la vitesse des mains.',
      steps: [
        'Le lâcheur tient une balle dans chaque main, bras tendus.',
        'L’attrapeur pose ses mains au-dessus de celles du lâcheur.',
        'Le lâcheur laisse tomber une balle au hasard : l’attrapeur doit la saisir avant le sol.'
      ],
      score: '10 essais puis on inverse. Le plus de balles attrapées gagne.',
      tip: 'Balles tenues plus haut pour les débutants, plus bas pour les confirmés.',
      variants: ['Lâcher les deux balles en décalé.', 'Attraper avec la main opposée.'],
      coups: [], axes: ['reaction'],
      equipment: ['balles'], eqNote: '2 balles', players: [2, 2], space: 'hors', duration: [3, 4, 5], intensity: 1,
      diagram: { picto: 'drops' }
    },
    {
      id: 'tm-a08', theme: 'echauffement', source: TM,
      title: 'Attrape haute', original: 'Overhead Catch Match',
      objective: 'Préparer le smash : se placer sous la balle haute et viser le fond du court.',
      steps: [
        'J1 lance depuis le fond, au-delà de la ligne de service adverse (carrés de service = dehors).',
        'J2 attrape avant le rebond et relance depuis l’endroit où il l’a attrapée.',
        'Marquer en faisant rebondir la balle dans la zone profonde adverse ou en provoquant la faute.'
      ],
      score: 'Le gagnant du point engage. Partie en points ou au temps.',
      tip: 'Zones trop lointaines ? J1 vise les carrés de service, J2 la zone profonde.',
      variants: ['Lancer avec le geste du service.', 'Attraper d’une seule main.'],
      coups: ['smash'], axes: ['deplacement', 'profondeur'],
      equipment: ['balles'], players: [2, 4], space: 'complet', duration: [4, 6, 8], intensity: 2,
      diagram: {
        score: '1 – 0',
        zones: [['L.back', 'soft'], ['R.back', 'soft']],
        players: [[L, 4, 1, 'J1'], [20.8, 6.6, 2, 'J2']],
        shots: [
          { p: [[-0.4, 3.9], [21.4, 7.8]], arc: -3.2, kind: 'throw' },
          { p: [[20.6, 6.2], [2.2, 3]], arc: -3, kind: 'throw' }
        ],
        labels: [[21, 9.0, 'REBOND', 'plain']]
      }
    },
    {
      id: 'tm-a09', theme: 'echauffement', source: TM,
      title: 'Jeu de volée', original: 'Volley Game',
      objective: 'Échauffer les volées en jouant chaque balle vers le haut, avec toucher.',
      steps: [
        'Engager par une mise en jeu à la cuillère.',
        'Aucun rebond : chaque frappe est une volée jouée vers le haut.',
        'Marquer en faisant rebondir la balle dans le carré adverse ou en provoquant la faute.'
      ],
      score: 'Partie en points ou au temps.',
      tip: 'Le toucher bat la puissance ; le replacement est plus près du filet qu’on ne le croit.',
      variants: ['Volées de revers uniquement.', 'Volée de contrôle obligatoire avant de renvoyer.'],
      coups: ['volee'], axes: ['toucher', 'filet', 'reaction'],
      equipment: BR, players: [2, 4], space: 'mini', duration: [4, 6, 8], intensity: 2,
      diagram: {
        score: '1 – 0',
        zones: [['L.boxes', 'soft'], ['R.boxes', 'soft']],
        players: [[6.4, 5.0, 1], [17.4, 6.0, 2]],
        shots: [
          { p: [[7, 4.9], [16.8, 5.8]], arc: -3.4 },
          { p: [[16.8, 6.4], [8.6, 8.2]], arc: -2.4 }
        ],
        marks: [['dot', 8.6, 8.2]],
        labels: [[8.6, 9.0, 'REBOND = POINT', 'plain']]
      }
    },
    {
      id: 'tm-a10', theme: 'echauffement', source: TM,
      title: 'Défi 80 frappes', original: '80 Shot Challenge',
      objective: 'Enchaîner fond de court et volées avec régularité, en montée progressive.',
      steps: [
        'Réaliser 4 échanges de 20 frappes à la suite :',
        '1. Fond de court contre fond de court.',
        '2. Fond de court contre volée.',
        '3. Volée contre fond de court.',
        '4. Volée contre volée.'
      ],
      score: 'Boucler le défi le plus vite possible (au chrono).',
      tip: 'Adapter au niveau : débutant 4 × 10, intermédiaire 4 × 15, avancé 4 × 25.',
      variants: ['Échanges croisés uniquement.', 'Retour à zéro de l’étape en cas de faute.'],
      coups: ['coup-droit', 'revers', 'volee'], axes: ['regularite', 'rythme', 'filet'],
      equipment: BR, players: [2, 4], space: 'complet', duration: [6, 8, 12], intensity: 2,
      diagram: {
        zones: [['L', 'soft'], ['R', 'soft']],
        players: [
          [L, 2.3, 1, '1'], [L, 4.2, 1, '2'], [6.3, 6.6, 1, '3'], [6.3, 8.5, 1, '4'],
          [R, 2.3, 2], [17.6, 4.2, 2], [R, 6.6, 2], [17.6, 8.5, 2]
        ],
        shots: [
          { p: [[0, 2.3], [23.8, 2.3]], kind: 'rally' },
          { p: [[0, 4.2], [16.8, 4.2]], kind: 'rally' },
          { p: [[7.1, 6.6], [23.8, 6.6]], kind: 'rally' },
          { p: [[7.1, 8.5], [16.8, 8.5]], kind: 'rally' }
        ]
      }
    },
    {
      id: 'tm-a11', theme: 'echauffement', source: TM,
      title: 'Rebond (jeu du Djoko)', original: 'Bounce',
      objective: 'Développer le toucher et l’anticipation avec des frappes vers le sol.',
      steps: [
        'Frapper la balle vers le sol de son côté pour qu’elle rebondisse par-dessus le filet.',
        'L’adversaire doit la reprendre avant qu’elle ne rebondisse chez lui.',
        'Gagner le point en provoquant la faute ou en faisant rebondir la balle dans son camp.'
      ],
      score: 'Partie en points ou au temps.',
      tip: 'Le toucher bat la puissance ; se replacer plus près du filet qu’on ne le croit.',
      variants: ['Revers uniquement.', 'Un seul carré chacun.'],
      coups: ['volee'], axes: ['toucher', 'reaction'],
      equipment: BR, players: [2, 4], space: 'mini', duration: [4, 6, 8], intensity: 1,
      diagram: {
        score: '0 – 1',
        zones: [['L.boxes', 'soft'], ['R.boxes', 'soft']],
        players: [[6.2, 5.4, 1], [17.6, 5.6, 2]],
        shots: [
          { p: [[6.8, 5.3], [9.4, 6.6]] },
          { p: [[9.4, 6.6], [16.9, 5.8]], arc: -3.2, kind: 'throw' }
        ],
        marks: [['dot', 9.4, 6.6]]
      }
    },
    {
      id: 'tm-a12', theme: 'echauffement', source: TM,
      title: 'Tennis à la main', original: 'Hand Tennis',
      objective: 'Un mini-match sans raquette ni filet pour éveiller coordination et lecture de trajectoire.',
      steps: [
        'Un mini-match dans un seul carré de service, sans raquette ni filet.',
        'À tour de rôle, taper la balle vers le haut avec la paume, avec un seul rebond entre chaque frappe.'
      ],
      score: 'Un point quand l’adversaire rate. Partie en points ou au temps.',
      tip: 'Facile : la balle monte au-dessus de la taille. Difficile : hauteur libre.',
      variants: ['Main non dominante uniquement.', 'Jouer sur deux carrés.'],
      coups: [], axes: ['reaction', 'toucher', 'deplacement'],
      equipment: ['balles'], players: [2, 2], space: 'mini', duration: [3, 5, 6], intensity: 1,
      diagram: { picto: 'hand' }
    },

    /* ==================================================================
       DRILLS — situations fermées (cartes jaunes)
       ================================================================== */
    {
      id: 'tm-d01', theme: 'drill', source: TM,
      title: 'Défi 2 minutes', original: '2 Minute Challenge',
      objective: 'Travailler la profondeur en fond de court, avec un score qui mesure la qualité.',
      steps: [
        'Échanger pendant 2 minutes.',
        'J1 vise les zones profondes.',
        'J2 renvoie et compte les points de J1 : +2 balle profonde, +1 zone médiane, 0 balle courte ou faute.',
        'Inverser les rôles au bout de 2 minutes.'
      ],
      score: 'Battre son record. Les pros dépassent 65 points.',
      tip: 'Jouer avec de la marge au-dessus du filet : la hauteur donne la profondeur.',
      variants: ['Revers uniquement.', 'Zone +2 réduite au dernier mètre.'],
      coups: ['coup-droit', 'revers'], axes: ['profondeur', 'regularite'],
      equipment: ['balles', 'raquettes', 'lignes', 'chrono'], players: [2, 4], space: 'complet', duration: [6, 8, 10], intensity: 2,
      diagram: {
        zones: [['L', 'soft'], [[SR, T, 21.03, B], 'soft'], [[21.03, T, W, B], 'strong']],
        lines: [{ p: [[21.03, T], [21.03, B]], dash: true }],
        players: [[L, 4, 1, 'J1'], [R, 4, 2, 'J2']],
        shots: [{ p: [[0, 4], [22.4, 4]], kind: 'rally' }],
        labels: [[19.65, 7.2, '+1', 'plain'], [22.4, 7.2, '+2', 'plainInk']]
      }
    },
    {
      id: 'tm-d02', theme: 'drill', source: TM,
      title: 'Nœud papillon', original: 'Bow Tie Drill',
      objective: 'Automatiser l’alternance croisé / long de ligne en fond de court.',
      steps: [
        'Échange de fond de court à fond de court.',
        'J1 joue tout en croisé, J2 tout le long de la ligne.',
        'Fixer un objectif d’échange (ex. 20 frappes) et un nombre de séries (ex. 3 × 20).',
        'Inverser les rôles et recommencer.'
      ],
      score: 'Séries réussies / séries tentées.',
      tip: 'Ajouter des plots comme cibles pour la concentration et le défi.',
      variants: ['Zone profonde obligatoire.', 'Chronométrer chaque série.'],
      coups: ['coup-droit', 'revers'], axes: ['regularite', 'precision', 'deplacement'],
      equipment: BR, players: [2, 4], space: 'complet', duration: [8, 10, 15], intensity: 3,
      diagram: bowtie()
    },
    {
      id: 'tm-d03', theme: 'drill', source: TM,
      title: 'Bataille de plots', original: 'Battle Cones',
      objective: 'Gagner en précision et en profondeur en visant des cibles concrètes.',
      steps: [
        'Chaque joueur dispose 3 plots aux 3/4 de la profondeur de son côté.',
        'Échanger de fond de court en visant les plots adverses.',
        'Plot touché : on le récupère et on l’ajoute de son côté.'
      ],
      score: 'Le premier à réunir les 6 plots gagne (ou le plus de plots au temps).',
      tip: 'Jouer long de ligne ou croisé, côté égalité et côté avantage.',
      variants: ['Plot touché de volée = 2 plots.', 'Plots plus profonds.'],
      coups: ['coup-droit', 'revers'], axes: ['precision', 'profondeur'],
      equipment: ['balles', 'raquettes', 'plots'], players: [2, 4], space: 'complet', duration: [8, 10, 15], intensity: 2,
      diagram: {
        zones: [['L.top', 'soft'], ['R.bot', 'soft']],
        marks: [['cone', 2.9, 2.6], ['cone', 2.9, 3.5], ['cone', 2.9, 4.4], ['cone', 20.9, 6.6], ['cone', 20.9, 7.5], ['cone', 20.9, 8.4]],
        players: [[L, 3.2, 1], [R, 7.8, 2]],
        shots: [{ p: [[0, 3.3], [21.6, 7.4]], kind: 'rally' }]
      }
    },
    {
      id: 'tm-d04', theme: 'drill', source: TM,
      title: 'Service en recul', original: 'Step Back Serves',
      objective: 'Fiabiliser le service avec un défi progressif de distance.',
      steps: [
        'Tracer 5 lignes entre la ligne de service et la ligne de fond.',
        'Commencer sur la ligne la plus proche : 3 services réussis d’affilée pour reculer d’une ligne.',
        '2 fautes de suite : on avance d’une ligne.',
        'Jouer côté égalité et côté avantage.'
      ],
      score: 'Le premier à valider le niveau 5 (ligne de fond) gagne.',
      tip: 'Servir à vitesse réelle : pas de service « poussé ».',
      variants: ['Imposer une cible (extérieur, corps, T).', 'Secondes balles uniquement.'],
      coups: ['service'], axes: ['regularite', 'precision'],
      equipment: ['balles', 'raquettes', 'lignes'], players: [1, 4], space: 'complet', duration: [8, 10, 15], intensity: 1,
      diagram: {
        zones: [['L.box.bot', 'soft'], ['R.box.top', 'soft']],
        lines: stepLines(5.9, 9.4, 'L').concat(stepLines(1.6, 5.1, 'R')),
        players: [[4.57, 7.6, 1], [19.2, 3.4, 2]],
        shots: [
          { p: [[5.1, 7.4], [16.8, 2.6]] },
          { p: [[18.7, 3.6], [7, 8.5]] },
          { p: [[3.7, 8.8], [1, 8.8]], kind: 'move' }
        ]
      }
    },
    {
      id: 'tm-d05', theme: 'drill', source: TM,
      title: 'Échange de 100', original: '100 Ball Rally',
      objective: 'Construire la régularité et la concentration sur la durée.',
      steps: [
        'Échanger avec un partenaire en comptant chaque frappe, jusqu’à 100.',
        'En cas de faute, reprendre une balle et repartir du dernier compte.',
        'Noter le nombre de balles utilisées (ex. 60 + 30 + 10 = 100 en 3 balles).'
      ],
      score: 'Objectif ultime : 100 frappes avec une seule balle.',
      tip: 'Une fois les 100 atteints avec une balle, viser plus de tempo et de profondeur.',
      variants: ['Demi-terrain croisé uniquement.', 'Revers uniquement.'],
      coups: ['coup-droit', 'revers'], axes: ['regularite', 'rythme'],
      equipment: BR, players: [2, 4], space: 'demi', duration: [8, 10, 15], intensity: 2,
      diagram: {
        zones: [[[0, T, W, M], 'soft']],
        players: [[L, 3.4, 1], [R, 3.4, 2]],
        shots: [{ p: [[0, 3.4], [23.8, 3.4]], kind: 'rally' }],
        labels: [[N, 7.9, '60 + 30 + 10 = 100 EN 3 BALLES', 'tag']]
      }
    },
    {
      id: 'tm-d06', theme: 'drill', source: TM,
      title: 'Échanges dans le couloir', original: 'Alley Rallies',
      objective: 'Gagner en précision de direction et en contrôle de la hauteur de balle.',
      steps: [
        'Se placer près du couloir.',
        'Enchaîner les frappes entre la ligne de simple et la ligne de double.',
        'À la moindre faute, repartir de zéro.'
      ],
      score: 'Battre son meilleur score.',
      tip: 'Commencer à la ligne de service, reculer vers le fond, sans jamais « pousser » la balle.',
      variants: ['Couloir coup droit puis couloir revers.', 'Volée contre fond de court dans le couloir.'],
      coups: ['coup-droit', 'revers'], axes: ['precision', 'regularite'],
      equipment: BR, players: [2, 4], space: 'demi', duration: [6, 8, 10], intensity: 1,
      diagram: {
        zones: [['L.alley.top', 'soft'], ['R.alley.top', 'soft'], ['L.alley.bot', 'soft'], ['R.alley.bot', 'soft']],
        players: [[2.6, 0.68, 1], [21.2, 0.68, 2], [L, 10.3, 1], [R, 10.3, 2]],
        shots: [
          { p: [[3.3, 0.68], [20.5, 0.68]], kind: 'rally' },
          { p: [[0, 10.3], [23.8, 10.3]], kind: 'rally' }
        ]
      }
    },
    {
      id: 'tm-d07', theme: 'drill', source: TM,
      title: 'Camp de base', original: 'Home Base',
      objective: 'Ancrer le réflexe de replacement après chaque frappe en croisé.',
      steps: [
        'Placer un repère (plot ou zone) de replacement.',
        'Échanger en croisé en revenant au repère après chaque frappe.',
        'Continuer jusqu’à la faute ou au replacement manqué.',
        '5 minutes côté égalité, 5 minutes côté avantage.'
      ],
      score: 'Battre son plus long échange.',
      tip: 'Jouer sur la vitesse et la trajectoire pour se donner le temps de revenir.',
      variants: ['Repère plus éloigné.', 'Pas chassés obligatoires.'],
      coups: ['coup-droit', 'revers'], axes: ['deplacement', 'regularite'],
      equipment: ['balles', 'raquettes', 'lignes'], players: [2, 4], space: 'demi', duration: [8, 10, 12], intensity: 3,
      diagram: {
        zones: [['L.bot', 'soft'], ['R.top', 'soft']],
        marks: [['x', L, 4.4], ['x', R, 6.6]],
        players: [[L, 8.2, 1], [R, 2.9, 2]],
        shots: [
          { p: [[0.2, 8.1], [22.6, 3.1]], kind: 'rally' },
          { p: [[L, 7.3], [L, 5.2]], kind: 'move2' },
          { p: [[R, 3.7], [R, 5.8]], kind: 'move2' }
        ]
      }
    },
    {
      id: 'tm-d08', theme: 'drill', source: TM,
      title: 'Volées en mouvement', original: 'Moving Volleys',
      objective: 'Stabiliser les volées en déplacement latéral.',
      steps: [
        'Commencer au milieu des carrés de service, en volée contre volée.',
        'Glisser progressivement vers la ligne de simple côté égalité, puis côté avantage, puis revenir au centre.',
        'Cet aller-retour = 1 tour.'
      ],
      score: 'Un nombre de tours fixé ou au temps.',
      tip: 'Appuis larges, gestes courts.',
      variants: ['Alterner volée haute / volée basse.', 'Accélérer le rythme à chaque tour.'],
      coups: ['volee'], axes: ['filet', 'deplacement', 'reaction'],
      equipment: BR, players: [2, 4], space: 'mini', duration: [6, 8, 10], intensity: 2,
      diagram: {
        zones: [['L.boxes', 'soft'], ['R.boxes', 'soft']],
        players: [[8.4, 2.7, 1], [8.4, 8.3, 1], [15.4, 2.7, 2], [15.4, 8.3, 2]],
        shots: [
          { p: [[8.4, 3.6], [8.4, 7.4]], kind: 'move2' },
          { p: [[15.4, 3.6], [15.4, 7.4]], kind: 'move2' },
          { p: [[9.2, 3.1], [14.6, 7.9]] },
          { p: [[14.6, 3.1], [9.2, 7.9]] },
          { p: [[9.2, 5.5], [14.6, 5.5]], kind: 'rally' }
        ]
      }
    },
    {
      id: 'tm-d09', theme: 'drill', source: TM,
      title: 'Service 6 zones', original: '6 Zone Serves',
      objective: 'Développer la précision du service sur toutes les cibles.',
      steps: [
        'Diviser les carrés de service en 6 zones.',
        'Après l’échauffement du service, viser la zone 1.',
        'Zone touchée : passer à la zone 2, et ainsi de suite jusqu’à la zone 6.'
      ],
      score: 'Score = nombre total de services utilisés (score parfait : 6).',
      tip: 'À deux : 2 services chacun, course pour valider les 6 zones.',
      variants: ['Secondes balles uniquement.', 'Annoncer sa zone avant de servir.'],
      coups: ['service'], axes: ['precision'],
      equipment: ['balles', 'raquettes', 'lignes'], players: [1, 4], space: 'complet', duration: [8, 10, 12], intensity: 1,
      diagram: {
        zones: [['R.boxes', 'soft']],
        lines: thirds(N, SR),
        labels: [
          [17.3, 2.05, '1', 'plainInk'], [17.3, 3.42, '2', 'plainInk'], [17.3, 4.8, '3', 'plainInk'],
          [17.3, 6.17, '4', 'plainInk'], [17.3, 7.54, '5', 'plainInk'], [17.3, 8.9, '6', 'plainInk']
        ],
        players: [[L, 4.1, 1], [L, 6.9, 1]],
        shots: [
          { p: [[L, 4.9], [L, 6.1]], kind: 'move2' },
          { p: [[-0.5, 4.1], [16.6, 6.17]] },
          { p: [[-0.5, 4.1], [16.6, 8.9]] },
          { p: [[-0.5, 6.9], [16.6, 2.05]] },
          { p: [[-0.5, 6.9], [16.6, 4.8]] }
        ]
      }
    },
    {
      id: 'tm-d10', theme: 'drill', source: TM,
      title: 'Morpion au service', original: 'Serve Tic Tac Toe',
      objective: 'Rendre la précision du service ludique et compétitive.',
      steps: [
        'Tracer une grille de morpion (3 × 3) dans un carré de service.',
        'J1 et J2 servent à tour de rôle dans les cases.',
        'Case touchée : y poser un plot de sa couleur. Toucher une case adverse permet de remplacer son plot.'
      ],
      score: 'Le premier à aligner 3 plots gagne.',
      tip: 'Des services réalistes, comme en match : pas de service poussé.',
      variants: ['Secondes balles uniquement.', 'Grille dans l’autre carré.'],
      coups: ['service'], axes: ['precision', 'pression'],
      equipment: ['balles', 'raquettes', 'plots', 'lignes'], players: [2, 4], space: 'complet', duration: [8, 10, 12], intensity: 1,
      diagram: {
        zones: [[[N, T, SR, M], 'soft']],
        lines: [
          { p: [[14.02, T], [14.02, M]], dash: true }, { p: [[16.15, T], [16.15, M]], dash: true },
          { p: [[N, 2.74], [SR, 2.74]], dash: true }, { p: [[N, 4.11], [SR, 4.11]], dash: true }
        ],
        marks: [['ring', 12.95, 2.05], ['cone', 15.08, 3.42], ['ring', 17.2, 4.8], ['cone', 17.2, 2.05]],
        players: [[L, 6.8, 1, 'J1'], [L, 9.3, 2, 'J2']],
        shots: [{ p: [[-0.4, 6.7], [15.08, 3.6]] }]
      }
    },
    {
      id: 'tm-d11', theme: 'drill', source: TM,
      title: 'Échanges tempo', original: 'Tempo Rallies',
      objective: 'Accélérer le rythme de l’échange sans perdre le contrôle.',
      steps: [
        'Réaliser 20 frappes dans un temps limité, en adaptant la vitesse de balle :',
        'Niveau 1 : 1 minute.',
        'Niveau 2 : 50 secondes.',
        'Niveau 3 : 40 secondes.',
        'Niveau 4 : 30 secondes.'
      ],
      score: 'Valider les niveaux dans l’ordre.',
      tip: 'Le niveau où l’on échoue indique la vitesse à travailler.',
      variants: ['Échanges croisés imposés.', 'Zone profonde obligatoire.'],
      coups: ['coup-droit', 'revers'], axes: ['rythme', 'regularite'],
      equipment: ['balles', 'raquettes', 'chrono'], players: [2, 4], space: 'complet', duration: [6, 8, 12], intensity: 3,
      diagram: { picto: 'tempo' }
    },
    {
      id: 'tm-d12', theme: 'drill', source: TM,
      title: '2 croisés, 1 long de ligne', original: '2 Cross, 1 Line',
      objective: 'Changer de direction au bon moment dans un schéma de jeu.',
      steps: [
        'Échange de fond de court à fond de court.',
        'J1 joue toutes ses balles en croisé.',
        'J2 joue 2 croisés puis 1 long de ligne, et répète la séquence.',
        'Objectif d’échange (ex. 20 frappes) ou temps limite, puis on inverse.'
      ],
      score: 'Séries réussies.',
      tip: 'Ajouter des plots comme cibles pour la concentration et le défi.',
      variants: ['J2 choisit le moment du long de ligne.', 'Zone profonde obligatoire.'],
      coups: ['coup-droit', 'revers'], axes: ['regularite', 'precision', 'tactique'],
      equipment: BR, players: [2, 4], space: 'complet', duration: [8, 10, 15], intensity: 3,
      diagram: {
        zones: [['L', 'soft'], ['R', 'soft']],
        players: [[L, 2.9, 1, 'J1'], [L, 8.1, 1, 'J1'], [R, 2.9, 2, 'J2'], [R, 8.1, 2, 'J2']],
        shots: [
          { p: [[0.6, 2.5], [23, 8.3]] },
          { p: [[0.6, 8.4], [23, 2.6]] },
          { p: [[23, 7.8], [0.6, 3.0]], tone: 'deep' },
          { p: [[23, 2.1], [0.6, 2.1]], tone: 'deep' },
          { p: [[L, 3.8], [L, 7.2]], kind: 'move2' },
          { p: [[R, 3.8], [R, 7.2]], kind: 'move2' }
        ]
      }
    },

    /* ==================================================================
       MIXTE — début imposé / contraintes, puis jeu libre
       ================================================================== */
    {
      id: 'tm-g02', theme: 'mixte', source: TM,
      title: 'Nœud papillon (match)', original: 'Bow Tie Match',
      objective: 'Mettre sous pression un schéma croisé / long de ligne en connaissant la direction adverse.',
      steps: [
        'Engager par une mise en jeu.',
        'J1 joue toujours croisé, J2 toujours le long de la ligne.',
        'Marquer en provoquant la faute (une balle dans la mauvaise moitié compte comme faute).'
      ],
      score: 'Premier à 10, puis on inverse les rôles.',
      tip: 'On sait où l’adversaire va jouer : s’en servir pour anticiper.',
      variants: ['Le long de ligne doit passer la ligne de service.', 'J2 a droit à un croisé par point.'],
      coups: ['coup-droit', 'revers'], axes: ['tactique', 'deplacement', 'regularite'],
      equipment: BR, players: [2, 4], space: 'complet', duration: [10, 12, 15], intensity: 3,
      diagram: bowtie()
    },
    {
      id: 'tm-g04', theme: 'mixte', source: TM,
      title: 'La mise en jeu décide', original: 'Feeders Rules',
      objective: 'Lire la longueur de balle pour choisir : monter au filet ou rester au fond.',
      steps: [
        'Les deux joueurs démarrent en fond de court ; J1 met en jeu long ou court.',
        'Mise en jeu longue : J1 suit au filet.',
        'Mise en jeu courte : J1 reste au fond, J2 monte au filet.',
        'Jouer le point, puis revenir en fond de court.'
      ],
      score: 'Le gagnant met en jeu le point suivant. Décompte tie-break.',
      tip: 'Choisir ses mises en jeu avec une vraie intention tactique.',
      variants: ['C’est J2 qui choisit la longueur de la mise en jeu.', 'Engager au service.'],
      coups: ['volee', 'coup-droit', 'revers'], axes: ['tactique', 'attaque', 'filet', 'defense'],
      equipment: BR, players: [2, 4], space: 'complet', duration: [10, 12, 15], intensity: 3,
      diagram: {
        zones: [['R.box.top', 'grey'], ['R.back.top', 'strong']],
        players: [[L, 3.4, 1, 'J1'], [R, 4.6, 2, 'J2']],
        shots: [
          { p: [[-0.4, 3.4], [3.2, 3.4]], kind: 'move' },
          { p: [[24.2, 4.6], [20.6, 4.6]], kind: 'move' }
        ],
        labels: [[15.1, 2.4, 'COURT', 'plainInk'], [21, 2.4, 'LONG', 'plainWhite']]
      }
    },
    {
      id: 'tm-g06', theme: 'mixte', source: TM,
      title: 'Attaque – Défense', original: 'Attack & Defend',
      objective: 'Automatiser l’attaque long de ligne sur balle courte, puis gérer la suite du point.',
      steps: [
        'J1 met en jeu dans le carré de service côté égalité.',
        'J2 attaque obligatoirement le long de la ligne, puis le point est libre.',
        'Premier à 10 points, puis on passe côté avantage.',
        'Une fois les deux côtés joués, on inverse les rôles.'
      ],
      score: 'Premier à 10 points par côté.',
      tip: 'Ajuster la difficulté en déplaçant la position de mise en jeu le long de la ligne de fond.',
      variants: ['Attaque croisée imposée.', 'L’attaquant doit finir au filet.'],
      coups: ['coup-droit', 'revers'], axes: ['attaque', 'defense', 'tactique'],
      equipment: BR, players: [2, 4], space: 'complet', duration: [10, 12, 15], intensity: 3,
      diagram: {
        zones: [['L', 'soft'], ['R', 'soft']],
        players: [[L, 8.2, 1, 'J1'], [R, 3, 2, 'J2']],
        shots: [
          { p: [[0, 8.1], [17.4, 2.9]] },
          { p: [[17.4, 2.9], [1, 2.9]] },
          { p: [[L, 7.4], [L, 3.9]], kind: 'move' },
          { p: [[24.2, 3], [19, 3]], kind: 'move' }
        ]
      }
    },
    {
      id: 'tm-g07', theme: 'mixte', source: TM,
      title: 'Service-volée', original: 'Serve & Volley',
      objective: 'Enchaîner service et première volée sous pression.',
      steps: [
        'Tie-break en 10 points, J1 sert pendant toute la partie.',
        'J2 doit retourner en croisé.',
        'J1 doit monter et volleyer juste après son service.',
        'Pas de volée = point pour l’adversaire.'
      ],
      score: 'Tie-break en 10 points, puis on inverse les rôles.',
      tip: 'Le pourcentage de premières balles et la qualité du retour deviennent décisifs.',
      variants: ['Retour libre.', 'Secondes balles uniquement.'],
      coups: ['service', 'volee', 'retour'], axes: ['filet', 'attaque'],
      equipment: BR, players: [2, 4], space: 'complet', duration: [10, 12, 15], intensity: 3,
      diagram: {
        zones: [['L', 'soft'], ['R', 'soft']],
        players: [[L, 6.4, 1, 'J1'], [6.1, 7.9, 1, 'J1'], [R, 2.8, 2, 'J2']],
        shots: [
          { p: [[-0.4, 6.6], [5.3, 7.7]], kind: 'move' },
          { p: [[-0.4, 6.2], [16.8, 2.9]] },
          { p: [[23.6, 2.8], [6.9, 7.8]] },
          { p: [[6.9, 8.1], [23, 8.4]] }
        ]
      }
    },
    {
      id: 'tm-g10', theme: 'mixte', source: TM,
      title: 'Le Tunnel', original: 'Tunnel',
      objective: 'Jouer long et droit sous pression, sans chercher l’angle.',
      steps: [
        'Points en demi-terrain, engagés par une mise en jeu.',
        'Angles interdits : une balle qui franchit une ligne de côté avant la ligne de fond fait perdre le point.'
      ],
      score: 'Partie en points.',
      tip: 'Soigner préparation et timing ; doser la vitesse entre contrôle et pression.',
      variants: ['Bonus si la balle dépasse la ligne de service.', 'Couloir inclus.'],
      coups: ['coup-droit', 'revers'], axes: ['precision', 'profondeur', 'regularite'],
      equipment: BR, players: [2, 4], space: 'demi', duration: [8, 10, 15], intensity: 2,
      diagram: {
        score: '1 – 0',
        zones: [[[0, T, W, M], 'soft']],
        lines: [{ p: [[0, T], [W, T]], color: 'strong', w: 3.4 }, { p: [[0, M], [W, M]], color: 'strong', w: 3.4 }],
        players: [[L, 3.4, 1], [R, 4.2, 2]],
        shots: [
          { p: [[0, 3.6], [22.6, 4.4]] },
          { p: [[22.6, 4.4], [0.8, 0.4]] }
        ],
        marks: [['x', 6.1, T]]
      }
    },
    {
      id: 'tm-g12', theme: 'mixte', source: TM,
      title: 'Que des coups droits', original: 'Only Forehands',
      objective: 'Construire le point avec son coup droit en diagonale.',
      steps: [
        'Mise en jeu, puis points joués en demi-terrain croisé.',
        'Côté égalité pour les droitiers, côté avantage pour les gauchers.',
        'Toute frappe en revers fait perdre le point.'
      ],
      score: 'Partie en points (score fixé à l’avance).',
      tip: 'Être stratégique dans son placement et le choix des zones.',
      variants: ['Long de ligne autorisé pour conclure.', 'Engager au service.'],
      coups: ['coup-droit'], axes: ['tactique', 'deplacement'],
      equipment: BR, players: [2, 4], space: 'demi', duration: [8, 10, 15], intensity: 3,
      diagram: {
        zones: [['L.bot', 'soft'], ['R.top', 'soft']],
        players: [[L, 7.8, 1], [R, 3, 2]],
        shots: [{ p: [[0, 7.8], [22.8, 3.1]], kind: 'rally' }]
      }
    },
    {
      id: 'tm-g18', theme: 'mixte', source: TM,
      title: 'Que des revers', original: 'Only Backhands',
      objective: 'Construire le point avec son revers en diagonale.',
      steps: [
        'Mise en jeu, puis points joués en demi-terrain croisé.',
        'Côté avantage pour les droitiers, côté égalité pour les gauchers.',
        'Toute frappe en coup droit fait perdre le point.'
      ],
      score: 'Partie en points (score fixé à l’avance).',
      tip: 'Être stratégique dans son placement et le choix des zones.',
      variants: ['Long de ligne autorisé pour conclure.', 'Revers slicé obligatoire une fois par point.'],
      coups: ['revers'], axes: ['tactique', 'deplacement'],
      equipment: BR, players: [2, 4], space: 'demi', duration: [8, 10, 15], intensity: 3,
      diagram: {
        zones: [['L.top', 'soft'], ['R.bot', 'soft']],
        players: [[L, 3, 1], [R, 8, 2]],
        shots: [{ p: [[0, 3.1], [22.8, 7.9]], kind: 'rally' }]
      }
    },
    {
      id: 'tm-g17', theme: 'mixte', source: TM,
      title: 'Chasse à l’amorti', original: 'Dropshot Retrieval',
      objective: 'Défendre sur amorti et construire la suite du point.',
      steps: [
        'J1 se place sur la ligne de service, J2 en fond de court.',
        'J1 met en jeu un amorti, puis le point se joue en demi-terrain.'
      ],
      score: 'Premier à 10 points, puis on inverse les rôles.',
      tip: 'Après la mise en jeu, J1 se place selon la pression subie par l’adversaire.',
      variants: ['Relance long de ligne imposée.', 'Point en terrain entier.'],
      coups: ['amorti', 'volee', 'lob'], axes: ['deplacement', 'defense', 'toucher'],
      equipment: BR, players: [2, 4], space: 'demi', duration: [8, 10, 15], intensity: 3,
      diagram: {
        zones: [[[0, 0, W, M], 'soft']],
        players: [[SL, 3.2, 1, 'J1'], [R, 3.2, 2, 'J2']],
        shots: [
          { p: [[6.1, 3.2], [10.6, 3.2]], arc: -0.8 },
          { p: [[24.2, 3.2], [13.6, 3.2]], kind: 'move' }
        ]
      }
    },
    {
      id: 'tm-g19', theme: 'mixte', source: TM,
      title: 'Volées profondes', original: 'Deep Volleys',
      objective: 'Gagner en profondeur sur les volées de mi-court.',
      steps: [
        'Les deux joueurs démarrent derrière la ligne de service.',
        'Mise en jeu, puis uniquement des volées.',
        'La balle doit rebondir derrière la ligne de service adverse (le carré est dehors).',
        'Le gagnant met en jeu le point suivant.'
      ],
      score: 'Tie-break en 10 points.',
      tip: 'Exercice exigeant, mais les volées de mi-court en sortent transformées !',
      variants: ['Volée courte autorisée pour conclure.', 'Volées de revers uniquement.'],
      coups: ['volee'], axes: ['profondeur', 'filet', 'precision'],
      equipment: BR, players: [2, 4], space: 'complet', duration: [8, 10, 12], intensity: 2,
      diagram: {
        zones: [['L.back', 'soft'], ['R.back', 'soft']],
        players: [[4.3, 4.2, 1], [19.5, 4.2, 2]],
        shots: [
          { p: [[4.9, 4.2], [21.4, 3.2]] },
          { p: [[18.9, 6.4], [2.4, 7.6]] }
        ]
      }
    },
    {
      id: 'tm-g21', theme: 'mixte', source: TM,
      title: 'Demi contre plein', original: 'Half vs Full',
      objective: 'Jouer avec une contrainte de zone face à un adversaire libre.',
      steps: [
        'Points en 10, engagés par une mise en jeu ou un service.',
        'J1 ne joue que dans la moitié côté égalité ; J2 joue partout.',
        'Après 10 points, on passe côté avantage.',
        'Une fois les deux côtés joués, on inverse les rôles.'
      ],
      score: 'Premier à 10 points par côté.',
      tip: 'Ajuster le défi en ajoutant le couloir à la moitié de terrain.',
      variants: ['Ajouter le couloir.', 'J2 limité au fond de court.'],
      coups: ['coup-droit', 'revers'], axes: ['tactique', 'precision', 'defense'],
      equipment: BR, players: [2, 4], space: 'complet', duration: [10, 12, 15], intensity: 3,
      diagram: {
        zones: [['L', 'soft'], ['R.top', 'soft']],
        players: [[L, 5.5, 1, 'J1'], [R, 4, 2, 'J2']]
      }
    },
    {
      id: 'tm-g23', theme: 'mixte', source: TM,
      title: 'Lob – Smash', original: 'Lobs',
      objective: 'Travailler le duel lob / smash : profondeur d’un côté, précision de l’autre.',
      steps: [
        'J1 (fond de court) met en jeu un lob et ne joue que des lobs.',
        'J2 (départ dans le carré de service) smashe en empêchant la balle de rebondir.',
        'Le point s’arrête si la balle rebondit chez J2 ou sur une faute.'
      ],
      score: 'Premier à 10, puis on inverse les rôles.',
      tip: 'La profondeur est la clé pour J1, la précision pour J2.',
      variants: ['J2 peut laisser rebondir une fois.', 'J1 peut tenter un passing après 3 lobs.'],
      coups: ['lob', 'smash'], axes: ['defense', 'attaque', 'filet'],
      equipment: BR, players: [2, 4], space: 'complet', duration: [8, 10, 12], intensity: 3,
      diagram: {
        zones: [['L', 'soft'], ['R.boxes', 'soft']],
        players: [[L, 5.5, 1, 'J1'], [15.2, 5.5, 2, 'J2']],
        shots: [
          { p: [[-0.4, 5.3], [17.8, 4.4]], arc: -3.6 },
          { p: [[15, 6.1], [3.6, 8.2]] }
        ],
        labels: [[4.4, 2.6, 'LOB', 'plainInk'], [17.2, 8.7, 'SMASH', 'plainInk']]
      }
    },

    /* ==================================================================
       SITUATIONS OUVERTES — jeux avec pression (cartes rouges)
       ================================================================== */
    {
      id: 'tm-g01', theme: 'ouvert', source: TM,
      title: 'Service + 2', original: 'Bish, Bash, Bosh',
      objective: 'Rendre le serveur offensif : conclure vite après le service.',
      steps: [
        'Points joués avec un décompte match ou tie-break.',
        'Le serveur dispose de 2 frappes après son service pour gagner le point.',
        'Point non conclu = point pour le relanceur.'
      ],
      score: 'Match ou tie-break.',
      tip: 'Le pourcentage de premières balles et la qualité du retour deviennent décisifs.',
      variants: ['Service + 3 pour faciliter.', 'Secondes balles uniquement.'],
      coups: ['service', 'retour', 'coup-droit'], axes: ['attaque', 'pression', 'tactique'],
      equipment: BR, players: [2, 4], space: 'complet', duration: [10, 15, 20], intensity: 3,
      diagram: {
        zones: [['L', 'soft'], ['R', 'soft']],
        players: [[L, 6.3, 1, 'S'], [R, 3.2, 2, 'R']],
        shots: [{ p: [[-0.4, 6.3], [6.4, 6.3]], kind: 'move' }],
        labels: [[2.6, 3.4, 'POINT COURT', 'tag'], [21.2, 7.8, 'POINT LONG', 'dark'], [8.6, 8.4, 'SERVICE + 2', 'plainStrong']]
      }
    },
    {
      id: 'tm-g03', theme: 'ouvert', source: TM,
      title: 'Plus ou moins', original: 'Plus & Minus',
      objective: 'Récompenser le coup gagnant et sanctionner la faute pour doser la prise de risque.',
      steps: [
        'Départ à 7-7, décompte tie-break.',
        'Faute (directe ou provoquée) = −1 point pour le fautif.',
        'Coup gagnant franc = +1 point.',
        'Un seul score change par point.'
      ],
      score: 'Le premier à 14 gagne, le premier à 0 perd.',
      tip: 'Le score final en dit long : trop de fautes ou pas assez d’agressivité ?',
      variants: ['Départ à 5-5 pour une partie courte.', 'Coup gagnant au filet = +2.'],
      coups: [], axes: ['pression', 'tactique', 'attaque'],
      equipment: BR, players: [2, 4], space: 'complet', duration: [10, 12, 15], intensity: 3,
      diagram: { picto: 'plusminus' }
    },
    {
      id: 'tm-g05', theme: 'ouvert', source: TM,
      title: 'Le Trou noir', original: 'The Black Hole',
      objective: 'Éviter une zone interdite et apprendre à varier ses cibles.',
      steps: [
        'Marquer un cercle (le « trou noir ») d’un côté du terrain.',
        'Tie-break en 10 points, J1 met en jeu.',
        'J2 doit éviter le trou noir : s’il y joue, J1 marque.',
        'Changer de côté après le tie-break.'
      ],
      score: 'Meilleur score à l’issue des deux tie-breaks.',
      tip: 'Ajuster la taille du cercle, ou ajouter un trou noir de chaque côté.',
      variants: ['Trou noir au centre.', 'Un trou noir de chaque côté.'],
      coups: ['coup-droit', 'revers'], axes: ['precision', 'tactique'],
      equipment: ['balles', 'raquettes', 'lignes'], players: [2, 4], space: 'complet', duration: [10, 12, 15], intensity: 2,
      diagram: {
        zones: [['L', 'soft'], ['R', 'soft']],
        hole: [5.1, 4.4, 1.9],
        players: [[L, 5.2, 1, 'J1'], [R, 6.2, 2, 'J2']]
      }
    },
    {
      id: 'tm-g08', theme: 'ouvert', source: TM,
      title: 'Dans les lignes', original: 'Inside the Lines',
      objective: 'Jouer en avançant dans le court et prendre la balle tôt.',
      steps: [
        'Les deux joueurs restent à l’intérieur du terrain.',
        'Mise en jeu, puis le point se joue.',
        'Sortir des lignes = point pour l’adversaire.'
      ],
      score: 'Tie-breaks en 10 points.',
      tip: 'Jouer tactique pour pousser l’adversaire hors du court.',
      variants: ['Couloirs inclus.', 'Demi-terrain uniquement.'],
      coups: ['coup-droit', 'revers', 'volee'], axes: ['rythme', 'attaque', 'reaction'],
      equipment: BR, players: [2, 4], space: 'complet', duration: [10, 12, 15], intensity: 3,
      diagram: {
        zones: [['L', 'soft'], ['R', 'soft']],
        lines: [
          { p: [[0, T], [W, T]], color: 'strong', w: 3.4 }, { p: [[0, B], [W, B]], color: 'strong', w: 3.4 },
          { p: [[0, T], [0, B]], color: 'strong', w: 3.4 }, { p: [[W, T], [W, B]], color: 'strong', w: 3.4 }
        ],
        players: [[1.1, 3.6, 1], [22.6, 6.8, 2]],
        shots: [{ p: [[1.7, 3.7], [22, 6.7]], kind: 'rally' }]
      }
    },
    {
      id: 'tm-g09', theme: 'ouvert', source: TM,
      title: 'Risque !', original: 'Risk',
      objective: 'Apprendre à choisir le bon moment pour prendre un risque.',
      steps: [
        'Tie-break jusqu’au score choisi.',
        'Quand on sent l’occasion de conclure, on crie « RISQUE ! » avant de frapper.',
        'L’adversaire ne renvoie pas : on gagne 3 points.',
        'Il la renvoie : c’est lui qui gagne 3 points !'
      ],
      score: 'Score libre (ex. 15 points).',
      tip: 'Après la partie, se demander si l’on a pris le bon niveau de risque.',
      variants: ['2 « Risque ! » maximum par joueur.', 'Le risque vaut 2 points.'],
      coups: [], axes: ['pression', 'tactique', 'attaque'],
      equipment: BR, players: [2, 4], space: 'complet', duration: [10, 12, 15], intensity: 3,
      diagram: { picto: 'risk' }
    },
    {
      id: 'tm-g11', theme: 'ouvert', source: TM,
      title: 'Replacement obligatoire', original: 'Recover',
      objective: 'Faire du replacement un réflexe en situation de match.',
      steps: [
        'Définir une zone de replacement (bande centrale).',
        'Décompte match ou tie-break.',
        'Revenir dans la zone après chaque frappe.',
        'Replacement manqué = point pour l’adversaire.'
      ],
      score: 'Match ou tie-break.',
      tip: 'Jouer sur la vitesse et la trajectoire pour gagner du temps… et en retirer à l’adversaire.',
      variants: ['Zone plus étroite.', 'Zone décalée côté revers.'],
      coups: ['coup-droit', 'revers'], axes: ['deplacement', 'tactique'],
      equipment: ['balles', 'raquettes', 'lignes'], players: [2, 4], space: 'complet', duration: [10, 12, 15], intensity: 3,
      diagram: {
        zones: [['L', 'soft'], ['R', 'soft'], [[-0.9, 4.6, 24.67, 6.4], 'grey']],
        lines: [
          { p: [[-0.9, 4.6], [24.67, 4.6]], dash: true, color: 'strong' },
          { p: [[-0.9, 6.4], [24.67, 6.4]], dash: true, color: 'strong' }
        ],
        players: [[L, 5.5, 1], [R, 5.5, 2]]
      }
    },
    {
      id: 'tm-g13', theme: 'ouvert', source: TM,
      title: 'Une seule balle', original: '1 Serve',
      objective: 'Servir sous pression avec une seule balle de service.',
      steps: [
        'Jouer un set ou un tie-break avec un seul service par point.',
        'Service manqué = point perdu.'
      ],
      score: 'Set ou tie-break.',
      tip: 'Côté relanceur : l’occasion d’être plus agressif au retour.',
      variants: ['Une seule balle uniquement sur les points importants (30-30, égalité…).'],
      coups: ['service', 'retour'], axes: ['pression', 'regularite'],
      equipment: BR, players: [2, 4], space: 'complet', duration: [10, 15, 20], intensity: 2,
      diagram: { picto: 'serve' }
    },
    {
      id: 'tm-g14', theme: 'ouvert', source: TM,
      title: 'Le gagnant sert', original: 'Winner Serves',
      objective: 'Servir depuis n’importe quelle position et s’adapter, au service comme au retour.',
      steps: [
        'Décompte tie-break.',
        'Premier point joué normalement, avec un seul service.',
        'Le gagnant sert le point suivant depuis l’endroit où il a fini le point précédent.',
        'Un seul service par point, dans le carré en diagonale de sa position.'
      ],
      score: 'Tie-break.',
      tip: 'Adapter sa stratégie à sa position, au service comme au retour.',
      variants: ['Deux services autorisés.'],
      coups: ['service', 'retour'], axes: ['tactique', 'pression'],
      equipment: BR, players: [2, 4], space: 'complet', duration: [10, 12, 15], intensity: 2,
      diagram: {
        zones: [['L', 'soft'], ['R', 'soft']],
        players: [[6, 3, 1], [L, 6.4, 1], [9, H + 0.35, 1], [17.2, -0.35, 2], [R, 4, 2], [21.4, H + 0.35, 2]],
        shots: [
          { p: [[-0.4, 6.4], [16.4, 3]] },
          { p: [[6.5, 3.2], [16.6, 8.4]] },
          { p: [[9.3, 10.5], [15.8, 2]] }
        ]
      }
    },
    {
      id: 'tm-g15', theme: 'ouvert', source: TM,
      title: 'Tir à la corde', original: 'Tug of War',
      objective: 'Gérer les séries de points : chaque point compte double.',
      steps: [
        'Départ à 5-5.',
        'Points engagés au service ou par une mise en jeu.',
        'Point gagné = +1 pour soi ET −1 pour l’adversaire.'
      ],
      score: 'Le premier à 10-0 gagne.',
      tip: 'Changer de serveur tous les deux points.',
      variants: ['Départ à 3-3 pour une partie courte.'],
      coups: [], axes: ['pression', 'regularite'],
      equipment: BR, players: [2, 4], space: 'complet', duration: [10, 12, 15], intensity: 3,
      diagram: { picto: 'tug' }
    },
    {
      id: 'tm-g16', theme: 'ouvert', source: TM,
      title: 'Casino', original: 'Casino Tennis',
      objective: 'Valoriser la construction : plus l’échange est long, plus il rapporte.',
      steps: [
        'Jouer l’échange en comptant chaque frappe.',
        'Le gagnant marque autant de points que de frappes (échange de 12 = 12 points).',
        'Le gagnant sert ou met en jeu le point suivant.'
      ],
      score: 'Premier à 50 points (ou cible choisie).',
      tip: 'Points engagés au service ou par une mise en jeu.',
      variants: ['Seules les frappes au-delà de la ligne de service comptent.'],
      coups: ['coup-droit', 'revers'], axes: ['regularite', 'tactique', 'pression'],
      equipment: BR, players: [2, 4], space: 'complet', duration: [10, 15, 20], intensity: 3,
      diagram: {
        score: '0 – 4',
        zones: [['L', 'soft'], ['R', 'soft']],
        players: [[L, 6.4, 1, '1'], [24.1, 3.3, 2, '2'], [7.4, 7.7, 1, '3'], [23.8, 8.6, 2, '4']],
        shots: [
          { p: [[-0.3, 6.4], [23.3, 3.4]] },
          { p: [[23.3, 3.6], [8.1, 7.6]] },
          { p: [[8.1, 7.8], [23, 8.6]] }
        ]
      }
    },
    {
      id: 'tm-g20', theme: 'ouvert', source: TM,
      title: 'Sans temps mort', original: 'Rush',
      objective: 'Enchaîner les points sans temps mort : réactivité et intensité.',
      steps: [
        'Poches pleines de balles ; les deux joueurs démarrent en fond de court.',
        'Le gagnant de chaque point remet immédiatement une balle en jeu, depuis là où il se trouve.',
        'Exception : s’il a fini dans le carré de service, il recule derrière la ligne de service avant de remettre en jeu.'
      ],
      score: 'Premier à 10 points.',
      tip: 'Les mises en jeu peuvent partir de n’importe où : rester TOUJOURS prêt !',
      variants: ['Premier à 15 pour plus d’intensité.'],
      coups: ['coup-droit', 'revers', 'volee'], axes: ['reaction', 'deplacement', 'pression'],
      equipment: BR, players: [2, 4], space: 'complet', duration: [8, 10, 12], intensity: 3,
      diagram: { picto: 'rush' }
    },
    {
      id: 'tm-g22', theme: 'ouvert', source: TM,
      title: 'Service laser', original: 'Laser Serves',
      objective: 'Annoncer sa cible au service : précision, prise de risque et bluff.',
      steps: [
        'Diviser chaque carré de service en 3 zones (extérieur / corps / centre). Tie-break en 21.',
        'Le serveur choisit d’annoncer ou non sa zone.',
        'Pas d’annonce : le point vaut 1.',
        'Annonce + zone touchée : le point vaut 3 pour le serveur, 1 pour le relanceur.',
        'Annonce + zone manquée : le point vaut 1 pour le serveur, 3 pour le relanceur.'
      ],
      score: 'Tie-break en 21.',
      tip: 'Jouer tactique : il y a quelques ruses cachées à exploiter.',
      variants: ['Annonce obligatoire sur seconde balle.'],
      coups: ['service', 'retour'], axes: ['precision', 'tactique', 'pression'],
      equipment: ['balles', 'raquettes', 'lignes'], players: [2, 4], space: 'complet', duration: [10, 12, 15], intensity: 2,
      diagram: {
        score: '3 – 0',
        zones: [['L', 'soft'], ['R', 'soft'], [[N, T, SR, 2.74], 'strong']],
        lines: thirds(N, SR).concat(thirds(SL, N)),
        players: [[L, 6.4, 1, 'S'], [R, 2.4, 2, 'R']],
        shots: [
          { p: [[-0.4, 6.3], [17.2, 2]] },
          { p: [[23.8, 2.5], [3.2, 7.8]] }
        ],
        labels: [[0.6, 3.9, 'EXTÉRIEUR !', 'bubble']]
      }
    },
    {
      id: 'tm-g24', theme: 'ouvert', source: TM,
      title: 'Variété', original: 'Variety',
      objective: 'Varier ses zones et casser le rythme de l’adversaire.',
      steps: [
        'Décompte match ou tie-break.',
        'Interdit de jouer deux fois de suite dans le même quart de terrain.',
        'Le faire = point perdu.'
      ],
      score: 'Match ou tie-break.',
      tip: 'On sait où l’adversaire NE jouera PAS : anticiper !',
      variants: ['Diviser en 6 zones.', 'Pénalité seulement à la 3e fois.'],
      coups: ['coup-droit', 'revers'], axes: ['tactique', 'precision'],
      equipment: BR, players: [2, 4], space: 'complet', duration: [10, 12, 15], intensity: 2,
      diagram: {
        zones: [
          ['L.back.top', 'dark'], ['L.box.top', 'soft'], ['L.back.bot', 'strong'], ['L.box.bot', 'grey'],
          ['R.box.top', 'grey'], ['R.back.top', 'strong'], ['R.box.bot', 'soft'], ['R.back.bot', 'dark']
        ],
        players: [[L, 5.5, 1], [R, 5.5, 2]]
      }
    },

    /* ==================================================================
       FOCUS — intention mentale de la séance (cartes bleues)
       ================================================================== */
    {
      id: 'tm-f01', theme: 'focus', source: TM,
      title: 'Remise à zéro', original: 'Reset',
      objective: 'Dès que la frustration ou la distraction arrive : la reconnaître, puis faire une « remise à zéro ».',
      steps: [
        'Respiration consciente : quelques grandes inspirations par le nez, expiration par la bouche.',
        'Porter son attention sur la sensation du souffle, de l’inspiration à l’expiration.'
      ],
      axes: ['pression'],
      diagram: { picto: 'reset' }
    },
    {
      id: 'tm-f02', theme: 'focus', source: TM,
      title: 'Le Technicien', original: 'The Technician',
      objective: 'Un seul objectif technique simple pour la séance, rappelé avant chaque exercice.',
      steps: [
        'Exemple : appuis larges et bas.',
        'Exemple : frapper devant soi.',
        'Exemple : monter chercher la balle au service.'
      ],
      axes: ['precision', 'regularite'],
      diagram: { picto: 'gear' }
    },
    {
      id: 'tm-f03', theme: 'focus', source: TM,
      title: 'Chasse chaque balle', original: 'Chase Every Ball',
      objective: 'Mission : ne laisser aucune balle rebondir deux fois.',
      steps: [
        'Certaines sont impossibles : y aller quand même.',
        'Chaque course rend plus rapide la fois suivante.'
      ],
      axes: ['deplacement', 'defense'],
      diagram: { picto: 'chase' }
    },
    {
      id: 'tm-f04', theme: 'focus', source: TM,
      title: 'Résous le problème', original: 'The Problem Solver',
      objective: 'Ne jamais faire deux fois de suite la même faute.',
      steps: [
        'Après chaque faute, un petit ajustement pour la corriger.',
        'Ajuster la balle plutôt que la technique : hauteur, profondeur, direction, vitesse, effet.'
      ],
      axes: ['regularite', 'precision', 'tactique'],
      diagram: { picto: 'bulb' }
    },
    {
      id: 'tm-f05', theme: 'focus', source: TM,
      title: 'Avant le rebond', original: 'Beat the Bounce',
      objective: 'Appuis, corps et raquette prêts avant que la balle rebondisse de son côté… à chaque fois !',
      steps: ['À prioriser dans chaque exercice pour progresser plus vite.'],
      axes: ['rythme', 'reaction'],
      diagram: { picto: 'bounce' }
    },
    {
      id: 'tm-f06', theme: 'focus', source: TM,
      title: 'Avant la frappe', original: 'Beat the Hit',
      objective: 'Être replacé avant que l’adversaire frappe : le saut d’allègement (« split step ») à son impact est le signe d’un bon replacement.',
      steps: ['Hors position : jouer sur la vitesse et la trajectoire pour gagner du temps.'],
      axes: ['deplacement', 'reaction'],
      diagram: { picto: 'runner' }
    }
  ];
})();
