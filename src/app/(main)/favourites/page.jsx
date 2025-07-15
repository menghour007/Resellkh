"use client";
import { useBookmark } from "@/context/BookmarkContext";
import CartInBookmarkPage from "@/components/profile/someComponent/CartInBookmarkPage";
import { useEffect, useState } from "react";

export default function FavoritePage() {
  const { bookmarks, isReady } = useBookmark();
  const [error, setError] = useState(null);

  useEffect(() => {
    const handleError = (error) => {
      console.error("Error in FavoritePage:", error);
      setError(error.message);
    };

    window.addEventListener('error', handleError);
    return () => window.removeEventListener('error', handleError);
  }, []);

  if (error) {
    return (
      <div className="px-[7%]">
        <div className="p-4 md:p-6">
          <div className="p-4 rounded-[24px] border border-gray-200">
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <h2 className="font-semibold text-xl mb-2">Something went wrong</h2>
              <p className="text-red-500 mb-4">{error}</p>
              <button 
                onClick={() => window.location.reload()}
                className="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600"
              >
                Try Again
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!isReady) {
    return (
      <div className="px-[7%]">
        <div className="p-4 md:p-6">
          <div className="p-4 rounded-[24px] border border-gray-200">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
              <h2 className="text-lg font-semibold text-gray-800">Favorites</h2>
            </div>
            <div className="flex justify-center items-center h-64">
              <div className="animate-pulse flex space-x-4">
                <div className="flex-1 space-y-4 py-1">
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  <div className="space-y-2">
                    <div className="h-4 bg-gray-200 rounded"></div>
                    <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  try {
    return (
      <div className="px-[7%]">
        <div className="p-4 md:p-6">
          <div className="p-4 rounded-[24px] border border-gray-200">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
              <h2 className="text-lg font-semibold text-gray-800">Favorites</h2>
            </div>

            {bookmarks.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <img
                  src="/images/story set/no fav.jpg"
                  alt="No Listings"
                  className="w-[350px] h-auto mb-6"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "/images/placeholder-product.jpg";
                  }}
                />
                <h2 className="font-semibold text-xl mb-2">Nothing to see here yet</h2>
                <span className="text-sm text-gray-600">
                  Start favoriting items to compare, shop, and keep track of things you love.
                </span>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-2 px-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 justify-items-center">
                {bookmarks.map((item) => (
                  <CartInBookmarkPage
                    key={`${item.id}-${item.title}`}
                    id={item.id}
                    imageUrl={item.imageUrl}
                    title={item.title}
                    description={item.description}
                    price={item.price || "0"}
                    originalPrice={item.originalPrice || null}
                    discountText={item.discountPercent ? `${item.discountPercent}% OFF` : null}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  } catch (err) {
    console.error("Rendering error:", err);
    return (
      <div className="px-[7%]">
        <div className="p-4 md:p-6">
          <div className="p-4 rounded-[24px] border border-gray-200">
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <h2 className="font-semibold text-xl mb-2">Something went wrong</h2>
              <button 
                onClick={() => window.location.reload()}
                className="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600"
              >
                Try Again
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
