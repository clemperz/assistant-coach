/* ==========================================================================
   Assistant Coach — Paquet « Éducatif » (créations Assistant Coach)
   Un éducatif isole un élément technique : situation simplifiée, souvent au
   panier, avec un critère de réussite mesurable et des points clés.
   Points clés appuyés sur les cours de biomécanique (Genevois) fournis dans
   Sources/Tennis/Genevois_biomeca.
   Convention des schémas : joueur = rond plein, coach = rond vide.
   ========================================================================== */
window.AC = window.AC || {};
AC.CARDS = AC.CARDS || [];

(function () {
  var L = -1.3, R = 25.1, N = 11.885, SL = 5.485, SR = 18.285, T = 1.37, B = 9.6, M = 5.485, W = 23.77;
  var SRC = 'Assistant Coach';
  var BIO = 'Biomécanique (Genevois)';
  var BR = ['balles', 'raquettes'];
  var NAMES = ['JOUEUR', 'COACH'];

  AC.CARDS.push(

    /* ---------------- Déplacement ---------------- */
    {
      id: 'ac-e01', theme: 'educatif', source: SRC, refs: BIO,
      title: 'Hop !', original: 'Saut d’allègement',
      objective: 'Caler le saut d’allègement sur la frappe adverse pour démarrer plus vite vers la balle.',
      steps: [
        'Le coach met en jeu depuis l’autre côté, à droite ou à gauche au hasard.',
        'Le joueur dit « hop ! » au moment où il décolle, pendant que la raquette du coach accélère.',
        'Il retombe sur l’appui extérieur (le pied le plus éloigné de la balle), qui le pousse vers elle ; il frappe, puis revient au centre.',
        'Séries de 8 balles, puis on change de joueur.'
      ],
      score: 'Un « hop » au bon moment sur 7 balles sur 8 (le coach valide).',
      tip: 'Prendre l’info en l’air : on sait de quel côté partir avant de retoucher le sol.',
      keys: [
        'Déclencher le saut pendant l’accélération de la raquette adverse : l’information se prend en l’air.',
        'Réception sur l’appui extérieur, le pied le plus éloigné de la balle, qui pousse aussitôt vers elle.',
        'Premier appui explosif : pivot sur une balle proche, pas latéral le plus souvent, pas gravitationnel sur une balle éloignée.'
      ],
      variants: ['Le coach varie le rythme des mises en jeu.', 'Plot de replacement au centre à toucher après chaque frappe.'],
      coups: ['coup-droit', 'revers'], axes: ['reaction', 'deplacement'],
      equipment: BR, players: [1, 6], space: 'demi', duration: [6, 8, 10], intensity: 2,
      diagram: {
        zones: [['L', 'soft']],
        players: [[0.6, 5.5, 1, 'J'], [16.8, 5.5, 2, 'C']],
        marks: [['basket', 16.8, 7.4]],
        shots: [
          { p: [[16.2, 5.3], [3, 2.6]], tone: 'deep' },
          { p: [[16.2, 5.7], [3, 8.4]], tone: 'deep' },
          { p: [[0.6, 4.6], [0.6, 2.9]], kind: 'move' },
          { p: [[0.6, 6.4], [0.6, 8.1]], kind: 'move' }
        ],
        labels: [[3.6, 5.5, 'HOP !', 'bubble']]
      }
    },

    /* ---------------- Fond de court ---------------- */
    {
      id: 'ac-e02', theme: 'educatif', source: SRC, refs: BIO,
      title: 'Épaules d’abord', original: 'Préparation',
      objective: 'Préparer tôt en tournant les épaules pour frapper sans précipitation.',
      steps: [
        'Le coach envoie au panier, une balle en coup droit, une balle en revers.',
        'Dès que la balle quitte le coach : pivot des épaules, raquette prête.',
        'La préparation doit être finie avant le rebond.',
        'Après 10 balles, le coach accélère le rythme.'
      ],
      score: '8 préparations sur 10 finies avant le rebond (le coach annonce « oui » ou « tard »).',
      tip: 'Le pivot part du tronc, pas du bras : la raquette suit les épaules.',
      keys: [
        'Épaule opposée tournée vers le filet.',
        'Main non dominante qui accompagne la raquette en arrière.',
        'Appuis placés pendant la préparation, pas après.'
      ],
      variants: ['Geste à vide sur un « top » du coach.', 'Balles plus rapides ou plus hautes.'],
      coups: ['coup-droit', 'revers'], axes: ['rythme', 'deplacement'],
      equipment: BR, players: [1, 4], space: 'demi', duration: [6, 8, 10], intensity: 1,
      diagram: {
        zones: [['L', 'soft']],
        players: [[1, 5.5, 1, 'J'], [15.6, 5.5, 2, 'C']],
        marks: [['basket', 15.6, 7.4]],
        shots: [
          { p: [[15, 5.3], [2.6, 3.2]], tone: 'deep' },
          { p: [[15, 5.7], [2.6, 7.8]], tone: 'deep' }
        ],
        labels: [[4, 2.3, 'REVERS', 'plain'], [4, 8.8, 'COUP DROIT', 'plain']]
      }
    },
    {
      id: 'ac-e03', theme: 'educatif', source: SRC, refs: BIO,
      title: 'Frappe devant', original: 'Point d’impact',
      objective: 'Trouver un point d’impact devant le corps pour frapper avec contrôle et puissance.',
      steps: [
        'Poser un plot au sol, un pas devant et à côté de l’appui avant : c’est la zone d’impact.',
        'Le coach envoie des balles faciles au panier, côté coup droit.',
        'Frapper la balle au-dessus du plot, le poids du corps vers la cible.',
        'Viser la zone profonde, entre la ligne de service et la ligne de fond.'
      ],
      score: '7 balles sur 10 dans la zone profonde.',
      tip: 'Lire la direction : balle qui part à droite (droitier) = impact tardif ; trop croisée = impact trop tôt.',
      keys: [
        'Jambe arrière qui pousse, jambe avant qui stabilise.',
        'Impact devant et à côté du corps, bras légèrement fléchi.',
        'Tête immobile, regard sur la zone d’impact.'
      ],
      variants: ['Même travail en revers.', 'Balles plus vives ou après déplacement.'],
      coups: ['coup-droit'], axes: ['precision', 'profondeur', 'equilibre'],
      equipment: ['balles', 'raquettes', 'plots'], players: [1, 4], space: 'complet', duration: [6, 8, 12], intensity: 1,
      diagram: {
        zones: [['R.back', 'soft']],
        players: [[0.9, 7.2, 1, 'J'], [15.4, 3.6, 2, 'C']],
        marks: [['basket', 15.4, 2.0], ['cone', 2.6, 7.9]],
        shots: [
          { p: [[14.8, 3.8], [3.2, 7.4]], tone: 'deep' },
          { p: [[2.4, 7.4], [21.2, 6.2]] }
        ],
        labels: [[21, 2.4, 'CIBLE', 'plainStrong']]
      }
    },
    {
      id: 'ac-e04', theme: 'educatif', source: SRC, refs: BIO,
      title: 'L’essuie-glace', original: 'Coup droit lifté',
      objective: 'Donner de l’effet lifté pour passer haut au-dessus du filet et faire retomber la balle dans le court.',
      steps: [
        'Commencer à mi-court ; le coach envoie des balles faciles au panier.',
        'Partir avec la tête de raquette sous la balle, finir au-dessus de l’épaule opposée.',
        'La balle passe au moins un mètre au-dessus du filet et rebondit avant la ligne de fond.',
        'Réussi : reculer d’un pas, jusqu’à la ligne de fond.'
      ],
      score: '7 balles sur 10 bien au-dessus du filet et dans le court.',
      tip: 'L’effet vient de l’avant-bras qui tourne et fait monter la tête de raquette : on brosse la balle de bas en haut.',
      keys: [
        'Tête de raquette sous la balle avant l’impact.',
        'Pronation de l’avant-bras : c’est elle qui fait monter la tête de raquette et donne le lift.',
        'Finir haut, coude devant.'
      ],
      variants: ['Plot cible juste derrière la ligne de service adverse.', 'Revers lifté.'],
      coups: ['coup-droit', 'revers'], axes: ['profondeur', 'regularite'],
      equipment: BR, players: [1, 4], space: 'demi', duration: [6, 8, 12], intensity: 1,
      diagram: {
        zones: [['R', 'soft']],
        players: [[6.4, 7.4, 1, 'J'], [16.2, 3.6, 2, 'C']],
        marks: [['basket', 17.8, 3.6]],
        shots: [
          { p: [[15.6, 3.8], [7.2, 7.1]], tone: 'deep' },
          { p: [[7, 7.6], [21, 7.4]], arc: -3.6 },
          { p: [[5.4, 9], [1, 9]], kind: 'move' }
        ],
        labels: [[N, 2.0, '+1 M AU-DESSUS', 'tag']]
      }
    },
    {
      id: 'ac-e05', theme: 'educatif', source: SRC, refs: BIO,
      title: 'La statue', original: 'Fin de geste',
      objective: 'Terminer chaque frappe en équilibre pour un geste complet et reproductible.',
      steps: [
        'Le coach envoie au panier, en coup droit et en revers.',
        'Après chaque frappe, figer la fin de geste 2 secondes, comme une statue.',
        'Le coach valide : équilibre, raquette finie haut, poitrine face au filet.',
        'Perte d’équilibre = la balle ne compte pas.'
      ],
      score: '8 statues validées sur 10.',
      tip: 'L’équilibre n’est pas un but en soi : c’est lui qui permet de transmettre l’énergie du sol à la raquette.',
      keys: [
        'Ligne des épaules et des hanches à l’horizontale.',
        'Tête stable jusqu’au bout du geste.',
        'Poids sur la jambe avant à la fin.'
      ],
      variants: ['Statue tenue sur la jambe avant seule.', 'Après un déplacement latéral.'],
      coups: ['coup-droit', 'revers'], axes: ['equilibre', 'regularite'],
      equipment: BR, players: [1, 4], space: 'demi', duration: [5, 6, 10], intensity: 1,
      diagram: {
        zones: [['L', 'soft'], ['R', 'soft']],
        players: [[1.2, 3.9, 1, 'J'], [15.6, 5.5, 2, 'C']],
        marks: [['basket', 15.6, 7.4]],
        shots: [
          { p: [[15, 5.3], [2.4, 3.6]], tone: 'deep' },
          { p: [[2, 3.6], [21.4, 3.2]] }
        ],
        labels: [[4.2, 2.0, 'STOP 2 S !', 'bubble']]
      }
    },
    {
      id: 'ac-e06', theme: 'educatif', source: SRC, refs: BIO,
      title: 'Revers : l’autre main', original: 'Revers à deux mains',
      objective: 'Activer le bras non dominant, véritable moteur du revers à deux mains.',
      steps: [
        'Tenir la raquette avec la seule main non dominante, en haut du manche (un « coup droit » de l’autre main).',
        'Le coach envoie des balles faciles à mi-court.',
        '10 frappes à une main, puis 10 à deux mains en gardant la même sensation.',
        'Reculer progressivement vers la ligne de fond.'
      ],
      score: '7 balles sur 10 dans le court à deux mains.',
      tip: 'Au revers à deux mains, le bras non dominant accélère la raquette : ce n’est pas un passager.',
      keys: [
        'Main non dominante en haut du manche.',
        'Impact devant la hanche avant.',
        'Finir les deux mains au-dessus de l’épaule.',
        'Appui avant orienté à environ 45°, pas fermé : le corps tourne mieux, genou et cheville sont ménagés.'
      ],
      variants: ['Alterner une main / deux mains à chaque balle.', 'Balles plus rapides.'],
      coups: ['revers'], axes: ['regularite', 'profondeur'],
      equipment: BR, players: [1, 4], space: 'demi', duration: [6, 8, 10], intensity: 1,
      diagram: {
        zones: [['L.top', 'soft']],
        players: [[6, 3.4, 1, 'J'], [16.2, 5.5, 2, 'C']],
        marks: [['basket', 16.2, 7.4]],
        shots: [
          { p: [[15.6, 5.3], [6.8, 3.6]], tone: 'deep' },
          { p: [[6.6, 3.2], [21, 2.8]] }
        ],
        labels: [[5.6, 7.4, 'MAIN NON DOMINANTE', 'tag']]
      }
    },
    {
      id: 'ac-e07', theme: 'educatif', source: SRC, refs: BIO,
      title: 'Slice glissé', original: 'Revers coupé',
      objective: 'Maîtriser le revers coupé : trajectoire tendue et rebond bas.',
      steps: [
        'Commencer à la ligne de service ; le coach envoie à hauteur de hanche, côté revers.',
        'Raquette ouverte, au-dessus de la balle à la préparation.',
        'Frapper de haut en bas puis vers l’avant, en accompagnant vers la cible.',
        'Viser le fond du court côté revers adverse ; reculer quand c’est réussi.'
      ],
      score: '7 balles sur 10 dans la zone, avec un rebond sous le genou.',
      tip: 'Rester de profil jusqu’après l’impact : la main non dominante part en arrière pour équilibrer.',
      keys: [
        'Prise continentale (marteau), main au-dessus du manche : raquette ouverte, poignet ferme.',
        'Geste de haut en bas, puis long vers l’avant.',
        'Profil conservé, appui avant ancré.'
      ],
      variants: ['Slice croisé puis long de ligne.', 'Slice de coup droit.'],
      coups: ['revers'], axes: ['precision', 'toucher', 'defense'],
      equipment: ['balles', 'raquettes', 'plots'], players: [1, 4], space: 'complet', duration: [6, 8, 12], intensity: 1,
      diagram: {
        zones: [['R.back.bot', 'soft']],
        players: [[SL - 0.6, 3.4, 1, 'J'], [16.4, 4.4, 2, 'C']],
        marks: [['basket', 17.9, 4.4], ['cone', 20.6, 8.6], ['cone', 22.4, 6.6]],
        shots: [
          { p: [[15.8, 4.3], [5.6, 3.5]], tone: 'deep' },
          { p: [[5.4, 3.3], [21.4, 7.8]] }
        ],
        labels: [[21.2, 10.3, 'REBOND BAS', 'plainInk']]
      }
    },

    /* ---------------- Service & retour ---------------- */
    {
      id: 'ac-e08', theme: 'educatif', source: SRC, refs: BIO,
      title: 'Lancer de balle', original: 'Lancer au service',
      objective: 'Fiabiliser le lancer de balle, base d’un service régulier.',
      steps: [
        'Poser une raquette au sol, tamis devant l’appui avant et légèrement vers le court.',
        'Se mettre en position de service.',
        'Lancer bras tendu, sans frapper : la balle doit retomber sur le tamis.',
        'Après 5 lancers réussis, enchaîner lancer + service.'
      ],
      score: '7 lancers sur 10 qui retombent sur le tamis.',
      tip: 'Le bras de lancer reste tendu vers la balle : il stabilise le haut du corps.',
      keys: [
        'Bras de lancer tendu, montée lente et régulière.',
        'La main lâche la balle à hauteur des yeux.',
        'Le bras reste tendu vers le haut après le lâcher.'
      ],
      variants: ['Cible : un cerceau ou un plot.', 'Lancer décalé pour le slice ou le lift.'],
      coups: ['service'], axes: ['regularite', 'precision', 'equilibre'],
      equipment: BR, players: [1, 6], space: 'complet', duration: [5, 6, 8], intensity: 1,
      diagram: {
        zones: [['R.box.top', 'soft']],
        players: [[-0.6, 6.3, 1]],
        marks: [['ring', 0.5, 5.6]],
        shots: [
          { p: [[0.1, 6.1], [16.6, 2.9]], tone: 'deep', kind: 'throw' }
        ],
        labels: [[3.6, 7.8, 'RAQUETTE AU SOL', 'tag'], [15, 6.6, 'PUIS SERVICE', 'plainInk']]
      }
    },
    {
      id: 'ac-e09', theme: 'educatif', source: SRC, refs: BIO,
      title: 'Service à genoux', original: 'Bras de service',
      objective: 'Isoler le travail du bras au service : boucle, rotation de l’avant-bras, frappe vers le haut.',
      steps: [
        'Un genou au sol sur la ligne de service (genou côté raquette).',
        'Servir dans le carré opposé, en diagonale.',
        'Frapper vers le haut : la balle monte avant de redescendre dans le carré.',
        'Réussi : reculer à mi-distance, puis servir debout depuis la ligne de fond.'
      ],
      score: '6 services sur 10 dans le carré.',
      tip: 'Sans les jambes, la vitesse vient du bras et de l’avant-bras qui tourne à l’impact.',
      keys: [
        'Coude haut, raquette qui passe dans le dos (boucle).',
        'Impact bras tendu, au-dessus de la tête.',
        'Pronation de l’avant-bras à l’impact : la paume finit tournée vers l’extérieur.'
      ],
      variants: ['Viser le T ou l’extérieur.', 'Assis sur un banc.'],
      coups: ['service'], axes: ['precision'],
      equipment: BR, players: [1, 6], space: 'complet', duration: [6, 8, 10], intensity: 1,
      diagram: {
        zones: [['R.box.top', 'soft']],
        players: [[SL, 7.2, 1], [-0.6, 7.2, 1]],
        shots: [
          { p: [[5.9, 7], [16.4, 3]], arc: -2.2 },
          { p: [[4.4, 8.6], [0.4, 8.6]], kind: 'move' }
        ],
        labels: [[5.6, 9.6, 'À GENOUX', 'tag']]
      }
    },
    {
      id: 'ac-e10', theme: 'educatif', source: SRC, refs: BIO,
      title: 'Le lanceur', original: 'Geste de lancer',
      objective: 'Retrouver le geste de lancer, base du service et du smash.',
      steps: [
        'Sans raquette, avec de vieilles balles, se placer de profil sur la ligne de fond.',
        'Lancer par-dessus le filet, bras haut, comme un lanceur de javelot.',
        'Viser d’abord le carré de service, puis le fond du court adverse.',
        'Laisser la jambe arrière passer devant à la fin du geste.'
      ],
      score: '7 lancers sur 10 dans la zone visée.',
      tip: 'Le geste part du sol : poussée des jambes, rotation du tronc, puis épaule, coude, poignet. Le bras arrive en dernier.',
      keys: [
        'De profil, bras non dominant tendu vers la cible.',
        'Coude au-dessus de l’épaule au lâcher.',
        'La jambe arrière passe devant à la fin.'
      ],
      variants: ['Lancer à genoux.', 'Lancer un ballon léger.'],
      coups: ['service', 'smash'], axes: ['precision', 'profondeur'],
      equipment: ['balles'], players: [1, 8], space: 'complet', duration: [4, 6, 8], intensity: 1,
      diagram: {
        zones: [['R.box.top', 'soft'], ['R.back', 'strong']],
        players: [[-0.6, 6.2, 1]],
        shots: [
          { p: [[0, 6], [15.4, 3.2]], arc: -2.4, kind: 'throw' },
          { p: [[0, 6.3], [21.2, 6.4]], arc: -3.4, kind: 'throw' }
        ],
        labels: [[15.1, 4.5, '1', 'plainInk'], [21, 8.6, '2', 'plainWhite']]
      }
    },
    {
      id: 'ac-e11', theme: 'educatif', source: SRC, refs: BIO,
      title: 'Retour bloqué', original: 'Retour de service',
      objective: 'Retourner avec un geste court et des appuis réactifs face aux services rapides.',
      steps: [
        'Le relanceur avance d’un pas dans le court.',
        'Le serveur (ou le coach) sert depuis la ligne de service pour accélérer la balle.',
        'Allègement déclenché quand la raquette du serveur accélère, reprise d’appuis, petit pivot des épaules, frappe bloquée devant soi.',
        'Viser la zone profonde au centre du court.'
      ],
      score: '7 retours sur 10 au-delà de la ligne de service.',
      tip: 'Raccourcir le geste, pas l’engagement : le poids qui avance donne la profondeur.',
      keys: [
        'Allègement réglé sur l’accélération de la raquette du serveur, pas sur son lancer de balle.',
        'Préparation courte : épaules tournées, raquette devant.',
        'Reprise d’appuis orientée, puis poussée vers la balle à partir de l’appui intérieur ; ensuite freiner et se replacer face au jeu.'
      ],
      variants: ['Le serveur recule peu à peu jusqu’à la ligne de fond.', 'Retour croisé ou long de ligne imposé.'],
      coups: ['retour'], axes: ['reaction', 'profondeur'],
      equipment: BR, players: [2, 4], space: 'complet', duration: [8, 10, 12], intensity: 2,
      diagram: {
        zones: [[[SR, 3.4, W, 7.6], 'soft']],
        players: [[1.2, 7.6, 1, 'R'], [SR, 3.2, 2, 'S']],
        shots: [
          { p: [[17.6, 3.3], [7.2, 7.4]], tone: 'deep' },
          { p: [[1.8, 7.5], [21.4, 5.6]] }
        ],
        labels: [[2.4, 9.8, '1 PAS DEDANS', 'tag']]
      }
    },

    /* ---------------- Filet ---------------- */
    {
      id: 'ac-e12', theme: 'educatif', source: SRC,
      title: 'Volée main courte', original: 'Volée sans armé',
      objective: 'Contrôler la volée avec un geste court et un tamis stable.',
      steps: [
        'Tenir la raquette au cœur (main près du tamis), au milieu du carré de service.',
        'Le coach envoie des balles faciles, en coup droit puis en revers.',
        'Bloquer la balle devant soi, sans armer, en avançant le pied opposé.',
        'Toutes les 5 volées réussies, descendre la main d’un cran sur le manche.'
      ],
      score: 'Arriver en prise normale en gardant 4 volées sur 5 dans le court.',
      tip: 'La raquette ne recule pas : impact devant, tête de raquette au-dessus du poignet.',
      keys: [
        'Prise marteau (continentale).',
        'Pas d’armé : on « bloque » devant soi.',
        'Tête de raquette au-dessus du poignet.'
      ],
      variants: ['Volées basses, genoux fléchis.', 'Volées alternées rapides.'],
      coups: ['volee'], axes: ['filet', 'toucher'],
      equipment: BR, players: [1, 4], space: 'mini', duration: [6, 8, 10], intensity: 1,
      diagram: {
        zones: [['R.back', 'soft']],
        players: [[8.6, 5.5, 1, 'J'], [15.2, 5.5, 2, 'C']],
        marks: [['basket', 15.2, 7.4]],
        shots: [
          { p: [[14.6, 5.3], [9.4, 3.9]], tone: 'deep' },
          { p: [[14.6, 5.7], [9.4, 7.1]], tone: 'deep' },
          { p: [[9.4, 3.7], [20.6, 3.2]] },
          { p: [[9.4, 7.3], [20.6, 7.8]] }
        ],
        labels: [[5.6, 9.4, 'MAIN AU CŒUR', 'tag']]
      }
    },
    {
      id: 'ac-e13', theme: 'educatif', source: SRC, refs: BIO,
      title: 'Volée : le bon pied', original: 'Appuis à la volée',
      objective: 'Aller chercher la volée vers l’avant avec le bon appui.',
      steps: [
        'Départ entre la ligne de service et le filet.',
        'Le coach envoie à droite ou à gauche.',
        'Pousser sur la jambe arrière et poser le pied opposé à la balle vers l’avant (pied gauche en coup droit pour un droitier).',
        'Volée devant soi, réception sur l’appui avant, puis retour au centre.'
      ],
      score: '8 volées sur 10 avec le bon pied et dans le court.',
      tip: 'Volée basse : rester fléchi et ancrer l’appui avant au sol à l’impact.',
      keys: [
        'Allègement déclenché pendant l’accélération de la raquette du coach.',
        'Pas croisé vers l’avant, pied opposé à la balle.',
        'Transfert vers l’avant : volée haute, réception sur le pied avant après l’impact ; volée basse, pied avant au sol à l’impact.'
      ],
      variants: ['Volées basses : toucher un plot avec la main avant.', 'Enchaîner volée basse puis volée haute.'],
      coups: ['volee'], axes: ['filet', 'deplacement', 'equilibre'],
      equipment: BR, players: [1, 4], space: 'mini', duration: [6, 8, 10], intensity: 2,
      diagram: {
        zones: [['L.boxes', 'soft']],
        players: [[8, 5.5, 1, 'J'], [16.4, 5.5, 2, 'C']],
        marks: [['basket', 16.4, 7.4]],
        shots: [
          { p: [[8.4, 5], [10, 3.6]], kind: 'move' },
          { p: [[8.4, 6], [10, 7.4]], kind: 'move' },
          { p: [[15.8, 5.3], [10.6, 3.2]], tone: 'deep' },
          { p: [[15.8, 5.7], [10.6, 7.8]], tone: 'deep' }
        ]
      }
    },
    {
      id: 'ac-e14', theme: 'educatif', source: SRC, refs: BIO,
      title: 'Smash : la main vise', original: 'Placement au smash',
      objective: 'Se placer sous la balle haute et smasher avec un geste simplifié.',
      steps: [
        'Départ au milieu du carré de service, raquette déjà armée derrière la tête.',
        'Le coach lobe depuis le fond du court adverse.',
        'Se mettre de profil, pointer la balle avec la main non dominante, reculer en pas chassés.',
        'Frapper en suspension et retomber sur la jambe avant (ciseau).'
      ],
      score: '7 smashs sur 10 dans la zone visée.',
      tip: 'Par rapport au service : préparation plus directe, moins de rotation du tronc, saut vers le haut et l’arrière.',
      keys: [
        'Main non dominante qui pointe la balle.',
        'Pas chassés vers l’arrière, jamais à reculons de face.',
        'Impact tronc vertical, réception en ciseau.'
      ],
      variants: ['Lobs plus profonds.', 'Smash après rebond.'],
      coups: ['smash'], axes: ['deplacement', 'precision'],
      equipment: BR, players: [1, 4], space: 'complet', duration: [6, 8, 10], intensity: 2,
      diagram: {
        zones: [['R.back', 'soft']],
        players: [[8.4, 5.5, 1, 'J'], [R, 5.5, 2, 'C']],
        marks: [['basket', R, 7.4]],
        shots: [
          { p: [[24.4, 5.3], [5.8, 4.6]], arc: -3.6, tone: 'deep' },
          { p: [[8.2, 6.6], [5.4, 6.6]], kind: 'move' },
          { p: [[6.2, 4.4], [20.6, 7.8]] }
        ],
        labels: [[6.4, 8.6, 'LA MAIN VISE', 'bubble']]
      }
    },
    {
      id: 'ac-e15', theme: 'educatif', source: SRC,
      title: 'Amorti caresse', original: 'Amorti',
      objective: 'Développer le toucher pour faire mourir la balle près du filet.',
      steps: [
        'Le coach envoie des balles faciles à mi-court.',
        'Raquette ouverte, préparation haute et courte, comme pour un slice.',
        'Glisser la raquette sous la balle, en douceur, sans frapper.',
        'Viser la zone entre le filet et une ligne tracée à 2 m.'
      ],
      score: '6 amortis sur 10 dans la zone, avec 3 rebonds avant la ligne de service.',
      tip: 'Même préparation que le slice pour masquer l’intention : seule la vitesse de raquette change.',
      keys: [
        'Raquette ouverte, prise marteau.',
        'Geste court, la raquette « caresse » sous la balle.',
        'Le corps avance, le poignet ne casse pas.'
      ],
      variants: ['Amorti de revers.', 'Le coach court après l’amorti : point s’il ne l’atteint pas.'],
      coups: ['amorti'], axes: ['toucher', 'precision'],
      equipment: ['balles', 'raquettes', 'lignes'], players: [1, 4], space: 'demi', duration: [6, 8, 10], intensity: 1,
      diagram: {
        zones: [[[N, T, N + 2, B], 'strong']],
        lines: [{ p: [[N + 2, T], [N + 2, B]], dash: true }],
        players: [[6.4, 6.8, 1, 'J'], [20, 5.5, 2, 'C']],
        marks: [['basket', 20, 7.4]],
        shots: [
          { p: [[19.4, 5.6], [7, 6.6]], tone: 'deep' },
          { p: [[7, 6.9], [12.8, 5.2]], arc: -1.4 }
        ],
        labels: [[N + 1, 2.4, '2 M', 'plainWhite']]
      }
    }
  );
})();
