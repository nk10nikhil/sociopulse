import mongoose, { Schema, model, models } from "mongoose";

// Define constant dimensions for videos
export const VIDEO_DIMENSIONS = {
  width: 1080,
  height: 1920,
} as const;

// Define the interface for a Video document
export interface IVideo {
  _id?: mongoose.Types.ObjectId; // Optional MongoDB ObjectId
  title: string; // Title of the video
  description: string; // Description of the video
  videoUrl: string; // URL of the video file
  thumbnailUrl: string; // URL of the video's thumbnail image
  controls?: boolean; // Optional flag to show controls, default is true
  transformation?: {
    height: number; // Height for video transformation
    width: number; // Width for video transformation
    quality?: number; // Optional quality for video transformation (1-100)
  };
}

// Define the schema for a Video document
const videoSchema = new Schema<IVideo>(
  {
    title: { type: String, required: true }, // Title is required
    description: { type: String, required: true }, // Description is required
    videoUrl: { type: String, required: true }, // Video URL is required
    thumbnailUrl: { type: String, required: true }, // Thumbnail URL is required
    controls: { type: Boolean, default: true }, // Controls default to true
    transformation: {
      height: { type: Number, default: VIDEO_DIMENSIONS.height }, // Default height
      width: { type: Number, default: VIDEO_DIMENSIONS.width }, // Default width
      quality: { type: Number, min: 1, max: 100 }, // Quality between 1 and 100
    },
  },
  { timestamps: true } // Automatically manage createdAt and updatedAt timestamps
);

// Create or retrieve the Video model
const Video = models?.Video || model<IVideo>("Video", videoSchema);

export default Video; // Export the Video model