import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// Define routes that require protection
const isProtectedRoute = createRouteMatcher([
    "/chat(.*)",
]);

export default clerkMiddleware(async (auth, req) => {
    // Public routes that should bypass protection
    const publicRoutes = ["/sign-in", "/sign-up", "/"];

    // Skip protection for public routes
    if (publicRoutes.includes(req.nextUrl.pathname)) {
        return;
    }

    // Apply protection for defined routes
    if (isProtectedRoute(req)) {
        await auth.protect();
    }
});

// Middleware configuration for Next.js
export const config = {
    matcher: [
        "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
        "/(api|trpc)(.*)", // Always run middleware for APIs
    ],
};
