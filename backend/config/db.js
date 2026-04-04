import mongoose from "mongoose";

const connectDb = async () => {
  try {
    // Use the correct environment variable name (check what's in your .env)
    const mongoUri = process.env.mongourl;

    if (!mongoUri) {
      throw new Error(
        "MongoDB connection string is missing! Check your environment variables.",
      );
    }

    await mongoose.connect(mongoUri);
    console.log("✅ Connected to MongoDB successfully");
    return true;
  } catch (error) {
    console.error("❌ Error connecting to MongoDB:", error.message);
    throw error; // Important: Re-throw the error so the caller knows it failed
  }
};

export default connectDb;
