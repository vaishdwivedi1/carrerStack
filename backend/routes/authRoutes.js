import express from "express";
import { logoutUser, registerUser } from "../controllers/authController.js";
import { sendOtp, verifyOtp } from "../middleware/sendOtp.js";
import passport from "passport";
import jwt from "jsonwebtoken";

const router = express.Router();

// Regular auth routes
router.post("/v1/register", registerUser);
router.post("/v1/send-otp", sendOtp);
router.post("/v1/verify-otp", verifyOtp);
router.post("/v1/logoutUser", logoutUser);

// Google OAuth routes
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] }),
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    session: false,
    failureRedirect: "/api/auth/login/failed",
  }),
  async (req, res) => {
    try {
      // Generate JWT token
      const token = jwt.sign(
        {
          id: req.user._id,
          email: req.user.email,
          username: req.user.username,
        },
        process.env.JWTTOKEN,
        { expiresIn: "7d" },
      );

      // Save token in DB
      req.user.token = token;
      req.user.isLoggedIn = true;
      await req.user.save();

      // Prepare user data for frontend
      const userData = {
        _id: req.user._id,
        username: req.user.username,
        email: req.user.email,
        avatar: req.user.avatar,
        isEmailVerified: req.user.isEmailVerified,
      };

      // Redirect to frontend with token and user data
      const frontendUrl = process.env.CLIENT_URL || "http://localhost:5173";
      res.redirect(
        `${frontendUrl}/auth-success?token=${token}&user=${encodeURIComponent(
          JSON.stringify(userData),
        )}`,
      );
    } catch (error) {
      console.error("Google login error:", error);
      const frontendUrl = process.env.CLIENT_URL || "http://localhost:5173";
      res.redirect(`${frontendUrl}/login?error=google_failed`);
    }
  },
);

// Login failure route
router.get("/login/failed", (req, res) => {
  const frontendUrl = process.env.CLIENT_URL || "http://localhost:5173";
  res.redirect(`${frontendUrl}/login?error=google_auth_failed`);
});

// Get current user route (protected - you'll need to add auth middleware)
router.get("/me", (req, res) => {
  if (req.user) {
    res.json({ success: true, user: req.user });
  } else {
    res.status(401).json({ success: false, message: "Not authenticated" });
  }
});

export default router;
