"use client";

import React from "react";
import OrderItem from "./OrderItem";

const ArrowRightIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5 ml-2"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M17 8l4 4m0 0l-4 4m4-4H3"
    />
  </svg>
);

const OrderSummary = ({ items, onRemove }) => {
  return (
    <div className="w-full lg:w-1/2 bg-white p-6 lg:p-8 rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Order Summary</h2>
      <div className="divide-y divide-gray-200">
        {items.map((item) => (
          <OrderItem
            key={item.productId}
            item={item}
            onRemove={() => onRemove(item.productId)}
          />
        ))}
      </div>
      {/* The "Add Coupon Code" button is restored. */}
      {/* <div className="mt-8">
        <button className="w-full flex items-center justify-center bg-gray-800 text-white font-semibold py-3 px-4 rounded-lg hover:bg-gray-900 transition-all duration-300 transform hover:scale-105">
          Add Coupon Code
          <ArrowRightIcon />
        </button>
      </div> */}
    </div>
  );
};

export default OrderSummary;