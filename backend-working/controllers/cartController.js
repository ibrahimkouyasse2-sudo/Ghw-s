import userModel from "../models/userModel.js";

const addToCart = async (req, res, next) => {
  try {
    const { userId, itemId } = req.body;
    let userData = await userModel.findById(userId);
    let cartData = await userData.cartData;
    if (cartData[itemId]) {
      cartData[itemId] += 1;
    } else {
      cartData[itemId] = 1;
    }
    await userModel.findByIdAndUpdate(userId, { cartData });
    res.json({ success: true, message: "Added to cart" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

const updateCart = async (req, res, next) => {
  try {
    const { userId, itemId, quantity } = req.body;
    const userData = await userModel.findById(userId);
    let cartData = await userData.cartData;
    cartData[itemId] = quantity;
    await userModel.findByIdAndUpdate(userId, { cartData });
    res.json({ success: true, message: "Cart Updated" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

const getUserCart = async (req, res, next) => {
  try {
    const { userId } = req.body;
    const userData = await userModel.findById(userId);
    let cartData = await userData.cartData;
    res.json({ success: true, cartData });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export { addToCart, updateCart, getUserCart };
const connectDB = require('../config/mongodb');
// Minimal cart controller - store items in orders or respond with stub

exports.get = async function (req, res) {
  // This project doesn't persist carts separately by default; return empty
  return res.json({ success: true, cart: { items: [] } });
};

exports.update = async function (req, res) {
  // Accept cart payload and echo back
  const { items } = req.body;
  return res.json({ success: true, cart: { items: items || [] } });
};
