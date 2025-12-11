import mongoose from "mongoose";

const MONGO_URI = process.env.MONGO_URI || process.env.MONGODB_URI;

if (!MONGO_URI) {
  console.error('Missing MONGO_URI / MONGODB_URI environment variable');
}

// Serverless-friendly mongoose cached connection
const cached = global.mongooseCached || (global.mongooseCached = { conn: null, promise: null });

async function connectDB() {
  if (cached.conn) return cached.conn;
  if (!cached.promise) {
    const opts = {
      // recommended options
      dbName: process.env.MONGO_DB_NAME || undefined,
    };
    cached.promise = mongoose.connect(MONGO_URI, opts).then((mongoose) => mongoose);
  }
  cached.conn = await cached.promise;
  return cached.conn;
}

export default connectDB;
