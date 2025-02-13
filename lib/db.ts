// Import the mongoose library to interact with MongoDB
import mongoose from "mongoose";

// Retrieve the MongoDB URI from environment variables
const MONGODB_URI = process.env.MONGODB_URI!;

// Check if the MongoDB URI is not defined and throw an error if it's missing
if (!MONGODB_URI) {
    throw new Error("MONGODB_URI is not defined");
}

// Initialize a cache object to store the connection and promise
let cached = global.mongoose;

// If the cache object does not exist, create it with default values
if (!cached) {
    cached = global.mongoose = { connection: null, promise: null };
}

// Function to connect to the MongoDB database
export async function connectToDatabase() {

    // If a connection already exists in the cache, return it
    if (cached.connection) {
        return cached.connection;
    }

    // If there is no promise in the cache, create a new connection promise
    if (!cached.promise) {
        const opts = {
            // Enable buffering of commands while the connection is being established
            bufferCommands: true,
            // Set the maximum number of connections in the pool
            maxPoolSize: 10,
        };

        // Create a new connection promise and store it in the cache
        cached.promise = mongoose
            .connect(MONGODB_URI, opts)
            .then(() => mongoose.connection);
    }

    try {
        // Await the connection promise and store the connection in the cache
        cached.connection = await cached.promise;
    } catch (error) {
        // If an error occurs, reset the promise in the cache and rethrow the error
        cached.promise = null;
        throw error;
    }

    // Return the established connection
    return cached.connection;
}