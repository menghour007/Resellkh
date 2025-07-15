"use client";

import React from "react";
import Image from "next/image"; // Assuming you use next/image for optimized images

const OrderItem = ({ item, onRemove }) => {
  // Essential check: Ensure item is not null or undefined before attempting to render
  if (!item) {
    console.warn("OrderItem received a null or undefined item prop.");
    return null; // Do not render anything if item data is missing
  }

  // Function to handle the API call for removing an item
  const handleRemoveClick = async () => {
    try {
      const token = localStorage.getItem("token"); // Get token from localStorage
      const productIdToRemove = item.productId;

      if (!token) {
        alert("Authentication token not found. Please log in to remove items.");
        console.error("Authentication token not found. Cannot remove item.");
        return;
      }

      const response = await fetch(`https://phil-whom-hide-lynn.trycloudflare.com/api/v1/cart/remove?productId=${productIdToRemove}`, {
        method: 'DELETE',
        headers: {
          'accept': '*/*',
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ message: 'Unknown removal error' }));
        throw new Error(`Failed to remove item: ${errorData.message || response.statusText}`);
      }

      // If the API call is successful, then call the parent's onRemove
      // to update the UI state by filtering out this product.
      onRemove(productIdToRemove);
      console.log(`Product ${productIdToRemove} removed from cart successfully.`);

    } catch (error) {
      console.error("Error removing item from cart:", error);
      alert(`Failed to remove item: ${error.message}`);
    }
  };

  return (
    <div className="flex items-center py-4">
      <div className="relative w-20 h-20 flex-shrink-0 rounded-md overflow-hidden mr-4">
        {/* Conditional rendering for product image */}
        {item.fileUrls && item.fileUrls.length > 0 ? (
          <Image
            src={item.fileUrls[0]}
            alt={item.productName || "Product image"}
            layout="fill"
            objectFit="cover"
            className="rounded-md"
          />
        ) : (
          <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-500 text-xs">No Image</div>
        )}
      </div>
      <div className="flex-grow">
        <h3 className="text-lg font-semibold text-gray-900">{item.productName || "Unknown Product"}</h3>
        {/* Displaying the description here */}
        <p className="text-gray-600 text-sm mt-1 mb-2 line-clamp-2">
          {item.description || "No description available."}
        </p>
        <p className="text-sm text-gray-500">Quantity: {item.quantity || 0}</p>
      </div>
       <div className="flex-shrink-0 flex items-center space-x-4 ml-4">
        <p className="font-medium text-gray-800">
          ${item.productPrice !== undefined && item.productPrice !== null ? item.productPrice.toFixed(2) : 'N/A'}
        </p>
        {/* This is the new remove button */}
        <button
          onClick={handleRemoveClick} // Ensure this calls your API handler
          className="text-gray-400 hover:text-red-500 transition-colors"
          aria-label="Remove item"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="3 6 5 6 21 6" />
            <path d="M19 6L18.4 19.1a2 2 0 0 1-2 1.9H7.6a2 2 0 0 1-2-1.9L5 6m1 0L6 4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2l0 2" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default OrderItem;