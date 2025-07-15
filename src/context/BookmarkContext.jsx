"use client";
import { createContext, useContext, useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import {
  fetchFavouritesByUserId,
  addToFavourites,
  removeFromFavourites,
} from "@/components/services/bookMark.service";
import { toast } from "react-hot-toast";

const BookmarkContext = createContext();

export const BookmarkProvider = ({ children }) => {
  const [bookmarks, setBookmarks] = useState([]);
  const [isReady, setIsReady] = useState(false);
  const [hasNewBookmark, setHasNewBookmark] = useState(false);
  const { data: session, status } = useSession();

  const transformBookmark = (item) => {
    if (item.product) {
      return {
        id: item.productId,
        imageUrl: item.product.fileUrls?.[0] || "/images/placeholder-product.jpg",
        title: item.product.productName || "Untitled Product",
        description: item.product.description || "No description available",
        price: item.product.productPrice?.toString() || "0",
        originalPrice: item.product.originalPrice?.toString() || null,
        discountPercent: item.product.discountPercent || 0,
        condition: item.product.condition,
        location: item.product.location,
        allImages: item.product.fileUrls || [],
      };
    }
    return {
      id: item.id,
      imageUrl: item.imageUrl || "/images/placeholder-product.jpg",
      title: item.title || "Untitled Product",
      description: item.description || "No description available",
      price: item.price?.toString() || "0",
      originalPrice: item.originalPrice?.toString() || null,
      discountPercent: item.discountPercent || 0,
      condition: item.condition,
      location: item.location,
      allImages: item.allImages || [],
    };
  };

  useEffect(() => {
    const initializeBookmarks = async () => {
      try {
        const localBookmarks = JSON.parse(localStorage.getItem("bookmarks") || "[]")
          .map(transformBookmark);

        // Handle unauthenticated state by clearing bookmarks
        if (status === "unauthenticated") {
          setBookmarks([]);
          localStorage.removeItem("bookmarks");
          return;
        }

        setBookmarks(localBookmarks);

        if (status === "authenticated") {
          try {
            const apiBookmarks = await fetchFavouritesByUserId(
              session.user.id,
              session.accessToken
            );

            const transformedApiBookmarks = apiBookmarks.map(transformBookmark);

            const merged = [
              ...transformedApiBookmarks,
              ...localBookmarks.filter(
                local => !transformedApiBookmarks.some(api => api.id === local.id)
              ),
            ];

            setBookmarks(merged);
            localStorage.setItem("bookmarks", JSON.stringify(merged));
          } catch (apiError) {
            console.log("Using local bookmarks due to sync error:", apiError.message);
          }
        }
      } catch (error) {
        console.error("Bookmark initialization failed:", error);
        toast.error("Failed to load favorites");
      } finally {
        setIsReady(true);
      }
    };

    initializeBookmarks();
  }, [status, session?.user?.id]);

  useEffect(() => {
    if (isReady) {
      localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
    }
  }, [bookmarks, isReady]);

  const toggleBookmark = async (product) => {
    try {
      const existing = bookmarks.some(item => item.id === product.id);
      let newBookmarks;

      if (existing) {
        newBookmarks = bookmarks.filter(item => item.id !== product.id);
        if (status === "authenticated") {
          await removeFromFavourites(product.id, session.user.id, session.accessToken);
          toast.success("Removed from favorites");
        }
      } else {
        newBookmarks = [...bookmarks, transformBookmark(product)];
        if (status === "authenticated") {
          await addToFavourites({
            productId: product.id,
            userId: session.user.id,
          }, session.accessToken);
          toast.success("Added to favorites");
        }
        setHasNewBookmark(true);
        setTimeout(() => setHasNewBookmark(false), 3000);
      }

      setBookmarks(newBookmarks);
    } catch (error) {
      console.error("Bookmark toggle failed:", error);
      toast.error(error.message || "Failed to update favorites");
      throw error;
    }
  };

  const clearNewBookmarkNotification = () => {
    setHasNewBookmark(false);
  };

  return (
    <BookmarkContext.Provider
      value={{
        bookmarks,
        toggleBookmark,
        isBookmarked: (id) => bookmarks.some(item => item.id === id),
        isReady,
        hasNewBookmark,
        clearNewBookmarkNotification,
      }}
    >
      {children}
    </BookmarkContext.Provider>
  );
};

export const useBookmark = () => useContext(BookmarkContext);
