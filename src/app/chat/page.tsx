"use client"

import Chatbox from "@/components/ui/Chat"
import Spline from "@splinetool/react-spline"
import { useEffect, useState } from "react"
import { marked } from "marked"
import { ChatInterface } from "@/components/ui/ChatInterface"
import { cn } from "@/lib/utils"

export default function ChatInput() {
  const [result, setResult] = useState<any>("")
  
  interface ConvoItem {
    sender: string;
    text: string;
  }
  
  const [convo, setConvo] = useState<ConvoItem[]>([])
  
  const placeholders = [
    "What are the symptoms of the flu?",
    "How can I lower my blood pressure naturally?",
    "What's the recommended daily water intake?",
    "Can you explain what BMI means?",
    "What are common signs of vitamin D deficiency?",
  ]

  useEffect(() => {
    async function setParsed() {
      const resultElement = document.getElementById("result");
      if (resultElement && result) {
        const parsedMarkdown = await marked.parse(result);
        resultElement.innerHTML = parsedMarkdown;
        setConvo(prev => [...prev, { sender: "ai", text: result }]);
      }
    }
    
    setParsed();
  }, [result]);

  const handleUserSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    const formData = new FormData(e.currentTarget);
    const userMessage = formData.get('prompt') as string;
    if (userMessage) {
      setConvo(prev => [...prev, { sender: "user", text: userMessage }]);
    }
  }

  return (
    <div className="bg-black h-screen w-screen relative">
      <div className="-translate-y-[20%] fixed w-full">
        <Spline scene="https://prod.spline.design/gybooEl40G1Df9Ib/scene.splinecode" />
      </div>
      
      <div className="fixed top-10 p-4  flex item-center h-min w-full justify-center backdrop-blur-sm max-h-[50%] overflow-auto z-10">
        <div className="w-[50%] h-max" id="result">
          {convo.map((item, index) => (
            <div key={index} className="flex flex-col">
              <div className={cn(
                "max-w-[80%] p-4 rounded-2xl animate-float",
                item.sender === "user"
                  ? "ml-auto bg-primary text-primary-foreground rounded-br-none"
                  : "bg-muted rounded-bl-none"
              )}>
                {item.text}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="h-[40rem] flex flex-col items-center px-4 absolute bottom-0 w-full sm:justify-center">
        <Chatbox 
          placeholders={placeholders} 
          onChange={() => {}} 
          onSubmit={handleUserSubmit}
          setResult={setResult} 
        />
      </div>
    </div>
  )
}