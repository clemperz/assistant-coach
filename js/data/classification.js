/* ==========================================================================
   Assistant Coach — Classification par thèmes de travail
   Chargé APRÈS tous les paquets de cartes.

   1. AC.AXE_FAMILIES : les familles de thèmes.
   2. AC.AXE_INFO     : la fiche de chaque thème (définition, repères, sources).
   3. Le classement : chaque carte reçoit ses thèmes dans `card.axes`.
      Les axes déjà saisis sur la carte sont gardés ; « début de point » et
      « échange de fond de court » se déduisent des coups ; les autres thèmes
      sont attribués carte par carte (ASSIGN), avec retraits dans AC.CLASSIF.

   Sources des fiches :
   - Hinkle, The Book On Tennis Strategy (TennisTactics.com)
   - Ravilly, Tennis, les fondamentaux tactiques (Amphora, 2022)
   - Wardlaw, Pressure Tennis
   - Genevois, cours de biomécanique (BIOMEC, coups de fond de court, jeu de jambes)
   - Martin, Tennis – Optimisation de la performance
   - FFT, « Différentes catégories d'exercices d'entraînement »
   - ITF Coaching & Sport Science Review (situations de jeu et intentions tactiques)
   ========================================================================== */
window.AC = window.AC || {};

(function () {
  var HINKLE = 'Hinkle, The Book On Tennis Strategy';
  var RAVILLY = 'Ravilly, Les fondamentaux tactiques';
  var WARDLAW = 'Wardlaw, Pressure Tennis';
  var GENEVOIS = 'Genevois, biomécanique';
  var MARTIN = 'Martin, Optimisation de la performance';
  var ITF = 'ITF Coaching & Sport Science Review';

  AC.AXE_FAMILIES = [
    { id: 'situations', label: 'Situations de jeu', hint: 'Où en est le point : au service, au retour, au fond, au filet, face au joueur qui monte.' },
    { id: 'intentions', label: 'Intentions tactiques', hint: 'Ce que je cherche à faire avec la balle : défendre, construire, attaquer, conclure.' },
    { id: 'balle', label: 'Qualité et placement de la balle', hint: 'Les réglages de la trajectoire : régularité, profondeur, direction, hauteur, effet.' },
    { id: 'physique', label: 'Physique et motricité', hint: 'Se déplacer, réagir, s’équilibrer, tenir le rythme.' },
    { id: 'mental', label: 'Mental et décision', hint: 'Jouer sous pression, choisir, rester dans son plan.' }
  ];

  AC.AXE_INFO = {
    /* ------------------------- Situations de jeu ------------------------- */
    'debut-point': {
      family: 'situations', tag: 'Début de point', label: 'Début de point : service, retour, +1',
      short: 'Les 4 premières balles : service, retour, puis la première frappe de chacun.',
      detail: 'Le point commence presque toujours par un rapport de force déséquilibré : le serveur part avec l’avantage, le relanceur en défense. Les quatre premières balles (service, retour, balle 3 du serveur, balle 4 du relanceur) sont les plus décisives et, à tous les niveaux, la plupart des points s’y terminent. C’est la phase la moins entraînée dans les jeux de fond de court classiques.',
      points: [
        'S’entraîner en combinaisons (service + balle 3, retour + balle 4), pas en coups isolés.',
        'Ouverture sûre : servir sur le côté faible, puis jouer croisé dans le tiers central.',
        'Servir avec une intention : 4 services sur 5 sur le côté faible, 1 sur 5 pour surprendre.',
        'Seconde balle : viser 17 réussies sur 20 sous pression ; ne pas se placer au centre pour servir.',
        'Les points décisifs (30-40, avantages) se jouent côté avantage : y avoir une ouverture rodée.'
      ],
      sources: [HINKLE, WARDLAW, RAVILLY]
    },
    'sit-fond': {
      family: 'situations', tag: 'Fond de court', label: 'Échange de fond de court',
      short: 'Les deux joueurs au fond : tenir, déplacer, attendre la bonne balle.',
      detail: 'C’est la situation où se joue la majorité des frappes. On y construit avec une balle « neutre » : assez forte pour empêcher l’adversaire d’attaquer, sans risque excessif. À haut niveau, plus de 80 % des balles de fond de court tombent au-delà du carré de service.',
      points: [
        'Repère de la balle neutre : elle monte encore en passant la ligne de fond adverse.',
        'Le tennis se joue d’abord « droit devant » : viser le mur de 8 m de la ligne de fond adverse.',
        'Le croisé est le coup de base (terrain plus long, filet plus bas) ; il crée les occasions.',
        'Se replacer après chaque frappe : le replacement est contrôlé à 100 % par le joueur.'
      ],
      sources: [HINKLE, GENEVOIS, WARDLAW]
    },
    'filet': {
      family: 'situations', tag: 'Jeu au filet', label: 'Montée et jeu au filet',
      short: 'Je monte ou je suis au filet : approche, volées, smash.',
      detail: 'Monter doit rester un choix : on avance derrière une balle qui met l’adversaire en difficulté, on joue une première volée de transition, puis on conclut. On distingue la volée d’approche (souvent basse, jouée du dernier tiers du carré) et la volée de finition (proche du filet et au-dessus de la bande).',
      points: [
        'Approcher long de ligne ou droit devant soi, de préférence avec une balle rasante.',
        'Première volée profonde et basse (angle 1), volée de conclusion courte et large (angle 2).',
        'Volée haute : court et croisé. Volée basse : amortie ou devant soi.',
        'Allègement à chaque frappe adverse, puis transfert vers l’avant ; au smash, réception en ciseau.'
      ],
      sources: [RAVILLY, HINKLE, GENEVOIS]
    },
    'sit-passing': {
      family: 'situations', tag: 'Face au filet', label: 'Face au joueur au filet',
      short: 'L’adversaire monte : passing, lob, balle dans les pieds.',
      detail: 'Face à un joueur qui monte, on cherche d’abord à lui faire jouer une volée difficile (dans les pieds, sur le revers), puis à passer ou lober. Le lob ouvre l’espace devant le volleyeur, la balle basse ouvre l’espace derrière lui.',
      points: [
        'Sans ouverture évidente : passing croisé, de préférence sur le revers adverse.',
        'En deux temps : une balle basse qui fait remonter la volée, puis le passing ou le lob.',
        'Le lob est sous-utilisé, surtout en extérieur.',
        'Celui qui remonte une volée est en danger : jouer bas.'
      ],
      sources: [RAVILLY, WARDLAW]
    },

    /* ------------------------ Intentions tactiques ------------------------ */
    'defense': {
      family: 'intentions', tag: 'Défense', label: 'Défendre et neutraliser',
      short: 'En difficulté : se redonner du temps et revenir en position neutre.',
      detail: 'En défense, on ne gagne pas le point : on « achète du temps » pour se replacer et revenir à égalité. La position décide de l’intention : à plus de 1,8 m derrière la ligne de fond, on défend.',
      points: [
        'Jouer haut, long et croisé (ou au centre) pour se donner le temps de se replacer.',
        'Une balle haute et profonde met deux fois plus de temps à arriver qu’une balle tendue.',
        'Viser encore plus au centre : c’est la meilleure protection contre la faute large.',
        'Appuis : décrochage vers l’arrière, propulsion et réception sur l’appui extérieur.'
      ],
      sources: [RAVILLY, HINKLE, GENEVOIS]
    },
    'construction': {
      family: 'intentions', tag: 'Construction', label: 'Construire le point',
      short: 'Améliorer sa position coup après coup jusqu’à obtenir la balle à attaquer.',
      detail: 'Comme aux échecs, la plupart des coups ne servent pas à finir le point mais à le faire progresser : tenir le centre, repousser l’adversaire, le déplacer. On construit derrière la ligne de fond avec des balles profondes en diagonale, jusqu’à recevoir une balle plus faible.',
      points: [
        'Gagner la bataille de la profondeur : celui qui joue le plus souvent long gagne le droit d’avancer.',
        'Un long de ligne joué du fond doit être décisif ; sinon, jouer croisé.',
        'C’est la balle croisée (outside) lourde et profonde qui provoque la balle à attaquer.',
        'Construire de l’intérieur : gagner d’abord le duel des couloirs centraux.'
      ],
      sources: [HINKLE, WARDLAW, RAVILLY]
    },
    'attaque': {
      family: 'intentions', tag: 'Attaque', label: 'Presser et attaquer',
      short: 'Prendre le temps à l’adversaire : avancer, prendre la balle tôt, changer de direction.',
      detail: 'Attaquer, c’est d’abord « voler du temps » à l’adversaire. Avancer d’un mètre dans le terrain lui retire environ 6 centièmes de seconde, jouer long de ligne plutôt qu’en diagonale encore un dixième. Dans le terrain, on cherche un coup qui met en difficulté, pas forcément un coup gagnant : c’est le premier temps d’une séquence d’au moins deux coups.',
      points: [
        'Avancer d’un ou deux mètres dès que l’on est en position d’attaque.',
        'Changer de direction quand la balle s’y prête : balle inside, ou pieds dans le terrain.',
        'Rester imprévisible : varier long de ligne et croisé, long et court.',
        'Jambes : transfert vers l’avant, jambe arrière qui pousse, jambe avant qui stabilise.'
      ],
      sources: [RAVILLY, HINKLE, GENEVOIS, WARDLAW]
    },
    'conclusion': {
      family: 'intentions', tag: 'Conclusion', label: 'Conclure',
      short: 'Finir le point quand il doit l’être : volée, smash, balle courte.',
      detail: 'Près du filet, le point doit se terminer. Inutile de viser les lignes : des balles fermes vers de grandes cibles suffisent, parce que l’adversaire manque de temps. Beaucoup de points « offerts » se perdent ici, faute de les avoir répétés.',
      points: [
        'À partir du milieu du carré de service, on est en zone de conclusion.',
        'Plus on joue large, plus il faut jouer court : l’angle 2 se joue sur balle haute.',
        'Sur la balle courte : travailler la course vers l’avant jusqu’à la balle.',
        'Le smash : préparation directe, tronc vertical à l’impact, réception en ciseau.'
      ],
      sources: [WARDLAW, HINKLE, GENEVOIS]
    },
    'schemas': {
      family: 'intentions', tag: 'Schémas', label: 'Schémas et enchaînements',
      short: 'Enchaîner ses coups selon un plan : motifs, séquences, ouvertures.',
      detail: 'Un match se gagne par enchaînements de coups, alors que la plupart des exercices travaillent des coups isolés. Un schéma peut être réactif (« si la balle arrive ici, je joue là ») ou planifié (une cadence de cibles décidée à l’avance). Le joueur qui varie le plus ses schémas d’attaque gagne plus souvent.',
      points: [
        'Les 4 cadences : 1-1 (écarter), 1-2 (contre-pied), 2-1 (créer l’ouverture), 3-1 (isoler).',
        'Séquences imposées : on compte les séquences réussies, pas les points gagnés.',
        'Puis points avec zones marquées, puis matchs où l’on choisit son cadre mentalement.',
        'Choisir un cadre dont on peut réellement toucher les cibles, et s’y tenir.'
      ],
      sources: [HINKLE, RAVILLY]
    },

    /* ----------------- Qualité et placement de la balle ----------------- */
    'regularite': {
      family: 'balle', tag: 'Régularité', label: 'Régularité',
      short: 'Remettre une balle de plus, avec la même qualité.',
      detail: 'Aux niveaux amateurs, les points se terminent surtout sur des fautes directes : la première stratégie gagnante est de ne pas perdre le point. La régularité se mesure (nombre de frappes, de cibles touchées) et se développe par surcharge progressive : battre son propre record.',
      points: [
        'Mesurer, suivre, améliorer : record + 1.',
        'Compter aussi la qualité : seules les balles au-delà de la ligne de service comptent.',
        'Au panier, séries d’environ 4 frappes : au-delà de 6 à 8, la qualité se dégrade.'
      ],
      sources: [HINKLE, MARTIN]
    },
    'profondeur': {
      family: 'balle', tag: 'Profondeur', label: 'Profondeur',
      short: 'Jouer long pour repousser l’adversaire et l’empêcher d’attaquer.',
      detail: 'Dans chaque point se joue un tir à la corde inversé : qui jouera le plus souvent profond ? Une balle longue maintient l’adversaire en défense ou en position neutre ; s’il attaque de loin, il prend des risques et ses balles raccourcissent.',
      points: [
        'Premier objectif : toutes les balles au-delà de la ligne de service, puis reculer la cible.',
        'Une balle perd 30 à 50 % de sa vitesse au rebond : plus elle vole longtemps, plus elle arrive vite.',
        'La hauteur donne la profondeur : jouer avec de la marge au-dessus du filet.',
        'Faute longue : garder la vitesse et ajouter du lift.'
      ],
      sources: [HINKLE, GENEVOIS]
    },
    'precision': {
      family: 'balle', tag: 'Précision', label: 'Précision et zones',
      short: 'Toucher des cibles assez grandes pour être touchées souvent.',
      detail: 'Le contrôle de balle n’est pas un don : il se mesure, puis se développe. Viser un plot apprend à viser une cible que l’on ne peut pas toucher de façon répétée ; il vaut mieux le considérer comme le centre d’une zone plus large.',
      points: [
        'Des cibles larges : zones à trois pas des lignes, couloirs, moitiés de carré.',
        'La précision dépend de la vitesse : à pleine puissance, on revient aux grandes cibles.',
        'Compromis précision / vitesse : les mêmes principes se règlent différemment selon l’objectif.'
      ],
      sources: [HINKLE, WARDLAW, GENEVOIS]
    },
    'direction': {
      family: 'balle', tag: 'Directions', label: 'Directions : croisé, long de ligne',
      short: 'Choisir sa direction selon sa position : les couloirs du terrain.',
      detail: 'En diagonale, le terrain est plus long et le filet plus bas : le croisé est le coup le plus sûr. Le long de ligne fait courir et prend du temps, mais il est plus risqué. Les cadres à 2, 3 puis 4 couloirs aident à décider : la position des pieds choisit la cible.',
      points: [
        '2 couloirs : pieds derrière la ligne, croisé ; pieds dans le terrain, long de ligne.',
        '3 couloirs : le centre ferme le terrain, la diagonale l’ouvre.',
        '4 couloirs : viser le couloir d’où l’on frappe (B vers B) ; changer de direction droit devant.',
        'Jouer long de ligne retire environ un dixième de seconde à l’adversaire.'
      ],
      sources: [HINKLE, RAVILLY, GENEVOIS]
    },
    'inside-outside': {
      family: 'balle', tag: 'Inside / Outside', label: 'Règles inside / outside',
      short: 'Lire la balle par rapport à son corps pour savoir si l’on change de direction.',
      detail: 'Les « directionnelles » de Paul Wardlaw : on regarde où arrive la balle par rapport à son corps, puis on choisit la cible. Elles complètent les couloirs et donnent un tennis à haut pourcentage.',
      points: [
        'Balle outside (elle croise devant le corps) et profonde : on la rejoue croisé.',
        'Balle inside (elle arrive dans le corps) : feu vert pour changer de direction.',
        'Balle outside courte, pieds dans le terrain : changement à 90°, droit devant.'
      ],
      sources: [WARDLAW, HINKLE]
    },
    'marge': {
      family: 'balle', tag: 'Marge', label: 'Hauteur et marge de sécurité',
      short: 'Passer haut au-dessus du filet et loin des lignes.',
      detail: 'Le filet est une cause majeure de fautes directes, et il se combat en jouant plus haut. Les fautes ne se valent pas : la faute de filet révèle un défaut de geste, la faute large un mauvais choix, la faute longue une bonne intention à régler.',
      points: [
        'Double filet : une corde à 90 cm au-dessus de la bande ; balle neutre 1 à 1,8 m au-dessus du filet.',
        'Trois cibles contre la faute large : le mur de 8 m, la fenêtre de 4 m au filet, la sangle.',
        'Accorder la hauteur à la zone : très haut en défense, au-dessus de la corde en neutre, dessous en attaque.',
        'Compter double les fautes de filet et de largeur en jeu.'
      ],
      sources: [HINKLE, WARDLAW]
    },
    'variation': {
      family: 'balle', tag: 'Variations', label: 'Variations : effets, hauteur, amorti',
      short: 'Changer la balle que reçoit l’adversaire : effet, hauteur, longueur, vitesse.',
      detail: 'On peut varier une balle de cinq façons : longueur, largeur, hauteur, vitesse et effet. Trois trajectoires sont à maîtriser : la frappe appuyée (liftée ou à plat), le slice et la balle bombée. Aucune ne gagne un match seule : c’est leur combinaison qui compte.',
      points: [
        'Lift : frapper fort en restant dans le court ; il vient de la pronation de l’avant-bras.',
        'Slice : ralentir, garder la balle basse, monter au filet ; prise continentale indispensable.',
        'Balle bombée : repousser l’adversaire et le faire frapper haut.',
        'Amorti et lob : jouer aussi sur la longueur.'
      ],
      sources: [RAVILLY, HINKLE, GENEVOIS]
    },

    /* ----------------------- Physique et motricité ----------------------- */
    'deplacement': {
      family: 'physique', tag: 'Déplacement', label: 'Déplacement et replacement',
      short: 'Arriver à l’heure sur la balle, bien se placer, puis revenir.',
      detail: 'Le jeu de jambes suit un cycle de cinq temps : réaction, déplacement, placement, frappe, replacement. Près de 72 % des déplacements sont latéraux et la plupart sont courts : le tennis, c’est de l’explosivité sur le premier appui, puis du freinage.',
      points: [
        'Consacrer 60 à 80 % du travail de déplacement au latéral (aller et retour).',
        'Pas chassés sur courte distance, pas croisés puis pas courus quand le temps manque.',
        'Le replacement est une activité « fermée », contrôlée à 100 % par le joueur.',
        'Parcours courts : environ 4 changements de direction sur 2 à 5 m, 15 m au plus.'
      ],
      sources: [GENEVOIS, MARTIN, HINKLE]
    },
    'reaction': {
      family: 'physique', tag: 'Réaction', label: 'Réaction et prise d’information',
      short: 'Lire tôt, démarrer vite : saut d’allègement et premier appui.',
      detail: 'Le tennis est un sport d’information : plus que la vitesse de course, c’est le temps de réaction au démarrage qui compte. Le saut d’allègement permet de prendre l’information en l’air et de partir dès la reprise d’appuis.',
      points: [
        'Déclencher le saut pendant l’accélération de la raquette adverse.',
        'Réception sur l’appui extérieur (le pied le plus éloigné de la balle), qui pousse vers elle.',
        'Le timing ne se travaille qu’en situation de jeu, pas à vide.',
        'Exercices de réaction : efforts de moins de 4 secondes, récupération complète.'
      ],
      sources: [GENEVOIS, MARTIN, RAVILLY]
    },
    'equilibre': {
      family: 'physique', tag: 'Équilibre', label: 'Équilibre et appuis',
      short: 'Un axe stable pour transmettre l’énergie du sol à la raquette.',
      detail: 'L’équilibre n’est pas une fin en soi : c’est lui qui permet de produire de l’énergie à partir du sol et de la transmettre le long d’un axe vertical stable. Dans tous les coups, une jambe pousse et l’autre s’ancre.',
      points: [
        'La jambe arrière propulse, la jambe avant stabilise.',
        'Travailler l’ancrage avant la propulsion : sans base stable, pas d’action explosive.',
        'Appuis en ligne dès que la situation le permet : plus de vitesse, moins de contraintes.',
        'Lignes des épaules et des hanches à l’horizontale à la réception.'
      ],
      sources: [GENEVOIS]
    },
    'rythme': {
      family: 'physique', tag: 'Rythme', label: 'Rythme et tempo',
      short: 'Tenir, puis augmenter, la cadence de l’échange sans faire plus de fautes.',
      detail: 'Le tempo est le nombre de balles qui passent le filet et tombent dans le court en un temps donné. On le règle par la puissance, la trajectoire, la profondeur et surtout la position sur le terrain ; le déplacement, lui, détermine le tempo que l’on peut supporter.',
      points: [
        'Défi tempo : compter les balles en 1 minute (repères : environ 30 pour les meilleurs 14 ans, 45 pour les pros).',
        'Fixer un tempo confortable en début de séance, puis chercher à le pousser.',
        'Un match alterne efforts brefs et intenses et récupérations : varier l’intensité à l’entraînement.'
      ],
      sources: [HINKLE, MARTIN]
    },
    'toucher': {
      family: 'physique', tag: 'Toucher', label: 'Toucher et coordination',
      short: 'Sentir la balle : petits espaces, mains, trajectoires douces.',
      detail: 'Les jeux en espace réduit développent la sensibilité de la main et la coordination œil-main, tout en augmentant la pression temporelle. Les formats de jeu (terrain, balle, raquette adaptés) sont des outils pédagogiques, pas des étapes à franchir au plus vite.',
      points: [
        'Mini-tennis et jeux de volée : contrôler avant de frapper.',
        'Jeux réduits : réagir vite et s’organiser sur le premier appui.',
        'Le toucher bat la puissance dans les petits espaces.'
      ],
      sources: [GENEVOIS, 'Tennis Mentor']
    },

    /* -------------------------- Mental et décision -------------------------- */
    'pression': {
      family: 'mental', tag: 'Pression', label: 'Jouer sous pression',
      short: 'Des points qui comptent : score, enjeu, moments décisifs.',
      detail: 'La pression d’un match ne se reproduit pas dans un exercice sans enjeu : il faut des jeux à score, des formats courts et des pénalités qui donnent du poids à chaque point. Presser, ce n’est pas seulement frapper fort : c’est mettre l’adversaire dans une situation inconfortable.',
      points: [
        'Compter les points dans chaque jeu ; formats courts où la fin est toujours proche.',
        'Reproduire les moments clés : balle de jeu, point décisif, seconde balle.',
        'Rien ne remplace la compétition : jouer régulièrement des matchs qui comptent.'
      ],
      sources: [WARDLAW, HINKLE, MARTIN]
    },
    'decision': {
      family: 'mental', tag: 'Décision', label: 'Décision et gestion du risque',
      short: 'Faire le bon choix au bon moment, et le juger sur sa probabilité.',
      detail: 'Un choix se juge sur sa probabilité de réussite, pas sur le résultat d’un seul point : un bon choix peut échouer, un mauvais peut réussir. On apprend d’abord à réduire le risque de faute, puis à prendre des risques calculés.',
      points: [
        'Ma position décide de mon intention : défendre, construire ou attaquer.',
        'Annoncer son choix à voix haute prouve que la règle est comprise.',
        'Rester imprévisible en attaque : l’adversaire ne doit pas pouvoir anticiper.'
      ],
      sources: [HINKLE, RAVILLY, WARDLAW]
    },
    'concentration': {
      family: 'mental', tag: 'Concentration', label: 'Concentration et discipline',
      short: 'Une intention claire, tenue du premier au dernier point.',
      detail: 'Avoir un plan et s’y tenir : perdre des points en suivant son plan est normal, l’abandonner au premier doute ne l’est pas. On juge son match à une question : étais-je dans ma stratégie ? Après une faute, on visualise la correction, puis on rejoue son schéma.',
      points: [
        'Un seul objectif par séance, rappelé avant chaque exercice.',
        'Un plan de repli préparé, plutôt qu’improviser ce que l’on n’a jamais travaillé.',
        'Corriger au point d’impact : savoir quoi faire après chaque type de faute.'
      ],
      sources: [HINKLE, 'Tennis Mentor']
    }
  };

  /* ------------------------------------------------------------------
     Les types de situations (les 5 temps d'une séance) : fiches détaillées.
     La FFT classe les exercices du plus éloigné au plus proche du jeu réel :
     exercices de répétition (comportement technique), jeu dirigé
     (comportement tactique), matchs d'entraînement libres (compétition).
     ------------------------------------------------------------------ */
  var FFT = 'FFT, Différentes catégories d’exercices d’entraînement';
  AC.TYPE_INFO = {
    echauffement: {
      detail: 'L’échauffement prépare le corps, la main et l’attention. Les jeux en espace réduit montent progressivement en distance et en vitesse, et obligent déjà à lire la balle et à réagir vite : la distance courte augmente la pression temporelle.',
      points: [
        'Progression : petit espace et balles lentes, puis recul vers le fond et accélération.',
        'Un but de jeu simple et un score, pour réveiller aussi la concentration.',
        'On peut y fixer le tempo de la séance, ou s’échauffer « mentalement » en visant des cibles.'
      ],
      sources: ['Tennis Mentor (cartes Activator)', GENEVOIS, HINKLE]
    },
    educatif: {
      detail: 'Un éducatif isole un élément technique dans une situation simplifiée, souvent au panier : pour la FFT, c’est un exercice de répétition, sur des balles envoyées par l’entraîneur, dont le but est d’améliorer le comportement technique. La technique n’est pas une gestuelle à copier mais une organisation du mouvement guidée par des principes.',
      points: [
        'Un seul point d’attention, un critère de réussite mesurable.',
        'Séries courtes, environ 4 frappes : au-delà de 6 à 8, la qualité se dégrade.',
        'Il n’existe pas de technique idéale : adapter au joueur (morphologie, coordination, style).',
        'Revenir vite au jeu : la tactique donne son sens à la technique.'
      ],
      sources: [FFT, GENEVOIS, MARTIN]
    },
    drill: {
      detail: 'Le drill est une situation fermée entre joueurs : trajectoires et zones sont connues à l’avance, et l’on répète. C’est la pratique délibérée appliquée au tennis : une tâche claire, beaucoup de répétitions, un retour immédiat et un score que l’on cherche à battre.',
      points: [
        'On compte les réussites ou les séquences complètes, pas les points gagnés.',
        'Surcharge progressive : record + 1, cible plus petite, cadence plus élevée.',
        'Refaire les mêmes drills sur plusieurs séances pour mesurer les progrès.'
      ],
      sources: [FFT, HINKLE, 'Tennis Mentor (cartes Drill)']
    },
    mixte: {
      detail: 'Dans une forme mixte, le début de l’échange est imposé à un joueur ou aux deux, puis le point se joue jusqu’au bout. C’est ce que la FFT appelle une situation de jeu, au sein du jeu dirigé : les trajectoires à produire et les zones à atteindre sont fixées par l’entraîneur, pour améliorer le comportement tactique.',
      points: [
        'Un début de point choisi pour faire apparaître la situation à travailler.',
        'La suite est libre : le joueur doit décider, comme en match.',
        'Inverser les rôles : chacun vit la situation des deux côtés.'
      ],
      sources: [FFT, WARDLAW, HINKLE]
    },
    ouvert: {
      detail: 'Les situations ouvertes sont des jeux à score : matchs à thème, matchs dirigés ou matchs libres. Elles se rapprochent le plus du jeu réel et préparent à la compétition. Une règle, un bonus ou une pénalité oriente le jeu sans dicter les coups.',
      points: [
        'Un score à chaque jeu : c’est lui qui crée la pression.',
        'Des formats courts (tie-breaks, sets sans avantage) où la fin est toujours proche.',
        'Finir par un match où le joueur choisit lui-même son cadre et son plan.'
      ],
      sources: [FFT, WARDLAW, HINKLE]
    },
    focus: {
      detail: 'Une carte Focus donne une seule intention, mentale ou tactique, à garder pendant toute la séance et à rappeler avant chaque exercice.',
      points: ['Une seule intention à la fois.', 'La rappeler au début de chaque situation.', 'Faire le point en fin de séance : tenue ou non ?'],
      sources: ['Tennis Mentor (cartes Focus)', HINKLE]
    }
  };

  /* Libellés courts : AC.AXES reste le dictionnaire id → libellé utilisé par les filtres et les étiquettes */
  AC.AXES = {};
  AC.AXE_FAMILIES.forEach(function (f) {
    f.axes = Object.keys(AC.AXE_INFO).filter(function (k) { return AC.AXE_INFO[k].family === f.id; });
    f.axes.forEach(function (k) { AC.AXES[k] = AC.AXE_INFO[k].tag; });
  });

  /* ------------------------------------------------------------------
     Classement des cartes
     ------------------------------------------------------------------ */
  function has(list, k) { return (list || []).indexOf(k) !== -1; }

  /* Deux thèmes se déduisent des coups de la carte (valable aussi pour les cartes perso) */
  var RULES = {
    'debut-point': function (c) { return has(c.coups, 'service') || has(c.coups, 'retour'); },
    'sit-fond': function (c) {
      return (has(c.coups, 'coup-droit') || has(c.coups, 'revers')) && !has(c.coups, 'volee') && !has(c.coups, 'smash') &&
        !has(c.coups, 'service') && !has(c.coups, 'retour') && !has(c.axes, 'filet') && c.space !== 'mini' && c.space !== 'hors' && c.theme !== 'focus';
    }
  };

  /* Les autres thèmes sont attribués carte par carte */
  function ids(s) { return s.split(/\s+/).filter(Boolean); }
  var ASSIGN = {
    'debut-point': ids('pt-f2 pd-f1 tt-f3'),
    'sit-passing': ids('tm-g23 pt-m2 pt-m3 pt-m12 pt-m13 pt-m14 pt-m16 pt-m17 pt-m19 pd-w1 pd-d1 pd-m2 pd-m3 pd-m5 pd-m7 pd-m8 pd-m9 pd-o4 pd-f2'),
    'construction': ids('tm-d01 tm-d02 tm-d05 tm-d07 tm-d12 tm-g02 tm-g10 tm-g11 tm-g12 tm-g16 tm-g18 pt-w2 pt-d2 pt-m4 pt-m5 pt-m6 pt-m7 pt-m8 pt-m10 pt-m11 pt-o4 pt-o5 pt-o6 pt-o13 pt-f3 pd-m1 ' +
      'tt-e2 tt-d1 tt-d2 tt-d3 tt-m4 tt-m5 tt-m6 tt-m7 tt-m9 tt-o1 tt-o2 tt-o4'),
    'conclusion': ids('tm-g01 tm-g09 tm-g23 ac-e13 ac-e14 pt-d4 pt-m2 pt-m14 pt-m15 pt-m16 pt-o2 pt-o7 pt-o12 pt-f3 pd-d2 pd-d3 pd-m3 pd-m4 pd-m5 pd-m9 pd-m11 tt-m3 tt-m7 tt-m8'),
    'schemas': ids('tm-d02 tm-d12 tm-g01 tm-g02 tm-g04 tm-g06 tm-g07 pt-e2 pt-d1 pt-m1 pt-m2 pt-m3 pt-m14 pt-m17 pt-f2 pd-d1 pd-d2 pd-d3 pd-m10 pd-m11 pd-o1 pd-f1 ' +
      'tt-d1 tt-d2 tt-d4 tt-d5 tt-m1 tt-m2 tt-m3 tt-m8 tt-m9 tt-o3 tt-o4 tt-f3'),
    'direction': ids('tm-d02 tm-d06 tm-d07 tm-d12 tm-g02 tm-g06 tm-g10 tm-g12 tm-g18 tm-g21 pt-w1 pt-w2 pt-e1 pt-e2 pt-m4 pt-m5 pt-m6 pt-m7 pt-m8 pt-m9 pt-m10 pt-m18 pt-m19 pt-o4 pt-o5 pt-o6 pt-o7 pt-o13 pt-f1 pd-m1 ' +
      'tt-w2 tt-d1 tt-d2 tt-d3 tt-m1 tt-m2 tt-m4 tt-m5 tt-m6 tt-m7 tt-m9 tt-o1 tt-o4 tt-f1'),
    'marge': ids('tm-d01 tm-g10 tm-f04 ac-e04 pt-w2 pt-d2 pt-m4 pt-o9 pt-f4 tt-w1 tt-w2 tt-e2 tt-f1 tt-f2'),
    'variation': ids('tm-a05 tm-g05 tm-g17 tm-g23 tm-g24 ac-e04 ac-e07 ac-e15 pt-w2 pt-m3 pt-m11 pt-m12 pt-m17 tt-d7'),
    'decision': ids('tm-g03 tm-g04 tm-g09 tm-g22 tm-f04 pt-e1 pt-m9 pt-o3 pt-o4 pt-o5 pt-o7 pt-f1 pd-d2 pd-d3 tt-e2 tt-m1 tt-m2 tt-o1 tt-o3 tt-f2'),
    'concentration': ids('tm-f01 tm-f02 tm-f03 tm-f05 tm-f06 tm-d05 tm-g20 pt-o12 pt-o13 tt-o1'),
    /* compléments de thèmes déjà présents sur les cartes */
    'equilibre': ids('pt-d4 ac-e14 tm-a04'),
    'rythme': ids('tm-g20 tm-a03 pt-d3 pt-m11 tm-d08'),
    'reaction': ids('tm-g20'),
    'defense': ids('pt-m13 pt-m17 tm-g11'),
    'profondeur': ids('tt-e2 pt-m5 pt-m6 pt-o8')
  };
  var BY_CARD = {};
  Object.keys(ASSIGN).forEach(function (k) {
    ASSIGN[k].forEach(function (id) { (BY_CARD[id] = BY_CARD[id] || []).push(k); });
  });

  /* Retouches : thèmes à retirer d'une carte ({ id: [thèmes] }) */
  AC.CLASSIF = {
    'pt-o9': ['debut-point'], 'pt-o11': ['debut-point'], 'pt-d3': ['debut-point'], 'ac-e10': ['debut-point'],
    'pd-o6': ['sit-fond'],
    /* passing joué du fond face à un volleyeur : ce n'est pas un échange de fond de court */
    'ac-v11': ['sit-fond']
  };

  AC.classify = function (card) {
    if (!card) return [];
    var out = (card.axes || []).filter(function (k) { return AC.AXES[k]; });
    Object.keys(RULES).forEach(function (k) { if (out.indexOf(k) === -1 && RULES[k](card)) out.push(k); });
    (BY_CARD[card.id] || []).forEach(function (k) { if (out.indexOf(k) === -1) out.push(k); });
    var drop = AC.CLASSIF[card.id] || [];
    out = out.filter(function (k) { return drop.indexOf(k) === -1; });
    /* Ordre stable : celui des familles */
    var order = Object.keys(AC.AXES);
    return out.sort(function (a, b) { return order.indexOf(a) - order.indexOf(b); });
  };

  AC.applyClassification = function () {
    (AC.CARDS || []).forEach(function (c) { c.axes = AC.classify(c); });
  };
  AC.applyClassification();
})();
