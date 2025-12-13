import React, { useState } from "react";
import { assets } from "../assets/assets";
import adminAxios from "../utils/adminAxios"; // ✅ IMPORTANT
import { toast } from "react-toastify";

const Add = () => {
  const [image1, setImage1] = useState(null);
  const [image2, setImage2] = useState(null);
  const [image3, setImage3] = useState(null);
  const [image4, setImage4] = useState(null);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("Computers");
  const [subCategory, setSubcategory] = useState("Gaming PC");
  const [bestseller, setBestseller] = useState(false);
  const [sizes, setSizes] = useState([]);

  const onSubmitHandler = async (e) => {
    e.preventDefault();

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

      // ✅ ADMIN AUTHORIZED REQUEST
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
        setCategory("Computers");
        setSubcategory("Gaming PC");
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
        <div className="w-full">
          <p className="mb-2 font-medium text-sm">Product Name</p>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full max-w-[500px] px-3 py-2"
            required
          />
        </div>

        {/* Description */}
        <div className="w-full">
          <p className="mb-2 font-medium text-sm">Product Description</p>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full max-w-[500px] px-3 py-2"
            required
          />
        </div>

        {/* Category */}
        <div className="flex gap-4">
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option>Computers</option>
            <option>Components</option>
            <option>Peripherals</option>
            <option>Chairs</option>
          </select>

          <select
            value={subCategory}
            onChange={(e) => setSubcategory(e.target.value)}
          >
            <option>Gaming PC</option>
            <option>GPU</option>
            <option>CPU</option>
            <option>Monitor</option>
            <option>Keyboard</option>
            <option>Mouse</option>
          </select>
        </div>

        {/* Price */}
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          placeholder="Price in DH"
          required
        />

        {/* Bestseller */}
        <div className="flex gap-2">
          <input
            type="checkbox"
            checked={bestseller}
            onChange={() => setBestseller(!bestseller)}
          />
          <label>Add to bestseller</label>
        </div>

        <button className="bg-black text-white px-4 py-2 rounded">
          Add Product
        </button>
      </form>
    </main>
  );
};

export default Add;
