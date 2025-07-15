// ProductCart.js
"use client";

import Image from "next/image";
import { FaRegBookmark, FaBookmark } from "react-icons/fa";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useBookmark } from "@/context/BookmarkContext";
import { encryptId } from "@/utils/encryption";
import { FaShoppingCart } from "react-icons/fa";

export default function ProductCart({
  id,
  imageUrl,
  title,
  description,
  price,
  originalPrice = null,
  discountText = null,
}) {
  const { toggleBookmark, isBookmarked, removeBookmark } = useBookmark();
  const { data: session } = useSession();
  const bookmarked = isBookmarked(id);
  const router = useRouter();
  const [isAnimating, setIsAnimating] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const getDiscountPercent = () => {
    if (discountText) {
      const match = discountText.match(/\d+/);
      return match ? parseInt(match[0]) : null;
    }
    return null;
  };

  const handleToggle = (e) => {
    e.stopPropagation();

    if (!session) {
      if (bookmarked) {
        removeBookmark(id);
      }
      router.push(`/login?callbackUrl=${encodeURIComponent(window.location.pathname)}`);
      toast("Please login to save favorites", {
        icon: "🔒",
        style: {
          borderRadius: "8px",
          background: "#fff",
          color: "#333",
          padding: "8px 16px",
        },
      });
      return;
    }

    toggleBookmark({
      id,
      imageUrl,
      title,
      description,
      price,
      originalPrice,
      discountPercent: getDiscountPercent(),
    });

    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 300);
  };

  const handleAddToCart = async (e) => {
    e.stopPropagation();

    if (!session) {
      toast("Please login to add items to cart", {
        icon: "🔒",
        style: {
          borderRadius: "8px",
          background: "#fff",
          color: "#333",
          padding: "8px 16px",
        },
      });
      router.push(`/login?callbackUrl=${encodeURIComponent(window.location.pathname)}`);
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Authentication token not found. Please log in.");
      return;
    }
    
    // Quantity to add (default to 1)
    const quantityToAdd = 1; 
    const apiUrl = `https://phil-whom-hide-lynn.trycloudflare.com/api/v1/cart/add?productId=${id}&quantity=${quantityToAdd}`;

    // --- OPTIMISTIC UI UPDATE: Dispatch event BEFORE API call ---
    // Create a CustomEvent to pass data
    const cartUpdatedEvent = new CustomEvent('cart-updated', {
      detail: { type: 'increment', quantity: quantityToAdd }
    });
    window.dispatchEvent(cartUpdatedEvent); // Dispatch the event immediately

    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'accept': '*/*',
          'Authorization': `Bearer ${token}`
        },
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ message: 'Failed to add to cart due to server error.' }));
        throw new Error(errorData.message || 'Failed to add to cart.');
      }

      const result = await response.json();
      toast.success(result.message || "Product added to cart!");

      // If API confirms, nothing more to do for count (it's already optimistically updated)
      // If you need to re-sync with server's exact count, you could dispatch a 'refetch' event type here
      // or check the response payload for a new total.

    } catch (error) {
      console.error("Error adding to cart:", error);
      toast.error(error.message || "Failed to add product to cart.");
      // --- REVERT OPTIMISTIC UPDATE ON FAILURE ---
      const cartRevertEvent = new CustomEvent('cart-updated', {
        detail: { type: 'decrement', quantity: quantityToAdd } // Or 'refetch'
      });
      window.dispatchEvent(cartRevertEvent);
    }
  };


  const encryptedProductId = encodeURIComponent(encryptId(id));

  const handleCardClick = () => {
    router.push(`/product/${encryptedProductId}`);
  };

  if (session === "loading") {
    return null;
  }

  return (
    <div
      className="flex flex-col cursor-pointer bg-white rounded-2xl border border-gray-200 overflow-hidden transition-transform w-full sm:w-[240px] max-w-sm group"
      onClick={handleCardClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative w-full aspect-[4/3] sm:h-[220px]">
        {discountText && (
          <div className="absolute top-2 left-2 bg-red-600 text-white text-[10px] font-semibold px-2 py-[2px] rounded-full z-10 shadow">
            {discountText}
          </div>
        )}
        <Image
          src={imageUrl}
          alt={title}
          fill
          sizes="(max-width: 640px) 100vw, 240px"
          style={{ objectFit: "cover" }}
          className="object-center"
        />

        {/* Add to Cart Icon - positioned at top-1 right-2, visible on hover */}
        <div className="absolute top-1 right-2 z-20">
          <button
            onClick={handleAddToCart}
            className={`transition-opacity duration-300 p-2 rounded-full bg-[#F97316] text-white shadow-lg ${
              isHovered ? 'opacity-100' : 'opacity-0'
            } focus:outline-none focus:ring-2 focus:ring-[#F97316] focus:ring-opacity-75`}
            aria-label="Add to cart"
          >
            <FaShoppingCart size={20} />
          </button>
        </div>

      </div>

      <div className="flex flex-col justify-between px-4 py-3 flex-grow">
        <div>
          <h3 className="text-sm font-semibold text-gray-800 truncate">{title}</h3>
          <p className="mt-1 text-[13px] text-gray-600 leading-snug line-clamp-2 h-[35px]">
            {description}
          </p>
        </div>

        <div className="mt-2 flex items-center justify-between">
          <div className="flex items-baseline space-x-1">
            <span className="text-[#F97316] font-bold text-sm">${price}</span>
            {originalPrice && (
              <span className="text-gray-400 line-through text-[13px]">${originalPrice}</span>
            )}
          </div>
          <div
            className={`cursor-pointer relative group transition-transform duration-300 ${
              isAnimating ? "scale-125" : "scale-100"
            } ${bookmarked ? "text-orange-500" : "text-gray-400"}`}
            onClick={(e) => handleToggle(e)}
          >
            {bookmarked ? <FaBookmark size={18} /> : <FaRegBookmark size={18} />}
            {!session && (
              <span className="absolute hidden group-hover:block -top-8 -left-4 bg-gray-800 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                Login to save
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}