// Embeddings service using Gemini embedding model + pgvector via Supabase

import { GoogleGenerativeAI } from '@google/generative-ai';
import { supabase } from './supabase';

const apiKey = process.env.GEMINI_API_KEY || '';
const genAI = apiKey ? new GoogleGenerativeAI(apiKey) : null;

/**
 * Generate embedding vector for a text using Gemini
 */
export async function generateEmbedding(text: string): Promise<number[]> {
  if (!genAI) throw new Error('GEMINI_API_KEY not configured');
  const model = genAI.getGenerativeModel({ model: 'text-embedding-004' });
  const result = await model.embedContent(text);
  return result.embedding.values;
}

/**
 * Store embedding in Supabase pgvector
 */
export async function storeEmbedding(videoId: string, text: string) {
  const embedding = await generateEmbedding(text);
  if (!supabase) throw new Error('Supabase not configured');
  return supabase.from('embeddings').insert({ video_id: videoId, content: text, embedding });
}

/**
 * Find similar content using cosine similarity
 */
export async function findSimilar(query: string, limit = 5) {
  const embedding = await generateEmbedding(query);
  if (!supabase) throw new Error('Supabase not configured');
  const { data } = await supabase.rpc('match_embeddings', {
    query_embedding: embedding,
    match_threshold: 0.7,
    match_count: limit,
  });
  return data || [];
}

/**
 * Check if content is too similar to existing (deduplication)
 */
export async function isDuplicate(text: string, threshold = 0.9): Promise<boolean> {
  const similar = await findSimilar(text, 1);
  return similar.length > 0 && similar[0].similarity >= threshold;
}
