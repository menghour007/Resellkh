// components/sellerDashboard/NoHaveOrder.jsx
"use client";

import React from "react";
// Import icons relevant to "no orders"
import { ShoppingCart, Package, Megaphone } from "lucide-react"; // ShoppingCart for orders, Package for products, Megaphone for promote
// Import the CallToActionActionButton component
import CallToActionActionButton from "./CallToActionActionButton";

const NoHaveOrder = () => {
  // Renamed component name
  // Define functions for button actions for "no orders" scenario
  const handleViewYourProducts = () => {
    alert("Navigating to Your Products page...");
    // In a real app: router.push('/seller/products');
  };

  return (
    <div className="mt-8 p-8 bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl shadow-xl flex flex-col items-center text-center">
      {" "}
      {/* Changed background gradient colors */}
      <div className="w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center mb-6 shadow-md">
        {" "}
        {/* Changed background color */}
        <ShoppingCart className="w-8 h-8 text-white" />{" "}
        {/* Changed icon to ShoppingCart */}
      </div>
      <h2 className="text-4xl font-bold text-gray-900 mb-4 flex items-center gap-2">
        No Orders Found Yet! {/* Changed heading text */}
        <span role="img" aria-label="sad-face">
          {" "}
          {/* Changed emoji and aria-label */}
          😔
        </span>
      </h2>
      <p className="text-lg text-gray-600 max-w-2xl mb-8">
        It looks like there are no new orders for your products yet. Keep
        promoting your store, and ensure your listings are captivating!{" "}
        {/* Changed paragraph text */}
      </p>
      <div className="flex flex-col md:flex-row gap-4 w-full justify-center">
        <CallToActionActionButton
          icon={Package} // Icon to suggest looking at products
          text="View Your Products" // Button text
          className="bg-blue-600 text-white px-6 py-3 hover:bg-blue-700"
          onClick={handleViewYourProducts} // Button action
        />

        {/* Only two buttons for this context */}
      </div>
    </div>
  );
};

export default NoHaveOrder;
