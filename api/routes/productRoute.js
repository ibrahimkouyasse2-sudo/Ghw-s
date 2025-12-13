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

// ✅ ADD PRODUCT (ADMIN)
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

// ✅ DELETE PRODUCT (ADMIN)  ← FIXED
productRouter.delete(
  "/delete/:id",
  adminAuth,
  removeProduct
);

/* =========================
   PUBLIC ROUTES
========================= */

// Get all products
productRouter.get("/list", listProducts);

// Get single product
productRouter.post("/single", singleProduct);

// Root fallback
productRouter.get("/", listProducts);

/* =========================
   ❌ OLD ROUTE (REMOVE OR KEEP COMMENTED)
========================= */
// productRouter.post("/remove", adminAuth, removeProduct);

export default productRouter;
