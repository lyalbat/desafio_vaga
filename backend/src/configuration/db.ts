import mongoose from "mongoose";
import { applicationConfig } from "./ApplicationConfig";
const { MONGODB_URI } = applicationConfig;

export const connectDB = async () => {
  try {
    const connnection = await mongoose.connect(MONGODB_URI);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
};