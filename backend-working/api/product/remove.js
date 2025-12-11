import connectDB from "../../config/mongodb.js";
import { removeProduct } from "../../controllers/productController.js";

export default async function handler(req, res) {
  await connectDB().catch(() => {});
  if (req.method === "POST") return removeProduct(req, res);
  res.status(405).json({ success: false, message: "Method Not Allowed" });
}
