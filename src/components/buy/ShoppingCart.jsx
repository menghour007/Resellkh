'use client';

import React, { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation'; // Step 1: Import the router

// --- Icon Components ---
const CalendarIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
);


// The ShoppingCart component handles payment, shipping, and order totals.
const ShoppingCart = ({ items }) => {
  const router = useRouter(); // 
  const [paymentMethod, setPaymentMethod] = useState('card');

  const subtotal = useMemo(() => {
    return items.reduce((sum, item) => sum + item.productPrice * item.quantity, 0);
  }, [items]);

  const deliveryFee = 0;
  const total = subtotal + deliveryFee;
  
  const totalItems = useMemo(() => {
      return items.reduce((sum, item) => sum + item.quantity, 0)
  }, [items]);

  /**
   * Step 3: Create a handler function for the order button.
   * This function will navigate to the new payment page.
   */
  const handleOrderClick = () => {
    // You can add logic here to save the order details before navigating
    console.log("Proceeding to payment...");
    router.push('/payment'); // Navigate to the '/payment' route
  };

  return (
    <div className="w-full lg:w-1/2 p-6 lg:p-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Shopping Cart</h2>
        <span className="text-gray-500 font-medium">{totalItems} Items</span>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-lg">
        {/* Price Summary */}
        <div className="space-y-3 text-gray-600 border-b border-gray-200 pb-4">
          <div className="flex justify-between">
            <span>Subtotal:</span>
            <span className="font-semibold text-gray-800">${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>Delivery:</span>
            <span className="font-semibold text-gray-800">${deliveryFee.toFixed(2)}</span>
          </div>
        </div>
        <div className="flex justify-between font-bold text-lg text-gray-800 pt-4">
          <span>Total:</span>
          <span>${total.toFixed(2)}</span>
        </div>

        {/* Shipping & Promo */}
        <div className="mt-6 space-y-4">
          <div>
            <label htmlFor="shipping" className="block text-sm font-medium text-gray-700 mb-1">Shipping</label>
            <select id="shipping" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-1 focus:outline-none focus:ring-orange-500 focus:border-orange-500 transition">
              <option>Grab Delivery - $2.00</option>
              <option>Bus Delivery - $2.00</option>
              <option>Express Delivery - $2.00</option>
            </select>
          </div>
          {/* <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
            <input type="text" id="phone" placeholder="+855" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-1 focus:outline-none focus:ring-orange-500 focus:border-orange-500 transition" />
          </div>
          <div>
            <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">Address</label>
            <input type="text" id="address" placeholder="Your Address" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-1 focus:outline-none focus:ring-orange-500 focus:border-orange-500 transition" />
          </div> */}
        </div>

        {/* Payment */}
        {/* <div className="mt-8">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Payment</h3>
          <div className="space-y-3">
            <label className="flex items-center p-3 border border-gray-300 rounded-lg cursor-pointer has-[:checked]:bg-orange-50 has-[:checked]:border-orange-500 transition">
              <input type="radio" name="payment" value="delivery" checked={paymentMethod === 'delivery'} onChange={(e) => setPaymentMethod(e.target.value)} className="h-4 w-4 text-orange-600 focus:ring-orange-500" />
              <span className="ml-3 text-sm font-medium text-gray-700">Payment with ABA</span>
            </label>
            <label className="flex items-center p-3 border border-gray-300 rounded-lg cursor-pointer has-[:checked]:bg-orange-50 has-[:checked]:border-orange-500 transition">
              <input type="radio" name="payment" value="card" checked={paymentMethod === 'card'} onChange={(e) => setPaymentMethod(e.target.value)} className="h-4 w-4 text-orange-600 focus:ring-orange-500" />
              <span className="ml-3 text-sm font-medium text-gray-700">Card Payment</span>
            </label>
          </div>
        </div> */}

        {/* Card Details */}
        {/* {paymentMethod === 'card' && (
          <div className="mt-6 animate-fade-in">
            <button className="text-sm font-medium text-indigo-600 hover:text-indigo-800 mb-4">+ Add Credit Card</button>
            <div className="space-y-4">
              <div>
                <label htmlFor="card-number" className="block text-sm font-medium text-gray-700 mb-1">Card Number</label>
                <input type="text" id="card-number" placeholder="XXXX XXXX XXXX 4569" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition" />
              </div>
              <div className="flex space-x-4">
                <div className="w-1/2 relative">
                  <label htmlFor="expiry-date" className="block text-sm font-medium text-gray-700 mb-1">Expiry Date</label>
                  <input type="text" id="expiry-date" placeholder="Dec 2026" className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition" />
                   <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none top-7">
                     <CalendarIcon />
                   </div>
                </div>
                <div className="w-1/2">
                  <label htmlFor="cvv" className="block text-sm font-medium text-gray-700 mb-1">CVV</label>
                  <input type="text" id="cvv" placeholder="000" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition" />
                </div>
              </div>
            </div>
          </div>
        )} */}
      </div>

      {/* Action Buttons */}
      <div className="mt-8 flex space-x-4">
        <button className="w-1/2 bg-gray-200 text-gray-700 font-bold py-3 rounded-lg hover:bg-gray-300 transition-all duration-300">
          Cancel
        </button>
        <button 
          onClick={handleOrderClick}
          className="w-1/2 bg-orange-600 text-white font-bold py-3 rounded-lg hover:bg-orange-600 transition-all duration-300 transform hover:scale-105">
          Order
        </button>
      </div>
    </div>
  );
};

export default ShoppingCart;