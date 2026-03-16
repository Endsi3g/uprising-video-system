// ═══════════════════════════════════════════════════════════════
// UPRISING VIDEO SYSTEM — Mock Data
// Includes Grow with Alex "1000+ Posts a Month" as first reference
// ═══════════════════════════════════════════════════════════════

import type {
  Video, Script, AnalyticsSnapshot, AIFeedback,
  BrandConfig, InspirationNote,
} from '@/types';

// ─── VIDEOS ─────────────────────────────────────────────────────

export const mockVideos: Video[] = [
  {
    id: 'v-001',
    title: '1000+ Posts a Month. One Person.',
    description: 'Comment une seule personne peut produire plus de 1 000 contenus par mois en utilisant l\'IA pour automatiser les tâches répétitives et se concentrer sur la créativité.',
    platform: 'youtube',
    sourceUrl: 'https://youtu.be/1fexs1c2BcY',
    thumbnailUrl: 'https://img.youtube.com/vi/1fexs1c2BcY/maxresdefault.jpg',
    duration: 1200,
    status: 'inspiration',
    tags: ['AI automation', 'content engine', 'REGAIN framework', 'productivity', 'scaling'],
    channelName: 'Grow with Alex',
    viewCount: 245000,
    likeCount: 12400,
    commentCount: 890,
    engagementRate: 5.4,
    publishedAt: '2025-12-15T10:00:00Z',
    ingestedAt: '2026-03-16T15:48:00Z',
    aiCategory: 'inspiration haute performance',
  },
  {
    id: 'v-002',
    title: 'Comment j\'ai lancé mon SaaS en 30 jours',
    description: 'Retour d\'expérience sur le lancement rapide d\'un SaaS avec React, Supabase et Stripe.',
    platform: 'youtube',
    sourceUrl: 'https://www.youtube.com/watch?v=example1',
    thumbnailUrl: 'https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg',
    duration: 892,
    status: 'scripté',
    tags: ['SaaS', 'React', 'Supabase', 'indie hacker'],
    channelName: 'Uprising Studio',
    viewCount: 18500,
    likeCount: 1240,
    commentCount: 156,
    engagementRate: 7.5,
    publishedAt: '2026-02-10T14:00:00Z',
    ingestedAt: '2026-03-10T09:15:00Z',
    aiCategory: 'à scripter',
  },
  {
    id: 'v-003',
    title: 'Le hook parfait pour vos Reels',
    description: 'Analyse de 50 Reels viraux pour décrypter la formule du hook parfait.',
    platform: 'instagram',
    sourceUrl: 'https://www.instagram.com/reel/example',
    thumbnailUrl: 'https://img.youtube.com/vi/9bZkp7q19f0/maxresdefault.jpg',
    duration: 58,
    status: 'publié',
    tags: ['hooks', 'reels', 'viral', 'copywriting'],
    channelName: '@uprising.studio',
    viewCount: 95000,
    likeCount: 8700,
    commentCount: 342,
    engagementRate: 9.5,
    publishedAt: '2026-03-01T18:30:00Z',
    ingestedAt: '2026-03-05T10:00:00Z',
    aiCategory: 'inspiration haute performance',
  },
  {
    id: 'v-004',
    title: 'Building in Public — Semaine 12',
    description: 'Update hebdomadaire sur le développement du CRM et les metrics business.',
    platform: 'youtube',
    sourceUrl: 'https://www.youtube.com/watch?v=example3',
    thumbnailUrl: 'https://img.youtube.com/vi/J---aiyznGQ/maxresdefault.jpg',
    duration: 654,
    status: 'à_faire',
    tags: ['building in public', 'CRM', 'weekly update'],
    channelName: 'Uprising Studio',
    viewCount: 4200,
    likeCount: 380,
    commentCount: 67,
    engagementRate: 10.6,
    publishedAt: '2026-03-12T16:00:00Z',
    ingestedAt: '2026-03-12T16:05:00Z',
    aiCategory: 'à scripter',
  },
  {
    id: 'v-005',
    title: '5 erreurs qui tuent vos conversions',
    description: 'Les erreurs UX les plus courantes qui font chuter vos taux de conversion.',
    platform: 'youtube',
    sourceUrl: 'https://www.youtube.com/watch?v=example4',
    thumbnailUrl: 'https://img.youtube.com/vi/L_jWHffIx5E/maxresdefault.jpg',
    duration: 478,
    status: 'en_cours',
    tags: ['UX', 'conversion', 'design', 'SaaS'],
    channelName: 'Uprising Studio',
    viewCount: 12800,
    likeCount: 920,
    commentCount: 134,
    engagementRate: 8.2,
    publishedAt: '2026-02-28T12:00:00Z',
    ingestedAt: '2026-03-01T08:00:00Z',
    aiCategory: 'à scripter',
  },
  {
    id: 'v-006',
    title: 'Masterclass Storytelling pour YouTube',
    description: 'Comment construire une narration captivante qui retient les viewers jusqu\'à la fin.',
    platform: 'youtube',
    sourceUrl: 'https://www.youtube.com/watch?v=example5',
    thumbnailUrl: 'https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg',
    duration: 1845,
    status: 'inspiration',
    tags: ['storytelling', 'YouTube', 'retention', 'narration'],
    channelName: 'Ali Abdaal',
    viewCount: 1200000,
    likeCount: 45000,
    commentCount: 2100,
    engagementRate: 3.9,
    publishedAt: '2025-11-20T09:00:00Z',
    ingestedAt: '2026-03-08T14:30:00Z',
    aiCategory: 'inspiration haute performance',
  },
];

// ─── SCRIPTS ────────────────────────────────────────────────────

export const mockScripts: Script[] = [
  {
    id: 's-001',
    videoId: 'v-002',
    title: 'Script — Lancer un SaaS en 30 jours (v2)',
    version: 2,
    hook: '\"Ils m\'ont dit que c\'était impossible. 30 jours plus tard, j\'avais 200 utilisateurs payants.\" — Ouvrez sur un plan serré de l\'écran avec le dashboard montrant les metrics.',
    body: 'Structurez en 3 actes :\n\n**Acte 1 (0:00-2:30) — Le Problème** : Montrez la frustration. \"J\'utilisais 5 outils différents...\" Transition rapide vers la solution.\n\n**Acte 2 (2:30-8:00) — Le Build** : Jour par jour, montrez le code, les décisions tech (React + Supabase + Stripe). Incluez les obstacles réels.\n\n**Acte 3 (8:00-12:00) — Le Résultat** : Metrics, témoignages, lessons learned.',
    cta: '\"Si vous voulez le template exact que j\'ai utilisé, le lien est en description. Et abonnez-vous pour suivre le prochain build.\" — Overlay avec le bouton subscribe.',
    viralityScore: 78,
    templateUsed: 'Build Story Arc',
    referenceChannel: 'Pieter Levels',
    style: 'storytelling authentique',
    aiNotes: 'Le hook utilise la technique du \"contraste\" (impossible → résultat). La structure en 3 actes maximise la retention. Suggestion : ajouter un teaser du résultat dans les 5 premières secondes.',
    createdAt: '2026-03-11T10:30:00Z',
    updatedAt: '2026-03-12T14:15:00Z',
  },
  {
    id: 's-002',
    videoId: 'v-005',
    title: 'Script — 5 erreurs UX conversions',
    version: 1,
    hook: '\"Votre landing page perd 73% de visiteurs dans les 3 premières secondes. Voici pourquoi.\" — Split screen : page qui convertit vs page qui ne convertit pas.',
    body: '**Format listicle inversé** — Commencez par l\'erreur #5 (la moins grave) et montez vers #1 :\n\n#5: CTA enterré\n#4: Pas de preuve sociale\n#3: Too much text, not enough visuals\n#2: Navigation confuse\n#1: Aucune proposition de valeur claire\n\nChaque point : 45 secondes max, avec avant/après visuel.',
    cta: '\"Faites l\'audit de votre page maintenant — checklist gratuite dans la description.\" — QR code overlay.',
    viralityScore: 85,
    templateUsed: 'Listicle Inversé',
    referenceChannel: 'Uprising Studio',
    style: 'éducatif percutant',
    aiNotes: 'Le format listicle inversé crée une escalade de tension naturelle. CTR estimé élevé grâce au split-screen dans le hook. Recommandation : inclure des exemples réels de sites connus.',
    createdAt: '2026-03-13T09:00:00Z',
    updatedAt: '2026-03-13T09:00:00Z',
  },
  {
    id: 's-003',
    videoId: 'v-004',
    title: 'Script — Building in Public S12',
    version: 1,
    hook: '\"Cette semaine, on a perdu 40% de nos utilisateurs actifs. Et c\'est la meilleure chose qui nous soit arrivée.\" — Plan rapproché, ton sincère.',
    body: '**Structure narrative** :\n\n1. **Le problème** (0:00-1:30) : Présenter le drop de metrics\n2. **L\'investigation** (1:30-4:00) : Analyse des données, identification de la cause\n3. **Le pivot** (4:00-7:00) : Les changements effectués\n4. **Les résultats** (7:00-9:00) : Nouvelles metrics post-pivot\n5. **La leçon** (9:00-10:00) : Ce que ça change pour la suite',
    cta: '\"Rejoignez le Discord pour suivre le build en temps réel — lien en description.\"',
    viralityScore: 62,
    templateUsed: 'Transparency Report',
    referenceChannel: 'Uprising Studio',
    style: 'building in public transparent',
    aiNotes: 'L\'ouverture avec une "mauvaise nouvelle" retournée crée de la curiosité. Watch time estimé : élevé grâce à la structure narrative. Suggestion : ajouter des screen recordings du dashboard analytics.',
    createdAt: '2026-03-14T16:00:00Z',
    updatedAt: '2026-03-14T16:00:00Z',
  },
];

// ─── ANALYTICS ──────────────────────────────────────────────────

export const mockAnalytics: AnalyticsSnapshot[] = [
  // v-002 — SaaS en 30 jours
  { id: 'a-001', videoId: 'v-002', platform: 'youtube', date: '2026-03-10', views: 2400, watchTimeMinutes: 4200, ctr: 6.8, engagementRate: 7.2, likes: 180, comments: 23, shares: 45 },
  { id: 'a-002', videoId: 'v-002', platform: 'youtube', date: '2026-03-11', views: 5200, watchTimeMinutes: 9100, ctr: 7.1, engagementRate: 7.5, likes: 420, comments: 52, shares: 89 },
  { id: 'a-003', videoId: 'v-002', platform: 'youtube', date: '2026-03-12', views: 8100, watchTimeMinutes: 13800, ctr: 7.5, engagementRate: 7.8, likes: 680, comments: 78, shares: 134 },
  { id: 'a-004', videoId: 'v-002', platform: 'youtube', date: '2026-03-13', views: 12500, watchTimeMinutes: 21000, ctr: 8.2, engagementRate: 8.1, likes: 920, comments: 105, shares: 198 },
  { id: 'a-005', videoId: 'v-002', platform: 'youtube', date: '2026-03-14', views: 15200, watchTimeMinutes: 25400, ctr: 7.9, engagementRate: 7.9, likes: 1080, comments: 134, shares: 234 },
  { id: 'a-006', videoId: 'v-002', platform: 'youtube', date: '2026-03-15', views: 17400, watchTimeMinutes: 28600, ctr: 7.6, engagementRate: 7.6, likes: 1180, comments: 148, shares: 256 },
  { id: 'a-007', videoId: 'v-002', platform: 'youtube', date: '2026-03-16', views: 18500, watchTimeMinutes: 30200, ctr: 7.3, engagementRate: 7.5, likes: 1240, comments: 156, shares: 278 },

  // v-003 — Hook parfait Reels
  { id: 'a-008', videoId: 'v-003', platform: 'instagram', date: '2026-03-05', views: 12000, watchTimeMinutes: 3200, ctr: 12.1, engagementRate: 9.2, likes: 1500, comments: 45, shares: 320, saves: 890 },
  { id: 'a-009', videoId: 'v-003', platform: 'instagram', date: '2026-03-08', views: 45000, watchTimeMinutes: 11800, ctr: 11.5, engagementRate: 9.5, likes: 4800, comments: 178, shares: 1200, saves: 2400 },
  { id: 'a-010', videoId: 'v-003', platform: 'instagram', date: '2026-03-12', views: 78000, watchTimeMinutes: 20400, ctr: 10.8, engagementRate: 9.8, likes: 7200, comments: 290, shares: 2100, saves: 3800 },
  { id: 'a-011', videoId: 'v-003', platform: 'instagram', date: '2026-03-16', views: 95000, watchTimeMinutes: 24200, ctr: 10.2, engagementRate: 9.5, likes: 8700, comments: 342, shares: 2600, saves: 4500 },
];

// Aggregate time-series for charts
export const mockTimeSeriesViews = [
  { date: 'Mar 1', youtube: 2100, instagram: 8400 },
  { date: 'Mar 3', youtube: 4800, instagram: 15200 },
  { date: 'Mar 5', youtube: 7200, instagram: 24600 },
  { date: 'Mar 7', youtube: 9800, instagram: 38100 },
  { date: 'Mar 9', youtube: 12400, instagram: 52800 },
  { date: 'Mar 11', youtube: 16200, instagram: 64500 },
  { date: 'Mar 13', youtube: 21800, instagram: 78200 },
  { date: 'Mar 15', youtube: 28400, instagram: 89500 },
  { date: 'Mar 16', youtube: 32900, instagram: 95000 },
];

export const mockTimeSeriesEngagement = [
  { date: 'Mar 1', ctr: 5.2, engagement: 6.8 },
  { date: 'Mar 3', ctr: 5.8, engagement: 7.2 },
  { date: 'Mar 5', ctr: 6.5, engagement: 7.8 },
  { date: 'Mar 7', ctr: 7.1, engagement: 8.1 },
  { date: 'Mar 9', ctr: 7.8, engagement: 8.5 },
  { date: 'Mar 11', ctr: 8.2, engagement: 8.9 },
  { date: 'Mar 13', ctr: 7.9, engagement: 8.6 },
  { date: 'Mar 15', ctr: 7.6, engagement: 8.2 },
  { date: 'Mar 16', ctr: 7.3, engagement: 7.9 },
];

// ─── AI FEEDBACK ────────────────────────────────────────────────

export const mockFeedback: AIFeedback[] = [
  {
    id: 'f-001',
    type: 'recommendation',
    severity: 'high',
    title: 'Optimiser les hooks Instagram',
    message: 'Vos Reels avec un hook textuel dans les 1.5 premières secondes ont un taux d\'engagement 3.2x supérieur. Appliquez cette technique à vos prochaines vidéos YouTube.',
    actionSuggestion: 'Intégrer un texte d\'accroche visuel dans les 2 premières secondes de chaque vidéo.',
    relatedVideoIds: ['v-003'],
    createdAt: '2026-03-16T08:00:00Z',
    isRead: false,
  },
  {
    id: 'f-002',
    type: 'insight',
    severity: 'medium',
    title: 'Contenu "Building in Public" performant',
    message: 'Les vidéos "building in public" ont un engagement rate moyen de 10.6%, bien au-dessus de votre moyenne (7.8%). Augmentez la fréquence de ce format.',
    relatedVideoIds: ['v-004'],
    createdAt: '2026-03-15T14:00:00Z',
    isRead: false,
  },
  {
    id: 'f-003',
    type: 'alert',
    severity: 'medium',
    title: 'CTR en baisse sur YouTube',
    message: 'Le CTR moyen a baissé de 8.2% à 7.3% cette semaine. Analyse : les miniatures récentes manquent de contraste. Recommandation : revenir au style "visage + texte bold" qui performait mieux.',
    actionSuggestion: 'Tester 2 miniatures alternatives avec plus de contraste pour les prochaines vidéos.',
    createdAt: '2026-03-16T10:00:00Z',
    isRead: false,
  },
  {
    id: 'f-004',
    type: 'recommendation',
    severity: 'high',
    title: 'Framework REGAIN à appliquer',
    message: 'Basé sur l\'analyse de "Grow with Alex", votre workflow de production peut être optimisé. 60% de votre temps est dédié à des tâches mécaniques (montage B-roll, color grading, mise en page). Utilisez le framework REGAIN pour identifier les tâches à automatiser.',
    actionSuggestion: 'Faire l\'audit REGAIN de 15 minutes : lister toutes les tâches, séparer Créatif/Mécanique, identifier la plus grosse fuite de temps.',
    relatedVideoIds: ['v-001'],
    createdAt: '2026-03-16T11:00:00Z',
    isRead: false,
  },
];

// ─── INSPIRATION NOTES ─────────────────────────────────────────

export const mockInspirationNotes: InspirationNote[] = [
  {
    id: 'n-001',
    videoId: 'v-001',
    sourceTitle: '1000+ Posts a Month. One Person.',
    sourceChannel: 'Grow with Alex',
    keyPoints: [
      'Constat : S\'épuiser sur des tâches mécaniques tue la valeur créative',
      'Règle 75/25 : 25% Créatif (cerveau, voix, stratégie) / 75% Mécanique (production, montage)',
      'L\'objectif : Utiliser l\'IA pour automatiser le Mécanique, pas pour remplacer le Créatif',
      'Décomposer l\'activité en piliers : YouTube, réseaux sociaux, distribution, newsletter',
      '460 000 abonnés gagnés en 30 jours via Reels/carrousels'
    ],
    frameworks: [
      {
        name: 'Framework REGAIN',
        acronym: 'REGAIN',
        description: 'Méthode en 4 étapes pour mettre en place un moteur de contenu automatisé',
        steps: [
          'Étape 1 : Audit des tâches (15 min) — Lister tout ce qu\'on fait',
          'Étape 2 : Filtrage Créatif vs Mécanique — Garder le Créatif, cibler le Mécanique pour l\'IA',
          'Étape 3 : Filtre REGAIN (Temps/Liberté/Argent) — Évaluer l\'impact de l\'automatisation',
          'Étape 4 : Déploiement des outils — Production Visuelle (Hicksfield), Idéation (Claude), Déclinaison (Prompts)'
        ],
      },
    ],
    tools: [
      { name: 'Hicksfield', purpose: 'Production visuelle, étalonnage, b-roll, mise en page carrousels', timestamp: '10:00' },
      { name: 'Claude / ChatGPT', purpose: 'Idéation, brainstorming et structuration (garder sa voix)', timestamp: '12:00' },
      { name: 'Circle / Vault', purpose: 'Centraliser les ressources, prompts et templates', timestamp: '15:00' },
    ],
    addedAt: '2026-03-16T15:48:00Z',
  },
];

// ─── BRAND CONFIG ───────────────────────────────────────────────

export const mockBrandConfig: BrandConfig = {
  id: 'bc-001',
  brandName: 'Uprising Studio',
  brandVoice: 'Authentique, technique mais accessible, orienté action. On partage nos builds, nos erreurs et nos apprentissages. Ton direct et sans bullshit, inspirant mais ancré dans le réel.',
  toneKeywords: ['authentique', 'technique', 'actionnable', 'transparent', 'ambitieux'],
  avoidKeywords: ['facile', 'sans effort', 'get rich quick', 'secret', 'hack magique'],
  referenceChannels: [
    {
      id: 'rc-001',
      name: 'Grow with Alex',
      platform: 'youtube',
      url: 'https://www.youtube.com/@GrowWithAlex',
      description: 'Stratégies de scaling de contenu avec l\'IA. Framework REGAIN.',
      strengths: ['productivité IA', 'content engine', 'scaling créatif'],
    },
    {
      id: 'rc-002',
      name: 'Ali Abdaal',
      platform: 'youtube',
      url: 'https://www.youtube.com/@aliabdaal',
      description: 'Storytelling YouTube, productivité, business de créateur.',
      strengths: ['storytelling', 'retention élevée', 'production premium'],
    },
    {
      id: 'rc-003',
      name: 'Pieter Levels',
      platform: 'youtube',
      url: 'https://www.youtube.com/@levelsio',
      description: 'Building in public, indie hacking, lancement rapide de SaaS.',
      strengths: ['building in public', 'authenticité', 'metrics transparentes'],
    },
  ],
  templates: [
    {
      id: 'st-001',
      name: 'Build Story Arc',
      description: 'Narration en 3 actes pour raconter un build ou un lancement.',
      structure: 'Hook → Problème → Build (jour par jour) → Résultat → Leçon → CTA',
      exampleHook: '"Ils m\'ont dit que c\'était impossible. 30 jours plus tard..."',
      exampleCta: '"Le template est en description. Abonnez-vous pour le prochain build."',
    },
    {
      id: 'st-002',
      name: 'Listicle Inversé',
      description: 'Liste d\'erreurs/astuces classées de la moins à la plus impactante.',
      structure: 'Hook (statistique choc) → Point #5 → #4 → #3 → #2 → #1 (climax) → CTA',
      exampleHook: '"Votre page perd 73% de visiteurs dans les 3 premières secondes."',
      exampleCta: '"Checklist gratuite en description. Faites l\'audit maintenant."',
    },
    {
      id: 'st-003',
      name: 'Transparency Report',
      description: 'Update hebdomadaire "building in public" avec métriques réelles.',
      structure: 'Hook (surprise/tension) → Contexte → Investigation → Pivot → Résultats → Leçon → CTA',
      exampleHook: '"On a perdu 40% de nos users. Et c\'est la meilleure chose qui nous soit arrivée."',
      exampleCta: '"Rejoignez le Discord pour suivre le build en temps réel."',
    },
  ],
  updatedAt: '2026-03-16T11:00:00Z',
};
