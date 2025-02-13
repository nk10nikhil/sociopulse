"use client"; // Indicates that this file is a client-side component in Next.js

import { IKUpload } from "imagekitio-next"; // Import the IKUpload component from imagekitio-next library
import { IKUploadResponse } from "imagekitio-next/dist/types/components/IKUpload/props"; // Import the type for the upload response
import { useState } from "react"; // Import useState hook from React
import { Loader2 } from "lucide-react"; // Import the Loader2 component from lucide-react library

// Define the props interface for the FileUpload component
interface FileUploadProps {
    onSuccess: (res: IKUploadResponse) => void; // Callback function to handle successful upload
    onProgress?: (progress: number) => void; // Optional callback function to handle upload progress
    fileType?: "image" | "video"; // Optional prop to specify the type of file (default is "image")
}

// Define the FileUpload component
export default function FileUpload({
    onSuccess,
    onProgress,
    fileType = "image",
}: FileUploadProps) {
    const [uploading, setUploading] = useState(false); // State to track if a file is being uploaded
    const [error, setError] = useState<string | null>(null); // State to track any errors

    // Function to handle errors during upload
    const onError = (err: { message: string }) => {
        setError(err.message); // Set the error message
        setUploading(false); // Set uploading state to false
    };

    // Function to handle successful upload
    const handleSuccess = (response: IKUploadResponse) => {
        setUploading(false); // Set uploading state to false
        setError(null); // Clear any previous errors
        onSuccess(response); // Call the onSuccess callback with the response
    };

    // Function to handle the start of an upload
    const handleStartUpload = () => {
        setUploading(true); // Set uploading state to true
        setError(null); // Clear any previous errors
    };

    // Function to handle upload progress
    const handleProgress = (evt: ProgressEvent) => {
        if (evt.lengthComputable && onProgress) { // Check if the event is length computable and onProgress callback is provided
            const percentComplete = (evt.loaded / evt.total) * 100; // Calculate the percentage of upload completed
            onProgress(Math.round(percentComplete)); // Call the onProgress callback with the rounded percentage
        }
    };

    // Function to validate the file before upload
    const validateFile = (file: File) => {
        if (fileType === "video") { // If the file type is video
            if (!file.type.startsWith("video/")) { // Check if the file type is not a video
                setError("Please upload a valid video file"); // Set error message
                return false; // Return false indicating invalid file
            }
            if (file.size > 100 * 1024 * 1024) { // Check if the file size is greater than 100MB
                setError("Video size must be less than 100MB"); // Set error message
                return false; // Return false indicating invalid file
            }
        } else { // If the file type is image
            const validTypes = ["image/jpeg", "image/png", "image/webp", "image/jpg"]; // Define valid image types
            if (!validTypes.includes(file.type)) { // Check if the file type is not a valid image type
                setError("Please upload a valid image file (JPEG, PNG, JPG or WebP)"); // Set error message
                return false; // Return false indicating invalid file
            }
            if (file.size > 5 * 1024 * 1024) { // Check if the file size is greater than 5MB
                setError("File size must be less than 5MB"); // Set error message
                return false; // Return false indicating invalid file
            }
        }
        return true; // Return true indicating valid file
    };

    // Return the JSX for the component
    return (
        <div className="space-y-2"> {/* Container with vertical spacing */}
            <IKUpload
                fileName={fileType === "video" ? "video" : "image"} // Set the file name based on file type
                onError={onError} // Set the error handler
                onSuccess={handleSuccess} // Set the success handler
                onUploadStart={handleStartUpload} // Set the upload start handler
                onUploadProgress={handleProgress} // Set the upload progress handler
                accept={fileType === "video" ? "video/*" : "image/*"} // Set the accepted file types based on file type
                className="file-input file-input-bordered w-full" // Set the CSS classes for the input
                validateFile={validateFile} // Set the file validation function
                useUniqueFileName={true} // Use unique file names
                folder={fileType === "video" ? "/videos" : "/images"} // Set the folder based on file type
            />

            {uploading && ( // If uploading is true, show the uploading indicator
                <div className="flex items-center gap-2 text-sm text-primary"> {/* Container with flex layout and gap */}
                    <Loader2 className="w-4 h-4 animate-spin" /> {/* Loading spinner */}
                    <span>Uploading...</span> {/* Uploading text */}
                </div>
            )}

            {error && <div className="text-error text-sm">{error}</div>} {/* If error exists, show the error message */}
        </div>
    );
}