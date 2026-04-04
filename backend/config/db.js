import mongoose from "mongoose";

const connectDb = async () => {
  await mongoose
    .connect(process.env.mongourl)
    .then(() => console.log("Connected to MongoDB"))
    .catch((error) => {
      console.error("Error connecting to MongoDB:", error.message);
    });
};
export default connectDb;
