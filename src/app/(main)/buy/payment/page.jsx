"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import OrderSummary from "@/components/buy/OrderSummary";
import Order from "@/components/buy/Order";

// --- Skeleton Component for the cart page ---
const CartPageSkeleton = () => (
  <main className="bg-gray-50 min-h-screen font-sans">
    <div className="container mx-auto px-4 py-8 lg:py-12">
      <div className="flex flex-col lg:flex-row lg:space-x-8 animate-pulse">
        {/* Order Summary Skeleton */}
        <div className="w-full lg:w-1/2 bg-white p-6 lg:p-8 rounded-xl shadow-lg">
          <div className="h-8 bg-gray-200 rounded w-3/4 mb-6"></div>
          <div className="divide-y divide-gray-200">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="flex items-center py-4">
                <div className="w-20 h-20 bg-gray-200 rounded-md flex-shrink-0 mr-4"></div>
                <div className="flex-grow space-y-2">
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/4"></div>
                </div>
                <div className="w-6 h-6 bg-gray-200 rounded-full ml-4"></div>
              </div>
            ))}
          </div>
        </div>

        {/* Shopping Cart Skeleton */}
        <div className="w-full lg:w-1/2 bg-white p-6 lg:p-8 rounded-xl shadow-lg mt-8 lg:mt-0">
          <div className="h-8 bg-gray-200 rounded w-3/4 mb-6"></div>
          <div className="space-y-4">
            <div className="h-10 bg-gray-200 rounded"></div>
            <div className="h-10 bg-gray-200 rounded"></div>
            <div className="h-10 bg-gray-200 rounded"></div>
            <div className="h-10 bg-gray-200 rounded w-1/2"></div>
            <div className="h-12 bg-orange-300 rounded w-full mt-6"></div>
          </div>
        </div>
      </div>
    </div>
  </main>
);

// --- Custom Hook for Fetching Cart Items ---
const useCart = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchCartItems = useCallback(async () => {
    setLoading(true);
    setError(null);

    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");

    if (!token || !userId) {
      setLoading(false);
      setError(new Error("User ID or authentication token not found. Please log in."));
      return;
    }

    try {
      const response = await fetch(`https://phil-whom-hide-lynn.trycloudflare.com/api/v1/cart/user/${userId}`, {
        method: 'GET',
        headers: {
          'Accept': '*/*',
          'Authorization': `Bearer ${token}`
        }
      });

      const data = await response.json();

      const transformedItems = data.payload.map(cartItem => ({
        cartId: cartItem.cartId,
        userId: cartItem.userId,
        productId: cartItem.productId,
        productName: cartItem.product?.productName || "Unknown Product",
        productPrice: cartItem.product?.productPrice,
        description: cartItem.product?.description,
        condition: cartItem.product?.condition,
        fileUrls: cartItem.product?.fileUrls || [],
        quantity: cartItem.quantity,
      }));

      setItems(transformedItems);
    } catch (e) {
      setError(e);
      console.error("Error fetching cart items:", e);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCartItems();
  }, [fetchCartItems]);

  // Remove item from cart
  const handleRemoveItem = useCallback((productIdToRemove) => {
    setItems(currentItems =>
      currentItems.filter(item => item.productId !== productIdToRemove)
    );
  }, []);

  return { items, loading, error, handleRemoveItem };
};

// --- Main BuyPage Component ---
export default function BuyPage() {
  const { items, loading, error, handleRemoveItem } = useCart();
  const [selectedItemsForOrder, setSelectedItemsForOrder] = useState([]);

  // Callback to receive selected items from OrderSummary
  const handleSelectedItemsChange = useCallback((itemsFromOrderSummary) => {
    setSelectedItemsForOrder(itemsFromOrderSummary);
  }, []);

  if (loading) {
    return <CartPageSkeleton />;
  }

  if (error) {
    return (
      <main className="bg-gray-50 min-h-screen font-sans flex items-center justify-center">
        <p className="text-red-500 text-lg">Error: {error.message}</p>
      </main>
    );
  }

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center min-h-screen">
        <Image
          src="/images/story set/no listings.jpg"
          alt="No Listings"
          width={350}
          height={350}
          className="mb-6"
        />
        <p className="text-gray-600 text-lg">Your cart is empty.</p>
      </div>
    );
  }

  return (
    <main className="bg-gray-50 min-h-screen font-sans">
      <div className="container mx-auto px-4 py-8 lg:py-12">
        <div className="flex flex-col lg:flex-row lg:space-x-8">
          {/* OrderSummary receives all items and communicates selected items back */}
          <OrderSummary
            initialItems={items}
            onRemove={handleRemoveItem}
            onSelectedItemsChange={handleSelectedItemsChange}
          />
          {/* Order component receives the currently selected items */}
          <Order items={selectedItemsForOrder} />
        </div>
      </div>
    </main>
  );
}