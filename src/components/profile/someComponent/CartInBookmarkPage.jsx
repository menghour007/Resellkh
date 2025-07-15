"use client";
import { useState } from "react";
import Image from "next/image";
import { FaRegBookmark, FaBookmark } from "react-icons/fa";
import { useBookmark } from "@/context/BookmarkContext";
import { toast } from "react-hot-toast";
import ConfirmModal from "./ConfirmModal";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

export default function CartInBookmarkPage({
  id,
  imageUrl,
  title,
  description,
  price,
  originalPrice = null,
  discountPercent = 0,
  condition,
  location,
  allImages = []
}) {
  const { data: session } = useSession();
  const { toggleBookmark, isBookmarked } = useBookmark();
  const bookmarked = isBookmarked(id);
  const [isAnimating, setIsAnimating] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const router = useRouter();

  // Safe defaults for all fields
  const safeImageUrl = imageUrl || allImages?.[0] || "/images/placeholder-product.jpg";
  const safeTitle = title || "Untitled Product";
  const safeDescription = description || "No description available";
  const safePrice = price?.toString() || "0";
  const discountText = discountPercent > 0 ? `${discountPercent}% OFF` : null;

  const handleBookmarkClick = async (e) => {
    e.stopPropagation();
    
    // Redirect to login if not authenticated
    if (!session) {
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

    if (isProcessing) return;
    setIsProcessing(true);
    
    try {
      if (bookmarked) {
        setShowModal(true);
      } else {
        await toggleBookmark({
          id,
          imageUrl: safeImageUrl,
          title: safeTitle,
          description: safeDescription,
          price: safePrice,
          originalPrice: originalPrice?.toString(),
          discountPercent,
          condition,
          location,
          allImages
        });

        setIsAnimating(true);
        setTimeout(() => setIsAnimating(false), 300);
      }
    } catch (error) {
      toast.error(error.message || "Failed to update favorites");
    } finally {
      setIsProcessing(false);
    }
  };

  const confirmRemove = async () => {
    setIsProcessing(true);
    try {
      await toggleBookmark({
        id,
        imageUrl: safeImageUrl,
        title: safeTitle,
        description: safeDescription,
        price: safePrice,
        originalPrice: originalPrice?.toString(),
        discountPercent,
        condition,
        location,
        allImages
      });

      setShowModal(false);
      setIsAnimating(true);
      setTimeout(() => setIsAnimating(false), 300);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleCardClick = () => {
    router.push(`/product/${id}`);
  };

  return (
    <>
      <div className="flex flex-col bg-white rounded-2xl shadow-md overflow-hidden transition-transform w-full sm:w-[220px] max-w-sm" onClick={handleCardClick}>
        <div className="relative w-full aspect-[4/3] sm:h-[220px]">
          {discountText && (
            <div className="absolute top-2 left-2 bg-red-600 text-white text-[10px] font-semibold px-2 py-[2px] rounded-full z-10 shadow">
              {discountText}
            </div>
          )}
          <Image
            src={safeImageUrl}
            alt={safeTitle}
            fill
            sizes="(max-width: 640px) 100vw, 240px"
            className="object-cover rounded-t-2xl"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "/images/placeholder-product.jpg";
            }}
          />
        </div>

        <div className="flex flex-col justify-between px-4 py-3 flex-grow">
          <div>
            <h3 className="text-sm font-semibold text-gray-800 line-clamp-1">{safeTitle}</h3>
            <p className="mt-1 text-[13px] text-gray-600 leading-snug line-clamp-2">{safeDescription}</p>
            {condition && <p className="mt-1 text-xs text-gray-500">Condition: {condition}</p>}
          </div>

          <div className="mt-2 flex items-center justify-between">
            <div className="flex items-baseline space-x-1">
              <span className="text-[#F97316] font-bold text-sm">${safePrice}</span>
              {originalPrice && (
                <span className="text-gray-400 line-through text-[13px]">${originalPrice}</span>
              )}
            </div>
            <div
              className={`cursor-pointer transition-transform duration-300 ${
                isAnimating ? "scale-125" : "scale-100"
              } ${bookmarked ? "text-orange-500" : "text-gray-400"} ${
                isProcessing ? "opacity-50 pointer-events-none" : ""
              }`}
              onClick={handleBookmarkClick}
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

      <ConfirmModal
        isOpen={showModal}
        onClose={() => !isProcessing && setShowModal(false)}
        onConfirm={confirmRemove}
        title="Remove from Favorites?"
        message="Are you sure you want to remove this item from your favorites?"
        isProcessing={isProcessing}
      />
    </>
  );
}