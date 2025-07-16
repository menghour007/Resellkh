// components/sellerDashboard/DashboardHeader2.jsx
"use client";

import React from "react";
import { Store, Settings } from "lucide-react"; // Import the Settings icon

// Added userAvatar to props
const DashboardHeader = ({ userName, userRole, userAvatar }) => (
  <div className="bg-white/80 backdrop-blur-sm border-b border-gray-200/60 sticky top-0 z-50">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between h-16">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
              <Store className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">SellerHub</h1>
              <p className="text-sm text-gray-500">Dashboard</p>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          {/* New: Edit Business Information Button */}
          <button
            onClick={() => alert("Navigating to Edit Business Information")}
            className="hidden sm:inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-gray-700 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
          >
            <Settings className="w-4 h-4 mr-2" />
            Edit Business Info
          </button>
          <div className="flex items-center space-x-3">
            {/* Use the userAvatar prop for the image source */}
            <img
              src={userAvatar}
              alt="User Avatar"
              className="w-8 h-8 object-cover rounded-full"
            />
            <div className="hidden sm:block">
              <p className="text-sm font-medium text-gray-900">{userName}</p>
              <p className="text-xs text-gray-500">{userRole}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default DashboardHeader;
