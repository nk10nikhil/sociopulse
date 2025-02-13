// Import the NextAuth function from the next-auth package
import NextAuth from "next-auth";

// Import the authentication options from a local module
import { authOptions } from "@/lib/authOptions";

// Create a NextAuth handler using the imported authentication options
const handler = NextAuth(authOptions);

// Export the handler for GET and POST HTTP methods
export { handler as GET, handler as POST };