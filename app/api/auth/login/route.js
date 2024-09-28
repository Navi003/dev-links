// pages/api/auth/signin.js

import connectToDatabase from "@/app/db/mongodb";
import User from "@/app/model/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server"; // Correct response handling

// Secret key for JWT (stored in environment variables)
const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret_key";

export async function POST(req) {
  try {
    // Parse the incoming request data
    const data = await req.json();
    const { email, password } = data;

    console.log(email, password);

    // Connect to the MongoDB database
    await connectToDatabase();

    // Validate input
    if (!email || !password) {
      return NextResponse.json(
        {
          success: false,
          message: "Email and password are required.",
        },
        { status: 400 }
      );
    }

    // Check if the user exists
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json(
        { success: false, message: "Invalid credentials." },
        { status: 401 }
      );
    }

    // Compare the provided password with the hashed password in the database
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return NextResponse.json(
        { success: false, message: "Invalid credentials." },
        { status: 401 }
      );
    }

    // Create a JWT token
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      JWT_SECRET,
      { expiresIn: "1h" } // Token expires in 1 hour
    );

    console.log(token);

    // Send the JWT token in the response
    return NextResponse.json({ success: true, token }, { status: 200 });
  } catch (error) {
    console.error("Error during sign-in:", error.message);
    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
