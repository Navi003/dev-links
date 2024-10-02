import multer from "multer";
import connectToDatabase from "@/app/db/mongodb"; // Ensure this connects to your DB
import User from "@/app/model/User"; // Your User model
import cloudinary from "@/app/lib/cloudinary"; // Your Cloudinary config
import jwt from "jsonwebtoken";
import stream from "stream";
import { NextResponse } from "next/server";
import Cookies from "js-cookie"; // Import the cookie parsing library

// Set up Multer storage
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Disable bodyParser for the route
export const config = {
  api: {
    bodyParser: false, // Disable Next.js default body parser
  },
};

// Create a handler for the upload middleware
const uploadMiddleware = upload.fields([{ name: "imageSrc", maxCount: 1 }]);

export async function POST(req, res) {
  // Use a Promise to handle the multer middleware
  await new Promise((resolve, reject) => {
    uploadMiddleware(req, res, (err) => {
      if (err) {
        return reject(err);
      }
      resolve();
    });
  });

  try {
    await connectToDatabase();

    const token = req.headers.get("cookie").split("=").at(1).trim();
    console.log(token);

    const data = await req.json();

    console.log(data);

    const { email, firstName, lastName, links } = req.body; // Get other fields

    if (!token) {
      return NextResponse.json({ error: "JWT token is missing" }); // Handle missing token case
    }

    console.log(email, firstName);

    // Verify the JWT token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.userId;

    // Handle image upload to Cloudinary if file exists
    let imageUrl = "";
    if (req.files && req.files.imageSrc) {
      const file = req.files.imageSrc[0]; // Access the file from multer

      // Stream the file to Cloudinary
      const bufferStream = new stream.PassThrough();
      bufferStream.end(file.buffer);
      const result = await new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          { resource_type: "auto", public_id: `user_images/${userId}` },
          (error, result) => {
            if (error) return reject(error);
            resolve(result);
          }
        );

        bufferStream.pipe(uploadStream);
      });

      imageUrl = result.secure_url;
    }

    // Update the user data in MongoDB
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        $set: {
          userData: {
            email,
            firstName,
            lastName,
            image: imageUrl,
            links: JSON.parse(links),
          },
        },
      },
      { new: true }
    );

    return NextResponse.json({ userData: updatedUser.userData });
  } catch (error) {
    console.error("Error updating user:", error);
    return NextResponse.json({ error: "Error updating user" });
  }
}
