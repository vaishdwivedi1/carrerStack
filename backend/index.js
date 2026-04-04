import dotenv from "dotenv";
dotenv.config();
import express from "express";
import connectDb from "./config/db.js";
import cors from "cors";
import authRoutes from "./router/authRoutes.js";
import serverless from "serverless-http";

const app = express();
connectDb();

app.use(
  cors({
    origin: ["http://localhost:5173", "https://carrer-stack.vercel.app"],
    credentials: true,
  }),
);

app.use(express.json());

// paths
app.get("/", (req, res) => {
  console.log("Root endpoint hit");
  res.json({
    message: "Backend is running!",
    timestamp: new Date().toISOString(),
    status: "healthy",
  });
});

app.use("/api/auth", authRoutes);

// app.listen(process.env.PORT, () => {
//   console.log(`Server started at ${process.env.PORT}`);
// });

// Create the serverless handler
const handler = serverless(app);

// Export the handler directly
export default handler;
