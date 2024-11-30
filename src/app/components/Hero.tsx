"use client";

import { useState } from "react";
import { Heart } from "lucide-react";

const donationPoints = [
  { value: 6000, label: "Rs 6,000", kits: 4 },
  { value: 15000, label: "Rs 15K", kits: 10 },
  { value: 25000, label: "Rs 25K", kits: 18 },
  { value: 35000, label: "Rs 35K", kits: 24 },
  { value: 60000, label: "Rs 60K", kits: 40 },
];

export default function DonationSlider() {
  const [selectedAmount, setSelectedAmount] = useState(6000);

  const selectedPoint =
    donationPoints.find((point) => point.value === selectedAmount) ||
    donationPoints[0];
  const selectedIndex = donationPoints.findIndex(
    (point) => point.value === selectedAmount
  );

  return (
    <div className="max-w-xl mx-auto p-6">
      <div className="relative mb-8">
        <div
          className="absolute top-0 left-0 transition-all duration-300 text-center w-full"
          style={{
            transform: `translateX(${selectedIndex * 25}%)`,
          }}
        >
          <h2 className="text-lg font-medium inline-block bg-white px-2">
            Send{" "}
            <Heart className="inline-block w-5 h-5 fill-orange-500 text-orange-500" />{" "}
            {selectedPoint.kits} Emergency Birth Kits
          </h2>
        </div>
      </div>

      <div className="relative mb-16 mt-20">
        {/* Line connecting points */}
        <div className="absolute h-0.5 bg-gray-200 left-0 right-0 top-1/2 -translate-y-1/2" />

        {/* Active line */}
        <div
          className="absolute h-0.5 bg-orange-500 left-0 top-1/2 -translate-y-1/2 transition-all duration-300"
          style={{
            width: `${(selectedIndex + 1) * (100 / donationPoints.length)}%`,
          }}
        />

        {/* Points */}
        <div className="relative flex justify-between">
          {donationPoints.map((point) => (
            <button
              key={point.value}
              onClick={() => setSelectedAmount(point.value)}
              className="relative group focus:outline-none"
            >
              {/* Dot */}
              <div
                className={`
                w-4 h-4 rounded-full border-2 transition-all duration-300
                ${
                  selectedAmount === point.value
                    ? "border-orange-500 bg-orange-500 scale-150"
                    : "border-orange-500 bg-white hover:bg-orange-100"
                }
              `}
              />

              {/* Label */}
              <span
                className={`
                absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap
                text-sm transition-colors duration-300
                ${
                  selectedAmount === point.value
                    ? "text-orange-500 font-medium"
                    : "text-gray-600"
                }
              `}
              >
                {point.label}
              </span>
            </button>
          ))}
        </div>
      </div>

      <div className="text-center">
        <button
          className="bg-orange-500 text-white px-8 py-2.5 rounded-md font-medium
                     hover:bg-orange-600 transition-colors duration-300"
        >
          Donate Today
        </button>
      </div>
    </div>
  );
}
