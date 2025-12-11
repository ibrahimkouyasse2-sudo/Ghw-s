import React, { useContext, useEffect } from "react";
import { ShopContext } from "../context/ShopContext";
import { useSearchParams } from "react-router-dom";


const VerifyPayment = () => {
  const { navigate, token } = useContext(ShopContext);
  const [searchParams] = useSearchParams();
  const success = searchParams.get("success");
  const orderId = searchParams.get("orderId");

  // Stripe verification removed. Redirect based on success flag.
  useEffect(() => {
    if (success === "false") {
      setTimeout(() => {
        navigate("/cart");
      }, 1500);
    } else {
      // for guest, redirect to home or orders if logged
      if (token) navigate("/orders"); else navigate("/");
    }
  }, [success, token]);
  return (
    <div className='flex flex-col items-center justify-center min-h-screen'>
      <div className='verify w-12 h-12 rounded-full border-2 border-gray-700'>
        <div className=' h-2 w-2 rounded-full border-none bg-red-700'></div>
      </div>
    </div>
  );
};

export default VerifyPayment;
