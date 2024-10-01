import { IncomingForm } from "formidable"; // Import Formidable for file parsing
import connectToDatabase from "@/app/db/mongodb";
import User from "@/app/model/User";
import cloudinary from "@/app/lib/cloudinary";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

export const config = {
  api: {
    bodyParser: false, // Disallow default body parsing to handle file uploads
  },
};

export async function POST(req, res) {
  await connectToDatabase();

  const form = new IncomingForm();

  form.parse(req, async (err, fields, files) => {
    if (err) {
      return res.status(400).json({ error: "Error parsing form" });
    }

    const { email, firstName, lastName, links, token } = fields;
    const imageSrc = files.imageSrc; // Get uploaded file

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const userId = decoded.id;

      let imageUrl = "";
      // Upload image to Cloudinary if it exists
      if (imageSrc) {
        const uploadResult = await cloudinary.v2.uploader.upload(
          imageSrc.filepath,
          {
            resource_type: "auto",
            public_id: `user_images/${userId}`,
          }
        );

        imageUrl = uploadResult.secure_url;
      }

      // Update user data in the database
      const updatedUser = await User.findByIdAndUpdate(
        userId,
        {
          $set: {
            userData: {
              email,
              firstName,
              lastName,
              image: imageUrl || "",
              links: JSON.parse(links),
            },
          },
        },
        { new: true }
      );

      res.status(200).json({ userData: updatedUser.userData });
    } catch (error) {
      console.error(error);
      return res
        .status(400)
        .json({ error: "Error updating user", details: error.message });
    }
  });
}
