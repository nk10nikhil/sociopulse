import { NextAuthOptions } from "next-auth"; // Importing NextAuthOptions type from next-auth
import CredentialsProvider from "next-auth/providers/credentials"; // Importing CredentialsProvider from next-auth/providers/credentials
import bcrypt from "bcryptjs"; // Importing bcryptjs for password hashing
import { connectToDatabase } from "./db"; // Importing a function to connect to the database
import User from "../models/User"; // Importing the User model

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials", // Name of the credentials provider
            credentials: {
                email: { label: "Email", type: "text" }, // Email field for credentials
                password: { label: "Password", type: "password" }, // Password field for credentials
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    throw new Error("Missing email or password"); // Error if email or password is missing
                }

                try {
                    await connectToDatabase(); // Connecting to the database
                    const user = await User.findOne({ email: credentials.email }); // Finding the user by email

                    if (!user) {
                        throw new Error("No user found with this email"); // Error if no user is found
                    }

                    const isValid = await bcrypt.compare(
                        credentials.password,
                        user.password
                    ); // Comparing the provided password with the stored hashed password

                    if (!isValid) {
                        throw new Error("Invalid password"); // Error if the password is invalid
                    }

                    return {
                        id: user._id.toString(),
                        email: user.email,
                    }; // Returning the user object if authentication is successful
                } catch (error) {
                    console.error("Auth error:", error); // Logging the error
                    throw error; // Throwing the error
                }
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id; // Adding user id to the token
            }
            return token; // Returning the token
        },
        async session({ session, token }) {
            if (session.user) {
                session.user.id = token.id as string; // Adding user id to the session
            }
            return session; // Returning the session
        },
    },
    pages: {
        signIn: "/login", // Custom sign-in page
        error: "/login", // Custom error page
    },
    session: {
        strategy: "jwt", // Using JWT for session strategy
        maxAge: 30 * 24 * 60 * 60, // Session max age (30 days)
    },
    secret: process.env.NEXTAUTH_SECRET, // Secret for NextAuth
};