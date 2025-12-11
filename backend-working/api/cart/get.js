import connectDB from "../../config/mongodb.js";
import { getUserCart } from "../../controllers/cartController.js";

export default async function handler(req, res) {
  await connectDB().catch(() => {});
  if (req.method === "POST") return getUserCart(req, res);
  res.status(405).json({ success: false, message: "Method Not Allowed" });
}
