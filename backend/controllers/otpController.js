// controllers/otpController.js
import { sendOtp } from "../middleware/sendOtp.js";
import Otp from "../modals/Otp.js";

// Send OTP (can be called for both initial send and resend)
export const sendVerificationOtp = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    // Generate 6-digit OTP
    const otpCode = Math.floor(100000 + Math.random() * 900000).toString();

    // Delete any existing OTP for this email
    await Otp.deleteMany({ email });

    // Save new OTP to database
    await Otp.create({
      email,
      otp: otpCode,
      expiresAt: new Date(Date.now() + 10 * 60 * 1000), // 10 minutes
    });

    // Send OTP via email
    const emailResult = await sendOtp(email, otpCode);

    if (emailResult.success) {
      return res.status(200).json({
        message: "OTP sent successfully to your email",
        success: true,
      });
    } else {
      return res.status(500).json({
        message: "Failed to send OTP",
        error: emailResult.error,
      });
    }
  } catch (error) {
    console.error("Send OTP error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// Verify OTP
export const verifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;

    if (!email || !otp) {
      return res.status(400).json({ message: "Email and OTP are required" });
    }

    // Find valid OTP
    const otpRecord = await Otp.findOne({
      email,
      otp,
      expiresAt: { $gt: new Date() },
    });

    if (!otpRecord) {
      return res.status(400).json({ message: "Invalid or expired OTP" });
    }

    // Store verified email in temp storage or proceed to registration
    // Delete OTP after successful verification
    await Otp.deleteOne({ _id: otpRecord._id });

    return res.status(200).json({
      message: "OTP verified successfully",
      success: true,
    });
  } catch (error) {
    console.error("Verify OTP error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
