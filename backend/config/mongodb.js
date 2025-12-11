import mongoose from "mongoose";

const connectDB = async () => {
    mongoose.connection.on('connected', () => {
        console.log("DB connected");
    });

    const uri = process.env.MONGO_URI || process.env.MONGODB_URI;
    if (!uri) {
        console.error('MongoDB connection string missing. Set `MONGO_URI` or `MONGODB_URI` in your environment.');
        process.exit(1);
    }

    try {
        // If you want to specify a database name separately, set MONGO_DB_NAME in your env.
        const dbName = process.env.MONGO_DB_NAME || undefined;
        await mongoose.connect(uri, dbName ? { dbName } : undefined);
        console.log('Successfully connected to MongoDB');
    } catch (err) {
        console.error('Error connecting to MongoDB:', err.message || err);
        process.exit(1);
    }
};

export default connectDB;
