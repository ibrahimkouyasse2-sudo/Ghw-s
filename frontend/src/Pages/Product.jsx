import React, { useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import { useState } from "react";
import { assets } from "../assets/assets";
import RelatedProduct from "../components/RelatedProduct";

const Product = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const { products, currency, addToCart } = useContext(ShopContext);
  const [productData, setProductData] = useState(false);

  const [size, setSize] = useState("");
  const [image, setImage] = useState("");

  const fetchProductData = async () => {
    products.map((product) => {
      if (product._id === productId) {
        setProductData(product);
        setImage(product.image[0]);
        return null;
      }
    });
  };

  useEffect(() => {
    fetchProductData();
  }, [productId,products]);

  return productData ? (
    <main className='border-t-2  transition-opacity ease-in duration-500 opacity-100'>
      {/* --------product data---------- */}
      <div className='flex gap-12 sm:gap-12 flex-col mt-10 sm:flex-row'>
        {/* -------product images---------- */}

        <div className='flex-1 flex flex-col-reverse gap-3 sm:flex-row'>
          <div className='flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full'>
            {productData.image.map((item, i) => (
              <img
                onClick={() => setImage(item)}
                key={i}
                src={item}
                alt=''
                className='w-[24%]  sm:w-full mb-3 flex-shrink-0 cursor-pointer'
              />
            ))}
          </div>

          <div className='w-full sm:w-[80%]'>
            <img className='w-full h-auto' src={image} alt='image' />
          </div>
        </div>

        {/* -----product informations------- */}

        <div className='flex-1'>
          <h1 className='font-medium text-2xl mt-2'>{productData.name}</h1>

            <div className='flex items-center gap-1 mt-2'>
            <img src={assets.star_icon} alt='' className='w-3.5' />
            <img src={assets.star_icon} alt='' className='w-3.5' />
            <img src={assets.star_icon} alt='' className='w-3.5' />
            <img src={assets.star_icon} alt='' className='w-3.5' />
            <img src={assets.star_dull_icon} alt='' className='w-3.5' />
          </div>
          <p className='mt-5 text-3xl font-medium'>
            {productData.price}
            {currency}
          </p>
          <p className='mt-5 text-gray-500 w-4/5'>{productData.description}</p>

          {productData.sizes && productData.sizes.length > 0 && (
            <div className='flex flex-col gap-4 my-8'>
              <p>Select Size</p>
              <div className='flex gap-2'>
                {productData.sizes.map((item, i) => (
                  <button
                    onClick={() => setSize(item)}
                    key={i}
                    className={`border py-2 px-4 bg-slate-100 ${
                      item === size ? "border border-orange-500 " : ""
                    }`}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>
          )}
          <button
            onClick={() => {
              addToCart(productData._id);
              navigate("/cart");
            }}
            className='bg-black text-white px-8 py-3 text-sm active:bg-gray-700'
          >
            ADD TO CART
          </button>
          <hr className='mt-8 sm:w-4/5' />
          <div className=' text-sm text-gray-500 mt-5 flex flex-col gap-1'>
            <p>100% Orginal product.</p>
            <p>Cash on delivery is available on this product.</p>
            <p>Eassy retun and exchange policy within 7 days. </p>
          </div>
        </div>
      </div>

      {/* description & reviews removed per request */}

      {/* ------display related products */}
      <RelatedProduct category={productData.category}subCategory={productData.subCategory}/>
    </main>
  ) : (
    <div className='opacity-0'></div>
  );
};

export default Product;
