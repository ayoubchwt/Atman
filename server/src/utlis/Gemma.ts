import { GoogleGenAI } from "@google/genai";

export class GemmaUtils {
  public static async getAIResponse(
    prompt: string,
    context?: string,
  ): Promise<string> {
    try {
      const genAI = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

      const response = await genAI.models.generateContent({
        model: "gemma-4-26b-a4b-it",
        contents: prompt,
        config: {
          systemInstruction: `You are Atman AI, a helpful assistant for a note-taking app. 
                                The user is currently working on this note: "${context || "user's note is empty"}". 
                                Use this context to answer questions accurately and dont include the html tags in the response.`,
        },
      });

      return response.text || "Failed to connect to server";
    } catch (error) {
      console.log("AI Service Error", error);
      return "Failed to connect to server";
    }
  }
}
