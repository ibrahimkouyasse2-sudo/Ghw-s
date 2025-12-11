import connectDB from "../../config/mongodb.js";
import { singleProduct } from "../../controllers/productController.js";

export default async function handler(req, res) {
  await connectDB().catch(() => {});
  if (req.method === "POST") return singleProduct(req, res);
  res.status(405).json({ success: false, message: "Method Not Allowed" });
}
