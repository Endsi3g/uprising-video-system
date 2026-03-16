import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { url, accessToken } = body;

    if (!url || !accessToken) {
      return NextResponse.json({ error: 'URL and access token are required' }, { status: 400 });
    }

    // TODO: Integrate with lib/instagram.ts
    return NextResponse.json({ success: true, message: 'Instagram ingestion started' });
  } catch (error) {
    return NextResponse.json({ error: 'Ingestion failed' }, { status: 500 });
  }
}
