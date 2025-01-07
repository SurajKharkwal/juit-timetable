import mongoose from "mongoose";

export default async function connectDB() {
  if (mongoose.connection.readyState >= 1) return; // Already connected
  const URL = process.env.DATABASE_URL
  if (!URL) {
    throw new Error("Connectins URL not found")
  }
  await mongoose.connect(URL)
}
