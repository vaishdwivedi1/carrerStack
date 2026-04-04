import express from "express";
import { registerUser } from "../controllers/authController.js";
import { sendOtp, verifyOtp } from "../middleware/sendOtp.js";

const router = express.Router();

router.post("/v1/register", registerUser);
router.post("/v1/send-otp", sendOtp); // Sends OTP to email or mobile based on identifier
router.post("/v1/verify-otp", verifyOtp); // Verifies OTP for both email and mobile

export default router;
