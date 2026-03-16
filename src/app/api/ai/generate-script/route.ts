import { NextRequest, NextResponse } from 'next/server';
import { generateScript } from '@/lib/gemini';
import { supabase, insertScript } from '@/lib/supabase';

export async function POST(request: NextRequest) {
  try {
    const { videoId, referenceStyle, template, brandVoice } = await request.json();

    if (!videoId) {
      return NextResponse.json({ error: 'videoId is required' }, { status: 400 });
    }

    if (!supabase) {
      return NextResponse.json({ error: 'Supabase not configured' }, { status: 500 });
    }

    // 1. Fetch transcription from Supabase
    const { data: transcriptionData, error: transcriptionError } = await supabase
      .from('transcriptions')
      .select('text')
      .eq('video_id', videoId)
      .single();

    if (transcriptionError || !transcriptionData) {
      return NextResponse.json({ error: 'Transcription not found for this video' }, { status: 404 });
    }

    // 2. Generate script using Gemini
    const scriptResult = await generateScript({
      transcription: transcriptionData.text,
      referenceStyle: referenceStyle || 'standard',
      template: template || 'viral_reel',
      brandVoice: brandVoice || 'professional but engaging',
    });

    // 3. Store the generated script in Supabase
    const scriptRecord = {
      video_id: videoId,
      title: scriptResult.suggestedTitle || 'Generated Script',
      hook: scriptResult.hook,
      body: scriptResult.body,
      cta: scriptResult.cta,
      virality_score: scriptResult.viralityScore,
      template_used: template,
      style: referenceStyle,
      ai_notes: scriptResult.aiNotes,
    };

    const savedScript = await insertScript(scriptRecord);

    return NextResponse.json({
      success: true,
      message: 'Script generated and saved',
      script: savedScript,
    });
  } catch (error: any) {
    console.error('Script generation error:', error);
    return NextResponse.json({ error: error.message || 'Script generation failed' }, { status: 500 });
  }
}
