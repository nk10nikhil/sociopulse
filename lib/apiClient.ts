import { IVideo } from "@/models/Video"; // Importing the IVideo interface from the models/Video file

export type VideoFormData = Omit<IVideo, "_id">; // Creating a type alias VideoFormData by omitting the _id property from IVideo

type FetchOptions = {
    method?: "GET" | "POST" | "PUT" | "DELETE"; // Optional HTTP method
    body?: any; // Optional request body
    headers?: Record<string, string>; // Optional headers as a record of string key-value pairs
};

class ApiClient {
    private async fetch<T>( // Private method to make an HTTP request and return a promise of type T
        endpoint: string, // API endpoint
        options: FetchOptions = {} // Optional fetch options with default value as an empty object
    ): Promise<T> {
        const { method = "GET", body, headers = {} } = options; // Destructuring options with default values

        const defaultHeaders = {
            "Content-Type": "application/json", // Default content type header
            ...headers, // Merging additional headers
        };

        const response = await fetch(`/api${endpoint}`, { // Making the fetch request to the API
            method, // HTTP method
            headers: defaultHeaders, // Headers
            body: body ? JSON.stringify(body) : undefined, // Stringify body if it exists
        });

        if (!response.ok) { // If response is not ok, throw an error with the response text
            throw new Error(await response.text());
        }

        return response.json(); // Return the response as JSON
    }

    async getVideos() { // Method to get a list of videos
        return this.fetch<IVideo[]>("/videos"); // Fetching videos from the /videos endpoint
    }

    async getVideo(id: string) { // Method to get a single video by id
        return this.fetch<IVideo>(`/videos/${id}`); // Fetching a video from the /videos/:id endpoint
    }

    async createVideo(videoData: VideoFormData) { // Method to create a new video
        return this.fetch<IVideo>("/videos", { // Sending a POST request to the /videos endpoint
            method: "POST", // HTTP method POST
            body: videoData, // Request body with video data
        });
    }
}

export const apiClient = new ApiClient(); // Exporting an instance of ApiClient