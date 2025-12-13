// backend/server.js
import express from "express";
import cors from "cors";
import "dotenv/config";

import connectDB from "./config/mongodb.js";
import connectCloudinary from "./config/cloudinary.js";

import userRouter from "./routes/userRoute.js";
import productRouter from "./routes/productRoute.js";
import cartRouter from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoute.js";

const app = express();

// ================== SAFE STARTUP ==================
let isConnected = false;

const startServer = async () => {
  if (isConnected) return;

  try {
    await connectDB();
    await connectCloudinary();
    isConnected = true;
    console.log("✅ Services connected");
  } catch (err) {
    console.error("❌ Startup crash:", err.message);
  }
};

startServer();

// ================== MIDDLEWARE ==================
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  })
);

// ================== ROUTES ==================
app.use("/api/user", userRouter);
app.use("/api/product", productRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);

// ================== HEALTH CHECK ==================
app.get("/", (req, res) => {
  res.status(200).send("API working");
});

// ================== EXPORT ==================
export default app;
