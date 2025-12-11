import connectDB from "../config/mongodb.js";

export default async function handler(req, res) {
  try {
    await connectDB();
    res.status(200).json({ ok: true, dbAvailable: true });
  } catch (err) {
    res.status(200).json({ ok: true, dbAvailable: false, error: err.message });
  }
}
