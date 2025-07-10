'use client';

import React from 'react';

const CheckoutItem = ({ item, onRemove }) => (
  <div className="bg-white rounded-xl shadow-md overflow-hidden flex flex-col">
    <div className="h-48 bg-gray-100">
      <img
        src={item.fileUrls[0]}
        alt={item.productName}
        className="w-full h-full object-cover"
      />
    </div>
    <div className="p-4 flex flex-col flex-grow">
      <h3 className="font-bold text-lg text-gray-800 mb-1">{item.productName}</h3>

      <p className="text-sm font-medium text-gray-600 bg-gray-100 px-2 py-0.5 rounded-full self-start mb-2">
        Condition: {item.condition}
      </p>

      <p className="text-sm text-gray-500 mb-4 flex-grow line-clamp-3">
        {item.description}
      </p>

      <div className="flex justify-between items-center mt-auto">
        <p className="font-bold text-lg text-gray-800">
          ${item.productPrice.toFixed(2)}
        </p>

        <button
          onClick={() => onRemove(item.productId)}
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
  </div>
);

export default CheckoutItem;
