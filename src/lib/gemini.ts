import { GoogleGenAI } from "@google/genai";

// Initialize the Gemini API client
// Note: process.env.GEMINI_API_KEY is automatically provided in this environment
const ai = new GoogleGenAI({ 
  apiKey: process.env.GEMINI_API_KEY || '' 
});

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}

export async function streamGeminiChat(messages: ChatMessage[], onChunk: (text: string) => void) {
  try {
    // Convert our message format to the SDK format
    const history = messages.slice(0, -1).map(m => ({
      role: m.role,
      parts: [{ text: m.text }]
    }));
    
    const lastMessage = messages[messages.length - 1].text;

    const chat = ai.chats.create({
      model: "gemini-3-flash-preview",
      config: {
        systemInstruction: "You are a helpful HR assistant for the 'HR Pro' application. You can help users with payroll, leave tracking, attendance, and employee management questions. Be professional, concise, and friendly.",
      },
      history: history
    });

    const result = await chat.sendMessageStream({
      message: lastMessage
    });

    let fullText = "";
    for await (const chunk of result) {
      const chunkText = chunk.text || "";
      fullText += chunkText;
      onChunk(fullText);
    }
    
    return fullText;
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw error;
  }
}
