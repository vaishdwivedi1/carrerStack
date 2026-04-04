import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import User from "../modals/User.js";
import dotenv from "dotenv";
dotenv.config();

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL:
        process.env.GOOGLE_CALLBACK_URL ||
        "http://localhost:5000/api/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, cb) => {
      try {
        console.log("Google profile received:", profile.emails[0].value);

        let user = await User.findOne({ email: profile.emails[0].value });

        if (user) {
          // If user exists but no googleId yet, link it
          if (!user.googleId) {
            user.googleId = profile.id;
          }
          user.isLoggedIn = true;
          await user.save();
          console.log("Existing user logged in:", user.email);
        } else {
          // No user with that email → create new one
          user = await User.create({
            googleId: profile.id,
            username: profile.displayName,
            email: profile.emails[0].value,
            avatar: profile.photos[0]?.value || "",
            isLoggedIn: true,
            isVerified: true,
            isEmailVerified: true,
          });
          console.log("New user created:", user.email);
        }

        return cb(null, user);
      } catch (error) {
        console.error("Google Strategy Error:", error);
        return cb(error, null);
      }
    },
  ),
);

// Serialize user for the session
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// Deserialize user from the session
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});

export default passport;
