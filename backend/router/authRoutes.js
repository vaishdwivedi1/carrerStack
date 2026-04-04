import express from "express";
import { registerUser } from "../controllers/authController.js";
import {
  sendVerificationOtp,
  verifyOtp,
} from "../controllers/otpController.js";

const router = express.Router();

router.post("/v1/registerUser", registerUser);
router.post("/v1/sendVerificationOtp", sendVerificationOtp);
router.post("/v1/verifyOtp", verifyOtp);

export default router;
