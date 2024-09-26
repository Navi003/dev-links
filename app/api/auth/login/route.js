// pages/api/auth/signin.js

import connectToDatabase from "@/app/db/mongodb";
import User from "@/app/model/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Secret key for JWT (stored in environment variables)
const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret_key";

export async function POST(req, res) {
  try {
    // Connect to the MongoDB database
    await connectToDatabase();

    // Extract email and password from the request body
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required.",
      });
    }

    // Check if the user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid credentials." });
    }

    // Compare the provided password with the hashed password in the database
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return Response.json({ success: false, message: "Invalid credentials." });
    }

    // Create a JWT token
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      JWT_SECRET,
      { expiresIn: "1h" } // Token expires in 1 hour
    );

    // Send the JWT token in the response
    return res.status(200).json({ success: true, token });
  } catch (error) {
    console.error("Error during sign-in:", error.message);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
}
