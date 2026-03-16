import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { videoId } = await request.json();
    if (!videoId) return NextResponse.json({ error: 'videoId required' }, { status: 400 });
    // TODO: Integrate with lib/whisper.ts — transcribeCloud or transcribeLocal
    return NextResponse.json({ success: true, message: 'Transcription started', jobId: 'pending' });
  } catch (error) {
    return NextResponse.json({ error: 'Transcription failed' }, { status: 500 });
  }
}
