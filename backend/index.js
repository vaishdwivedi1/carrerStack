import dotenv from "dotenv";
dotenv.config();
import express from "express";
import connectDb from "./config/db.js";
import cors from "cors";
import authRoutes from "./router/authRoutes.js";
import serverless from "serverless-http";

const app = express();

// Database connection with error handling
let dbConnected = false;
try {
  await connectDb(); // Add await
  dbConnected = true;
  console.log("Database connected successfully");
} catch (error) {
  console.error("Database connection failed:", error);
  dbConnected = false;
}

app.use(
  cors({
    origin: ["http://localhost:5173", "https://carrer-stack.vercel.app"],
    credentials: true,
  }),
);

app.use(express.json());

// Health check endpoint
app.get("/", (req, res) => {
  res.send("Hello World");
});

app.use("/api/auth", authRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something went wrong!" });
});

// Create the serverless handler
const handler = serverless(app);

export default handler;
