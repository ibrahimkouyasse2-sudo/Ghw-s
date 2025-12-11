import productModel from './models/productModel.js';
import connectDB from './config/mongodb.js';

export default async function handler(req, res) {
  try {
    await connectDB();
  } catch (err) {
    console.error('product_list db connect error', err && err.message ? err.message : err);
    res.setHeader('Content-Type', 'application/json');
    return res.status(200).json({ success: true, products: [], dbAvailable: false, message: 'DB unavailable' });
  }

  try {
    const products = await productModel.find().limit(100).lean();
    res.setHeader('Content-Type', 'application/json');
    return res.status(200).json({ success: true, products, dbAvailable: true });
  } catch (err) {
    console.error('product_list query error', err);
    res.setHeader('Content-Type', 'application/json');
    return res.status(200).json({ success: true, products: [], dbAvailable: false, message: 'DB query failed' });
  }
}
