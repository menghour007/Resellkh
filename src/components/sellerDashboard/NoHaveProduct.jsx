// components/sellerDashboard/NoHaveProduct.jsx
"use client";

import React from "react";
// Import the specific icons you need for the buttons
import { Plus, Package, Rocket } from "lucide-react"; // Changed Settings to Package, added Rocket for emoji alignment
// Import the CallToActionActionButton component
import CallToActionActionButton from "./CallToActionActionButton";

const NoHaveProduct = () => {
  // Renamed component name
  // Define functions for button actions (these can navigate, open modals, etc.)
  const handleAddYourFirstProduct = () => {
    // Changed function name
    alert("Navigating to Add Your First Product...");
    // In a real app, you'd use Next.js router: router.push('/seller/products/add');
  };

  const handleLearnMoreAboutProducts = () => {
    // Changed function name
    alert("Navigating to Learn More About Products...");
    // In a real app: router.push('/seller/help/products');
  };

  return (
    <div className="mt-8 p-8 bg-gradient-to-br from-red-50 to-orange-50 rounded-2xl shadow-xl flex flex-col items-center text-center">
      {" "}
      {/* Changed background gradient colors */}
      <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center mb-6 shadow-md">
        {" "}
        {/* Changed background color */}
        <Package className="w-8 h-8 text-white" />{" "}
        {/* Changed icon to Package */}
      </div>
      <h2 className="text-4xl font-bold text-gray-900 mb-4 flex items-center gap-2">
        Ready to Sell? No Products Yet! {/* Changed heading text */}
        <span role="img" aria-label="package">
          {" "}
          {/* Changed emoji and aria-label */}
          📦
        </span>
      </h2>
      <p className="text-lg text-gray-600 max-w-2xl mb-8">
        It looks like you haven't added any products to your store yet. Let's
        get your first item listed and start your selling journey on ResellKH!{" "}
        {/* Changed paragraph text */}
      </p>
      <div className="flex flex-col md:flex-row gap-4 w-full justify-center">
        <CallToActionActionButton
          icon={Plus} // Keep Plus icon
          text="Add Your First Product" // Changed button text
          className="bg-blue-600 text-white px-6 py-3 hover:bg-blue-700"
          onClick={handleAddYourFirstProduct} // Changed onClick handler
        />
        <CallToActionActionButton
          icon={Rocket} // Changed icon to Rocket
          text="Learn More About Selling" // Changed button text
          className="bg-orange-600 text-white px-6 py-3 hover:bg-orange-700" // Changed button color
          onClick={handleLearnMoreAboutProducts} // Changed onClick handler
        />
        {/* Removed the third button as per your request based on the image provided in previous context */}
      </div>
    </div>
  );
};

export default NoHaveProduct;
