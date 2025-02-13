"use client"; // Indicates that this file is a client-side component

import { useState } from "react"; // Import useState hook from React
import { useRouter } from "next/navigation"; // Import useRouter hook from Next.js for navigation
import { useNotification } from "../components/Notification"; // Import custom hook for notifications
import Link from "next/link"; // Import Link component from Next.js for client-side navigation

export default function Register() { // Define and export the Register component
    const [email, setEmail] = useState(""); // State for email input
    const [password, setPassword] = useState(""); // State for password input
    const [confirmPassword, setConfirmPassword] = useState(""); // State for confirm password input
    const router = useRouter(); // Initialize useRouter hook
    const { showNotification } = useNotification(); // Destructure showNotification from useNotification hook

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => { // Define async function to handle form submission
        e.preventDefault(); // Prevent default form submission behavior

        if (password !== confirmPassword) { // Check if passwords match
            showNotification("Passwords do not match", "error"); // Show error notification if passwords do not match
            return; // Exit the function
        }

        try {
            const res = await fetch("/api/auth/register", { // Make POST request to register API
                method: "POST", // HTTP method
                headers: { "Content-Type": "application/json" }, // Set content type to JSON
                body: JSON.stringify({ email, password }), // Send email and password in request body
            });

            const data = await res.json(); // Parse JSON response

            if (!res.ok) { // Check if response is not OK
                throw new Error(data.error || "Registration failed"); // Throw error with message from response or default message
            }

            showNotification("Registration successful! Please log in.", "success"); // Show success notification
            router.push("/login"); // Redirect to login page
        } catch (error) {
            showNotification( // Show error notification
                error instanceof Error ? error.message : "Registration failed", // Use error message if available
                "error"
            );
        }
    };

    return (
        <div className="max-w-md mx-auto"> {/* Container div with max width and centered */}
            <h1 className="text-2xl font-bold mb-4">Register</h1> {/* Heading */}
            <form onSubmit={handleSubmit} className="space-y-4"> {/* Form with submit handler and spacing between elements */}
                <div>
                    <label htmlFor="email" className="block mb-1"> {/* Label for email input */}
                        Email
                    </label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)} // Update email state on change
                        required
                        className="w-full px-3 py-2 border rounded" // Input styling
                    />
                </div>
                <div>
                    <label htmlFor="password" className="block mb-1"> {/* Label for password input */}
                        Password
                    </label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)} // Update password state on change
                        required
                        className="w-full px-3 py-2 border rounded" // Input styling
                    />
                </div>
                <div>
                    <label htmlFor="confirmPassword" className="block mb-1"> {/* Label for confirm password input */}
                        Confirm Password
                    </label>
                    <input
                        type="password"
                        id="confirmPassword"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)} // Update confirm password state on change
                        required
                        className="w-full px-3 py-2 border rounded" // Input styling
                    />
                </div>
                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600" // Button styling
                >
                    Register
                </button>
                <p className="text-center mt-4"> {/* Paragraph with centered text and margin-top */}
                    Already have an account?{" "}
                    <Link href="/login" className="text-blue-500 hover:text-blue-600"> {/* Link to login page with styling */}
                        Login
                    </Link>
                </p>
            </form>
        </div>
    );
}