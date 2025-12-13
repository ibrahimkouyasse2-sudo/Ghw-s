import React, { useContext, useEffect, useState } from "react";
import Title from "../components/Title";
import CartTotal from "../components/CartTotal";
import { ShopContext } from "../context/ShopContext";
import axios from "axios";
import toast from "react-hot-toast";

const PlaceOrder = () => {
  const {
    navigate,
    backendUrl,
    token,
    cartItems,
    setCartItems,
    getCartAmount,
    delivery_fee,
    products,
  } = useContext(ShopContext);

  useEffect(() => {
    if (!token) navigate("/login");
  }, [token, navigate]);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
  });

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    // 🔐 JS validation (backup)
    for (const key in formData) {
      if (!formData[key]) {
        toast.error("Please fill all required fields");
        return;
      }
    }

    let orderItems = [];

    for (const itemId in cartItems) {
      if (cartItems[itemId] > 0) {
        const product = products.find((p) => p._id === itemId);
        if (product) {
          orderItems.push({ ...product, quantity: cartItems[itemId] });
        }
      }
    }

    if (orderItems.length === 0) {
      toast.error("Your cart is empty");
      return;
    }

    const orderData = {
      items: orderItems,
      address: formData,
      amount: getCartAmount() + delivery_fee,
    };

    try {
      const res = await axios.post(
        backendUrl + "/api/order/place",
        orderData,
        { headers: { token } }
      );

      if (res.data.success) {
        setCartItems({});
        toast.success("Order placed successfully");
        navigate("/orders");
      } else {
        toast.error(res.data.message || "Order failed");
      }
    } catch (err) {
      toast.error(err?.response?.data?.message || "Order failed");
    }
  };

  return (
    <form
      onSubmit={onSubmitHandler}
      className="flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t"
    >
      {/* LEFT */}
      <div className="flex flex-col gap-4 w-full sm:max-w-[480px]">
        <Title text1="DELIVERY" text2="INFORMATION" />

        <div className="flex gap-3">
          <input required name="firstName" value={formData.firstName} onChange={onChangeHandler} placeholder="First name" />
          <input required name="lastName" value={formData.lastName} onChange={onChangeHandler} placeholder="Last name" />
        </div>

        <input required type="email" name="email" value={formData.email} onChange={onChangeHandler} placeholder="Email" />
        <input required name="street" value={formData.street} onChange={onChangeHandler} placeholder="Street" />

        <div className="flex gap-3">
          <input required name="city" value={formData.city} onChange={onChangeHandler} placeholder="City" />
          <input required name="state" value={formData.state} onChange={onChangeHandler} placeholder="State" />
        </div>

        <div className="flex gap-3">
          {/* ZIPCODE — numeric only */}
          <input
            required
            name="zipcode"
            value={formData.zipcode}
            inputMode="numeric"
            pattern="[0-9]*"
            placeholder="Zipcode"
            onChange={(e) =>
              setFormData({ ...formData, zipcode: e.target.value.replace(/\D/g, "") })
            }
          />

          <input required name="country" value={formData.country} onChange={onChangeHandler} placeholder="Country" />
        </div>

        {/* PHONE — numeric only */}
        <input
          required
          name="phone"
          value={formData.phone}
          inputMode="numeric"
          pattern="[0-9]*"
          placeholder="Phone"
          onChange={(e) =>
            setFormData({ ...formData, phone: e.target.value.replace(/\D/g, "") })
          }
        />
      </div>

      {/* RIGHT */}
      <div className="mt-8">
        <CartTotal />
        <button type="submit" className="bg-black text-white px-16 py-3 mt-8">
          PLACE ORDER
        </button>
      </div>
    </form>
  );
};

export default PlaceOrder;
