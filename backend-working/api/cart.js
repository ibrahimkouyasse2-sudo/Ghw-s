import connectDB from '../config/mongodb.js';
import { addToCart, updateCart, getUserCart } from '../controllers/cartController.js';

export default async function handler(req, res) {
  await connectDB().catch(() => {});

  const url = req.url || '';
  const path = url.split('?')[0];
  const segments = path.replace(/^\//, '').split('/').filter(Boolean);
  const action = segments[1] || segments[0] || '';

  try {
    if (req.method === 'POST' && action === 'add') return addToCart(req, res);
    if (req.method === 'POST' && action === 'update') return updateCart(req, res);
    if (req.method === 'POST' && action === 'get') return getUserCart(req, res);

    res.status(405).json({ success: false, message: 'Method Not Allowed' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: err.message });
  }
}
