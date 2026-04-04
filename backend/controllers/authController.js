import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../modals/User.js";

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
      { expiresIn: "7d" },
    );

    // Save token to user
    user.token = token;
    user.isLoggedIn = true;
    await user.save();

    // Remove password from response
    const userWithoutPassword = {
      _id: user._id,
      username: user.username,
      email: user.email,
      isEmailVerified: user.isEmailVerified,
      avatar: user.avatar,
    };

    return res.status(201).json({
      message: "User created successfully",
      user: userWithoutPassword,
      token,
    });
  } catch (error) {
    console.log({ error });
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

export const loginWithPassword = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return res.status(400).json({ message: "Invalid payload" });

    const user = await User.findOne({ email });

    if (!user) return res.status(400).json({ message: "User not registered" });

    const hashPass = await bcrypt.compare(password, user.password);

    if (!hashPass) return res.status(400).json({ message: "Invalid details" });

    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWTTOKEN,
      {
        expiresIn: "1d",
      },
    );
    const userWithoutPassword = {
      _id: user._id,
      username: user.username,
      email: user.email,
      isEmailVerified: user.isEmailVerified,
      avatar: user.avatar,
    };

    return res.status(200).json({
      message: "Logged in",
      data: { user: userWithoutPassword, token: token },
    });
  } catch (error) {}
};
export const logoutUser = async (req, res) => {
  try {
    // Get token from header
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(400).json({
        success: false,
        message: "No token provided",
      });
    }

    // Verify token and get user
    const decoded = jwt.verify(token, process.env.JWTTOKEN);
    const userId = decoded.id;

    await User.findByIdAndUpdate(userId, {
      isLoggedIn: false,
      token: null,
    });

    return res.status(200).json({
      success: true,
      message: "Logged out successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
