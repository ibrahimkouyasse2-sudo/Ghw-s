import express from "express";
import{loginUser,registerUser,adminLogin} from "../controllers/userController.js";

const userRouter = express.Router();

userRouter.post("/register",registerUser);
userRouter.post("/login",loginUser);
userRouter.post("/admin",adminLogin);

// Root GET - return a simple status or user list endpoint at /api/user
userRouter.get("/", (req, res) => {
	res.json({ success: true, message: "User API is working" });
});

export default userRouter;
