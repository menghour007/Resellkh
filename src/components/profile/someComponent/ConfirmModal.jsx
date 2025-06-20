"use client";

import { useEffect } from "react";

export default function ConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
}) {

  useEffect(() => {
    const preventScroll = (e) => {
      if (isOpen) {
        e.preventDefault();
      }
    };

    if (isOpen) {
      document.addEventListener("touchmove", preventScroll, { passive: false });
      document.addEventListener("wheel", preventScroll, { passive: false });
    }

    return () => {
      document.removeEventListener("touchmove", preventScroll);
      document.removeEventListener("wheel", preventScroll);
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-30 flex items-center justify-center" onClick={(e) => e.stopPropagation()}>
      <div className="bg-white w-[90%] max-w-md rounded-2xl shadow-lg p-6 relative text-center" onClick={(e) => e.stopPropagation()} >
        <button
          onClick={onClose}
          className="absolute top-3 right-4 text-gray-500 hover:text-black"
        >
          ✕
        </button>

        {/* Icon */}
        {/* <div className="flex justify-center mb-4">
          <div className="bg-gray-100 text-gray-700 p-3 rounded-full">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 9V3m0 0l-2 2m2-2l2 2m-2 4a6 6 0 110 12 6 6 0 010-12z" />
            </svg>
          </div>
        </div> */}

        <h2 className="text-md font-semibold mb-5">{title}</h2>
        <p className="text-sm px-3 text-gray-600 mb-6">{message}</p>

        <div className="flex justify-center gap-4">
          <button
            onClick={onConfirm}
            className="px-6 py-2 bg-black text-white rounded-full hover:bg-gray-800"
          >
            Remove
          </button>
          <button
            onClick={onClose}
            className="px-6 py-2 bg-orange-500 text-white rounded-full hover:bg-orange-600"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
