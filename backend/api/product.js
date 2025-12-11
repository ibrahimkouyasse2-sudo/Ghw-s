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
  } catch (err) {
    console.error('product handler db connect error', err && err.message ? err.message : err);
    res.setHeader('Content-Type', 'application/json');
    return res.status(200).end(JSON.stringify({ success: true, products: [], dbAvailable: false, message: 'DB unavailable' }));
  }

  try {
    const products = await productModel.find().limit(100).lean();
    res.setHeader('Content-Type', 'application/json');
    return res.status(200).end(JSON.stringify({ success: true, products, dbAvailable: true }));
  } catch (err) {
    console.error('product handler query error', err);
    res.setHeader('Content-Type', 'application/json');
    return res.status(200).end(JSON.stringify({ success: true, products: [], dbAvailable: false, message: 'DB query failed' }));
  }
}
