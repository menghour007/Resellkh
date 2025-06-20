"use client";

import { useRef } from "react";
import ProductCart from "@/components/domain/ProductCart";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

const trendingItems = [
  {
    id: 100,
    imageUrl: "/images/trending/shoe1.jpg",
    title: "Asics x Jound GT-2160",
    description: "Selling a pair of lightly used",
    productPrice: 219,
  },
  {
    id: 101,
    imageUrl: "/images/trending/shoe2.jpg",
    title: "ASICS Gel Nimbus 26",
    description: "No box but used less than 5 times...",
    productPrice: 150,
    discountPercent: 15,
  },
  {
    id: 102,
    imageUrl: "/images/trending/shoe3.jpg",
    title: "Men's Asics Gel-Cumulus",
    description: "Very good condition Asics Gel-Cumulus...",
    productPrice: 50,
  },
  {
    id: 103,
    imageUrl: "/images/trending/shoe4.jpg",
    title: "ASICS Japanese Edition Denims",
    description: "Barely worn special denim edition...",
    productPrice: 100,
  },
  {
    id: 104,
    imageUrl: "/images/trending/shoe5.jpg",
    title: "New Balance 327",
    description: "Size 36.5. Used once only.",
    productPrice: 32,
  },
  {
    id: 105,
    imageUrl: "/images/recommended/charles.jpg",
    title: "Charles & Keith Leather Metallic",
    description:
      "No visual flaws, only the handle is asymmetric... Comes with a dust back.",
    productPrice: 29,
  },
  {
    id: 106,
    imageUrl: "/images/recommended/bike.jpg",
    title: "French Carbon Engineer Bicycle",
    description: "Highly negotiable. Used once only. Bicycle too small for me.",
    productPrice: 500,
  },
  {
    id: 107,
    imageUrl: "/images/recommended/bracelet.jpg",
    title: "H Bracelet",
    description: "Genuine titanium steel H bracelet. Condition: 10/10",
    productPrice: 30,
    discountPercent: 40,
  },
  {
    id: 108,
    imageUrl: "/images/recommended/cloudbag.jpg",
    title: "White Puffer Cloud Bag",
    description:
      "Brand New White Puffer Cloud Bag selling at $15. Second pic tote bags $5 each!",
    productPrice: 5,
  },
  {
    id: 109,
    imageUrl: "/images/recommended/lululemon.jpg",
    title: "Lululemon Cropped Full Zip",
    description:
      "Brand new white knitted top – washed but never worn. Free size, fits up to UK6 well.",
    productPrice: 7.5,
    discountPercent: 50,
  },
  {
    id: 110,
    imageUrl: "/images/recommended/miu_sweats.jpg",
    title: "Miu Miu Logo Sweatpants",
    description: "Retail SGD 1,960. Excellent condition (see pictures).",
    productPrice: 5,
  },
  {
    id: 111,
    imageUrl: "/images/recommended/title.jpg",
    title: "UNIQLOCK Montu Shirt XLv",
    description: "Montu Blue Palm Leaf Shirt XLv. Casual with pearl button.",
    productPrice: 22,
  },
];

export default function TrendingNow() {
  const scrollRef = useRef(null);

  const scroll = (dir) => {
    scrollRef.current?.scrollBy({
      left: dir === "left" ? -320 : 320,
      behavior: "smooth",
    });
  };

  return (
    <section className="w-full pt-[50px]">
      <div className="w-full ">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-[15] mb-2 lg">
          <h2 className="text-xl sm:text-xl font-bold text-gray-900 ">
            Trending now
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

        {/* Scrollable Cards */}
        <div
          ref={scrollRef}
          className="flex gap-[26] overflow-x-auto scroll-smooth no-scrollbar px-[2px] py-1"
        >
          {trendingItems.map((item) => {
            const price =
              typeof item.productPrice === "number"
                ? item.discountPercent
                  ? (item.productPrice * (100 - item.discountPercent)) / 100
                  : item.productPrice
                : 0;

            return (
              <div
                key={item.id}
                // className="flex-shrink-0 min-w-[240px] max-w-[240px] h-[352px]"
                className="flex-shrink-0 w-[211px] sm:w-[230px] md:w-[220px] lg:w-[240px] h-[340px]"
              >
                <ProductCart
                  id={item.id}
                  imageUrl={item.imageUrl}
                  title={item.title}
                  description={item.description}
                  price={price.toFixed(2)}
                  originalPrice={
                    item.discountPercent ? item.productPrice : null
                  }
                  discountText={
                    item.discountPercent ? `${item.discountPercent}% OFF` : null
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
