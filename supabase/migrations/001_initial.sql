-- ═══════════════════════════════════════════════════════════════
-- UPRISING VIDEO SYSTEM — Initial Database Schema
-- Supabase (PostgreSQL + pgvector)
-- ═══════════════════════════════════════════════════════════════

-- Enable pgvector extension
create extension if not exists vector;

-- ─── VIDEOS ─────────────────────────────────────────────────────
create table if not exists videos (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  platform text not null check (platform in ('youtube', 'instagram', 'tiktok', 'local')),
  source_url text,
  thumbnail_url text,
  duration integer default 0,
  status text not null default 'à_faire' check (status in ('à_faire', 'en_cours', 'scripté', 'publié', 'inspiration')),
  tags text[] default '{}',
  channel_name text,
  channel_avatar text,
  view_count integer default 0,
  like_count integer default 0,
  comment_count integer default 0,
  engagement_rate numeric(5,2),
  published_at timestamptz,
  ingested_at timestamptz default now(),
  drive_folder_id text,
  drive_file_id text,
  ai_category text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create index idx_videos_platform on videos(platform);
create index idx_videos_status on videos(status);
create index idx_videos_ingested_at on videos(ingested_at desc);
create index idx_videos_tags on videos using gin(tags);

-- ─── TRANSCRIPTIONS ────────────────────────────────────────────
create table if not exists transcriptions (
  id uuid primary key default gen_random_uuid(),
  video_id uuid references videos(id) on delete cascade,
  text text not null,
  segments jsonb default '[]',
  language text default 'fr',
  created_at timestamptz default now()
);

create index idx_transcriptions_video on transcriptions(video_id);

-- ─── SCRIPTS ────────────────────────────────────────────────────
create table if not exists scripts (
  id uuid primary key default gen_random_uuid(),
  video_id uuid references videos(id) on delete set null,
  title text not null,
  version integer default 1,
  hook text,
  body text,
  cta text,
  virality_score integer default 0 check (virality_score between 0 and 100),
  template_used text,
  reference_channel text,
  style text,
  ai_notes text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create index idx_scripts_video on scripts(video_id);
create index idx_scripts_created on scripts(created_at desc);

-- ─── EMBEDDINGS ─────────────────────────────────────────────────
create table if not exists embeddings (
  id uuid primary key default gen_random_uuid(),
  video_id uuid references videos(id) on delete cascade,
  content text not null,
  embedding vector(768),
  created_at timestamptz default now()
);

create index idx_embeddings_video on embeddings(video_id);

-- Similarity search function
create or replace function match_embeddings(
  query_embedding vector(768),
  match_threshold float,
  match_count int
)
returns table (id uuid, video_id uuid, content text, similarity float)
language sql stable
as $$
  select id, video_id, content, 1 - (embedding <=> query_embedding) as similarity
  from embeddings
  where 1 - (embedding <=> query_embedding) > match_threshold
  order by embedding <=> query_embedding
  limit match_count;
$$;

-- ─── ANALYTICS SNAPSHOTS ────────────────────────────────────────
create table if not exists analytics_snapshots (
  id uuid primary key default gen_random_uuid(),
  video_id uuid references videos(id) on delete cascade,
  platform text not null,
  date date not null,
  views integer default 0,
  watch_time_minutes integer default 0,
  ctr numeric(5,2) default 0,
  engagement_rate numeric(5,2) default 0,
  likes integer default 0,
  comments integer default 0,
  shares integer default 0,
  saves integer default 0,
  created_at timestamptz default now()
);

create index idx_analytics_video on analytics_snapshots(video_id);
create index idx_analytics_date on analytics_snapshots(date desc);
create unique index idx_analytics_unique on analytics_snapshots(video_id, platform, date);

-- ─── BRAND CONFIG ───────────────────────────────────────────────
create table if not exists brand_config (
  id uuid primary key default gen_random_uuid(),
  brand_name text not null,
  brand_voice text,
  tone_keywords text[] default '{}',
  avoid_keywords text[] default '{}',
  reference_channels jsonb default '[]',
  templates jsonb default '[]',
  updated_at timestamptz default now()
);

-- ─── AI FEEDBACK ────────────────────────────────────────────────
create table if not exists ai_feedback (
  id uuid primary key default gen_random_uuid(),
  type text not null check (type in ('recommendation', 'alert', 'insight')),
  severity text not null default 'medium' check (severity in ('low', 'medium', 'high')),
  title text not null,
  message text not null,
  action_suggestion text,
  related_video_ids uuid[] default '{}',
  is_read boolean default false,
  created_at timestamptz default now()
);

create index idx_feedback_unread on ai_feedback(is_read) where is_read = false;
create index idx_feedback_created on ai_feedback(created_at desc);

-- ─── RLS POLICIES ───────────────────────────────────────────────
-- Enable RLS on all tables (for future multi-tenant SaaS)
alter table videos enable row level security;
alter table transcriptions enable row level security;
alter table scripts enable row level security;
alter table embeddings enable row level security;
alter table analytics_snapshots enable row level security;
alter table brand_config enable row level security;
alter table ai_feedback enable row level security;
