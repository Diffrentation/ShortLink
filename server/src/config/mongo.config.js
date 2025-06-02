import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config({ path: "./.env" });

export const connectDB = async () => {
  try {
    const connect = await mongoose.connect(process.env.MONGO_URL, {});
    console.log(`MongoDB connected: ${connect.connection.host}`);
    return connect;
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1);
  }
};
