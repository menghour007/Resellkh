'use client';

import React from 'react';

// --- Icon Components ---
const PlusIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
  </svg>
);

const MinusIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
  </svg>
);

// The OrderItem component is updated to match your JSON structure.
const OrderItem = ({ item, onQuantityChange }) => {
  // Use the first URL from fileUrls for the image, with a fallback.
  const imageUrl = item.fileUrls && item.fileUrls.length > 0
    ? item.fileUrls[0]
    : 'https://placehold.co/80x80/e0e0e0/757575?text=No+Image';

  return (
    <div className="flex items-start space-x-4 py-4">
      <div className="w-20 h-20 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
        <img src={imageUrl} alt={item.productName} className="w-full h-full object-cover" />
      </div>
      <div className="flex-grow">
        <h3 className="font-semibold text-gray-800">{item.productName}</h3>
        <p className="text-sm text-gray-500 mt-1">
          <span className="font-medium">Condition:</span> {item.condition}
        </p>
        <p className="text-sm text-gray-600 mt-1 line-clamp-2">
          {item.description}
        </p>
      </div>
      <div className="flex-shrink-0 flex flex-col items-end ml-4">
        <p className="font-bold text-gray-800">${(item.productPrice * item.quantity).toFixed(2)}</p>
        <div className="flex items-center border border-gray-200 rounded-md mt-2">
          <button onClick={() => onQuantityChange(item.productId, -1)} className="p-2 text-gray-500 hover:bg-gray-100 rounded-l-md transition">
            <MinusIcon />
          </button>
          <span className="px-3 text-gray-700 font-medium">{item.quantity}</span>
          <button onClick={() => onQuantityChange(item.productId, 1)} className="p-2 text-gray-500 hover:bg-gray-100 rounded-r-md transition">
            <PlusIcon />
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderItem;
