// YouTube ingestion: yt-dlp for downloads + YouTube Data API v3 for metadata

import { exec } from 'child_process';
import { promisify } from 'util';
import { google } from 'googleapis';

const execAsync = promisify(exec);

export interface YouTubeVideoMeta {
  id: string;
  title: string;
  description: string;
  channelTitle: string;
  thumbnailUrl: string;
  duration: string;
  viewCount: number;
  likeCount: number;
  commentCount: number;
  tags: string[];
  publishedAt: string;
}

/**
 * Download a YouTube video using yt-dlp
 */
export async function downloadVideo(url: string, outputDir: string): Promise<string> {
  const outputTemplate = `${outputDir}/%(title)s.%(ext)s`;
  const cmd = `yt-dlp -f "bestvideo[height<=1080]+bestaudio/best" --merge-output-format mp4 -o "${outputTemplate}" "${url}"`;
  const { stdout } = await execAsync(cmd, { timeout: 600000 });
  // Extract output filename from yt-dlp output
  const match = stdout.match(/\[Merger\] Merging formats into "(.+)"/);
  return match ? match[1] : outputDir;
}

/**
 * Extract audio from a video for transcription
 */
export async function extractAudio(videoPath: string): Promise<string> {
  const audioPath = videoPath.replace(/\.[^/.]+$/, '.mp3');
  const cmd = `yt-dlp --extract-audio --audio-format mp3 -o "${audioPath}" "${videoPath}"`;
  await execAsync(cmd, { timeout: 120000 });
  return audioPath;
}

/**
 * Fetch video metadata from YouTube Data API v3
 */
export async function getVideoMetadata(videoId: string): Promise<YouTubeVideoMeta | null> {
  const apiKey = process.env.YOUTUBE_API_KEY;
  if (!apiKey) throw new Error('YOUTUBE_API_KEY not configured');

  const youtube = google.youtube({ version: 'v3', auth: apiKey });
  const response = await youtube.videos.list({
    part: ['snippet', 'statistics', 'contentDetails'],
    id: [videoId],
  });

  const item = response.data.items?.[0];
  if (!item) return null;

  return {
    id: item.id || videoId,
    title: item.snippet?.title || '',
    description: item.snippet?.description || '',
    channelTitle: item.snippet?.channelTitle || '',
    thumbnailUrl: item.snippet?.thumbnails?.maxres?.url || item.snippet?.thumbnails?.high?.url || '',
    duration: item.contentDetails?.duration || '',
    viewCount: Number(item.statistics?.viewCount || 0),
    likeCount: Number(item.statistics?.likeCount || 0),
    commentCount: Number(item.statistics?.commentCount || 0),
    tags: item.snippet?.tags || [],
    publishedAt: item.snippet?.publishedAt || '',
  };
}

/**
 * Extract video ID from various YouTube URL formats
 */
export function extractVideoId(url: string): string | null {
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})/,
    /youtube\.com\/shorts\/([a-zA-Z0-9_-]{11})/,
  ];
  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match) return match[1];
  }
  return null;
}
