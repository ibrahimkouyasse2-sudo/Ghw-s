import mongoose from 'mongoose';
import productModel from '../models/productModel.js';
import connectDB from '../config/mongodb.js';

export default async function handler(req, res) {
  try {
    await connectDB();
    const products = await productModel.find().limit(100).lean();
    res.setHeader('Content-Type', 'application/json');
    return res.status(200).json({ success: true, products });
  } catch (err) {
    console.error('product_list error', err);
    return res.status(500).json({ success: false, error: String(err) });
  }
}
