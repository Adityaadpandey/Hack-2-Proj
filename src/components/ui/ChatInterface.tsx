import { useState } from "react";
import { Send, Mic, Image as ImageIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface Message {
  id: number;
  text: string;
  sender: "user" | "ai";
}

export const ChatInterface = () => {
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, text: "Hello! How can I help you today?", sender: "ai" },
  ]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;
    
    setMessages(prev => [...prev, { id: Date.now(), text: input, sender: "user" }]);
    setInput("");
    
    // Simulate AI response
    setTimeout(() => {
      setMessages(prev => [...prev, { 
        id: Date.now(), 
        text: "I understand your concern. Let me help you with that.", 
        sender: "ai" 
      }]);
    }, 1000);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)]">
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={cn(
              "max-w-[80%] p-4 rounded-2xl animate-float",
              message.sender === "user" 
                ? "ml-auto bg-primary text-primary-foreground rounded-br-none"
                : "bg-muted rounded-bl-none"
            )}
          >
            {message.text}
          </div>
        ))}
      </div>
      
      <div className="p-4 glass border-t border-white/10">
        <div className="flex items-center gap-2">
          <button className="p-2 rounded-full hover:bg-white/10 transition-colors">
            <ImageIcon className="w-6 h-6 text-white/70" />
          </button>
          <button className="p-2 rounded-full hover:bg-white/10 transition-colors">
            <Mic className="w-6 h-6 text-white/70" />
          </button>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSend()}
            placeholder="Type your message..."
            className="flex-1 bg-white/10 rounded-full px-4 py-2 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-white/20"
          />
          <button
            onClick={handleSend}
            className="p-2 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            <Send className="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>
  );
};