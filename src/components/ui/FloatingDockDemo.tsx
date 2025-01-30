import { FloatingDock } from "@/components/ui/floating-dock";
import { ClerkProvider, SignedIn, SignedOut, SignInButton } from "@clerk/nextjs"; // Import Clerk
import {
    IconBrandGithub,
    IconBrandX,
    IconExchange,
    IconHome,
    IconNewSection,
    IconSearch,
    IconTerminal2,
} from "@tabler/icons-react";

export function FloatingDockDemo() {
    const links = [
        {
            title: "Home",
            icon: (
                <IconHome className="h-full w-full text-neutral-500 dark:text-neutral-300" />
            ),
            href: "#",
        },
        {
            title: "Explore",
            icon: (
                <IconSearch className="h-full w-full text-neutral-500 dark:text-neutral-300" />
            ),
            href: "#", // Change this to your Explore page link
        },
        {
            title: "Chatbot",
            icon: (
                <IconTerminal2 className="h-full w-full text-neutral-500 dark:text-neutral-300" />
            ),
            href: "#", // Change this to your Chatbot page link
        },
        {
            title: "Signin",
            icon: (
                <IconNewSection className="h-full w-full text-neutral-500 dark:text-neutral-300" />
            ),
            href: "#", // This will be replaced by SignedIn and SignedOut logic
        },
    ];

    return (
        <div className="flex items-center justify-center w-full">
            <ClerkProvider>
                <FloatingDock
                    mobileClassName="translate-y-20" // only for demo, remove for production
                    items={[
                        ...links,
                        {
                            title: "Signin",
                            icon: (
                                <SignedOut>
                                    <SignInButton>
                                        <button className="relative border border-neutral-200 dark:border-white/[0.2] text-black dark:text-white px-4 py-2 rounded-full text-sm font-medium bg-gradient-to-r from-blue-500 to-purple-500 hover:bg-gradient-to-l">
                                            Sign In
                                        </button>
                                    </SignInButton>
                                </SignedOut>
                            ),
                            href: "#", // You can link to the sign-in page, if necessary
                        },
                    ]}
                />
            </ClerkProvider>
        </div>
    );
}
