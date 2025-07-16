"use client";
import React from "react";

const QRCodeModal = ({
  isOpen,
  onClose,
  total,
  isLoading,
  qrImageUrl,
}) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center top-full mt-2 z-[210]">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-sm text-center">
        <p className="text-gray-600 mb-6">
          Use your banking app to scan the QR code below.
        </p>

        <div className="p-4 border border-gray-200 rounded-lg inline-block h-[232px] w-[232px]">
          {qrImageUrl ? (
            <img
              src={qrImageUrl}
              alt="Payment QR Code"
              width="400"
              height="400"
              className="w-full h-full"
            />
          ) : (
            <p className="flex items-center justify-center h-full">Loading QR Code...</p>
          )}
        </div>

        <p className="text-md font-bold text-orange-600 my-4">
          Total: ${total.toFixed(2)}
        </p>

        <button
          onClick={onClose}
          disabled={isLoading}
          className="w-full bg-gray-200 text-gray-700 font-medium py-3 rounded-lg hover:bg-gray-300 transition mt-4"
        >
            Cancel
        </button>
      </div>
    </div>
  );
};

export default QRCodeModal;