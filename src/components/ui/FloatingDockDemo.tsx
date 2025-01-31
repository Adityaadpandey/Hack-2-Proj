"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { FloatingDock } from "@/components/ui/floating-dock";
import { IconHome } from "@tabler/icons-react";
import { Bot, MessageCircleMore } from "lucide-react";
import { useState } from "react";

export function FloatingDockDemo() {
  const [dialog, setDialog] = useState(false);

  // Click handler for "Call Bot"
  const handleCallBotClick = (event: React.MouseEvent) => {
    event.preventDefault(); // Prevents navigation issues
    setDialog(true);
  };

  const links = [
    {
      title: "Home",
      icon: (
        <IconHome className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "/",
    },
    {
      title: "Chat",
      icon: (
        <MessageCircleMore className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "/chat",
    },
    {
      title: "Call Bot",
      icon: (
        <Bot className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "#",
      onClick: () => setDialog(true),
    },
  ];

  return (
    <div className="flex items-center justify-center w-full">
      <FloatingDock mobileClassName="translate-y-20" items={links} />
      <Dialog open={dialog} onOpenChange={setDialog}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle className="text-center text-xl font-semibold">
              Emergency Health Consultation
            </DialogTitle>
            <DialogDescription className="text-center mt-2">
              For urgent medical guidance, our 24/7 AI-powered health assistant
              is here to help. Call us now at:
              <strong className="block mt-1 text-2xl text-white font-bold">
                +16626761348
              </strong>
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-center mt-4 space-x-4">
            <Button variant="outline" onClick={() => setDialog(false)}>
              Close
            </Button>
            <Button
              variant="default"
              onClick={() => navigator.clipboard.writeText("+16626761348")}
            >
              Copy Number
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
