"use client";

import React, { useState } from "react";
import Image from "next/image";

const slides = [
  {
    img: "/banner-deals.png",
  },
  {
    img: "/banner-deals.png",
  },
  {
    img: "/banner-deals.png",
  },
];

export default function Component() {
  const [active, setActive] = useState(0);
  const [rotate, setRotate] = useState(0);

  const rotateAdd = 360 / slides.length;

  const nextSlide = () => {
    setActive((prev) => (prev + 1) % slides.length);
    setRotate((prev) => prev + rotateAdd);
  };

  const prevSlide = () => {
    setActive((prev) => (prev - 1 + slides.length) % slides.length);
    setRotate((prev) => prev - rotateAdd);
  };

  return (
    <div className="relative w-full h-screen overflow-hidden bg-[#ffb61a]">
      <div className="absolute top-0 left-0 w-1/2 h-full" />
      <div
        className="absolute bottom-0 left-1/2 w-[1300px] h-[1300px] rounded-full transition-transform duration-500 ease-in-out"
        style={{ transform: `translate(-50%, 50%) rotate(${rotate}deg)` }}
      >
        <div className="absolute inset-0 rounded-full bg-[#ffc234]" />
        <div className="absolute inset-[100px] rounded-full bg-[#ffcd5b]" />
        {slides.map((slide, index) => (
          <div
            key={index}
            className="absolute w-full h-full text-center"
            style={{ rotate: `${60 * index}deg` }}
          >
            <Image
              src={slide.img}
              alt="anything"
              width={420}
              height={420}
              className="h-[420px] w-[30%] absolute top-[20%] left-1/4 transform -translate-x-1/2"
            />
          </div>
        ))}
      </div>

      <div className="">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`${
              active === index ? "block" : "hidden"
            } animate-fadeIn`}
          ></div>
        ))}
      </div>

      <button
        onClick={prevSlide}
        className="absolute top-1/2 left-[250px] text-[100px] bg-transparent text-white font-bold opacity-30 hover:opacity-100"
      >
        {"<"}
      </button>
      <button
        onClick={nextSlide}
        className="absolute top-1/2 right-[250px] text-[100px] bg-transparent text-white font-bold opacity-30 hover:opacity-100"
      >
        {">"}
      </button>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(100px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.5s ease-in-out forwards;
        }
      `}</style>
    </div>
  );
}
