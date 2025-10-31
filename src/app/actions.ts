"use server";

import {
  generateExplanation,
  type GenerateExplanationInput,
} from "@/ai/flows/generate-explanation";

// This server action is a wrapper around the Genkit flow.
// It can be called from client components to securely execute the AI flow on the server.
export async function getExplanation(
  input: GenerateExplanationInput
): Promise<{ explanation: string } | { error: string }> {
  try {
    // Add any additional server-side logic, validation, or error handling here.
    const result = await generateExplanation(input);
    return result;
  } catch (error) {
    console.error("Error generating explanation:", error);
    // Return a structured error object that the client can handle.
    return { error: "Failed to generate an explanation. Please try again." };
  }
}
