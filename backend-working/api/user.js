import connectDB from '../config/mongodb.js';
import { registerUser, loginUser, adminLogin } from '../controllers/userController.js';

export default async function handler(req, res) {
  await connectDB().catch(() => {});

  const url = req.url || '';
  const path = url.split('?')[0];
  const segments = path.replace(/^\//, '').split('/').filter(Boolean);
  const action = segments[1] || segments[0] || '';

  try {
    if (req.method === 'POST' && action === 'register') return registerUser(req, res);
    if (req.method === 'POST' && action === 'login') return loginUser(req, res);
    if (req.method === 'POST' && action === 'admin') return adminLogin(req, res);
    if (req.method === 'GET' && (action === '' || action === undefined)) return res.json({ success: true, message: 'User API is working' });

    res.status(405).json({ success: false, message: 'Method Not Allowed' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: err.message });
  }
}
