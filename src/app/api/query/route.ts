import { createDeepSeek } from '@ai-sdk/deepseek';
import { streamObject } from "ai";
import { moodSchema } from "./schema";

export async function POST(req: Request) {
  const messages = await req.json();
  const deepseek = createDeepSeek({
    apiKey: process.env.DEEPSEEK_API_KEY ?? '',
  });    
  
  const result = streamObject({
    model: deepseek('deepseek-chat'),
    schema: moodSchema,
    prompt: messages,
    system: `You are an empathetic mood analyzer and emotional advisor. Analyze the mood and give the user a appropriate response.`,
  });  

  return result.toTextStreamResponse();
}