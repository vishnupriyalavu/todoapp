import mongoose from "mongoose";

export const connectDatabase = async (mongoUri: string): Promise<void> => {
  try {
    await mongoose.connect(mongoUri);
    console.log("MongoDB connection established");
  } catch (error) {
    console.error("Database connection failed:", error);
    process.exit(1);
  }
};