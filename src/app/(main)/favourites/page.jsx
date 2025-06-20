
"use client";

import { useBookmark } from "@/context/BookmarkContext";
import CartInBookmarkPage from "@/components/profile/someComponent/CartInBookmarkPage";

export default function FavoritePage() {
  const { bookmarks } = useBookmark();
  console.log("Favorites page rendering with:", bookmarks);


  return (
    <div className="px-[7%]">
      <div className="p-4 md:p-6">
        <div className="p-4 rounded-[24px] border border-gray-200">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
            <h2 className="text-lg font-semibold text-gray-800">Favorites</h2>
          </div>

          {/* Listing Grid or Empty State */}
          {bookmarks.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <img
                src="/images/story set/no fav.jpg"
                alt="No Listings"
                className="w-[350px] h-auto mb-6"
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
                  key={item.id}
                  {...item}
                  discountText={
                    item.discountPercent ? `${item.discountPercent}% OFF` : null
                  }
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
