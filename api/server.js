// api/server.js

import express from "express";
import cors from "cors";
import "dotenv/config";
import serverless from "serverless-http";

// DB + Cloud
import connectDB from "./config/mongodb.js";
import connectCloudinary from "./config/cloudinary.js";

// Routes
import userRouter from "./routes/userRoute.js";
import productRouter from "./routes/productRoute.js";
import cartRouter from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoute.js";

// Create App
const app = express();

// Connect DB + Cloudinary
connectDB();
connectCloudinary();

// Middleware
app.use(express.json());
app.use(cors());

// API Routes
app.use("/api/user", userRouter);
app.use("/api/product", productRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);

// Health Check
app.get("/", (req, res) => {
  res.send("API working");
});

// ❌ NO app.listen()
// ✅ Export handler for Vercel Serverless
export const handler = serverless(app);
export default app;
