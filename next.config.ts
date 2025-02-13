// Import the NextConfig type from the next package
import type { NextConfig } from "next";

// Define the nextConfig object with type NextConfig
const nextConfig: NextConfig = {
  // Configuration options for Next.js
  images: {
    // Define remote patterns for loading images
    remotePatterns: [
      {
        // Use HTTPS protocol
        protocol: "https",
        // Allow images from this hostname
        hostname: "ik.imagekit.io",
        // No specific port required
        port: "",
      },
    ],
  },
};

// Export the nextConfig object as the default export
export default nextConfig;
