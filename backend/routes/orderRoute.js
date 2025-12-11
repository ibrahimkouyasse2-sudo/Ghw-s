
import express from "express";
import {
  allOrders,
  placeOrder,
  placeOrderRazorpay,
  updateStatus,
  userOrders,
} from "../controllers/orderController.js";
import authUser from "../middleware/Auth.js";
import adminAuth  from "../middleware/adminAuth.js"

const orderRouter = express.Router();
// admin feature
orderRouter.post("/list", adminAuth, allOrders);
orderRouter.post("/status", adminAuth, updateStatus);
// payment feature (allow guest checkout)
orderRouter.post("/place", authUser, placeOrder);
orderRouter.post("/razorpay", placeOrderRazorpay);

// user
orderRouter.post("/userorders", authUser, userOrders);

//verify payment
// stripe verification removed

export default orderRouter;
