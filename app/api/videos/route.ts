import { NextRequest, NextResponse } from "next/server"; // Importing Next.js server request and response objects
import { getServerSession } from "next-auth/next"; // Importing function to get server session from next-auth
import { authOptions } from "@/lib/authOptions"; // Importing authentication options
import { connectToDatabase } from "@/lib/db"; // Importing function to connect to the database
import Video, { IVideo } from "@/models/Video"; // Importing Video model and IVideo interface

// GET request handler to fetch videos
export async function GET() {
    try {
        await connectToDatabase(); // Connect to the database
        const videos = await Video.find({}).sort({ createdAt: -1 }).lean(); // Fetch videos from the database, sorted by creation date in descending order

        if (!videos || videos.length === 0) { // Check if no videos are found
            return NextResponse.json([], { status: 200 }); // Return an empty array with status 200
        }

        return NextResponse.json(videos); // Return the fetched videos
    } catch (error) {
        console.error("Error fetching videos:", error); // Log any errors
        return NextResponse.json(
            { error: "Failed to fetch videos" }, // Return error message
            { status: 500 } // Set status to 500
        );
    }
}

// POST request handler to create a new video
export async function POST(request: NextRequest) {
    try {
        const session = await getServerSession(authOptions); // Get the server session

        if (!session) { // Check if the session is not found
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 }); // Return unauthorized error
        }

        await connectToDatabase(); // Connect to the database
        const body: IVideo = await request.json(); // Parse the request body as IVideo

        // Validate required fields
        if (
            !body.title ||
            !body.description ||
            !body.videoUrl ||
            !body.thumbnailUrl
        ) {
            return NextResponse.json(
                { error: "Missing required fields" }, // Return error for missing fields
                { status: 400 } // Set status to 400
            );
        }

        // Create new video with default values
        const videoData = {
            ...body,
            controls: body.controls ?? true, // Set default value for controls
            transformation: {
                height: 1920,
                width: 1080,
                quality: body.transformation?.quality ?? 100, // Set default quality
            },
        };

        const newVideo = await Video.create(videoData); // Create a new video in the database
        return NextResponse.json(newVideo); // Return the created video
    } catch (error) {
        console.error("Error creating video:", error); // Log any errors
        return NextResponse.json(
            { error: "Failed to create video" }, // Return error message
            { status: 500 } // Set status to 500
        );
    }
}