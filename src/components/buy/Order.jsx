"use client";

import React, { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import CheckoutSummary from "./CheckOutSummary";

const Order = ({ items }) => {
  const router = useRouter();
  const [showCheckout, setShowCheckout] = useState(false);

  // Input states
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  // Error states
  const [phoneError, setPhoneError] = useState("");
  const [nameError, setNameError] = useState("");
  const [addressError, setAddressError] = useState("");

  const subtotal = useMemo(() => {
    return items.reduce(
      (sum, item) => sum + item.productPrice * item.quantity,
      0
    );
  }, [items]);

  const deliveryFee = 2.0;
  const total = subtotal + deliveryFee;

  const totalItems = useMemo(() => {
    return items.reduce((sum, item) => sum + item.quantity, 0);
  }, [items]);

  const validatePhone = (number) => /^\d{8,10}$/.test(number);
  const validateText = (text) => text.length >= 3 && text.length <= 30;

  const handleOrderClick = () => {
    let valid = true;

    if (!validatePhone(phone)) {
      setPhoneError("Phone number must be 8 to 10 digits only");
      valid = false;
    } else {
      setPhoneError("");
    }

    if (!validateText(fullName)) {
      setNameError("Full name must be between 3 and 30 characters");
      valid = false;
    } else {
      setNameError("");
    }

    // if (!validateText(address)) {
    //   setAddressError('Address must be between 3 and 30 characters');
    //   valid = false;
    // } else {
    //   setAddressError('');
    // }

    if (valid) {
      setShowCheckout(true);
    }
  };

  const handleFinalCheckout = () => {
    router.push("/buy/payment");
  };

  return (
    <div className="w-full lg:w-1/2 p-6 lg:p-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">
          {showCheckout ? "Checkout" : "Order"}
        </h2>
        <span className="text-gray-500 font-medium">{totalItems} Items</span>
      </div>

      {showCheckout ? (
        <CheckoutSummary
          subtotal={subtotal}
          delivery={deliveryFee}
          total={total}
          onCheckout={handleFinalCheckout}
          fullName={fullName}
          phone={phone}
          address={address}
        />
      ) : (
        <>
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <div className="space-y-3 text-gray-600 border-b border-gray-200 pb-4">
              <div className="flex justify-between">
                <span>Subtotal:</span>
                <span className="font-medium text-gray-800">
                  ${subtotal.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Delivery:</span>
                <span className="font-medium text-gray-800">
                  ${deliveryFee.toFixed(2)}
                </span>
              </div>
            </div>

            <div className="flex justify-between font-medium text-lg text-gray-800 pt-4">
              <span>Total:</span>
              <span>${total.toFixed(2)}</span>
            </div>

            <div className="mt-6 space-y-4">
              <div>
                <label
                  htmlFor="shipping"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Delivery
                </label>
                <select
                  id="shipping"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-1 focus:outline-none focus:ring-orange-500 focus:border-orange-500 transition"
                >
                  <option>Grab Delivery - $2.00</option>
                  <option>Bus Delivery - $2.00</option>
                  <option>Express Delivery - $2.00</option>
                </select>
              </div>
              <div>
                <label
                  htmlFor="fullName"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Full Name
                </label>
                <input
                  type="text"
                  id="fullName"
                  placeholder="Your Full Name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className={`w-full p-3 border ${
                    nameError ? "border-red-500" : "border-gray-300"
                  } rounded-lg focus:ring-1 focus:outline-none focus:ring-orange-500 focus:border-orange-500 transition`}
                />
                {nameError && (
                  <p className="text-red-500 text-sm mt-1">{nameError}</p>
                )}
              </div>
              <div>
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Phone Number
                </label>
                <input
                  type="text"
                  id="phone"
                  placeholder="XXX-XXXXXXX"
                  value={phone}
                  onChange={(e) => {
                    const val = e.target.value.replace(/\D/g, "");
                    setPhone(val);
                  }}
                  className={`w-full p-3 border ${
                    phoneError ? "border-red-500" : "border-gray-300"
                  } rounded-lg focus:ring-1 focus:outline-none focus:ring-orange-500 focus:border-orange-500 transition`}
                />
                {phoneError && (
                  <p className="text-red-500 text-sm mt-1">{phoneError}</p>
                )}
              </div>
              <div>
                <label
                  htmlFor="address"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Address
                </label>
                <input
                  type="text"
                  id="address"
                  placeholder="Your Address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className={`w-full p-3 border ${
                    addressError ? "border-red-500" : "border-gray-300"
                  } rounded-lg focus:ring-1 focus:outline-none focus:ring-orange-500 focus:border-orange-500 transition`}
                />
                {addressError && (
                  <p className="text-red-500 text-sm mt-1">{addressError}</p>
                )}
              </div>
            </div>
          </div>

          <div className="mt-8 flex space-x-4">
            <button className="w-1/2 bg-gray-200 text-gray-700 font-medium py-3 rounded-lg hover:bg-gray-300 transition-all duration-300">
              Cancel
            </button>
            <button
              onClick={handleOrderClick}
              className="w-1/2 bg-orange-600 text-white font-medium py-3 rounded-lg hover:bg-orange-600 transition-all duration-300 transform hover:scale-105"
            >
              Order
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Order;