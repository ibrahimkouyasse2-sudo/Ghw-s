import React, { useState } from "react";
import { assets } from "../assets/assets";
import axios from "axios";
import { backendUrl } from "../App";
import { toast } from "react-toastify";


const Add = ({ token }) => {
  const [image1, setImage1] = useState(false)
  const [image2, setImage2] = useState(false)
  const [image3, setImage3] = useState(false)
  const [image4, setImage4] = useState(false)

  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [price, setPrice] = useState("")
  const [category, setCategory] = useState("Computers")
  const [subCategory, setSubcategory] = useState("Gaming PC")
  const [bestseller, setBestseller] = useState(false)
  const [sizes, setSizes] = useState([])

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      image1 && formData.append("image1", image1);
      image2 && formData.append("image2", image2);
      image3 && formData.append("image3", image3);
      image4 && formData.append("image4", image4);

      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("category", category);
      formData.append("subCategory", subCategory);
      formData.append("bestseller", bestseller);
      formData.append("sizes", JSON.stringify(sizes));

      const response = await axios.post(backendUrl + "/api/product/add", formData, { headers: { token } })
      if (response.data.success) {
        toast.success(response.data.message)
        setName('')
        setDescription('')
        setCategory('')
        setSubcategory('NOsub')
        setImage1(false)
        setImage2(false)
        setImage3(false)
        setImage4(false)
        setPrice('')
      }
      else {
        toast.error(response.data.message)
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message)
    }
  };
  return (
    <main>
      <form onSubmit={onSubmitHandler}
        className='flex flex-col w-full items-start gap-3'>
        <div>
          <p className='mb-2 font-medium text-sm'>Upload Images</p>
          <div className='flex gap-2'>
            <label htmlFor="image1">
              <img className='w-20' src={!image1 ? assets.upload_area : URL.createObjectURL(image1)} alt='upload area' />
              <input
                onChange={(e) => setImage1(e.target.files[0])}
                type='file'
                id="image1"
                hidden
              />
            </label>
            <label htmlFor="image2">
              <img className='w-20' src={!image2 ? assets.upload_area : URL.createObjectURL(image2)} alt='upload area' />
              <input
                onChange={(e) => setImage2(e.target.files[0])}
                type='file'
                id="image2"
                hidden
              />
            </label>
            <label htmlFor="image3">
              <img className='w-20' src={!image3 ? assets.upload_area : URL.createObjectURL(image3)} alt='upload area' />
              <input
                onChange={(e) => setImage3(e.target.files[0])}
                type='file'
                id="image3"
                hidden
              />
            </label>
            <label htmlFor="image4">
              <img className='w-20' src={!image4 ? assets.upload_area : URL.createObjectURL(image4)} alt='upload area' />
              <input
                onChange={(e) => setImage4(e.target.files[0])}
                type='file'
                id="image4"
                hidden
              />
            </label>
          </div>
        </div>

        {/* ----input feilds------ */}

        <div className='w-full'>
          <p className='mb-2 font-medium text-sm'>Product Name</p>
          <input
            name='name'
            onChange={(e) => setName(e.target.value)}
            value={name}
            className='w-full max-w-[500px] px-3 py-2'
            type='text'
            placeholder='Type here'
            required
          />
        </div>
        <div className='w-full'>
          <p className='mb-2 font-medium text-sm'>Product Description</p>
          <textarea
            name='description'
            onChange={(e) => setDescription(e.target.value)}
            value={description}
            className='w-full max-w-[500px] px-3 py-2'
            type='text'
            placeholder='Write product description'
            required
          />
        </div>

        <div className='flex flex-col sm:flex-row sm:gap-6 gap-2 w-full'>
          <div>
            <p className='mb-2 font-medium text-sm'>Product Category</p>
            <select className='w-full px-3 py-2'
              name='category'
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value='Computers'>Computers</option>
              <option value='Components'>Components</option>
              <option value='Peripherals'>Peripherals</option>
              <option value='Chairs'>Chairs</option>
            </select>
          </div>
          <div>
            <p className='mb-2 font-medium text-sm'>Product SubCategory</p>
            <select className='w-full px-3 py-2'
              name='subCategory'
              onChange={(e) => setSubcategory(e.target.value)}
            >
              <option value='NOsub'>NOsub</option>
              <option value='Gaming PC'>Gaming PC</option>
              <option value='GPU'>GPU</option>
              <option value='CPU'>CPU</option>
              <option value='Monitor'>Monitor</option>
              <option value='Keyboard'>Keyboard</option>
              <option value='Mouse'>Mouse</option>
              <option value='Full Setup'>Full Setup</option>
              <option value='PC Portable'>PC Portable</option>
              <option value='Headsets'>Headsets</option>
              <option value='PC Cases'>PC Cases</option>
              <option value='Power Supplies'>Power Supplies</option>
              <option value='Hard Drives'>Hard Drives</option>
              <option value='RAM (PC Memory)'>RAM (PC Memory)</option>
              <option value='Cooling'>Cooling</option>
            </select>
          </div>

          <div>
            <p className='mb-2 font-medium text-sm'>Product Price</p>

            <input
              name='price'
              onChange={(e) => setPrice(e.target.value)}
              value={price}
              className='w-full max-w-[500px] px-3 py-2'
              type='number'
              placeholder='Price in DH'
              required
            />
          </div>
        </div>

        <div className='flex gap-2 mt-2'>
          <input
            name='bestseller'
            type='checkbox'
            id='bestseller'
            checked={bestseller}
            onChange={() => setBestseller(prev => !prev)}
          />
          <label htmlFor='bestseller'>Add to bestseller</label>
        </div>

        <button type='submit'
          className='uppercase bg-black text-white px-3 py-3 rounded'>
          Add Product
        </button>
      </form>
    </main>
  );
};

export default Add;
