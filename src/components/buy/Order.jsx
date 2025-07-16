// src/app/components/buy/Order.jsx
"use client";

import React, { useState, useMemo, useEffect } from "react";
import { useRouter } from "next/navigation";
import toast, { Toaster } from 'react-hot-toast';

//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// QR Code Modal Component
// This component now displays a static QR code and instructs the user
// to enter the total amount manually in their ABA app.
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
const QRCodeModal = ({ isOpen, onClose, total, qrImageUrl, onPaymentConfirm, isLoading }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-100">
            <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md m-4 text-center">
                <h2 className="text-2xl font-bold text-gray-800 mb-2">Scan to Pay with ABA</h2>
                <p className="text-lg text-gray-600 mb-1">Total Amount: <span className="font-bold text-orange-600">${total.toFixed(2)}</span></p>
                <p className="text-sm text-red-600 mb-4 font-semibold">Please enter the total amount manually in your app.</p>
                
                <div className="flex justify-center items-center h-64 bg-gray-100 rounded-lg mb-6 p-4">
                    {qrImageUrl && qrImageUrl !== "YOUR_ABA_QR_CODE_IMAGE_URL_HERE.png" ? (
                        <img src={qrImageUrl} alt="ABA Account QR Code" className="max-h-full max-w-full object-contain" />
                    ) : (
                        <div className="text-gray-500 text-center">
                            <p className="font-bold">QR Code not configured.</p>
                            <p className="text-sm mt-2">Please update the QR code URL in the code.</p>
                        </div>
                    )}
                </div>

                {/* This button allows the user to confirm they have completed the payment */}
                <button
                    onClick={onPaymentConfirm}
                    disabled={isLoading}
                    className="w-full bg-green-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-green-700 transition duration-300 disabled:bg-gray-400"
                >
                    {isLoading ? 'Processing...' : 'I Have Paid'}
                </button>

                <button
                    onClick={onClose}
                    disabled={isLoading}
                    className="w-full mt-3 bg-gray-200 text-gray-700 font-medium py-3 px-4 rounded-lg hover:bg-gray-300 transition duration-300"
                >
                    Cancel
                </button>
            </div>
        </div>
    );
};


//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// Main Order Component
// The logic is now updated to use a static QR code since no bank API is available.
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

// !!! IMPORTANT !!!
// Replace this placeholder with the URL of your actual ABA account QR code image.
// You can get this from your ABA Mobile app and host it online (e.g., on Imgur, Cloudinary, or your own server).
const YOUR_STATIC_ABA_QR_IMAGE_URL = "YOUR_ABA_QR_CODE_IMAGE_URL_HERE.png";


const Order = ({ items }) => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    
    const [buyerId, setBuyerId] = useState(null);
    const [authToken, setAuthToken] = useState(null);
    
    // The QR image URL is now static.
    const [qrImageUrl, setQrImageUrl] = useState(YOUR_STATIC_ABA_QR_IMAGE_URL);

    const [fullName, setFullName] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");

    const [phoneError, setPhoneError] = useState("");
    const [nameError, setNameError] = useState("");
    const [addressError, setAddressError] = useState("");

    useEffect(() => {
        const userDataString = localStorage.getItem('cachedUser');
        const token = localStorage.getItem('token');
        if (userDataString) {
            const userData = JSON.parse(userDataString);
            setBuyerId(userData.id);
            setFullName(userData.name || "");
        }
        if (token) setAuthToken(token);
    }, []);

    const subtotal = useMemo(() => items.reduce((sum, item) => sum + item.productPrice * item.quantity, 0), [items]);
    const deliveryFee = 2.0;
    const total = subtotal + deliveryFee;
    const totalItems = useMemo(() => items.reduce((sum, item) => sum + item.quantity, 0), [items]);

    const validatePhone = (number) => /^\d{8,10}$/.test(number);
    const validateText = (text) => text.trim().length >= 3 && text.trim().length <= 50;

    /**
     * This function now just validates the form and opens the modal
     * to display the static QR code. No API call is needed here.
     */
    const handleProceedToPayment = () => {
        let valid = true;
        if (!validatePhone(phone)) { setPhoneError("Phone number must be 8 to 10 digits only"); valid = false; } else { setPhoneError(""); }
        if (!validateText(fullName)) { setNameError("Full name must be between 3 and 50 characters"); valid = false; } else { setNameError(""); }
        if (!validateText(address)) { setAddressError('Address must be between 3 and 50 characters'); valid = false; } else { setAddressError(''); }
        
        if (!valid) {
            toast.error("Please fix the errors in the form.");
            return;
        }

        // If the form is valid, just open the modal.
        setIsModalOpen(true);
    };
    
    /**
     * This function runs after the user clicks "I Have Paid".
     * You should manually check your ABA account to confirm the payment
     * before relying on this step.
     */
    const handlePaymentConfirmed = async () => {
        if (!buyerId || !authToken) {
            toast.error("User information is missing. Please log in again.");
            return;
        }
        
        setIsLoading(true);
        toast.loading('Confirming payment and saving your order...');

        const orderPayload = {
            buyerId: parseInt(buyerId), fullName, phoneNumber: phone, address, subTotal: subtotal,
            delivery: deliveryFee, totalAmount: total,
            orderItems: items.map(item => ({
                productId: item.productId, price: item.productPrice, sellerId: item.sellerId, quantity: item.quantity
            }))
        };
        
        try {
            // This logic to save the order remains the same. It runs after manual confirmation.
            const response = await fetch('https://phil-whom-hide-lynn.trycloudflare.com/api/v1/orders/insertorder', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${authToken}` },
                body: JSON.stringify(orderPayload)
            });
            const result = await response.json();
            if (!response.ok) throw new Error(result.message || 'Failed to save the order.');
            
            toast.dismiss();
            toast.success('Order placed successfully!');
            
            setTimeout(() => {
                setIsModalOpen(false);
                router.push(`/buy/payment-success?orderId=${result.payload.orderId}`);
            }, 1500);

        } catch (error) {
            toast.dismiss();
            toast.error(`Error: ${error.message}`);
            setIsLoading(false); 
        }
    };

    return (
        <div className="w-full lg:w-1/2 p-6 lg:p-8 bg-gray-50 min-h-screen">

            <QRCodeModal
                isOpen={isModalOpen}
                onClose={() => !isLoading && setIsModalOpen(false)}
                total={total}
                qrImageUrl={qrImageUrl}
                onPaymentConfirm={handlePaymentConfirmed}
                isLoading={isLoading}
            />

            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Complete Your Order</h2>
                <span className="text-gray-500 font-medium">{totalItems} Items</span>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-lg">
                <div className="space-y-3 text-gray-600 border-b border-gray-200 pb-4">
                    <div className="flex justify-between"><span>Subtotal:</span><span className="font-medium text-gray-800">${subtotal.toFixed(2)}</span></div>
                    <div className="flex justify-between"><span>Delivery:</span><span className="font-medium text-gray-800">${deliveryFee.toFixed(2)}</span></div>
                </div>
                <div className="flex justify-between font-bold text-xl text-gray-800 pt-4"><span>Total:</span><span>${total.toFixed(2)}</span></div>
                
                <div className="mt-6 space-y-4">
                    <div>
                        <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                        <input type="text" id="fullName" placeholder="Your Full Name" value={fullName} onChange={(e) => setFullName(e.target.value)} className={`w-full p-3 border ${nameError ? "border-red-500" : "border-gray-300"} rounded-lg focus:ring-orange-500 focus:border-orange-500`} />
                        {nameError && <p className="text-red-500 text-sm mt-1">{nameError}</p>}
                    </div>
                    <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                        <input type="tel" id="phone" placeholder="012345678" value={phone} onChange={(e) => { const val = e.target.value.replace(/\D/g, ""); setPhone(val); }} className={`w-full p-3 border ${phoneError ? "border-red-500" : "border-gray-300"} rounded-lg focus:ring-orange-500 focus:border-orange-500`} />
                        {phoneError && <p className="text-red-500 text-sm mt-1">{phoneError}</p>}
                    </div>
                    <div>
                        <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">Delivery Address</label>
                        <input type="text" id="address" placeholder="Your Full Address" value={address} onChange={(e) => setAddress(e.target.value)} className={`w-full p-3 border ${addressError ? "border-red-500" : "border-gray-300"} rounded-lg focus:ring-orange-500 focus:border-orange-500`} />
                        {addressError && <p className="text-red-500 text-sm mt-1">{addressError}</p>}
                    </div>
                </div>
            </div>
            <div className="mt-8">
                <button 
                    onClick={handleProceedToPayment} 
                    disabled={!buyerId || isLoading} 
                    className="w-full bg-orange-600 text-white font-bold py-4 rounded-lg hover:bg-orange-700 disabled:bg-gray-400 transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                    {isLoading ? 'Processing Order...' : (buyerId ? 'Proceed to Payment' : 'Loading User...')}
                </button>
            </div>
        </div>
    );
};

export default Order;
