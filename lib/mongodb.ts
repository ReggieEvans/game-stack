import mongoose from "mongoose";

const cached = (global as any).mongoose || { conn: null, promise: null };

export async function connectToDB() {
  if (cached.conn) {
    console.log("Using existing MongoDB connection");
    return cached.conn;
  }

  if (!cached.promise) {
    mongoose.set("strictQuery", true);
    console.log("Connecting to MongoDB...");
    cached.promise = mongoose
      .connect(process.env.MONGODB_URI!, {
        dbName: "db_name",
      })
      .then((m) => m);
  }

  cached.conn = await cached.promise;
  (global as any).mongoose = cached;

  return cached.conn;
}
