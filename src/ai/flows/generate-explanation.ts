'use server';
/**
 * @fileOverview Generates a step-by-step explanation of how the Random Forest algorithm makes predictions, tailored to the selected role.
 *
 * - generateExplanation - A function that handles the generation of the explanation.
 * - GenerateExplanationInput - The input type for the generateExplanation function.
 * - GenerateExplanationOutput - The return type for the generateExplanation function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateExplanationInputSchema = z.object({
  role: z
    .enum(['doctor', 'fssai_certification_manager', 'bank_manager'])
    .describe('The role of the user requesting the explanation.'),
  predictionDetails: z
    .string()
    .describe(
      'Detailed information about the prediction made by the Random Forest algorithm.'
    ),
});
export type GenerateExplanationInput = z.infer<typeof GenerateExplanationInputSchema>;

const GenerateExplanationOutputSchema = z.object({
  explanation: z
    .string()
    .describe(
      'A step-by-step explanation of how the Random Forest algorithm made the prediction, tailored to the selected role.'
    ),
});
export type GenerateExplanationOutput = z.infer<typeof GenerateExplanationOutputSchema>;

export async function generateExplanation(
  input: GenerateExplanationInput
): Promise<GenerateExplanationOutput> {
  return generateExplanationFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateExplanationPrompt',
  input: {schema: GenerateExplanationInputSchema},
  output: {schema: GenerateExplanationOutputSchema},
  prompt: `You are an expert AI assistant specializing in explaining complex machine learning algorithms to people of various professional backgrounds.

You will generate a step-by-step explanation of how the Random Forest algorithm arrived at a prediction, tailoring the explanation to the user's role.

Assume the user has very little previous knowledge.

Role: {{role}}
Prediction Details: {{predictionDetails}}`,
});

const generateExplanationFlow = ai.defineFlow(
  {
    name: 'generateExplanationFlow',
    inputSchema: GenerateExplanationInputSchema,
    outputSchema: GenerateExplanationOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
