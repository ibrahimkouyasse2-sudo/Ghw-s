import cloudinary from "../config/cloudinary.js";
import productModel from "../models/productModel.js";
import { Readable } from 'stream';

// add product
const addProduct = async (req, res, next) => {
  try {
    const { name, description, price, category, subCategory, sizes, bestseller } = req.body;

    // collect uploaded files (multer memory) if present
    const image1 = req.files && req.files.image1 && req.files.image1[0];
    const image2 = req.files && req.files.image2 && req.files.image2[0];
    const image3 = req.files && req.files.image3 && req.files.image3[0];
    const image4 = req.files && req.files.image4 && req.files.image4[0];
    const fileImages = [image1, image2, image3, image4].filter((img) => img !== undefined);

    // support base64 payloads: single `imageBase64` or array `imagesBase64` or `images`
    let base64Images = [];
    if (req.body) {
      if (req.body.imageBase64) base64Images.push(req.body.imageBase64);
      if (req.body.imagesBase64 && Array.isArray(req.body.imagesBase64)) base64Images = base64Images.concat(req.body.imagesBase64);
      if (req.body.images && Array.isArray(req.body.images)) base64Images = base64Images.concat(req.body.images);
    }

    // normalize into items similar to multer buffers: { buffer }
    const base64ToBuffer = (b64) => {
      if (!b64) return null;
      // strip data uri prefix
      const match = b64.match(/^data:([\w/+.-]+);base64,(.*)$/);
      const payload = match ? match[2] : b64;
      const buffer = Buffer.from(payload, 'base64');
      return { buffer };
    };

    const images = fileImages.concat(base64Images.map(base64ToBuffer).filter(Boolean));

    const streamUpload = (buffer) => new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream({ resource_type: 'image' }, (error, result) => {
        if (error) return reject(error);
        resolve(result);
      });
      const read = new Readable();
      read._read = () => {}; // noop
      read.push(buffer);
      read.push(null);
      read.pipe(uploadStream);
    });

    let imagesURL = await Promise.all(
      images.map(async (img) => {
        if (img.buffer) {
          const result = await streamUpload(img.buffer);
          return result.secure_url;
        }
        // fallback to path if exists (for local testing)
        if (img.path) {
          const result = await cloudinary.uploader.upload(img.path, { resource_type: 'image' });
          return result.secure_url;
        }
        return null;
      })
    );

    imagesURL = imagesURL.filter(Boolean);

    const productData = {
      name,
      description,
      price: Number(price),
      category,
      subCategory,
      sizes: JSON.parse(sizes),
      bestseller: bestseller === "true" ? true : false,
      image: imagesURL,
      date: Date.now(),
    };
    const product = new productModel(productData);
    await product.save();

    res.json({ success: true, message: "Product added" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// list all product
const listProducts = async (req, res, next) => {
  try {
    const products = await productModel.find({});
    res.json({ success: true, products });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// remove product
const removeProduct = async (req, res, next) => {
  try {
    await productModel.findOneAndDelete(req.body.id);
    res.json({ success: true, message: "Product Deleted" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// get single product
const singleProduct = async (req, res, next) => {
  try {
    const { productId } = req.body;
    const product = await productModel.findById(productId);
    res.json({ success: true, product });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export { addProduct, listProducts, removeProduct, singleProduct };
