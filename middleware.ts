// Import the withAuth function from next-auth/middleware
import { withAuth } from "next-auth/middleware";
// Import the NextResponse object from next/server
import { NextResponse } from "next/server";
 
// Export the default middleware function wrapped with withAuth
export default withAuth(
    // Define the middleware function
    function middleware() {
        // Return the next response in the middleware chain
        return NextResponse.next();
    },
    {
        // Define the callbacks for the withAuth function
        callbacks: {
            // Define the authorized callback function
            authorized: ({ token, req }) => {
                // Destructure the pathname from the request's nextUrl
                const { pathname } = req.nextUrl;

                // Allow auth-related routes
                if (
                    pathname.startsWith("/api/auth") || // Allow API auth routes
                    pathname === "/login" || // Allow login route
                    pathname === "/register" // Allow register route
                ) {
                    return true; // Return true to allow access
                }

                // Public routes
                if (pathname === "/" || pathname.startsWith("/api/videos")) {
                    return true; // Return true to allow access to public routes
                }
                // All other routes require authentication
                return !!token; // Return true if token exists, otherwise false
            },
        },
    }
);

// Export the config object for the middleware
export const config = {
    matcher: [
        /*
         * Match all request paths except:
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         * - public folder
         */
        "/((?!_next/static|_next/image|favicon.ico|public/).*)",
    ],
};