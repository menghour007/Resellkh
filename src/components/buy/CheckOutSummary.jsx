// src/app/components/buy/CheckOutSummary.jsx
"use client";

import React from "react";

const CheckoutSummary = ({
  subtotal,
  delivery,
  total,
  onCheckout, // This will now open the modal
  fullName,
  phone,
  address,
}) => {
  // Helper for currency formatting (USD - $)
  const formatCurrency = (amount) => {
    const numericAmount = typeof amount === 'number' ? amount : 0;
    return new Intl.NumberFormat('en-US', { // Changed to 'en-US' locale
      style: 'currency',
      currency: 'USD', // Changed to 'USD'
      minimumFractionDigits: 2, // USD typically uses 2 decimal places
      maximumFractionDigits: 2,
    }).format(numericAmount);
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm w-full">
      {/* Customer Info */}
      <div className="space-y-3 text-gray-600 border-t border-gray-200 pt-4 text-sm">
        <div className="flex justify-between">
          <span>Full Name:</span> <span className="font-medium text-gray-800">{fullName}</span>
        </div>
        <div className="flex justify-between">
          <span>Phone Number:</span> <span className="font-medium text-gray-800">{phone}</span>
        </div>
        <div className="flex justify-between">
          <span>Address:</span> <span className="font-medium text-gray-800">{address}</span>
        </div>
      </div>

      {/* Price Summary */}
      <div className="mt-4 border-t border-gray-200 pt-4 space-y-2 text-gray-700 text-sm">
        <div className="flex justify-between">
          <span>Subtotal:</span>
          <span className="font-medium text-gray-800">${subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span>Delivery:</span>
          <span className="font-medium text-gray-800">${delivery.toFixed(2)}</span>
        </div>
      </div>

      <div className="flex justify-between font-medium text-xl text-gray-800 mt-4 border-t border-gray-200 pt-4">
        <span>Total:</span>
        <span>{formatCurrency(total)}</span>
      </div>

      {/* This button now opens the QR Code Modal */}
      <div className="flex justify-end mt-8">
        <button
          onClick={onCheckout}
          className="bg-blue-600 text-white font-medium py-3 px-8 rounded-lg hover:bg-blue-700 transition transform hover:scale-105 flex items-center"
        >
          Proceed to Payment
          <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3"/>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default CheckoutSummary;