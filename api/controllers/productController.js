import { v2 as cloudinary } from "cloudinary";
import productModel from "../models/productModel.js";
import mongoose from "mongoose";

/* ======================
   ADD PRODUCT
====================== */
const addProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      category,
      subCategory,
      sizes,
      bestseller,
    } = req.body;

    const images = [
      req.files?.image1?.[0],
      req.files?.image2?.[0],
      req.files?.image3?.[0],
      req.files?.image4?.[0],
    ].filter(Boolean);

    const imagesURL = await Promise.all(
      images.map(async (img) => {
        const result = await cloudinary.uploader.upload(img.path, {
          resource_type: "image",
        });
        return result.secure_url;
      })
    );

    const product = new productModel({
      name,
      description,
      price: Number(price),
      category,
      subCategory,
      sizes: sizes ? JSON.parse(sizes) : [],
      bestseller: bestseller === "true",
      image: imagesURL,
      date: Date.now(),
    });

    await product.save();

    res.json({ success: true, message: "Product added" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

/* ======================
   LIST PRODUCTS
====================== */
const listProducts = async (req, res) => {
  try {
    const products = await productModel.find({});
    res.json({ success: true, products });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

/* ======================
   DELETE PRODUCT (FIXED 🔥)
====================== */
const removeProduct = async (req, res) => {
  try {
    const { id } = req.params;

    // ✅ Validate ID
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid product ID",
      });
    }

    const product = await productModel.findById(id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    // 🔥 OPTIONAL: delete images from Cloudinary
    // (skip if you don’t store public_id)
    // for (const img of product.image) {
    //   const publicId = img.split("/").pop().split(".")[0];
    //   await cloudinary.uploader.destroy(publicId);
    // }

    await productModel.findByIdAndDelete(id);

    res.json({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (error) {
    console.error("Delete error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

/* ======================
   SINGLE PRODUCT
====================== */
const singleProduct = async (req, res) => {
  try {
    const { productId } = req.body;

    const product = await productModel.findById(productId);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.json({ success: true, product });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export {
  addProduct,
  listProducts,
  removeProduct,
  singleProduct,
};
