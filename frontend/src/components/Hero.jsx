import React from "react";
import { assets } from "../assets/assets";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  const slides = [
    {
      image: assets.gaming_pc,
      type: "Gaming PC",
    },
    {
      image: assets.monitor,
      type: "Monitor",
    },
    {
      image: assets.gpu,
      type: "GPU",
    },
  ];

  const handleSlideClick = (type) => {
    navigate(`/collection?type=${encodeURIComponent(type)}`);
  };

  return (
    <section className='slider-container'>
      <Slider {...settings}>
        {slides.map((slide, index) => (
          <div
            key={index}
            className='slide'
            onClick={() => handleSlideClick(slide.type)}
          >
            <img
              src={slide.image}
              alt={slide.type}
              className='w-full h-[400px] object-cover cursor-pointer'
            />
            <h2 className='text-center mt-4 text-xl font-semibold'>
              {slide.type}
            </h2>
          </div>
        ))}
      </Slider>
    </section>
  );
};

export default Hero;
