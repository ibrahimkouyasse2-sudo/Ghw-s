import express from "express";
import { loginUser, registerUser } from "../controllers/userController.js";

const userRouter = express.Router();

// user + admin use SAME login
userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);

// test
userRouter.get("/", (req, res) => {
  res.json({ success: true, message: "User API is working" });
});

export default userRouter;
