import connectDB from './config/mongodb.js';
import productModel from './models/productModel.js';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    res.statusCode = 405;
    res.setHeader('Content-Type', 'application/json');
    return res.end(JSON.stringify({ ok: false, message: 'Method Not Allowed' }));
  }

  try {
    await connectDB();
    const products = await productModel.find().limit(100).lean();
    res.setHeader('Content-Type', 'application/json');
    return res.status(200).end(JSON.stringify({ success: true, products }));
  } catch (err) {
    console.error('product handler error', err);
    res.setHeader('Content-Type', 'application/json');
    return res.status(500).end(JSON.stringify({ success: false, error: String(err) }));
  }
}
