import mongoose from "mongoose";

const MONGO_URI = process.env.VITE_MONGODB_URI;

if (!MONGO_URI) {
  throw new Error("Please define the MONGO_URI environment variable");
}

async function databaseConnect() {
  console.log("Connecting to database");
  if (mongoose.connection.readyState >= 1) {
    console.log("Database connection is ready");
    return;
  }

  try {
    await mongoose.connect(MONGO_URI!);
  } catch (error) {
    console.error("Unable to connect to database", error);
  }
}

export default databaseConnect;
