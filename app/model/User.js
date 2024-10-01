import mongoose from "mongoose";

// Schema for user data including email, name, imageSrc, and links
const UserDataSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true, // Required to ensure it exists within userData
  },
  firstName: {
    type: String,
    default: "",
  },
  lastName: {
    type: String,
    default: "",
  },
  image: {
    type: String,
    default: "", // Optional profile image URL
  },
  links: [
    {
      platform: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
  ],
});

// Main User Schema
const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true, // Ensure the email is unique at the top level
  },
  password: {
    type: String,
    required: true, // Required for user authentication
  },
  userData: {
    type: UserDataSchema,
    required: true, // Make userData required
  },
});

// Export the User model
export default mongoose.models.User || mongoose.model("User", UserSchema);
