# Assistant Coach — Générateur de séances de tennis

Application web sans installation : ouvrir `index.html` dans Chrome, Safari ou Firefox.
(Ou, depuis le dossier `Assistant_coach` : `python3 -m http.server 8765 --directory app` puis http://localhost:8765.)

## Sur le téléphone, même hors ligne

L'appli est en ligne sur **https://clemperz.github.io/assistant-coach/** (GitHub Pages).

1. Ouvrir l'adresse une première fois avec du réseau : l'appli se met en cache (un bandeau confirme « prête à fonctionner hors ligne »).
2. L'ajouter à l'écran d'accueil :
   - **iPhone** (Safari) : bouton Partager → « Sur l'écran d'accueil » ;
   - **Android** (Chrome) : menu ⋮ → « Installer l'application » (ou « Ajouter à l'écran d'accueil »).
3. Elle s'ouvre ensuite comme une appli, en plein écran, avec ou sans réseau.

Quand une nouvelle version est publiée, l'appli la télécharge en arrière-plan à la prochaine ouverture avec réseau
et propose « Recharger ». Les données restent sur chaque appareil : pour les transférer, **Exporter** puis **Importer**.

## Publier une modification

```bash
python3 scripts/maj_sw.py      # met à jour la liste des fichiers hors ligne et la version (sw.js)
git add -A && git commit -m "…" && git push
```

GitHub Pages republie en une à deux minutes. Sans `maj_sw.py`, les téléphones garderaient l'ancienne version.

Les séances enregistrées, les cartes perso et les réglages sont gardés dans le navigateur (localStorage).
Les boutons **Exporter / Importer** (Cartothèque, Mes séances) permettent de les sauvegarder ou de les transférer en JSON.

## Les types de situation (les couleurs)

Dans le code, le champ `theme` d'une carte désigne son **type de situation** (sa couleur). Les **thèmes de travail**
(ce que la carte fait travailler) sont décrits plus bas.

| Type | Couleur | Rôle | Source de la 1re base |
|---|---|---|---|
| Échauffement | vert | Activer corps et cerveau | Tennis Mentor « Activator » (12) |
| Éducatif | violet | Isoler un élément technique | Créations Assistant Coach (15 + 23 « jeu de jambes » + 16 « coups de fond » + 12 « service et retour » + 12 « jeu au filet »), repères tirés des cours de biomécanique Genevois |
| Drill | jaune | Situation fermée, répétition | Tennis Mentor « Drill » (12) |
| Mixte | orange | Début de point imposé / contraintes, puis jeu libre | Tennis Mentor « Game » à début imposé (11) |
| Situation ouverte | rouge | Jeux à score, pression | Tennis Mentor « Game » (13) |
| Focus | bleu | Intention mentale de la séance | Tennis Mentor « Focus » (6) |

Le paquet **Pressure Tennis** (P. Wardlaw) ajoute 44 cartes réparties dans tous les thèmes : 2 échauffements,
2 éducatifs, 4 drills, 19 mixtes, 13 situations ouvertes et 4 Focus. Le thème de travail « Inside / Outside » permet de
les filtrer ou d'en faire l'objectif d'une séance :
- balle **outside** (elle croise devant le corps) → on la rejoue croisé ;
- balle **inside** (elle arrive dans le corps sans le croiser) → on change de direction vers le côté ouvert ;
- balle **outside courte**, pieds dans le court → changement de direction à **90°** (droit vers la ligne de fond).

Le paquet **Double** (25 cartes, champ `format: 'double'`) se joue à 2 (1 contre 1 sur un demi-terrain de double),
à 3 (2 contre 1) ou à 4. Dans les réglages, **Format : Simple / Double** : en simple, ces cartes sont écartées ;
en double, elles sont nettement favorisées (les échauffements et éducatifs génériques restent possibles).

Le paquet **Tennis Tactics** (27 cartes, d'après *The Book On Tennis Strategy* de J. Hinkle) reprend les schémas
tactiques du livre : le mur de 8 m et la fenêtre de 4 m, défense / neutre / attaque, les 2, 3 et 4 couloirs (A B C D),
le X (angle 1 / angle 2) et les **ouvertures codées** des 4 premières balles. Exemple : **3222** = service au T côté égalité (3),
retour profond au milieu côté égalité (2), puis première frappe de chacun au milieu côté égalité (2, 2).
Service : 1 extérieur, 2 corps, 3 T (égalité) · 4 T, 5 corps, 6 extérieur (avantage). Autres chiffres : zone d'arrivée chez
celui qui reçoit, 1 couloir extérieur côté égalité, 2 et 3 milieu (égalité / avantage), 4 couloir extérieur côté avantage ;
5 à 8 = mêmes couloirs en balle courte ; 0 = balle libre.
Ces cartes utilisent des **terrains verticaux** (joueur 1 en bas, comme dans la synthèse du livre). Une ouverture est dessinée
sur **deux terrains côte à côte** : « Service + retour » (frappes 1 et 2) puis « Balles 3 + 4 », chaque flèche portant son numéro,
la zone visée étant colorée. Les repères de hauteur (double filet, trois trajectoires) sont des schémas de profil.

Le paquet **Jeu de jambes** (23 éducatifs, `ac-j01` à `ac-j23`) suit le cours de C. Genevois *Biomécanique du jeu de jambes
au tennis*, dans l'ordre des 5 composantes du cycle :
1. saut d'allègement et reprise d'appuis (appui extérieur, pas latéral, pas gravitationnel, choix selon la distance) ;
2. déplacement (pas chassés, pas courus, décalage coup droit, accélérer / freiner, glissade) ;
3. et 4. placement et appuis à la frappe (appuis en ligne, pivot en appuis ouverts, transfert vers l'avant, décrochage arrière,
   pas croisé avec freinage sur deux appuis, saut latéral, lancers de médecine-ball) ;
5. replacement (pas chassé, pas croisé, choix selon le temps disponible) ;
puis réactivité du pied, jeu réduit, volée d'approche et retour de service.
Pour les retrouver : chercher « jeu de jambes » dans la Cartothèque, ou ouvrir le thème de travail « Déplacement et replacement ».
Ces cartes ont un poids de tirage réduit (`drawWeight: 0.4`, réglable en tête de `cards-jambes.js`) ; dès qu'un objectif correspond à l'un de
leurs thèmes de travail (Déplacement, Réaction, Équilibre…), elles reprennent leur plein poids. Un coup en commun (« Coup droit ») ne suffit pas.

Le paquet **Coups de fond de court** (16 éducatifs, `ac-f01` à `ac-f16`) suit le cours de C. Genevois *Biomécanique des coups de
fond de court* et sa « fusée à 3 étages » :
- cadre, prises, analyse : prise de terrain et temps adverse, prises de coup droit, 5 positions clés de la raquette (vidéo), transition ;
- 1er étage, les jambes : accélérateurs du coup droit, choix des appuis, ancrage et stabilisation, variété du jeu de jambes en attaque ;
- 2e étage, le tronc : relation tronc / bras, bras libre, lancers de médecine-ball à deux mains puis à une main ;
- 3e étage, le bras : hauteur d'impact, revers à deux mains (bras non dominant), revers à une main, lift / slice, amplitude de préparation.
Poids de tirage `drawWeight: 0.6` (en tête de `cards-fond.js`). Recherche : « coups de fond ».

Le paquet **Service et retour** (12 éducatifs, `ac-s01` à `ac-s12`) :
- service, technique (8 cartes) : rampe de lancement, chaîne étage par étage, bascule des épaules, équilibre et arabesque, énergie élastique,
  compromis précision / vitesse, du service au smash, formats adaptés — d'après les passages du cours général de Genevois où le service
  sert d'exemple (ce cours n'a pas de chapitre entier sur le service) ;
- service, placement (1 carte) et retour (3 cartes) : placement du serveur, bissectrice au retour, première ou seconde balle, prise d'attente —
  d'après Ravilly, avec les repères de Genevois sur l'allègement.
Poids de tirage `drawWeight: 0.8` (en tête de `cards-service.js`). Recherche : « service » ou « retour ».

Le paquet **Jeu au filet** (12 éducatifs, `ac-v01` à `ac-v12`) :
- volée, technique (4 cartes) : équilibre et contrepoids, prise continentale, volée basse, volée de finition placée — Genevois et Ravilly ;
- monter et se placer (2 cartes) : placement « gardien de but » sur la bissectrice, approche rasante long de ligne — Ravilly ;
- smash (2 cartes) : smash ou volée haute, smash placé — Ravilly, appuis d'après Genevois ;
- le filet vu d'en face (4 cartes) : lob, lob ou balle dans les pieds, passing côté revers, réponse à une amortie — Ravilly.
Poids de tirage `drawWeight: 0.8` (en tête de `cards-filet.js`). Sans objectif, les quatre paquets d'éducatifs pèsent chacun environ un
sixième des éducatifs tirés, les 19 éducatifs d'origine un tiers. Recherche : « volée », « smash », « lob ».

Attention au mot **« extérieur »**, qui change de sens chez Genevois selon le moment : à la reprise d'appuis, l'appui extérieur est
le pied le plus **éloigné** de la balle ; à la frappe et au replacement, c'est le pied **côté balle** (côté couloir).
Les cartes le précisent à chaque fois.

**Mixte** : d'après la FFT, les « formes mixtes » sont des situations lancées par l'entraîneur ou à début d'échange imposé,
dont la suite du point est libre. Les cartes rouges Tennis Mentor qui imposent un lancement, une direction ou un coup
(ex. Attaque – Défense, Service-volée, Que des coups droits) ont donc été classées en Mixte. Pour changer une carte de thème,
il suffit de modifier son champ `theme` dans `js/data/cards.js`.

## Les thèmes de travail

Chaque carte est classée dans un ou plusieurs **thèmes de travail** (4 en moyenne), regroupés en 5 familles.
Les 8 coups (`coups`) restent la famille « Technique ».

| Famille | Thèmes |
|---|---|
| Situations de jeu | Début de point (service, retour, +1) · Échange de fond de court · Montée et jeu au filet · Face au joueur au filet |
| Intentions tactiques | Défendre et neutraliser · Construire le point · Presser et attaquer · Conclure · Schémas et enchaînements |
| Qualité et placement de la balle | Régularité · Profondeur · Précision et zones · Directions · Inside / Outside · Marge · Variations |
| Physique et motricité | Déplacement · Réaction · Équilibre · Rythme · Toucher |
| Mental et décision | Pression · Décision · Concentration |

Les deux premières familles reprennent le découpage de l'ITF (5 situations de jeu × intentions attaque / neutre / défense),
les suivantes s'appuient sur Hinkle, Ravilly (*Tennis, les fondamentaux tactiques*), Wardlaw, Genevois (biomécanique) et
Martin (*Tennis – Optimisation de la performance*). Les fiches des types de situation suivent les catégories d'exercices de la FFT
(matchs libres, jeu dirigé, exercices de répétition).

Tout est dans `js/data/classification.js` :
- `AC.AXE_FAMILIES` : les familles ; `AC.AXE_INFO` : la fiche de chaque thème (`label`, `tag`, `short`, `detail`, `points`, `sources`) ;
- `AC.TYPE_INFO` : la fiche détaillée de chaque type de situation ;
- le classement : `RULES` (règles automatiques : une carte avec service ou retour est un « début de point »…),
  `ASSIGN` (listes de cartes par thème) et `AC.CLASSIF` (thèmes à retirer d'une carte). Les `axes` écrits dans une carte sont conservés.

Pour classer une nouvelle carte : mettre ses thèmes dans son champ `axes`, ou ajouter son `id` aux listes de `ASSIGN`.
Dans l'appli : Cartothèque → **Par thème de travail** (sommaire, fiche du thème, cartes groupées par type), filtres de la
cartothèque, objectifs du générateur et verso des cartes.

## Structure

```
app/
├── index.html
├── manifest.webmanifest    nom, icônes et couleurs de l'appli installée
├── sw.js                   service worker : cache hors ligne (VERSION et ASSETS écrits par scripts/maj_sw.py)
├── scripts/maj_sw.py       met à jour sw.js avant chaque publication
├── icons/                  icônes de l'appli (192, 512, maskable, apple-touch-icon)
├── css/styles.css
└── js/
    ├── data/themes.js   référentiels : thèmes, coups, axes, matériel, modèles de séance
    ├── data/cards.js    base Tennis Mentor (54 cartes)
    ├── data/cards-educatif.js   paquet Éducatif (15 cartes, créations)
    ├── data/cards-pressure.js   paquet Pressure Tennis (44 cartes : pression + inside / outside)
    ├── data/cards-double.js     paquet Double (25 cartes, Pressure Tennis chapitre 7)
    ├── data/cards-tactics.js    paquet Tennis Tactics (27 cartes : couloirs, X, ouvertures)
    ├── data/cards-jambes.js     paquet Jeu de jambes (23 éducatifs, d'après Genevois)
    ├── data/cards-fond.js       paquet Coups de fond de court (16 éducatifs, d'après Genevois)
    ├── data/cards-service.js    paquet Service et retour (12 éducatifs, d'après Genevois et Ravilly)
    ├── data/cards-filet.js      paquet Jeu au filet (12 éducatifs, d'après Genevois et Ravilly)
    ├── data/classification.js   thèmes de travail : familles, fiches détaillées, classement des cartes
    ├── icons.js         icônes et pictogrammes
    ├── court.js         dessin des schémas de terrain (SVG)
    ├── card.js          rendu des cartes (recto, verso « fiche coach », mini-carte)
    ├── store.js         stockage local + accès à la base (intégrée + perso)
    ├── generator.js     tirage pondéré, répartition du temps, bilan de séance
    └── app.js           interface
```

Les nouvelles cartes s'ajoutent par **paquets** : un fichier `js/data/cards-<nom>.js` qui fait `AC.CARDS.push(…)`,
déclaré dans `index.html` après `cards.js` et **avant** `classification.js`. La base Tennis Mentor reste ainsi intacte.

Après une modification de la base, augmenter le `?v=…` des balises `<script>` dans `index.html` pour forcer les navigateurs à recharger.

**Confirmations** : ne pas utiliser `window.confirm`, `alert` ni `prompt`. Certains navigateurs intégrés et applis installées les bloquent
sans rien afficher (la réponse est alors « non »), ce qui rendait l'éditeur de carte impossible à fermer. Utiliser `askConfirm(message, { yes, no, danger }, onYes)`
dans `app.js` : la question s'affiche dans l'appli (`#confirm-root`), Échap ou un clic à côté répondent « non ».

**Navigation** : chaque action redessine la vue. Une zone qui défile en interne (panneau, barre d'onglets) doit porter
`data-scroll="nom-unique"` pour garder sa position. Les fenêtres et le mode terrain ajoutent une entrée d'historique :
le bouton « retour » du téléphone les ferme, puis revient à l'onglet précédent. La fiche d'un thème de travail fait de même
(« retour » ramène au sommaire des thèmes, à l'endroit où on l'avait quitté).

## Format d'une carte

```js
{
  id: 'edu-01',                 // unique
  theme: 'educatif',            // echauffement | educatif | drill | mixte | ouvert | focus
  source: 'Assistant Coach',
  title: 'Coup droit en appui',
  original: '',                 // titre d'origine éventuel
  objective: 'Une phrase : ce que le joueur apprend.',
  steps: ['Consigne 1', 'Consigne 2'],   // déroulement (une ligne « 1. … » s'affiche numérotée)
  score: 'Comment on compte / quand ça s’arrête.',
  tip: 'Le conseil du bas de carte.',
  variants: ['Plus facile…', 'Plus difficile…'],
  keys: ['Point technique 1', '…'],   // « Points clés » : verso, mode terrain, impression
  refs: 'Biomécanique (Genevois)',    // facultatif : d'où viennent les repères
  scoreLabel: 'Réussite',             // facultatif (par défaut « Réussite » en Éducatif, « Score » ailleurs)
  coups: ['coup-droit'],        // clés de AC.COUPS
  axes: ['deplacement'],        // thèmes de travail : clés de AC.AXE_INFO (complétés par classification.js)
  equipment: ['balles', 'raquettes', 'plots', 'lignes', 'chrono'],
  eqNote: '2 balles',           // facultatif
  players: [1, 4],              // min, max
  space: 'demi',                // hors | mini | demi | complet
  format: 'double',             // facultatif : uniquement pour les cartes de double
  duration: [8, 10, 15],        // min, conseillée, max (minutes)
  intensity: 2,                 // 1 à 3
  drawWeight: 0.4,              // facultatif : poids au tirage (1 par défaut), ignoré si un thème de la carte est un objectif choisi
  diagram: { … }                // voir ci-dessous
}
```

Les cartes Focus n'ont besoin que de `id`, `theme: 'focus'`, `title`, `objective`, `steps` et `diagram: { picto: '…' }`.

### Schéma de terrain (`diagram`)

Terrain vu de dessus, horizontal, coordonnées en **mètres** : x de 0 (fond gauche) à 23,77 (fond droit), filet à 11,885 ;
y de 0 (couloir du haut) à 10,97 (couloir du bas). Lignes de simple à y = 1,37 et 9,6 ; lignes de service à x = 5,485 et 18,285.
Joueur derrière le fond gauche : x ≈ −1,3 ; derrière le fond droit : x ≈ 25,1.

```js
diagram: {
  names: ['P1', 'P2'],                       // étiquettes en haut à gauche / droite
  score: '1 – 0',                            // pastille de score
  zones: [['L', 'soft'], ['R.box.top', 'strong'], [[x1, y1, x2, y2], 'grey']],
  lines: [{ p: [[x1, y1], [x2, y2]], dash: true, color: 'strong', w: 3 }],
  hole: [x, y, rayon],                       // zone interdite (trou noir)
  marks: [['cone', x, y], ['ring', x, y], ['dot', x, y], ['x', x, y], ['basket', x, y]],  // basket = panier du coach
  shots: [
    { p: [[x1, y1], [x2, y2]] },             // frappe (couleur du thème)
    { p: [[…], […]], kind: 'rally' },        // échange aller-retour
    { p: [[…], […]], kind: 'move' },         // déplacement (pointillé)
    { p: [[…], […]], kind: 'move2' },        // déplacement aller-retour
    { p: [[…], […]], kind: 'throw', arc: -3 },// lancer / balle haute en arc
    { p: [[…], […]], tone: 'deep' }          // 2e couleur (autre joueur)
  ],
  players: [[x, y, 1, 'J1'], [x, y, 2, 'J2']],     // 1 = plein, 2 = vide, puis code dans le rond
  labels: [[x, y, 'TEXTE', 'tag' | 'dark' | 'bubble' | 'plain' | 'plainStrong' | 'plainWhite']]
}
```

**Qui est qui** : tout joueur cité dans le texte porte son code dans le rond du schéma.
- `J1`…`J4` : joueurs numérotés. En simple, J1 plein (à gauche) contre J2 vide. En double à 4, J1 et J2 (pleins) contre J3 et J4 (vides).
- Rôles : `J` joueur (exercice au panier), `C` coach, `S` serveur, `R` relanceur, `P` partenaire (même couleur que son coéquipier), `A` attaquant, `D` défenseur. Une légende s'affiche automatiquement sous le schéma.
- `1`, `2`, `3`… : ordre des frappes (et non des joueurs).

Vocabulaire retenu : « règles inside / outside » (pas « directionnels »), « balle bombée » (loop), « frappe appuyée » (drive), « équipe au service / au retour », « position classique (un au filet, un au fond) », « saut d'allègement ». Textes à l'infinitif ou impersonnels (pas de « vous »).

**Terrain vertical et terrains multiples** (mêmes coordonnées en mètres ; le joueur du fond gauche se retrouve en bas,
son côté égalité à droite) :

```js
diagram: { orient: 'v', caption: 'TITRE SOUS LE TERRAIN', zones: […], shots: […], players: […] }
diagram: { panels: [ { caption: 'SERVICE + RETOUR', … }, { caption: ['BALLES 3 + 4', '2e ligne'], … } ] }
shots: [{ p: [[…], […]], n: '1', at: 0.42 }]   // pastille numérotée sur la flèche, placée à 42 % du trajet
labels: [[x, y, 'A', 'big']]                    // grande lettre de couloir ('big', 'bigWhite') ; 'plainInk' = texte sombre
```

**Vignettes d'appuis** (`frames`) : pour montrer un jeu de jambes, une suite de 2 à 4 vignettes numérotées, pieds vus de dessus,
filet en haut. Chaque vignette est un carré de 100 × 100 (environ 2 m de côté), x vers la droite, y vers le bas.

```js
diagram: {
  note: 'Vu de dessus, filet en haut. Exemple : …',        // phrase de lecture affichée sous le schéma
  frames: [{
    caption: ['RÉCEPTION SUR', 'LE PIED ÉLOIGNÉ'],          // 1 à 3 lignes (≈ 20 caractères ; 17 s'il y a 4 vignettes)
    feet: [[32, 64, -6, 'G', 'on'], [66, 58, 40, 'D', 'air']],  // x, y, angle (0 = pointe vers le filet, 90 = vers la droite), lettre, état
    arrows: [{ p: [[30, 90], [58, 90]], kind: 'push' }],    // push = le corps est poussé ; move = trajet d'un pied ; ball ; turn
    cg: [47, 38],                                           // pastille « CG » (centre de gravité)
    ball: [88, 33],
    lines: [[32, 20, 32, 94, 1]],                           // ligne au sol (dernier 1 = pointillé)
    labels: [[50, 90, 'BASE LARGE', 'plainStrong']]
  }]
}
```
États d'un pied : `on` appui chargé (plein), `light` posé (blanc), `air` en l'air (pointillé).

Une zone peut aussi être un polygone : `[[[x1, y1], [x2, y2], [x3, y3]], 'soft']` (triangles du X).

Zones nommées : `L`, `R` (moitiés de simple), `L.top`, `L.bot`, `L.boxes`, `L.box.top`, `L.box.bot`, `L.back`,
`L.back.top`, `L.back.bot`, `L.alley.top`, `L.alley.bot`, `L.dbl`, `L.dbl.top`, `L.dbl.bot` (couloirs compris)
et leurs équivalents `R.…`, plus `court` et `full`.
Couleurs de zone : `soft`, `strong`, `grey`, `dark`.

Pictogrammes disponibles (`diagram: { picto: 'nom' }`) : plusminus, tug, risk, serve, rush, tempo, collision, drops,
hand, reset, gear, chase, bulb, bounce, runner, doublenet (filet + corde, vu de profil), heights (3 hauteurs de balle),
rocket (fusée à 3 étages), launch (chaîne du service), keypos (5 positions clés de la raquette), impact3 (hauteur d'impact), grips (facettes du manche).
