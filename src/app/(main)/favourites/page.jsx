"use client";
import { useBookmark } from "@/context/BookmarkContext";
import CartInBookmarkPage from "@/components/profile/someComponent/CartInBookmarkPage";
import { useEffect, useState } from "react";
<<<<<<< HEAD

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
=======
import { fetchFavouritesByUserId } from "@/components/services/Bookmark.service";

// Skeleton loader component
const SkeletonCard = () => (
  <div className="w-full animate-pulse bg-gray-100 p-4 rounded-2xl shadow-md sm:w-[220px] max-w-sm">
    <div className="h-40 bg-gray-300 rounded-md mb-4" />
    <div className="h-4 bg-gray-300 rounded w-3/4 mb-2" />
    <div className="h-4 bg-gray-200 rounded w-1/2" />
  </div>
);

export default function FavoritePage() {
  const { bookmarks, setBookmarks, token, userId } = useBookmark();
  const [loading, setLoading] = useState(true);

  // Fetch latest data when component mounts or when token/userId changes
  useEffect(() => {
    const fetchData = async () => {
      if (!token || !userId) return;
      setLoading(true);
      try {
        const data = await fetchFavouritesByUserId(userId, token);
        setBookmarks(data || []);
      } catch (err) {
        console.error("Failed to fetch updated favorites", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [token, userId]); // Or add a manual reload trigger

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
                  product={item.product}
                />
              ))}
            </div>
          )}
>>>>>>> 2ae46c46d22d602588e08349358b04a77243d1f2
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
                    key={`${item.id}-${item.title}`} // Added unique key combining id and title
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