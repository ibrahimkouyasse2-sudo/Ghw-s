import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";
import { assets } from "../assets/assets";
import CartTotal from "../components/CartTotal";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const { products, currency, cartItems, updateQuantity } = useContext(ShopContext);

  const [cartData, setCartData] = useState([]);
  const navigate = useNavigate();
   
  useEffect(() => {
    if (products.length > 0) {
      const tempData = [];
      for (const itemId in cartItems) {
        if (cartItems[itemId] > 0) {
          tempData.push({
            _id: itemId,
            quantity: cartItems[itemId],
          });
        }
      }
      setCartData(tempData);
    }
  }, [cartItems, products]);

  return (
    <main className='border-t pt-14'>
      <div className='text-2xl mb-3'>
        <Title text={"YOUR"} text2={"CART"} />
      </div>

      <div>
        {cartData.map((item, i) => {
          const productData = products.find(
            (product) => product._id === item._id
          );

          return (
            <div key={i} className='py-2 border-t border-b text-gray-700 grid grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-4'>
              <div className='flex items-start gap-6'>
                <img
                  className='16 sm:w-20'
                  src={productData.image[0]}
                  alt='image'
                />
                <div>
                  <p className='text-sm sm:text-lg font-medium'>
                    {productData.name}
                  </p>

                  <div className='flex items-center gap-5 mt-2'>
                    <p>
                      {productData.price}
                      {currency}
                    </p>
                    {/* no size for PC components */}
                  </div>
                </div>
              </div>
              <input
                type="number"
                inputMode="numeric"
                min={1}
                max={3}
                value={item.quantity}
                className="border max-w-10 sm:max-w-20 px-1 sm:px-2 py-1"
                onChange={(e) => {
                  let value = Number(e.target.value);

                  if (isNaN(value)) return;

                  // 🔒 clamp value
                  if (value < 1) value = 1;
                  if (value > 3) value = 3;

                  updateQuantity(item._id, value);
                }}
                onBlur={(e) => {
                  // Fix empty input
                  if (!e.target.value) {
                    updateQuantity(item._id, 1);
                  }
                }}
              />


              <img
                onClick={() => updateQuantity(item._id, 0)}
                className='w-4 sm:w-5 mr-4 cursor-pointer '
                src={assets.bin_icon}
                alt=''
              />
            </div>
          );
        })}
      </div>

      <div className='flex justify-end my-20'>
        <div className='w-full sm:w-[450px]'>
          <CartTotal />

          <div className='w-full text-end'>
            <button
              onClick={() => navigate("/place-order")}
              className='text-sm bg-black text-white my-8 px-8 py-3'
            >
              PROCED TO CHECKOUT
            </button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Cart;
