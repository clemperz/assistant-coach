/* ==========================================================================
   Assistant Coach — Paquet « Coups de fond de court » (créations Assistant Coach)
   16 éducatifs construits sur le cours de Cyril Genevois « Biomécanique des
   coups de fond de court » (Sources/Tennis/Genevois_biomeca) :
     cadre, prises, analyse                  (ac-f01 à ac-f04)
     1er étage : les jambes                  (ac-f05 à ac-f08)
     2e étage : le tronc                     (ac-f09 à ac-f11)
     3e étage : le bras et la raquette       (ac-f12 à ac-f16)
   Les exercices sont des créations ; les points clés reprennent le cours.
   Rappel du cours : il n'existe pas de technique idéale. Ces cartes font sentir
   des principes, elles n'imposent pas une forme de geste.
   ========================================================================== */
window.AC = window.AC || {};
AC.CARDS = AC.CARDS || [];

(function () {
  var N = 11.885, SL = 5.485, SR = 18.285, T = 1.37, B = 9.6, M = 5.485, W = 23.77;
  var SRC = 'Assistant Coach';
  var REF = 'Biomécanique des coups de fond de court (Genevois)';
  var BR = ['balles', 'raquettes'];

  /* Poids de tirage du paquet : avec 0,6, coups de fond et jeu de jambes pèsent chacun environ un quart
     des éducatifs tirés quand aucun objectif ne les demande (plein poids sinon). */
  var DRAW_WEIGHT = 0.6;

  var FEET_NOTE = 'Vu de dessus, filet en haut. Exemple : coup droit de droitier. G, D : pied gauche, pied droit.';

  function coach(x, y) { return [x == null ? 16.5 : x, y == null ? 5.5 : y, 2, 'C']; }
  function basket(x, y) { return ['basket', x == null ? 16.5 : x, (y == null ? 5.5 : y) + 1.9]; }

  /* Organisation la plus courante : le coach envoie au panier côté coup droit, le joueur vise le fond */
  function feedCD(label, extra) {
    var d = {
      zones: [['R.back', 'soft']],
      players: [[-0.6, 7.2, 1, 'J'], coach()],
      marks: [basket()],
      shots: [
        { p: [[15.9, 5.7], [2.6, 7.4]], tone: 'deep' },
        { p: [[1.2, 7.6], [21.4, 7]] }
      ],
      labels: label ? [[4.8, 9.9, label, 'bubble']] : []
    };
    if (extra) extra(d);
    return d;
  }

  AC.CARDS.push(

    /* =====================================================================
       CADRE, PRISES, ANALYSE
       ===================================================================== */
    {
      id: 'ac-f01', theme: 'educatif', source: SRC, refs: REF,
      title: 'Un mètre plus tôt', original: 'Prise de terrain et temps adverse',
      objective: 'Prendre la balle plus tôt en avançant dans le court, pour laisser moins de temps à l’adversaire sans frapper plus fort.',
      steps: [
        'Trois lignes au sol : 1 m derrière la ligne de fond, sur la ligne, 1 m devant.',
        'Le coach envoie au panier la même balle. 5 frappes depuis chaque ligne, à vitesse constante.',
        'Viser au-delà de la ligne de service adverse sans changer de geste : seul le moment de la prise de balle change.',
        'Ensuite le coach annonce la ligne au moment d’envoyer.'
      ],
      score: '4 balles sur 5 au-delà de la ligne de service, depuis chaque ligne.',
      tip: 'Avancer d’un mètre retire environ 6 centièmes de seconde à l’adversaire ; jouer long de ligne plutôt que croisé, un dixième de plus.',
      keys: [
        'Temps laissé à l’adversaire, en moyenne : 0,69 s en frappant 1 m derrière la ligne, 0,66 s sur la ligne, 0,63 s 1 m devant.',
        'La position et la direction réduisent le temps adverse autant que la vitesse de balle.',
        'À haut niveau, plus de 80 % des balles de fond retombent au-delà du carré de service.'
      ],
      variants: ['Même travail en revers.', 'Depuis la ligne avancée : jouer long de ligne.'],
      coups: ['coup-droit', 'revers'], axes: ['attaque', 'profondeur', 'rythme'],
      equipment: ['balles', 'raquettes', 'lignes'], players: [1, 4], space: 'complet', duration: [8, 10, 12], intensity: 2,
      diagram: {
        zones: [['R.back', 'soft']],
        lines: [
          { p: [[-1, 4.6], [-1, 9.6]], dash: true, color: 'strong', w: 2.6 },
          { p: [[1, 4.6], [1, 9.6]], dash: true, color: 'strong', w: 2.6 }
        ],
        players: [[-2.2, 7.2, 1, 'J'], coach()],
        marks: [basket()],
        shots: [
          { p: [[15.9, 5.7], [3, 7.4]], tone: 'deep' },
          { p: [[1.4, 7.6], [21.4, 7]] }
        ],
        labels: [[6.2, 2.2, '1 M DERRIÈRE : 0,69 S', 'tag'], [6.2, 3.5, 'SUR LA LIGNE : 0,66 S', 'tag'], [6.2, 4.8, '1 M DEVANT : 0,63 S', 'dark']]
      }
    },
    {
      id: 'ac-f02', theme: 'educatif', source: SRC, refs: REF,
      title: 'Ma prise de coup droit', original: 'Prises de coup droit',
      objective: 'Sentir comment la prise oriente la main à l’impact, et situer sa propre prise entre vitesse et lift.',
      steps: [
        'Repérer les 8 facettes du manche. Eastern : base de l’index et talon de la main sur la facette 3. Semi-western : sur la 4. Western : talon de la main sur la 5.',
        'Le coach envoie au panier des balles faciles : 5 frappes par prise, avec la même intention.',
        'Observer la balle : hauteur au-dessus du filet, vitesse, effet. Le joueur dit ce qu’il ressent.',
        'Revenir à sa prise habituelle et rejouer 10 balles.'
      ],
      score: 'Le joueur sait dire ce que chaque prise change sur sa balle ; 7 balles sur 10 dans le court avec la sienne.',
      tip: 'Toute prise est un compromis entre vitesse vers l’avant et vitesse vers le haut ; la semi-western se situe au milieu.',
      keys: [
        'La prise détermine l’orientation de la main à l’impact, donc les rotations du poignet utilisables.',
        'Eastern et western ne se servent pas des mêmes mouvements du poignet pour produire la vitesse horizontale et la vitesse verticale.',
        'Les blessures du poignet ne se situent pas au même endroit : plutôt côté pouce en eastern, côté petit doigt en western.'
      ],
      variants: ['Revers à une main : prise classique (main au-dessus du manche) ou prise extrême (main derrière le manche).', 'Filmer l’impact au ralenti avec chaque prise.'],
      coups: ['coup-droit'], axes: ['variation'],
      equipment: BR, players: [1, 4], space: 'demi', duration: [6, 8, 10], intensity: 1,
      diagram: { picto: 'grips' }
    },
    {
      id: 'ac-f03', theme: 'educatif', source: SRC, refs: REF,
      title: 'Les cinq positions', original: 'Positions clés de la raquette',
      objective: 'Découper son coup droit ou son revers en cinq positions de raquette, pour savoir quoi regarder et quoi corriger.',
      steps: [
        'Geste à vide au ralenti, en s’arrêtant sur 5 positions : la plus haute, la plus en arrière, la plus basse, le contact, la plus en avant.',
        'Un partenaire filme de profil avec un téléphone, au ralenti.',
        'Même chose sur 5 balles envoyées au panier, à vitesse normale.',
        'Regarder la vidéo ensemble, image par image, et retrouver les 5 positions.'
      ],
      score: 'Les 5 positions sont retrouvées sur la vidéo ; le joueur choisit un seul point à améliorer.',
      tip: 'Les frappes sont trop rapides pour l’œil : le ralenti d’un téléphone suffit pour un retour immédiat.',
      keys: [
        'Trois phases : préparation (jusqu’à l’inversion du mouvement), accélération (jusqu’à l’impact), accompagnement.',
        'La position la plus en arrière indique l’amplitude du trajet d’accélération.',
        'La position la plus basse indique, pour une même hauteur de frappe, la part verticale de l’accélération, donc le lift.',
        'La position la plus en avant indique à quel point la balle est « traversée ».'
      ],
      variants: ['Comparer deux vidéos à quelques semaines d’écart.', 'Même analyse en revers.'],
      coups: ['coup-droit', 'revers'], axes: ['regularite'],
      equipment: BR, eqNote: 'Téléphone', players: [2, 4], space: 'demi', duration: [8, 10, 12], intensity: 1,
      diagram: { picto: 'keypos' }
    },
    {
      id: 'ac-f04', theme: 'educatif', source: SRC, refs: REF,
      title: 'La raquette en retard', original: 'Transition et mise en tension',
      objective: 'Lancer la frappe par les jambes et les hanches, pour que la raquette parte en retard et soit tirée vers la balle.',
      steps: [
        'Départ raquette déjà en arrière, épaules tournées. Le coach envoie au panier des balles faciles.',
        'Le signal de départ est la poussée de la jambe arrière : hanches et tronc commencent à tourner, la main reste un instant en arrière.',
        'Laisser ensuite la raquette rattraper son retard jusqu’à l’impact, bras relâché.',
        '10 balles ainsi, puis avec la préparation complète.'
      ],
      score: '7 frappes sur 10 où le coach voit les hanches partir avant la main.',
      tip: 'Ce retard étire les muscles de l’épaule comme un élastique : l’énergie n’est rendue que si l’accélération suit sans temps d’arrêt.',
      keys: [
        'La transition (début de la poussée et de la rotation des hanches et du tronc) est le vrai départ de la frappe : la force vient du sol.',
        'Elle crée un retard de la raquette par rapport au tronc, qui met en tension les muscles de l’épaule.',
        'Ordre des accélérations : jambe arrière, hanches, tronc, bras. Chaque maillon amplifie le suivant.'
      ],
      variants: ['Sans balle : sentir la main qui « traîne » derrière la hanche.', 'Même travail en revers à deux mains.'],
      coups: ['coup-droit', 'revers'], axes: ['attaque', 'regularite'],
      equipment: BR, players: [1, 4], space: 'demi', duration: [6, 8, 10], intensity: 1,
      diagram: feedCD('LES HANCHES D’ABORD')
    },

    /* =====================================================================
       1er ÉTAGE : LES JAMBES
       ===================================================================== */
    {
      id: 'ac-f05', theme: 'educatif', source: SRC, refs: REF,
      title: 'Trois vitesses', original: 'Les accélérateurs du coup droit',
      objective: 'Augmenter la vitesse de balle par les jambes et le tronc, sans forcer avec le bras.',
      steps: [
        'Le coach envoie au panier des balles régulières, côté coup droit.',
        '3 balles à 50 % de sa vitesse, 3 à 75 %, 3 à 100 %, toutes dans la zone profonde.',
        'D’une vitesse à l’autre, c’est la poussée de la jambe arrière qui change : plus explosive, dirigée vers l’avant ; le tronc tourne plus vite.',
        'Refaire la série à l’envers : 100, 75, 50 %.'
      ],
      score: '7 balles sur 9 dans la zone, avec trois vitesses nettement différentes.',
      tip: 'La frappe est une fusée à trois étages : jambes, tronc, bras. Si le premier ne pousse pas, le dernier force.',
      keys: [
        'La triple extension de la jambe arrière (cheville, genou, hanche) et la rotation du tronc sont les accélérateurs du coup droit.',
        'C’est la poussée horizontale contre le sol qui fait le plus monter la vitesse de balle : une action explosive et orientée de la jambe arrière.',
        'Ordre des pics de vitesse : hanches, puis tronc, puis bras, dont le pic survient juste après l’impact.'
      ],
      variants: ['Même échelle de vitesses en revers.', 'Un partenaire annonce la vitesse au dernier moment.'],
      coups: ['coup-droit'], axes: ['attaque', 'profondeur', 'variation'],
      equipment: BR, players: [1, 4], space: 'complet', duration: [6, 8, 10], intensity: 2,
      diagram: { picto: 'rocket' }
    },
    {
      id: 'ac-f06', theme: 'educatif', source: SRC, refs: REF,
      title: 'En ligne si j’ai le temps', original: 'Choix du placement',
      objective: 'Choisir ses appuis selon le temps disponible : en ligne quand la situation le permet, ouverts quand elle presse.',
      steps: [
        'Le coach envoie au panier, côté coup droit : une balle lente, ou une balle rapide et écartée.',
        'Balle lente : appuis en ligne, pied avant posé vers la balle, transfert vers l’avant.',
        'Balle rapide : appuis ouverts, ancrage sur le pied côté balle.',
        'Le joueur annonce « ligne » ou « ouvert » avant de frapper. Séries de 10.'
      ],
      score: '8 choix adaptés sur 10, balle dans le court.',
      tip: 'En ligne : un peu plus de vitesse pour la même précision et la même dépense, et moins de contraintes sur la hanche et le bas du dos.',
      keys: [
        'Appuis en ligne : plus d’élan vers l’avant, plus de stabilité, plus de rotation des épaules ; 4 à 6 km/h de plus en moyenne.',
        'Appuis ouverts : la jambe arrière pousse vers le haut, la jambe avant se fixe devant le corps.',
        'Dans les deux cas, une jambe propulse et l’autre s’ancre pour créer un axe vertical stable.'
      ],
      variants: ['Après un déplacement vers l’avant sur balle courte.', 'Même choix en revers.'],
      coups: ['coup-droit', 'revers'], axes: ['decision', 'equilibre', 'construction'],
      equipment: BR, players: [1, 4], space: 'demi', duration: [6, 8, 10], intensity: 2,
      diagram: {
        note: FEET_NOTE,
        frames: [
          {
            caption: ['J’AI LE TEMPS :', 'APPUIS EN LIGNE'],
            feet: [[36, 74, 80, 'D', 'on'], [54, 42, 45, 'G', 'light']],
            arrows: [{ p: [[78, 86], [78, 48]], kind: 'push' }], ball: [80, 28]
          },
          {
            caption: ['JE SUIS PRESSÉ :', 'APPUIS OUVERTS'],
            feet: [[32, 58, 0, 'G', 'light'], [66, 62, 30, 'D', 'on']],
            arrows: [{ p: [[48, 90], [88, 60]], kind: 'turn', arc: 12 }], ball: [88, 34]
          }
        ]
      }
    },
    {
      id: 'ac-f07', theme: 'educatif', source: SRC, refs: REF,
      title: 'Ancrer avant de pousser', original: 'Ancrage et stabilisation',
      objective: 'Construire la base stable dont toute frappe explosive a besoin : tenir sur un appui pendant que le tronc tourne.',
      steps: [
        'Sur un pied : fléchir lentement en tournant le haut du corps comme pour préparer, tenir 1 à 2 secondes en bas, remonter. 6 fois par jambe.',
        'Saut latéral avec rotation du tronc : réception équilibrée sur un pied, en position athlétique.',
        'Fente avant avec rotation : épaules et hanches restent à l’horizontale, le genou ne dépasse pas la pointe du pied.',
        'Deux tours, puis 10 coups droits au panier en cherchant la même stabilité.'
      ],
      score: 'Toutes les réceptions tenues, lignes des épaules et des hanches à l’horizontale (le coach valide).',
      tip: 'Travailler la poussée n’a de sens que si l’ancrage est solide : sans base stable, pas d’action explosive.',
      keys: [
        'Deux ancrages à construire, toujours avec rotation du tronc : sur l’appui extérieur (appuis ouverts) et sur l’appui avant (appuis en ligne).',
        'La descente est lente et contrôlée : c’est la jambe qui freine.',
        'La jambe qui stabilise freine le transfert du corps ; c’est ce freinage qui accélère la rotation des hanches, puis du tronc.'
      ],
      variants: ['Avec un médecine-ball tenu devant soi : la réception devient plus exigeante.', 'Saut latéral en descendant d’une marche basse.'],
      coups: ['coup-droit', 'revers'], axes: ['equilibre'],
      equipment: BR, players: [1, 8], space: 'hors', duration: [8, 10, 12], intensity: 2,
      diagram: {
        note: 'Vu de dessus. G, D : pied gauche, pied droit.',
        frames: [
          {
            caption: ['SUR UN PIED :', 'FLÉCHIR, TOURNER'],
            feet: [[34, 52, 0, 'G', 'air'], [56, 60, 20, 'D', 'on']],
            arrows: [{ p: [[40, 88], [84, 62]], kind: 'turn', arc: 12 }]
          },
          {
            caption: ['SAUT LATÉRAL :', 'RÉCEPTION TENUE'],
            feet: [[48, 50, 0, 'G', 'air'], [70, 60, 20, 'D', 'on']],
            arrows: [{ p: [[18, 84], [62, 84]], kind: 'move', arc: -10 }]
          },
          {
            caption: ['FENTE AVANT', 'AVEC ROTATION'],
            feet: [[56, 38, 0, 'G', 'on'], [40, 80, 10, 'D', 'light']],
            arrows: [{ p: [[66, 78], [86, 44]], kind: 'turn', arc: 8 }]
          }
        ]
      }
    },
    {
      id: 'ac-f08', theme: 'educatif', source: SRC, refs: REF,
      title: 'Sol ou air ?', original: 'Variabilité du jeu de jambes en attaque',
      objective: 'Varier son jeu de jambes en coup droit d’attaque, pour s’adapter à toutes les balles à jouer en avançant.',
      steps: [
        'Le coach envoie au panier des balles d’attaque variées : courtes, flottantes, à contourner.',
        'Pied avant au sol à l’impact : ensuite saut vers l’avant, pivot, ou saut en diagonale après un décalage.',
        'Pied avant en l’air à l’impact : transfert depuis des appuis ouverts, saut en diagonale sur la jambe arrière, ou frappe en pleine course.',
        'Le coach annonce « sol » ou « air » ; ensuite le joueur choisit seul. Séries de 8.'
      ],
      score: '6 attaques sur 8 dans le court, avec au moins trois jeux de jambes différents.',
      tip: 'Dans tous les cas, la jambe arrière pousse et la jambe avant stabilise.',
      keys: [
        'Six schémas observés chez les professionnels sur les coups droits joués en avançant : aucun n’est « le bon ».',
        'Ce sont tous des mouvements de transfert ; ils diffèrent par la direction et l’intensité de la poussée, et par la façon de stabiliser le corps.',
        'La variété du jeu de jambes fait partie de la formation du joueur.'
      ],
      variants: ['Direction imposée : long de ligne, puis croisé.', 'Enchaîner avec une volée.'],
      coups: ['coup-droit'], axes: ['attaque', 'deplacement', 'variation'],
      equipment: BR, players: [1, 4], space: 'complet', duration: [8, 10, 12], intensity: 2,
      diagram: {
        note: FEET_NOTE,
        frames: [
          {
            caption: ['PIED AVANT AU SOL', 'À L’IMPACT'],
            feet: [[36, 76, 70, 'D', 'light'], [56, 42, 40, 'G', 'on']],
            arrows: [{ p: [[80, 86], [80, 50]], kind: 'push' }], ball: [82, 30]
          },
          {
            caption: ['PIED AVANT EN L’AIR', 'À L’IMPACT'],
            feet: [[40, 72, 50, 'D', 'on'], [60, 40, 30, 'G', 'air']],
            arrows: [{ p: [[80, 86], [80, 50]], kind: 'push' }], ball: [82, 30]
          }
        ]
      }
    },

    /* =====================================================================
       2e ÉTAGE : LE TRONC
       ===================================================================== */
    {
      id: 'ac-f09', theme: 'educatif', source: SRC, refs: REF,
      title: 'D’abord le tronc', original: 'Relation tronc / bras',
      objective: 'Laisser la rotation du tronc emmener le bras vers la balle, avant que le bras n’accélère à son tour.',
      steps: [
        'Raquette tenue court (main au milieu du manche), coude près du corps. Le coach envoie des balles faciles à mi-court.',
        '5 frappes « sans bras » : la raquette avance seulement parce que les jambes poussent et que le tronc tourne.',
        '5 frappes en laissant le bras dépasser le tronc à la fin de l’accélération.',
        'Revenir à la prise normale et reculer vers la ligne de fond.'
      ],
      score: '7 balles sur 10 dans le court en prise normale, avec un départ du tronc visible avant celui du bras.',
      tip: 'Le tronc tire la raquette vers la zone de contact ; le bras finit le travail.',
      keys: [
        'Accélération en deux temps : le bras se déplace d’abord avec le tronc, puis plus vite que lui.',
        'La rotation du tronc, lancée par celle des hanches, donne sa vitesse horizontale à l’épaule.',
        'Le moment où le bras « se libère » varie selon les joueurs : il n’existe pas de technique idéale.'
      ],
      variants: ['Revers à deux mains : le tronc tire les bras, puis ralentit pour les projeter vers l’avant.', 'Lancer de médecine-ball à deux mains sur le côté (voir « Deux mains, une main »).'],
      coups: ['coup-droit', 'revers'], axes: ['regularite', 'attaque'],
      equipment: BR, players: [1, 4], space: 'demi', duration: [6, 8, 10], intensity: 1,
      diagram: {
        zones: [['R.back', 'soft']],
        players: [[6.2, 7.2, 1, 'J'], coach()],
        marks: [basket()],
        shots: [
          { p: [[15.9, 5.7], [8, 7.3]], tone: 'deep' },
          { p: [[7.4, 7.6], [21.4, 7]] },
          { p: [[5.2, 8.6], [1, 8.6]], kind: 'move' }
        ],
        labels: [[5.6, 3.4, 'LE TRONC TIRE LE BRAS', 'bubble']]
      }
    },
    {
      id: 'ac-f10', theme: 'educatif', source: SRC, refs: REF,
      title: 'La main libre', original: 'Le bras libre, point de fixation',
      objective: 'Utiliser le bras libre pour stabiliser les épaules et mieux traverser la balle en coup droit.',
      steps: [
        'Le coach envoie au panier. En préparation, la main libre se tend vers la balle.',
        'Pendant la frappe, la main libre se replie et se bloque devant la poitrine : elle ne part pas derrière le corps.',
        'Tenir la fin de geste 1 seconde pour vérifier où se trouve la main libre.',
        '10 balles ainsi, puis à rythme normal.'
      ],
      score: '8 frappes sur 10 avec la main libre visible devant le corps à la fin du geste.',
      tip: 'Si le bras libre s’échappe, les épaules se « dévissent » et la frappe perd de sa force.',
      keys: [
        'Le bras libre, fixé dans l’espace, évite le dévissage des épaules et augmente la force d’impact.',
        'En fin de préparation, il sert d’abord à l’équilibre.',
        'Signe d’une balle bien traversée : la raquette va loin vers l’avant après l’impact.'
      ],
      variants: ['Tenir une balle dans la main libre : elle doit rester devant soi.', 'À la volée : le bras libre et la jambe arrière équilibrent le bras qui frappe.'],
      coups: ['coup-droit'], axes: ['equilibre', 'regularite'],
      equipment: BR, players: [1, 4], space: 'demi', duration: [5, 6, 8], intensity: 1,
      diagram: feedCD('MAIN LIBRE DEVANT')
    },
    {
      id: 'ac-f11', theme: 'educatif', source: SRC, refs: REF,
      title: 'Deux mains, une main', original: 'Lancers de médecine-ball pour la rotation',
      objective: 'Développer la puissance de rotation du coup droit : d’abord le tronc, à deux mains, puis le bras, à une main.',
      steps: [
        'Par deux, à 5 m, de profil. Lancers à deux mains sur le côté, le plus puissants possible : 2 séries de 6 par côté.',
        'Choisir un médecine-ball d’environ 5 à 6 % du poids du joueur (2 kg pour 35 kg, 3 kg pour 55 kg).',
        'Puis lancers à une main, avec un ballon léger, sur la même amplitude qu’un coup droit : 2 séries de 6.',
        'Finir par 10 coups droits au panier en recherchant la même accélération.'
      ],
      score: 'Des lancers tendus qui arrivent au partenaire sans rebond, avec une réception équilibrée.',
      tip: 'À deux mains, c’est le tronc qui lance. À une main, le bras est libre : épaule, avant-bras et poignet finissent le mouvement.',
      keys: [
        'La puissance du lancer à deux mains sur le côté explique environ un quart des écarts de vitesse de balle en coup droit.',
        'Cette puissance est maximale avec une masse proche de 5,7 % du poids de corps : la charge se règle joueur par joueur.',
        'Lancers à une main, 2 séances par semaine pendant 6 semaines : 11 % de vitesse de balle en plus dans l’étude citée par le cours.'
      ],
      variants: ['Lancer après un pas chassé ou un déplacement.', 'Voir « Du sol à la balle » pour la progression des appuis.'],
      coups: ['coup-droit'], axes: ['attaque'],
      equipment: [], eqNote: 'Médecine-balls', players: [2, 6], space: 'hors', duration: [8, 10, 12], intensity: 3,
      diagram: {
        note: FEET_NOTE,
        frames: [
          {
            caption: ['À DEUX MAINS :', 'LE TRONC LANCE'],
            feet: [[32, 58, 0, 'G', 'light'], [66, 62, 30, 'D', 'on']],
            arrows: [{ p: [[46, 90], [88, 58]], kind: 'turn', arc: 12 }, { p: [[60, 34], [92, 22]], kind: 'push' }]
          },
          {
            caption: ['À UNE MAIN :', 'LE BRAS FINIT'],
            feet: [[32, 58, 0, 'G', 'light'], [66, 62, 30, 'D', 'on']],
            arrows: [{ p: [[46, 90], [88, 58]], kind: 'turn', arc: 12 }, { p: [[60, 34], [92, 22]], kind: 'ball' }], ball: [94, 20]
          }
        ]
      }
    },

    /* =====================================================================
       3e ÉTAGE : LE BRAS ET LA RAQUETTE
       ===================================================================== */
    {
      id: 'ac-f12', theme: 'educatif', source: SRC, refs: REF,
      title: 'Basse, moyenne, haute', original: 'Adaptation à la hauteur d’impact',
      objective: 'Adapter l’inclinaison du tronc et la tête de raquette à la hauteur de la balle, pour garder un bras efficace à toutes les hauteurs.',
      steps: [
        'Le coach envoie au panier, côté coup droit, une balle basse, à mi-hauteur ou haute, au hasard.',
        'Balle basse : le tronc s’incline, épaule de frappe plus basse, tête de raquette sous la main.',
        'Mi-hauteur : tronc vertical, raquette à l’horizontale. Balle haute : épaule de frappe plus haute, tête de raquette au-dessus de la main.',
        'Séries de 9 balles, dans la zone profonde.'
      ],
      score: '7 balles sur 9 dans la zone, avec l’inclinaison du tronc adaptée (le coach valide).',
      tip: 'C’est le tronc qui s’adapte à la balle, pas le bras qui se tord : l’angle entre le bras et le tronc reste le même.',
      keys: [
        'La rotation interne du bras, grande source de vitesse en coup droit, est la plus efficace quand l’angle entre le tronc et le bras est de 70 à 90°.',
        'Pour garder cet angle, on incline le tronc et on règle la tête de raquette par rapport à la main.',
        'Sur balle basse, le genou arrière descend.'
      ],
      variants: ['Le joueur annonce « basse », « moyenne » ou « haute » avant le rebond.', 'Même travail en revers.'],
      coups: ['coup-droit'], axes: ['regularite', 'equilibre', 'variation'],
      equipment: BR, players: [1, 4], space: 'complet', duration: [6, 8, 10], intensity: 2,
      diagram: { picto: 'impact3' }
    },
    {
      id: 'ac-f13', theme: 'educatif', source: SRC, refs: REF,
      title: 'Le bras tendu', original: 'Revers à deux mains : bras non dominant',
      objective: 'En revers à deux mains, frapper loin devant, avec le bras non dominant tendu et libre par rapport au tronc.',
      steps: [
        'Le coach envoie au panier des balles faciles, côté revers. Appui avant orienté à environ 45°.',
        'Préparer en tournant les épaules ; à l’accélération, le bras du haut (le gauche pour un droitier) se déplie à partir de l’épaule.',
        'Impact devant soi et sur le côté, bras du haut tendu. Un plot au sol marque la zone d’impact.',
        '10 balles, puis alterner balles lentes et rapides.'
      ],
      score: '7 revers sur 10 dans la zone profonde, avec un impact à hauteur du plot.',
      tip: 'Coudes collés au corps, les bras ne font que suivre le tronc : la raquette perd de la vitesse vers l’avant comme vers le haut.',
      keys: [
        'Bras tendu et indépendant : plan de frappe plus en avant et sur le côté, rayon du geste plus grand.',
        'Le côté non dominant atteint ses vitesses maximales tard, à l’impact : c’est lui qui accélère.',
        'Ce revers s’appuie davantage sur la rotation du tronc que le revers à une main : le bas du dos est plus chargé, ne pas fermer l’appui avant.'
      ],
      variants: ['Commencer par la main du haut seule (voir « Revers : l’autre main »).', 'Main du haut en prise de coup droit eastern, main du bas en prise continentale.'],
      coups: ['revers'], axes: ['profondeur', 'regularite'],
      equipment: ['balles', 'raquettes', 'plots'], players: [1, 4], space: 'demi', duration: [6, 8, 10], intensity: 1,
      diagram: {
        zones: [['R.back', 'soft']],
        players: [[-0.6, 3.8, 1, 'J'], coach()],
        marks: [basket(), ['cone', 1.6, 3.2]],
        shots: [
          { p: [[15.9, 5.3], [2.8, 3.5]], tone: 'deep' },
          { p: [[1.8, 3.6], [21.4, 4]] }
        ],
        labels: [[5.6, 1.9, 'IMPACT DEVANT, BRAS TENDU', 'bubble']]
      }
    },
    {
      id: 'ac-f14', theme: 'educatif', source: SRC, refs: REF,
      title: 'Préparer grand', original: 'Revers à une main',
      objective: 'En revers à une main, préparer ample et frapper en appuis en ligne pour un impact solide.',
      steps: [
        'Le coach envoie au panier des balles régulières, côté revers.',
        'Tourner largement épaules et hanches : le dos est en partie tourné vers le filet, la raquette loin du futur point d’impact.',
        'Appuis en ligne : la jambe arrière pousse, l’appui avant s’ancre ; la jambe arrière reste derrière pour freiner la rotation des hanches.',
        'Impact devant le corps. 10 balles dans la zone profonde.'
      ],
      score: '7 revers sur 10 dans la zone, avec une préparation finie avant le rebond.',
      tip: 'Un revers à une main préparé trop court tape plus sec : le temps de contact raccourcit et c’est le coude qui encaisse.',
      keys: [
        'Préparation écourtée : temps de contact plus court et choc plus fort à l’impact, donc plus de risque pour le coude.',
        'En fin de préparation, les épaules tournent plus que les hanches, et davantage qu’en revers à deux mains.',
        'La vitesse vient de l’avancée de l’épaule et des rotations du bras dominant, moins de la rotation du tronc.',
        'Prise classique : impact plus près du corps, de profil. Prise extrême : impact plus en avant, bassin plus ouvert, lift et balles hautes plus faciles.'
      ],
      variants: ['Geste à vide au ralenti pour contrôler l’amplitude.', 'Balles hautes : main davantage derrière le manche.'],
      coups: ['revers'], axes: ['profondeur', 'equilibre'],
      equipment: BR, players: [1, 4], space: 'demi', duration: [6, 8, 10], intensity: 1,
      diagram: {
        zones: [['R.back', 'soft']],
        players: [[-0.6, 3.8, 1, 'J'], coach()],
        marks: [basket()],
        shots: [
          { p: [[15.9, 5.3], [2.8, 3.5]], tone: 'deep' },
          { p: [[1.4, 3.6], [21.4, 4]] }
        ],
        labels: [[5.2, 1.9, 'PRÉPARATION AMPLE', 'bubble']]
      }
    },
    {
      id: 'ac-f15', theme: 'educatif', source: SRC, refs: REF,
      title: 'Lift, slice', original: 'Revers slicé pour les joueurs à deux mains',
      objective: 'Passer du revers lifté à deux mains au revers slicé à une main : deux coordinations différentes, à maîtriser tôt.',
      steps: [
        'Le coach envoie au panier, côté revers, et annonce « lift » ou « slice ».',
        '« Lift » : revers à deux mains, la raquette monte. « Slice » : la main du haut lâche, prise continentale, la raquette descend puis traverse.',
        'Le slice passe bas au-dessus du filet et rebondit bas ; le lift passe haut.',
        'Séries de 10. Ensuite le joueur choisit : balle haute et lente, lift ; balle basse ou éloignée, slice.'
      ],
      score: '7 balles sur 10 dans le court, avec le bon coup et la bonne prise.',
      tip: 'La prise se change pendant la préparation, avec l’aide de la main libre.',
      keys: [
        'La prise continentale de la main dominante est indispensable pour le slice et la volée de revers.',
        'La différence se joue à l’épaule : le bras monte vers l’avant pour le lift, il s’abaisse et recule pour le slice.',
        'La coordination tronc / bras du slice est très différente de celle du revers à deux mains : l’apprendre tôt dans la formation.'
      ],
      variants: ['Slice en défense sur balle écartée.', 'Voir « Slice glissé » pour le geste seul.'],
      coups: ['revers'], axes: ['variation', 'defense', 'toucher'],
      equipment: BR, players: [1, 4], space: 'complet', duration: [8, 10, 12], intensity: 2,
      diagram: {
        players: [[-0.6, 3.8, 1, 'J'], coach()],
        marks: [basket()],
        shots: [
          { p: [[15.9, 5.3], [2.8, 3.5]], tone: 'deep' },
          { p: [[1.4, 3.3], [21.4, 8.4]] },
          { p: [[1.4, 3.9], [21.6, 2.6]], tone: 'ink' }
        ],
        labels: [[15, 8.9, 'LIFT : HAUT', 'tag'], [11.4, 0.6, 'SLICE : RASANT', 'dark']]
      }
    },
    {
      id: 'ac-f16', theme: 'educatif', source: SRC, refs: REF,
      title: 'Grande boucle, petite boucle', original: 'Amplitude de préparation',
      objective: 'Régler l’amplitude de sa préparation sur la vitesse de la balle reçue.',
      steps: [
        'Le coach envoie au panier une balle lente ou une balle rapide, au hasard.',
        'Balle lente : préparation ample, la raquette s’éloigne loin du point d’impact.',
        'Balle rapide : préparation réduite, épaules tournées, raquette qui reste à côté du corps.',
        'Dans les deux cas, viser la zone profonde. Séries de 10.'
      ],
      score: '7 balles sur 10 dans la zone, sans frappe en retard sur les balles rapides.',
      tip: 'Un chemin plus long laisse plus de temps pour accélérer la raquette… à condition d’avoir ce temps.',
      keys: [
        'L’amplitude de préparation fixe la longueur du chemin d’accélération.',
        'Elle s’adapte au temps disponible, donc à la vitesse de la balle reçue.',
        'Moins de segments libres : plus de contrôle. Plus de rotations : plus d’énergie élastique. Il n’existe pas de boucle idéale.'
      ],
      variants: ['Le coach avance pour raccourcir encore le temps.', 'Même réglage en revers.'],
      coups: ['coup-droit', 'revers'], axes: ['rythme', 'regularite', 'reaction'],
      equipment: BR, players: [1, 4], space: 'demi', duration: [6, 8, 10], intensity: 2,
      diagram: {
        zones: [['R.back', 'soft']],
        players: [[-0.6, 6, 1, 'J'], coach()],
        marks: [basket()],
        shots: [
          { p: [[15.9, 5.3], [2.6, 3.6]], kind: 'throw', arc: -1.8, tone: 'deep' },
          { p: [[15.9, 5.7], [2.6, 8]], tone: 'deep' }
        ],
        labels: [[7.6, 1.9, 'LENTE : GRANDE BOUCLE', 'tag'], [7.6, 10.3, 'RAPIDE : PETITE BOUCLE', 'dark']]
      }
    }
  );

  AC.CARDS.forEach(function (c) { if (c.id.indexOf('ac-f') === 0) c.drawWeight = DRAW_WEIGHT; });
})();
