'use client';

import React, { useState, useEffect } from 'react';

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

const FormInput = ({ label, error, ...props }) => (
  <div className="mb-2">
    <label className="block text-sm font-medium text-gray-900 mb-1">{label}</label>
    <input
      className={`w-full p-3 border border-gray-300 rounded-lg focus:ring-1 focus:outline-none focus:ring-orange-500 focus:border-orange-500 transition ${
        error
          ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
          : 'border-gray-300 focus:ring-orange-500 focus:border-orange-500'
      }`}
      {...props}
    />
    {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
  </div>
);

export default function PaymentPage() {
  const cartItems = [
    {
      productId: 1,
      productName: "G2000 smart fit shirt long sleeve",
      productPrice: 15.0,
      fileUrls: ["https://gateway.pinata.cloud/ipfs/QmSL9cZKQRoB8mcYXBFrVpkUk1NyvwXCdinP7bH7D9UW13"],
      quantity: 2,
    },
    {
      productId: 2,
      productName: "Bellroy waist pouch dark green",
      productPrice: 18.0,
      fileUrls: ["https://gateway.pinata.cloud/ipfs/QmVTrgqpPJ1BJs4zu8C3PSiWXjp6s35XBJmHURQ5DHnPA8"],
      quantity: 1,
    },
    {
      productId: 3,
      productName: "Diesel – Slim Skinny Fit Jeans",
      productPrice: 20.0,
      fileUrls: ["https://gateway.pinata.cloud/ipfs/QmXEQPsGhPruCeaKnTNC56KB71Bhzz2S5qtk1EL3ET2E6L"],
      quantity: 2,
    },
  ];

  const total = cartItems.reduce((sum, item) => sum + item.productPrice * item.quantity, 0);

  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [errors, setErrors] = useState({});
  const [showModal, setShowModal] = useState(false);

  const validate = () => {
    const newErrors = {};
    if (!fullName.trim()) newErrors.fullName = 'Full name is required';
    if (!/^\d{8,10}$/.test(phone)) newErrors.phone = 'Phone must be 8 to 10 digits';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) newErrors.email = 'Enter a valid email address';
    if (!address.trim()) newErrors.address = 'Address is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePay = () => {
    if (validate()) {
      setShowModal(true); 
    }
  };

  return (
    <div className="bg-white min-h-screen font-sans text-gray-800">
      <div className="container mx-auto px-4 py-8 lg:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Shopping Cart */}
          <div className="lg:col-span-1 space-y-6">
            <h2 className="text-3xl font-bold">Shopping Cart</h2>
            <div className="space-y-4">
              {cartItems.map((item) => (
                <PaymentCartItem key={item.productId} {...item} />
              ))}
            </div>
            <div className="flex justify-between items-center text-2xl font-bold pt-4">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>

          {/* Address Details */}
          <div className="lg:col-span-1 bg-white text-black p-8 rounded-2xl shadow-2xl">
            <h3 className="text-2xl font-bold mb-6">Address Details</h3>
            <div className="space-y-4">
              <FormInput
                label="Full name"
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                error={errors.fullName}
              />
              <FormInput
                label="Phone number"
                type="tel"
                inputMode="numeric"
                pattern="\d{8,10}"
                maxLength={10}
                value={phone}
                onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                error={errors.phone}
              />
              <FormInput
                label="Email address"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                error={errors.email}
              />
              <FormInput
                label="Address"
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                error={errors.address}
              />
            </div>
          </div>

          {/* Card Details / QR Payment */}
          <div className="lg:col-span-1 bg-white text-black p-8 rounded-2xl shadow-2xl">
            <h3 className="text-2xl font-bold mb-6">ABA Payment</h3>
            <img
              src="https://ro-c.org/wp-content/uploads/2020/11/ROC-Merchandise-QR-Code-658x1024.jpg"
              alt="ABA QR Code"
              className="rounded-lg w-full object-contain"
            />
            <button
              onClick={handlePay}
              className="w-full bg-orange-600 hover:bg-orange-500 text-white font-bold py-4 rounded-lg mt-8 transition-all duration-300 transform hover:scale-105"
            >
              Pay Now
            </button>
          </div>
        </div>
      </div>

      {/* Payment Success Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-2xl text-center max-w-sm w-full">
            <h2 className="text-2xl font-bold text-orange-500 mb-2"> Payment Successful!</h2>
            <p className="text-gray-700 mb-4">Thank you for your purchase.</p>
            <button
              onClick={() => setShowModal(false)}
              className="px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-400 transition"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
