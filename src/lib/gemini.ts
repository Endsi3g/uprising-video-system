import { GoogleGenerativeAI } from '@google/generative-ai';

const apiKey = process.env.GEMINI_API_KEY || '';
const genAI = apiKey ? new GoogleGenerativeAI(apiKey) : null;

export async function analyzeVideo(transcription: string, brandVoice: string) {
  if (!genAI) throw new Error('GEMINI_API_KEY not configured');
  const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });
  const prompt = `Analyse cette transcription vidéo et fournis :
1. Résumé (2-3 phrases)
2. Points clés (liste)
3. Catégorie suggérée : "inspiration haute performance", "à scripter", "contenu éducatif", "témoignage"
4. Score de qualité (0-100)

Contexte de marque : ${brandVoice}

Transcription :
${transcription}`;
  const result = await model.generateContent(prompt);
  return result.response.text();
}

export async function generateScript(params: {
  transcription: string;
  referenceStyle: string;
  template: string;
  brandVoice: string;
  avoidRepetition?: string[];
}) {
  if (!genAI) throw new Error('GEMINI_API_KEY not configured');
  const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });
  const prompt = `Génère un script vidéo optimisé pour la viralité.

TEMPLATE: ${params.template}
STYLE DE RÉFÉRENCE: ${params.referenceStyle}
VOIX DE MARQUE: ${params.brandVoice}

Basé sur cette transcription/contenu source :
${params.transcription}

${params.avoidRepetition?.length ? `ÉVITER ces angles déjà utilisés : ${params.avoidRepetition.join(', ')}` : ''}

Réponds au format JSON :
{
  "hook": "...",
  "body": "...",
  "cta": "...",
  "viralityScore": 0-100,
  "aiNotes": "...",
  "suggestedTitle": "..."
}`;
  const result = await model.generateContent(prompt);
  return JSON.parse(result.response.text().replace(/```json\n?|\n?```/g, ''));
}

export async function predictVirality(script: { hook: string; body: string; cta: string }) {
  if (!genAI) throw new Error('GEMINI_API_KEY not configured');
  const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });
  const prompt = `Évalue le potentiel viral de ce script (score 0-100) :
Hook: ${script.hook}
Body: ${script.body}
CTA: ${script.cta}

Réponds JSON: { "score": N, "factors": ["..."], "improvements": ["..."] }`;
  const result = await model.generateContent(prompt);
  return JSON.parse(result.response.text().replace(/```json\n?|\n?```/g, ''));
}

export async function generateFeedback(analytics: { views: number; ctr: number; engagement: number; watchTime: number }[]) {
  if (!genAI) throw new Error('GEMINI_API_KEY not configured');
  const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });
  const prompt = `Analyse ces métriques vidéo et génère des recommandations d'amélioration :
${JSON.stringify(analytics)}

Réponds JSON: [{ "type": "recommendation"|"alert"|"insight", "severity": "low"|"medium"|"high", "title": "...", "message": "...", "actionSuggestion": "..." }]`;
  const result = await model.generateContent(prompt);
  return JSON.parse(result.response.text().replace(/```json\n?|\n?```/g, ''));
}
