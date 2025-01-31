import { FloatingDock } from "@/components/ui/floating-dock";
<<<<<<< HEAD
import { ClerkProvider, SignedOut, SignInButton } from "@clerk/nextjs"; // Import Clerk
import {
    IconHome,
    IconNewSection,
    IconSearch,
    IconTerminal2
=======
import {
    IconHome
>>>>>>> f71ba84 (nice)
} from "@tabler/icons-react";
import { Bot, MessageCircleMore } from "lucide-react";

export function FloatingDockDemo() {
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
            href: "/",
        }
    ];

    return (
        <div className="flex items-center justify-center w-full">
            <FloatingDock
                mobileClassName="translate-y-20"
                items={[
                    ...links
                ]}
            />
        </div>
    );
}
