"use client";

import React, { useState } from "react";
import Image from "next/image";

const initialSlides = [
  {
    img: "/banner-deals.png",
    position: "left",
  },
  {
    img: "/banner-deals.png",
    position: "center",
  },
  {
    img: "/banner-deals.png",
    position: "right",
  },
];

export default function Component() {
  const [slides, setSlides] = useState(initialSlides);
  const [isAnimating, setIsAnimating] = useState(false);

  const moveRight = () => {
    if (isAnimating) return;
    setIsAnimating(true);

    setSlides((prevSlides) => {
      const newSlides = [...prevSlides];
      const leftSlide = newSlides.find((slide) => slide.position === "left");
      const centerSlide = newSlides.find(
        (slide) => slide.position === "center"
      );
      const rightSlide = newSlides.find((slide) => slide.position === "right");

      leftSlide.position = "center";
      centerSlide.position = "right";
      rightSlide.position = "left";

      return newSlides;
    });

    setTimeout(() => setIsAnimating(false), 500);
  };

  const moveLeft = () => {
    if (isAnimating) return;
    setIsAnimating(true);

    setSlides((prevSlides) => {
      const newSlides = [...prevSlides];
      const leftSlide = newSlides.find((slide) => slide.position === "left");
      const centerSlide = newSlides.find(
        (slide) => slide.position === "center"
      );
      const rightSlide = newSlides.find((slide) => slide.position === "right");

      leftSlide.position = "right";
      centerSlide.position = "left";
      rightSlide.position = "center";

      return newSlides;
    });

    setTimeout(() => setIsAnimating(false), 500); // Match this with CSS transition duration
  };

  return (
    <div className="relative w-full h-screen overflow-hidden bg-[#ffb61a]">
      <div className="absolute top-0 left-0 w-1/2 h-full" />

      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute transition-all duration-500 ease-in-out cursor-pointer
            ${
              slide.position === "left"
                ? "bottom-[-100px] left-[-100px] w-[400px] h-[400px] z-10"
                : ""
            }
            ${
              slide.position === "center"
                ? "top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] z-20"
                : ""
            }
            ${
              slide.position === "right"
                ? "bottom-[-100px] right-[-100px] w-[400px] h-[400px] z-10"
                : ""
            }
          `}
          onClick={() =>
            slide.position === "left"
              ? moveRight()
              : slide.position === "right"
              ? moveLeft()
              : null
          }
        >
          <div className="absolute inset-0 rounded-full bg-[#ffc234]" />
          <div
            className={`absolute rounded-full bg-[#ffcd5b] 
            ${slide.position === "center" ? "inset-[50px]" : "inset-[30px]"}`}
          />
          <Image
            src={slide.img}
            alt={`Slide ${index + 1}`}
            width={slide.position === "center" ? 500 : 300}
            height={slide.position === "center" ? 500 : 300}
            className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2
              ${slide.position !== "center" ? "opacity-40" : ""}
            `}
          />
        </div>
      ))}
    </div>
  );
}
