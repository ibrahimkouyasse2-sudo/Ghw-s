import React, { useContext, useState } from "react";
import Title from "../components/Title";
import CartTotal from "../components/CartTotal";
import { assets } from "../assets/assets";
import { ShopContext } from "../context/ShopContext";
import axios from "axios";
import toast from "react-hot-toast";

const PlaceOrder = () => {
  const { navigate, backendUrl, token, cartItems, setCartItems, getCartAmount, delivery_fee, products } = useContext(ShopContext);
  
  // Redirect to login if user is not authenticated
  React.useEffect(() => {
    if (!token) {
      navigate('/login');
    }
  }, [token]);
  const [method, setMethod] = useState("cod");
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
    if (!backendUrl) {
      toast.error("Backend URL not configured (VITE_BACKEND_URL).");
      return;
    }
    try {
      let orderItems = [];
      for (const itemId in cartItems) {
        if (cartItems[itemId] > 0) {
          const itemInfo = structuredClone(products.find((product) => product._id === itemId));
          if (itemInfo) {
            itemInfo.quantity = cartItems[itemId];
            orderItems.push(itemInfo);
          }
        }
      }
      
      if (orderItems.length === 0) {
        toast.error("Your cart is empty.");
        return;
      }

      let orderData = {
        items: orderItems,
        address: formData,
        amount: getCartAmount() + delivery_fee,
      };

      const headers = token ? { headers: { token } } : {};

      // Only COD (cash on delivery) supported
      console.log("Placing order", { orderData, headers });
      let res;
      try {
        res = await axios.post(backendUrl+ "/api/order/place", orderData, headers);
      } catch (err) {
        console.error("Order request failed", err);
        const serverMessage = err?.response?.data?.message || err.message || "Request failed";
        toast.error("Order failed: " + serverMessage);
        return;
      }

      if (res.data && res.data.success) {
        setCartItems({});
        toast.success("Order placed successfully.");
        if (token) navigate("/orders"); else navigate("/");
      } else {
        toast.error((res && res.data && res.data.message) || "Failed to place order");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  return (
    <form
      noValidate
      onSubmit={(e) => {
        e.preventDefault();
        onSubmitHandler(e);
      }}
      className='flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t'>
      {/* -------------Left side ---------- */}
      <div className='flex flex-col gap-4 w-full sm:max-w-[480px]'>
        <div className='text-xl sm:text-2xl my-3'>
          <Title text1={"DELIVERY"} text2={"INFORMATION"} />
        </div>
        <div className='flex gap-3'>
          <input
            onChange={onChangeHandler}
            name='firstName'
            value={formData.firstName}
            className='border border-gray-300 rounded py-1.5 px-3.5 w-full'
            type='text'
            placeholder='First name'
            required
          />
          <input
            onChange={onChangeHandler}
            name='lastName'
            value={formData.lastName}
            className='border border-gray-300 rounded py-1.5 px-3.5 w-full'
            type='text'
            placeholder='Last name'
            required
          />
        </div>
        <input
          onChange={onChangeHandler}
          name='email'
          value={formData.email}
          className='border border-gray-300 rounded py-1.5 px-3.5 w-full'
          type='email'
          placeholder='Your email'
          required
        />
          <input
            onChange={onChangeHandler}
            name='street'
            value={formData.street}
            className='border border-gray-300 rounded py-1.5 px-3.5 w-full'
            type='text'
            placeholder='Street'
            required
          />
        <div className='flex gap-3'>
          <input
            onChange={onChangeHandler}
            name='city'
            value={formData.city}
            className='border border-gray-300 rounded py-1.5 px-3.5 w-full'
            type='text'
            placeholder='City'
            required
          />
          <input
            onChange={onChangeHandler}
            name='state'
            value={formData.state}
            className='border border-gray-300 rounded py-1.5 px-3.5 w-full'
            type='text'
            placeholder='State'
            required
          />
        </div>
        <div className='flex gap-3'>
          <input
            onChange={onChangeHandler}
            name='zipcode'
            value={formData.zipcode}
            className='border border-gray-300 rounded py-1.5 px-3.5 w-full'
            type='number'
            placeholder='Zipcode'
            required
          />
          <input
            onChange={onChangeHandler}
            name='country'
            value={formData.country}
            className='border border-gray-300 rounded py-1.5 px-3.5 w-full'
            type='text'
            placeholder='Country'
            required
          />
        </div>

        <input
          onChange={onChangeHandler}
          name='phone'
          value={formData.phone}
          className='border border-gray-300 rounded py-1.5 px-3.5 w-full'
          type='number'
          placeholder='Phone'
          required
        />
      </div>

      {/* ------- place order right side------- */}

      <div className='mt-8'>
        <div className='mt-8 min-w-80'>
          <CartTotal />
        </div>

        <div className='mt-12'>
          <Title text1={"PAYMENT"} text2={"METHOD"} />
          <div className='flex flex-col gap-3 lg:flex-row'>
            <div
              className='flex items-center gap-3 border p-2 px-3'
            >
              <p className={`min-w-3.5 h-3.5 border rounded-full bg-green-700`}></p>
              <p className='text-gray-500 text-sm font-medium mx-4'>
                CASH ON DELIVERY
              </p>
            </div>
          </div>
        </div>

        <div className='w-full text-end mt-8'>
          <button
            type='submit'
            className='bg-black text-white px-16 py-3 text-sm'
          // onClick={()=>navigate('/orders')}
          >
            PLACE ORDER
          </button>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
