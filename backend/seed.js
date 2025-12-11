import mongoose from "mongoose";
import "dotenv/config";
import connectDB from "./config/mongodb.js";
import productModel from "./models/productModel.js";

const seedProducts = async () => {
  try {
    await connectDB();

    // Clear existing products
    await productModel.deleteMany({});
    console.log("Cleared existing products");

    const products = [
      {
        name: "Gaming PC - RTX 4090",
        description: "High-performance gaming PC with RTX 4090, Intel i9-13900K, 64GB RAM, 2TB NVMe SSD",
        price: 45000,
        image: ["https://via.placeholder.com/300/0000ff/ffffff?text=Gaming+PC+RTX4090", "https://via.placeholder.com/300/0000ff/ffffff?text=Gaming+PC+RTX4090+Back"],
        category: "Computers",
        subCategory: "Gaming PC",
        sizes: ["Standard"],
        bestseller: true,
        date: Date.now(),
      },
      {
        name: "Gaming PC - RTX 4070",
        description: "Mid-high gaming PC with RTX 4070, Intel i7-13700K, 32GB RAM, 1TB NVMe SSD",
        price: 28000,
        image: ["https://via.placeholder.com/300/ff0000/ffffff?text=Gaming+PC+RTX4070", "https://via.placeholder.com/300/ff0000/ffffff?text=Gaming+PC+RTX4070+Back"],
        category: "Computers",
        subCategory: "Gaming PC",
        sizes: ["Standard"],
        bestseller: true,
        date: Date.now(),
      },
      {
        name: "NVIDIA RTX 4090 Graphics Card",
        description: "24GB GDDR6X VRAM, PCI-E 4.0, Perfect for gaming and AI workloads",
        price: 19999,
        image: ["https://via.placeholder.com/300/00ff00/000000?text=RTX+4090+GPU", "https://via.placeholder.com/300/00ff00/000000?text=RTX+4090+GPU+Back"],
        category: "Components",
        subCategory: "GPU",
        sizes: ["Dual Slot"],
        bestseller: true,
        date: Date.now(),
      },
      {
        name: "NVIDIA RTX 4070 Graphics Card",
        description: "12GB GDDR6 VRAM, PCI-E 4.0, Excellent for 1440p gaming",
        price: 8999,
        image: ["https://via.placeholder.com/300/ffff00/000000?text=RTX+4070+GPU", "https://via.placeholder.com/300/ffff00/000000?text=RTX+4070+GPU+Back"],
        category: "Components",
        subCategory: "GPU",
        sizes: ["Dual Slot"],
        bestseller: true,
        date: Date.now(),
      },
      {
        name: "Intel Core i9-13900K Processor",
        description: "24 cores, 32 threads, 5.8 GHz, Socket 1700, LGA1700",
        price: 5899,
        image: ["https://via.placeholder.com/300/ff00ff/ffffff?text=CPU+i9+13900K", "https://via.placeholder.com/300/ff00ff/ffffff?text=CPU+i9+13900K+Back"],
        category: "Components",
        subCategory: "CPU",
        sizes: ["Standard"],
        bestseller: true,
        date: Date.now(),
      },
      {
        name: "Intel Core i7-13700K Processor",
        description: "16 cores, 24 threads, 5.4 GHz, Socket 1700, LGA1700",
        price: 4199,
        image: ["https://via.placeholder.com/300/00ffff/000000?text=CPU+i7+13700K", "https://via.placeholder.com/300/00ffff/000000?text=CPU+i7+13700K+Back"],
        category: "Components",
        subCategory: "CPU",
        sizes: ["Standard"],
        bestseller: true,
        date: Date.now(),
      },
      {
        name: "ASUS ROG 27\" 4K Gaming Monitor",
        description: "27 inch 4K UHD (3840x2160), 144Hz, IPS panel, HDR, 1ms response time",
        price: 7999,
        image: ["https://via.placeholder.com/300/800080/ffffff?text=Monitor+27+4K", "https://via.placeholder.com/300/800080/ffffff?text=Monitor+27+4K+Back"],
        category: "Peripherals",
        subCategory: "Monitor",
        sizes: ["27 inch"],
        bestseller: true,
        date: Date.now(),
      },
      {
        name: "LG 34\" Ultra-Wide Gaming Monitor",
        description: "34 inch Ultra-wide (3440x1440), 144Hz, IPS panel, curved design",
        price: 6999,
        image: ["https://via.placeholder.com/300/008080/ffffff?text=Monitor+34+Ultra", "https://via.placeholder.com/300/008080/ffffff?text=Monitor+34+Ultra+Back"],
        category: "Peripherals",
        subCategory: "Monitor",
        sizes: ["34 inch"],
        bestseller: false,
        date: Date.now(),
      },
      {
        name: "Corsair K95 Platinum RGB Mechanical Keyboard",
        description: "Cherry MX Speed switches, RGB per-key lighting, USB passthrough, Aluminum frame",
        price: 2299,
        image: ["https://via.placeholder.com/300/404040/ffffff?text=Corsair+K95+Keyboard", "https://via.placeholder.com/300/404040/ffffff?text=Corsair+K95+Back"],
        category: "Peripherals",
        subCategory: "Keyboard",
        sizes: ["Full Size"],
        bestseller: true,
        date: Date.now(),
      },
      {
        name: "SteelSeries Apex Pro Mechanical Keyboard",
        description: "Adjustable mechanical switches, OLED display, RGB lighting, wired",
        price: 1999,
        image: ["https://via.placeholder.com/300/2c3e50/ffffff?text=SteelSeries+Apex+Pro", "https://via.placeholder.com/300/2c3e50/ffffff?text=SteelSeries+Apex+Back"],
        category: "Peripherals",
        subCategory: "Keyboard",
        sizes: ["Full Size"],
        bestseller: true,
        date: Date.now(),
      },
      {
        name: "Razer DeathAdder V3 Pro Gaming Mouse",
        description: "30000 DPI, 70M switch lifespan, Focus Pro sensor, Lightweight 59g",
        price: 699,
        image: ["https://via.placeholder.com/300/1a1a1a/00ff00?text=Razer+DeathAdder+V3", "https://via.placeholder.com/300/1a1a1a/00ff00?text=Razer+DeathAdder+Back"],
        category: "Peripherals",
        subCategory: "Mouse",
        sizes: ["Standard"],
        bestseller: true,
        date: Date.now(),
      },
      {
        name: "Logitech G Pro X2 Superlight Gaming Mouse",
        description: "25600 DPI, 80M click lifespan, IPX6 water resistance, 32g weight",
        price: 1499,
        image: ["https://via.placeholder.com/300/333333/ffff00?text=Logitech+G+Pro+X2", "https://via.placeholder.com/300/333333/ffff00?text=Logitech+G+Pro+Back"],
        category: "Peripherals",
        subCategory: "Mouse",
        sizes: ["Standard"],
        bestseller: true,
        date: Date.now(),
      },
    ];

    await productModel.insertMany(products);
    console.log(`✅ Successfully added ${products.length} products to the database!`);
    process.exit(0);
  } catch (error) {
    console.error("❌ Error seeding products:", error.message);
    process.exit(1);
  }
};

seedProducts();
