// app/actions/chat.ts
"use server";

import { GoogleGenerativeAI } from "@google/generative-ai";
import { revalidatePath } from "next/cache";
import { ai_prompt } from "./gemini-prompt";

// Initialize Gemini
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash-8b",
  generationConfig: {
    maxOutputTokens: 8000,
  },
  systemInstruction: ai_prompt,
});

// Define types for chat history
interface ChatMessage {
  role: "user" | "model";
  parts: { text: string }[];
}

// Initialize chat history
let chatHistory: ChatMessage[] = [];

export async function generateChatResponse(formData: FormData) {
  const prompt = formData.get("prompt") as string;

  // Add user message to history
  chatHistory.push({
    role: "user",
    parts: [{ text: prompt }],
  });

  // Create chat session with history
  const chat = model.startChat({
    history: chatHistory,
    generationConfig: {
      maxOutputTokens: 8000,
    },
  });

  // Create stream
  const stream = new ReadableStream({
    async start(controller) {
      try {
        const result = await chat.sendMessageStream(prompt);

        let responseText = "";
        for await (const chunk of result.stream) {
          const chunkText = chunk.text();
          responseText += chunkText;
          controller.enqueue(chunkText);
        }

        // Add assistant's response to history
        chatHistory.push({
          role: "model",
          parts: [{ text: responseText }],
        });

        // Trim history if too long
        const MAX_HISTORY = 10;
        if (chatHistory.length > MAX_HISTORY * 2) {
          chatHistory = chatHistory.slice(-MAX_HISTORY * 2);
        }

        controller.close();
      } catch (error) {
        console.error("Streaming error:", error);
        controller.error(error);
      }
    },
  });

  revalidatePath("/chat");
  return stream;
}

export async function processImage(formData: FormData) {
  try {
    const imageFile = formData.get("image") as File;
    const prompt = formData.get("prompt") as string || `Analyze this image and provide professional advice . +${ai_prompt}`;

    if (!imageFile) {
      return { success: false, error: "No image provided" };
    }

    // Convert File to Base64
    const imageBuffer = await imageFile.arrayBuffer();
    const base64Image = Buffer.from(imageBuffer).toString("base64");

    // Generate response with image context
    const result = await model.generateContentStream([
      {
        inlineData: {
          data: base64Image,
          mimeType: imageFile.type,
        },
      },
      {
        text: prompt,
      }
    ]);

    let response = "";
    for await (const chunk of result.stream) {
      response += chunk.text();
    }

    revalidatePath("/chat");
    return { success: true, response };
  } catch (error) {
    console.error("Image processing error:", error);
    return { success: false, error: "Image processing failed" };
  }
}
