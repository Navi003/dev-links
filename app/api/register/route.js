import multer from "multer";
import connectToDatabase from "@/app/db/mongodb"; // Ensure this connects to your DB
import User from "@/app/model/User"; // Your User model
import cloudinary from "@/app/lib/cloudinary"; // Your Cloudinary config
import jwt from "jsonwebtoken";
import stream from "stream";
import { NextResponse } from "next/server";

// Set up Multer storage in memory
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Create a handler for the upload middleware
const uploadMiddleware = upload.fields([{ name: "imageSrc", maxCount: 1 }]);

export const config = {
  api: {
    bodyParser: false, // Disable Next.js default body parser
  },
};

async function runMiddleware(req, res, fn) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result);
      }
      return resolve(result);
    });
  });
}

export async function POST(req, res) {
  try {
    // Wait for the multer middleware to handle the form data
    await runMiddleware(req, res, uploadMiddleware);

    // Parse JWT from headers or cookies
    const token = req.headers.get("cookie")?.split("=")[1] || "";
    if (!token) {
      return NextResponse.json({ error: "JWT token is missing" });
    }

    // Verify the JWT token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.userId;

    // Extract form fields (ensure they're included in the request body)
    const { firstName, lastName, email, links } = req.body;
    console.log("First Name:", firstName);
    console.log("Last Name:", lastName);

    let imageUrl = "";

    // Handle image upload if present
    if (req.files && req.files.imageSrc) {
      const file = req.files.imageSrc[0]; // Get the uploaded file

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

      imageUrl = result.secure_url; // Get the Cloudinary image URL
    }

    // Connect to database and update user data
    await connectToDatabase();

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        $set: {
          userData: {
            email,
            firstName,
            lastName,
            image: imageUrl,
            links: JSON.parse(links), // Make sure `links` is being passed correctly
          },
        },
      },
      { new: true }
    );

    // Return updated user data
    return NextResponse.json({ userData: updatedUser.userData });
  } catch (error) {
    console.error("Error updating user:", error);
    return NextResponse.json({ error: "Error updating user" });
  }
}
