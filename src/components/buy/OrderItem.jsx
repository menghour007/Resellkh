"use client";

import React from "react";

const OrderItem = ({ item, onRemove }) => {
  const imageUrl =
    item.fileUrls && item.fileUrls.length > 0
      ? item.fileUrls[0]
      : "https://placehold.co/80x80/e0e0e0/757575?text=No+Image";

  return (
    <div className="flex items-start justify-between space-x-4 py-4">
      <div className="flex items-start space-x-4">
        <div className="w-20 h-20 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
          <img
            src={imageUrl}
            alt={item.productName}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex-grow">
          <h3 className="font-semibold text-gray-800">{item.productName}</h3>
          <p className="text-sm text-gray-800 mt-1">
            <span className="font-bold">Condition:</span> {item.condition}
          </p>
          <p className="text-sm text-gray-600 mt-1 line-clamp-2">
            {item.description}
          </p>
        </div>
      </div>
      <div className="flex-shrink-0 flex items-center space-x-4 ml-4">
        <p className="font-medium text-gray-800">
          ${item.productPrice.toFixed(2)}
        </p>
        {/* This is the new remove button */}
        <button
          onClick={onRemove}
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
