import dotenv from "dotenv";
dotenv.config();
import express from "express";
import connectDb from "./config/db.js";
import cors from "cors";
import authRoutes from "./router/authRoutes.js";
import serverless from "serverless-http";

const app = express();

// Database connection with error handling
await connectDb();

app.use(
  cors({
    origin: ["http://localhost:5173", "https://carrer-stack.vercel.app"],
    credentials: true,
  }),
);

app.use(express.json());

// app.use("/api/auth", authRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something went wrong!" });
});

// Health check endpoint
app.get("/", (req, res) => {
  console.log("Root endpoint hit");
  res.setHeader("Content-Type", "application/json"); // ADD THIS
  res.status(200).json({
    // CHANGE: Use status(200) explicitly
    message: "Backend is running!",
    timestamp: new Date().toISOString(),
    status: "healthy",
  });
  res.end(); // ADD THIS - explicitly end the response
});

// Create the serverless handler
const handler = serverless(app);

export default handler;
