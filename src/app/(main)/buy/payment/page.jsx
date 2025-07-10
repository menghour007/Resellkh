'use client';

import React from 'react';

// --- Reusable Components for the Payment Page ---

const PaymentCartItem = ({ name, price, imageUrl }) => (
  <div className="flex items-center justify-between bg-white p-4 rounded-xl shadow-md">
    <div className="flex items-center space-x-4">
      <div className="w-16 h-16 bg-gray-100 rounded-lg overflow-hidden">
        <img src={imageUrl} alt={name} className="w-full h-full object-cover" />
      </div>
      <div>
        <h4 className="font-semibold text-gray-800">{name}</h4>
        <p className="text-gray-600">${price.toFixed(2)}</p>
      </div>
    </div>
    <div className="flex items-center border border-gray-200 rounded-md">
      <button className="p-2 text-gray-500 hover:bg-gray-100 transition">-</button>
      <span className="px-3 text-gray-700 font-medium">1</span>
      <button className="p-2 text-gray-500 hover:bg-gray-100 transition">+</button>
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
      <label className="block text-sm font-medium text-gray-400 mb-1">{label}</label>
      <select 
        className="w-full bg-gray-800 border border-gray-600 text-white rounded-lg p-3 appearance-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
        {...props}
      >
        {children}
      </select>
    </div>
);


// --- Main Payment Page Component ---
export default function PaymentPage() {
  const cartItems = [
    { name: 'Creamy lipsticks', price: 20.00, imageUrl: 'https://placehold.co/64x64/fecaca/991b1b?text=L' },
    { name: 'Azature Nail polish', price: 30.00, imageUrl: 'https://placehold.co/64x64/f9a8d4/831843?text=N' },
    { name: 'Men Perfume', price: 100.00, imageUrl: 'https://placehold.co/64x64/fed7aa/9a3412?text=P' },
  ];
  
  const total = cartItems.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="bg-white min-h-screen font-sans text-gray-800">
      <div className="container mx-auto px-4 py-8 lg:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column: Shopping Cart */}
          <div className="lg:col-span-1 space-y-6">
            <h2 className="text-3xl font-bold">Shopping Cart</h2>
            <div className="space-y-4">
              {cartItems.map(item => <PaymentCartItem key={item.name} {...item} />)}
            </div>
            <div className="flex justify-between items-center text-2xl font-bold pt-4">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>

          {/* Middle Column: Address Details */}
          <div className="lg:col-span-1 bg-gray-900 text-white p-8 rounded-2xl shadow-2xl">
            <h3 className="text-2xl font-bold mb-6">Address Details</h3>
            <div className="space-y-4">
              <FormInput label="Full name" type="text" defaultValue="Ronald Richards" />
              <FormInput label="Phone number" type="tel" defaultValue="+91 952 145 5214" />
              <FormInput label="Email address" type="email" defaultValue="Ronald Richards@gmail.com" />
              <FormInput label="Promo Code" type="text" defaultValue="023146" />
              <div className="grid grid-cols-2 gap-4">
                <FormSelect label="State">
                  <option>Gujarat</option>
                </FormSelect>
                <FormSelect label="City">
                  <option>Rajkot</option>
                </FormSelect>
              </div>
              <FormSelect label="Address">
                  <option>Alpha Plus, Near Ralya Telephone</option>
              </FormSelect>
            </div>
          </div>

          {/* Right Column: Card Details */}
          <div className="lg:col-span-1 bg-gray-900 text-white p-8 rounded-2xl shadow-2xl">
            <h3 className="text-2xl font-bold mb-6">Card Details</h3>
            
            {/* Credit Card Visual */}
            <div className="bg-gradient-to-br from-gray-700 to-gray-800 p-6 rounded-xl mb-8 shadow-lg">
                <div className="flex justify-between items-start">
                    <img src="https://img.icons8.com/color/48/000000/mastercard-logo.png" alt="Mastercard" className="w-12"/>
                    <img src="https://img.icons8.com/ios-filled/50/ffffff/sim-card-chip.png" alt="Chip" className="w-10"/>
                </div>
                <p className="text-2xl font-mono tracking-widest mt-6">1254 2154 5478 6215</p>
                <div className="flex justify-between items-end mt-4 text-sm">
                    <span>Ronald Richards</span>
                    <span>04/25</span>
                </div>
            </div>

            <div className="space-y-4">
              <FormInput label="Name on card" type="text" defaultValue="Ronald Richards" />
              <FormInput label="Card number" type="text" defaultValue="1254 2154 5478 6215" />
              <div className="grid grid-cols-3 gap-4">
                <div className="col-span-2">
                    <FormSelect label="Expiry date">
                        <option>MM</option>
                    </FormSelect>
                </div>
                 <FormSelect label="">
                    <option>YYYY</option>
                </FormSelect>
              </div>
              <FormInput label="CVV" type="text" defaultValue="214" />
            </div>

            <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-lg mt-8 transition-all duration-300 transform hover:scale-105">
              Pay Now
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
