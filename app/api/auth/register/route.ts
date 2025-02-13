import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import User from "@/models/User";

// Function to handle POST requests for user registration
export async function POST(request: NextRequest) {
  try {
    // Extract email and password from the request body
    const { email, password } = await request.json();

    // Check if email and password are provided
    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      );
    }

    // Connect to the database
    await connectToDatabase();

    // Check if a user with the provided email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { error: "Email already registered" },
        { status: 400 }
      );
    }

    // Create a new user with the provided email and password
    await User.create({
      email,
      password,
    });

    // Return a success response
    return NextResponse.json(
      { message: "User registered successfully" },
      { status: 201 }
    );
  } catch (error) {
    // Log the error and return a failure response
    console.error("Registration error:", error);
    return NextResponse.json(
      { error: "Failed to register User" },
      { status: 500 }
    );
  }
}