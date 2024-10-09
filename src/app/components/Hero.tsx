"use client";

import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { MotionPathPlugin } from "gsap/dist/MotionPathPlugin";

gsap.registerPlugin(MotionPathPlugin);

const images: string[] = [
  "/banner-deals.png",
  "/banner-deals.png",
  "/banner-deals.png",
  "/banner-deals.png",
  "/banner-deals.png",
  "/banner-deals.png",
  "/banner-deals.png",
  "/banner-deals.png",
];

export default function Home() {
  const [activeItem, setActiveItem] = useState<number>(4);
  const [isAnimating, setIsAnimating] = useState<boolean>(false);
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const circlePathRef = useRef<SVGPathElement | null>(null);
  const itemsRef = useRef<(HTMLImageElement | null)[]>([]);

  useEffect(() => {
    if (!wrapperRef.current) return;

    const circlePath = MotionPathPlugin.convertToPath("#holder", false)[0];
    circlePath.id = "circlePath";
    const svg = wrapperRef.current.querySelector("svg");
    if (svg) {
      svg.prepend(circlePath);
    }
    circlePathRef.current = circlePath;

    const numItems = images.length;

    gsap.set(itemsRef.current, {
      motionPath: {
        path: circlePath,
        align: circlePath,
        alignOrigin: [0.5, 0.5],
        end: (i: number) => i / numItems,
      },
      scale: 0.9,
      rotate: (_: any, target: any) => -gsap.getProperty(target, "rotation"),
    });

    gsap.set(wrapperRef.current, { rotation: 90, transformOrigin: "center" });

    setActiveClass(activeItem);
    updateImageRotation();
  }, []);

  const setActiveClass = (index: number) => {
    itemsRef.current.forEach((item, i) => {
      if (!item) return;
      if (i === index) {
        item.classList.add("active");
        gsap.to(item, { scale: 4.8, duration: 0.3, opacity: 1 });
      } else {
        item.classList.remove("active");
        gsap.to(item, { scale: 2.5, duration: 0.3, opacity: 0.5 });
      }
    });
  };

  const moveWheel = (direction: number) => {
    if (isAnimating) return;
    setIsAnimating(true);

    const numItems = images.length;
    const newActiveItem = (activeItem + direction + numItems) % numItems;
    setActiveItem(newActiveItem);
    setActiveClass(newActiveItem);

    if (!wrapperRef.current) return;

    gsap.to(wrapperRef.current, {
      rotation: `+=${(-direction * 360) / numItems}`,
      transformOrigin: "center",
      duration: 3,
      ease: "elastic.out(1.5, 0.5)",
      onUpdate: updateImageRotation,
      onComplete: () => setIsAnimating(false),
    });
  };

  const onItemClick = (index: number) => {
    if (isAnimating || index === activeItem) return;
    let diff = index - activeItem;
    if (Math.abs(diff) > images.length / 2) {
      diff = diff > 0 ? diff - images.length : diff + images.length;
    }
    moveWheel(diff);
  };

  const updateImageRotation = () => {
    if (!wrapperRef.current) return;
    const wrapperRotation = gsap.getProperty(wrapperRef.current, "rotation");
    itemsRef.current.forEach((item) => {
      if (item) {
        gsap.set(item, { rotate: -wrapperRotation });
      }
    });
  };

  return (
    <section
      id="home-section-1"
      className="bg-yellow-400 w-full h-screen overflow-hidden pt-[5rem]"
    >
      <div className="relative mt-[43rem]">
        <div ref={wrapperRef} className="relative">
          {images.map((image, index) => (
            <img
              key={index}
              ref={(el) => (itemsRef.current[index] = el)}
              className={`w-[100px] h-[100px] text-white text-center p-[0.2rem] bg-[#BB1112] leading-[50px] text-2xl font-roboto rounded-full z-10 cursor-pointer ${
                activeItem === index ? "active" : ""
              }`}
              src={image}
              alt=""
              onClick={() => onItemClick(index)}
            />
          ))}
          <svg
            viewBox="0 0 300 300"
            className="h-[1600px] w-[1600px] overflow-visible z-[-1] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 "
          >
            <circle
              id="holder"
              className="fill-none"
              cx="151"
              cy="151"
              r="150"
            />
          </svg>
        </div>
      </div>
    </section>
  );
}
