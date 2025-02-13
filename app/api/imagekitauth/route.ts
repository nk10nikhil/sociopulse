// Import the ImageKit library
import ImageKit from "imagekit";

// Import the NextResponse object from Next.js
import { NextResponse } from "next/server";

// Initialize the ImageKit instance with the necessary credentials
const imagekit = new ImageKit({
    publicKey: process.env.IMAGEKIT_NEXT_PUBLIC_PUBLIC_KEY!, // Public key from environment variables
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY!, // Private key from environment variables
    urlEndpoint: process.env.IMAGEKIT_NEXT_PUBLIC_URL_ENDPOINT!, // URL endpoint from environment variables
});

// Define an asynchronous GET function to handle the API request
export async function GET() {
    try {
        // Return the authentication parameters as a JSON response
        return NextResponse.json(imagekit.getAuthenticationParameters());
    } catch (error) {
        // Return an error response if the request fails
        return NextResponse.json(
            { error: "ImageKit Auth Failed" },
            { status: 500 }
        )
    }
}