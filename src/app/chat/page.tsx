"use client"

import { generateChatResponse } from "@/prompts"
import { useRef, useState } from "react"

export default function ChatInput() {
    const [response, setResponse] = useState<string>("")
    const [isLoading, setIsLoading] = useState(false)
    const formRef = useRef<HTMLFormElement>(null)

    async function handleSubmit(formData: FormData) {
        setIsLoading(true)
        setResponse("")

        try {
            const stream = await generateChatResponse(formData)
            const reader = stream.getReader()

            while (true) {
                const { done, value } = await reader.read()
                if (done) break

                setResponse(prev => prev + value)
            }

            formRef.current?.reset()
        } catch (error) {
            console.error('Error:', error)
            setResponse("An error occurred. Please try again.")
        } finally {
            setIsLoading(false)
        }
    }

    async function handleClearHistory() {
        // await clearChatHistory()
        setResponse("")
    }

    return (
        <div className="space-y-4">
            <form
                ref={formRef}
                action={handleSubmit}
                className="space-y-4"
            >
                <textarea
                    name="prompt"
                    className="w-full p-4 border rounded-lg resize-none"
                    placeholder="Ask your question..."
                    rows={4}
                />
                <div className="flex gap-2">
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="flex-1 py-2 px-4 bg-blue-500 text-white rounded-lg disabled:opacity-50"
                    >
                        {isLoading ? "Generating..." : "Send Message"}
                    </button>
                    <button
                        type="button"
                        onClick={handleClearHistory}
                        className="py-2 px-4 bg-gray-500 text-white rounded-lg"
                    >
                        Clear History
                    </button>
                </div>
            </form>

            {response && (
                <div className="p-4 bg-gray-50 rounded-lg">
                    <p className="whitespace-pre-wrap">{response}</p>
                </div>
            )}
        </div>
    )
}
