import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";

const placeOrder = async (req, res, next) => {
  try {
    let { userId, address, amount, items } = req.body;
    if (!userId && req.headers && req.headers.token) {
      try {
        const decoded = jwt.verify(req.headers.token, process.env.JWT_SECRET);
        userId = decoded.id;
      } catch (err) {}
    }
    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.json({ success: false, message: "No items in order" });
    }
    const orderData = {
      items,
      address,
      amount,
      userId: userId || null,
      paymentMethod: "COD",
      payment: false,
      date: Date.now(),
    };
    const newOrder = new orderModel(orderData);
    await newOrder.save();
    if (userId) {
      try {
        await userModel.findByIdAndUpdate(userId, { cartData: {} });
      } catch (err) {
        console.log("Failed clearing user cart:", err.message);
      }
    }
    res.json({ success: true, message: "Order Placed", orderId: newOrder._id });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

const placeOrderRazorpay = async (req, res, next) => {
  try {} catch (error) {
    next(error);
  }
};

const allOrders = async (req, res, next) => {
  try {
    const orders = await orderModel.find({});
    res.json({ success: true, orders });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

const userOrders = async (req, res, next) => {
  try {
    const { userId } = req.body;
    const orders = await orderModel.find({ userId });
    res.json({ success: true, orders });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

const updateStatus = async (req, res, next) => {
  try {
    const { orderId, status } = req.body;
    await orderModel.findByIdAndUpdate(orderId, { status });
    res.json({ success: true, message: "Status updated" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export { placeOrder, placeOrderRazorpay, allOrders, userOrders, updateStatus };
const connectDB = require('../config/mongodb');
const Order = require('../models/orderModel');

exports.create = async function (req, res) {
  try {
    await connectDB();
    const { user, items, total } = req.body;
    const order = new Order({ user, items, total });
    await order.save();
    return res.status(201).json({ success: true, order });
  } catch (err) {
    console.error('order create error', err);
    return res.status(500).json({ success: false, error: String(err) });
  }
};

exports.list = async function (req, res) {
  try {
    await connectDB();
    const orders = await Order.find().limit(100).lean();
    return res.json({ success: true, orders });
  } catch (err) {
    console.error('order list error', err);
    return res.status(500).json({ success: false, error: String(err) });
  }
};
