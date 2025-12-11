import connectDB from '../config/mongodb.js';
import userModel from '../models/userModel.js';

export default async function handler(req, res) {
  try {
    await connectDB();
    const count = await userModel.countDocuments();
    return res.status(200).json({ ok: true, users: count });
  } catch (err) {
    console.error('user_status error', err);
    return res.status(500).json({ ok: false, error: String(err) });
  }
}
