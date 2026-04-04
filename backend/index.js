import dotenv from "dotenv";
dotenv.config();
import express from "express";
import connectDb from "./config/db.js";
import cors from "cors";
import authRoutes from "./router/authRoutes.js";

const app = express();

// Database connection with error handling
let cachedDb = null;

async function ensureDbConnection() {
  if (cachedDb && cachedDb.readyState === 1) {
    return cachedDb;
  }
  
  try {
    cachedDb = await connectDb();
    return cachedDb;
  } catch (error) {
    console.error("Database connection failed:", error);
    throw error;
  }
}

app.use(
  cors({
    origin: ["http://localhost:5173", "https://carrer-stack.vercel.app"],
    credentials: true,
  }),
);

app.use(express.json());

// Middleware to ensure DB connection
app.use(async (req, res, next) => {
  try {
    await ensureDbConnection();
    next();
  } catch (error) {
    res.status(503).json({ error: "Database connection failed" });
  }
});

app.use("/api/auth", authRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something went wrong!" });
});

// Health check endpoint
app.get("/", (req, res) => {
  console.log("Root endpoint hit");
  res.status(200).json({ message: "Backend is running!" });
});

// Vercel serverless handler - MANUAL IMPLEMENTATION
export default async function handler(req, res) {
  console.log(`[${req.method}] ${req.url}`);
  
  // Set response headers
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', req.headers.origin || '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type,Authorization');
  
  // Handle preflight
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  
  try {
    // Convert Express app to handle the request
    await new Promise((resolve, reject) => {
      app(req, res, (err) => {
        if (err) reject(err);
        else resolve();
      });
    });
  } catch (error) {
    console.error("Handler error:", error);
    if (!res.headersSent) {
      res.status(500).json({ error: "Internal server error" });
    }
  }
}