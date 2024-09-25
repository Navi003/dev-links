import connectToDatabase from "@/app/db/mongodb";
import User from "/app/model/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const POST = async (request, response) => {
  const data = await request.json();
  const { email, password } = data.data;

  try {
    await connectToDatabase();

    const user = await User.findOne({ email });
    const match = await bcrypt.compare(password, foundUser.password);

    if (match) {
      const token = jwt.sign(
        { userId: user._id, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      );

      return Response.json({
        message: "sucess",
        status: 200,
        data: {
          todos: foundUser.todos,
          name: foundUser.name,
        },
        Authorization: jwtToken,
      });
    } else {
      throw "Something went wrong please check username and password";
    }
  } catch (error) {
    return Response.json({
      message: error.message,
      status: 404,
    });
  }
};
