import mongoose from "mongoose";
import { applicationConfig } from "./ApplicationConfig";
const { MONGODB_URI, COLLECTION_NAME } = applicationConfig;

export const connectDB = async () => {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
};

/*
export async function getCollection() {
  const client = mongoose.connection;
  const collection = client.db?.collection(COLLECTION_NAME);
  return collection;
}
*/