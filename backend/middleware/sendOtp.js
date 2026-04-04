import nodemailer from "nodemailer";
import User from "../modals/User.js";
import Otp from "../modals/Otp.js";

export const sendOtp = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required",
      });
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    await Otp.create({ email, otp, type: "email" });

    // Send OTP via email
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.NODEMAILER_EMAIL,
        pass: process.env.NODEMAILER_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.NODEMAILER_EMAIL,
      to: email,
      subject: "OTP Verification",
      text: `Your OTP for verification is: ${otp}. Valid for 10 minutes.`,
    });

    res.status(200).json({
      success: true,
      message: "OTP sent successfully to email",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Error sending OTP",
    });
  }
};

export const verifyOtp = async (req, res) => {
  const { email, otp, purpose } = req.body;

  try {
    const otpRecord = await Otp.findOne({ email, otp }).exec();

    if (!otpRecord) {
      return res.status(400).json({
        success: false,
        message: "Invalid OTP",
      });
    }

    // Check expiry
    const otpAge = (Date.now() - otpRecord.createdAt) / (1000 * 60);
    if (otpAge > 10) {
      await OTP.deleteOne({ _id: otpRecord._id });
      return res.status(400).json({
        success: false,
        message: "OTP has expired",
      });
    }

    // Delete OTP after successful verification
    await Otp.deleteOne({ _id: otpRecord._id });

    if (purpose === "login") {
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(404).json({
          success: false,
          message: "User not found",
        });
      }

      const token = jwt.sign(
        { id: user._id, email: user.email, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: "7d" },
      );

      const { password, ...userData } = user._doc;

      return res.status(200).json({
        success: true,
        message: "OTP verified successfully",
        token,
        data: userData,
      });
    }

    res.status(200).json({
      success: true,
      message: "OTP verified successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Error verifying OTP",
    });
  }
};
