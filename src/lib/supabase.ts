import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

export const supabase = supabaseUrl ? createClient(supabaseUrl, supabaseKey) : null;

// Typed helpers — will be used once Supabase is connected
export async function getVideos(filters?: { platform?: string; status?: string; search?: string }) {
  if (!supabase) return [];
  let query = supabase.from('videos').select('*').order('ingested_at', { ascending: false });
  if (filters?.platform) query = query.eq('platform', filters.platform);
  if (filters?.status) query = query.eq('status', filters.status);
  if (filters?.search) query = query.ilike('title', `%${filters.search}%`);
  const { data } = await query;
  return data || [];
}

export async function getScripts(videoId?: string) {
  if (!supabase) return [];
  let query = supabase.from('scripts').select('*').order('created_at', { ascending: false });
  if (videoId) query = query.eq('video_id', videoId);
  const { data } = await query;
  return data || [];
}

export async function getAnalytics(videoId: string) {
  if (!supabase) return [];
  const { data } = await supabase.from('analytics_snapshots').select('*').eq('video_id', videoId).order('date', { ascending: true });
  return data || [];
}

export async function upsertVideo(video: Record<string, unknown>) {
  if (!supabase) return null;
  const { data } = await supabase.from('videos').upsert(video).select().single();
  return data;
}

export async function insertScript(script: Record<string, unknown>) {
  if (!supabase) return null;
  const { data } = await supabase.from('scripts').insert(script).select().single();
  return data;
}
