"use client"

import Chatbox from "@/components/ui/Chat"
import Spline from "@splinetool/react-spline"

export default function ChatInput() {
  const placeholders = [
    "What are the symptoms of the flu?",
    "How can I lower my blood pressure naturally?",
    "What's the recommended daily water intake?",
    "Can you explain what BMI means?",
    "What are common signs of vitamin D deficiency?",
  ]

  return (
    <div className="bg-black h-screen w-screen relative">
      <div className="-translate-y-[25%] fixed w-full">
        <Spline scene="https://prod.spline.design/gybooEl40G1Df9Ib/scene.splinecode" />
      </div>
      <div className="h-[40rem] flex flex-col items-center px-4 absolute bottom-0 w-full sm:justify-center">
        <h2 className="mb-10 sm:mb-20 text-xl text-center sm:text-5xl text-white">Ask Pulse AI</h2>
        <Chatbox placeholders={placeholders} onChange={() => { }} onSubmit={() => { }} />
      </div>

      {/* <div className="space-y-4 w-full">
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
      </div> */}



    </div>

  )
}
