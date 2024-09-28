"use server";
import connectToDatabase from "@/app/db/mongodb";
import User from "../model/User";
import bcrypt from "bcryptjs"; // Add bcryptjs for password hashing

import jwt from "jsonwebtoken"; // For JWT token generation

// Secret key for JWT (it should be stored in an environment variable in production)
const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret_key";

export const userSignUp = async function (formData) {
  try {
    // Connect to the MongoDB database
    await connectToDatabase();

    // Extract email and password from the formData
    const email = formData.get("email");
    const password = formData.get("password");

    // Validate the input
    if (!email || !password) {
      throw new Error("Email and password are required.");
    }

    // Check if a user with this email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new Error("User with this email already exists.");
    }

    // Hash the password using bcrypt
    const hashedPassword = await bcrypt.hash(password, 10); // 10 is the salt rounds

    // Create a new user
    const newUser = new User({
      email,
      password: hashedPassword, // Store the hashed password
    });

    // Save the user to the database
    await newUser.save();

    // Success response (could be a redirect, a success message, etc.)
    console.log("User created successfully:", newUser);
    return { success: true, message: "User created successfully" };
  } catch (error) {
    console.error("Error creating user:", error.message);
    return { success: false, message: error.message };
  }
};

// export const userSignIn = async function (formData) {};
