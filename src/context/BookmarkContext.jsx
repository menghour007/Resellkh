"use client";

import { createContext, useContext, useState, useEffect } from "react";
import {
  fetchFavouritesByUserId,
  addToFavourites,
  removeFromFavourites,
} from "@/components/services/Bookmark.service";

const BookmarkContext = createContext();

function parseJwt(token) {
  if (!token) return null;
  try {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join("")
    );
    return JSON.parse(jsonPayload);
  } catch (error) {
    console.error("Failed to decode JWT:", error);
    return null;
  }
}

export const BookmarkProvider = ({ children }) => {
  const [bookmarks, setBookmarks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [token, setToken] = useState(null);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    setToken(storedToken);
    if (storedToken) {
      const decoded = parseJwt(storedToken);
      if (decoded && decoded.userId) {
        setUserId(decoded.userId);
      } else {
        console.warn("userId not found in token.");
      }
    }
  }, []);

  useEffect(() => {
    if (!token || !userId) {
      setLoading(false);
      return;
    }

    const loadBookmarks = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchFavouritesByUserId(userId, token);
        setBookmarks(data || []);
      } catch (error) {
        console.error("Error fetching bookmarks:", error);
        setError("Could not load favorites.");
      } finally {
        setLoading(false);
      }
    };

    loadBookmarks();
  }, [token, userId]);

  // const toggleBookmark = async (product) => {
  //   if (!token || !product?.productId) {
  //     console.error("Cannot toggle bookmark: missing token or product ID.");
  //     console.warn("Token:", token);
  //     console.warn("Product:", product);
  //     return;
  //   }

  //   const existing = bookmarks.find(
  //     (b) => b.product?.productId === product.productId || b.productId === product.productId
  //   );

  //   const prevBookmarks = [...bookmarks];

  //   if (existing) {
  //     setBookmarks((prev) =>
  //       prev.filter((b) => (b.product?.productId || b.productId) !== product.productId)
  //     );
  //     try {
  //       await removeFromFavourites(product.productId, userId, token);
  //     } catch (err) {
  //       console.error("Failed to remove:", err.message);
  //       setBookmarks(prevBookmarks);
  //     }
  //   } else {
  //     try {
  //       const res = await addToFavourites(product, token);
  //       if (res && res.payload) {
  //         setBookmarks((prev) => [...prev, res.payload]);
  //       } else {
  //         throw new Error("Invalid response from server.");
  //       }
  //     } catch (err) {
  //       console.error("Failed to add:", err.message);
  //     }
  //   }
  // };

  // this is new working toggleBookmark function

  const toggleBookmark = async (product) => {
  if (!token || !product?.productId || !userId) {
    console.error("Cannot toggle bookmark: missing token, userId, or product ID.");
    return;
  }

  const existing = bookmarks.find(
    (b) => (b.product?.productId || b.productId) === product.productId
  );

  const prevBookmarks = [...bookmarks];

  if (existing) {
    setBookmarks((prev) =>
      prev.filter((b) => (b.product?.productId || b.productId) !== product.productId)
    );
    try {
      await removeFromFavourites(product.productId, userId, token);
    } catch (err) {
      console.error("Failed to remove:", err.message);
      setBookmarks(prevBookmarks);
    }
  } else {
    try {
      const body = {
        userId,
        productId: product.productId,
        createdAt: new Date().toISOString(), // Optional, backend may generate it
      };

      const res = await addToFavourites(body, token);

      if (res && res.payload) {
        setBookmarks((prev) => [...prev, res.payload]);
      } else {
        throw new Error("Invalid response from server.");
      }
    } catch (err) {
      console.error("Failed to add:", err.message);
    }
  }
};


  const isBookmarked = (id) =>
    bookmarks.some((item) => item.product?.productId === id || item.productId === id);

  return (
    <BookmarkContext.Provider
      value={{ bookmarks, toggleBookmark, isBookmarked, loading, error }}
    >
      {children}
    </BookmarkContext.Provider>
  );
};

export const useBookmark = () => useContext(BookmarkContext);