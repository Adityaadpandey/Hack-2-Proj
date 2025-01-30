// app/actions/chat.ts
"use server"

import { GoogleGenerativeAI } from "@google/generative-ai"
import { revalidatePath } from "next/cache"
import { ai_prompt } from "./gemini-prompt"

// Initialize Gemini
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!)
const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash-8b",
    generationConfig: {
        maxOutputTokens: 8000,
    },
    systemInstruction: ai_prompt,
})

// Define types for our chat history
interface ChatMessage {
    role: 'user' | 'model'
    parts: { text: string }[]
}

// Initialize and manage chat history
let chatHistory: ChatMessage[] = []

export async function generateChatResponse(formData: FormData) {
    const prompt = formData.get("prompt") as string

    // Add user message to history
    chatHistory.push({
        role: 'user',
        parts: [{ text: prompt }]
    })

    // Create a chat session with history
    const chat = model.startChat({
        history: chatHistory,
        generationConfig: {
            maxOutputTokens: 8000,
        },
    })

    // Create a new stream
    const stream = new ReadableStream({
        async start(controller) {
            try {
                const result = await chat.sendMessageStream(prompt)

                let responseText = ""
                for await (const chunk of result.stream) {
                    const chunkText = chunk.text()
                    responseText += chunkText
                    controller.enqueue(chunkText)
                }

                // Add assistant's response to history
                chatHistory.push({
                    role: 'model',
                    parts: [{ text: responseText }]
                })

                // Trim history if it gets too long (keep last N messages)
                const MAX_HISTORY = 10
                if (chatHistory.length > MAX_HISTORY * 2) { // *2 because each exchange has 2 messages
                    chatHistory = chatHistory.slice(-MAX_HISTORY * 2)
                }

                controller.close()
            } catch (error) {
                console.error('Streaming error:', error)
                controller.error(error)
            }
        }
    })

    revalidatePath("/chat")
    return stream
}



export async function processImage(formData: FormData) {
    try {
        const imageFile = formData.get("image") as File
        const prompt = formData.get("prompt") as string || "Analyze this medical image and provide professional advice."

        if (!imageFile) {
            return { success: false, error: "No image provided" }
        }

        // Convert File to Base64
        const imageBuffer = await imageFile.arrayBuffer()
        const base64Image = Buffer.from(imageBuffer).toString("base64")

        // Generate response with image context
        const result = await model.generateContentStream([
            {
                inlineData: {
                    data: base64Image,
                    mimeType: imageFile.type,
                },
            },
            prompt,
        ])

        const response = await streamToString(result.stream)
        revalidatePath("/upload")
        return { success: true, response }
    } catch  {
        return { success: false, error: "Image processing failed" }
    }
}

// Helper function to convert stream to string
async function streamToString(stream: AsyncGenerator<any>) {
    let response = ""
    for await (const chunk of stream) {
        response += chunk.text()
    }
    return response
}
