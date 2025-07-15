"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image"; // Import next/image for the empty cart image
import OrderSummary from "@/components/buy/OrderSummary"; // Ensure this path is correct
import ShoppingCart from "@/components/buy/Order"; // Ensure this path is correct

// --- NEW/MODIFIED: Skeleton Component for the cart page ---
const CartPageSkeleton = () => (
  <main className="bg-gray-50 min-h-screen font-sans">
    <div className="container mx-auto px-4 py-8 lg:py-12">
      <div className="flex flex-col lg:flex-row lg:space-x-8 animate-pulse"> {/* animate-pulse for the loading effect */}
        {/* Order Summary Skeleton (left side) */}
        <div className="w-full lg:w-1/2 bg-white p-6 lg:p-8 rounded-xl shadow-lg">
          <div className="h-8 bg-gray-200 rounded w-3/4 mb-6"></div> {/* Placeholder for title */}
          <div className="divide-y divide-gray-200">
            {[1, 2, 3].map((i) => ( // Placeholder for a few cart items
              <div key={i} className="flex items-center py-4">
                <div className="w-20 h-20 bg-gray-200 rounded-md flex-shrink-0 mr-4"></div> {/* Image placeholder */}
                <div className="flex-grow space-y-2">
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div> {/* Product name placeholder */}
                  <div className="h-3 bg-gray-200 rounded w-1/2"></div> {/* Price placeholder */}
                  <div className="h-3 bg-gray-200 rounded w-1/4"></div> {/* Quantity placeholder */}
                </div>
                <div className="w-6 h-6 bg-gray-200 rounded-full ml-4"></div> {/* Remove button placeholder */}
              </div>
            ))}
          </div>
        </div>

        {/* Shopping Cart (Order) Skeleton (right side) */}
        <div className="w-full lg:w-1/2 bg-white p-6 lg:p-8 rounded-xl shadow-lg mt-8 lg:mt-0">
          <div className="h-8 bg-gray-200 rounded w-3/4 mb-6"></div> {/* Placeholder for title */}
          <div className="space-y-4">
            <div className="h-10 bg-gray-200 rounded"></div> {/* Placeholder for an input field */}
            <div className="h-10 bg-gray-200 rounded"></div> {/* Another input field */}
            <div className="h-10 bg-gray-200 rounded"></div> {/* Yet another input field */}
            <div className="h-10 bg-gray-200 rounded w-1/2"></div> {/* A smaller input field */}
            <div className="h-12 bg-orange-300 rounded w-full mt-6"></div> {/* Placeholder for a primary button */}
          </div>
        </div>
      </div>
    </div>
  </main>
);
// --- END NEW Skeleton Component ---


export default function BuyPage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedUserId = localStorage.getItem("userId");

    if (!storedToken || !storedUserId) {
      setLoading(false);
      setError(new Error("User ID or authentication token not found. Please log in."));
      return;
    }

    const fetchCartItems = async () => {
      try {
        const response = await fetch(`https://phil-whom-hide-lynn.trycloudflare.com/api/v1/cart/user/${storedUserId}`, {
          method: 'GET',
          headers: {
            'accept': '*/*',
            'Authorization': `Bearer ${storedToken}`
          }
        });

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({ message: 'Unknown error' }));
          throw new Error(`HTTP error! status: ${response.status} - ${errorData.message}`);
        }

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
    };

    fetchCartItems();
  }, []); 

  const handleRemoveItem = (productIdToRemove) => {
    setItems((currentItems) =>
      currentItems.filter((item) => item.productId !== productIdToRemove)
    );
  };

  if (loading) {
    return <CartPageSkeleton />; // Render the skeleton when loading
  }

  if (error) {
    return (
      <main className="bg-gray-50 min-h-screen font-sans flex items-center justify-center">
        <p>Error: {error.message}</p>
      </main>
    );
  }

  if (!loading && items.length === 0) {
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
          <OrderSummary items={items} onRemove={handleRemoveItem} />
          <ShoppingCart items={items} />
        </div>
      </div>
    </main>
  );
}