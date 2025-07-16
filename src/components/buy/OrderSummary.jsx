// src/app/components/buy/OrderSummary.jsx
"use client";

import React, { useState, useEffect, useCallback } from "react";
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

const OrderSummary = ({ initialItems = [], onRemove, onSelectedItemsChange }) => {
  // internal state for items, allowing quantity changes and maintaining structure
  const [items, setItems] = useState(initialItems);
  // Manage selected item IDs
  const [selectedItemIds, setSelectedItemIds] = useState([]);

  // Only update items when initialItems change, but do NOT auto-select any items
  useEffect(() => {
    setItems(initialItems);
    setSelectedItemIds([]); // Do not auto-select any items
  }, [initialItems]);

  // Effect to call onSelectedItemsChange whenever selectedItemIds or items change
  useEffect(() => {
    const currentSelectedItems = items.filter(item => selectedItemIds.includes(item.productId));
    if (onSelectedItemsChange) {
      onSelectedItemsChange(currentSelectedItems);
    }
  }, [selectedItemIds, items, onSelectedItemsChange]);

  // Function to toggle selection of a single item
  const toggleItemSelection = (productId) => {
    setSelectedItemIds(prevSelected =>
      prevSelected.includes(productId)
        ? prevSelected.filter(id => id !== productId)
        : [...prevSelected, productId]
    );
  };

  // Function to toggle select all items
  const toggleSelectAll = () => {
    if (selectedItemIds.length === items.length) {
      setSelectedItemIds([]);
    } else {
      setSelectedItemIds(items.map(item => item.productId));
    }
  };

  // Function to handle quantity change from OrderItem
  const handleQuantityChange = (productId, newQuantity) => {
    setItems(prevItems =>
      prevItems.map(item =>
        item.productId === productId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  return (
    <div className="w-full lg:w-1/2 bg-white p-6 lg:p-8 rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Order Summary</h2>

      {/* Select All Checkbox */}
      <div className="flex items-center mb-4 pb-4 border-b border-gray-200">
        <input
          type="checkbox"
          id="selectAll"
          className="form-checkbox h-5 w-5 text-red-500 rounded focus:ring-red-500"
          checked={selectedItemIds.length === items.length && items.length > 0}
          onChange={toggleSelectAll}
        />
        <label htmlFor="selectAll" className="ml-2 text-lg font-medium text-gray-800">
          Select All ({selectedItemIds.length} / {items.length} items)
        </label>
      </div>

      <div className="divide-y divide-gray-200">
        {items.map((item) => (
          <OrderItem
            key={item.productId}
            item={item}
            onRemove={onRemove}
            isSelected={selectedItemIds.includes(item.productId)}
            onToggleSelection={toggleItemSelection}
            onQuantityChange={handleQuantityChange}
          />
        ))}
      </div>
    </div>
  );
};

export default OrderSummary;