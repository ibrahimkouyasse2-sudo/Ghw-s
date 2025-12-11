import validator from "validator";
import bcrypt from "bcrypt";
import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";

const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET);
};

// route for user register
const registerUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const existUser = await userModel.findOne({ email });
    if (existUser) {
      return res.json({ success: false, message: "User already Registered" });
    }
    if (!validator.isEmail(email)) {
      return res.json({ success: false, message: "Please enter a valid email" });
    }
    if (password.length < 8) {
      return res.json({ success: false, message: "Password must be 8char+ " });
    }
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);
    const newUser = await userModel.create({ name, email, password: hashPassword });
    const user = await newUser.save();
    const token = createToken(user._id);
    res.json({ success: true, token });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// route for user login
const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.json({ success: false, message: "User does not exist" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
      const token = createToken(user._id);
      res.json({ success: true, token });
    } else {
      res.json({ success: false, message: "Invalid Credentials" });
    }
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

//// route for admin login
const adminLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
      const token = jwt.sign(email + password, process.env.JWT_SECRET);
      res.json({ success: true, token });
    } else {
      res.json({ success: false, message: "invalid Credentials" });
    }
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export { registerUser, loginUser, adminLogin };
const connectDB = require('../config/mongodb');
const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.register = async function (req, res) {
  try {
    await connectDB();
    const { name, email, password } = req.body;
    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ success: false, message: 'Email exists' });
    const hashed = await bcrypt.hash(password, 10);
    const user = new User({ name, email, password: hashed });
    await user.save();
    return res.status(201).json({ success: true, user: { id: user._id, email: user.email, name: user.name } });
  } catch (err) {
    console.error('register error', err);
    return res.status(500).json({ success: false, error: String(err) });
  }
};

exports.login = async function (req, res) {
  try {
    await connectDB();
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ success: false, message: 'Invalid' });
    const ok = await bcrypt.compare(password, user.password);
    if (!ok) return res.status(400).json({ success: false, message: 'Invalid' });
    const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET || 'secret', { expiresIn: '7d' });
    return res.json({ success: true, token });
  } catch (err) {
    console.error('login error', err);
    return res.status(500).json({ success: false, error: String(err) });
  }
};

exports.list = async function (req, res) {
  try {
    await connectDB();
    const users = await User.find().limit(100).lean();
    return res.json({ success: true, users });
  } catch (err) {
    console.error('users list error', err);
    return res.status(500).json({ success: false, error: String(err) });
  }
};
