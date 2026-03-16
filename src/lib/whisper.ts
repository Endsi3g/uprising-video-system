// Whisper transcription service
// Supports: OpenAI Whisper API (cloud) or local Whisper via Python subprocess

import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

interface TranscriptionResult {
  text: string;
  segments: { start: number; end: number; text: string }[];
  language: string;
}

/**
 * Transcribe using OpenAI Whisper API
 */
export async function transcribeCloud(audioPath: string): Promise<TranscriptionResult> {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) throw new Error('OPENAI_API_KEY not configured');

  const fs = await import('fs');
  const formData = new FormData();
  const file = new Blob([fs.readFileSync(audioPath)]);
  formData.append('file', file, 'audio.mp3');
  formData.append('model', 'whisper-1');
  formData.append('response_format', 'verbose_json');
  formData.append('timestamp_granularities[]', 'segment');

  const response = await fetch('https://api.openai.com/v1/audio/transcriptions', {
    method: 'POST',
    headers: { Authorization: `Bearer ${apiKey}` },
    body: formData,
  });

  const data = await response.json();
  return {
    text: data.text,
    segments: (data.segments || []).map((s: { start: number; end: number; text: string }) => ({
      start: s.start, end: s.end, text: s.text.trim(),
    })),
    language: data.language || 'fr',
  };
}

/**
 * Transcribe using local Whisper (Python)
 * Requires: pip install openai-whisper
 */
export async function transcribeLocal(audioPath: string, model = 'base'): Promise<TranscriptionResult> {
  const outputDir = audioPath.replace(/\.[^/.]+$/, '');
  const cmd = `whisper "${audioPath}" --model ${model} --output_format json --output_dir "${outputDir}" --language fr`;

  await execAsync(cmd, { timeout: 300000 }); // 5 min timeout

  const fs = await import('fs');
  const jsonPath = `${outputDir}/${audioPath.split('/').pop()?.replace(/\.[^/.]+$/, '')}.json`;
  const result = JSON.parse(fs.readFileSync(jsonPath, 'utf-8'));

  return {
    text: result.text,
    segments: (result.segments || []).map((s: { start: number; end: number; text: string }) => ({
      start: s.start, end: s.end, text: s.text.trim(),
    })),
    language: result.language || 'fr',
  };
}
