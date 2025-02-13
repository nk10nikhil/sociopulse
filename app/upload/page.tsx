"use client"; // Indicates that this file is a client-side component

import VideoUploadForm from "../components/VideoUploadForm"; // Import the VideoUploadForm component from the components directory

export default function VideoUploadPage() { // Define and export the VideoUploadPage component as the default export
    return (
        <div className="container mx-auto px-4 py-8"> {/* Container div with Tailwind CSS classes for styling */}
            <div className="max-w-2xl mx-auto"> {/* Inner div with max width and centered horizontally */}
                <h1 className="text-3xl font-bold mb-8">Upload New Reel</h1> {/* Heading with Tailwind CSS classes for styling */}
                <VideoUploadForm /> {/* Render the VideoUploadForm component */}
            </div>
        </div>
    );
}