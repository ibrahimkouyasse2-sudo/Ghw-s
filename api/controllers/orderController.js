import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";

const currency = "inr";
const delivery_charge = 49;

// Stripe removed — using COD / guest orders only


//order using COD
const placeOrder = async (req, res, next) => {
  try {
    let { userId, address, amount, items } = req.body;

    // If userId not provided in body but token exists, try to decode it
    if (!userId && req.headers && req.headers.token) {
      try {
        const decoded = jwt.verify(req.headers.token, process.env.JWT_SECRET);
        userId = decoded.id;
      } catch (err) {
        // ignore token decode errors for guest checkout
      }
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

    // If the order is placed by a logged-in user, clear their cart
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

// Stripe removed — guest and COD orders handled in `placeOrder`.


//place order using razorpay
const placeOrderRazorpay = async (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
};

//All orders for admin panel
const allOrders = async (req, res, next) => {
  try {
    const orders = await orderModel.find({});
    res.json({success:true,orders})
  } catch (error) {
    console.log(error);
    res.json({success:false,message: error.message})
  }
};
//user order data for frontend
const userOrders = async (req, res, next) => {
  try {
    const { userId } = req.body;
    const orders = await orderModel.find({ userId });
    res.json({success:true,orders})
  } catch (error) {
    console.log(error);
    res.json({success:false,message: error.message})
    
  }
};


//update order status from admin panel
const updateStatus = async (req, res, next) => {
  try {
    const { orderId, status } = req.body;

    await orderModel.findByIdAndUpdate(orderId, { status });
    res.json({success:true,message:"Status updated"})
  } catch (error) {
    console.log(error);
    res.json({success:false,message: error.message})
  }
};


// Stripe verification removed

export {
  placeOrder,
  placeOrderRazorpay,
  allOrders,
  userOrders,
  updateStatus,
};
