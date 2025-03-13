import { createDeepSeek } from '@ai-sdk/deepseek';
import { streamObject } from "ai";
import { moodSchema } from "./schema";

export const runtime = 'edge'; // Optional: Use Edge Runtime for better streaming

export async function POST(req: Request) {
  try {
    const messages = await req.json();
    const deepseek = createDeepSeek({
      apiKey: process.env.DEEPSEEK_API_KEY ?? '',
    });    
    
    const result = streamObject({
      model: deepseek('deepseek-chat'),
      schema: moodSchema,
      prompt: messages,
      system: `You are an empathetic mood analyzer and musculinity life coach. Analyze the mood and give the user a critical musculine response like YOU ARE FUCKING ELON MUSK without mentioning his name, scold them if necessary (like calling them a pussy/ sussy/ loser) and show some ELON MUSK PERSONALITY AND MENTALITY. Don't be repetitive though. REMEMBER dont mention the name of elon mush in the response and be as mean as you can to coach your students/ users.`,
      temperature: 1.5,
      maxTokens: 5000,
    });  

    const response = result.toTextStreamResponse();
    
    // Add headers to prevent caching
    response.headers.set('Cache-Control', 'no-cache, no-transform');
    response.headers.set('X-Content-Type-Options', 'nosniff');
    
    return response;

  } catch (error) {
    console.error('DeepSeek API error:', error);
    return new Response(
      JSON.stringify({ 
        error: 'Error processing your request',
        details: error instanceof Error ? error.message : 'Unknown error'
      }), 
      { 
        status: 500,
        headers: {
          'Content-Type': 'application/json',
        }
      }
    );
  }
}