// components/sellerDashboard/RecentActivity2.jsx
"use client"; // <--- ADD THIS LINE

import React from "react";
import {
  Clock,
  Plus,
  Package,
  Settings,
  ExternalLink,
  ShoppingCart,
  Truck,
  DollarSign,
} from "lucide-react";

// RecentActivityItem Component (sub-component of RecentActivitySection)
const RecentActivityItem = ({ type, content, time, status, amount }) => {
  const getIcon = (activityType, activityStatus) => {
    switch (activityType) {
      case "order":
        return activityStatus === "new" ? (
          <ShoppingCart className="w-5 h-5 text-white" />
        ) : (
          <Truck className="w-5 h-5 text-white" />
        );
      case "product_update":
        return <Package className="w-5 h-5 text-white" />;
      case "payout":
        return <DollarSign className="w-5 h-5 text-white" />;
      default:
        return null;
    }
  };

  const getStatusClasses = (activityStatus) => {
    switch (activityStatus) {
      case "new":
        return "bg-blue-100 text-blue-800";
      case "success":
        return "bg-green-100 text-green-800";
      case "completed":
        return "bg-emerald-100 text-emerald-800";
      case "shipped":
        return "bg-purple-100 text-purple-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getIconBgClasses = (activityType, activityStatus) => {
    switch (activityType) {
      case "order":
        return activityStatus === "new"
          ? "bg-gradient-to-r from-blue-500 to-blue-600"
          : "bg-gradient-to-r from-green-500 to-green-600";
      case "product_update":
        return "bg-gradient-to-r from-purple-500 to-purple-600";
      case "payout":
        return "bg-gradient-to-r from-emerald-500 to-emerald-600";
      default:
        return "bg-gradient-to-r from-gray-500 to-gray-600";
    }
  };

  return (
    <div className="flex items-center space-x-4 p-4 bg-white/50 backdrop-blur-sm rounded-xl border border-white/30 hover:bg-white/70 transition-all duration-300">
      <div
        className={`p-3 rounded-xl shadow-lg ${getIconBgClasses(type, status)}`}
      >
        {getIcon(type, status)}
      </div>

      <div className="flex-1">
        <p className="text-gray-900 font-medium">{content}</p>
        <div className="flex items-center gap-4 mt-1">
          <span className="text-gray-500 text-sm flex items-center gap-1">
            <Clock className="w-4 h-4" />
            {time}
          </span>
          {amount && (
            <span className="text-green-600 text-sm font-semibold">
              {amount}
            </span>
          )}
        </div>
      </div>

      <div className="flex items-center space-x-2">
        <span
          className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusClasses(
            status
          )}`}
        >
          {status}
        </span>
        <button className="text-gray-400 hover:text-gray-600 transition-colors">
          <ExternalLink className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

// RecentActivitySection Component
const RecentActivitySection = ({ activities }) => (
  <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-white/20">
    <div className="flex items-center justify-between mb-6">
      <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
        <div className="p-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg">
          <Clock className="w-6 h-6 text-white" />
        </div>
        Recent Activity
      </h2>
      <button className="px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl text-sm font-medium hover:from-blue-600 hover:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center gap-2">
        <Plus className="w-4 h-4" />
        Add Product
      </button>
    </div>

    <div className="space-y-4">
      {activities.map((activity) => (
        <RecentActivityItem
          key={activity.id}
          type={activity.type}
          content={activity.content}
          time={activity.time}
          status={activity.status}
          amount={activity.amount} // Pass amount if available
        />
      ))}
    </div>

    <div className="mt-6 text-center">
      <button className="px-6 py-3 bg-gradient-to-r from-gray-500 to-gray-600 text-white rounded-xl text-sm font-medium hover:from-gray-600 hover:to-gray-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
        View All Activities
      </button>
    </div>
  </div>
);

export default RecentActivitySection;
