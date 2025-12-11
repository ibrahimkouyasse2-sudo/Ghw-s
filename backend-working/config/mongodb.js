import mongoose from 'mongoose';

const getMongoUri = () => process.env.MONGO_URI || process.env.MONGODB_URI || null;

// Serverless-friendly cached promise on the global object
// Initialize lazily inside connectDB to avoid attempting a connection at module import
async function _initMongoClient() {
  const MONGO_URI = getMongoUri();
  if (!MONGO_URI) {
    throw new Error('Missing MONGO_URI / MONGODB_URI environment variable');
  }

  const opts = {
    dbName: process.env.MONGO_DB_NAME || undefined,
    // add other mongoose options here if needed
  };

  return mongoose.connect(MONGO_URI, opts).then((m) => m);
}

export default async function connectDB() {
  if (!global._mongoClientPromise) {
    // create and cache the promise so subsequent imports reuse the same connection
    global._mongoClientPromise = _initMongoClient();
  }

  // Await the cached promise (may reject if env var missing or connection fails)
  await global._mongoClientPromise;
  return mongoose;
}
