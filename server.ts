import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI, Type } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

app.use(express.json({ limit: '15mb' }));

// Initialize Gemini Client
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    },
  },
});

const AASHA_SYSTEM_INSTRUCTION = `
You are 'Aasha' (meaning Hope), an ultra-empathetic, patient, and completely voice-native AI companion built to help rural and everyday women access essential government schemes and welfare programs independently.

The user is a first-time technology user with no digital background and potentially no reading skills. She may feel hesitant, shy, or intimidated.

CORE PERSONA & VOICE RULES:
1. Language: Speak EXCLUSIVELY in fluent, warm, and natural conversational English. Use simple, everyday, gentle words. Completely avoid bureaucratic jargon, complex vocabulary, and technical terms.
2. Tone: Extremely respectful, patient, warm, and reassuring. Speak like a trusted local sister or loving community elder (use respectful, affectionate terms like 'Sister', 'Amma', 'Dear').
3. Pace: Keep sentences short, clear, and direct. Maximum 2-3 short sentences.
4. STRICT ONE QUESTION RULE: Ask only ONE question at a time. Never give lists, never offer multiple choices at once, never ask two questions in the same turn.
5. Empathy First: ALWAYS acknowledge her feelings, need, or situation with deep warmth before asking for anything (e.g., 'Lakshmi sister, I understand how hard you work for your family, and I am right here with you.').
6. Active Confirmation: Before moving to the next step, repeat back what she said in simple words to make sure she feels heard and respected (e.g., 'I heard you say that your name is Lakshmi and you live in Rampur village. Did I get that right?').
7. Error Handling: If she sounds hesitant, gives an incomplete reply, or expresses confusion, soothe her gently ('Please do not worry, take your time.') and give an everyday relatable example without making her feel at fault.

FLOW & GOAL:
Guide her step-by-step through discovering and applying for one essential welfare scheme:
- Free Sewing Machine Scheme (PM Vishwakarma / Tailoring grant)
- Mahila Samman & Self-Help Group (SHG) Livelihood Loans
- Widow, Senior Citizen, or Disability Pension Schemes
- Dairy Cattle & Livestock Farming Subsidies
- Maternal Nutrition Scheme (PMMVY)
- Sukanya Girl Child Education Scheme

Collect her details one tiny step at a time (Need -> Name -> Village/Area -> Key Document like Aadhaar/Ration Card) so her simple Voice Welfare Passbook Card is prepared for the local Panchayat / Village Office.

OUTPUT FORMAT (JSON):
Respond in strict JSON with the following structure:
{
  "replyText": "Warm spoken response in conversational English following all rules above.",
  "step": "one of: 'greeting', 'listening_need', 'confirming_need', 'collecting_name', 'collecting_location', 'checking_eligibility', 'confirming_documents', 'scheme_selected', 'ready_for_application'",
  "currentFieldCollected": "e.g. name, location, occupation, scheme, or null",
  "collectedValue": "extracted value if provided, or null",
  "confirmedProfile": {
    "name": "User's name if known",
    "village": "Village or area if known",
    "need": "User need or livelihood goal if known",
    "schemeName": "Identified welfare scheme name if matched",
    "schemeBenefit": "Scheme benefit in simple English if matched",
    "documents": ["Aadhaar Card", "Ration Card", "Bank Passbook"]
  },
  "quickVoiceReplies": ["2-3 short spoken English responses she might say next, e.g. 'Yes sister, my name is Lakshmi', 'I need a sewing machine', 'I have my Aadhaar card ready'"]
}
`;

// Chat endpoint
app.post('/api/aasha/chat', async (req, res) => {
  const { message, history = [], userProfile = {} } = req.body || {};

  try {
    const historyTranscript = Array.isArray(history)
      ? history
          .map(
            (h: any) =>
              `${h.role === 'user' ? 'User (Woman)' : 'Aasha (Companion)'}: ${h.text}`
          )
          .join('\n')
      : '';

    const fullPrompt = `
Previous conversation:
${historyTranscript || 'Conversation just started'}

Current beneficiary profile:
${JSON.stringify(userProfile, null, 2)}

Beneficiary just said:
"${message || 'Hello'}"

Please respond according to the system instructions in warm, clear, conversational English. Remember: Empathy first, confirm what she said, ask only ONE single question, keep sentences short and reassuring.
`;

    let response;
    try {
      response = await ai.models.generateContent({
        model: 'gemini-3.1-flash-lite',
        contents: fullPrompt,
        config: {
          systemInstruction: AASHA_SYSTEM_INSTRUCTION,
          responseMimeType: 'application/json',
          temperature: 0.7,
        },
      });
    } catch (modelError: any) {
      console.warn('flash-lite failed, falling back to gemini-3.8-flash:', modelError?.message || modelError);
      response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: fullPrompt,
        config: {
          systemInstruction: AASHA_SYSTEM_INSTRUCTION,
          responseMimeType: 'application/json',
          temperature: 0.7,
        },
      });
    }

    const textResponse = response.text || '{}';
    let parsed: any;
    try {
      parsed = JSON.parse(textResponse);
    } catch (e) {
      console.warn('JSON parsing error:', e, textResponse);
      parsed = {
        replyText: 'Hello sister! I am Aasha, your caring companion. Please do not worry, I am here to help you get government welfare benefits. What kind of help or work are you looking for?',
        step: 'listening_need',
        quickVoiceReplies: [
          'I need a sewing machine for tailoring',
          'I need monthly pension support',
          'I need a self-help group loan',
        ],
        confirmedProfile: userProfile,
      };
    }

    return res.json({
      success: true,
      data: parsed,
    });
  } catch (error: any) {
    console.error('Error in /api/aasha/chat:', error?.message || error);
    return res.json({
      success: true,
      data: {
        replyText: 'Hello sister! I am listening carefully to you. Please do not worry, I am right here by your side. What kind of support do you need today?',
        step: 'listening_need',
        quickVoiceReplies: [
          'I need a sewing machine for tailoring',
          'I need monthly pension support',
          'I want to start dairy farming',
        ],
        confirmedProfile: userProfile,
      },
    });
  }
});

// TTS audio endpoint using gemini-3.8-flash-lite-tts
app.post('/api/aasha/tts', async (req, res) => {
  try {
    const { text } = req.body;
    if (!text) {
      return res.status(400).json({ error: 'Text is required' });
    }

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash-lite-tts',
      contents: [
        {
          role: 'user',
          parts: [
            {
              text: `Speak the following Telugu text in a gentle, warm, loving, reassuring rural village elder tone: "${text}"`,
              speechMetadata: {
                style: 'Gentle, warm, loving, maternal, very slow and clear',
              },
            },
          ],
        },
      ],
      config: {
        responseModalities: ['AUDIO'],
        speechConfig: {
          voiceConfig: {
            prebuiltVoiceConfig: { voiceName: 'Kore' },
          },
        },
      },
    });

    const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
    if (base64Audio) {
      return res.json({ success: true, audioBase64: base64Audio });
    }

    return res.json({ success: false, message: 'Audio not generated by model' });
  } catch (error: any) {
    console.warn('TTS generation failed (client fallback will be used):', error?.message || error);
    return res.json({ success: false, fallbackToWebSpeech: true });
  }
});

// Setup Vite or static serving
async function startServer() {
  const isDev = process.env.NODE_ENV !== 'production';

  if (isDev) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });
}

startServer();
