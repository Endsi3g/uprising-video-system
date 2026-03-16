import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { videoId, transcription, brandVoice } = await request.json();
    if (!videoId) return NextResponse.json({ error: 'videoId required' }, { status: 400 });
    // TODO: Integrate with lib/gemini.ts — analyzeVideo()
    return NextResponse.json({ success: true, message: 'Analysis started' });
  } catch (error) {
    return NextResponse.json({ error: 'Analysis failed' }, { status: 500 });
  }
}
