"use client";

import { useRef } from "react";
import Image from "next/image";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

const categories = [
  { name: "Dress", image: "/images/category/dress.jpg" },
  { name: "Jacket", image: "/images/category/jacket.jpg" },
  { name: "Bags", image: "/images/category/bags.jpg" },
  { name: "Backpack", image: "/images/category/backpack.jpg" },
  { name: "Jewelry", image: "/images/category/jewelry.jpg" },
  { name: "Shoes", image: "/images/category/shoes.jpg" },
  { name: "Sports", image: "/images/category/sports.jpg" },
  { name: "Sneakers", image: "/images/category/sneakers.jpg" },
  { name: "Jewelry", image: "/images/category/jewelry.jpg" },
  { name: "Shoes", image: "/images/category/shoes.jpg" },
  { name: "Sports", image: "/images/category/sports.jpg" },
  { name: "Sneakers", image: "/images/category/sneakers.jpg" },
];

export default function CategorySlider() {
  const scrollRef = useRef(null);

  const scroll = (dir) => {
    scrollRef.current?.scrollBy({
      left: dir === "left" ? -260 : 260,
      behavior: "smooth",
    });
  };

  return (
    <section className="w-full pt-[10px]">
      <div className="w-full">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-[15] mb-3">
          <h2 className="text-xl sm:text-xl font-bold text-gray-900">
           What would you like to find?
        </h2>
          <div className="flex gap-2 self-start sm:self-auto">
            <button
              onClick={() => scroll("left")}
              className="p-2 bg-gray-100 rounded-full hover:bg-gray-200"
            >
              <FiChevronLeft className="w-5 h-5 text-gray-700" />
            </button>
            <button
              onClick={() => scroll("right")}
              className="p-2 bg-gray-100 rounded-full hover:bg-gray-200"
            >
              <FiChevronRight className="w-5 h-5 text-gray-700" />
            </button>
          </div>
        </div>

        <div
          ref={scrollRef}
          className="flex gap-[49] overflow-x-auto scroll-smooth no-scrollbar px-[2px] pb-1"
        >
          {categories.map((cat, index) => (
            <div
              key={index}
              className="relative flex-shrink-0 w-[120px] h-[120px] rounded-2xl overflow-hidden shadow-md group cursor-pointer"
            >
              <Image
                src={cat.image}
                alt={cat.name}
                fill
                className="object-cover"
              />

              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition duration-200 flex items-center justify-center">
                <span className="text-white text-sm font-semibold">
                  {cat.name}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
