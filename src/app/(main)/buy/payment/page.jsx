// src/app/(main)/buy/payment/page.jsx
"use client";

import React, { useState, useEffect, useCallback } from "react"; // Added useCallback
import Image from "next/image";
// Corrected import paths using aliases as per jsconfig.json
import OrderSummary from "@/components/buy/OrderSummary";
import Order from "@/components/buy/Order"; // This is your 'ShoppingCart' component

// --- Skeleton Component for the cart page ---
const CartPageSkeleton = () => (
  <main className="bg-gray-50 min-h-screen font-sans">
    <div className="container mx-auto px-4 py-8 lg:py-12">
      <div className="flex flex-col lg:flex-row lg:space-x-8 animate-pulse">
        {/* Order Summary Skeleton (left side) */}
        <div className="w-full lg:w-1/2 bg-white p-6 lg:p-8 rounded-xl shadow-lg">
          <div className="h-8 bg-gray-200 rounded w-3/4 mb-6"></div>
          <div className="divide-y divide-gray-200">
            {[1, 2, 3].map((i) => (
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

        {/* Order (Shopping Cart) Skeleton (right side) */}
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
// --- END NEW Skeleton Component ---


export default function PaymentPage() {
  const [items, setItems] = useState([]); // All items in the cart, managed by this page
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedItemsForOrder, setSelectedItemsForOrder] = useState([]); // Items passed to the Order component

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
          productId: cartItem.productId, // This MUST be unique and present
          productName: cartItem.product?.productName || "Unknown Product",
          productPrice: cartItem.product?.productPrice, // This MUST be a number
          description: cartItem.product?.description,
          condition: cartItem.product?.condition,
          fileUrls: cartItem.product?.fileUrls || [],
          quantity: cartItem.quantity, // This MUST be a number
          // Add any other relevant product/cart item fields from your API response here
          // that OrderItem or OrderSummary might need (e.g., storeName, originalPrice etc.)
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

  // Handler for when an item is successfully removed via API call in OrderItem
  const handleRemoveItem = (productIdToRemove) => {
    setItems((currentItems) =>
      currentItems.filter((item) => item.productId !== productIdToRemove)
    );
    // Also remove from selectedItemsForOrder if it was there
    setSelectedItemsForOrder(prevSelected => prevSelected.filter(item => item.productId !== productIdToRemove));
  };

  // Callback to receive selected items from OrderSummary
  const handleSelectedItemsChange = useCallback((itemsFromOrderSummary) => {
    setSelectedItemsForOrder(itemsFromOrderSummary);
  }, []); // Empty dependency array means this function is stable and won't cause re-renders

  if (loading) {
    return <CartPageSkeleton />; // Render the skeleton when loading
  }

  if (error) {
    return (
      <main className="bg-gray-50 min-h-screen font-sans flex items-center justify-center">
        <p className="text-red-600 text-lg">Error: {error.message}</p>
      </main>
    );
  }

  if (!loading && items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center min-h-screen">
        <Image
          src="/images/story set/no listings.jpg" // Ensure this path is correct in your public folder
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
            initialItems={items} // Pass all items here
            onRemove={handleRemoveItem}
            onSelectedItemsChange={handleSelectedItemsChange} // New prop to get selected items
          />
          {/* Order component is always rendered and receives the currently selected items */}
          <Order items={selectedItemsForOrder} />
        </div>
      </div>
    </main>
  );
}