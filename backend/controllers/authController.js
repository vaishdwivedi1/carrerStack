// controllers/authController.js
import User from "../modals/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Otp from "../modals/Otp.js";

export const registerUser = async (req, res) => {
  try {
    const { username, email, password, otp } = req.body;

    if (!username || !email || !password || !otp) {
      return res
        .status(400)
        .json({ message: "All fields including OTP are required" });
    }

    // Check if user already exists
    const userNameOrEmailExist = await User.findOne({
      $or: [{ username: username }, { email: email }],
    });

    if (userNameOrEmailExist) {
      return res
        .status(400)
        .json({ message: "Username or email already exists" });
    }

    // Hash password and create user
    const hashPass = await bcrypt.hash(password, 10);
    const user = await User.create({
      username,
      email,
      password: hashPass,
      isEmailVerified: true,
    });

    // Generate token ONLY after successful user creation
    const token = jwt.sign(
      { id: user._id, email: user.email, username: user.username },
      process.env.JWTTOKEN,
      { expiresIn: "1d" },
    );

    // Remove password from response
    const userWithoutPassword = {
      _id: user._id,
      username: user.username,
      email: user.email,
      isEmailVerified: user.isEmailVerified,
    };

    return res.status(201).json({
      message: "User created successfully",
      user: userWithoutPassword,
      token, // Token generated here after OTP verification
    });
  } catch (error) {
    console.log({ error });
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};
