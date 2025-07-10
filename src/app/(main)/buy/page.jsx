'use client';

import React, { useState } from 'react';
import OrderSummary from '@/components/buy/OrderSummary';
import ShoppingCart from '@/components/buy/ShoppingCart';

// This is the main page component for the /buy route.
export default function BuyPage() {
  // State is updated to match the structure of your product JSON payload.
  // I've added a "quantity" field to each item for cart management.
  const [items, setItems] = useState([
    {
      "productId": 1,
      "productName": "Classic Red T-Shirt",
      "productPrice": 60.00,
      "description": "A comfortable and stylish red t-shirt made from 100% cotton.",
      "condition": "New",
      "fileUrls": ["https://placehold.co/80x80/f87171/ffffff?text=T"],
      "quantity": 2
    },
    {
      "productId": 2,
      "productName": "Vintage Green T-Shirt",
      "productPrice": 120.00,
      "description": "High-quality green t-shirt with a vintage look and feel.",
      "condition": "Used - Like New",
      "fileUrls": ["https://placehold.co/80x80/4ade80/ffffff?text=T"],
      "quantity": 1
    },
    {
      "productId": 3,
      "productName": "Modern Blue T-Shirt",
      "productPrice": 60.00,
      "description": "Sleek blue t-shirt, perfect for any casual occasion.",
      "condition": "New",
      "fileUrls": ["https://placehold.co/80x80/60a5fa/ffffff?text=T"],
      "quantity": 2
    }
  ]);

  const handleQuantityChange = (productId, change) => {
    setItems(currentItems =>
      currentItems.map(item =>
        item.productId === productId
          ? { ...item, quantity: Math.max(0, item.quantity + change) } // Prevent negative quantity
          : item
      ).filter(item => item.quantity > 0) // Remove item if quantity is 0
    );
  };

  return (
    <main className="bg-gray-50 min-h-screen font-sans">
      <div className="container mx-auto px-4 py-8 lg:py-12">
        <div className="flex flex-col lg:flex-row lg:space-x-8">
          {/* The OrderSummary component displays the list of items */}
          <OrderSummary items={items} onQuantityChange={handleQuantityChange} />
          {/* The ShoppingCart component handles payment and shipping details */}
          <ShoppingCart items={items} />
        </div>
      </div>
    </main>
  );
}