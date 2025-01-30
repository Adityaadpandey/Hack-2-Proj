"use client";

import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

interface NavItem {
    name: string;
    link: string;
    icon?: JSX.Element;
}

interface FloatingNavProps {
    navItems: NavItem[];
    className?: string;
}

export const FloatingNav = ({ navItems, className = "" }: FloatingNavProps) => {
    const pathname = usePathname();
    const [visible, setVisible] = useState(true);
    const { scrollY } = useScroll();

    // Use Framer Motion's built-in scroll handling
    useMotionValueEvent(scrollY, "change", (latest) => {
        // Show nav when scrolling up or near the top
        const previous = scrollY.getPrevious();
        setVisible(previous > latest || latest < 10);
    });

    return (
        <AnimatePresence mode="wait">
            <motion.nav
                initial={{ opacity: 1, y: 0 }}
                animate={{
                    y: visible ? 0 : -100,
                    opacity: visible ? 1 : 0,
                }}
                transition={{
                    duration: 0.2,
                    ease: "easeInOut",
                }}
                className={`
          fixed top-10 inset-x-0 mx-auto
          flex max-w-fit items-center justify-center
          border border-transparent dark:border-white/[0.2]
          rounded-full dark:bg-black bg-white
          shadow-lg z-[5000] pr-4 pl-8 py-2 space-x-4
          ${className}
        `}
            >
                {navItems.map((navItem) => (
                    <NavLink
                        key={navItem.link}
                        item={navItem}
                        isActive={pathname === navItem.link}
                    />
                ))}

                <AuthSection />
            </motion.nav>
        </AnimatePresence>
    );
};

// Separate NavLink component for better organization
const NavLink = ({ item, isActive }: { item: NavItem; isActive: boolean }) => (
    <Link
        href={item.link}
        className={`
      relative flex items-center space-x-1 text-sm
      ${isActive
                ? "text-gray-800 dark:text-gray-200"
                : "text-neutral-600 dark:text-neutral-50 hover:text-neutral-500 dark:hover:text-neutral-300"
            }
    `}
    >
        <span className="block sm:hidden">{item.icon}</span>
        <span className="hidden sm:block">{item.name}</span>

        {isActive && (
            <motion.span
                layoutId="activeNav"
                className="absolute inset-x-0 w-100 mx-auto -bottom-px bg-gradient-to-r from-primary via-orange-300 to-primary-foreground from-transparent to-transparent h-px"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
            />
        )}
    </Link>
);

// Separate AuthSection component for better organization
const AuthSection = () => (
    <>
        <SignedIn>
            <UserButton
                afterSignOutUrl="/"
                appearance={{
                    elements: {
                        userButtonAvatarBox: "h-8 w-8",
                        userButton: "p-2 border border-neutral-200 dark:border-white/[0.2] rounded-full",
                    },
                }}
            />
        </SignedIn>

        <SignedOut>
            <SignInButton>
                <button className="relative border border-neutral-200 dark:border-white/[0.2] text-black dark:text-white px-4 py-2 rounded-full text-sm font-medium">
                    <span>Login</span>
                    <motion.span
                        className="absolute inset-x-0 -bottom-px h-px w-1/2 mx-auto bg-gradient-to-r from-transparent via-red-500 to-transparent"
                        animate={{
                            opacity: [0.5, 1, 0.5],
                            transition: { duration: 2, repeat: Infinity }
                        }}
                    />
                </button>
            </SignInButton>
        </SignedOut>
    </>
);
