import { z } from 'zod';

export const moodSchema = z.object({
    colours: z.array(z.string()
      .regex(/^#[0-9A-F]{6}$/i, 'Must be a valid 6-digit hex code'))
      .length(5, 'Must have exactly 5 colors')
      .describe('colours that represents the sentiments of the user query'),
    response: z.string()
      .describe('A concise, empathetic response'),
});

