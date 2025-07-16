// components/MetricCard.jsx
import React from "react";

const MetricCard = ({
  icon,
  title,
  value,
  trend,
  trendColor,
  iconBg,
  onClick,
}) => (
  <div
    className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20 hover:shadow-xl transition-all duration-300"
    onClick={onClick}
  >
    <div className="flex items-center justify-between mb-4">
      <div className={`p-3 ${iconBg} rounded-xl shadow-lg`}>{icon}</div>
      <div className={`flex items-center text-sm font-medium ${trendColor}`}>
        {trend}
      </div>
    </div>
    <h3 className="text-2xl font-bold text-gray-900 mb-1">{value}</h3>
    <p className="text-gray-500 text-sm">{title}</p>
  </div>
);

export default MetricCard;
