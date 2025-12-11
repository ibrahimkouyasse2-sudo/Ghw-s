import connectDB from '../config/mongodb.js';
import { placeOrder, allOrders, userOrders, updateStatus } from '../controllers/orderController.js';

export default async function handler(req, res) {
  await connectDB().catch(() => {});

  const url = req.url || '';
  const path = url.split('?')[0];
  const segments = path.replace(/^\//, '').split('/').filter(Boolean);
  const action = segments[1] || segments[0] || '';

  try {
    if (req.method === 'POST' && action === 'place') return placeOrder(req, res);
    if (req.method === 'GET' && action === 'all') return allOrders(req, res);
    if (req.method === 'POST' && action === 'user') return userOrders(req, res);
    if (req.method === 'POST' && action === 'update') return updateStatus(req, res);

    res.status(405).json({ success: false, message: 'Method Not Allowed' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: err.message });
  }
}
