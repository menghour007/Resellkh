// components/sellerDashboard/Modal.jsx
import React from "react";
import ReactDOM from "react-dom"; // Required for createPortal

const Modal = ({ children, onClose }) => {
  // Use createPortal to render the modal outside the component's DOM hierarchy
  // This helps with z-index, accessibility, and avoiding parent overflow issues.
  if (typeof window === "undefined") {
    return null; // Don't render on server side
  }

  return ReactDOM.createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm p-4">
      <div className="relative bg-white rounded-lg shadow-2xl max-h-[90vh] overflow-y-auto">
        {/* Children (your ReceiptDisplay) will be rendered here */}
        {children}
        {/* Close button inside the modal, if not handled by children */}
        {/* <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
        >
          &times;
        </button> */}
      </div>
    </div>,
    document.body // Append the modal to the body
  );
};

export default Modal;
