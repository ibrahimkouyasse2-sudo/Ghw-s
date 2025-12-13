import axios from "axios";
import React, { useEffect, useState } from "react";
import { backendUrl, currency } from "../App";
import { toast } from "react-toastify";

const List = ({ token }) => {
  const [list, setList] = useState([]);

  /* ======================
     FETCH PRODUCTS
  ====================== */
  const fetchList = async () => {
    try {
      const response = await axios.get(
        `${backendUrl}/api/product/list`
      );

      if (response.data.success) {
        setList(response.data.products);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch products");
    }
  };

  /* ======================
     DELETE PRODUCT (FIXED)
  ====================== */
 const removeProduct = async (productId, productName) => {
  const confirmDelete = window.confirm(
    `Are you sure you want to delete:\n\n"${productName}" ?`
  );

  if (!confirmDelete) return;

  try {
    const response = await axios.delete(
      `${backendUrl}/api/product/delete/${productId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.data.success) {
      toast.success(`"${productName}" deleted`);
      setList((prev) => prev.filter((p) => p._id !== productId));
    } else {
      toast.error(response.data.message);
    }
  } catch (error) {
    console.error(error);
    toast.error(
      error.response?.data?.message || "Delete failed"
    );
  }
};


  useEffect(() => {
    fetchList();
  }, []);

  return (
    <main className="flex flex-col gap-2">
      <p className="mb-2 font-semibold">All Products List</p>

      {/* Header */}
      <div className="hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] py-2 px-4 font-bold border-b">
        <p>Image</p>
        <p>Name</p>
        <p>Category</p>
        <p>Price</p>
        <p className="text-center">Action</p>
      </div>

      {/* Products */}
      {list.map((item) => (
        <div
          key={item._id}
          className="md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] py-2 px-4 border-b text-sm"
        >
          <img
            src={item.image[0]}
            alt={item.name}
            className="w-12 h-12 object-cover"
          />
          <p>{item.name}</p>
          <p>{item.category}</p>
          <p>{currency}{item.price}</p>
          <p
            className="text-center cursor-pointer text-red-500 text-lg"
            onClick={() => removeProduct(item._id)}
          >
            ✖
          </p>
        </div>
      ))}
    </main>
  );
};

export default List;
