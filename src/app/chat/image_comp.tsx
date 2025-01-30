
// app/components/ImageUpload.tsx
"use client"

import { processImage } from "@/prompts"
import { useRef, useState } from "react"
import { useFormStatus } from "react-dom"

export default function ImageUpload() {
    const [response, setResponse] = useState("")
    const formRef = useRef<HTMLFormElement>(null)
    const { pending } = useFormStatus()

    async function handleSubmit(formData: FormData) {
        setResponse("") // Clear previous response

        try {
            const res = await processImage(formData)

            if (!res?.body) throw new Error("No response body")

            const reader = res.body.getReader()
            const decoder = new TextDecoder()

            while (true) {
                const { value, done } = await reader.read()
                if (done) break

                const text = decoder.decode(value)
                setResponse(prev => prev + text)
            }

            // Reset form after successful submission
            formRef.current?.reset()

        } catch (error) {
            console.error("Image processing error:", error)
            setResponse("An error occurred while processing the image.")
        }
    }

    return (
        <div className="space-y-4">
            <form
                ref={formRef}
                action={handleSubmit}
                className="space-y-4"
            >
                <div className="space-y-2">
                    <label className="block text-sm font-medium">
                        Upload Medical Image
                    </label>
                    <input
                        type="file"
                        name="image"
                        accept="image/*"
                        className="w-full p-2 border rounded-lg"
                    />
                </div>

                <textarea
                    name="prompt"
                    className="w-full p-4 border rounded-lg resize-none"
                    placeholder="Add specific instructions for image analysis (optional)"
                    rows={2}
                />

                <button
                    type="submit"
                    disabled={pending}
                    className="w-full py-2 px-4 bg-blue-500 text-white rounded-lg disabled:opacity-50"
                >
                    {pending ? "Processing..." : "Analyze Image"}
                </button>
            </form>

            {response && (
                <div className="p-4 bg-gray-50 rounded-lg">
                    <p className="whitespace-pre-wrap">{response}</p>
                </div>
            )}
        </div>
    )
}
