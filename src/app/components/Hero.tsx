"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
  faPlay,
  faPause,
} from "@fortawesome/free-solid-svg-icons";

const SLIDES = [
  { id: 1, image: "/banner-deals.png", alt: "JavaScript" },
  { id: 2, image: "/banner-deals.png", alt: "CSS" },
  { id: 3, image: "/banner-deals.png", alt: "HTML" },
];

const CircularSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoplayRunning, setIsAutoplayRunning] = useState(true);
  const sliderRef = useRef<HTMLDivElement>(null);
  const slidesHolderRef = useRef<HTMLDivElement>(null);
  const autoplayRef = useRef<NodeJS.Timeout | null>(null);

  const stepAngle = (2 * Math.PI) / SLIDES.length;
  const animationDuration = 600;
  const autoplayInterval = 2500;

  useEffect(() => {
    const handleResize = () => {
      if (sliderRef.current && slidesHolderRef.current) {
        const sliderSize = 100;
        const slideSize = 15;
        const w = sliderRef.current.offsetWidth;
        const h = sliderRef.current.offsetHeight;
        const radius =
          2 * h <= w ? h * (sliderSize / 100) : (w / 2) * (sliderSize / 100);

        sliderRef.current.style.width = `${2 * radius}px`;
        sliderRef.current.style.height = `${radius}px`;

        const r = 2 * radius * (1 - slideSize / 100);
        slidesHolderRef.current.style.width = `${r}px`;
        slidesHolderRef.current.style.height = `${r}px`;
        slidesHolderRef.current.style.marginTop = `${
          radius * (slideSize / 100)
        }px`;

        const slidesSize = Math.min(
          2 * radius * (slideSize / 100),
          stepAngle * radius * (1 - slideSize / 100) - 50
        );
        const slides = slidesHolderRef.current.querySelectorAll(
          ".slides-holder__item"
        );
        slides.forEach((slide, i) => {
          const x = (r / 2) * Math.cos(stepAngle * i - Math.PI / 2);
          const y = (r / 2) * Math.sin(stepAngle * i - Math.PI / 2);
          (
            slide as HTMLElement
          ).style.transform = `translate(${x}px, ${y}px) rotate(${
            ((stepAngle * 180) / Math.PI) * i
          }deg)`;
          (slide as HTMLElement).style.width = `${slidesSize}px`;
          (slide as HTMLElement).style.height = `${slidesSize}px`;
        });
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (isAutoplayRunning) {
      autoplayRef.current = setInterval(() => {
        rotate(-1);
      }, autoplayInterval + 20);
    } else {
      if (autoplayRef.current) {
        clearInterval(autoplayRef.current);
      }
    }
    return () => {
      if (autoplayRef.current) {
        clearInterval(autoplayRef.current);
      }
    };
  }, [isAutoplayRunning]);

  const rotate = (multiplier: number) => {
    setCurrentSlide((prevSlide) => {
      let newSlide = prevSlide - multiplier;
      if (newSlide < 0) {
        newSlide = SLIDES.length - 1;
      } else if (newSlide >= SLIDES.length) {
        newSlide = 0;
      }
      return newSlide;
    });
  };

  return (
    <div className="w-full h-full box-border p-5">
      <div
        ref={sliderRef}
        className="w-full h-full overflow-hidden flex justify-center items-end bg-[#222]"
      >
        <div className="relative flex justify-center box-border p-5 pb-0 overflow-hidden">
          <div className="absolute z-10 top-1/2 left-0 transform -translate-y-1/2">
            <button
              onClick={() => rotate(1)}
              className="text-[#8eb8e5] opacity-70 hover:opacity-100 hover:text-[1.7em] transition-all duration-600"
            >
              <FontAwesomeIcon icon={faChevronLeft} />
            </button>
          </div>
          <div className="absolute z-10 top-1/2 right-0 transform -translate-y-1/2">
            <button
              onClick={() => rotate(-1)}
              className="text-[#8eb8e5] opacity-70 hover:opacity-100 hover:text-[1.7em] transition-all duration-600"
            >
              <FontAwesomeIcon icon={faChevronRight} />
            </button>
          </div>
          <div className="absolute z-10 bottom-0 left-1/2 transform -translate-x-1/2">
            <button
              onClick={() => setIsAutoplayRunning(!isAutoplayRunning)}
              className="text-[#8eb8e5] opacity-70 hover:opacity-100 hover:text-[1.7em] transition-all duration-600"
            >
              <FontAwesomeIcon icon={isAutoplayRunning ? faPause : faPlay} />
            </button>
          </div>
          <div
            ref={slidesHolderRef}
            className="rounded-full border-2 border-[#8eb8e5] origin-center box-border flex justify-center items-center relative z-[100]"
            style={{
              transform: `rotate(${
                (-currentSlide * stepAngle * 180) / Math.PI
              }deg)`,
              transition: `transform ${animationDuration}ms`,
            }}
          >
            {SLIDES.map((slide, index) => (
              <div
                key={slide.id}
                className={`rounded-full border-2 border-[#7c99b4] absolute box-border origin-center bg-[#222] transition-all duration-300 ${
                  index === currentSlide ? "filter-none" : "brightness-[70%]"
                }`}
              >
                <Image
                  src={slide.image}
                  alt={slide.alt}
                  width={100}
                  height={100}
                  className="rounded-full"
                />
              </div>
            ))}
          </div>
          <div className="absolute bottom-0 z-0">
            {SLIDES.map((slide, index) => (
              <div
                key={slide.id}
                className={`w-full h-0 opacity-0 flex flex-col items-center justify-center transition-opacity duration-600 ${
                  index === currentSlide ? "h-full opacity-100" : ""
                }`}
              >
                <h1 className="text-white text-2xl font-sans pt-5">
                  {slide.alt}
                </h1>
                <p className="text-white text-base font-sans mt-5 px-[10%] overflow-hidden text-ellipsis">
                  Description for {slide.alt}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CircularSlider;
