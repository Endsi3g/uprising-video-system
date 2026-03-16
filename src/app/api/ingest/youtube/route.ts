import { NextRequest, NextResponse } from 'next/server';
import { extractVideoId, getVideoMetadata } from '@/lib/youtube';
import { upsertVideo } from '@/lib/supabase';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { url } = body;

    if (!url) {
      return NextResponse.json({ error: 'URL is required' }, { status: 400 });
    }

    // 1. Extract video ID from URL
    const videoId = extractVideoId(url);
    if (!videoId) {
      return NextResponse.json({ error: 'Invalid YouTube URL' }, { status: 400 });
    }

    // 2. Fetch metadata via YouTube Data API
    const metadata = await getVideoMetadata(videoId);
    if (!metadata) {
      return NextResponse.json({ error: 'Could not fetch video metadata' }, { status: 404 });
    }

    // 3. Store metadata in Supabase
    const videoRecord = {
      title: metadata.title,
      description: metadata.description,
      platform: 'youtube',
      source_url: url,
      thumbnail_url: metadata.thumbnailUrl,
      duration: 0, // Duration string parsing needed if we want integer seconds
      channel_name: metadata.channelTitle,
      view_count: metadata.viewCount,
      like_count: metadata.likeCount,
      comment_count: metadata.commentCount,
      tags: metadata.tags,
      published_at: metadata.publishedAt,
      status: 'à_faire',
    };

    const savedVideo = await upsertVideo(videoRecord);

    // TODO: 4. Download video via yt-dlp (should be async background job)
    // TODO: 5. Upload to Google Drive
    // TODO: 6. Trigger AI classification

    return NextResponse.json({
      success: true,
      message: 'YouTube video ingestion started',
      video: savedVideo,
    });
  } catch (error: any) {
    console.error('YouTube ingestion error:', error);
    return NextResponse.json({ error: error.message || 'Ingestion failed' }, { status: 500 });
  }
}
