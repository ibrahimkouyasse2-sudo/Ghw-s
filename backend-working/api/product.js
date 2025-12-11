import connectDB from '../config/mongodb.js';
import { addProduct, listProducts, removeProduct, singleProduct } from '../controllers/productController.js';

export default async function handler(req, res) {
  await connectDB().catch(() => {});

  const url = req.url || '';
  const path = url.split('?')[0];

  // Normalize paths: /product, /product/, /product/list, /list
  const segments = path.replace(/^\//, '').split('/').filter(Boolean);
  const action = segments[1] || segments[0] || '';

  try {
    if ((req.method === 'GET' && (action === '' || action === 'list')) || (req.method === 'GET' && path === '/')) {
      return listProducts(req, res);
    }

    if (req.method === 'POST' && action === 'add') {
      return addProduct(req, res);
    }

    if (req.method === 'POST' && action === 'remove') {
      return removeProduct(req, res);
    }

    if (req.method === 'POST' && action === 'single') {
      return singleProduct(req, res);
    }

    // fallback: if POST to root, treat as single
    if (req.method === 'POST' && (action === '' || action === undefined)) {
      return singleProduct(req, res);
    }

    res.status(405).json({ success: false, message: 'Method Not Allowed' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: err.message });
  }
}
