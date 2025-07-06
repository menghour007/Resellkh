"use client";

import { useBookmark } from "@/context/BookmarkContext";
import CartInBookmarkPage from "@/components/profile/someComponent/CartInBookmarkPage";
import { useEffect, useState } from "react";

// Skeleton loader component
const SkeletonCard = () => (
  <div className="w-full animate-pulse bg-gray-100 p-4 rounded-2xl shadow-md sm:w-[220px] max-w-sm">
    <div className="h-40 bg-gray-300 rounded-md mb-4" />
    <div className="h-4 bg-gray-300 rounded w-3/4 mb-2" />
    <div className="h-4 bg-gray-200 rounded w-1/2" />
  </div>
);

export default function FavoritePage() {
  const { bookmarks } = useBookmark();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 500);
    return () => clearTimeout(timeout);
  }, [bookmarks]);

  const safeBookmarks = Array.isArray(bookmarks) ? bookmarks : [];

  return (
    <div className="px-[7%]">
      <div className="p-4 md:p-6">
        <div className="p-4 rounded-[24px] border border-gray-200">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
            <h2 className="text-lg font-semibold text-gray-800">Favorites</h2>
          </div>

          {loading ? (
            <div className="grid grid-cols-2 sm:grid-cols-2 px-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 justify-items-center">
              {Array.from({ length: 10 }).map((_, i) => (
                <SkeletonCard key={`skeleton-${i}`} />
              ))}
            </div>
          ) : safeBookmarks.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <img
                src="/images/story set/no fav.jpg"
                alt="No favorites"
                className="w-[350px] h-auto mb-6"
              />
              <h2 className="font-semibold text-xl mb-2">Nothing to see here yet</h2>
              <span className="text-sm text-gray-600">
                Start favoriting items to compare, shop, and keep track of things you love.
              </span>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-2 px-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 justify-items-center">
              {safeBookmarks.map((item) => (
                <CartInBookmarkPage
                    key={item.favouriteId}
                    id={item.productId}
                    imageUrl={item.product?.fileUrls?.[0] || "/default-image.jpg"}
                    title={item.product?.productName}
                    description={item.product?.description}
                    price={item.product?.productPrice.toFixed(2)}
                    originalPrice={
                      item.product?.discountPercent > 0 ? item.product?.originalPrice : null
                    }
                    discountText={
                      item.product?.discountPercent
                        ? `${item.product?.discountPercent}% OFF`
                        : null
                    }
                    // the card can call toggleBookmark easily.
                    product={item.product}
                  />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}