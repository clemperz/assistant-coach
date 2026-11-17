/* ==========================================================================
   Assistant Coach — Paquet « Service et retour » (créations Assistant Coach)
   12 éducatifs :
     service, technique      (ac-s01 à ac-s08) : principes du cours de C. Genevois
                             « Biomécanique appliquée au tennis » (force de réaction,
                             chaîne de coordination, rotations du tronc, équilibre,
                             énergie élastique, compromis précision / vitesse, formats adaptés)
     service, placement      (ac-s09) : Ravilly, « Tennis, les fondamentaux tactiques »
     retour                  (ac-s10 à ac-s12) : Ravilly (placement, prise d'attente)
                             et Genevois (allègement, temps adverse)
   Les exercices sont des créations ; les points clés reprennent les sources.
   Le cours de Genevois ne contient pas de chapitre entier sur le service : ces cartes
   s'appuient sur les passages où il sert d'exemple à chaque principe.
   Voir aussi : ac-e08 à ac-e11 (lancer, bras, geste de lancer, retour bloqué), ac-j23 (appuis au retour).
   ========================================================================== */
window.AC = window.AC || {};
AC.CARDS = AC.CARDS || [];

(function () {
  var N = 11.885, SL = 5.485, SR = 18.285, T = 1.37, B = 9.6, M = 5.485, W = 23.77;
  var SRC = 'Assistant Coach';
  var GEN = 'Biomécanique appliquée au tennis (Genevois)';
  var RAV = 'Tennis, les fondamentaux tactiques (Ravilly)';
  var BR = ['balles', 'raquettes'];

  /* Poids de tirage du paquet (voir generator.js) : avec 0,8, ce paquet, le jeu de jambes et les coups de fond
     pèsent chacun environ un cinquième des éducatifs tirés quand aucun objectif ne les demande. */
  var DRAW_WEIGHT = 0.8;

  /* Le serveur (S) sert du côté égalité, à gauche du schéma, vers le carré en diagonale */
  function serveD(label, extra) {
    var d = {
      zones: [['R.box.top', 'soft']],
      players: [[-0.8, 6.4, 1, 'S']],
      shots: [{ p: [[0, 6.2], [16.4, 3.3]] }],
      labels: label ? [[6.4, 9, label, 'bubble']] : []
    };
    if (extra) extra(d);
    return d;
  }

  /* Le relanceur (R) est à gauche du schéma, côté égalité ; le serveur (S) en face */
  function returnD(label, extra) {
    var d = {
      zones: [['L.box.bot', 'soft'], ['R.back', 'soft']],
      players: [[-0.8, 8.2, 1, 'R'], [24.6, 4.4, 2, 'S']],
      shots: [
        { p: [[23.8, 4.5], [7.2, 6.3]], tone: 'deep' },
        { p: [[0.4, 7.7], [21.2, 7.4]] }
      ],
      labels: label ? [[4.6, 2.6, label, 'bubble']] : []
    };
    if (extra) extra(d);
    return d;
  }

  AC.CARDS.push(

    /* =====================================================================
       SERVICE : LA TECHNIQUE
       ===================================================================== */
    {
      id: 'ac-s01', theme: 'educatif', source: SRC, refs: GEN,
      title: 'Pousser le sol', original: 'La rampe de lancement',
      objective: 'Lancer le service par les jambes : pousser le sol vers le bas pour monter vers la balle.',
      steps: [
        'Servir depuis la ligne de fond. D’abord 5 services jambes tendues, pieds au sol.',
        'Puis 5 services en fléchissant chevilles et genoux pendant le lancer, et en poussant vers le haut sans temps d’arrêt.',
        'La poussée fait décoller : retomber dans le court, sur le pied avant.',
        'Comparer la hauteur d’impact et la vitesse de balle. Séries de 10 dans le carré.'
      ],
      score: '6 services sur 10 dans le carré, avec une réception à l’intérieur du court.',
      tip: 'On pousse le sol vers le bas : c’est le sol qui renvoie le joueur vers le haut.',
      keys: [
        'Rampe de lancement : la force part du sol, par les chevilles et les genoux. Au service, la poussée est verticale.',
        'La flexion étire les muscles des jambes et stocke de l’énergie élastique ; elle n’est rendue que si l’extension suit aussitôt.',
        'Les coups les plus efficaces commencent par les jambes : le bras ne compense pas une rampe qui ne pousse pas.'
      ],
      variants: ['Depuis la ligne de service, pour ne penser qu’à la poussée.', 'Sans raquette : lancer une balle le plus haut possible en partant fléchi.'],
      coups: ['service'], axes: ['attaque', 'equilibre'],
      equipment: BR, players: [1, 6], space: 'complet', duration: [6, 8, 10], intensity: 2,
      diagram: { picto: 'launch' }
    },
    {
      id: 'ac-s02', theme: 'educatif', source: SRC, refs: GEN,
      title: 'Étage par étage', original: 'Chaîne de coordination au service',
      objective: 'Sentir ce que chaque étage du corps ajoute au service : le bras, puis le tronc, puis les jambes.',
      steps: [
        'Depuis la ligne de service : 3 services avec le bras seul, pieds joints, face au filet.',
        '3 services de profil en ajoutant le tronc : rotation, bascule des épaules, flexion vers l’avant.',
        '3 services complets en ajoutant la poussée des jambes.',
        'Reculer à la ligne de fond et refaire la série. Le geste du bras reste le même.'
      ],
      score: 'Trois vitesses de balle nettement différentes, et 6 services sur 9 dans le carré.',
      tip: 'La performance ne se joue pas dans le bras, mais dans le passage d’un maillon au suivant.',
      keys: [
        'Le mouvement part du sol et remonte : jambes, puis hanches et tronc, puis bras et raquette.',
        'Dernier étage : rotation interne de l’épaule, extension du coude, pronation de l’avant-bras, flexion du poignet.',
        'Un maillon faible réduit la performance et augmente le risque de blessure.'
      ],
      variants: ['Même progression pour le smash.', 'Filmer de profil et repérer l’ordre de départ des segments.'],
      coups: ['service'], axes: ['regularite', 'attaque'],
      equipment: BR, players: [1, 6], space: 'complet', duration: [8, 10, 12], intensity: 1,
      diagram: {
        zones: [['R.box.top', 'soft']],
        players: [[5, 6.6, 1, 'S']],
        shots: [
          { p: [[5.8, 6.4], [16.4, 3.3]] },
          { p: [[4.2, 7.2], [0.2, 7.2]], kind: 'move' }
        ],
        labels: [[6, 9.6, '1 BRAS · 2 + TRONC · 3 + JAMBES', 'tag']]
      }
    },
    {
      id: 'ac-s03', theme: 'educatif', source: SRC, refs: GEN,
      title: 'La bascule', original: 'Rotations du tronc au service',
      objective: 'Utiliser le tronc au service : épaules inclinées à l’armé, puis bascule et flexion vers l’avant.',
      steps: [
        'Départ en position armée : de profil, épaule avant plus haute que l’épaule de frappe, bras de lancer tendu.',
        'Lancer, puis faire basculer les épaules : l’épaule de frappe passe au-dessus de l’autre.',
        'Le tronc finit fléchi vers l’avant, dans la direction du service.',
        '10 services ; un partenaire regarde la ligne des épaules, placé de face.'
      ],
      score: '7 services sur 10 où la ligne des épaules s’inverse nettement.',
      tip: 'Les épaules tournent comme une roue : celle qui était en bas passe en haut.',
      keys: [
        'La vitesse de raquette à l’impact est liée à la quantité de rotation du tronc.',
        'Deux grandes sources au service : la flexion du tronc vers l’avant et sa flexion latérale, la bascule des épaules.',
        'Pendant l’armé, la rotation du tronc stocke aussi de l’énergie élastique.'
      ],
      variants: ['Sans raquette, mains sur les épaules : répéter la bascule au ralenti.', 'Lancer de balle à la main avec la même bascule (voir « Le lanceur »).'],
      coups: ['service'], axes: ['attaque'],
      equipment: BR, players: [2, 6], space: 'complet', duration: [6, 8, 10], intensity: 1,
      diagram: serveD('L’ÉPAULE PASSE AU-DESSUS')
    },
    {
      id: 'ac-s04', theme: 'educatif', source: SRC, refs: GEN,
      title: 'L’arabesque', original: 'Équilibre au service',
      objective: 'Rester équilibré pendant et après le service, grâce au bras libre et à la jambe arrière.',
      steps: [
        'Au lancer, tendre complètement le bras libre vers la balle et le garder haut jusqu’au déclenchement de la frappe.',
        'Servir en décollant ; le buste part vers l’avant.',
        'Retomber sur le pied avant, jambe arrière levée derrière soi ; le bras libre part vers l’arrière juste avant la réception.',
        'Tenir la réception 2 secondes. 10 services.'
      ],
      score: '7 réceptions sur 10 tenues 2 secondes, service dans le carré.',
      tip: 'L’équilibre n’est pas un but en soi : il permet de produire de l’énergie à partir du sol et de la transmettre le long d’un axe stable.',
      keys: [
        'Bras libre tendu : il stabilise le côté opposé à la raquette et empêche le haut du corps de trop tourner.',
        'La jambe arrière se lève derrière (arabesque) pour compenser la flexion du tronc vers l’avant.',
        'Juste avant la réception, le bras libre s’étend vers l’arrière pour compenser la jambe levée.'
      ],
      variants: ['Sans frapper : lancer, monter, retomber en arabesque.', 'Un plot dans le court : retomber à côté.'],
      coups: ['service'], axes: ['equilibre'],
      equipment: BR, players: [1, 6], space: 'complet', duration: [6, 8, 10], intensity: 1,
      diagram: serveD('TENIR 2 S', function (d) {
        d.marks = [['ring', 0.9, 6.2]];
        d.shots.push({ p: [[-0.4, 5.6], [0.7, 5.9]], kind: 'move' });
        d.labels = [[4.2, 8.6, 'TENIR 2 S', 'bubble']];
      })
    },
    {
      id: 'ac-s05', theme: 'educatif', source: SRC, refs: GEN,
      title: 'Sans temps mort', original: 'Énergie élastique au service',
      objective: 'Enchaîner l’armé et la frappe sans pause, pour récupérer l’énergie stockée dans les jambes, le tronc et l’épaule.',
      steps: [
        '5 services « en deux temps » : s’arrêter 2 secondes en position armée, jambes fléchies, puis frapper.',
        '5 services « en un temps » : flexion et poussée s’enchaînent, la raquette ne s’arrête jamais derrière le dos.',
        'Comparer la vitesse de balle pour le même effort.',
        'Finir par 10 services en un temps.'
      ],
      score: 'Le joueur sent la différence, et met 6 services sur 10 dans le carré en un temps.',
      tip: 'L’énergie élastique est gratuite mais périssable : au moindre arrêt, elle se perd en chaleur.',
      keys: [
        'Flexion des genoux et des chevilles : les muscles des jambes s’étirent et stockent de l’énergie.',
        'La rotation du tronc, puis la rotation de l’épaule vers l’arrière (la boucle), en stockent aussi.',
        'L’extension des jambes et la rotation interne de l’épaule la restituent, à condition de suivre immédiatement.'
      ],
      variants: ['Dire « bas, haut » à voix haute pour garder le rythme.', 'Lancer un peu plus haut, sans jamais arrêter la raquette.'],
      coups: ['service'], axes: ['rythme', 'attaque'],
      equipment: BR, players: [1, 6], space: 'complet', duration: [6, 8, 10], intensity: 2,
      diagram: serveD('BAS… HAUT !')
    },
    {
      id: 'ac-s06', theme: 'educatif', source: SRC, refs: GEN + ' ; Ravilly',
      title: 'Le curseur', original: 'Compromis précision / vitesse',
      objective: 'Trouver ses deux réglages de service : la vitesse de sa première balle et celle de sa seconde.',
      steps: [
        '5 services à 60 % de sa vitesse, 5 à 80 %, 5 à 100 %, sur la même cible.',
        'Noter le nombre de services dans le carré à chaque vitesse.',
        'Première balle : la vitesse la plus haute qui en met encore 6 sur 10. Seconde balle : celle qui en met 9 sur 10.',
        'Jouer 10 points « première, seconde » avec ces deux réglages.'
      ],
      score: 'Les deux vitesses sont trouvées : au moins 6 premières balles sur 10, une double faute au plus.',
      tip: 'Vitesse et précision se règlent l’une contre l’autre : chaque joueur a ses propres curseurs.',
      keys: [
        'Les principes biomécaniques ne se règlent pas de la même façon selon que l’on cherche la précision ou la vitesse.',
        'Repère du haut niveau : un peu plus de 6 premières balles sur 10 dans le carré.',
        'Un service bien placé gêne souvent davantage qu’un service très rapide sur le coup fort du relanceur.'
      ],
      variants: ['Changer de cible : extérieur, corps, T.', 'Refaire le test après un échange pour servir essoufflé.'],
      coups: ['service'], axes: ['precision', 'marge', 'decision'],
      equipment: ['balles', 'raquettes', 'plots'], players: [1, 4], space: 'complet', duration: [8, 10, 12], intensity: 2,
      diagram: serveD('', function (d) {
        d.marks = [['cone', 16.8, 3.1]];
        d.labels = [[4.6, 8.2, '60 %', 'tag'], [7.6, 8.2, '80 %', 'tag'], [10.9, 8.2, '100 %', 'dark']];
      })
    },
    {
      id: 'ac-s07', theme: 'educatif', source: SRC, refs: 'Biomécanique du jeu de jambes (Genevois)',
      title: 'Service, smash', original: 'Du service au smash',
      objective: 'Passer du service au smash en adaptant son geste : même accélération, préparation différente.',
      steps: [
        'Le joueur sert, puis avance au milieu du carré de service. Le coach lobe.',
        'Smash : préparation plus directe, raquette montée tôt, moins de rotation du tronc.',
        'Reculer en pas chassés, sauter vers le haut et l’arrière, retomber sur le pied avant (ciseau).',
        '8 enchaînements service puis smash.'
      ],
      score: '5 enchaînements sur 8 réussis : service dans le carré, smash dans le court.',
      tip: 'Au service on se donne la balle ; au smash il faut d’abord aller se placer dessous.',
      keys: [
        'Du service au smash : préparation plus directe, moins de rotation du tronc et de bascule des épaules, boucle plus courte.',
        'Jeu de jambes vers le haut et l’arrière, en ciseau ; contact tronc vertical.',
        'Tête de raquette un peu plus orientée vers le bas à l’impact.'
      ],
      variants: ['Lob plus profond.', 'Smash après rebond.'],
      coups: ['service', 'smash'], axes: ['filet', 'conclusion', 'deplacement'],
      equipment: BR, players: [1, 4], space: 'complet', duration: [8, 10, 12], intensity: 2,
      diagram: {
        zones: [['R.box.top', 'soft']],
        players: [[-0.8, 6.4, 1, 'S'], [22.4, 6.2, 2, 'C']],
        marks: [['basket', 22.4, 8.1]],
        shots: [
          { p: [[0, 6.2], [16.4, 3.3]], n: '1', at: 0.5 },
          { p: [[0.2, 7], [7.4, 6.6]], kind: 'move' },
          { p: [[21.7, 6.2], [7.2, 5.6]], kind: 'throw', arc: -3, tone: 'deep' },
          { p: [[7.6, 5.4], [20.6, 8.6]], n: '2', at: 0.5 }
        ]
      }
    },
    {
      id: 'ac-s08', theme: 'educatif', source: SRC, refs: GEN,
      title: 'Un pas en arrière', original: 'Formats adaptés au service',
      objective: 'Construire un geste de service complet en adaptant la distance, la balle et la raquette au joueur.',
      steps: [
        'Servir depuis la ligne de service, avec une balle souple et une raquette à sa taille.',
        'Geste complet : lancer, boucle, frappe vers le haut. 4 services sur 5 dans le carré : reculer de deux pas.',
        'Moins de 3 sur 5, ou geste qui se déforme : avancer d’un cran.',
        'Continuer ainsi jusqu’à la ligne de fond.'
      ],
      score: 'La plus grande distance où 4 services sur 5 passent avec un geste complet.',
      tip: 'Avancer n’est pas régresser : terrains, balles et raquettes adaptés sont des outils, pas des étapes à quitter au plus vite.',
      keys: [
        'Les formats adaptés facilitent l’apprentissage technique, en particulier celui du service et de la volée.',
        'Une raquette inadaptée à la taille d’un jeune gêne la mise en place des fondamentaux.',
        'Le « vrai tennis », c’est servir, retourner et jouer le point, quelles que soient la balle et la taille du terrain.'
      ],
      variants: ['Jouer le point après le service, sur le même terrain réduit.', 'Changer de balle sans changer de distance.'],
      coups: ['service'], axes: ['regularite', 'toucher'],
      equipment: BR, eqNote: 'Balles souples', players: [1, 6], space: 'complet', duration: [8, 10, 12], intensity: 1,
      diagram: {
        zones: [['R.box.top', 'soft']],
        lines: [{ p: [[3.6, 5.6], [3.6, 9.4]], dash: true, color: 'strong' }, { p: [[1.8, 5.6], [1.8, 9.4]], dash: true, color: 'strong' }],
        players: [[5.2, 6.6, 1, 'S']],
        shots: [
          { p: [[6, 6.4], [16.4, 3.3]] },
          { p: [[4.4, 7.6], [0.3, 7.6]], kind: 'move' }
        ],
        labels: [[5.6, 10.3, '4 SUR 5 : JE RECULE', 'tag']]
      }
    },

    /* =====================================================================
       SERVICE : LE PLACEMENT
       ===================================================================== */
    {
      id: 'ac-s09', theme: 'educatif', source: SRC, refs: RAV,
      title: 'Servir de côté', original: 'Placement du serveur',
      objective: 'Choisir d’où l’on sert : se décaler vers le côté ouvre l’angle et agrandit la zone que le relanceur doit défendre.',
      steps: [
        'Deux plots sur la ligne de fond : un près de la marque centrale, un à 2 m vers le côté.',
        '5 services extérieurs depuis chaque plot, côté égalité. Le relanceur se place à chaque fois, puis retourne.',
        'Observer jusqu’où le relanceur sort du court, et le terrain qui s’ouvre pour le coup suivant.',
        'Jouer 10 points en choisissant sa position ; un peu moins décalé sur seconde balle.'
      ],
      score: '6 points sur 10 où le deuxième coup du serveur est joué dans un terrain ouvert.',
      tip: 'Servir décalé n’est pas un handicap : le serveur est déjà placé pour le retour croisé.',
      keys: [
        'Depuis le côté, le service passe au-dessus d’une partie du filet un peu plus basse, d’environ 1,5 cm.',
        'La zone à couvrir par le relanceur est plus vaste, d’un quart environ.',
        'Le relanceur sort davantage du court : le terrain s’ouvre pour le deuxième coup du serveur.'
      ],
      variants: ['Côté avantage.', 'Revers fragile : moins se décaler côté égalité (droitier), côté avantage (gaucher).'],
      coups: ['service', 'retour'], axes: ['direction', 'construction', 'decision'],
      equipment: ['balles', 'raquettes', 'plots'], players: [2, 4], space: 'complet', duration: [8, 10, 12], intensity: 2,
      diagram: {
        zones: [['R.box.top', 'soft']],
        players: [[-0.9, 8, 1, 'S'], [25, 2.4, 2, 'R']],
        marks: [['cone', 0.5, 6], ['cone', 0.5, 8]],
        shots: [
          { p: [[0.4, 5.6], [17.4, 2]], tone: 'ink' },
          { p: [[0.4, 7.6], [16.2, 1.7]] }
        ],
        labels: [[5.4, 10.3, 'DÉCALÉ : PLUS D’ANGLE', 'tag']]
      }
    },

    /* =====================================================================
       RETOUR
       ===================================================================== */
    {
      id: 'ac-s10', theme: 'educatif', source: SRC, refs: RAV,
      title: 'La bissectrice', original: 'Placement au retour',
      objective: 'Se placer au retour à égale distance des deux services extrêmes, et se replacer quand le serveur change de position.',
      steps: [
        'Deux plots dans le carré : un au T, un sur la ligne extérieure. Imaginer (ou tendre) deux lignes du serveur vers ces plots.',
        'Le relanceur se place au milieu de ces deux lignes, au niveau de la ligne de fond.',
        'Le serveur change de place (au centre, décalé) : le relanceur se replace avant chaque service.',
        'Le serveur sert ; le retour doit revenir dans le court.'
      ],
      score: '8 placements justes sur 10 (le coach valide) et 6 retours dans le court.',
      tip: 'Serveur au centre : relanceur plus au centre. Serveur décalé : relanceur plus à l’extérieur.',
      keys: [
        'Théorie des angles : se placer sur la bissectrice des coups possibles de l’adversaire.',
        'La profondeur se règle selon la balle (première ou seconde), sa propre sécurité au retour et la pression du serveur.',
        'La position d’attente n’est pas celle de la frappe : en retour agressif, on avance d’un bon mètre en frappant.'
      ],
      variants: ['Côté avantage.', 'Contre un gaucher : refaire le repérage.'],
      coups: ['retour'], axes: ['reaction', 'decision'],
      equipment: ['balles', 'raquettes', 'plots'], players: [2, 4], space: 'complet', duration: [8, 10, 12], intensity: 1,
      diagram: {
        zones: [['L.box.bot', 'soft']],
        lines: [
          { p: [[24, 4.4], [0, 5.8]], dash: true, color: 'strong' },
          { p: [[24, 4.4], [0, 11]], dash: true, color: 'strong' }
        ],
        players: [[-0.8, 8.4, 1, 'R'], [24.8, 4.4, 2, 'S']],
        marks: [['cone', 5.485, 5.485], ['cone', 5.485, 9.6]],
        labels: [[4, 2.6, 'AU MILIEU DES DEUX LIGNES', 'bubble']]
      }
    },
    {
      id: 'ac-s11', theme: 'educatif', source: SRC, refs: RAV + ' ; Genevois',
      title: 'Première ou seconde ?', original: 'Adapter son retour',
      objective: 'Adapter sa position et son intention au retour selon la balle du serveur.',
      steps: [
        'Deux lignes au sol : une 1 m derrière la ligne de fond, une 1 m devant.',
        'Le serveur annonce « première » ou « seconde » avant de servir.',
        'Première : attendre sur la ligne arrière, retour bloqué et profond au centre. Seconde : attendre sur la ligne avant et avancer dans la balle.',
        'Dans les deux cas, saut d’allègement quand la raquette du serveur accélère. Séries de 10.'
      ],
      score: '7 retours sur 10 dans le court, joués depuis la bonne ligne.',
      tip: 'Avancer d’un mètre enlève environ 6 centièmes de seconde au serveur pour préparer son coup suivant.',
      keys: [
        'Le relanceur s’adapte à la première ou à la seconde balle, et à sa capacité à retourner sans faute.',
        'En retour agressif, la plupart des joueurs avancent d’un bon mètre en frappant.',
        'L’allègement se règle sur l’accélération de la raquette du serveur ; la poussée part du pied côté balle.'
      ],
      variants: ['Sans annonce : le relanceur lit lui-même la balle.', 'Compter les points : 2 points pour un retour de seconde balle qui met le serveur en difficulté.'],
      coups: ['retour'], axes: ['reaction', 'decision', 'attaque'],
      equipment: ['balles', 'raquettes', 'lignes'], players: [2, 4], space: 'complet', duration: [8, 10, 12], intensity: 2,
      diagram: returnD('', function (d) {
        d.lines = [
          { p: [[-1, 5.6], [-1, 10.6]], dash: true, color: 'strong', w: 2.6 },
          { p: [[1, 5.6], [1, 10.6]], dash: true, color: 'strong', w: 2.6 }
        ];
        d.players[0] = [-2.3, 8.2, 1, 'R'];
        d.shots[1] = { p: [[1.4, 7.7], [21.2, 7.4]] };
        d.labels = [[5.4, 2.2, '1re BALLE : LIGNE ARRIÈRE', 'tag'], [5.4, 3.6, '2e BALLE : LIGNE AVANT', 'dark']];
      })
    },
    {
      id: 'ac-s12', theme: 'educatif', source: SRC, refs: RAV + ' ; Genevois',
      title: 'Prise d’attente', original: 'Changement de prise au retour',
      objective: 'Attendre le service avec une prise choisie et savoir en changer vite, des deux côtés.',
      steps: [
        'Le relanceur choisit sa prise d’attente (coup droit ou revers) ; la main libre tient le cœur de la raquette.',
        'Le serveur sert à vitesse moyenne, au hasard à droite ou à gauche.',
        'Changer de prise pendant la rotation des épaules, en s’aidant de la main libre ; retour bloqué devant soi.',
        '10 retours avec une prise d’attente, 10 avec l’autre : comparer.'
      ],
      score: '7 retours sur 10 dans le court du côté qui demande un changement de prise.',
      tip: 'Un bon serveur repère la prise d’attente et sert du côté qui oblige à en changer.',
      keys: [
        'Le serveur voit facilement si le relanceur attend en prise de coup droit ou de revers.',
        'La prise détermine l’orientation de la main à l’impact : c’est elle qui dirige le retour.',
        'Le temps manque : la préparation se réduit à la rotation des épaules.'
      ],
      variants: ['Le serveur vise volontairement le côté du changement de prise.', 'Voir « Retour bloqué » pour le geste court.'],
      coups: ['retour'], axes: ['reaction', 'regularite'],
      equipment: BR, players: [2, 4], space: 'complet', duration: [6, 8, 10], intensity: 2,
      diagram: returnD('CHANGER DE PRISE', function (d) {
        d.shots.splice(1, 0, { p: [[23.8, 4.7], [7, 8.9]], tone: 'deep' });
      })
    }
  );

  AC.CARDS.forEach(function (c) { if (c.id.indexOf('ac-s') === 0) c.drawWeight = DRAW_WEIGHT; });
})();
