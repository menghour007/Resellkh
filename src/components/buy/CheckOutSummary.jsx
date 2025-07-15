"use client";

import React from "react";

// This component displays the total price breakdown and checkout button.
const CheckoutSummary = ({
  subtotal,
  delivery,
  total,
  onCheckout,
  fullName,
  phone,
  address,
}) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm w-full">
      {/* Customer Info */}
      <div className="space-y-3 text-gray-600 border-t border-gray-200 pt-4 text-sm">
        <div className="flex justify-between">
          <span>Full Name:</span> {fullName}
        </div>
        <div className="flex justify-between">
          <span>Phone Number:</span> {phone}
        </div>
        <div className="flex justify-between">
          <span>Address:</span> {address}
        </div>
      </div>

      {/* Price Summary */}
      <div className="mt-4 border-t border-gray-200 pt-4 space-y-2 text-gray-700 text-sm">
        <div className="flex justify-between">
          <span>Subtotal:</span>
          <span className="font-medium text-gray-800">
            ${subtotal.toFixed(2)}
          </span>
        </div>
        <div className="flex justify-between">
          <span>Delivery:</span>
          <span className="font-medium text-gray-800">
            ${delivery.toFixed(2)}
          </span>
        </div>
      </div>

      <div className="flex justify-between font-medium text-xl text-gray-800 mt-4 border-t border-gray-200 pt-4">
        <span>Total:</span>
        <span>${total.toFixed(2)}</span>
      </div>

      {/* Checkout Button */}
      <div className="flex justify-end mt-8">
        <button
          onClick={onCheckout}
          className="bg-orange-500 text-white font-medium py-3 px-8 rounded-lg hover:bg-orange-600 transition transform hover:scale-105 flex items-center"
        >
          Checkout
          <svg
            className="w-5 h-5 ml-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17 8l4 4m0 0l-4 4m4-4H3"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default CheckoutSummary;