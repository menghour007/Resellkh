'use client';

import React, { useState, useEffect } from 'react';

export default function PaymentPage() {
  const [countdown, setCountdown] = useState(60);
  const [expired, setExpired] = useState(false);

  useEffect(() => {
    if (countdown === 0) {
      setExpired(true);
      return;
    }
    const timer = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [countdown]);

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = 'https://ro-c.org/wp-content/uploads/2020/11/ROC-Merchandise-QR-Code-658x1024.jpg';
    link.download = 'ABA-QR-Code.jpg';
    link.click();
  };

  return (
    <div className="bg-white min-h-screen flex items-center justify-center font-sans text-gray-900">
      <div className="bg-white text-black p-8 rounded-2xl shadow-2xl w-full max-w-md text-center">
        <h3 className="text-2xl font-bold mb-6">ABA Payment</h3>

        <img
          src="https://ro-c.org/wp-content/uploads/2020/11/ROC-Merchandise-QR-Code-658x1024.jpg"
          alt="ABA QR Code"
          className="rounded-lg w-full max-h-[400px] object-contain mx-auto"
        />

        {/* Countdown or Expired Message */}
        {expired ? (
          <p className="mt-4 text-red-600 font-semibold text-lg">
            QR Code expired. Please refresh.
          </p>
        ) : (
          <p className="mt-4 text-orange-600 text-lg font-medium">
            Expires in: {countdown}s
          </p>
        )}

        {/* Always show Download Button */}
        <button
          onClick={handleDownload}
          className="w-full bg-orange-600 hover:bg-orange-500 text-white font-medium py-4 rounded-lg mt-6 transition-all duration-300 transform hover:scale-105"
        >
          Download QR Code
        </button>
      </div>
    </div>
  );
}
