"use client";

import { useState, useEffect } from "react";
import ProductCart from "@/components/domain/ProductCart";
import { fetchRecommendedProducts } from "@/app/action/landingAction";

export default function RecommendedList() {
  const [visibleCount, setVisibleCount] = useState(25);
  const [recommendedItems, setRecommendedItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchRecommendedProducts();
        setRecommendedItems(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const handleViewMore = () => {
    setVisibleCount((prev) => prev + 20);
  };

  const itemsToShow = recommendedItems.slice(0, visibleCount);

  // if (loading) {
  //   return (
  //     <div className="flex justify-center items-center h-64">
  //       <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
  //     </div>
  //   );
  // }

  // if (error) {
  //   return (
  //     <div className="text-center py-8 text-red-500">
  //       Error loading products: {error}
  //     </div>
  //   );
  // }

  // if (recommendedItems.length === 0 && !loading) {
  //   return (
  //     <div className="text-center py-8 text-gray-500">
  //       No recommended products available
  //     </div>
  //   );
  // }

  return (
    <section className="w-full pt-[5px] md:pt-[40px] lg:pt-[40px] mb-[40px]">
      <div className="w-full">
        <h2 className="text-xl sm:text-xl font-bold text-gray-900 mb-4">
          Recommended For You
        </h2>

        <div className="grid grid-cols-2 px-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-[26] justify-items-center">
          {itemsToShow.map((item) => {
            const price = item.discountPercent
              ? (item.productPrice * (100 - item.discountPercent)) / 100
              : item.productPrice;

            return (
              <ProductCart
                key={item.id}
                id={item.id}
                imageUrl={item.imageUrl}
                title={item.title}
                description={item.description}
                price={price.toFixed(2)}
                originalPrice={item.discountPercent ? item.productPrice : null}
                discountText={
                  item.discountPercent ? `${item.discountPercent}% OFF` : null
                }
              />
            );
          })}
        </div>

        {visibleCount < recommendedItems.length && (
          <div className="text-center mt-8">
            <button
              onClick={handleViewMore}
              className="px-6 py-2 mt-2 bg-orange-500 text-white rounded-full hover:bg-orange-600 transition"
            >
              View more
            </button>
          </div>
        )}
      </div>
    </section>
  );
}