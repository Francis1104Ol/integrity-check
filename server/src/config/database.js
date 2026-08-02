import mongoose from "mongoose";
import env from "./env.js";

const connectDB = async (mongoUri = env.mongoUri) => {
  try {
    const conn = await mongoose.connect(mongoUri);

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error("Database connection failed:", error.message);
    process.exit(1);
  }
};

export default connectDB;