// Import the DefaultSession type from the next-auth package
import { DefaultSession } from "next-auth";

// Extend the module declaration for "next-auth"
declare module "next-auth" {
  // Extend the Session interface
  interface Session {
    // Add a user property to the Session interface
    user: {
      // Add an id property of type string to the user object
      id: string;
    } & DefaultSession["user"]; // Merge the DefaultSession user properties with the custom user properties
  }
}