import connectDB from "../../config/mongodb.js";

export default async function handler(req, res) {
  await connectDB().catch(() => {});
  if (req.method === "GET") return res.json({ success: true, message: "User API is working" });
  res.status(405).json({ success: false, message: "Method Not Allowed" });
}
