import express from "express";
import {
  addProduct,
  listProducts,
  removeProduct,
  singleProduct,
} from "../controllers/productController.js";
import upload from "../middleware/multer.js";
import adminAuth from "../middleware/adminAuth.js";

const productRouter = express.Router();

/* =========================
   ADMIN ROUTES
========================= */

// ADD PRODUCT
productRouter.post(
  "/add",
  adminAuth,
  upload.fields([
    { name: "image1", maxCount: 1 },
    { name: "image2", maxCount: 1 },
    { name: "image3", maxCount: 1 },
    { name: "image4", maxCount: 1 },
  ]),
  addProduct
);

// 🔥 DELETE PRODUCT (CORRECT)
productRouter.delete(
  "/delete/:id",
  adminAuth,
  removeProduct
);

/* =========================
   PUBLIC ROUTES
========================= */

productRouter.get("/list", listProducts);
productRouter.post("/single", singleProduct);
productRouter.get("/", listProducts);

export default productRouter;
