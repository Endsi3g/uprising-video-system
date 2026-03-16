import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file');

    if (!file) {
      return NextResponse.json({ error: 'File is required' }, { status: 400 });
    }

    // TODO: Save file, extract metadata, upload to Drive, store in Supabase
    return NextResponse.json({ success: true, message: 'File upload started' });
  } catch (error) {
    return NextResponse.json({ error: 'Upload failed' }, { status: 500 });
  }
}
