/* ==========================================================================
   Assistant Coach — Paquet « Pressure Tennis »
   Situations tirées de Pressure Tennis (Paul Wardlaw), reformulées en
   français : jeux de pression et règles inside / outside (« directionals »).

   Rappel des règles inside / outside :
   - balle OUTSIDE : elle croise devant le corps et s'en éloigne (échange
     croisé) → on la rejoue croisé, sans changer de direction ;
   - balle INSIDE : elle arrive dans le corps sans le croiser → on change
     de direction vers le côté ouvert, en avançant dans le court ;
   - balle OUTSIDE COURTE (pieds dans le court) → changement de direction
     à 90° : la balle file droit vers la ligne de fond adverse.

   Schémas : droitiers ; joueur de gauche = rond plein (J1), adversaire =
   rond vide (J2). Côté égalité du joueur de gauche = moitié basse.
   Codes dans les ronds : voir README (J1, J2, S, R, C, A, D…).
   ========================================================================== */
window.AC = window.AC || {};
AC.CARDS = AC.CARDS || [];

(function () {
  var L = -1.3, R = 25.1, N = 11.885, SL = 5.485, SR = 18.285, T = 1.37, B = 9.6, M = 5.485, W = 23.77, H = 10.97;
  var SRC = 'Pressure Tennis';
  var BR = ['balles', 'raquettes'];
  var BRL = ['balles', 'raquettes', 'lignes'];
  var TOP = [[0, 0, W, M], 'soft'];            // demi-terrain de double (moitié haute)

  /* Ligne de replacement : à un pas de la marque centrale */
  function recoveryLines() {
    return [
      { p: [[-1.6, M - 0.9], [0.9, M - 0.9]], dash: true, color: 'deep', w: 2.4 },
      { p: [[W - 0.9, M + 0.9], [W + 1.6, M + 0.9]], dash: true, color: 'deep', w: 2.4 }
    ];
  }

  /* Schéma type : échange croisé outside puis balle inside avec changement de direction */
  function insideOutsideDiagram() {
    return {
      zones: [['L', 'soft'], ['R', 'soft']],
      players: [[L, 7.9, 1], [0.1, 2.8, 1], [R, 3.2, 2]],
      shots: [
        { p: [[0, 7.9], [23, 3.2]], kind: 'rally' },
        { p: [[23, 2.7], [0.8, 2.7]], tone: 'deep' },
        { p: [[0.8, 2.9], [22.4, 8.3]] }
      ],
      labels: [[4.2, 9.4, 'OUTSIDE = CROISÉ', 'dark'], [4.6, 4.3, 'INSIDE = CHANGE', 'tag']]
    };
  }

  AC.CARDS.push(

    /* ==================================================================
       ÉCHAUFFEMENT
       ================================================================== */
    {
      id: 'pt-w1', theme: 'echauffement', source: SRC,
      title: 'Mini-tennis directionnel', original: 'Directional Minitennis',
      objective: 'S’échauffer en mini-tennis tout en automatisant la règle inside / outside.',
      steps: [
        'Demi-terrain de double, les deux joueurs sur la ligne de service. 1 minute par séquence.',
        '1. Coups droits outside croisés. 2. Revers outside croisés.',
        '3. J2 donne une balle inside à J1, qui change de direction en croisé (revers inside, puis coup droit inside). On inverse.',
        '4 à 6. Même chose avec un joueur à la volée : volées outside croisées, puis volées inside avec changement de direction.'
      ],
      score: 'Pas de score : qualité du placement et des déplacements.',
      tip: 'Fixer slice ou lift avant de commencer, et poser des cibles : en mini-tennis, on joue souvent trop long.',
      keys: [
        'Outside (la balle croise devant le corps) : on rejoue croisé.',
        'Inside (la balle arrive dans le corps) : on change de direction.',
        'Bouger en permanence entre les frappes.'
      ],
      variants: ['Commencer directement par les séquences de volée.', 'Annoncer « inside » ou « outside » avant chaque frappe.'],
      coups: ['coup-droit', 'revers', 'volee'], axes: ['inside-outside', 'toucher', 'deplacement'],
      equipment: BR, players: [2, 4], space: 'mini', duration: [6, 8, 10], intensity: 1,
      diagram: {
        zones: [['L.boxes', 'soft'], ['R.boxes', 'soft']],
        players: [[SL, 7.6, 1, 'J1'], [SL, 3.0, 1, 'J1'], [SR, 3.4, 2, 'J2']],
        shots: [
          { p: [[5.9, 7.5], [17.8, 3.6]], kind: 'rally' },
          { p: [[17.8, 3.0], [6, 3.0]], tone: 'deep' },
          { p: [[6, 3.2], [16.6, 8.2]] }
        ],
        labels: [[8.4, 9.0, 'OUTSIDE', 'dark'], [8.4, 2.0, 'INSIDE', 'tag']]
      }
    },
    {
      id: 'pt-w2', theme: 'echauffement', source: SRC,
      title: 'Lift en trois étapes', original: 'Topspin Warm-Up',
      objective: 'Chauffer le lift et la marge au-dessus du filet en reculant par étapes.',
      steps: [
        'Échanges croisés en coup droit outside côté égalité : 1 minute depuis la ligne de service.',
        'Puis 1 minute aux 3/4 du court, puis depuis la ligne de fond.',
        'Recommencer la séquence côté avantage, en revers.',
        'Toutes les frappes sont liftées, croisées, vers un plot cible.'
      ],
      score: 'Pas de score, ou 1 point par plot touché.',
      tip: 'Une balle par joueur : en cas de faute dans le filet, on court la ramasser. Excellent pour la marge !',
      keys: [
        'Passer haut au-dessus du filet.',
        'Rester croisé : ce sont des balles outside.',
        'Accélérer la raquette sans chercher la vitesse de balle.'
      ],
      variants: ['2 minutes pour l’étape fond de court.', 'Même progression pour un volleyeur : près du filet, ligne de service, 3/4 du court.'],
      coups: ['coup-droit', 'revers'], axes: ['regularite', 'profondeur', 'inside-outside'],
      equipment: ['balles', 'raquettes', 'plots'], players: [2, 4], space: 'demi', duration: [6, 8, 10], intensity: 1,
      diagram: {
        zones: [['L.bot', 'soft'], ['R.top', 'soft']],
        players: [[SL, 7.5, 1], [SR, 3.5, 2]],
        marks: [['cone', 21.6, 3.0], ['cone', 2.2, 8.0]],
        shots: [
          { p: [[5.9, 7.4], [17.9, 3.6]], kind: 'rally' },
          { p: [[4.6, 9.0], [0.2, 9.0]], kind: 'move' },
          { p: [[19.2, 2.0], [23.6, 2.0]], kind: 'move' }
        ],
        labels: [[2.4, 6.2, '1 → 2 → 3', 'plainStrong']]
      }
    },

    /* ==================================================================
       ÉDUCATIF
       ================================================================== */
    {
      id: 'pt-e1', theme: 'educatif', source: SRC,
      title: 'Panier inside / outside', original: 'Soft-Toss Drills',
      objective: 'Reconnaître une balle inside ou outside et choisir la bonne direction.',
      steps: [
        'Le coach, à 2-3 m du joueur, lance à la main (ou au panier) dans une zone précise.',
        'Séries : coup droit outside, revers outside, revers inside, coup droit inside.',
        'Le joueur annonce « outside » ou « inside » avant de frapper : croisé sur l’outside, changement de direction sur l’inside.',
        'Retour au repère central après chaque frappe.'
      ],
      score: '8 bonnes annonces et bonnes directions sur 10.',
      tip: 'Ce n’est pas la place sur le terrain qui compte, mais la trajectoire de la balle par rapport au corps.',
      keys: [
        'Outside : la balle croise devant le corps et s’en éloigne.',
        'Inside : la balle arrive dans le corps sans le croiser.',
        'Sur l’inside, hanches et épaules tournent naturellement vers le côté ouvert.'
      ],
      variants: ['Envois depuis l’autre côté du filet, à vitesse de match.', 'Ajouter la balle outside courte : changement de direction à 90°.'],
      coups: ['coup-droit', 'revers'], axes: ['inside-outside', 'precision'],
      equipment: BR, players: [1, 4], space: 'complet', duration: [6, 8, 10], intensity: 1,
      diagram: {
        zones: [['L', 'soft'], ['R', 'soft']],
        players: [[L, 7.9, 1, 'J'], [0.1, 2.8, 1, 'J']],
        shots: [
          { p: [[23, 3.1], [0.6, 7.7]], tone: 'deep' },
          { p: [[0.6, 8.1], [22.6, 3.5]] },
          { p: [[23, 2.6], [0.8, 2.6]], tone: 'deep' },
          { p: [[0.8, 2.9], [22.4, 8.3]] }
        ],
        labels: [[4.2, 9.4, 'OUTSIDE = CROISÉ', 'dark'], [4.6, 4.3, 'INSIDE = CHANGE', 'tag']]
      }
    },
    {
      id: 'pt-e2', theme: 'educatif', source: SRC,
      title: 'Séquences directionnelles', original: 'Soft-Toss Sequences',
      objective: 'Enchaîner les frappes d’un schéma de jeu en appliquant les règles inside / outside.',
      steps: [
        'Le coach enchaîne 3 balles au panier ; le joueur se replace au centre entre chaque frappe.',
        'Séquence 1 : coup droit outside, coup droit outside, puis approche coup droit outside à 90°.',
        'Séquence 2 : revers outside, revers outside, puis coup droit inside (changement de direction).',
        'Séquence 3 : coup droit inside-out, coup droit inside-out, puis coup droit inside à 90°.'
      ],
      score: '3 séquences réussies sur 5 (toutes les balles dans la bonne zone).',
      tip: 'Penser au coup d’après : chaque balle prépare la suivante.',
      keys: [
        'Les balles outside construisent ; la balle inside ou courte attaque.',
        'Approche sur balle outside : 90°, droit vers le fond.',
        'Replacement complet entre chaque balle.'
      ],
      variants: ['Séquence 4 : volée de coup droit, retour au T, volée de revers.', 'Le coach accélère le rythme des envois.'],
      coups: ['coup-droit', 'revers', 'volee'], axes: ['inside-outside', 'tactique', 'attaque'],
      equipment: BR, players: [1, 4], space: 'complet', duration: [8, 10, 12], intensity: 2,
      diagram: {
        zones: [['L', 'soft']],
        players: [[0.2, 7.6, 1, '1'], [0.6, 3.4, 1, '2'], [3.8, 7.9, 1, '3'], [16.6, 5.5, 2, 'C']],
        marks: [['basket', 16.6, 7.4]],
        shots: [
          { p: [[0.8, 7.5], [22.4, 3.2]] },
          { p: [[1.2, 3.5], [22.4, 3.0]] },
          { p: [[4.5, 7.9], [23.2, 7.9]] }
        ],
        labels: [[14.6, 9.4, '90°', 'tag']]
      }
    },

    /* ==================================================================
       DRILLS
       ================================================================== */
    {
      id: 'pt-d1', theme: 'drill', source: SRC,
      title: 'Seconde balle : 17 sur 20', original: '20 Second Serves With Returns',
      objective: 'Fiabiliser la seconde balle sous pression et travailler le retour selon les règles inside / outside.',
      steps: [
        'J1 sert 20 secondes balles : 10 côté égalité, 10 côté avantage. J2 retourne.',
        'Retour : croisé sur une balle outside, changement de direction sur une balle inside (inside-out autorisé côté avantage).',
        'Version 4 frappes : après le service et le retour, chacun joue une frappe de plus.',
        'Puis on inverse les rôles.'
      ],
      score: 'Nombre de secondes balles réussies sur 20. Objectif : 17 ou plus.',
      tip: 'Le relanceur décale le jeu sur une diagonale et fait courir le serveur.',
      keys: [
        'Seconde balle engagée mais contrôlée.',
        'Le retour lance le point sur une diagonale.',
        'Peu de points dépassent 4 frappes : soigner les premières.'
      ],
      variants: ['Imposer la zone de la seconde balle.', '20 points de service : première et seconde balle, 2 doubles fautes maximum.'],
      coups: ['service', 'retour'], axes: ['regularite', 'pression', 'inside-outside'],
      equipment: BR, players: [2, 4], space: 'complet', duration: [10, 12, 15], intensity: 1,
      diagram: {
        zones: [['R.box.top', 'soft']],
        players: [[L, 7.0, 1, 'J1'], [R, 2.6, 2, 'J2']],
        shots: [
          { p: [[-0.4, 6.9], [16.6, 3]] },
          { p: [[23.6, 2.7], [2.2, 8.2]], tone: 'deep' }
        ],
        labels: [[7.6, 9.4, 'OBJECTIF 17 / 20', 'tag']]
      }
    },
    {
      id: 'pt-d2', theme: 'drill', source: SRC,
      title: 'Grandes cibles', original: 'Big Targets',
      objective: 'Échanger avec une grande marge : haut au-dessus du filet, loin des lignes.',
      steps: [
        'Placer un plot dans chaque coin, à 3 pas de la ligne de côté et 3 pas de la ligne de fond.',
        'Mise en jeu, puis le point se joue en visant toujours l’un des deux plots adverses.',
        'Frappes liftées, lourdes et agressives.'
      ],
      score: 'Point classique, parties de 3 minutes.',
      tip: 'En visant les plots, on vise en réalité une très grande zone : la marge d’erreur est énorme.',
      keys: [
        'Passer largement au-dessus du filet.',
        'Jamais de faute de largeur ni de longueur.',
        'Des balles lourdes plutôt que rapides.'
      ],
      variants: ['Faute filet ou largeur = 2 points.', 'Plot touché = 2 points de bonus.'],
      coups: ['coup-droit', 'revers'], axes: ['regularite', 'profondeur', 'precision'],
      equipment: ['balles', 'raquettes', 'plots'], players: [2, 4], space: 'complet', duration: [3, 5, 8], intensity: 2,
      diagram: {
        zones: [['L', 'soft'], ['R', 'soft']],
        marks: [['cone', 2.4, 3.8], ['cone', 2.4, 7.2], ['cone', 21.4, 3.8], ['cone', 21.4, 7.2]],
        players: [[L, 5.5, 1], [R, 5.5, 2]],
        shots: [
          { p: [[0, 5.3], [20.9, 7.0]] },
          { p: [[23.8, 5.7], [2.9, 4.0]], tone: 'deep' }
        ]
      }
    },
    {
      id: 'pt-d3', theme: 'drill', source: SRC,
      title: 'Balles folles en fond de court', original: 'Crazy Groundstrokes / Returns',
      objective: 'Garder équilibre et technique face à des balles rapides et imprévisibles.',
      steps: [
        'J1 est en fond de court ; J2, au T de l’autre côté, lui envoie vite et au hasard : coup droit, revers, dans le corps.',
        'Les envois sont appuyés : on cherche la limite où la technique commence à lâcher.',
        '1 minute chacun, puis on inverse.'
      ],
      score: 'Pas de score.',
      tip: 'Version retours : J2 sert fort depuis la ligne de service, 1 minute côté égalité, 1 minute côté avantage.',
      keys: [
        'L’équilibre avant la puissance.',
        'Petits pas d’ajustement en permanence.',
        'Rester relâché malgré le rythme.'
      ],
      variants: ['Mélanger balles longues, courtes et larges.', 'Version retours de service.'],
      coups: ['coup-droit', 'revers', 'retour'], axes: ['reaction', 'equilibre', 'deplacement'],
      equipment: BR, players: [2, 4], space: 'complet', duration: [2, 4, 6], intensity: 3,
      diagram: {
        zones: [['L', 'soft']],
        players: [[L, 5.5, 1, 'J1'], [SR, 5.5, 2, 'J2']],
        marks: [['basket', SR, 7.3]],
        shots: [
          { p: [[17.6, 5.3], [1, 2.4]], tone: 'deep' },
          { p: [[17.6, 5.5], [0.4, 5.5]], tone: 'deep' },
          { p: [[17.6, 5.7], [1, 8.6]], tone: 'deep' }
        ],
        labels: [[5.6, 5.5, 'AU HASARD', 'bubble']]
      }
    },
    {
      id: 'pt-d4', theme: 'drill', source: SRC,
      title: 'Balles folles au filet', original: 'Crazy Volleys / Overheads',
      objective: 'Élargir son registre à la volée et au smash face à des balles difficiles.',
      steps: [
        'Volées : J1 part du T ; J2, en fond de court, lui envoie vite passings et balles difficiles.',
        'Smashs : J2 envoie des lobs variés (bas, hauts, courts, profonds, côté revers) ; J1 joue tout en smash.',
        'Combiné : un smash puis une volée, en enchaînant.',
        '1 minute chacun, puis on inverse.'
      ],
      score: 'Pas de score.',
      tip: 'Retrouver l’équilibre et se replacer le plus vite possible après chaque frappe.',
      keys: [
        'Avancer dans la volée pour garder l’équilibre.',
        'Tout jouer en smash, même les lobs difficiles.',
        'Appuis actifs entre chaque frappe.'
      ],
      variants: ['2 × 30 secondes avec 15 secondes de repos.'],
      coups: ['volee', 'smash'], axes: ['reaction', 'filet', 'deplacement'],
      equipment: BR, players: [2, 4], space: 'complet', duration: [2, 4, 6], intensity: 3,
      diagram: {
        zones: [['L.boxes', 'soft']],
        players: [[8.6, 5.5, 1, 'J1'], [R, 5.5, 2, 'J2']],
        marks: [['basket', R, 7.4]],
        shots: [
          { p: [[24.4, 5.3], [7.2, 3.2]], arc: -3.4, tone: 'deep' },
          { p: [[24.4, 5.7], [9.6, 8.4]], tone: 'deep' },
          { p: [[8.6, 6.4], [8.6, 8.0]], kind: 'move' }
        ]
      }
    },

    /* ==================================================================
       MIXTE — début imposé ou contraintes, puis point libre
       ================================================================== */
    {
      id: 'pt-m1', theme: 'mixte', source: SRC,
      title: 'La croix au retour', original: 'Four-Shot Pressuring Returns (X Marks the Spot)',
      objective: 'Prendre l’initiative en retournant les secondes balles en coup droit.',
      steps: [
        'Tracer une croix sur la marque centrale (retours côté égalité) et une dans le couloir (côté avantage).',
        'Au lancer du serveur, le relanceur a le pied gauche sur la croix (droitier).',
        'Le serveur sert 20 secondes balles ; le relanceur retourne en coup droit, puis chacun joue une frappe : le relanceur presse deux fois.',
        'Puis on inverse.'
      ],
      score: 'Nombre de secondes balles réussies sur 20 (objectif 17).',
      tip: 'Montrer son coup droit met énormément de pression sur le serveur.',
      keys: [
        'Côté avantage : coup droit inside-out.',
        'Le relanceur presse deux fois de suite.',
        'Le serveur se défend avec sa frappe suivante.'
      ],
      variants: ['Imposer la zone de la seconde balle.', 'Le relanceur peut monter au filet après son retour.'],
      coups: ['retour', 'coup-droit', 'service'], axes: ['attaque', 'pression', 'inside-outside'],
      equipment: BRL, players: [2, 4], space: 'complet', duration: [10, 12, 15], intensity: 2,
      diagram: {
        zones: [['L.box.bot', 'soft']],
        marks: [['x', 0, M], ['x', 0, 0.68]],
        players: [[-0.9, 6.3, 1, 'R'], [R, 3.6, 2, 'S']],
        shots: [
          { p: [[24.4, 3.7], [8.2, 8.0]], tone: 'deep' },
          { p: [[-0.3, 6.6], [22.4, 3.0]] }
        ],
        labels: [[2.2, 4.3, 'PIED SUR LA CROIX', 'tag']]
      }
    },
    {
      id: 'pt-m2', theme: 'mixte', source: SRC,
      title: 'Service-volée en 5 frappes', original: 'Five-Shot 20 Second Serves — Serve and Volley',
      objective: 'Enchaîner service, première volée profonde et volée décisive.',
      steps: [
        'J1 sert 20 secondes balles en montant au filet ; J2 retourne sur le serveur.',
        'J1 joue une première volée, J2 tente un passing, J1 conclut avec sa deuxième volée.',
        'La séquence s’arrête à la deuxième volée. Puis on inverse.'
      ],
      score: 'Nombre de secondes balles réussies sur 20 (objectif 17).',
      tip: 'Une première volée profonde donne une deuxième volée facile.',
      keys: [
        'Première volée qui pénètre vers le fond.',
        'Volée outside contrôlable : croisé ou 90°. Volée inside : changement de direction.',
        'Deuxième volée courte et croisée.'
      ],
      variants: ['J2 applique les règles inside / outside.', 'Première volée profonde, deuxième volée courte croisée imposées.'],
      coups: ['service', 'volee', 'retour'], axes: ['filet', 'attaque', 'inside-outside'],
      equipment: BR, players: [2, 4], space: 'complet', duration: [10, 12, 15], intensity: 3,
      diagram: {
        zones: [['L', 'soft'], ['R', 'soft']],
        players: [[L, 6.4, 1, 'J1'], [7, 7.6, 1, 'J1'], [R, 2.8, 2, 'J2']],
        shots: [
          { p: [[-0.3, 6.6], [6.3, 7.6]], kind: 'move' },
          { p: [[-0.4, 6.2], [16.6, 3]] },
          { p: [[23.6, 2.8], [7.6, 7.4]], tone: 'deep' },
          { p: [[7.6, 7.8], [22.6, 6.6]] }
        ]
      }
    },
    {
      id: 'pt-m3', theme: 'mixte', source: SRC,
      title: 'Retour amorti', original: 'Four-Shot 20 Second Serves With Drop-Shot Returns',
      objective: 'Surprendre le serveur avec un amorti en retour de seconde balle.',
      steps: [
        'J1 sert 20 secondes balles ; J2 retourne en amorti.',
        'J1 remonte et joue ce qu’il peut ; J2 passe ou lobe.',
        'La séquence s’arrête après le passing ou le lob. Puis on inverse.'
      ],
      score: 'Secondes balles réussies sur 20 (objectif 17). On peut aussi compter les points gagnés par J2.',
      tip: 'J1 relance l’amorti le long de la ligne pour fermer les angles de passing.',
      keys: [
        'Amorti joué selon les règles inside / outside.',
        'Le serveur démarre dès qu’il lit l’amorti.',
        'Passing ou lob immédiatement après.'
      ],
      variants: ['Imposer la zone de la seconde balle.'],
      coups: ['amorti', 'retour', 'service', 'lob'], axes: ['toucher', 'tactique'],
      equipment: BR, players: [2, 4], space: 'complet', duration: [8, 10, 15], intensity: 2,
      diagram: {
        zones: [['L.boxes', 'soft']],
        players: [[L, 6.4, 1, 'J1'], [R, 2.8, 2, 'J2']],
        shots: [
          { p: [[-0.4, 6.2], [16.6, 3]] },
          { p: [[23.4, 3], [9.8, 4.2]], arc: -1.4, tone: 'deep' },
          { p: [[-0.3, 6], [8.6, 4.9]], kind: 'move' }
        ]
      }
    },
    {
      id: 'pt-m4', theme: 'mixte', source: SRC,
      title: 'Croisés avec replacement', original: 'Crosscourts — Deuce and Ad Court',
      objective: 'Construire le point en diagonale avec des balles outside, sans faute de filet ni de largeur.',
      steps: [
        'Points en demi-terrain croisé : côté égalité en coup droit, côté avantage en revers.',
        'Tracer une ligne à un pas de la marque centrale : après chaque frappe, la toucher avec le pied intérieur.',
        'Une seule balle de service par point ; chacun sert deux points.'
      ],
      score: 'Point classique (3-4 min). Selon le niveau : faute filet ou largeur = 2 points.',
      tip: 'Le jeu croisé est la base de tout : c’est lui qui crée les balles inside et les balles outside courtes.',
      keys: [
        'Grande marge au-dessus du filet.',
        'Aucune faute de largeur.',
        'Lift appuyé et balles longues.'
      ],
      variants: ['Mise en jeu au lieu du service.', 'Faute filet ou largeur = 2 points.'],
      coups: ['coup-droit', 'revers'], axes: ['regularite', 'profondeur', 'inside-outside'],
      equipment: BRL, players: [2, 4], space: 'demi', duration: [8, 10, 12], intensity: 3,
      diagram: {
        zones: [['L.bot', 'soft'], ['R.top', 'soft']],
        lines: recoveryLines(),
        players: [[L, 7.6, 1], [R, 3.4, 2]],
        shots: [{ p: [[0, 7.6], [23, 3.4]], kind: 'rally' }],
        labels: [[3.6, 3.4, 'LIGNE DE REPLACEMENT', 'plainStrong']]
      }
    },
    {
      id: 'pt-m5', theme: 'mixte', source: SRC,
      title: 'Coup droit inside-out', original: 'Crosscourts — Inside-Out Forehands (Ad Court)',
      objective: 'Construire le point avec son coup droit inside-out depuis le côté avantage.',
      steps: [
        'Points en demi-terrain croisé côté avantage : J1 en coup droit inside-out, J2 en revers.',
        'J2 vise une marque à un pas de la marque centrale adverse (rend l’exercice réaliste).',
        'Il se replace sur sa ligne après chaque frappe.',
        '2 minutes, puis on inverse les rôles.'
      ],
      score: 'Point classique.',
      tip: 'Le coup droit inside-out construit : il cherche la balle courte à attaquer.',
      keys: [
        'Contourner son revers tôt, avec des appuis rapides.',
        'Passer haut et pénétrer vers le fond.',
        'Chercher la balle courte suivante.'
      ],
      variants: ['Si J1 est dans le court, il peut changer de direction à 90° vers le côté égalité : le point se joue alors sur tout le terrain.', 'Faute filet ou largeur = 2 points.'],
      coups: ['coup-droit', 'revers'], axes: ['inside-outside', 'attaque', 'tactique'],
      equipment: BRL, players: [2, 4], space: 'demi', duration: [6, 8, 12], intensity: 3,
      diagram: {
        zones: [['L.top', 'soft'], ['R.bot', 'soft']],
        players: [[L, 2.9, 1, 'J1'], [R, 7.8, 2, 'J2']],
        shots: [
          { p: [[23.6, 7.8], [0.6, 3.1]], tone: 'deep' },
          { p: [[0.2, 2.8], [22.8, 7.6]] }
        ],
        labels: [[3.4, 4.6, 'INSIDE-OUT', 'tag']]
      }
    },
    {
      id: 'pt-m6', theme: 'mixte', source: SRC,
      title: 'Croisés puis inside libre', original: 'Crosscourts With Inside Groundstroke Change of Direction',
      objective: 'Créer puis exploiter les balles inside à partir du jeu croisé.',
      steps: [
        'Le point démarre en croisé (côté égalité ou avantage), avec replacement sur la ligne.',
        'Dès qu’un joueur reçoit une balle inside, il peut changer de direction.',
        'À partir de là, le point se joue sur tout le terrain.'
      ],
      score: 'Point classique (3-4 min).',
      tip: 'C’est l’outside qui crée l’inside : des croisés lourds et profonds provoquent les balles inside.',
      keys: [
        'Sur l’inside : avancer dans le court et prendre la balle tôt.',
        'Changer de direction vers le côté ouvert.',
        'Croisés pénétrants pour provoquer l’inside.'
      ],
      variants: ['Faute de changement de direction = 2 points.', 'Mise en jeu au lieu du service.'],
      coups: ['coup-droit', 'revers'], axes: ['inside-outside', 'attaque'],
      equipment: BRL, players: [2, 4], space: 'complet', duration: [8, 10, 12], intensity: 3,
      diagram: insideOutsideDiagram()
    },
    {
      id: 'pt-m7', theme: 'mixte', source: SRC,
      title: 'Croisés puis 90°', original: 'Crosscourts With 90-Degree Change of Direction',
      objective: 'Repérer les balles outside courtes et changer de direction à 90° pour presser.',
      steps: [
        'Le point démarre en croisé, avec replacement sur la ligne.',
        'Sur une balle outside courte, avec les appuis dans le court, on peut changer de direction à 90°.',
        'À partir de là, le point se joue sur tout le terrain.'
      ],
      score: 'Point classique (3-4 min).',
      tip: '90° : la balle traverse la ligne de fond adverse à la même distance de la ligne de côté que le point d’impact. On vise la profondeur, pas la ligne.',
      keys: [
        'Changer de direction seulement sur ou dans la ligne de fond, en équilibre.',
        'Viser droit devant, pas la ligne de côté.',
        'Des croisés appuyés provoquent les balles courtes.'
      ],
      variants: ['Faute de changement de direction = 2 points.', 'Mise en jeu au lieu du service.'],
      coups: ['coup-droit', 'revers'], axes: ['inside-outside', 'attaque', 'profondeur'],
      equipment: BRL, players: [2, 4], space: 'complet', duration: [8, 10, 12], intensity: 3,
      diagram: {
        zones: [['L', 'soft'], ['R', 'soft']],
        players: [[L, 7.8, 1], [3.6, 8.2, 1], [R, 3.2, 2]],
        shots: [
          { p: [[0, 7.8], [23, 3.2]], kind: 'rally' },
          { p: [[23, 3.6], [4.2, 7.9]], tone: 'deep' },
          { p: [[4.3, 8.2], [23.2, 8.2]] }
        ],
        labels: [[9.4, 9.3, '90°', 'tag'], [7.6, 7.0, 'COURTE', 'plainInk']]
      }
    },
    {
      id: 'pt-m8', theme: 'mixte', source: SRC,
      title: 'Décaler le terrain', original: 'Shifting the Court',
      objective: 'Transformer un échange dans l’axe en échange en diagonale.',
      steps: [
        'J1 met en jeu au milieu du terrain.',
        'J2 décale le jeu : en coup droit vers le côté égalité, en revers vers le côté avantage.',
        'Le point se joue ensuite sur cette diagonale, avec replacement sur la ligne.',
        'Chacun met en jeu deux points.'
      ],
      score: 'Point classique (3-4 min).',
      tip: 'Le tennis se joue en diagonale : sortir du tiers central du terrain.',
      keys: [
        'Jouer loin du tiers central.',
        'Choisir sa diagonale selon le coup.',
        'Replacement réaliste après chaque frappe.'
      ],
      variants: ['Une fois le jeu décalé : point libre sur tout le terrain, avec les règles inside / outside.', 'Faute filet ou largeur = 2 points.'],
      coups: ['coup-droit', 'revers'], axes: ['tactique', 'regularite'],
      equipment: BRL, players: [2, 4], space: 'complet', duration: [8, 10, 12], intensity: 2,
      diagram: {
        zones: [[[0, 4.11, W, 6.86], 'grey'], ['L.bot', 'soft']],
        players: [[L, 5.5, 1, 'J1'], [R, 5.5, 2, 'J2']],
        shots: [
          { p: [[0, 5.5], [22.4, 5.5]], tone: 'deep' },
          { p: [[23.4, 5.1], [1.4, 8.4]] }
        ],
        labels: [[N, 4.7, 'TIERS CENTRAL', 'plainInk']]
      }
    },
    {
      id: 'pt-m9', theme: 'mixte', source: SRC,
      title: 'Inside, outside ou 90 ?', original: 'Directionals — Coach-Fed Drill',
      objective: 'Appliquer les règles inside / outside en point réel à partir d’une balle lancée par le coach.',
      steps: [
        'Le coach, dans un couloir aux 3/4 du court, envoie à J1 une balle inside, outside profonde ou outside courte.',
        'J1 annonce « inside », « outside » ou « 90 » et joue la bonne direction.',
        'Le point se joue ensuite sur tout le terrain : on ne change de direction que sur une balle inside ou outside courte.'
      ],
      score: 'Point classique ; partie de 6 min (2 × 3) ou en 11 points.',
      tip: 'Annoncer la balle à voix haute prouve que la règle est comprise.',
      keys: [
        'Outside profonde : on rejoue croisé.',
        'Inside : changement de direction.',
        'Outside courte : 90°.'
      ],
      variants: ['Le coach envoie de n’importe où derrière la ligne de fond.', 'Faute filet ou largeur = 2 points.'],
      coups: ['coup-droit', 'revers'], axes: ['inside-outside', 'tactique'],
      equipment: BR, players: [2, 4], space: 'complet', duration: [8, 12, 15], intensity: 3,
      diagram: {
        zones: [['L', 'soft'], ['R', 'soft']],
        players: [[L, 5.5, 1, 'J1'], [R, 4, 2, 'J2'], [20.6, 10.4, 2, 'C']],
        marks: [['basket', 22.2, 10.4]],
        shots: [
          { p: [[20, 10.2], [1.2, 8.1]], tone: 'deep' },
          { p: [[20, 10.2], [1.6, 3.0]], tone: 'deep' },
          { p: [[20, 10.2], [4.4, 6.8]], tone: 'deep' }
        ],
        labels: [[4.4, 2.0, 'INSIDE ?', 'tag'], [6.6, 5.6, '90 ?', 'bubble'], [4.4, 9.2, 'OUTSIDE ?', 'dark']]
      }
    },
    {
      id: 'pt-m10', theme: 'mixte', source: SRC,
      title: 'Outside / milieu', original: 'Outside/Middle Game',
      objective: 'Créer et frapper des balles inside agressives, en prenant le terrain.',
      steps: [
        'J1 met en jeu au milieu ; J2 joue toutes ses balles au milieu du terrain.',
        'J1 exploite les balles inside en changeant de direction (ou rejoue croisé sur une balle outside).',
        'Le point se joue ensuite librement.',
        'J1 met en jeu 2 minutes, puis on inverse.'
      ],
      score: 'Point classique (2 × 2 min).',
      tip: 'Celui qui frappe l’inside joue sur ou dans la ligne de fond et prend la balle tôt.',
      keys: [
        'Prendre la balle tôt sur l’inside.',
        'Changer de direction vers le côté ouvert.',
        'Côté « milieu » : gros travail de replacement et de lecture.'
      ],
      variants: ['Faute filet ou largeur = 2 points.'],
      coups: ['coup-droit', 'revers'], axes: ['inside-outside', 'attaque', 'deplacement'],
      equipment: BR, players: [2, 4], space: 'complet', duration: [4, 6, 8], intensity: 3,
      diagram: {
        zones: [[[0, 4.11, N, 6.86], 'grey'], ['R', 'soft']],
        players: [[1, 5.5, 1, 'J1'], [R, 5.5, 2, 'J2']],
        shots: [
          { p: [[23.4, 5.5], [2.2, 5.5]], tone: 'deep' },
          { p: [[1.6, 5.2], [22.6, 2.4]] },
          { p: [[1.6, 5.8], [22.6, 8.6]] }
        ],
        labels: [[6.4, 6.4, 'MILIEU', 'plainInk']]
      }
    },
    {
      id: 'pt-m11', theme: 'mixte', source: SRC,
      title: 'Duel d’effets', original: 'Drive vs. Loop / Slice — Spin Drills',
      objective: 'Savoir jouer et contrer chaque effet : frappe appuyée, balle bombée (liftée haute) et slice.',
      steps: [
        'Points en demi-terrain de double. Le joueur qui appuie met toujours en jeu aux 3/4 du court.',
        'Formule 1 : J2 joue bombé, J1 appuie. Formule 2 : J2 joue slicé, J1 appuie.',
        'Formule 3 : slice contre slice. Formule 4 : bombé contre bombé (carrés de service dehors).',
        '2 minutes par rôle, puis on inverse.'
      ],
      score: 'Point classique.',
      tip: 'Le meilleur contre d’une balle bombée ou d’un slice bas : rendre le même effet jusqu’à obtenir une balle à attaquer.',
      keys: [
        'Balle bombée : rebond à hauteur d’épaule ou plus, profond.',
        'Slice : rebond sous le genou, oblige à remonter la balle.',
        'Frappe appuyée : lift normal, pas une balle de finition.'
      ],
      variants: ['Effets au hasard : jamais deux fois de suite le même effet.', 'Attaquer une balle courte en approche et finir le point.'],
      coups: ['coup-droit', 'revers'], axes: ['tactique', 'regularite', 'profondeur'],
      equipment: BR, players: [2, 4], space: 'demi', duration: [6, 8, 12], intensity: 2,
      diagram: {
        zones: [TOP],
        players: [[L, 3, 1, 'J1'], [R, 3, 2, 'J2']],
        shots: [
          { p: [[0, 2.8], [22.8, 2.8]] },
          { p: [[23.4, 3.4], [1.6, 3.6]], arc: -2.8, tone: 'deep' }
        ],
        labels: [[5.4, 4.9, 'APPUYÉE', 'plainInk'], [18.6, 1.0, 'BOMBÉE / SLICE', 'plainStrong']]
      }
    },
    {
      id: 'pt-m12', theme: 'mixte', source: SRC,
      title: 'Offensif contre défensif', original: 'Offense/Defense',
      objective: 'Presser un défenseur… et apprendre à neutraliser un attaquant.',
      steps: [
        'Demi-terrain de double. L’attaquant met toujours en jeu.',
        'Le défenseur ne joue que des balles bombées ou des slices ; l’attaquant frappe aussi fort qu’il le veut.',
        'Si l’attaquant monte, le défenseur peut lober ou tenter le passing.',
        'On inverse les rôles après 2 ou 3 minutes.'
      ],
      score: 'Point classique.',
      tip: 'Peu d’espace pour les coups gagnants : l’attaquant révèle sa vraie capacité à presser.',
      keys: [
        'Attaquant : jouer au sommet de son registre.',
        'Défenseur : hauteur, profondeur, effet pour casser le rythme.',
        'Neutraliser avant de contre-attaquer.'
      ],
      variants: ['Lobs interdits.', 'Le défenseur peut attaquer sur une balle courte.'],
      coups: ['coup-droit', 'revers', 'lob'], axes: ['attaque', 'defense', 'pression'],
      equipment: BR, players: [2, 4], space: 'demi', duration: [8, 10, 12], intensity: 3,
      diagram: {
        zones: [TOP],
        players: [[1.2, 3, 1, 'A'], [R, 2.8, 2, 'D']],
        shots: [
          { p: [[1.8, 3], [22.8, 2.2]] },
          { p: [[23.4, 3.2], [2.2, 3.8]], arc: -3, tone: 'deep' }
        ],
        labels: []
      }
    },
    {
      id: 'pt-m13', theme: 'mixte', source: SRC,
      title: 'Volées réflexes', original: 'Pinch Volleys',
      objective: 'Développer des mains rapides : volées contre frappes de fond jouées dans le court.',
      steps: [
        'Demi-terrain de simple. J1 démarre sur la ligne de service, J2 sur ou dans la ligne de fond.',
        'J1 met en jeu ; J2 frappe sur lui, J1 volleye puis avance.',
        'J2 joue le point sans reculer derrière sa ligne de fond. Pas de lob.',
        '2 minutes chacun au filet.'
      ],
      score: 'Seul le volleyeur marque. Le joueur de fond perd le point s’il recule derrière sa ligne.',
      tip: 'Aucun espace ouvert : c’est un duel de contrôle. Qui craque en premier ?',
      keys: [
        'Mains rapides, tamis devant soi.',
        'Fond de court : rester dans le court, prendre la balle tôt.',
        'Volleyeur : avancer après chaque volée.'
      ],
      variants: ['Lob autorisé après deux volées.', 'Le joueur de fond vise les pieds du volleyeur (demi-volées).'],
      coups: ['volee', 'coup-droit', 'revers'], axes: ['reaction', 'filet', 'pression'],
      equipment: BR, players: [2, 4], space: 'demi', duration: [4, 6, 8], intensity: 3,
      diagram: {
        zones: [[[0, T, W, M], 'soft']],
        lines: [{ p: [[W, T], [W, M]], color: 'strong', w: 3.4 }],
        players: [[SL, 3.4, 1, 'J1'], [23.1, 3.4, 2, 'J2']],
        shots: [
          { p: [[6.1, 3.4], [22.5, 3.4]], kind: 'rally' },
          { p: [[6.2, 2.2], [9.4, 2.2]], kind: 'move' }
        ],
        labels: [[18, 7.6, 'SUR OU DANS LA LIGNE', 'plainStrong']]
      }
    },
    {
      id: 'pt-m14', theme: 'mixte', source: SRC,
      title: 'Montée et volées', original: 'One-Player / Three-Quarter-Court Closing Volleys',
      objective: 'Enchaîner approche, première volée profonde et volée de conclusion.',
      steps: [
        'Demi-terrain de double, les deux joueurs en fond de court.',
        'J2 met en jeu court, vers la ligne de service ; J1 approche en jouant sur lui.',
        'J2 fait jouer une volée (ou une demi-volée) à J1, puis le point est libre.',
        'Chacun met en jeu deux points, puis on inverse.'
      ],
      score: 'Point classique (3-4 min).',
      tip: 'Une première volée contrôlée et profonde pour se placer avant la volée gagnante.',
      keys: [
        'Approche : préparation à hauteur d’épaule, frappe vers le bas et à travers la balle.',
        'Première volée profonde.',
        'Conclure en une ou deux frappes.'
      ],
      variants: ['Version 3/4 de court : mise en jeu bombée, J1 volleye depuis les 3/4 du court.', 'Approche en slice ; lobs autorisés ou non.'],
      coups: ['volee', 'coup-droit', 'revers', 'smash'], axes: ['filet', 'attaque'],
      equipment: BR, players: [2, 4], space: 'demi', duration: [6, 8, 12], intensity: 3,
      diagram: {
        zones: [TOP],
        players: [[3.2, 3, 1, 'J1'], [8.8, 3, 1, 'J1'], [R, 3, 2, 'J2']],
        shots: [
          { p: [[24.4, 3.2], [4, 3.4]], tone: 'deep' },
          { p: [[3.8, 3], [22.4, 3.6]] },
          { p: [[3.8, 1.8], [8.2, 1.8]], kind: 'move' }
        ],
        labels: [[6, 4.6, 'APPROCHE → VOLÉE', 'plainStrong']]
      }
    },
    {
      id: 'pt-m15', theme: 'mixte', source: SRC,
      title: 'Duel de volées', original: 'Two-Player Closing Volleys',
      objective: 'Gagner les échanges rapides de volées quand les deux joueurs montent.',
      steps: [
        'Demi-terrain de double, les deux joueurs en fond de court.',
        'J1 met en jeu vers la ligne de service et monte ; J2 approche en jouant sur J1 (pas de passing sur la mise en jeu).',
        'Échange de volées en avançant, puis le point est libre.'
      ],
      score: 'Point classique (3-4 min).',
      tip: 'Garder ses volées basses : celui qui remonte une volée est en danger.',
      keys: [
        'Volées basses, dans les pieds.',
        'Avancer à chaque volée.',
        'Tamis stable devant soi.'
      ],
      variants: ['Première volée obligatoirement devant le joueur qui monte.', 'Approche en slice ; lobs autorisés ou non.'],
      coups: ['volee'], axes: ['filet', 'reaction'],
      equipment: BR, players: [2, 4], space: 'demi', duration: [6, 8, 10], intensity: 3,
      diagram: {
        zones: [TOP],
        players: [[5.2, 3, 1, 'J1'], [18.6, 3, 2, 'J2']],
        shots: [
          { p: [[5.8, 3], [18, 3]], kind: 'rally' },
          { p: [[5.2, 1.8], [8.6, 1.8]], kind: 'move' },
          { p: [[18.6, 1.8], [15.2, 1.8]], kind: 'move' }
        ]
      }
    },
    {
      id: 'pt-m16', theme: 'mixte', source: SRC,
      title: 'Jeu du smash', original: 'Overhead Game',
      objective: 'Dominer la zone de pression et finir le point en l’air… ou défendre contre le smash.',
      steps: [
        'Demi-terrain de double. J1 sur la ligne de service, J2 en fond de court.',
        'J1 met en jeu, J2 joue sur lui, J1 volleye puis avance ; J2 lobe.',
        'Le point ne commence vraiment qu’au premier smash, puis il se joue librement.',
        'Chacun met en jeu trois points ; partie en 7 ou 11.'
      ],
      score: 'Seul le smasheur marque (comme au volley-ball).',
      tip: 'Le défenseur exploite l’espace derrière l’attaquant (lob) pour ouvrir l’espace devant lui (balle dans les pieds).',
      keys: [
        'Après le smash, avancer pour finir près du filet.',
        'Défense : lob ou frappe liftée dans les pieds.',
        'Rester agressif sans se précipiter.'
      ],
      variants: ['Le joueur de fond marque s’il finit au filet sur un smash gagnant.', 'Demi-volée dans les pieds sur la mise en jeu.'],
      coups: ['smash', 'lob', 'volee'], axes: ['filet', 'attaque', 'defense'],
      equipment: BR, players: [2, 4], space: 'demi', duration: [10, 12, 15], intensity: 3,
      diagram: {
        zones: [TOP],
        players: [[SL, 3, 1, 'J1'], [R, 3, 2, 'J2']],
        shots: [
          { p: [[24.4, 3.2], [6.4, 2.6]], arc: -3.4, tone: 'deep' },
          { p: [[6.6, 3.2], [21.6, 4.4]] }
        ],
        labels: [[N, 8.4, 'LE POINT DÉMARRE AU SMASH', 'tag']]
      }
    },
    {
      id: 'pt-m17', theme: 'mixte', source: SRC,
      title: 'Jeu d’amortis', original: 'Drop-Shot Game',
      objective: 'Presser en déplaçant l’adversaire : l’amorti comme arme.',
      steps: [
        'Demi-terrain de double, les deux joueurs en fond de court.',
        'J1 met en jeu ; J2 frappe un lift vers la ligne de service ; J1 avance et amortit.',
        'J2 démarre après (pas avant) l’amorti ; J1 lobe ou passe ensuite.',
        'Point libre ; le joueur amorti peut contre-amortir, les lobs sont permis.'
      ],
      score: 'Point classique (3-4 min).',
      tip: 'Presser, ce n’est pas seulement frapper fort : faire jouer l’adversaire dans une zone inconfortable, c’est aussi de la pression.',
      keys: [
        'Prendre position dans le court avant d’amortir.',
        'Même préparation que le slice pour masquer l’amorti.',
        'Enchaîner tout de suite lob ou passing.'
      ],
      variants: ['Lobs interdits.', 'Au choix sur la mise en jeu : amorti ou approche au filet.'],
      coups: ['amorti', 'lob'], axes: ['toucher', 'tactique', 'pression'],
      equipment: BR, players: [2, 4], space: 'demi', duration: [6, 8, 12], intensity: 3,
      diagram: {
        zones: [TOP],
        players: [[4.2, 3, 1, 'J1'], [R, 3, 2, 'J2']],
        shots: [
          { p: [[24.4, 3], [5, 3]], tone: 'deep' },
          { p: [[4.8, 3.2], [13, 2.6]], arc: -1 },
          { p: [[24.2, 4.4], [14.6, 4.4]], kind: 'move' }
        ]
      }
    },
    {
      id: 'pt-m18', theme: 'mixte', source: SRC,
      title: 'Défendre l’inside', original: 'Inside Groundstroke / Volley Recovery Game',
      objective: 'Attaquer sur une balle inside… et apprendre à neutraliser cette attaque.',
      steps: [
        '2 équipes de 2 : une équipe attaque, l’autre défend. Les joueurs alternent les points.',
        'Le défenseur démarre hors du couloir et part au moment de l’envoi.',
        'Le coach envoie à l’attaquant une balle inside aux 3/4 du court : il la prend sur ou dans la ligne et change de direction.',
        'Le défenseur court et tente de rejouer croisé, derrière l’attaquant. Point libre.'
      ],
      score: 'Seule l’équipe qui attaque marque. 2 × 3 min, puis on inverse.',
      tip: 'La balle inside est souvent la première occasion de prendre le point : la jouer tôt et profond.',
      keys: [
        'Attaquant : avancer et prendre la balle en montée.',
        'Changer de direction, balle qui pénètre vers le fond.',
        'Défenseur : rejouer croisé, derrière l’attaquant.'
      ],
      variants: ['Version volée : balle inside à volleyer entre les 3/4 et la ligne de service.', 'Version courte : inside depuis le milieu du court puis montée au filet (défense en lob conseillée).'],
      coups: ['coup-droit', 'revers', 'volee'], axes: ['inside-outside', 'attaque', 'defense'],
      equipment: BR, players: [3, 4], space: 'complet', duration: [10, 12, 15], intensity: 3,
      diagram: {
        zones: [['L', 'soft'], ['R', 'soft']],
        players: [[1.4, 3, 1, 'A'], [19.6, -1.2, 2, 'D'], [25.4, 2.4, 2, 'C']],
        marks: [['basket', 25.4, 4.0]],
        shots: [
          { p: [[24.8, 2.6], [2, 2.9]], tone: 'deep' },
          { p: [[2, 3.2], [22.2, 8.3]] },
          { p: [[19.8, -0.4], [21.8, 7.4]], kind: 'move' }
        ],
        labels: [[4.8, 4.4, 'INSIDE = CHANGE', 'tag']]
      }
    },
    {
      id: 'pt-m19', theme: 'mixte', source: SRC,
      title: 'Défendre l’approche à 90°', original: 'Short Outside Approach Shot Recovery Game',
      objective: 'Attaquer une balle outside courte à 90°… et contrer en passing.',
      steps: [
        '2 équipes de 2 : une attaque, l’autre défend ; le défenseur démarre hors du couloir.',
        'Le coach envoie une balle outside courte : l’attaquant approche à 90° (droit vers le fond) et monte au filet.',
        'Le défenseur passe, idéalement sans changer de direction (long de ligne), ou lobe. Point libre.'
      ],
      score: 'Seule l’équipe qui attaque marque. 2 × 3 min, puis on inverse.',
      tip: 'L’approche à 90° est l’attaque préférée de la plupart des joueurs : elle doit pénétrer la ligne de fond.',
      keys: [
        'Approche à 90°, profonde.',
        'Monter derrière sa balle et couvrir le long de ligne.',
        'Défenseur : passing sans changer de direction.'
      ],
      variants: ['Envoi côté avantage pour travailler l’approche en revers.'],
      coups: ['coup-droit', 'revers', 'volee', 'lob'], axes: ['inside-outside', 'attaque', 'defense', 'filet'],
      equipment: BR, players: [3, 4], space: 'complet', duration: [10, 12, 15], intensity: 3,
      diagram: {
        zones: [['L', 'soft'], ['R', 'soft']],
        players: [[4, 8.2, 1, 'A'], [9.6, 7.4, 1, 'A'], [20.6, -1.2, 2, 'D'], [25.4, 2.6, 2, 'C']],
        marks: [['basket', 25.4, 4.2]],
        shots: [
          { p: [[24.8, 2.8], [4.5, 7.9]], tone: 'deep' },
          { p: [[4.6, 8.2], [23.2, 8.2]] },
          { p: [[5, 9.2], [9, 8.2]], kind: 'move' },
          { p: [[20.8, -0.4], [23.4, 7.2]], kind: 'move' }
        ],
        labels: [[14.6, 9.3, '90°', 'tag']]
      }
    },

    /* ==================================================================
       SITUATIONS OUVERTES — jeux de pression
       ================================================================== */
    {
      id: 'pt-o1', theme: 'ouvert', source: SRC,
      title: 'Deux premières balles', original: 'First-Serve Game',
      objective: 'Presser avec la première balle et apprendre à retourner les services appuyés.',
      steps: [
        'Chaque serveur a droit à deux premières balles, puis une seconde.',
        'Chacun sert deux points (égalité puis avantage), à tour de rôle.',
        'Le point se joue entièrement.'
      ],
      score: 'Point classique ; parties de 3 à 5 minutes.',
      tip: 'Au retour d’une grosse première balle : jouer au milieu pour fermer le court et lancer le point.',
      keys: [
        'Placement de la première balle aussi important que la vitesse.',
        'Servir large ou au T pour ouvrir le court.',
        'Retour selon les règles inside / outside.'
      ],
      variants: ['Le relanceur marque 2 points sur les points de seconde balle.', 'Montée au filet autorisée sur retour de seconde.'],
      coups: ['service', 'retour'], axes: ['pression', 'attaque'],
      equipment: BR, players: [2, 4], space: 'complet', duration: [8, 10, 15], intensity: 2,
      diagram: {
        zones: [['R.box.top', 'soft']],
        players: [[L, 6.4, 1, 'S'], [R, 2.6, 2, 'R']],
        shots: [
          { p: [[-0.4, 6.2], [17.4, 1.8]] },
          { p: [[-0.4, 6.2], [17.2, 5.0]] }
        ],
        labels: [[4.2, 8.8, '2 PREMIÈRES BALLES', 'tag']]
      }
    },
    {
      id: 'pt-o2', theme: 'ouvert', source: SRC,
      title: 'Je frappe en premier', original: 'First-Strike Game',
      objective: 'Faire de la première balle une arme.',
      steps: [
        'Uniquement des premières balles.',
        'Le serveur marque s’il frappe en premier : ace, service gagnant, faute forcée au retour, retour court conclu ou service-volée gagnant.',
        'Il sert côté égalité jusqu’à frapper en premier, puis côté avantage, et ainsi de suite.',
        '3 minutes chacun au service.'
      ],
      score: '1 point chaque fois que le serveur frappe en premier. Le plus de points en 3 minutes gagne.',
      tip: 'Attitude du serveur : « Je frappe en premier ! »',
      keys: [
        'Placement autant que vitesse.',
        'Servir large ou au T pour ouvrir le court.',
        'Enchaîner tout de suite sur la balle suivante.'
      ],
      variants: ['Imposer la zone de première balle.', 'Le relanceur applique les règles inside / outside.'],
      coups: ['service', 'retour', 'coup-droit'], axes: ['attaque', 'pression'],
      equipment: BR, players: [2, 4], space: 'complet', duration: [6, 8, 10], intensity: 2,
      diagram: {
        zones: [['L', 'soft'], ['R', 'soft']],
        players: [[L, 6.4, 1, 'S'], [5.8, 6.8, 1, 'S'], [24.4, -0.2, 2, 'R']],
        shots: [
          { p: [[-0.4, 6.2], [17.6, 1.8]] },
          { p: [[24, 0.4], [7.6, 4.6]], tone: 'deep' },
          { p: [[0.2, 7.2], [5, 7.2]], kind: 'move' },
          { p: [[6.4, 6.6], [22.8, 8.6]] }
        ],
        labels: [[3, 9.2, 'JE FRAPPE EN 1ER !', 'bubble']]
      }
    },
    {
      id: 'pt-o3', theme: 'ouvert', source: SRC,
      title: 'Service et retour qui pressent', original: 'Pressuring Serve/Return Game',
      objective: 'Créer un état d’esprit offensif au service et au retour de seconde balle.',
      steps: [
        'Deux balles de service. Le serveur presse avec sa première, le relanceur presse sur la seconde.',
        'Chacun sert deux points (égalité puis avantage), à tour de rôle.',
        'Le point se joue entièrement.'
      ],
      score: '2 points si le point est gagné grâce à un service ou un retour de seconde qui a mis la pression, 1 point sinon. Parties de 3 à 5 min.',
      tip: 'Se poser la question : est-ce mon service, ou mon retour, qui a décidé du point ?',
      keys: [
        'Attitude : « Je crée une occasion d’attaquer. »',
        'Retour de seconde agressif, idéalement en coup droit.',
        'Prendre conscience de la façon dont le point se construit.'
      ],
      variants: ['Montée au filet autorisée sur retour de seconde.', 'Retours de seconde uniquement en coup droit.'],
      coups: ['service', 'retour'], axes: ['attaque', 'pression', 'tactique'],
      equipment: BR, players: [2, 4], space: 'complet', duration: [8, 10, 15], intensity: 3,
      diagram: {
        zones: [['L', 'soft'], ['R', 'soft']],
        players: [[L, 6.4, 1, 'S'], [22.4, 2.6, 2, 'R']],
        shots: [
          { p: [[-0.4, 6.2], [16.8, 3]] },
          { p: [[22, 2.7], [1.4, 8.6]], tone: 'deep' }
        ],
        labels: [[N, 9.3, 'PRESSION = POINT × 2', 'tag']]
      }
    },
    {
      id: 'pt-o4', theme: 'ouvert', source: SRC,
      title: 'Règles inside / outside', original: 'Directionals — Inside Groundstroke Change of Direction',
      objective: 'Jouer des points entiers avec les deux premières règles : outside = croisé, inside = changement de direction.',
      steps: [
        'Points sur tout le terrain, une seule balle de service ; chacun sert deux points.',
        'Au retour : croisé sur un service outside, changement de direction sur un service inside.',
        'Pendant le point, on ne change de direction que sur une balle inside.',
        'Après une frappe outside, toucher sa ligne de replacement.'
      ],
      score: 'Point classique ; parties de 5 min.',
      tip: 'Jouer volontairement au milieu pour offrir une balle inside… et anticiper le changement de direction adverse.',
      keys: [
        'Outside (la balle croise devant le corps) : croisé.',
        'Inside (la balle arrive dans le corps) : changement de direction.',
        'Anticiper : l’adversaire suit les mêmes règles.'
      ],
      variants: ['Annoncer « inside » à chaque changement de direction.', 'Première et seconde balle ; faute filet ou largeur = 2 points.'],
      coups: ['coup-droit', 'revers', 'retour'], axes: ['inside-outside', 'tactique'],
      equipment: BRL, players: [2, 4], space: 'complet', duration: [8, 10, 15], intensity: 3,
      diagram: insideOutsideDiagram()
    },
    {
      id: 'pt-o5', theme: 'ouvert', source: SRC,
      title: 'Règles inside / outside + 90°', original: 'Directionals — Inside and 90-Degree Change of Direction',
      objective: 'Ajouter la troisième règle : changer de direction à 90° sur une balle outside courte.',
      steps: [
        'Points sur tout le terrain, une seule balle de service.',
        'On change de direction uniquement sur une balle inside, ou sur une balle outside courte quand les deux pieds sont dans le court.',
        'Au retour, changement de direction seulement sur un service inside.',
        'Après une frappe outside, toucher sa ligne de replacement.'
      ],
      score: 'Point classique ; parties de 5 min.',
      tip: 'Points longs et prévisibles au début, puis le jeu prend une vraie structure.',
      keys: [
        'Outside profonde : croisé.',
        'Outside courte, pieds dans le court : 90°.',
        'Inside : changement de direction.'
      ],
      variants: ['Faute sur un 90° = 2 points.', 'Première et seconde balle.'],
      coups: ['coup-droit', 'revers'], axes: ['inside-outside', 'tactique', 'attaque'],
      equipment: BRL, players: [2, 4], space: 'complet', duration: [8, 10, 15], intensity: 3,
      diagram: {
        zones: [['L', 'soft'], ['R', 'soft']],
        players: [[3.6, 8.2, 1], [0.1, 2.8, 1], [R, 3.2, 2]],
        shots: [
          { p: [[23, 3.6], [4.2, 7.9]], tone: 'deep' },
          { p: [[4.3, 8.2], [23.2, 8.2]] },
          { p: [[23, 2.7], [0.8, 2.7]], tone: 'deep' },
          { p: [[0.8, 2.9], [22.4, 7.4]] }
        ],
        labels: [[9.4, 9.3, '90°', 'tag'], [4.6, 4.3, 'INSIDE', 'tag']]
      }
    },
    {
      id: 'pt-o6', theme: 'ouvert', source: SRC,
      title: 'Coup droit arme', original: 'Directionals — Inside-Out Forehands / Forehands Are Wild',
      objective: 'Jouer avec son coup droit comme arme, tout en restant structuré en revers.',
      steps: [
        'Points sur tout le terrain, une seule balle de service.',
        'Coup droit inside-out autorisé (y compris au retour côté avantage) ; sinon, changement de direction seulement sur une balle inside.',
        'Le coup droit inside-out construit jusqu’à obtenir un coup droit inside court à attaquer.'
      ],
      score: 'Point classique ; parties de 5 min.',
      tip: 'Contourner son revers crée beaucoup plus de balles inside à exploiter.',
      keys: [
        'Coup droit inside-out sur balle profonde : il construit.',
        'Coup droit inside à 90° sur balle courte : il attaque.',
        'En revers, on respecte les règles inside / outside.'
      ],
      variants: ['« Coups droits libres » : coup droit sans aucune contrainte, revers selon les règles inside / outside.', 'Changement de direction à 90° autorisé.'],
      coups: ['coup-droit', 'revers'], axes: ['inside-outside', 'attaque', 'tactique'],
      equipment: BR, players: [2, 4], space: 'complet', duration: [8, 10, 15], intensity: 3,
      diagram: {
        zones: [['L', 'soft'], ['R', 'soft']],
        players: [[L, 2.6, 1], [3.6, 3.4, 1], [R, 7.8, 2]],
        shots: [
          { p: [[23.6, 7.8], [0.6, 2.9]], tone: 'deep' },
          { p: [[0.2, 2.6], [22.8, 7.6]] },
          { p: [[4.2, 3.4], [23.2, 3.4]] }
        ],
        labels: [[3.4, 5.2, 'INSIDE-OUT', 'tag'], [13.6, 2.4, 'PUIS 90°', 'plainStrong']]
      }
    },
    {
      id: 'pt-o7', theme: 'ouvert', source: SRC,
      title: 'Je change, je monte', original: 'Directionals — Pressuring When Changing Direction',
      objective: 'Associer chaque changement de direction à une montée au filet.',
      steps: [
        'Points selon les règles inside / outside, une seule balle de service.',
        'Dès qu’un joueur change de direction (balle inside ou outside courte), il doit monter au filet.',
        'Au retour, changement de direction seulement sur un service inside.'
      ],
      score: 'Point classique ; parties de 5 min.',
      tip: 'Changer de direction depuis la ligne de fond ou dans le court permet d’arriver bien placé pour la première volée.',
      keys: [
        'Changement de direction = approche.',
        'Être sur ou dans la ligne de fond au moment de changer de direction.',
        'Monter vite derrière sa balle.'
      ],
      variants: ['Faute filet ou largeur = 2 points.', 'Faute sur un 90° = 2 points.'],
      coups: ['coup-droit', 'revers', 'volee'], axes: ['inside-outside', 'attaque', 'filet'],
      equipment: BR, players: [2, 4], space: 'complet', duration: [8, 10, 15], intensity: 3,
      diagram: {
        zones: [['L', 'soft'], ['R', 'soft']],
        players: [[2.6, 2.8, 1], [9.2, 6.4, 1], [R, 2.8, 2]],
        shots: [
          { p: [[23, 2.6], [3.2, 2.8]], tone: 'deep' },
          { p: [[3.2, 3], [22.6, 8.2]] },
          { p: [[3.4, 3.9], [8.6, 6]], kind: 'move' }
        ],
        labels: [[5.4, 8.8, 'JE CHANGE = JE MONTE', 'tag']]
      }
    },
    {
      id: 'pt-o8', theme: 'ouvert', source: SRC,
      title: 'Points Wimbledon', original: 'Wimbledon Points / Wimbledon Directionals',
      objective: 'Développer une mentalité offensive en jouant sur ou dans la ligne de fond.',
      steps: [
        'Les deux joueurs jouent sur ou dans la ligne de fond.',
        'Toute balle qui tombe dans le carré de service (mise en jeu comprise) oblige à monter au filet.',
        'Mise en jeu au-delà de la ligne de service, puis point libre. Chacun met en jeu deux points.'
      ],
      score: 'Point classique (3-4 min). Reculer derrière sa ligne de fond = point perdu.',
      tip: 'L’état d’esprit : « Je veux avancer. »',
      keys: [
        'Garder sa position sur ou dans la ligne de fond.',
        'Profiter de chaque balle courte pour monter.',
        'Fermer le filet après l’approche.'
      ],
      variants: ['Version inside / outside : sur tout le terrain avec service ; seul le relanceur doit rester dans le court et appliquer les règles inside / outside.', 'Approche en slice obligatoire ; lobs autorisés ou non.'],
      coups: ['coup-droit', 'revers', 'volee'], axes: ['attaque', 'filet', 'pression'],
      equipment: BR, players: [2, 4], space: 'complet', duration: [6, 8, 12], intensity: 3,
      diagram: {
        zones: [['L.boxes', 'soft'], ['R.boxes', 'soft']],
        lines: [{ p: [[0, 0], [0, H]], color: 'strong', w: 4 }, { p: [[W, 0], [W, H]], color: 'strong', w: 4 }],
        players: [[0.6, 5.5, 1], [23.1, 5.5, 2]],
        shots: [
          { p: [[22.6, 5.5], [8.4, 7.2]], tone: 'deep' },
          { p: [[1.2, 6.4], [7.4, 7.4]], kind: 'move' }
        ],
        labels: [[8.6, 3.4, 'CARRÉ = MONTÉE', 'tag']]
      }
    },
    {
      id: 'pt-o9', theme: 'ouvert', source: SRC,
      title: 'Tennis à deux points', original: 'Two-Point Tennis',
      objective: 'Réduire les fautes directes dans le filet et en largeur.',
      steps: [
        'Set normal.',
        'Toute faute directe dans le filet ou en largeur, et toute double faute, compte double.'
      ],
      score: 'Exemple : J1 met dans le filet au premier point → 30-0 pour J2.',
      tip: 'Les joueurs détestent au début… puis jouent leur jeu sans faute de filet ni de largeur.',
      keys: [
        'Marge au-dessus du filet.',
        'Marge par rapport aux lignes de côté.',
        'Choisir ses changements de direction : première source de fautes de largeur.'
      ],
      variants: ['Une seule balle de service : service manqué = 2 points.', 'Retour de seconde manqué = 2 points.'],
      coups: ['coup-droit', 'revers', 'service'], axes: ['regularite', 'pression'],
      equipment: BR, players: [2, 4], space: 'complet', duration: [15, 20, 40], intensity: 3,
      diagram: {
        zones: [['L', 'soft'], ['R', 'soft']],
        lines: [{ p: [[0, T], [W, T]], color: 'strong', w: 3.4 }, { p: [[0, B], [W, B]], color: 'strong', w: 3.4 }],
        players: [[L, 5.5, 1, 'J1'], [R, 5.5, 2, 'J2']],
        labels: [[N, 5.5, 'FILET × 2', 'dark'], [5.6, 0.68, 'LARGEUR × 2', 'tag'], [18.2, 10.3, 'LARGEUR × 2', 'tag']]
      }
    },
    {
      id: 'pt-o10', theme: 'ouvert', source: SRC,
      title: 'Tie-breaks à variantes', original: 'Tiebreaker Tournament',
      objective: 'Jouer des tie-breaks à thème pour ancrer un objectif dans un vrai contexte de match.',
      steps: [
        'Tie-breaks en 7 ou en 11.',
        'Quand un terrain termine, tous les terrains s’arrêtent (à égalité : point décisif).',
        'Choisir une variante ; le vainqueur choisit celle du tie-break suivant.'
      ],
      score: 'Décompte tie-break classique.',
      tip: 'La fin est toujours proche : intensité et concentration maximales.',
      keys: [
        'Chaque point compte.',
        'Garder son plan de jeu sous pression.',
        'Enchaîner vite d’un tie-break à l’autre.'
      ],
      variants: [
        'Faute filet ou largeur = 2 points.',
        'Une seule balle de service.',
        'Service-volée obligatoire en première ; montée obligatoire sur retour de seconde.',
        'Règles inside / outside obligatoires.',
        'Point gagné grâce au service ou au retour de seconde = 2 points.',
        'Tie-break Wimbledon : sur ou dans la ligne de fond, montée sur toute balle dans le carré.'
      ],
      coups: [], axes: ['pression', 'tactique'],
      equipment: BR, players: [2, 8], space: 'complet', duration: [10, 15, 20], intensity: 3,
      diagram: {
        score: '6 – 6',
        zones: [['L', 'soft'], ['R', 'soft']],
        players: [[L, 5.5, 1], [R, 5.5, 2]],
        labels: [[N, 5.5, 'TIE-BREAK', 'dark']]
      }
    },
    {
      id: 'pt-o11', theme: 'ouvert', source: SRC,
      title: 'Sets sans avantage', original: 'No-Ad Sets',
      objective: 'Multiplier les points décisifs (3-3) dans un format court.',
      steps: [
        'Jeux sans avantage : 4 points gagnants.',
        'À 3-3, point décisif : le relanceur choisit le côté où il retourne.',
        'Set en 6 jeux, tie-break à 6-6.'
      ],
      score: 'Décompte sans avantage (no-ad).',
      tip: 'Sur le point décisif, jouer son schéma préféré : c’est maintenant qu’il doit être automatique.',
      keys: [
        'Aborder chaque point décisif comme une balle de match.',
        'Le relanceur choisit son meilleur côté.',
        'Routine entre les points.'
      ],
      variants: ['Set court en 4 jeux, tie-break à 4-4.', 'Faute filet ou largeur = 2 points.'],
      coups: ['service', 'retour'], axes: ['pression', 'tactique'],
      equipment: BR, players: [2, 4], space: 'complet', duration: [20, 30, 45], intensity: 3,
      diagram: {
        score: '3 – 3',
        zones: [['L', 'soft'], ['R', 'soft']],
        players: [[L, 5.5, 1], [R, 5.5, 2]],
        labels: [[N, 5.5, 'POINT DÉCISIF', 'dark']]
      }
    },
    {
      id: 'pt-o12', theme: 'ouvert', source: SRC,
      title: 'Balle de jeu', original: 'Game-Point Sets',
      objective: 'Apprendre à conclure : ne pas relâcher sur balle de jeu.',
      steps: [
        'Set normal.',
        'Un joueur qui ne gagne pas sa balle de jeu voit son score retomber à zéro.',
        'Exemple : J1 mène 40-15 et perd le point → 0-30 pour J2, le jeu continue.'
      ],
      score: 'Décompte classique avec retour à zéro.',
      tip: 'C’est maintenant ! Saisir le moment, ne pas se relâcher, garder l’élan.',
      keys: [
        'Balle de jeu = point le plus important.',
        'Jouer son meilleur schéma, pas un coup de chance.',
        'Rester agressif, mais avec marge.'
      ],
      variants: ['Règle appliquée uniquement sur les jeux de service.'],
      coups: [], axes: ['pression'],
      equipment: BR, players: [2, 4], space: 'complet', duration: [20, 30, 45], intensity: 3,
      diagram: {
        score: '40 – 15',
        zones: [['L', 'soft'], ['R', 'soft']],
        players: [[L, 5.5, 1, 'J1'], [R, 5.5, 2, 'J2']],
        labels: [[N, 5.5, 'RATÉE = RETOUR À 0', 'dark']]
      }
    },
    {
      id: 'pt-o13', theme: 'ouvert', source: SRC,
      title: 'Les 4 premiers jeux', original: 'First Four Games',
      objective: 'Bien démarrer un match en jouant un tennis à haut pourcentage.',
      steps: [
        'Set normal.',
        'Le coach désigne un joueur qui joue les 4 premiers jeux en appliquant strictement les règles inside / outside, sans que l’adversaire le sache.',
        'Peu de changements à 90° : on oblige l’adversaire à faire la faute.'
      ],
      score: 'Décompte classique.',
      tip: 'Le tennis est un jeu de fautes, à tous les niveaux : mener 3-1 ou 4-0 installe le doute chez l’adversaire.',
      keys: [
        'Haut pourcentage : croisé sur l’outside.',
        'Peu de prise de risque au début.',
        'Faire jouer l’adversaire.'
      ],
      variants: ['Les deux joueurs appliquent les règles inside / outside.'],
      coups: [], axes: ['pression', 'tactique', 'regularite', 'inside-outside'],
      equipment: BR, players: [2, 4], space: 'complet', duration: [20, 30, 45], intensity: 2,
      diagram: {
        score: '4 – 0',
        zones: [['L.bot', 'soft'], ['R.top', 'soft']],
        players: [[L, 7.6, 1], [R, 3.4, 2]],
        shots: [{ p: [[0, 7.6], [23, 3.4]], kind: 'rally' }],
        labels: [[N, 9.4, 'HAUT POURCENTAGE', 'tag']]
      }
    },

    /* ==================================================================
       FOCUS
       ================================================================== */
    {
      id: 'pt-f1', theme: 'focus', source: SRC,
      title: 'Inside / Outside', original: 'The Directionals',
      axes: ['inside-outside', 'tactique'],
      objective: 'Avant chaque frappe, une seule question : je change de direction, ou je renvoie d’où ça vient ?',
      steps: [
        'Outside (la balle croise devant le corps) : je rejoue croisé.',
        'Inside (la balle arrive dans le corps) : je change de direction.',
        'Outside courte, pieds dans le court : 90°.'
      ],
      diagram: insideOutsideDiagram()
    },
    {
      id: 'pt-f2', theme: 'focus', source: SRC,
      title: 'Je frappe en premier', original: 'First Strike',
      axes: ['attaque', 'pression'],
      objective: 'Au service comme au retour de seconde balle : « Je crée l’occasion d’attaquer. »',
      steps: [
        'Première balle : le placement avant la vitesse.',
        'Retour de seconde : montrer son coup droit.'
      ],
      diagram: { picto: 'serve' }
    },
    {
      id: 'pt-f3', theme: 'focus', source: SRC,
      title: 'Construire, presser, conclure', original: 'Tactical Zones',
      axes: ['tactique', 'attaque', 'filet'],
      objective: 'Savoir dans quelle zone je suis, et ce que je dois y faire.',
      steps: [
        'Fond de court : construire avec des frappes agressives et contrôlées.',
        'Milieu de court : presser, sans chercher à finir.',
        'Près du filet : conclure.'
      ],
      diagram: { picto: 'zones' }
    },
    {
      id: 'pt-f4', theme: 'focus', source: SRC,
      title: 'Ni filet, ni largeur', original: 'Two-Point Errors',
      axes: ['regularite', 'pression'],
      objective: 'Les fautes dans le filet et en largeur sont interdites : marge au-dessus du filet, marge sur les côtés.',
      steps: [
        'Une faute longue se corrige ; une faute filet ou largeur est un mauvais choix.',
        'Viser grand : les zones à trois pas des lignes.'
      ],
      diagram: {
        zones: [['L', 'soft'], ['R', 'soft']],
        lines: [{ p: [[0, T], [W, T]], color: 'strong', w: 3.4 }, { p: [[0, B], [W, B]], color: 'strong', w: 3.4 }],
        marks: [['cone', 21.4, 3.8], ['cone', 21.4, 7.2]],
        labels: [[N, 5.5, 'FILET', 'dark'], [5.6, 0.68, 'LARGEUR', 'tag'], [18.2, 10.3, 'LARGEUR', 'tag']]
      }
    }
  );
})();
