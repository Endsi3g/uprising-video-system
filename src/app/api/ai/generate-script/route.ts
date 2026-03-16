import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { videoId, referenceStyle, template, brandVoice } = await request.json();
    if (!videoId) return NextResponse.json({ error: 'videoId required' }, { status: 400 });
    // TODO: Integrate with lib/gemini.ts — generateScript()
    return NextResponse.json({ success: true, message: 'Script generation started' });
  } catch (error) {
    return NextResponse.json({ error: 'Script generation failed' }, { status: 500 });
  }
}
