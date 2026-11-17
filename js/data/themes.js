/* ==========================================================================
   Assistant Coach — Référentiels (thèmes, tags, matériel)
   Toutes les listes utilisées par les filtres et le générateur.
   ========================================================================== */
window.AC = window.AC || {};

/* Thèmes de situations, dans l'ordre logique d'une séance :
   du plus fermé (échauffement, éducatif, drill) au plus ouvert (jeu). */
AC.THEMES = {
  echauffement: {
    id: 'echauffement',
    label: 'Échauffement',
    plural: 'Échauffements',
    icon: 'bolt',
    color: '#21A47B',
    deep: '#16805F',
    soft: '#D5F1E6',
    ink: '#FFFFFF',
    tm: 'Activator (vertes)',
    pitch: 'Activer le corps et le cerveau : coordination, réactivité, toucher.',
    weight: 0.7,          // poids relatif dans la répartition du temps
    defaultCount: 1
  },
  educatif: {
    id: 'educatif',
    label: 'Éducatif',
    plural: 'Éducatifs',
    icon: 'target',
    color: '#7C5BD9',
    deep: '#5D3FB8',
    soft: '#E8E0FB',
    ink: '#FFFFFF',
    tm: '—',
    scoreLabel: 'Réussite',
    pitch: 'Isoler un élément technique pour l’apprendre ou le corriger.',
    weight: 0.9,
    defaultCount: 0
  },
  drill: {
    id: 'drill',
    label: 'Drill',
    plural: 'Drills',
    icon: 'ball',
    color: '#F5C928',
    deep: '#D9A900',
    soft: '#FBF0BF',
    ink: '#16161A',
    shot: '#16161A',      // trajectoires en noir sur fond jaune (lisibilité)
    tm: 'Drill (jaunes)',
    pitch: 'Situations fermées : répétition, régularité, précision.',
    weight: 1,
    defaultCount: 2
  },
  mixte: {
    id: 'mixte',
    label: 'Mixte',
    plural: 'Mixtes',
    icon: 'mix',
    color: '#F2832B',
    deep: '#CF6514',
    soft: '#FDE3CC',
    ink: '#FFFFFF',
    tm: 'Game (rouges) à début imposé',
    pitch: 'Début de point imposé ou contraintes de jeu, puis point libre.',
    weight: 1.1,
    defaultCount: 1
  },
  ouvert: {
    id: 'ouvert',
    label: 'Situation ouverte',
    plural: 'Situations ouvertes',
    icon: 'trophy',
    color: '#E4243B',
    deep: '#BC1328',
    soft: '#FBDADF',
    ink: '#FFFFFF',
    tm: 'Game (rouges)',
    pitch: 'Jeux à score : pression, prise de décision, compétition.',
    weight: 1.2,
    defaultCount: 2
  }
};

AC.THEME_ORDER = ['echauffement', 'educatif', 'drill', 'mixte', 'ouvert'];

/* Cartes « Focus » : une intention mentale qui accompagne toute la séance. */
AC.FOCUS_THEME = {
  id: 'focus',
  label: 'Focus',
  plural: 'Focus',
  icon: 'brain',
  color: '#3A97D4',
  deep: '#1F78B4',
  soft: '#D9ECF8',
  ink: '#FFFFFF',
  tm: 'Focus (bleues)',
  pitch: 'Une intention mentale à garder du début à la fin de la séance.'
};

AC.themeOf = function (id) {
  return AC.THEMES[id] || (id === 'focus' ? AC.FOCUS_THEME : AC.THEMES.drill);
};

/* Coups travaillés */
AC.COUPS = {
  'coup-droit': 'Coup droit',
  'revers': 'Revers',
  'service': 'Service',
  'retour': 'Retour',
  'volee': 'Volée',
  'smash': 'Smash',
  'lob': 'Lob',
  'amorti': 'Amorti'
};

/* Axes de travail (technique, tactique, physique, mental) */
AC.AXES = {
  'regularite': 'Régularité',
  'precision': 'Précision',
  'profondeur': 'Profondeur',
  'rythme': 'Rythme',
  'deplacement': 'Déplacement',
  'equilibre': 'Équilibre',
  'reaction': 'Réaction',
  'toucher': 'Toucher',
  'attaque': 'Attaque',
  'defense': 'Défense',
  'filet': 'Jeu au filet',
  'tactique': 'Tactique',
  'inside-outside': 'Inside / Outside',
  'pression': 'Pression'
};

/* Matériel (même ordre que les pictos des cartes) */
AC.EQUIPMENT = {
  balles: { label: 'Balles', icon: 'eq-ball', always: true },
  raquettes: { label: 'Raquettes', icon: 'eq-racket', always: true },
  plots: { label: 'Plots', icon: 'eq-cone' },
  lignes: { label: 'Lignes au sol', icon: 'eq-lines' },
  chrono: { label: 'Chrono', icon: 'eq-timer' }
};

/* Espace de jeu */
AC.SPACES = {
  hors: 'Hors terrain',
  mini: 'Carrés de service',
  demi: 'Demi-terrain',
  complet: 'Terrain complet'
};

/* Modèles de structure de séance (nombre de cartes par thème) */
AC.PRESETS = [
  {
    id: 'complete',
    label: 'Séance complète',
    hint: 'Du fermé vers l’ouvert',
    counts: { echauffement: 1, educatif: 1, drill: 2, mixte: 1, ouvert: 2 }
  },
  {
    id: 'mentor',
    label: 'Classique',
    hint: 'Échauffement · Drills · Jeux',
    counts: { echauffement: 2, educatif: 0, drill: 2, mixte: 0, ouvert: 2 }
  },
  {
    id: 'technique',
    label: 'Technique',
    hint: 'Apprendre et répéter',
    counts: { echauffement: 1, educatif: 2, drill: 2, mixte: 1, ouvert: 0 }
  },
  {
    id: 'match',
    label: 'Préparation match',
    hint: 'Pression et décisions',
    counts: { echauffement: 1, educatif: 0, drill: 1, mixte: 1, ouvert: 3 }
  }
];

AC.DURATIONS = [45, 60, 75, 90, 120];
