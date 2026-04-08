import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { prompt, clientKey } = await request.json();
    
    // Use the localized .env server key, OR manually fallback to whatever user provides in UI
    const finalApiKey = process.env.GEMINI_API_KEY || process.env.NEXT_PUBLIC_GEMINI_API_KEY || clientKey;

    if (!finalApiKey) {
      return NextResponse.json({ error: 'No API key provided. Please set GEMINI_API_KEY in process.env or provide it.' }, { status: 401 });
    }

    const resp = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${finalApiKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        contents: [{ parts: [{ text: prompt }] }], 
        generationConfig: { 
          temperature: 0.8, 
          maxOutputTokens: 1200,
          responseMimeType: "application/json"
        } 
      }),
    });

    const data = await resp.json();
    
    if (!resp.ok) {
      return NextResponse.json({ error: data?.error?.message || 'Gemini API Error' }, { status: resp.status });
    }

    return NextResponse.json(data);
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Internal Server Error' }, { status: 500 });
  }
}
