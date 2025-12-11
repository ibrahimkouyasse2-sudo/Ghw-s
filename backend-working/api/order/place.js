import connectDB from "../../config/mongodb.js";
import { placeOrder } from "../../controllers/orderController.js";

export default async function handler(req, res) {
  await connectDB().catch(() => {});
  if (req.method === "POST") return placeOrder(req, res);
  res.status(405).json({ success: false, message: "Method Not Allowed" });
}
