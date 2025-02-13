"use client";

import React, { useEffect, useState } from "react";
import VideoFeed from "./components/VideoFeed";
import { IVideo } from "@/models/Video";
import { apiClient } from "@/lib/apiClient";

export default function Home() {
  // State to store the list of videos
  const [videos, setVideos] = useState<IVideo[]>([]);

  useEffect(() => {
    // Function to fetch videos from the API
    const fetchVideos = async () => {
      try {
        // Fetch videos using the apiClient
        const data = await apiClient.getVideos();
        // Update the state with the fetched videos
        setVideos(data);
      } catch (error) {
        // Log any errors that occur during the fetch
        console.error("Error fetching videos:", error);
      }
    };

    // Call the fetchVideos function when the component mounts
    fetchVideos();
  }, []);

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">ImageKit ReelsPro</h1>
      <VideoFeed videos={videos} />
    </main>
  );
}