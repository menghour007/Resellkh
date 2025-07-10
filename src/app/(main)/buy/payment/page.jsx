'use client';

import React from 'react';
import { useState } from 'react';

const PaymentCartItem = ({ productName, productPrice, fileUrls, quantity }) => (
  <div className="flex items-center justify-between bg-white p-4 rounded-xl shadow-md">
    <div className="flex items-center space-x-4">
      <div className="w-16 h-16 bg-gray-100 rounded-lg overflow-hidden">
        <img src={fileUrls[0]} alt={productName} className="w-full h-full object-cover" />
      </div>
      <div>
        <h4 className="font-semibold text-gray-800">{productName}</h4>
        <p className="text-gray-600">${productPrice.toFixed(2)}</p>
      </div>
    </div>
    
  </div>
);

const FormInput = ({ label, ...props }) => (
  <div>
    <label className="block text-sm font-medium text-gray-400 mb-1">{label}</label>
    <input 
      className="w-full bg-gray-800 border border-gray-600 text-white rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
      {...props} 
    />
  </div>
);

const FormSelect = ({ label, children, ...props }) => (
  <div>
    {label && <label className="block text-sm font-medium text-gray-400 mb-1">{label}</label>}
    <select 
      className="w-full bg-gray-800 border border-gray-600 text-white rounded-lg p-3 appearance-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
      {...props}
    >
      {children}
    </select>
  </div>
);

export default function PaymentPage() {
  const cartItems = [
    {
      productId: 1,
      productName: "G2000 smart fit shirt long sleeve",
      productPrice: 15.00,
      fileUrls: ["https://gateway.pinata.cloud/ipfs/QmSL9cZKQRoB8mcYXBFrVpkUk1NyvwXCdinP7bH7D9UW13"],
      quantity: 2
    },
    {
      productId: 2,
      productName: "Bellroy waist pouch dark green",
      productPrice: 18.00,
      fileUrls: ["https://gateway.pinata.cloud/ipfs/QmVTrgqpPJ1BJs4zu8C3PSiWXjp6s35XBJmHURQ5DHnPA8"],
      quantity: 1
    },
    {
      productId: 3,
      productName: "Diesel – Slim Skinny Fit Jeans",
      productPrice: 20.00,
      fileUrls: ["https://gateway.pinata.cloud/ipfs/QmXEQPsGhPruCeaKnTNC56KB71Bhzz2S5qtk1EL3ET2E6L"],
      quantity: 2
    }
  ];

  const total = cartItems.reduce((sum, item) => sum + item.productPrice * item.quantity, 0);

  return (
    <div className="bg-white min-h-screen font-sans text-gray-800">
      <div className="container mx-auto px-4 py-8 lg:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Shopping Cart */}
          <div className="lg:col-span-1 space-y-6">
            <h2 className="text-3xl font-bold">Shopping Cart</h2>
            <div className="space-y-4">
              {cartItems.map(item => (
                <PaymentCartItem key={item.productId} {...item} />
              ))}
            </div>
            <div className="flex justify-between items-center text-2xl font-bold pt-4">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>

          {/* Address Details */}
          <div className="lg:col-span-1 bg-gray-900 text-white p-8 rounded-2xl shadow-2xl">
            <h3 className="text-2xl font-bold mb-6">Address Details</h3>
            <div className="space-y-4">
              <FormInput label="Full name" type="text" />
              <FormInput label="Phone number" type="tel" />
              <FormInput label="Email address" type="email" />
              <div className="grid grid-cols-2 gap-4">
              </div>
              <FormSelect label="Address" type="address" />
            </div>
          </div>

          {/* Card Details */}
          <div className="lg:col-span-1 bg-gray-900 text-white p-8 rounded-2xl shadow-2xl">
            <h3 className="text-2xl font-bold mb-6">ABA Payment</h3>
            <img src="https://ro-c.org/wp-content/uploads/2020/11/ROC-Merchandise-QR-Code-658x1024.jpg" alt="" />
            <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-lg mt-8 transition-all duration-300 transform hover:scale-105">
              Pay Now
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
