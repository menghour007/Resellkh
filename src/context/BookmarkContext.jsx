"use client";
<<<<<<< HEAD
import { createContext, useContext, useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import {
  fetchFavouritesByUserId,
  addToFavourites,
  removeFromFavourites,
} from "@/components/services/bookMark.service";
import { toast } from "react-hot-toast";
=======
>>>>>>> 2ae46c46d22d602588e08349358b04a77243d1f2

import { createContext, useContext, useEffect, useState } from "react";
import {
  fetchFavouritesByUserId,
  addToFavourites,
  removeFromFavourites,
} from "@/components/services/Bookmark.service";

// Create a context
const BookmarkContext = createContext();

// Helper function to decode JWT token
function decodeToken(token) {
  if (!token) return null;
  try {
    const base64 = token.split(".")[1];
    const decoded = JSON.parse(atob(base64));
    return decoded;
  } catch (err) {
    console.error("Invalid token");
    return null;
  }
}

// Context Provider component
export const BookmarkProvider = ({ children }) => {
  const [bookmarks, setBookmarks] = useState([]);
<<<<<<< HEAD
  const [isReady, setIsReady] = useState(false);
  const [hasNewBookmark, setHasNewBookmark] = useState(false);
  const { data: session, status } = useSession();

  // Enhanced data transformation
  const transformBookmark = (item) => {
    // Handle API response format
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
        allImages: item.product.fileUrls || []
      };
    }
    // Handle local storage format
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
      allImages: item.allImages || []
    };
  };

  // Initialize bookmarks
  useEffect(() => {
    const initializeBookmarks = async () => {
      try {
        // 1. Load from localStorage first
        const localBookmarks = JSON.parse(
          localStorage.getItem("bookmarks") || "[]"
        ).map(transformBookmark);

        setBookmarks(localBookmarks);

        // 2. If authenticated, sync with API
        if (status === "authenticated") {
          try {
            const apiBookmarks = await fetchFavouritesByUserId(
              session.user.id,
              session.accessToken
            );

            const transformedApiBookmarks = apiBookmarks.map(transformBookmark);

            // Merge bookmarks (API takes precedence)
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
            // Silently fail - we already have local bookmarks
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

  // Save to localStorage on changes
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
          await removeFromFavourites(
            product.id, 
            session.user.id, 
            session.accessToken
          );
          toast.success("Removed from favorites");
        }
      } else {
        newBookmarks = [...bookmarks, transformBookmark(product)];
        if (status === "authenticated") {
          await addToFavourites({
            productId: product.id,
            userId: session.user.id
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
=======
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState(null);
  const [token, setToken] = useState(null);

  // Get token and user ID from localStorage
  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    if (savedToken) {
      setToken(savedToken);
      const user = decodeToken(savedToken);
      if (user?.userId) {
        setUserId(user.userId);
      }
    }
  }, []);

  // Fetch bookmarks from the API
  useEffect(() => {
    if (!token || !userId) {
      setLoading(false);
      return;
    }

    const fetchBookmarks = async () => {
      try {
        const data = await fetchFavouritesByUserId(userId, token);
        setBookmarks(data || []);
      } catch (err) {
        console.error("Failed to fetch favorites:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchBookmarks();
  }, [token, userId]);

  // Add or remove product from favorites
  const toggleBookmark = async (product) => {
    if (!token || !product?.productId || !userId) {
      console.error("Missing info: token, productId, or userId");
      return;
    }

    const isAlreadyBookmarked = bookmarks.some(
      (item) =>
        (item.product?.productId || item.productId) === product.productId
    );

    if (isAlreadyBookmarked) {
      // Remove from local state first (optimistic update)
      setBookmarks((prev) =>
        prev.filter(
          (item) =>
            (item.product?.productId || item.productId) !== product.productId
        )
      );
      try {
        await removeFromFavourites(product.productId, userId, token);
      } catch (err) {
        console.error("Remove failed:", err);
      }
    } else {
      // Add new favorite
      try {
        const body = {
          userId,
          productId: product.productId,
          createdAt: new Date().toISOString(),
        };
        const res = await addToFavourites(body, token);
        if (res?.payload) {
          setBookmarks((prev) => [...prev, res.payload]);
        }
      } catch (err) {
        console.error("Add failed:", err);
      }
    }
  };

  // Check if a product is bookmarked
  const isBookmarked = (id) =>
    bookmarks.some(
      (item) => item.product?.productId === id || item.productId === id
    );
>>>>>>> 2ae46c46d22d602588e08349358b04a77243d1f2

  // Provide the data and functions to children
  return (
<<<<<<< HEAD
    <BookmarkContext.Provider value={{
      bookmarks,
      toggleBookmark,
      isBookmarked: (id) => bookmarks.some(item => item.id === id),
      isReady,
      hasNewBookmark,
      clearNewBookmarkNotification
    }}>
=======
    <BookmarkContext.Provider
      value={{ bookmarks, toggleBookmark, isBookmarked, loading, setBookmarks,token, userId }}
    >
>>>>>>> 2ae46c46d22d602588e08349358b04a77243d1f2
      {children}
    </BookmarkContext.Provider>
  );
};

<<<<<<< HEAD
export const useBookmark = () => useContext(BookmarkContext);
=======

export const useBookmark = () => useContext(BookmarkContext);
>>>>>>> 2ae46c46d22d602588e08349358b04a77243d1f2
