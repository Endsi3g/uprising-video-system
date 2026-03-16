import { NextRequest, NextResponse } from 'next/server';
import { getRecentMedia } from '@/lib/instagram';
import { upsertVideo } from '@/lib/supabase';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { url, accessToken } = body;

    if (!accessToken) {
      return NextResponse.json({ error: 'Access token is required' }, { status: 400 });
    }

    // 1. Fetch recent media from Instagram
    const mediaList = await getRecentMedia(accessToken);
    
    // 2. Find the specific media if URL is provided, otherwise ingest latest
    let targetMedia = mediaList[0];
    if (url) {
      targetMedia = mediaList.find(m => m.permalink === url) || targetMedia;
    }

    if (!targetMedia) {
      return NextResponse.json({ error: 'No Instagram media found' }, { status: 404 });
    }

    // 3. Store in Supabase
    const videoRecord = {
      title: targetMedia.caption.split('\n')[0] || 'Instagram Post',
      description: targetMedia.caption,
      platform: 'instagram',
      source_url: targetMedia.permalink,
      thumbnail_url: targetMedia.mediaUrl,
      duration: 0, 
      view_count: 0, // Insights might be needed for real view count
      like_count: targetMedia.likeCount,
      comment_count: targetMedia.commentsCount,
      published_at: targetMedia.timestamp,
      status: 'inspiration',
    };

    const savedVideo = await upsertVideo(videoRecord);

    return NextResponse.json({ 
      success: true, 
      message: 'Instagram ingestion successful',
      video: savedVideo
    });
  } catch (error: any) {
    console.error('Instagram ingestion error:', error);
    return NextResponse.json({ error: error.message || 'Ingestion failed' }, { status: 500 });
  }
}
