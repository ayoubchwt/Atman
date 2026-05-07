import { GoogleGenAI } from "@google/genai";

export class GemmaUtils {
  private static genAI = new GoogleGenAI({});

  public static async getAIResponse(
    prompt: string,
    context?: string,
  ): Promise<string> {
    try {
      const response = await this.genAI.models.generateContent({
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
