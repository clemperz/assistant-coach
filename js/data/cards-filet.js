/* ==========================================================================
   Assistant Coach — Paquet « Jeu au filet » (créations Assistant Coach)
   12 éducatifs :
     volée, technique        (ac-v01 à ac-v04) : Genevois (équilibre, prise, volée basse,
                             volée de finition) et Ravilly (où placer sa volée)
     monter et se placer     (ac-v05, ac-v06) : Ravilly (bissectrice, direction de la montée)
     smash                   (ac-v07, ac-v08) : Ravilly (quand smasher, où viser), Genevois (appuis)
     lob, passing, amortie   (ac-v09 à ac-v12) : Ravilly — le filet vu d'en face
   Les exercices sont des créations ; les points clés reprennent les sources.
   Voir aussi : ac-e12 à ac-e15 (volée main courte, bon pied, smash, amorti),
   ac-j22 (volée d'approche), ac-s07 (du service au smash).
   Rappel d'orientation des schémas : pour un droitier placé à gauche du schéma,
   le coup droit est en bas ; pour un droitier placé à droite, il est en haut.
   ========================================================================== */
window.AC = window.AC || {};
AC.CARDS = AC.CARDS || [];

(function () {
  var N = 11.885, SL = 5.485, SR = 18.285, T = 1.37, B = 9.6, M = 5.485, W = 23.77;
  var SRC = 'Assistant Coach';
  var GEN = 'Biomécanique appliquée au tennis (Genevois)';
  var FOND = 'Biomécanique des coups de fond de court (Genevois)';
  var JJ = 'Biomécanique du jeu de jambes (Genevois)';
  var RAV = 'Tennis, les fondamentaux tactiques (Ravilly)';
  var BR = ['balles', 'raquettes'];
  var BRP = ['balles', 'raquettes', 'plots'];

  /* Poids de tirage du paquet (voir generator.js) : même réglage que le paquet Service et retour. */
  var DRAW_WEIGHT = 0.8;

  /* Coach au fond, en face */
  function far(y) { return [22.6, y == null ? 5.5 : y, 2, 'C']; }
  function farBasket(y) { return ['basket', 22.6, (y == null ? 5.5 : y) + 1.9]; }

  /* Volées au panier : le joueur au milieu du carré, le coach à mi-court en face */
  function volleyFeed(label, style) {
    return {
      zones: [['R.back', 'soft']],
      players: [[8.4, 5.5, 1, 'J'], [16.4, 5.5, 2, 'C']],
      marks: [['basket', 16.4, 7.4]],
      shots: [
        { p: [[15.8, 5.3], [9.4, 3.9]], tone: 'deep' },
        { p: [[15.8, 5.7], [9.4, 7.1]], tone: 'deep' },
        { p: [[9.4, 3.6], [20.8, 3.2]] },
        { p: [[9.4, 7.4], [20.8, 7.8]] }
      ],
      labels: label ? [[style === 'tag' ? 11.4 : 5.4, style === 'tag' ? 10.35 : 9.6, label, style || 'bubble']] : []
    };
  }

  AC.CARDS.push(

    /* =====================================================================
       VOLÉE : LA TECHNIQUE
       ===================================================================== */
    {
      id: 'ac-v01', theme: 'educatif', source: SRC, refs: GEN,
      title: 'Le contrepoids', original: 'Équilibre à la volée',
      objective: 'Rester équilibré à la volée : la jambe arrière et le bras libre font contrepoids au bras qui frappe.',
      steps: [
        'Au milieu du carré de service. Le coach envoie au panier des balles faciles, en coup droit puis en revers.',
        'À chaque volée, le bras libre et la jambe arrière s’opposent au bras qui frappe : ils restent en arrière pendant que la raquette avance.',
        'Tenir la fin de geste 1 seconde : tête stable, buste droit.',
        '10 volées de chaque côté, puis en alternance.'
      ],
      score: '8 volées sur 10 tenues en équilibre et remises dans le court.',
      tip: 'Si le buste bascule ou tourne trop, c’est le contrepoids qui manque.',
      keys: [
        'En coup droit comme en revers, la jambe arrière et le bras libre contrebalancent l’action du bras de frappe.',
        'Les réglages de la stabilité valent aussi au filet : appuis écartés, centre de gravité abaissé, tête verticale.',
        'L’équilibre du tennis est dynamique : il se retrouve à chaque volée.'
      ],
      variants: ['Volées basses : même contrepoids, genoux fléchis.', 'En avançant d’un pas à chaque volée.'],
      coups: ['volee'], axes: ['filet', 'equilibre'],
      equipment: BR, players: [1, 4], space: 'mini', duration: [5, 6, 8], intensity: 1,
      diagram: volleyFeed('TENIR 1 S')
    },
    {
      id: 'ac-v02', theme: 'educatif', source: SRC, refs: FOND,
      title: 'Une seule prise', original: 'Prise continentale à la volée',
      objective: 'Jouer la volée de coup droit et la volée de revers avec la même prise continentale.',
      steps: [
        'Prise continentale (marteau), la main surtout au-dessus du manche. Se placer au milieu du carré de service.',
        'Le coach envoie des balles lentes : une à droite, une à gauche, puis au hasard.',
        'Garder la même prise des deux côtés ; la main libre soutient le cœur de la raquette entre deux volées.',
        'Le coach accélère peu à peu la cadence. Séries de 10.'
      ],
      score: '8 volées sur 10 dans le court sans changer de prise (le coach regarde la main).',
      tip: 'La prise continentale est celle qui donne le plus de souplesse pour varier les coups, surtout en volée de revers et en slice.',
      keys: [
        'La prise continentale de la main dominante est indispensable pour la volée de revers et le revers coupé.',
        'Ces deux coups se ressemblent : ils s’apprennent ensemble, tôt dans la formation, y compris pour les joueurs à revers à deux mains.',
        'La prise détermine l’orientation de la main, donc du tamis, à l’impact.'
      ],
      variants: ['Volée de revers à une main pour les joueurs à deux mains.', 'Enchaîner un slice de revers, puis une volée de revers.'],
      coups: ['volee'], axes: ['filet', 'reaction', 'toucher'],
      equipment: BR, players: [1, 4], space: 'mini', duration: [5, 6, 8], intensity: 1,
      diagram: volleyFeed('MÊME PRISE DES DEUX CÔTÉS', 'tag')
    },
    {
      id: 'ac-v03', theme: 'educatif', source: SRC, refs: JJ + ' ; Ravilly',
      title: 'Rester bas', original: 'Volée basse',
      objective: 'Jouer la volée basse fléchi et en avançant, courte devant soi, pour garder la main sur le point.',
      steps: [
        'Départ sur la ligne de service. Le coach envoie du fond des balles plongeantes, dans les pieds.',
        'Descendre avec les jambes, buste droit ; pousser de la jambe arrière vers la balle.',
        'Impact pied avant au sol, tamis ouvert : volée courte, juste devant soi.',
        'Continuer d’avancer : la balle suivante, plus haute, se joue en volée de finition. Séries de 6.'
      ],
      score: '4 volées basses sur 6 remises courtes devant soi, puis une seconde volée dans le court.',
      tip: 'Sur balle basse, l’amortie devant soi a le trajet le plus court et laisse bien placé pour la volée suivante.',
      keys: [
        'Volée basse : position fléchie et gainée, pour pouvoir continuer d’avancer.',
        'L’équilibre vient de l’ancrage de l’appui avant au sol au moment de l’impact.',
        'La jambe arrière pousse vers la balle ; le transfert vers l’avant se poursuit après la frappe.'
      ],
      variants: ['Volée basse longue, au centre, pour ne pas ouvrir d’angle.', 'Sans raquette : attraper la balle basse d’une main, en fente avant.'],
      coups: ['volee', 'amorti'], axes: ['filet', 'equilibre', 'toucher'],
      equipment: BR, players: [1, 4], space: 'complet', duration: [6, 8, 10], intensity: 2,
      diagram: {
        zones: [[[N, 4.6, N + 2.6, 8], 'strong']],
        players: [[5.2, 6.2, 1, 'J'], far()],
        marks: [farBasket()],
        shots: [
          { p: [[21.9, 5.6], [8.8, 6.6]], tone: 'deep' },
          { p: [[6, 6.2], [8, 6.3]], kind: 'move' },
          { p: [[8.9, 6.3], [13, 6.2]] }
        ],
        labels: [[7.4, 9.6, 'COURT, DEVANT SOI', 'bubble']]
      }
    },
    {
      id: 'ac-v04', theme: 'educatif', source: SRC, refs: RAV + ' ; Genevois',
      title: 'Placer, pas frapper', original: 'Volée de finition',
      objective: 'Conclure à la volée sans forcer : avancer sur la balle haute et la placer croisée, courte, dans le carré de service.',
      steps: [
        'Le joueur est au filet, du côté de la balle. Le coach, dans un coin du fond, envoie une balle haute et lente.',
        'Avancer : pousser de la jambe arrière, impact au-dessus du filet et le plus près possible de lui.',
        'Volée croisée dans la zone marquée, devant la ligne de service, du côté opposé au coach.',
        'Retomber sur le pied avant après l’impact. Séries de 8, des deux côtés.'
      ],
      score: '6 volées sur 8 dans la zone.',
      tip: 'Bien placée, cette volée n’a pas besoin d’être frappée fort : l’adversaire doit courir en diagonale vers l’avant.',
      keys: [
        'La volée croisée en angle, devant la ligne de service, est le coup principal au filet, surtout sur balle haute.',
        'Jouer le plus près possible du filet et toujours en avançant : l’angle ouvert passe d’environ 20° au fond à 130° au filet.',
        'Poussée de la jambe arrière, transfert vers l’avant, réception sur le pied avant après l’impact.'
      ],
      variants: ['Volée longue dans l’angle : celle-là doit être claquée, elle est moins décisive.', 'Le coach court pour défendre : le point se joue.'],
      coups: ['volee'], axes: ['filet', 'conclusion', 'precision', 'direction'],
      equipment: BRP, players: [1, 4], space: 'complet', duration: [6, 8, 10], intensity: 2,
      diagram: {
        zones: [[[13.2, T, SR, 3.6], 'strong']],
        players: [[8, 6.9, 1, 'J'], far(8.4)],
        marks: [['basket', 22.6, 6.4]],
        shots: [
          { p: [[21.9, 8.3], [10.2, 6.8]], tone: 'deep' },
          { p: [[8.8, 6.9], [10, 6.7]], kind: 'move' },
          { p: [[10.4, 6.5], [15.8, 2.4]] }
        ],
        labels: [[6.6, 2.4, 'PLACER', 'bubble']]
      }
    },

    /* =====================================================================
       MONTER ET SE PLACER
       ===================================================================== */
    {
      id: 'ac-v05', theme: 'educatif', source: SRC, refs: RAV,
      title: 'Le gardien de but', original: 'Placement à la volée',
      objective: 'Se placer au filet du côté de la balle, sur la bissectrice des passings possibles, comme un gardien qui ferme son angle.',
      steps: [
        'Le coach, au fond, se déplace balle en main : coin gauche, centre, coin droit.',
        'Le volleyeur se replace à chaque fois du même côté que la balle, à deux ou trois pas du filet.',
        'Le coach joue un passing : long de ligne, croisé ou au centre.',
        'Volée dans le court. 10 balles, puis le coach enchaîne sans s’arrêter.'
      ],
      score: '7 passings sur 10 touchés et remis dans le court.',
      tip: 'Inutile de coller le filet : la meilleure défense de l’adversaire devient alors le lob.',
      keys: [
        'Le volleyeur ne se place pas au milieu, mais du même côté que le joueur du fond, pour réduire l’angle qui lui est ouvert.',
        'La bonne place est sur la bissectrice des deux passings extrêmes.',
        'L’allonge est plus courte d’une vingtaine de centimètres côté revers : c’est là que l’adversaire cherchera à passer.'
      ],
      variants: ['Deux plots au sol pour repérer les deux places extrêmes.', 'Le coach ajoute des lobs.'],
      coups: ['volee'], axes: ['filet', 'deplacement', 'decision'],
      equipment: BR, players: [1, 4], space: 'complet', duration: [8, 10, 12], intensity: 2,
      diagram: {
        lines: [
          { p: [[22.2, 8.8], [0, 9.5]], dash: true, color: 'strong' },
          { p: [[22.2, 8.8], [5.6, 1.4]], dash: true, color: 'strong' }
        ],
        players: [[9.2, 6.9, 1, 'J'], far(8.8)],
        shots: [{ p: [[9.2, 4.2], [9.2, 6], ], kind: 'move' }],
        labels: [[5.4, 3.2, 'DU CÔTÉ DE LA BALLE', 'bubble']]
      }
    },
    {
      id: 'ac-v06', theme: 'educatif', source: SRC, refs: RAV,
      title: 'Monter devant soi', original: 'Balle d’approche',
      objective: 'Monter au filet sur une balle courte en jouant rasant, long de ligne ou devant soi, puis se placer du côté de la balle.',
      steps: [
        'Le coach envoie au panier une balle courte, côté coup droit puis côté revers.',
        'Approche rasante, long de ligne ou droit devant soi, dans la zone profonde.',
        'Suivre sa balle : avancer du même côté, saut d’allègement quand le coach frappe.',
        'Le coach joue un passing ; volée. Séries de 6 par côté.'
      ],
      score: '4 approches sur 6 dans la zone, suivies d’une volée jouée en équilibre.',
      tip: 'En jouant droit devant soi, la bonne place au filet est toute proche : il suffit d’avancer.',
      keys: [
        'Monter de préférence long de ligne ou devant soi, avec une balle rasante si possible.',
        'Une approche croisée laisse l’adversaire couper la trajectoire et jouer dans l’espace libre avant que l’on soit replacé.',
        'Monter au filet doit rester une décision : ne pas s’y laisser attirer.'
      ],
      variants: ['Approche en slice de revers.', 'Balle courte au centre : monter long et au milieu, pour ne pas ouvrir l’angle du passing.'],
      coups: ['coup-droit', 'revers', 'volee'], axes: ['filet', 'attaque', 'direction', 'deplacement'],
      equipment: BR, players: [1, 4], space: 'complet', duration: [8, 10, 12], intensity: 2,
      diagram: {
        zones: [['R.back.bot', 'soft']],
        players: [[1, 7.4, 1, 'J'], far(4.6)],
        marks: [farBasket(4.6 - 3.6)],
        shots: [
          { p: [[21.9, 4.8], [6.6, 7.8]], tone: 'deep' },
          { p: [[1.8, 7.5], [5.4, 7.8]], kind: 'move' },
          { p: [[6.2, 8.1], [21.4, 8.6]], n: '1', at: 0.5 },
          { p: [[6.6, 7.2], [9.6, 7]], kind: 'move' }
        ],
        labels: [[5, 4.2, 'HOP !', 'bubble'], [13.4, 10.35, 'RASANT, LONG DE LIGNE', 'tag']]
      }
    },

    /* =====================================================================
       SMASH
       ===================================================================== */
    {
      id: 'ac-v07', theme: 'educatif', source: SRC, refs: RAV,
      title: 'Armer ou bloquer ?', original: 'Smash ou volée haute',
      objective: 'Sur une balle haute, décider vite : smasher si l’on a le temps d’armer, sinon jouer une volée haute.',
      steps: [
        'Le joueur est au filet. Le coach envoie du fond soit un lob, soit une balle haute et rapide.',
        'Lob lent : se mettre de profil, armer, smasher. Balle haute rapide : volée haute bloquée, sans armer.',
        'Le joueur annonce « smash » ou « volée » avant de frapper.',
        'Séries de 10, en visant la moitié de terrain libre.'
      ],
      score: '8 bons choix sur 10, et 7 balles dans le court.',
      tip: 'Sans le temps d’armer, la volée haute contrôle mieux la balle qu’un smash précipité.',
      keys: [
        'Le smash ne se joue que si la balle laisse assez de temps pour armer.',
        'Sinon, mieux vaut une volée haute, plus facile à contrôler.',
        'Tactiquement, le smash se joue comme une volée : il sert à conclure, en visant loin de l’adversaire.'
      ],
      variants: ['Le coach masque son intention jusqu’au dernier moment.', 'Lob très profond : laisser rebondir, puis smasher.'],
      coups: ['smash', 'volee'], axes: ['filet', 'decision', 'conclusion', 'reaction'],
      equipment: BR, players: [1, 4], space: 'complet', duration: [6, 8, 10], intensity: 2,
      diagram: {
        players: [[8.6, 5.5, 1, 'J'], far()],
        marks: [farBasket()],
        shots: [
          { p: [[21.9, 5.3], [7.4, 4]], kind: 'throw', arc: -3.2, tone: 'deep' },
          { p: [[21.9, 5.7], [9.4, 6.4]], tone: 'deep' }
        ],
        labels: [[13, 0.6, 'LOB LENT : SMASH', 'tag'], [13.6, 10.35, 'HAUTE ET RAPIDE : VOLÉE', 'dark']]
      }
    },
    {
      id: 'ac-v08', theme: 'educatif', source: SRC, refs: RAV + ' ; Genevois',
      title: 'Petit smash bien posé', original: 'Smash placé',
      objective: 'Gagner le point au smash par le placement : viser la zone éloignée de l’adversaire, à vitesse maîtrisée.',
      steps: [
        'Le coach lobe du fond, puis se décale d’un côté. Une zone cible de chaque côté du fond.',
        'Reculer en pas chassés, de profil, main libre vers la balle.',
        'Smash à 70 % de sa force dans la zone opposée au coach ; réception sur le pied avant.',
        'Séries de 8 ; le coach change de côté au hasard.'
      ],
      score: '6 smashs sur 8 dans la bonne zone.',
      tip: 'Un petit smash bien posé suffit le plus souvent : taper de toutes ses forces multiplie les fautes.',
      keys: [
        'Viser la zone éloignée de l’adversaire, la plus facile à jouer, plutôt que de frapper le plus fort possible.',
        'Saut vers le haut et l’arrière, contact tronc vertical, réception équilibrée sur le pied avant (ciseau).',
        'Préparation plus directe qu’au service, avec moins de rotation du tronc.'
      ],
      variants: ['Après le smash, revenir toucher le filet avant le lob suivant.', 'Lobs plus profonds.'],
      coups: ['smash'], axes: ['filet', 'conclusion', 'precision'],
      equipment: BRP, players: [1, 4], space: 'complet', duration: [6, 8, 10], intensity: 2,
      diagram: {
        zones: [['R.back.top', 'strong']],
        players: [[8.6, 5.5, 1, 'J'], far(7.8)],
        shots: [
          { p: [[21.9, 7.6], [6.4, 5.4]], kind: 'throw', arc: 3, tone: 'deep' },
          { p: [[8.2, 6.6], [6, 6.6]], kind: 'move' },
          { p: [[6.8, 5], [20.8, 3.2]] }
        ],
        labels: [[6.4, 2.4, '70 %', 'bubble']]
      }
    },

    /* =====================================================================
       LOB, PASSING, AMORTIE : LE FILET VU D'EN FACE
       ===================================================================== */
    {
      id: 'ac-v09', theme: 'educatif', source: SRC, refs: RAV,
      title: 'Par-dessus la raquette', original: 'Le lob',
      objective: 'Lober un adversaire au filet : assez haut pour passer sa raquette, assez long pour l’empêcher de smasher.',
      steps: [
        'Le coach est au filet, raquette levée. Il envoie une balle au fond, à la main ou à la raquette.',
        'Lob croisé : la balle passe 1 m à 1,50 m au-dessus de la raquette levée.',
        'Viser le fond du court, au-delà de la ligne de service.',
        '10 lobs en coup droit, 10 en revers. Ensuite, lob lifté pour ceux qui le peuvent.'
      ],
      score: '6 lobs sur 10 au-dessus de la raquette et dans la zone.',
      tip: 'Croisé, le terrain est plus long : le lob a plus de marge et laisse plus de temps pour se replacer.',
      keys: [
        'Le lob est intéressant quand on n’est pas trop en retard : l’adversaire, proche du filet, a peu de temps pour reculer.',
        'L’idéal est un lob lifté d’attaque ; sinon croisé et pas trop haut, 1 m à 1,50 m au-dessus de la raquette adverse.',
        'En extérieur, s’en servir sans modération.'
      ],
      variants: ['Le coach smashe les lobs trop courts : le point se joue.', 'Lob de défense, très haut, pour gagner du temps.'],
      coups: ['lob'], axes: ['sit-passing', 'defense', 'profondeur', 'marge'],
      equipment: BR, players: [1, 4], space: 'complet', duration: [6, 8, 10], intensity: 1,
      diagram: {
        zones: [['R.back', 'soft']],
        players: [[0.4, 7.6, 1, 'J'], [13.6, 6.4, 2, 'C']],
        shots: [
          { p: [[12.8, 6.6], [2.4, 7.8]], tone: 'deep' },
          { p: [[1.2, 7.3], [21.2, 3.2]], kind: 'throw', arc: -3 }
        ],
        labels: [[13.6, 10.35, '1 M AU-DESSUS DE LA RAQUETTE', 'tag']]
      }
    },
    {
      id: 'ac-v10', theme: 'educatif', source: SRC, refs: RAV,
      title: 'Lob ou pieds ?', original: 'Lire la position du volleyeur',
      objective: 'Choisir entre le lob et la balle dans les pieds selon la position du joueur au filet.',
      steps: [
        'Le coach monte au filet et s’arrête soit collé au filet, soit près de la ligne de service.',
        'Collé au filet : lob. Resté loin : balle plongeante dans les pieds.',
        'Le joueur annonce « lob » ou « pieds » avant de frapper ; le coach joue la balle s’il le peut.',
        'Séries de 10.'
      ],
      score: '8 bons choix sur 10, et 6 balles qui mettent le volleyeur en difficulté.',
      tip: 'L’un prépare l’autre : les lobs font reculer le volleyeur, les balles dans les pieds le font avancer.',
      keys: [
        'Le lob incite l’adversaire à reculer un peu, ce qui facilite la balle dans les pieds au coup suivant.',
        'La balle dans les jambes l’encourage à coller le filet, ce qui facilite le lob.',
        'Un volleyeur collé au filet s’expose au lob ; resté loin, il doit jouer des volées basses.'
      ],
      variants: ['Deux balles de suite : pieds, puis lob.', 'En point : le volleyeur choisit librement sa position.'],
      coups: ['lob'], axes: ['sit-passing', 'decision', 'variation'],
      equipment: BR, players: [1, 4], space: 'complet', duration: [8, 10, 12], intensity: 2,
      diagram: {
        players: [[0.4, 5.5, 1, 'J'], [13.4, 5.5, 2, 'C']],
        marks: [['ring', 17.6, 5.5]],
        shots: [
          { p: [[14.4, 5.5], [16.8, 5.5]], kind: 'move2' },
          { p: [[1.2, 5.2], [21.6, 3.4]], kind: 'throw', arc: -3 },
          { p: [[1.2, 5.9], [17, 6.6]], tone: 'deep' }
        ],
        labels: [[11.4, 0.6, 'COLLÉ AU FILET : LOB', 'tag'], [13, 10.35, 'RESTÉ LOIN : DANS LES PIEDS', 'dark']]
      }
    },
    {
      id: 'ac-v11', theme: 'educatif', source: SRC, refs: RAV,
      title: 'Passing côté revers', original: 'Passing-shot',
      objective: 'Passer un joueur au filet : dans l’ouverture s’il y en a une, sinon croisé sur sa volée de revers.',
      steps: [
        'Le coach est au filet et se place soit du bon côté, soit en laissant une ouverture.',
        'Il envoie une balle au fond, côté revers du joueur, puis côté coup droit.',
        'Ouverture visible : passing dedans. Pas d’ouverture : passing croisé et plongeant, côté revers du volleyeur.',
        'Séries de 10 ; le coach volleye ce qu’il peut toucher.'
      ],
      score: '6 passings sur 10 non touchés, ou volleyés en difficulté.',
      tip: 'Côté revers, le volleyeur a une vingtaine de centimètres d’allonge en moins.',
      keys: [
        'Sans ouverture, privilégier le passing croisé sur le revers adverse.',
        'La volée de revers est souvent moins bien maîtrisée que la volée de coup droit, surtout chez les joueurs à revers à deux mains.',
        'Un passing lifté plonge dans les pieds et rend la volée difficile.'
      ],
      variants: ['En deux temps : une balle dans les pieds, puis le passing.', 'Volleyeur gaucher : inverser.'],
      coups: ['coup-droit', 'revers'], axes: ['sit-passing', 'direction', 'decision', 'precision'],
      equipment: BR, players: [1, 4], space: 'complet', duration: [8, 10, 12], intensity: 2,
      diagram: {
        zones: [[[SR, 7.6, W, B], 'strong']],
        players: [[0.4, 3.4, 1, 'J'], [13.4, 4.2, 2, 'C']],
        shots: [
          { p: [[12.6, 4], [2.4, 3.4]], tone: 'deep' },
          { p: [[1.2, 3.7], [21, 8.6]] }
        ],
        labels: [[13.6, 10.35, 'CROISÉ, SUR LE REVERS DU VOLLEYEUR', 'tag']]
      }
    },
    {
      id: 'ac-v12', theme: 'educatif', source: SRC, refs: RAV,
      title: 'Aspiré au filet', original: 'Répondre à une amortie',
      objective: 'Sur une amortie adverse, choisir sa réponse selon son avance sur la balle, sans se laisser piéger au filet.',
      steps: [
        'Le coach joue une amortie depuis le fond. Le joueur part de sa ligne de fond.',
        'Arrivé tôt : attaque tranchante long de ligne (au centre si l’amortie est au centre), puis rester au filet.',
        'Arrivé juste : contre-amortie. Arrivé tard : balle haute et profonde, puis retour au fond.',
        'Le joueur annonce son choix en courant. Séries de 8.'
      ],
      score: '6 réponses adaptées sur 8, balle dans le court.',
      tip: 'Monter au filet doit rester une décision : sur une amortie, la contre-amortie est souvent la meilleure réponse.',
      keys: [
        'Trois options : attaque tranchante si l’on est tôt sur la balle, contre-amortie, ou balle lente, haute et profonde pour se replacer.',
        'Éviter la réponse longue et croisée : l’adversaire coupe la trajectoire et joue dans l’espace libre.',
        'Monter par obligation met dans une position vulnérable, avec beaucoup de passings possibles.'
      ],
      variants: ['Le coach varie : amortie au centre, amortie en angle.', 'Le point se joue après la réponse.'],
      coups: ['amorti'], axes: ['defense', 'decision', 'deplacement', 'toucher'],
      equipment: BR, players: [1, 4], space: 'complet', duration: [8, 10, 12], intensity: 3,
      diagram: {
        players: [[0.2, 6, 1, 'J'], far(4.4)],
        shots: [
          { p: [[21.9, 4.6], [10, 7.6]], kind: 'throw', arc: -1.6, tone: 'deep' },
          { p: [[1, 6.2], [8.8, 7.4]], kind: 'move' },
          { p: [[9.8, 8], [21.6, 8.8]], n: '1', at: 0.6 },
          { p: [[9.9, 7.6], [13.6, 7.6]], n: '2', at: 0.86 },
          { p: [[9.8, 7.2], [21.4, 2.6]], tone: 'ink', n: '3', at: 0.6 }
        ],
        labels: [[6, 2.2, '1 TÔT · 2 JUSTE · 3 TARD', 'tag']]
      }
    }
  );

  AC.CARDS.forEach(function (c) { if (c.id.indexOf('ac-v') === 0) c.drawWeight = DRAW_WEIGHT; });
})();
