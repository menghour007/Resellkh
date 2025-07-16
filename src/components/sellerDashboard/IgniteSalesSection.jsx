// components/sellerDashboard/IgniteSalesSection.jsx
"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Plus, Settings, Share2, Sparkles } from "lucide-react"; // Make sure Share2 is imported if you plan to use it
import CallToActionActionButton from "./CallToActionActionButton";

// Accept `sellerId` as a prop
const IgniteSalesSection = ({ sellerId }) => {
  // <-- ACCEPT sellerId here
  const router = useRouter();

  const handleAddMoreProducts = () => {
    router.push("/sell");
  };

  const handleOptimizeListings = () => {
    // Now sellerId is defined and can be used in the path
    if (sellerId) {
      // Add a check to ensure sellerId exists
      router.push(`/profile/${sellerId}`); // Navigate to profile using sellerId
    } else {
      alert("Seller ID not found. Cannot go to listing products.");
      // Potentially redirect to a generic product list or error page
      // router.push("/products");
    }
  };

  // If you re-add the "Promote Your Store" button
  const handlePromoteYourStore = () => {
    alert("Navigating to Promote Your Store section...");
    // router.push('/seller/marketing/promote');
  };

  return (
    <div className="mt-8 p-8 bg-gradient-to-br from-green-50 to-blue-50 rounded-2xl shadow-xl flex flex-col items-center text-center">
      <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mb-6 shadow-md">
        <Sparkles className="w-8 h-8 text-white" />
      </div>

      <h2 className="text-4xl font-bold text-gray-900 mb-4 flex items-center gap-2">
        Grow Your Business!{" "}
        <span role="img" aria-label="rocket">
          🚀
        </span>
      </h2>
      <p className="text-lg text-gray-600 max-w-2xl mb-8">
        Your products are now live on ResellKH! Take the next step to maximize
        your reach and boost sales in Cambodia's premier marketplace.
      </p>

      <div className="flex flex-col md:flex-row gap-4 w-full justify-center">
        <CallToActionActionButton
          icon={Plus}
          text="Add More Products"
          className="bg-blue-600 text-white px-6 py-3 hover:bg-blue-700"
          onClick={handleAddMoreProducts}
        />
        <CallToActionActionButton
          icon={Settings}
          text="Goto Listing Products"
          className="bg-purple-600 text-white px-6 py-3 hover:bg-purple-700"
          onClick={handleOptimizeListings} // This now uses the sellerId prop
        />
        {/* If you add back the third button, uncomment this */}
        {/* <CallToActionActionButton
          icon={Share2}
          text="Promote Your Store"
          className="bg-orange-600 text-white px-6 py-3 hover:bg-orange-700"
          onClick={handlePromoteYourStore}
        /> */}
      </div>
    </div>
  );
};

export default IgniteSalesSection;
