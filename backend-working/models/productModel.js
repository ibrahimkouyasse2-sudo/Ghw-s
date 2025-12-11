import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: Array, required: true },
  category: { type: String, required: true },
  subCategory: { type: String, required: true },
  sizes: { type: Array, required: true },
  bestseller: { type: Boolean, required: true },
  date: { type: Number, required: true },
});

const productModel = mongoose.models.product || mongoose.model("product", productSchema);

export default productModel;
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true },
  images: { type: [String], default: [] },
  category: { type: String },
  date: { type: Number, default: Date.now }
});

const Product = mongoose.models.Product || mongoose.model('Product', productSchema);
module.exports = Product;
