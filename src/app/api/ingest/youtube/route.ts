import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { url } = body;

    if (!url) {
      return NextResponse.json({ error: 'URL is required' }, { status: 400 });
    }

    // TODO: Integrate with lib/youtube.ts
    // 1. Extract video ID from URL
    // 2. Fetch metadata via YouTube Data API
    // 3. Download video via yt-dlp
    // 4. Upload to Google Drive
    // 5. Store metadata in Supabase
    // 6. Trigger AI classification

    return NextResponse.json({
      success: true,
      message: 'YouTube video ingestion started',
      videoId: 'pending',
    });
  } catch (error) {
    return NextResponse.json({ error: 'Ingestion failed' }, { status: 500 });
  }
}
