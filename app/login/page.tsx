"use client"; // This directive indicates that the file should be treated as a client-side component.

import { signIn } from "next-auth/react"; // Import the signIn function from next-auth for authentication.
import { useState } from "react"; // Import useState hook from React to manage component state.
import { useRouter } from "next/navigation"; // Import useRouter hook from Next.js for navigation.
import { useNotification } from "../components/Notification"; // Import custom hook for showing notifications.
import Link from "next/link"; // Import Link component from Next.js for client-side navigation.

export default function Login() { // Define the Login component as the default export.
    const [email, setEmail] = useState(""); // Initialize email state with an empty string.
    const [password, setPassword] = useState(""); // Initialize password state with an empty string.
    const router = useRouter(); // Initialize router for navigation.
    const { showNotification } = useNotification(); // Destructure showNotification function from useNotification hook.

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => { // Define handleSubmit function to handle form submission.
        e.preventDefault(); // Prevent the default form submission behavior.
        const result = await signIn("credentials", { // Call signIn function with email and password.
            email,
            password,
            redirect: false, // Prevent automatic redirection after sign-in.
        });

        if (result?.error) { // Check if there is an error in the result.
            showNotification(result.error, "error"); // Show error notification if there is an error.
        } else { // If no error,
            showNotification("Login successful!", "success"); // Show success notification.
            router.push("/"); // Redirect to the home page.
        }
    };

    return ( // Return the JSX to render the login form.
        <div className="max-w-md mx-auto"> // Container div with max width and centered alignment.
            <h1 className="text-2xl font-bold mb-4">Login</h1> // Heading for the login form.
            <form onSubmit={handleSubmit} className="space-y-4"> // Form element with handleSubmit as the submit handler.
                <div> // Container div for the email input field.
                    <label htmlFor="email" className="block mb-1"> // Label for the email input field.
                        Email
                    </label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)} // Update email state on input change.
                        required
                        className="w-full px-3 py-2 border rounded" // Styling for the input field.
                    />
                </div>
                <div> // Container div for the password input field.
                    <label htmlFor="password" className="block mb-1"> // Label for the password input field.
                        Password
                    </label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)} // Update password state on input change.
                        required
                        className="w-full px-3 py-2 border rounded" // Styling for the input field.
                    />
                </div>
                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600" // Styling for the submit button.
                >
                    Login
                </button>
                <p className="text-center mt-4"> // Paragraph for the register link.
                    Don&apos;t have an account?{" "}
                    <Link href="/register" className="text-blue-500 hover:text-blue-600"> // Link to the register page.
                        Register
                    </Link>
                </p>
            </form>
        </div>
    );
}