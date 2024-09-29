import connectToDatabase from "@/app/db/mongodb";
import User from "@/app/models/User";
import bcrypt from "bcryptjs";

export async function GET(req, res) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  await connectToDatabase();

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    return res.status(422).json({ message: "User already exists" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = new User({ email, password: hashedPassword });
  await newUser.save();

  return res.status(201).json({ message: "User created successfully" });
}
