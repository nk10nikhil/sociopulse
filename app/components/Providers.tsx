"use client";
// Import the ImageKitProvider component from the imagekitio-next library
import { ImageKitProvider } from "imagekitio-next";
// Import the SessionProvider component from the next-auth/react library
import { SessionProvider } from "next-auth/react";
// Retrieve the URL endpoint for ImageKit from environment variables
const urlEndpoint = process.env.IMAGEKIT_NEXT_PUBLIC_URL_ENDPOINT;
// Retrieve the public key for ImageKit from environment variables
const publicKey = process.env.IMAGEKIT_NEXT_PUBLIC_PUBLIC_KEY;

// Define the Home component
export default function Providers({ children }: { children: React.ReactNode }) {

    // Define an authenticator function to fetch authentication details from the server
    const authenticator = async () => {
        try {
            // Make a request to the server to get ImageKit authentication details
            const response = await fetch("/api/imagekitauth");

            // Check if the response is not ok (status code is not in the range 200-299)
            if (!response.ok) {
                // Get the error text from the response
                const errorText = await response.text();
                // Throw an error with the status code and error text
                throw new Error(`Request failed with status ${response.status}: ${errorText}`);
            }

            // Parse the response JSON to get the authentication data
            const data = await response.json();
            const { signature, expire, token } = data;
            // Return the authentication data
            return { signature, expire, token };
        } catch (error) {
            // Throw an error if the authentication request fails
            throw new Error(`ImageKit Authentication request failed: ${error}`);
        }
    };

    return (
        <SessionProvider>
            <div className="App">
                {/* Wrap the component with ImageKitProvider and pass the necessary props */}
                <ImageKitProvider
                    urlEndpoint={urlEndpoint}
                    publicKey={publicKey}
                    authenticator={authenticator}
                >
                    {children}
                    {/* ...client side upload component goes here */}
                </ImageKitProvider>
                {/* ...other SDK components added previously */}
            </div>
        </SessionProvider>
    );
}