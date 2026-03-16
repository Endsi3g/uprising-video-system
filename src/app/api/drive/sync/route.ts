import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { action, folderId, fileId } = await request.json();
    // TODO: Integrate with lib/drive.ts
    return NextResponse.json({ success: true, message: `Drive ${action || 'sync'} started` });
  } catch (error) {
    return NextResponse.json({ error: 'Drive sync failed' }, { status: 500 });
  }
}
