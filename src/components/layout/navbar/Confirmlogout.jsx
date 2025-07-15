"use client";

import { useEffect } from "react";

export default function ConfirmLogout({ isOpen, onClose, onConfirm, title }) {
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
    <div
      className="fixed inset-0 z-50 bg-black bg-opacity-30 flex items-center justify-center overflow-hidden touch-none"
      onClick={(e) => e.stopPropagation()}
    >
      <div
        className="bg-white w-[90%] max-w-md rounded-2xl shadow-lg p-6 relative text-center"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-4 text-gray-500 hover:text-black"
        >
          ✕
        </button>

        {/* Icon */}
        <div className="flex justify-center mb-4">
          <div className="bg-gray-100 text-gray-700 p-3 rounded-full">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M8.89844 7.56023C9.20844 3.96023 11.0584 2.49023 15.1084 2.49023H15.2384C19.7084 2.49023 21.4984 4.28023 21.4984 8.75023V15.2702C21.4984 19.7402 19.7084 21.5302 15.2384 21.5302H15.1084C11.0884 21.5302 9.23844 20.0802 8.90844 16.5402" stroke="#171717" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
              <path d="M15.0011 12H3.62109" stroke="#171717" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M5.85 8.65039L2.5 12.0004L5.85 15.3504" stroke="#171717" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>

        <h2 className="text-md font-semibold mb-5">{title}</h2>

        {/* Buttons */}
        <div className="flex justify-center gap-4">
          <button
            onClick={onConfirm}
            className="px-6 py-2 bg-black text-white rounded-full hover:bg-gray-800"
          >
            Log out
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