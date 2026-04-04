import dotenv from "dotenv";
dotenv.config();
import express from "express";
import connectDb from "./config/db.js";
import cors from "cors";
import authRoutes from "./router/authRoutes.js";
import serverless from "serverless-http";

const app = express();

// Global cache for database connection
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

// Middleware to ensure DB connection before handling requests
app.use(async (req, res, next) => {
  try {
    await ensureDbConnection();
    next();
  } catch (error) {
    res.status(503).json({ error: "Database connection failed" });
  }
});

app.use(
  cors({
    origin: ["http://localhost:5173", "https://carrer-stack.vercel.app"],
    credentials: true,
  }),
);

app.use(express.json());
app.use("/api/auth", authRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something went wrong!" });
});

// Health check endpoint
app.get("/", (req, res) => {
  console.log("Root endpoint hit");
  res.status(200).send("Backend is running!");
});

// For local development
if (process.env.NODE_ENV !== "production") {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

const handler = serverless(app);
export default handler;