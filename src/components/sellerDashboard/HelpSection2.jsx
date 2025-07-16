// components/sellerDashboard/HelpSection.jsx
import React from "react";
import { MessageCircle, BookOpen } from "lucide-react";

const HelpSection = () => (
  <div className="mt-8 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-6 border border-blue-200/30">
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center">
          <MessageCircle className="w-6 h-6 text-white" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-900">
            Need Help Getting Started?
          </h3>
          <p className="text-gray-600 text-sm">
            Our support team is here to help you succeed
          </p>
        </div>
      </div>
      <div className="flex gap-3">
        <button className="px-4 py-2 bg-white/80 text-gray-700 rounded-lg text-sm font-medium hover:bg-white border border-gray-200/50 transition-all duration-300 flex items-center gap-2">
          <BookOpen className="w-4 h-4" />
          Guide
        </button>
        <button className="px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg text-sm font-medium hover:from-blue-600 hover:to-blue-700 transition-all duration-300 flex items-center gap-2">
          <MessageCircle className="w-4 h-4" />
          Contact Support
        </button>
      </div>
    </div>
  </div>
);

export default HelpSection;
