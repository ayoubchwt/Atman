import { GoogleGenerativeAI } from "@google/generative-ai";
export class GemmaUtils {
  private static genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
  public static async getAIResponse(
    prompt: string,
    context?: string,
  ): Promise<string> {
    const model = this.genAI.getGenerativeModel({
      model: "gemma-3-27b-it",
    });
    try {
      const chat = model.startChat({
        history: [
          {
            role: "user",
            parts: [
              {
                text: `You are Atman AI, a helpful assistant for a note-taking app. 
                          The user is currently working on this note: "${context || "user's note is empty"}". 
                          Use this context to answer questions accurately and dont include the html tags in the response.`,
              },
            ],
          },
          {
            role: "model",
            parts: [
              {
                text: "Understood. I have the context of your note and I am ready to assist you as Atman AI.",
              },
            ],
          },
        ],
      });
      const result = await chat.sendMessage(prompt);
      return result.response.text();
    } catch (error) {
      console.log("Ai Service Error", error);
      return "Failed to connect to server";
    }
  }
}
