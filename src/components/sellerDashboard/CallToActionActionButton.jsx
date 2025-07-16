// components/sellerDashboard/CallToActionActionButton.jsx
"use client"; // If this button needs client-side interactivity like onClick

import React from "react";
import { ArrowRight } from "lucide-react"; // Import ArrowRight specifically if it's optional

const CallToActionActionButton = ({
  icon: Icon, // Renamed to Icon (capitalized) to be used as a component
  text,
  className = "", // Default to empty string for flexibility
  showArrow = false,
  onClick,
}) => {
  return (
    <button
      className={`rounded-full font-bold shadow-xl transition-all duration-300 transform hover:-translate-y-1 hover:scale-105 flex items-center justify-center gap-3 ${className}`}
      onClick={onClick}
    >
      {Icon && <Icon className="w-6 h-6" />} {/* Render the icon component */}
      {text}
      {showArrow && <ArrowRight className="w-6 h-6" />}
    </button>
  );
};

export default CallToActionActionButton;
