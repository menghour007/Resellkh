"use client";

import { useRef } from "react";
import ProductCard from "@/components/domain/ProductCart"; 
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

const sellerProducts = [
  {
    id: 1,
    imageUrl: "/Product-Detail-Image/card-1.png",
    title: "Recycled leather shoulder bag",
    description: "A classic handbag of the Recycled leather...",
    productPrice: 100,
    originalPrice: 200,
    discountPercent: 50,
  },
  {
    id: 2,
    imageUrl: "/Product-Detail-Image/card-2.png",
    title: "Best Bow Hairstyles",
    description: "Best hairstyles that will be perfect to suit...",
    productPrice: 1.45,
    originalPrice: null,
    discountPercent: null,
  },
  {
    id: 3,
    imageUrl: "/Product-Detail-Image/card-3.png",
    title: "Swatch High-Quality",
    description: "Swatch Classic Timepiece Elegance meets...",
    productPrice: 5,
    originalPrice: null,
    discountPercent: null,
  },
  {
    id: 4,
    imageUrl: "/Product-Detail-Image/card-4.png",
    title: "White Puller Cloud bag",
    description: "Brand new White Puller Cloud bag selling at...",
    productPrice: 5,
    originalPrice: null,
    discountPercent: null,
  },
  {
    id: 5,
    imageUrl: "/Product-Detail-Image/card-5.png",
    title: "JACK WILLS Men's",
    description: "Sweatshirt/jumper",
    productPrice: 29.5,
    originalPrice: 59.99,
    discountPercent: 51, // Calculated as Math.round(((59.99 - 29.5) / 59.99) * 100)
  },
 
  {
    id: 6,
    imageUrl: "/images/recommended/charles.jpg",
    title: "Charles & Keith Leather Metallic",
    description: "No visual flaws, comes with a dust back.",
    productPrice: 29,
    originalPrice: null,
    discountPercent: null,
  },
  {
    id: 7,
    imageUrl: "/images/recommended/bike.jpg",
    title: "French Carbon Engineer Bicycle",
    description: "Highly negotiable. Used once only.",
    productPrice: 500,
    originalPrice: null,
    discountPercent: null,
  },
];

export default function MoreFromSeller() {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    scrollRef.current?.scrollBy({
      left: direction === "left" ? -320 : 320,
      behavior: "smooth",
    });
  };

  return (
    <section className="w-full bg-white py-10 mb-12">
      <div className="w-full">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
          <h2 className="text-xl font-bold text-gray-900">
            More from this seller
          </h2>
          <div className="flex gap-2 self-start sm:self-auto">
            <button
              onClick={() => scroll("left")}
              className="p-2 bg-gray-100 rounded-full hover:bg-gray-200"
              aria-label="Scroll left"
            >
              <FiChevronLeft className="w-5 h-5 text-gray-700" />
            </button>
            <button
              onClick={() => scroll("right")}
              className="p-2 bg-gray-100 rounded-full hover:bg-gray-200"
              aria-label="Scroll right"
            >
              <FiChevronRight className="w-5 h-5 text-gray-700" />
            </button>
          </div>
        </div>

        {/* Scrollable Cards */}
        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto scroll-smooth no-scrollbar pb-1"
        >
          {sellerProducts.map((item) => {
            return (
              <div
                key={item.id}
                className="flex-shrink-0 w-[80%] sm:w-[45%] md:w-[30%] lg:w-[23%] xl:w-[18%] max-w-[240px]"
              >
                <ProductCard
                  id={item.id}
                  imageUrl={item.imageUrl}
                  title={item.title}
                  description={item.description}
                  price={item.productPrice.toFixed(2)}
                  originalPrice={
                    item.originalPrice ? item.originalPrice.toFixed(2) : null
                  }
                  discountText={
                    item.discountPercent
                      ? `${item.discountPercent}% OFF`
                      : null
                  }
                />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}