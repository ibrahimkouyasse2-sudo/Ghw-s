import React, { useState } from "react";
import { assets } from "../assets/assets";
import adminAxios from "../utils/adminAxios";
import { toast } from "react-toastify";

/* =========================
   CATEGORY → SUBCATEGORY MAP
========================= */
const CATEGORY_SUBCATEGORIES = {
  "Gaming PC": [
    "PC Gamer Standard",
    "PC Gamer Avancé",
    "PC Gamer Ultra",
    "POWERED BY MSI",
  ],

  "PC Portable": [
    "PC Portables Gamer",
    "PC Portables Multimédia",
    "Zone Apple",
  ],

  Components: [
    "Processeurs",
    "Cartes mères",
    "Refroidissement",
    "Cartes graphiques",
    "Mémoire vive PC",
    "Disques durs et SSD",
    "Alimentations PC",
    "Boitiers PC",
  ],

  Peripherals: [
    "Moniteurs",
    "Câbles",
    "Claviers",
    "Souris",
    "Kits claviers/souris",
    "Casques",
  ],

  Chairs: [
    "Chaise gamer",
    "Chaise ergonomique",
  ],
};

const Add = () => {
  /* =========================
     STATE
  ========================= */
  const [image1, setImage1] = useState(null);
  const [image2, setImage2] = useState(null);
  const [image3, setImage3] = useState(null);
  const [image4, setImage4] = useState(null);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");

  const [category, setCategory] = useState("Gaming PC");
  const [subCategory, setSubcategory] = useState("");

  const [bestseller, setBestseller] = useState(false);
  const [sizes, setSizes] = useState([]);

  /* =========================
     SUBMIT
  ========================= */
  const onSubmitHandler = async (e) => {
    e.preventDefault();

    if (!subCategory) {
      toast.error("Please select a sub category");
      return;
    }

    try {
      const formData = new FormData();

      if (image1) formData.append("image1", image1);
      if (image2) formData.append("image2", image2);
      if (image3) formData.append("image3", image3);
      if (image4) formData.append("image4", image4);

      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("category", category);
      formData.append("subCategory", subCategory);
      formData.append("bestseller", bestseller);
      formData.append("sizes", JSON.stringify(sizes));

      const response = await adminAxios.post(
        "/api/product/add",
        formData
      );

      if (response.data.success) {
        toast.success("Product added successfully");

        // reset form
        setName("");
        setDescription("");
        setPrice("");
        setCategory("Gaming PC");
        setSubcategory("");
        setBestseller(false);
        setSizes([]);
        setImage1(null);
        setImage2(null);
        setImage3(null);
        setImage4(null);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(
        error.response?.data?.message || "Failed to add product"
      );
    }
  };

  /* =========================
     JSX
  ========================= */
  return (
    <main>
      <form
        onSubmit={onSubmitHandler}
        className="flex flex-col w-full items-start gap-3"
      >
        {/* Upload Images */}
        <div>
          <p className="mb-2 font-medium text-sm">Upload Images</p>
          <div className="flex gap-2">
            {[image1, image2, image3, image4].map((img, i) => (
              <label key={i} htmlFor={`image${i + 1}`}>
                <img
                  className="w-20"
                  src={!img ? assets.upload_area : URL.createObjectURL(img)}
                  alt="upload"
                />
                <input
                  id={`image${i + 1}`}
                  type="file"
                  hidden
                  onChange={(e) =>
                    [setImage1, setImage2, setImage3, setImage4][i](
                      e.target.files[0]
                    )
                  }
                />
              </label>
            ))}
          </div>
        </div>

        {/* Name */}
        <input
          className="w-full max-w-[500px] px-3 py-2"
          placeholder="Product Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        {/* Description */}
        <textarea
          className="w-full max-w-[500px] px-3 py-2"
          placeholder="Product Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />

        {/* Category + Subcategory */}
        <div className="flex gap-4">
          <select
            value={category}
            onChange={(e) => {
              setCategory(e.target.value);
              setSubcategory(""); // ✅ reset subcategory
            }}
          >
            <option value="Gaming PC">Gaming PC</option>
            <option value="PC Portable">PC Portable</option>
            <option value="Components">Components</option>
            <option value="Peripherals">Peripherals</option>
            <option value="Chairs">Chairs</option>
          </select>

          <select
            value={subCategory}
            onChange={(e) => setSubcategory(e.target.value)}
            required
          >
            <option value="">Select Sub Category</option>
            {CATEGORY_SUBCATEGORIES[category]?.map((sub) => (
              <option key={sub} value={sub}>
                {sub}
              </option>
            ))}
          </select>
        </div>

        {/* Price */}
        <input
          type="number"
          min="1"
          className="px-3 py-2"
          placeholder="Price in DH"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />

        {/* Bestseller */}
        <label className="flex gap-2 items-center">
          <input
            type="checkbox"
            checked={bestseller}
            onChange={() => setBestseller(!bestseller)}
          />
          Add to bestseller
        </label>

        <button className="bg-black text-white px-4 py-2 rounded">
          Add Product
        </button>
      </form>
    </main>
  );
};

export default Add;
