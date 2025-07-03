"use client";

import { useState, useEffect, useRef } from "react";
import ProductCart from "@/components/domain/ProductCart";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

// Skeleton placeholder while loading
const SkeletonCard = () => (
  <div className="flex-shrink-0 w-[211px] sm:w-[230px] md:w-[220px] lg:w-[240px] h-[340px] animate-pulse bg-gray-100 rounded-lg p-3">
    <div className="h-[180px] bg-gray-300 rounded-md mb-4" />
    <div className="h-4 bg-gray-300 rounded w-3/4 mb-2" />
    <div className="h-4 bg-gray-200 rounded w-1/2" />
  </div>
);

export default function TrendingNow() {
  const [trendingItems, setTrendingItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const scrollRef = useRef(null);

  const scroll = (dir) => {
    scrollRef.current?.scrollBy({
      left: dir === "left" ? -320 : 320,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    async function fetchTrending() {
      try {
        const res = await fetch(
          "https://phil-whom-hide-lynn.trycloudflare.com/api/v1/products"
        );
        if (!res.ok) throw new Error(`Failed to fetch products: ${res.status}`);

        const data = await res.json();
        const products = data.payload || [];

        const filtered = products
          .filter((item) => item.productId >= 20 && item.productId <= 30)
          .slice(0, 10);

        setTrendingItems(filtered);
        setError(null);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchTrending();
  }, []);

  if (error) {
    return <p className="text-red-500">Failed to load products: {error}</p>;
  }

  return (
    <section className="w-full pt-[50px]">
      <div className="w-full">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-[15] mb-2">
          <h2 className="text-xl sm:text-xl font-bold text-gray-900">
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

        <div
          ref={scrollRef}
          className="flex gap-[26px] overflow-x-auto scroll-smooth no-scrollbar px-[2px] py-1"
        >
          {loading
            ? Array.from({ length: 6 }).map((_, index) => (
                <SkeletonCard key={index} />
              ))
            : trendingItems.map((item) => {
                const price =
                  typeof item.productPrice === "number"
                    ? item.discountPercent && item.discountPercent > 0
                      ? (item.productPrice * (100 - item.discountPercent)) / 100
                      : item.productPrice
                    : 0;

                return (
                  <div
                    key={item.productId}
                    className="flex-shrink-0 w-[211px] sm:w-[230px] md:w-[220px] lg:w-[240px] h-[340px]"
                  >
                    <ProductCart
                      id={item.productId}
                      imageUrl={
                        item.fileUrls?.[0] ||
                        item.imageUrl ||
                        "/default-image.jpg"
                      }
                      title={item.productName}
                      description={item.description}
                      price={price.toFixed(2)}
                      originalPrice={
                        item.discountPercent > 0 ? item.productPrice : null
                      }
                      discountText={
                        item.discountPercent > 0
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
