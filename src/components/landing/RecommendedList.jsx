'use client';

import { useState, useEffect } from "react";
import ProductCart from "../domain/ProductCart";
import { productService } from "../services/allProduct.service";

// Skeleton loader component
const SkeletonCard = () => (
  <div className="w-full animate-pulse bg-gray-100 p-4 rounded-lg">
    <div className="h-40 bg-gray-300 rounded-md mb-4" />
    <div className="h-4 bg-gray-300 rounded w-3/4 mb-2" />
    <div className="h-4 bg-gray-200 rounded w-1/2" />
  </div>
);

export default function RecommendedList() {
  const [items, setItems] = useState([]);
  const [visibleCount, setVisibleCount] = useState(25);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState(null);

  const handleViewMore = () => {
    setLoadingMore(true);
    // Simulate network delay for demo purposes
    setTimeout(() => {
      setVisibleCount((prev) => prev + 25);
      setLoadingMore(false);
    }, 800);
  };

  useEffect(() => {
    async function fetchRecommended() {
      setLoading(true);
      setError(null);
      try {
        const products = await productService.fetchRecommendedProducts();
        setItems(products);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchRecommended();
  }, []);

  const itemsToShow = items.slice(0, visibleCount);

  return (
    <section className="w-full pt-5 md:pt-10 mb-10">
      <div className="w-full">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">
          Recommended For You
        </h2>

        {error && (
          <p className="text-red-500 mb-4">
            Failed to load recommended products: {error}
          </p>
        )}

        <div className="grid grid-cols-2 px-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 justify-items-center">
          {loading
            ? Array.from({ length: 10 }).map((_, index) => (
                <SkeletonCard key={index} />
              ))
            : itemsToShow.map((item) => {
                const price =
                  typeof item.productPrice === "number"
                    ? item.discountPercent && item.discountPercent > 0
                      ? (item.productPrice * (100 - item.discountPercent)) / 100
                      : item.productPrice
                    : 0;

                return (
                  <ProductCart
                    key={item.productId}
                    id={item.productId}
                    imageUrl={item.fileUrls?.[0] || "/default-image.jpg"}
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
                );
              })}
        </div>

        {!loading && visibleCount < items.length && (
          <div className="text-center mt-8">
            <button
              onClick={handleViewMore}
              disabled={loadingMore}
              className={`px-6 py-2 mt-2 bg-orange-500 text-white rounded-full hover:bg-orange-600 transition flex items-center justify-center mx-auto ${
                loadingMore ? "opacity-75 cursor-not-allowed" : ""
              }`}
            >
              {loadingMore ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white mr-2"></div>
                  Loading...
                </>
              ) : (
                "View more"
              )}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}