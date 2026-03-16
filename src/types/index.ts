// ═══════════════════════════════════════════════════════════════
// UPRISING VIDEO SYSTEM — TypeScript Types
// ═══════════════════════════════════════════════════════════════

export type Platform = 'youtube' | 'instagram' | 'tiktok' | 'local';
export type VideoStatus = 'à_faire' | 'en_cours' | 'scripté' | 'publié' | 'inspiration';
export type ScriptSection = 'hook' | 'body' | 'cta';

export interface Video {
  id: string;
  title: string;
  description: string;
  platform: Platform;
  sourceUrl: string;
  thumbnailUrl: string;
  duration: number; // seconds
  status: VideoStatus;
  tags: string[];
  channelName: string;
  channelAvatar?: string;
  viewCount?: number;
  likeCount?: number;
  commentCount?: number;
  engagementRate?: number;
  publishedAt?: string;
  ingestedAt: string;
  driveFolderId?: string;
  driveFileId?: string;
  transcription?: Transcription;
  aiCategory?: string; // e.g., "inspiration haute performance", "à scripter"
}

export interface Transcription {
  id: string;
  videoId: string;
  text: string;
  segments: TranscriptionSegment[];
  language: string;
  createdAt: string;
}

export interface TranscriptionSegment {
  start: number; // seconds
  end: number;
  text: string;
}

export interface Script {
  id: string;
  videoId?: string;
  title: string;
  version: number;
  hook: string;
  body: string;
  cta: string;
  viralityScore: number; // 0-100
  templateUsed?: string;
  referenceChannel?: string;
  style?: string;
  aiNotes: string;
  createdAt: string;
  updatedAt: string;
}

export interface AnalyticsSnapshot {
  id: string;
  videoId: string;
  platform: Platform;
  date: string;
  views: number;
  watchTimeMinutes: number;
  ctr: number; // percentage
  engagementRate: number; // percentage
  likes: number;
  comments: number;
  shares: number;
  saves?: number;
}

export interface BrandConfig {
  id: string;
  brandName: string;
  brandVoice: string;
  toneKeywords: string[];
  avoidKeywords: string[];
  referenceChannels: ReferenceChannel[];
  templates: ScriptTemplate[];
  updatedAt: string;
}

export interface ReferenceChannel {
  id: string;
  name: string;
  platform: Platform;
  url: string;
  description: string;
  strengths: string[]; // e.g., "hooks viraux", "storytelling marque"
}

export interface ScriptTemplate {
  id: string;
  name: string;
  description: string;
  structure: string;
  exampleHook: string;
  exampleCta: string;
}

export interface AIFeedback {
  id: string;
  type: 'recommendation' | 'alert' | 'insight';
  severity: 'low' | 'medium' | 'high';
  title: string;
  message: string;
  actionSuggestion?: string;
  relatedVideoIds?: string[];
  createdAt: string;
  isRead: boolean;
}

export interface InspirationNote {
  id: string;
  videoId: string;
  sourceTitle: string;
  sourceChannel: string;
  keyPoints: string[];
  frameworks: Framework[];
  tools: ToolMention[];
  addedAt: string;
}

export interface Framework {
  name: string;
  acronym?: string;
  description: string;
  steps: string[];
}

export interface ToolMention {
  name: string;
  purpose: string;
  timestamp?: string;
}

// Dashboard stat
export interface StatCard {
  label: string;
  value: string | number;
  change?: number; // percentage change
  changeLabel?: string;
  icon: string;
}

// Navigation
export interface NavItem {
  label: string;
  href: string;
  icon: string;
  badge?: number;
}
