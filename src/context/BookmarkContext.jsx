"use client";

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

  // Provide the data and functions to children
  return (
    <BookmarkContext.Provider
      value={{ bookmarks, toggleBookmark, isBookmarked, loading, setBookmarks,token, userId }}
    >
      {children}
    </BookmarkContext.Provider>
  );
};


export const useBookmark = () => useContext(BookmarkContext);
