import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const videoId = request.nextUrl.searchParams.get('videoId');
  if (!videoId) return NextResponse.json({ error: 'videoId required' }, { status: 400 });
  // TODO: Integrate with YouTube Analytics API
  return NextResponse.json({ success: true, data: [] });
}
