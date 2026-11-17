/* ==========================================================================
   Assistant Coach — Paquet « Jeu de jambes » (créations Assistant Coach)
   23 éducatifs construits sur le cours de Cyril Genevois « Biomécanique du jeu
   de jambes au tennis » (Sources/Tennis/Genevois_biomeca), dans l'ordre des
   5 composantes du cycle du jeu de jambes :
     1. saut d'allègement / reprise d'appuis   (ac-j01 à ac-j04)
     2. déplacement vers la zone de frappe      (ac-j05 à ac-j09)
     3-4. placement et appuis à la frappe       (ac-j10 à ac-j16)
     5. replacement                             (ac-j17 à ac-j19)
     + situations spécifiques : réactivité du pied, jeu réduit, volée, retour (ac-j20 à ac-j23)

   Vocabulaire (attention, « extérieur » change de sens selon le moment) :
     - à la reprise d'appuis : appui extérieur = le pied le plus ÉLOIGNÉ de la balle ;
     - à la frappe et au replacement : appui extérieur = le pied côté balle / côté couloir.
   Les textes le précisent à chaque fois.

   Deux sortes de schémas : terrain (organisation de l'exercice) ou
   vignettes d'appuis `frames` (pieds vus de dessus, filet en haut).
   ========================================================================== */
window.AC = window.AC || {};
AC.CARDS = AC.CARDS || [];

(function () {
  var N = 11.885, SL = 5.485, SR = 18.285, T = 1.37, B = 9.6, M = 5.485, W = 23.77;
  var SRC = 'Assistant Coach';
  var REF = 'Biomécanique du jeu de jambes (Genevois)';
  var BR = ['balles', 'raquettes'];
  var BRP = ['balles', 'raquettes', 'plots'];

  /* Poids de tirage du paquet : 23 cartes pour 19 autres éducatifs. À 0,4, environ un éducatif tiré
     sur trois est un « jeu de jambes » quand aucun objectif ne les demande (plein poids sinon). */
  var DRAW_WEIGHT = 0.4;

  /* Phrases de lecture des vignettes d'appuis */
  var VIEW = 'Vu de dessus, filet en haut. ';
  var FEET = ' G, D : pied gauche, pied droit.';
  var NOTE_BALL = VIEW + 'Exemple : la balle est à droite du joueur.' + FEET;
  var NOTE_CD = VIEW + 'Exemple : coup droit de droitier.' + FEET;
  var NOTE_BACK = VIEW + 'Exemple : après un coup droit de droitier, le centre est à gauche.' + FEET;

  /* Coach au panier, en face */
  function coach(x, y) { return [x == null ? 16.5 : x, y == null ? 5.5 : y, 2, 'C']; }
  function basket(x, y) { return ['basket', x == null ? 16.5 : x, (y == null ? 5.5 : y) + 1.9]; }

  AC.CARDS.push(

    /* =====================================================================
       1. SAUT D'ALLÈGEMENT ET REPRISE D'APPUIS
       ===================================================================== */
    {
      id: 'ac-j01', theme: 'educatif', source: SRC, refs: REF,
      title: 'L’appui extérieur', original: 'Réception sur l’appui extérieur',
      objective: 'Retomber du saut d’allègement sur le pied le plus éloigné de la balle, pour être poussé vers elle dès que le sol est touché.',
      steps: [
        'Le coach se place à 3 m, face au joueur, une balle dans chaque main, bras écartés.',
        'Le coach lève les mains : saut d’allègement. Il lâche une des deux balles pendant que le joueur est en l’air.',
        'Réception sur le pied opposé à la balle lâchée ; il pousse aussitôt, l’autre pied part vers la balle.',
        'Attraper la balle avant le deuxième rebond, puis revenir face au coach. Séries de 8.'
      ],
      score: '6 balles sur 8 attrapées avec une réception sur le bon pied (le coach valide).',
      tip: 'L’information se prend en l’air : au moment de retoucher le sol, le côté est déjà choisi.',
      keys: [
        'Appui extérieur = le pied le plus éloigné de la balle : il touche le sol en premier et il pousse.',
        'La réception met les muscles de la jambe en tension : repartir sans temps d’arrêt pour profiter de cet élan élastique.',
        'Exercice orienté d’abord, puis de plus en plus proche du jeu (voir « Hop ! »).'
      ],
      variants: ['Le coach recule à 5 m et lance la balle à la main, à droite ou à gauche.', 'Raquette en main : bloquer la balle sur le tamis après un rebond.'],
      coups: [], axes: ['reaction', 'deplacement'],
      equipment: ['balles'], players: [1, 4], space: 'hors', duration: [5, 6, 8], intensity: 2,
      diagram: {
        note: NOTE_BALL,
        frames: [
          {
            caption: ['EN L’AIR :', 'LIRE LE CÔTÉ'],
            feet: [[34, 64, -8, 'G', 'air'], [66, 64, 8, 'D', 'air']],
            arrows: [{ p: [[52, 14], [82, 30]], kind: 'ball' }], ball: [88, 33]
          },
          {
            caption: ['RÉCEPTION SUR', 'LE PIED ÉLOIGNÉ'],
            feet: [[32, 64, -6, 'G', 'on'], [66, 58, 40, 'D', 'air']],
            arrows: [{ p: [[30, 90], [58, 90]], kind: 'push' }], ball: [88, 33]
          },
          {
            caption: ['IL POUSSE', 'VERS LA BALLE'],
            feet: [[24, 68, -6, 'G', 'light'], [70, 54, 55, 'D', 'on']],
            arrows: [{ p: [[38, 90], [72, 86]], kind: 'push' }], ball: [88, 33]
          }
        ]
      }
    },
    {
      id: 'ac-j02', theme: 'educatif', source: SRC, refs: REF,
      title: 'Base large', original: 'Reprise d’appuis en pas latéral',
      objective: 'Démarrer sur le côté en élargissant ses appuis : la mise en mouvement la plus courante, valable pour toutes les distances.',
      steps: [
        'Le coach envoie au panier à 2 ou 3 m du joueur, à droite ou à gauche au hasard.',
        'Saut d’allègement, réception sur le pied le plus éloigné de la balle ; l’autre pied se pose écarté, pointe tournée vers la balle.',
        'Le pied éloigné pousse, puis le pied côté balle pousse à son tour : frappe, retour au centre.',
        'Séries de 8 balles. Un partenaire (ou le coach) regarde les pieds et annonce « large » ou « serré ».'
      ],
      score: '6 démarrages sur 8 jugés « larges ».',
      tip: 'Une base large rend stable avant de partir : c’est ce qui permet de pousser fort sans se désunir.',
      keys: [
        'Réception sur l’appui extérieur (le pied le plus éloigné de la balle).',
        'L’autre appui s’oriente dans la direction du déplacement, puis devient l’appui de poussée.',
        'On pousse le sol dans le sens opposé au déplacement : c’est le sol qui renvoie le joueur vers la balle.'
      ],
      variants: ['Sans balle : le coach montre le côté avec sa raquette.', 'Balle plus écartée : enchaîner avec deux pas chassés (voir « Deux pas chassés »).'],
      coups: ['coup-droit', 'revers'], axes: ['reaction', 'deplacement', 'equilibre'],
      equipment: BR, players: [1, 6], space: 'demi', duration: [6, 8, 10], intensity: 2,
      diagram: {
        note: NOTE_BALL,
        frames: [
          {
            caption: ['RÉCEPTION SUR', 'LE PIED ÉLOIGNÉ'],
            feet: [[30, 64, -6, 'G', 'on'], [60, 60, 45, 'D', 'air']],
            ball: [90, 30]
          },
          {
            caption: ['IL ÉCARTE L’AUTRE', 'PIED VERS LA BALLE'],
            feet: [[24, 66, -6, 'G', 'on'], [76, 60, 60, 'D', 'light']],
            arrows: [{ p: [[52, 40], [72, 40]], kind: 'move' }],
            labels: [[50, 90, 'BASE LARGE', 'plainStrong']], ball: [90, 30]
          },
          {
            caption: ['IL DEVIENT', 'L’APPUI DE POUSSÉE'],
            feet: [[38, 64, 20, 'G', 'air'], [70, 60, 60, 'D', 'on']],
            arrows: [{ p: [[50, 90], [84, 86]], kind: 'push' }], ball: [90, 30]
          }
        ]
      }
    },
    {
      id: 'ac-j03', theme: 'educatif', source: SRC, refs: REF,
      title: 'Tomber pour partir', original: 'Reprise d’appuis en pas gravitationnel',
      objective: 'Démarrer vite vers une balle éloignée en laissant le corps basculer du côté de la balle.',
      steps: [
        'Un plot à 4 m de chaque côté du centre. Le coach envoie au panier une balle écartée, à droite ou à gauche.',
        'Saut d’allègement, réception sur le pied le plus éloigné de la balle.',
        'Le pied côté balle revient sous le corps, à l’opposé du déplacement : le corps bascule vers la balle.',
        'Le pied éloigné passe devant le corps, en direction de la balle : course, frappe, replacement.'
      ],
      score: '6 balles sur 8 jouées en équilibre près du plot, avec un départ « en tombant » validé par le coach.',
      tip: 'Ne pas lutter contre le déséquilibre : la gravité lance le corps, les jambes n’ont plus qu’à suivre.',
      keys: [
        'Le centre de gravité sort volontairement de la base d’appui, du côté de la balle.',
        'La gravité est une énergie gratuite : elle aide à vaincre l’inertie du départ.',
        'C’est le départ des balles éloignées, du manque de temps et des contre-pieds.'
      ],
      variants: ['Contre-pied : le coach regarde d’un côté et envoie parfois de l’autre.', 'Sans raquette : attraper la balle à une main au niveau du plot.'],
      coups: ['coup-droit', 'revers'], axes: ['reaction', 'deplacement', 'defense'],
      equipment: BRP, players: [1, 4], space: 'demi', duration: [6, 8, 10], intensity: 3,
      diagram: {
        note: NOTE_BALL + ' CG : centre de gravité.',
        frames: [
          {
            caption: ['RÉCEPTION SUR', 'LE PIED ÉLOIGNÉ'],
            feet: [[30, 66, -6, 'G', 'on'], [64, 64, 10, 'D', 'air']],
            cg: [47, 38], ball: [92, 24]
          },
          {
            caption: ['L’AUTRE PIED REVIENT', 'SOUS LE CORPS'],
            feet: [[26, 66, -6, 'G', 'light'], [46, 68, 50, 'D', 'on']],
            arrows: [{ p: [[70, 90], [52, 88]], kind: 'move' }, { p: [[76, 38], [92, 38]], kind: 'push' }],
            cg: [64, 38]
          },
          {
            caption: ['LE PIED ÉLOIGNÉ', 'PASSE DEVANT'],
            feet: [[40, 72, 55, 'D', 'on'], [74, 48, 60, 'G', 'air']],
            arrows: [{ p: [[22, 58], [60, 42]], kind: 'move', arc: -9 }, { p: [[54, 92], [88, 88]], kind: 'push' }],
            ball: [92, 24]
          }
        ]
      }
    },
    {
      id: 'ac-j04', theme: 'educatif', source: SRC, refs: REF,
      title: 'Près, moyen, loin', original: 'Choisir sa mise en mouvement',
      objective: 'Choisir sa mise en mouvement selon la distance de la balle : pivot, pas latéral ou pas gravitationnel.',
      steps: [
        'Trois plots de chaque côté du centre : à 1 m (près), 2,5 m (moyen) et 4 m (loin).',
        'Le coach envoie au panier vers un plot au hasard. Saut d’allègement, réception sur le pied le plus éloigné de la balle.',
        'Près : pivot sur le pied côté balle, l’autre pied passe devant. Moyen : pas latéral. Loin : pas gravitationnel, puis course.',
        'Frapper près du plot, se replacer au centre. Séries de 9 balles.'
      ],
      score: '7 balles sur 9 jouées avec la mise en mouvement adaptée (le coach valide).',
      tip: 'Les trois départs commencent pareil : information prise en l’air, réception sur l’appui extérieur. Seul l’usage de l’autre pied change.',
      keys: [
        'Pivot : balles proches ; on tourne sur le pied côté balle et le pied éloigné passe devant le corps.',
        'Pas latéral : le plus courant, adapté à toutes les distances.',
        'Pas gravitationnel : balles éloignées, manque de temps ou contre-pied.'
      ],
      variants: ['Le joueur annonce « pivot », « latéral » ou « tombé » au démarrage.', 'Deux balles de suite : une près, une loin.'],
      coups: ['coup-droit', 'revers'], axes: ['reaction', 'deplacement', 'decision'],
      equipment: BRP, players: [1, 4], space: 'demi', duration: [8, 10, 12], intensity: 2,
      diagram: {
        zones: [['L.back', 'soft']],
        players: [[-1.2, 5.5, 1, 'J'], coach()],
        marks: [basket(), ['cone', 1, 4.5], ['cone', 1, 3], ['cone', 1, 1.5], ['cone', 1, 6.5], ['cone', 1, 8], ['cone', 1, 9.5]],
        shots: [
          { p: [[15.9, 5.2], [2.2, 4.4]], tone: 'deep' },
          { p: [[15.9, 5], [2.2, 1.8]], tone: 'deep' }
        ],
        labels: [
          [4.6, 6.5, 'PRÈS · 1 M', 'tag'], [5.3, 8, 'MOYEN · 2,5 M', 'tag'], [4.6, 10.35, 'LOIN · 4 M', 'tag']
        ]
      }
    },

    /* =====================================================================
       2. DÉPLACEMENT VERS LA ZONE DE FRAPPE
       ===================================================================== */
    {
      id: 'ac-j05', theme: 'educatif', source: SRC, refs: REF,
      title: 'Deux pas chassés', original: 'Déplacement en pas chassés',
      objective: 'Rejoindre une balle proche en pas chassés et arriver déjà placé en appuis ouverts.',
      steps: [
        'Un plot à 2 m du centre, côté coup droit. Le coach envoie au panier vers le plot.',
        'Reprise d’appuis en pas latéral, appuis bien écartés, puis deux pas chassés face au filet.',
        'Le second pas est plus ample que le premier et se termine par l’ancrage du pied arrière.',
        'Frapper en appuis ouverts, revenir au centre en pas chassés. 6 balles, puis côté revers.'
      ],
      score: '5 frappes sur 6 en équilibre, pied arrière ancré avant l’impact.',
      tip: 'Les pieds se rapprochent en l’air et s’écartent en retombant : ils ne se croisent jamais.',
      keys: [
        'Corps perpendiculaire au déplacement : hanches et épaules restent face au filet.',
        'Amplitude croissante. Repère observé à haut niveau : un premier pas d’environ 30 % de la taille, un second un peu plus grand.',
        'Le pas chassé couvre un terrain modéré et place directement pour jouer en appuis ouverts.'
      ],
      variants: ['Sans balle : aller en pas chassés, geste à vide, retour.', 'Plot à 3 m : ajouter un troisième pas chassé.'],
      coups: ['coup-droit', 'revers'], axes: ['deplacement', 'equilibre'],
      equipment: BRP, players: [1, 6], space: 'demi', duration: [6, 8, 10], intensity: 2,
      diagram: {
        note: NOTE_BALL,
        frames: [
          {
            caption: ['REPRISE D’APPUIS', 'LARGE'],
            feet: [[22, 62, -6, 'G', 'on'], [70, 60, 30, 'D', 'light']],
            arrows: [{ p: [[32, 90], [62, 90]], kind: 'push' }]
          },
          {
            caption: ['LES PIEDS SE', 'REJOIGNENT EN L’AIR'],
            feet: [[42, 60, 0, 'G', 'air'], [60, 60, 10, 'D', 'air']],
            arrows: [{ p: [[34, 90], [64, 90]], kind: 'move' }]
          },
          {
            caption: ['ILS S’ÉCARTENT :', 'PIED ARRIÈRE ANCRÉ'],
            feet: [[30, 58, 0, 'G', 'light'], [72, 64, 45, 'D', 'on']],
            labels: [[50, 91, 'APPUIS OUVERTS', 'plainStrong']], ball: [90, 30]
          }
        ]
      }
    },
    {
      id: 'ac-j06', theme: 'educatif', source: SRC, refs: REF,
      title: 'Deux foulées', original: 'Déplacement en pas courus',
      objective: 'Couvrir une grande distance en peu d’appuis quand le temps manque.',
      steps: [
        'Un plot à 3 ou 4 m du centre (environ deux fois la taille du joueur). Le coach envoie au panier une balle rapide vers le plot.',
        'Départ en pas gravitationnel : le corps bascule vers la balle.',
        'Deux foulées de plus en plus grandes, pied déroulé du talon à la pointe, puis pose du pied arrière pour frapper.',
        'Frapper, freiner, revenir au centre. 6 balles, puis l’autre côté.'
      ],
      score: 'Plot atteint en deux foulées et balle remise dans le court 5 fois sur 6.',
      tip: 'Peu d’appuis, mais de vrais appuis : chaque foulée repousse le sol loin derrière.',
      keys: [
        'Le pied se déroule entièrement, du talon à la pointe, pour produire de la force à chaque appui.',
        'La seconde foulée est plus grande que la première parce que le corps accélère. Repère : environ 60 % puis 85 % de la taille.',
        'Les pas courus couvrent plus de terrain en moins de temps que les pas chassés.'
      ],
      variants: ['Sans balle : deux repères au sol pour poser les deux foulées.', 'Balle encore plus écartée : frapper dans la course (voir « Croiser, freiner »).'],
      coups: ['coup-droit', 'revers'], axes: ['deplacement', 'defense'],
      equipment: BRP, players: [1, 4], space: 'demi', duration: [6, 8, 10], intensity: 3,
      diagram: {
        zones: [['L.back.bot', 'soft']],
        players: [[-1.2, 5.5, 1, 'J'], coach()],
        marks: [basket(), ['ring', 0.2, 7], ['ring', 0.5, 8.4], ['cone', 1, 9.5]],
        shots: [
          { p: [[15.9, 5.7], [2.4, 9.2]], tone: 'deep' },
          { p: [[-0.9, 6.5], [0.5, 8.9]], kind: 'move' }
        ],
        labels: [[5.2, 7.4, '2 FOULÉES', 'tag'], [3.2, 10.4, '3 À 4 M', 'plain']]
      }
    },
    {
      id: 'ac-j07', theme: 'educatif', source: SRC, refs: REF,
      title: 'Le décalage', original: 'Décalage coup droit',
      objective: 'Tourner autour de son revers pour jouer un coup droit : en pas chassés quand on a le temps, en pas croisés quand on est pressé.',
      steps: [
        'Le coach envoie au panier une balle au centre, légèrement côté revers.',
        'Balle lente : reprise d’appuis en pas latéral, trois pas chassés, ancrage sur le pied avant.',
        'Balle rapide : départ en pas gravitationnel, un pas croisé en arrière, un pas croisé en avant, ancrage sur le pied avant.',
        'Coup droit décalé dans la zone, replacement. Le coach alterne balles lentes et rapides.'
      ],
      score: '7 coups droits sur 10 dans la zone, avec le déplacement adapté à la vitesse de la balle.',
      tip: 'Les pas croisés font gagner du temps et lancent déjà la rotation des hanches et des épaules.',
      keys: [
        'Pression de temps faible à moyenne : pas chassés. Moyenne à forte : pas croisés.',
        'Dans les deux cas, ancrage sur le pied avant avant de frapper.',
        'En pas croisés : le premier pas, en arrière, est le plus grand ; le second, en avant, est plus court.'
      ],
      variants: ['Le coach annonce « temps » ou « vite » au moment d’envoyer.', 'Viser inside-out, puis inside-in.'],
      coups: ['coup-droit'], axes: ['deplacement', 'attaque'],
      equipment: BR, players: [1, 4], space: 'complet', duration: [8, 10, 12], intensity: 2,
      diagram: {
        zones: [['R.back.bot', 'soft']],
        players: [[-1.2, 5.5, 1, 'J'], coach()],
        marks: [basket()],
        shots: [
          { p: [[15.9, 5.3], [2.4, 4.7]], tone: 'deep' },
          { p: [[-1.1, 4.6], [-0.7, 3.4]], kind: 'move' },
          { p: [[1, 4.6], [21.4, 8.2]] }
        ],
        labels: [[4.6, 1.9, 'DÉCALAGE', 'bubble']]
      }
    },
    {
      id: 'ac-j08', theme: 'educatif', source: SRC, refs: REF,
      title: 'Accélérer, freiner', original: 'Changement de rythme',
      objective: 'Être explosif sur le premier appui, puis savoir freiner pour arriver équilibré sur la balle.',
      steps: [
        'Quatre plots en carré (1 m de côté) à 4 m du centre. Le coach envoie au panier vers le carré.',
        'Saut d’allègement, premier appui explosif, une ou deux grandes foulées.',
        'Freiner par de petits pas rapides pour s’arrêter dans le carré, en équilibre, avant de frapper.',
        'Varier le départ : arrêté, en marchant, en pas chassés. 6 passages par départ.'
      ],
      score: '5 frappes sur 6 jouées dans le carré, sans pas de rattrapage après l’impact.',
      tip: 'Le tennis, c’est de l’explosivité sur le premier appui, parfois le deuxième, puis du freinage.',
      keys: [
        'Les grandes vitesses sont rares : les distances sont trop courtes. Ce sont les accélérations et les décélérations qui dominent.',
        'Freiner, c’est maîtriser son inertie : appuis fréquents, centre de gravité abaissé.',
        'Un corps déjà en mouvement est plus facile à accélérer : rester actif entre deux frappes.'
      ],
      variants: ['Le coach annonce « vite » ou « lent » : adapter la vitesse de départ.', 'Un carré de chaque côté : enchaîner droite, puis gauche.'],
      coups: ['coup-droit', 'revers'], axes: ['deplacement', 'rythme', 'equilibre'],
      equipment: BRP, players: [1, 4], space: 'demi', duration: [6, 8, 10], intensity: 3,
      diagram: {
        zones: [[[0.2, 8.5, 1.4, 9.7], 'strong']],
        players: [[-1.2, 5.5, 1, 'J'], coach()],
        marks: [basket()],
        shots: [
          { p: [[15.9, 5.7], [2.6, 9]], tone: 'deep' },
          { p: [[-0.9, 6.5], [0.6, 8.3]], kind: 'move' }
        ],
        labels: [[2.4, 6.8, 'VITE', 'plainStrong'], [4, 10.4, 'FREINER', 'tag']]
      }
    },
    {
      id: 'ac-j09', theme: 'educatif', source: SRC, refs: REF,
      title: 'La glissade', original: 'Glissade sur terre battue',
      objective: 'Sur terre battue, glisser sur le dernier appui pour s’ajuster à la balle et freiner sans se bloquer.',
      steps: [
        'Sans raquette : course latérale de 4 m, glissade sur la jambe avant, pied posé en travers de la course, arrêt en équilibre.',
        'Même chose raquette en main, avec un geste à vide pendant la glissade.',
        'Le coach envoie au panier une balle écartée : frapper pendant la glissade, pas après.',
        'Finir la glissade en équilibre, puis se replacer aussitôt. Séries de 6, des deux côtés.'
      ],
      score: '4 frappes sur 6 jouées pendant la glissade, avec un arrêt en équilibre.',
      tip: 'La glissade s’apprend tôt, comme n’importe quel déplacement : commencer lentement et sans balle.',
      keys: [
        'La jambe avant attaque le sol inclinée ; le pied s’oriente perpendiculairement à la course pour contrôler le freinage.',
        'Le contact avec la balle a lieu pendant la glissade ; le haut du corps reste équilibré.',
        'Le freinage passe par tout le pied, du talon aux orteils. Il dure plus longtemps que sur dur, donc il est moins brutal.'
      ],
      variants: ['Sur dur : même travail en freinant sur deux appuis, sans glisser (voir « Croiser, freiner »).', 'Glissade côté revers.'],
      coups: ['coup-droit', 'revers'], axes: ['deplacement', 'equilibre', 'defense'],
      equipment: BR, eqNote: 'Terre battue', players: [1, 4], space: 'demi', duration: [8, 10, 12], intensity: 2,
      diagram: {
        zones: [['R.back.top', 'soft']],
        lines: [{ p: [[0.5, 8.2], [0.9, 9.6]], color: 'strong', w: 4 }],
        players: [[-1.2, 5.5, 1, 'J'], coach()],
        marks: [basket()],
        shots: [
          { p: [[15.9, 5.7], [2.6, 9.3]], tone: 'deep' },
          { p: [[-0.9, 6.5], [0.3, 8]], kind: 'move' },
          { p: [[1.4, 9.4], [21.4, 3.2]], arc: -1.6 }
        ],
        labels: [[4.4, 10.4, 'GLISSADE', 'tag']]
      }
    },

    /* =====================================================================
       3-4. PLACEMENT ET APPUIS À LA FRAPPE
       ===================================================================== */
    {
      id: 'ac-j10', theme: 'educatif', source: SRC, refs: REF,
      title: 'Pousser, ancrer, freiner', original: 'Appuis en ligne',
      objective: 'Sur une balle proche qui rebondit devant soi, frapper en appuis en ligne avec un vrai transfert vers l’avant.',
      steps: [
        'Le coach envoie au panier une balle facile, courte et proche, côté coup droit.',
        'La jambe arrière pousse vers la balle ; la jambe avant se pose et s’ancre.',
        'Frapper, puis laisser l’appui avant s’alléger : la jambe arrière revient dans l’accompagnement.',
        'La jambe arrière se pose sur le côté, en avant du corps : elle freine et lance le replacement.'
      ],
      score: '7 frappes sur 10 dans la zone profonde, avec la jambe arrière qui termine devant.',
      tip: 'Plus la frappe est appuyée, plus la jambe arrière finit loin devant.',
      keys: [
        'Jambe arrière : propulsion. Jambe avant : ancrage. C’est le transfert du poids du corps.',
        'La triple extension de la jambe arrière (cheville, genou, hanche) est l’accélérateur du corps.',
        'C’est la jambe arrière, posée devant, qui freine le transfert et prépare le replacement.'
      ],
      variants: ['Même travail en revers.', 'Avec un médecine-ball léger : mêmes appuis, lancer sur le côté (voir « Du sol à la balle »).'],
      coups: ['coup-droit', 'revers'], axes: ['equilibre', 'construction', 'profondeur'],
      equipment: BR, players: [1, 4], space: 'complet', duration: [6, 8, 10], intensity: 1,
      diagram: {
        note: NOTE_CD,
        frames: [
          {
            caption: ['LA JAMBE ARRIÈRE', 'POUSSE'],
            feet: [[34, 76, 80, 'D', 'on'], [54, 42, 45, 'G', 'air']],
            arrows: [{ p: [[82, 88], [82, 58]], kind: 'push' }], ball: [82, 26]
          },
          {
            caption: ['LA JAMBE AVANT', 'S’ANCRE : FRAPPE'],
            feet: [[34, 76, 80, 'D', 'light'], [56, 40, 45, 'G', 'on']],
            ball: [84, 34]
          },
          {
            caption: ['L’AVANT S’ALLÈGE,', 'L’ARRIÈRE REVIENT'],
            feet: [[52, 40, 30, 'G', 'light'], [70, 72, 40, 'D', 'air']],
            arrows: [{ p: [[30, 84], [84, 56]], kind: 'move', arc: 12 }]
          },
          {
            caption: ['ELLE SE POSE', 'DEVANT ET FREINE'],
            feet: [[46, 44, 10, 'G', 'light'], [80, 46, 0, 'D', 'on']],
            arrows: [{ p: [[72, 88], [36, 88]], kind: 'push' }]
          }
        ]
      }
    },
    {
      id: 'ac-j11', theme: 'educatif', source: SRC, refs: REF,
      title: 'L’axe', original: 'Pivot en appuis ouverts',
      objective: 'Sur une balle proche ou rapide, frapper en appuis ouverts en tournant autour de l’appui extérieur resté au sol.',
      steps: [
        'Le coach envoie au panier une balle vive, à un pas du joueur, côté coup droit.',
        'Poser le pied côté balle (appui extérieur), genou fléchi, épaules tournées : le poids est dessus.',
        'Frapper en tournant hanches et tronc autour de cet appui, qui reste au contact du sol.',
        'L’autre pied se pose en arrière pour lancer le replacement. 8 balles, puis côté revers.'
      ],
      score: '6 frappes sur 8 en équilibre : tête droite, appui extérieur au sol à l’impact.',
      tip: 'Appuis écartés, bassin bas, poids au milieu des appuis, tête droite et bras libre en balancier : les réglages de l’équilibre.',
      keys: [
        'L’appui extérieur est à la fois l’ancrage et l’axe de rotation des hanches et du tronc.',
        'En appuis ouverts, la vitesse de raquette vient surtout de la rotation du tronc : bien dissocier le haut et le bas du corps en préparation.',
        'Technique des balles proches du corps ou rapides, en construction comme en défense.'
      ],
      variants: ['Balles dans le corps : pivoter sans déplacer l’appui extérieur.', 'Tenir la position finale 2 secondes avant de se replacer.'],
      coups: ['coup-droit', 'revers'], axes: ['equilibre', 'defense', 'construction'],
      equipment: BR, players: [1, 6], space: 'demi', duration: [6, 8, 10], intensity: 2,
      diagram: {
        note: NOTE_CD,
        frames: [
          {
            caption: ['ANCRAGE SUR', 'L’APPUI EXTÉRIEUR'],
            feet: [[30, 58, 0, 'G', 'light'], [66, 64, 50, 'D', 'on']],
            arrows: [{ p: [[88, 8], [88, 30]], kind: 'ball' }], ball: [88, 36]
          },
          {
            caption: ['LE CORPS TOURNE', 'AUTOUR DE CET APPUI'],
            feet: [[30, 58, -10, 'G', 'light'], [66, 64, 30, 'D', 'on']],
            arrows: [{ p: [[50, 90], [90, 62]], kind: 'turn', arc: 12 }], ball: [88, 36]
          },
          {
            caption: ['L’AUTRE PIED RECULE,', 'REPLACEMENT'],
            feet: [[32, 80, -10, 'G', 'on'], [66, 62, 20, 'D', 'light']],
            arrows: [{ p: [[30, 46], [31, 60]], kind: 'move' }]
          }
        ]
      }
    },
    {
      id: 'ac-j12', theme: 'educatif', source: SRC, refs: REF,
      title: 'Atterrir devant', original: 'Transfert vers l’avant',
      objective: 'Attaquer une balle flottante en frappant en suspension, le corps lancé vers l’avant.',
      steps: [
        'Le coach envoie au panier une balle haute et lente à mi-court.',
        'Avancer vers la balle, ancrer le pied arrière (appui extérieur), pousser vers le haut et l’avant.',
        'Frapper en suspension ; le corps continue d’avancer.',
        'Retomber sur le pied avant, au-delà du point d’impact, et poursuivre vers le filet.'
      ],
      score: '7 attaques sur 10 dans la zone, avec une réception devant le point d’impact.',
      tip: 'Chaque pas vers la balle ajoute de la vitesse à la raquette : c’est l’élan du corps qui frappe.',
      keys: [
        'Ancrage sur l’appui extérieur, puis propulsion : le centre de gravité part vers l’avant.',
        'Contact en suspension ; réception sur le pied avant, au-delà du point de contact.',
        'Pour viser long de ligne avec précision : frapper dans la foulée, hanches et tronc tournent moins.'
      ],
      variants: ['Dans la foulée : pousser sur l’appui extérieur, la jambe libre passe devant, réception sur l’autre pied, course vers le filet.', 'Enchaîner avec une volée de finition.'],
      coups: ['coup-droit'], axes: ['attaque', 'deplacement', 'equilibre'],
      equipment: BR, players: [1, 4], space: 'complet', duration: [6, 8, 10], intensity: 2,
      diagram: {
        zones: [['R.back.bot', 'soft']],
        players: [[0.6, 6.4, 1, 'J'], coach(17, 4.2)],
        marks: [['basket', 17, 2.4]],
        shots: [
          { p: [[16.4, 4.4], [7, 6.9]], kind: 'throw', arc: -2.2, tone: 'deep' },
          { p: [[1.4, 6.5], [5.6, 6.9]], kind: 'move' },
          { p: [[6.6, 7.1], [21.6, 8.4]] },
          { p: [[7, 6.2], [9.6, 5.8]], kind: 'move' }
        ],
        labels: [[5.4, 9, 'EN SUSPENSION', 'bubble']]
      }
    },
    {
      id: 'ac-j13', theme: 'educatif', source: SRC, refs: REF,
      title: 'Le décrochage', original: 'Décrochage arrière en diagonale',
      objective: 'Sur une balle longue et haute, reculer en diagonale et frapper en suspension sans perdre l’équilibre.',
      steps: [
        'Le coach envoie au panier une balle haute et profonde, côté coup droit.',
        'Reculer en diagonale, ancrer le pied arrière (appui extérieur) et pousser vers le haut.',
        'Frapper en suspension ; la jambe libre, levée devant, sert de point d’équilibre.',
        'Retomber sur la même jambe, puis revenir vers la ligne de fond. Séries de 6.'
      ],
      score: '5 balles sur 6 remises hautes et profondes, avec une réception stable sur un pied.',
      tip: 'Jouer bombé et croisé : cette frappe sert à neutraliser, pas à attaquer.',
      keys: [
        'Propulsion et réception sur le même appui : l’appui extérieur.',
        'La poussée est verticale : on pousse le sol vers le bas pour monter.',
        'La jambe libre sert de point de fixation pendant le contact en suspension.'
      ],
      variants: ['Balle très profonde : retomber sur la jambe avant en tournant de 180°.', 'Même travail côté revers.'],
      coups: ['coup-droit', 'revers'], axes: ['defense', 'profondeur', 'deplacement', 'equilibre'],
      equipment: BR, players: [1, 4], space: 'complet', duration: [6, 8, 10], intensity: 2,
      diagram: {
        zones: [['R.back.top', 'soft']],
        players: [[0.8, 6, 1, 'J'], coach()],
        marks: [basket()],
        shots: [
          { p: [[15.9, 5.7], [0.2, 8.6]], kind: 'throw', arc: 2.2, tone: 'deep' },
          { p: [[0.2, 6.6], [-1.3, 8.2]], kind: 'move' },
          { p: [[-0.7, 8.9], [21.4, 3]], arc: -2.4 }
        ],
        labels: [[5.2, 9.9, 'EN SUSPENSION', 'bubble']]
      }
    },
    {
      id: 'ac-j14', theme: 'educatif', source: SRC, refs: REF,
      title: 'Croiser, freiner', original: 'Pas croisé avec freinage sur deux appuis',
      objective: 'Jouer une balle très écartée dans la course, puis freiner en deux appuis pour repartir aussitôt.',
      steps: [
        'Le coach envoie au panier une balle très écartée, côté coup droit.',
        'Course vers la balle ; pousser sur le pied côté balle (appui extérieur) et frapper dans la foulée, hanches face au filet.',
        'L’autre pied passe devant le corps, se pose en travers de la course et freine.',
        'Le pied extérieur se pose plus loin et bloque : repartir tout de suite vers le centre. Séries de 6.'
      ],
      score: '5 balles sur 6 remises dans le court, avec un arrêt en deux appuis seulement.',
      tip: 'Cette frappe sert à rester dans le point : viser haut et croisé, puis penser au replacement.',
      keys: [
        'Propulsion à partir de l’appui extérieur, en appuis ouverts.',
        'Le pied intérieur croise devant le corps et s’oriente perpendiculairement à la course : c’est lui qui freine.',
        'Blocage sur l’appui extérieur, puis replacement : freiner fait partie du coup.'
      ],
      variants: ['Revers à deux mains : dernier grand pas sur le côté, ancrage sur la jambe avant, puis la jambe arrière passe sur le côté pour freiner.', 'Un plot au centre à rejoindre avant la balle suivante.'],
      coups: ['coup-droit', 'revers'], axes: ['defense', 'deplacement', 'equilibre'],
      equipment: BR, players: [1, 4], space: 'demi', duration: [6, 8, 10], intensity: 3,
      diagram: {
        note: NOTE_CD,
        frames: [
          {
            caption: ['L’APPUI EXTÉRIEUR', 'POUSSE : FRAPPE'],
            feet: [[22, 64, 30, 'G', 'air'], [56, 60, 50, 'D', 'on']],
            arrows: [{ p: [[36, 90], [74, 90]], kind: 'push' }], ball: [86, 28]
          },
          {
            caption: ['L’AUTRE PIED', 'CROISE DEVANT'],
            feet: [[34, 68, 50, 'D', 'light'], [66, 42, 15, 'G', 'air']],
            arrows: [{ p: [[14, 60], [50, 36]], kind: 'move', arc: -8 }]
          },
          {
            caption: ['IL SE POSE EN', 'TRAVERS ET FREINE'],
            feet: [[28, 72, 40, 'D', 'air'], [60, 46, 0, 'G', 'on']]
          },
          {
            caption: ['L’EXTÉRIEUR', 'BLOQUE, RETOUR'],
            feet: [[40, 46, 0, 'G', 'light'], [76, 62, 10, 'D', 'on']],
            arrows: [{ p: [[70, 90], [30, 90]], kind: 'push' }]
          }
        ]
      }
    },
    {
      id: 'ac-j15', theme: 'educatif', source: SRC, refs: REF,
      title: 'Saut latéral', original: 'Saut latéral et rééquilibration',
      objective: 'Se décaler d’un bond sur le côté et retomber en équilibre, prêt à frapper.',
      steps: [
        'Deux lignes au sol, écartées d’un grand pas. Départ sur un pied, sur la première ligne.',
        'Pousser sur ce pied (appui extérieur), se déplacer sur le côté et retomber sur le même pied, sur la seconde ligne.',
        'Tenir 2 secondes : genou fléchi, tête droite, bras libre en balancier.',
        'Ensuite raquette en main : le coach envoie une balle à la main, frappe pendant le saut. 6 sauts par jambe.'
      ],
      score: '5 réceptions sur 6 tenues 2 secondes sans reposer l’autre pied.',
      tip: 'Si l’équilibre se perd, chercher le réglage qui manque : appuis, hauteur du bassin, aplomb ou bras libre.',
      keys: [
        'Ancrage et propulsion sur l’appui extérieur, déplacement latéral du centre de gravité, réception sur ce même appui.',
        'Le saut latéral sert à s’ajuster à la balle, à absorber son élan, ou les deux.',
        'L’équilibre du tennis est dynamique : il se reconstruit à chaque appui, à chaque frappe, à chaque replacement.'
      ],
      variants: ['Bras tendus devant, ou une balle tenue à deux mains au-dessus de la tête : l’équilibre devient plus difficile.', 'Saut vers l’avant, avec la même réception tenue.'],
      coups: ['coup-droit', 'revers'], axes: ['equilibre', 'deplacement'],
      equipment: ['balles', 'raquettes', 'lignes'], players: [1, 6], space: 'hors', duration: [5, 6, 8], intensity: 2,
      diagram: {
        note: NOTE_CD,
        frames: [
          {
            caption: ['APPUI EXTÉRIEUR :', 'POUSSER'],
            feet: [[14, 48, 0, 'G', 'air'], [32, 62, 20, 'D', 'on']],
            lines: [[32, 20, 32, 94, 1], [74, 20, 74, 94, 1]],
            arrows: [{ p: [[40, 90], [66, 90]], kind: 'push' }]
          },
          {
            caption: ['LE CORPS', 'SE DÉCALE'],
            feet: [[36, 48, 0, 'G', 'air'], [54, 60, 20, 'D', 'air']],
            lines: [[32, 20, 32, 94, 1], [74, 20, 74, 94, 1]],
            arrows: [{ p: [[34, 84], [72, 84]], kind: 'move', arc: -10 }]
          },
          {
            caption: ['RÉCEPTION SUR LE', 'MÊME PIED : TENIR'],
            feet: [[56, 48, 0, 'G', 'air'], [74, 62, 20, 'D', 'on']],
            lines: [[32, 20, 32, 94, 1], [74, 20, 74, 94, 1]],
            ball: [92, 30]
          }
        ]
      }
    },
    {
      id: 'ac-j16', theme: 'educatif', source: SRC, refs: REF,
      title: 'Du sol à la balle', original: 'Lancers de médecine-ball',
      objective: 'Sentir, médecine-ball en main, comment les jambes fabriquent l’élan de la frappe.',
      steps: [
        'Par deux, à 4 m, de profil. Lancer le médecine-ball sur le côté, comme un coup droit ou un revers à deux mains.',
        'Appuis en ligne : simple transfert d’un pied sur l’autre, puis avec un pas vers l’avant, puis après un pas chassé rapide.',
        'Appuis ouverts : poussée vers le haut depuis l’arrêt, puis précédée d’une flexion rapide, puis après un déplacement.',
        '5 lancers par étape et par côté. Passer à l’étape suivante quand la réception est stable.'
      ],
      score: 'Réception stable, sans pas de rattrapage, sur 4 lancers sur 5.',
      tip: 'L’élan élastique se perd vite : enchaîner la flexion et la poussée sans temps mort.',
      keys: [
        'Appuis en ligne : l’élan est surtout linéaire, le corps avance. Chaque pas vers l’avant en ajoute.',
        'Appuis ouverts : la poussée est verticale et l’élan vient de la rotation du tronc.',
        'La flexion rapide avant la poussée met les muscles en tension ; ils rendent cette énergie si la poussée suit aussitôt.'
      ],
      variants: ['Stabilité : tenir la fin du lancer, bras tendus devant, jambe arrière derrière le corps.', 'Sans médecine-ball : mêmes étapes en geste à vide, puis avec une balle envoyée à la main.'],
      coups: ['coup-droit', 'revers'], axes: ['equilibre'],
      equipment: [], eqNote: 'Médecine-ball léger', players: [2, 6], space: 'hors', duration: [8, 10, 12], intensity: 2,
      diagram: {
        note: NOTE_CD,
        frames: [
          {
            caption: ['APPUIS EN LIGNE :', 'LE CORPS AVANCE'],
            feet: [[36, 74, 80, 'D', 'on'], [54, 42, 45, 'G', 'light']],
            arrows: [{ p: [[78, 86], [78, 48]], kind: 'push' }]
          },
          {
            caption: ['APPUIS OUVERTS :', 'POUSSER HAUT, TOURNER'],
            feet: [[32, 58, 0, 'G', 'light'], [66, 62, 30, 'D', 'on']],
            arrows: [{ p: [[48, 90], [88, 60]], kind: 'turn', arc: 12 }]
          }
        ]
      }
    },

    /* =====================================================================
       5. REPLACEMENT
       ===================================================================== */
    {
      id: 'ac-j17', theme: 'educatif', source: SRC, refs: REF,
      title: 'Replacement chassé', original: 'Premier pas de replacement en pas chassé',
      objective: 'Lancer son replacement par un pas chassé explosif, avant même que sa balle ait rebondi en face.',
      steps: [
        'Un plot à 2 m du centre, côté coup droit. Le coach envoie au panier vers le plot.',
        'Frapper, puis pousser sur le pied côté couloir (appui extérieur) : les pieds se rejoignent en l’air.',
        'Retomber appuis écartés, hanches et épaules face au filet, avant le rebond de sa balle en face.',
        'Arriver au centre et faire un saut d’allègement quand le coach frappe la balle suivante. Séries de 6.'
      ],
      score: '5 replacements sur 6 lancés avant le rebond (un partenaire annonce « avant » ou « après »).',
      tip: 'Le replacement ne dépend d’aucune information extérieure : c’est la partie du jeu que le joueur maîtrise à 100 %.',
      keys: [
        'Poussée latérale à partir de l’appui extérieur, buste vertical et équilibré.',
        'Reprise de contact sur l’appui extérieur, puis pose de l’autre pied, appuis bien écartés.',
        'C’est le replacement le plus utilisé : la plupart des déplacements font moins de 2,50 m.'
      ],
      variants: ['Le coach varie le temps entre deux balles : le replacement finit toujours par un saut d’allègement.', 'Même travail côté revers.'],
      coups: ['coup-droit', 'revers'], axes: ['deplacement', 'regularite'],
      equipment: BRP, players: [1, 6], space: 'demi', duration: [6, 8, 10], intensity: 2,
      diagram: {
        note: NOTE_BACK,
        frames: [
          {
            caption: ['L’APPUI EXTÉRIEUR', 'POUSSE'],
            feet: [[40, 60, 0, 'G', 'light'], [72, 62, 10, 'D', 'on']],
            arrows: [{ p: [[70, 90], [38, 90]], kind: 'push' }]
          },
          {
            caption: ['LES PIEDS SE', 'REJOIGNENT EN L’AIR'],
            feet: [[38, 60, 0, 'G', 'air'], [56, 60, 5, 'D', 'air']],
            arrows: [{ p: [[66, 90], [36, 90]], kind: 'move' }]
          },
          {
            caption: ['RETOMBER ÉCARTÉ,', 'FACE AU FILET'],
            feet: [[18, 62, -5, 'G', 'light'], [58, 62, 5, 'D', 'on']]
          }
        ]
      }
    },
    {
      id: 'ac-j18', theme: 'educatif', source: SRC, refs: REF,
      title: 'Replacement croisé', original: 'Premier pas de replacement en pas croisé',
      objective: 'Couvrir plus de terrain au replacement grâce à un pas croisé explosif, épaules face au jeu.',
      steps: [
        'Deux plots : un à 3 m du centre, côté coup droit (frappe), un au centre (arrivée).',
        'Geste à vide au premier plot, raquette reprise à deux mains. Pousser sur la jambe côté couloir, puis la faire passer devant le corps.',
        'L’autre pied pousse à son tour et se pose plus loin sur le côté. Les épaules restent face au filet.',
        'Repérer la distance couverte par ce pas croisé et chercher à l’allonger. Ensuite avec une balle envoyée au panier.'
      ],
      score: 'Centre rejoint en un pas croisé et deux pas chassés, 5 fois sur 6, épaules face au filet.',
      tip: 'Le bas du corps part sur le côté, le haut reste tourné vers l’adversaire : c’est cette dissociation qu’il faut entraîner.',
      keys: [
        'Le pas croisé remplace le pas chassé quand le temps presse : il couvre plus de distance.',
        'Poussée explosive : chercher de la distance à chaque appui.',
        'Équilibre vertical conservé, raquette tenue à deux mains.'
      ],
      variants: ['Dissociation : un partenaire au filet montre des doigts, à annoncer pendant le pas croisé.', 'Départ après une vraie frappe en bout de course.'],
      coups: ['coup-droit', 'revers'], axes: ['deplacement', 'defense'],
      equipment: BRP, players: [1, 6], space: 'demi', duration: [6, 8, 10], intensity: 3,
      diagram: {
        note: NOTE_BACK,
        frames: [
          {
            caption: ['POUSSER SUR LA', 'JAMBE EXTÉRIEURE'],
            feet: [[44, 62, 0, 'G', 'light'], [74, 64, 10, 'D', 'on']],
            arrows: [{ p: [[72, 92], [38, 92]], kind: 'push' }]
          },
          {
            caption: ['ELLE PASSE', 'DEVANT LE CORPS'],
            feet: [[50, 68, 0, 'G', 'on'], [30, 42, -20, 'D', 'air']],
            arrows: [{ p: [[80, 56], [46, 36]], kind: 'move', arc: -8 }]
          },
          {
            caption: ['L’AUTRE PIED SE POSE', 'PLUS LOIN'],
            feet: [[12, 66, 0, 'G', 'light'], [42, 48, -15, 'D', 'on']],
            arrows: [{ p: [[52, 88], [20, 88]], kind: 'move' }],
            labels: [[58, 14, 'FACE AU FILET', 'plainStrong']]
          }
        ]
      }
    },
    {
      id: 'ac-j19', theme: 'educatif', source: SRC, refs: REF,
      title: 'Le temps que je me donne', original: 'Choisir son replacement',
      objective: 'Relier la trajectoire que l’on joue au temps dont on dispose pour se replacer, et choisir son premier pas.',
      steps: [
        'Le coach envoie au panier une balle écartée et annonce « haut » ou « tendu » avant la frappe.',
        '« Haut » : balle bombée croisée. Il y a du temps : replacement en pas chassés.',
        '« Tendu » : frappe appuyée long de ligne. Le temps manque : pas croisé, ou pas courus depuis une position très éloignée.',
        'Dans tous les cas, être revenu face au jeu pour le saut d’allègement quand le coach frappe la balle suivante.'
      ],
      score: '6 replacements sur 8 terminés par un saut d’allègement au bon moment.',
      tip: 'En pas courus, hanches et épaules se tournent vers le centre, mais la tête reste tournée vers le filet.',
      keys: [
        'Pas chassé : peu de pression. Pas croisé : pression moyenne. Pas courus : forte pression ou position très éloignée.',
        'Une balle jouée long de ligne arrive plus tôt chez l’adversaire (environ un dixième de seconde) : c’est autant de temps en moins pour se replacer.',
        'Le replacement finit toujours face au jeu, par un saut d’allègement.'
      ],
      variants: ['Le joueur choisit sa trajectoire et annonce son replacement.', 'Le coach rejoue vraiment la balle : le point continue.'],
      coups: ['coup-droit', 'revers'], axes: ['deplacement', 'decision', 'marge'],
      equipment: BR, players: [1, 4], space: 'complet', duration: [8, 10, 12], intensity: 2,
      diagram: {
        players: [[0.4, 9, 1, 'J'], coach()],
        marks: [basket()],
        shots: [
          { p: [[1.2, 8.8], [21.2, 3]], arc: -2.4 },
          { p: [[1.2, 9.3], [22.2, 8.9]], tone: 'deep' },
          { p: [[-0.4, 8.2], [-0.8, 6]], kind: 'move' }
        ],
        labels: [[8.6, 2.3, 'HAUT : J’AI DU TEMPS', 'tag'], [13.4, 10.3, 'TENDU : JE N’EN AI PAS', 'dark']]
      }
    },

    /* =====================================================================
       SITUATIONS SPÉCIFIQUES
       ===================================================================== */
    {
      id: 'ac-j20', theme: 'educatif', source: SRC, refs: REF,
      title: 'Pieds ressorts', original: 'Réactivité du pied',
      objective: 'Rendre les appuis réactifs : des contacts au sol très courts, qui renvoient le corps comme un ressort.',
      steps: [
        'Le long d’une ligne du terrain : petits rebonds sur l’avant des pieds, jambes presque tendues, 10 secondes.',
        'Impulsions latérales : sauter d’un côté à l’autre de la ligne, pieds joints, puis d’un pied sur l’autre, 10 secondes.',
        'Au signal du coach, qui montre un côté : démarrage sur 3 m.',
        '4 à 6 répétitions, 30 secondes de récupération entre chacune.'
      ],
      score: 'Des contacts brefs et légers pendant les 10 secondes (le coach écoute le bruit des appuis).',
      tip: 'Si le pied s’écrase au sol, l’énergie est perdue : sauter moins haut, repartir plus vite.',
      keys: [
        'Cycle étirement-détente rapide : moins d’un quart de seconde au sol, c’est un travail de pied et de cheville.',
        'C’est ce cycle rapide qui sert dans le jeu de jambes et la reprise d’appuis.',
        'L’énergie élastique n’est rendue que si la poussée suit immédiatement la réception.'
      ],
      variants: ['Rebonds sur une jambe.', 'Finir par un saut d’allègement et une reprise d’appuis orientée du côté montré.'],
      coups: [], axes: ['reaction', 'deplacement'],
      equipment: ['chrono'], players: [1, 8], space: 'hors', duration: [4, 5, 6], intensity: 3,
      diagram: {
        note: 'Vu de dessus : le trait est une ligne du terrain.' + FEET,
        frames: [
          {
            caption: ['REBONDS SUR', 'L’AVANT DES PIEDS'],
            feet: [[40, 54, 0, 'G', 'on'], [60, 54, 0, 'D', 'on']],
            lines: [[18, 76, 82, 76]],
            labels: [[50, 89, 'CONTACTS BREFS', 'plainStrong']]
          },
          {
            caption: ['IMPULSIONS', 'LATÉRALES'],
            feet: [[20, 58, 0, 'G', 'air'], [38, 58, 0, 'D', 'air']],
            lines: [[50, 18, 50, 94]],
            arrows: [{ p: [[34, 36], [70, 36]], kind: 'move', arc: -9 }, { p: [[70, 86], [34, 86]], kind: 'move', arc: 9 }]
          },
          {
            caption: ['AU SIGNAL :', 'DÉMARRAGE'],
            feet: [[28, 62, 15, 'G', 'on'], [56, 54, 60, 'D', 'air']],
            arrows: [{ p: [[42, 90], [84, 86]], kind: 'push' }]
          }
        ]
      }
    },
    {
      id: 'ac-j21', theme: 'educatif', source: SRC, refs: REF,
      title: 'Coup droit, revers !', original: 'Jeu réduit dans un carré',
      objective: 'Réagir vite et s’organiser sur le premier appui, dans un petit terrain où la balle revient très tôt.',
      steps: [
        'Par deux, face à face, chacun dans un seul carré de service.',
        'Échange en contrôle : chacun alterne obligatoirement un coup droit et un revers, quelle que soit la balle reçue.',
        'Saut d’allègement avant chaque frappe adverse, replacement après chaque coup.',
        'Chercher le plus long échange en 2 minutes, puis changer de partenaire.'
      ],
      score: 'Un échange de 12 frappes en respectant l’alternance.',
      tip: 'Petit terrain, grande pression de temps : c’est le premier appui qui fait la différence.',
      keys: [
        'La distance réduite entre les joueurs augmente la pression de temps : il faut réagir vite et s’organiser vite.',
        'L’alternance imposée oblige à se décaler à chaque balle.',
        'Le bon moment du saut d’allègement ne s’apprend qu’en situation de jeu.'
      ],
      variants: ['Dans les deux carrés : une zone à viser marquée de chaque côté, zone courte près du filet interdite.', 'En points : 1 point si l’adversaire se trompe de coup.'],
      coups: ['coup-droit', 'revers'], axes: ['reaction', 'deplacement', 'toucher', 'regularite'],
      equipment: BR, players: [2, 8], space: 'mini', duration: [6, 8, 10], intensity: 2,
      diagram: {
        zones: [['L.box.bot', 'soft'], ['R.box.bot', 'soft']],
        players: [[7.2, 7.5, 1, 'J1'], [16.6, 7.5, 2, 'J2']],
        shots: [
          { p: [[8.2, 6.8], [15.6, 6.8]], kind: 'rally' },
          { p: [[8.2, 8.4], [15.6, 8.4]], kind: 'rally' }
        ],
        labels: [[N, 3.4, 'COUP DROIT · REVERS · COUP DROIT…', 'tag']]
      }
    },
    {
      id: 'ac-j22', theme: 'educatif', source: SRC, refs: REF,
      title: 'Monter, s’alléger', original: 'Volée d’approche',
      objective: 'En montant au filet, placer son saut d’allègement au bon moment et repartir vers la balle pour la première volée.',
      steps: [
        'Départ sur la ligne de fond. Le joueur joue une balle d’approche envoyée par le coach, puis avance.',
        'Quand la raquette du coach accélère pour le passing : saut d’allègement, quel que soit l’endroit atteint.',
        'Reprise d’appuis orientée vers la balle, première volée basse jouée fléchi, pied avant au sol à l’impact.',
        'Continuer d’avancer pour la volée de finition, jouée au-dessus du filet. Séries de 5.'
      ],
      score: '4 premières volées sur 5 remises longues, après un saut d’allègement au bon moment.',
      tip: 'On ne court pas « à travers » la frappe adverse : on s’allège, on lit, on repart.',
      keys: [
        'L’information se prend en suspension ; la reprise d’appuis est déjà orientée vers la zone de frappe.',
        'Première volée, souvent sous le niveau du filet : position fléchie, appui avant ancré à l’impact, le corps continue d’avancer.',
        'Volée de finition : poussée de la jambe arrière, réception sur le pied avant après l’impact.'
      ],
      variants: ['Enchaînement service-volée.', 'Le coach joue parfois un lob : même saut d’allègement, puis recul.'],
      coups: ['volee'], axes: ['filet', 'reaction', 'deplacement', 'equilibre'],
      equipment: BR, players: [1, 4], space: 'complet', duration: [8, 10, 12], intensity: 2,
      diagram: {
        zones: [['R.back.top', 'soft']],
        players: [[-1.2, 5.5, 1, 'J'], coach(22.6, 6.4)],
        marks: [basket(22.6, 6.4)],
        shots: [
          { p: [[-0.4, 5.6], [5.6, 6]], kind: 'move' },
          { p: [[21.9, 6.5], [8.6, 7.4]], tone: 'deep' },
          { p: [[8.6, 7], [21.4, 3.2]] },
          { p: [[8, 6.4], [10.2, 5.8]], kind: 'move' }
        ],
        labels: [[5.4, 3.6, 'HOP !', 'bubble']]
      }
    },
    {
      id: 'ac-j23', theme: 'educatif', source: SRC, refs: REF,
      title: 'Retour : l’appui intérieur', original: 'Jeu de jambes au retour',
      objective: 'Au retour, s’alléger au bon moment puis pousser vers la balle à partir du pied le plus proche d’elle.',
      steps: [
        'Le serveur sert à vitesse moyenne depuis la ligne de service, au hasard côté coup droit ou côté revers.',
        'Le relanceur s’allège quand la raquette du serveur accélère et retombe sur des appuis écartés.',
        'Le poids passe sur le pied côté balle (appui intérieur), qui pousse vers la balle : retour bloqué devant soi.',
        'Réception, freinage, retour face au jeu. Un observateur suit la grille et compte un point par temps réussi.'
      ],
      score: '5 retours sur 8 notés au moins 5 sur 7 par l’observateur.',
      tip: 'Tout le jeu de jambes tient ici en moins d’une seconde : lecture en l’air, appuis orientés, poussée, freinage.',
      keys: [
        'Grille en 7 temps : position de départ, allègement, reprise d’appuis, transfert sur l’appui intérieur, propulsion à partir de cet appui, réception, freinage et replacement face au jeu.',
        'L’allègement se règle sur l’accélération de la raquette du serveur.',
        'La poussée part de l’appui intérieur : on va vers la balle, on ne l’attend pas.'
      ],
      variants: ['Le serveur recule peu à peu jusqu’à la ligne de fond.', 'Seconde balle : avancer d’un pas avant l’allègement.'],
      coups: ['retour'], axes: ['reaction', 'deplacement', 'equilibre'],
      equipment: BR, players: [2, 4], space: 'complet', duration: [8, 10, 12], intensity: 2,
      diagram: {
        zones: [['L.box.bot', 'soft']],
        players: [[-0.6, 8, 1, 'R'], [SR, 3.8, 2, 'S']],
        shots: [
          { p: [[17.6, 4], [7.4, 6.1]], tone: 'deep' },
          { p: [[17.6, 4.2], [7, 8.9]], tone: 'deep' },
          { p: [[0.1, 7.4], [1.5, 6.5]], kind: 'move' },
          { p: [[0.1, 8.6], [1.5, 9.5]], kind: 'move' }
        ],
        labels: [[2.6, 5.4, 'HOP !', 'bubble']]
      }
    }
  );

  AC.CARDS.forEach(function (c) { if (c.id.indexOf('ac-j') === 0) c.drawWeight = DRAW_WEIGHT; });
})();
