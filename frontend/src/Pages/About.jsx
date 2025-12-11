import React from "react";
import Title from "../components/Title";
import { assets } from "../assets/assets";
import NewsletterBox from "../components/NewsletterBox";

const About = () => {
  return (
    <main>
      <div className='text-2xl text-center mt-8 border-t'>
        <Title text1={"ABOUT"} text2={"US"} />
      </div>

      <div className='my-10 flex flex-col md:flex-row gap-16'>
        <img
          className='w-full md:max-w-[450px]'
          src={assets.about_img}
          alt='about image'
        />

        <div className='flex flex-col justify-center gap-6 md:w-2/4 text-gray-600'>
          <p>
            We are Gaming Hardware Store — your local source for high-performance
            gaming PCs, graphics cards, CPUs, monitors, keyboards and mice. We
            build custom gaming rigs, sell pre-built systems, and stock the
            components gamers need to upgrade and optimize their setups.
          </p>
          <p>
            Our catalog includes top-tier GPUs, powerful CPUs, fast NVMe
            storage, and high-refresh monitors. Whether you're assembling a
            flagship build or upgrading a single component, we provide quality
            parts, transparent pricing, and technical support.
          </p>
          <b className='text-gray-800'>Our Mission</b>
          <p>
            Deliver the best gaming experience by offering reliable hardware,
            honest advice, and fast service. We prioritize performance, value,
            and customer satisfaction.
          </p>

          <div className='flex items-center gap-3 pt-2'>
            <span className='text-sm font-medium'>Follow us:</span>
            <a
              href='https://instagram.com/gaming_hardware_store'
              target='_blank'
              rel='noopener noreferrer'
              aria-label='Instagram - gaming_hardware_store'
              className='inline-block'
            >
              {/* Instagram SVG icon */}
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='28'
                height='28'
                viewBox='0 0 24 24'
                fill='none'
                stroke='currentColor'
                strokeWidth='1.5'
                strokeLinecap='round'
                strokeLinejoin='round'
                className='text-pink-600 hover:opacity-80'
              >
                <rect x='2' y='2' width='20' height='20' rx='5' ry='5'></rect>
                <path d='M16 11.37a4 4 0 1 1-7.94 1.95A4 4 0 0 1 16 11.37z'></path>
                <line x1='17.5' y1='6.5' x2='17.51' y2='6.5'></line>
              </svg>
            </a>
            <a
              href='https://instagram.com/gaming_hardware_store'
              target='_blank'
              rel='noopener noreferrer'
              className='text-sm text-gray-700'
            >
              @gaming_hardware_store
            </a>
          </div>
        </div>

        </div>
        
        <div className='text-4xl py-4'>
          <Title text1={"WHY"} text2={"CHOOSE US"} />
        </div>
        <div className='flex flex-col md:flex-row text-sm mb-20'>
          <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
            <b>Quality Assurance:</b>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quae
              officia tempora cumque debitis, doloremque nisi.
            </p>
          </div>
          <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
            <b>Convenience:</b>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quae
              officia tempora cumque debitis, doloremque nisi.
            </p>
          </div>
          <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
            <b>Exceptional Customer Service:</b>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quae
              officia tempora cumque debitis, doloremque nisi.
            </p>
          </div>

       
      </div>
          <NewsletterBox/>
    </main>
  );
};

export default About;
