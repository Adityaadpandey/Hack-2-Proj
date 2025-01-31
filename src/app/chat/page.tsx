"use client";

import Chatbox from "@/components/ui/Chat";
import { cn } from "@/lib/utils";
import Spline from "@splinetool/react-spline";
import { useEffect, useRef, useState } from "react";

export default function ChatInput() {
  const [result, setResult] = useState<string>("");
  const [convo, setConvo] = useState<{ sender: string; text: string }[]>([]);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  const placeholders = [
    "What are the symptoms of the flu?",
    "How can I lower my blood pressure naturally?",
    "What's the recommended daily water intake?",
    "Can you explain what BMI means?",
    "What are common signs of vitamin D deficiency?",
  ];

  // Update the conversation when result changes
  useEffect(() => {
    if (!result) return;

    // Split the result into individual messages
    const messages = result.split("\n\n").map((msg) => msg.trim());

    const newConvo: { sender: string; text: string }[] = [];

    messages.forEach((msg) => {
      if (msg.startsWith("User: ")) {
        newConvo.push({
          sender: "user",
          text: msg.replace("User: ", "").trim(),
        });
      } else if (msg.startsWith("Assistant: ")) {
        newConvo.push({
          sender: "ai",
          text: msg.replace("Assistant: ", "").trim(),
        });
      }
    });

    setConvo(newConvo);

    // Scroll to bottom when new messages arrive
    setTimeout(() => {
      if (chatContainerRef.current) {
        chatContainerRef.current.scrollTop =
          chatContainerRef.current.scrollHeight;
      }
    }, 100);
  }, [result]);

  return (
    <div className="bg-black h-screen w-screen relative flex flex-col">
      {/* Spline background */}
      <div className="fixed inset-0 pointer-events-none">
        <Spline scene="https://prod.spline.design/gybooEl40G1Df9Ib/scene.splinecode" />
      </div>

      {/* Chat container */}
      <div
        ref={chatContainerRef}
        className="flex-1 overflow-y-auto px-4 pt-8 pb-32 flex flex-col items-center z-10"
      >
        <div className="w-full max-w-2xl space-y-4">
          {convo.length === 0 && (
            <div className="text-gray-500 text-center pt-8">
              Start a conversation by typing a message below
            </div>
          )}
          {convo.map((item, index) => (
            <div key={index} className="flex flex-col animate-fade-in">
              <div
                className={cn(
                  "max-w-[80%] p-4 rounded-2xl",
                  item.sender === "user"
                    ? "ml-auto bg-primary text-primary-foreground rounded-br-none"
                    : "bg-muted rounded-bl-none",
                )}
              >
                {item.text}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Input box */}
      <div
        className={`fixed bottom-0 left-0 right-0 p-4 ${convo.length === 0 ? "pb-56" : "pb-10"} bg-gradient-to-t from-black to-transparent z-[999]`}
      >
        <div className="max-w-xl mx-auto border border-gray-600 rounded-full">
          <Chatbox
            placeholders={placeholders}
            onChange={() => {}}
            onSubmit={() => {}}
            setResult={(updater: any) => {
              if (typeof updater === "function") {
                setResult((prev) => updater(prev));
              } else {
                setResult(updater);
              }
            }}
          />
        </div>
      </div>
    </div>
  );
}
