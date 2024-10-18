"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

const slides = [
  {
    title:
      "Improving patient lives with top-notch medical equipments across Illinois!",
    image: "/placeholder.svg?height=600&width=1200",
  },
  {
    title: "Providing quality healthcare solutions for better patient care",
    image: "/placeholder.svg?height=600&width=1200",
  },
];

export default function HeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative h-screen bg-red-600 overflow-hidden">
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="absolute inset-0 bg-red-600 bg-opacity-70 z-10"></div>
          <Image
            src={slide.image}
            alt={`Slide ${index + 1}`}
            layout="fill"
            objectFit="cover"
            className="z-0"
          />
          <div className="relative z-20 flex flex-col justify-center h-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <Image
              src="/placeholder.svg?height=60&width=200"
              alt="Alfa Medical Supply, Inc. Logo"
              width={200}
              height={60}
              className="absolute top-8 left-8"
            />
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white leading-tight mb-4">
              {slide.title}
            </h1>
          </div>
        </div>
      ))}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2 z-30">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full ${
              index === currentSlide ? "bg-white" : "bg-white bg-opacity-50"
            }`}
            onClick={() => setCurrentSlide(index)}
          ></button>
        ))}
      </div>
    </div>
  );
}
