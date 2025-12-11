import mongoose from 'mongoose'

const orderSchema = new mongoose.Schema({
  userId: { type: String, required: false },
  items: { type: Array, required: true },
  address: { type: Object, required: false },
  amount: { type: Number, required: true },
  status: { type: String, required: true, default: "Order Placed" },
  paymentMethod: { type: String, required: true },
  payment: { type: Boolean, required: true, default: false },
  date: { type: Number, required: true },
});

const orderModel = mongoose.models.order || mongoose.model('order', orderSchema);

export default orderModel;
const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  items: [{ product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' }, qty: Number }],
  total: Number,
  status: { type: String, default: 'pending' },
  date: { type: Number, default: Date.now }
});

const Order = mongoose.models.Order || mongoose.model('Order', orderSchema);
module.exports = Order;
