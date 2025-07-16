// components/sellerDashboard/MetricsGrid2.jsx
import React from "react";
import MetricCard from "./MetricCard";
import {
  DollarSign,
  Package,
  ShoppingCart,
  TrendingUp,
  Plus,
} from "lucide-react";

// *** THE FIX IS HERE: Add `onMetricClick` to the destructured props ***
const MetricsGrid = ({ metrics, onMetricClick }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
    <MetricCard
      icon={<DollarSign className="w-6 h-6 text-white" />}
      iconBg="bg-gradient-to-r from-green-500 to-emerald-500"
      title="Total Sales"
      value={`$${metrics.totalSales}`}
      trend={
        <>
          <TrendingUp className="w-4 h-4 mr-1" />
          +12.5%
        </>
      }
      trendColor="text-green-600"
      onClick={() => onMetricClick("totalSales")} // Now 'onMetricClick' is in scope
    />
    <MetricCard
      icon={<Package className="w-6 h-6 text-white" />}
      iconBg="bg-gradient-to-r from-blue-500 to-cyan-500"
      title="Products Listed"
      value={metrics.totalProducts}
      trend={
        <>
          <Plus className="w-4 h-4 mr-1" />
          Active
        </>
      }
      trendColor="text-blue-600"
      onClick={() => onMetricClick("productsListed")} // Now 'onMetricClick' is in scope
    />
    <MetricCard
      icon={<ShoppingCart className="w-6 h-6 text-white" />}
      iconBg="bg-gradient-to-r from-purple-500 to-pink-500"
      title="New Orders"
      value={metrics.newOrders}
      trend={
        <>
          <TrendingUp className="w-4 h-4 mr-1" />
          +5
        </>
      }
      trendColor="text-purple-600"
      onClick={() => onMetricClick("newOrders")} // Now 'onMetricClick' is in scope
    />
    <MetricCard
      icon={<TrendingUp className="w-6 h-6 text-white" />}
      iconBg="bg-gradient-to-r from-orange-500 to-red-500"
      title="Conversion Rate"
      value={`${metrics.conversionRate}%`}
      trend={
        <>
          <TrendingUp className="w-4 h-4 mr-1" />
          +0.3%
        </>
      }
      trendColor="text-orange-600"
      onClick={() => onMetricClick("conversionRate")} // Now 'onMetricClick' is in scope
    />
  </div>
);

export default MetricsGrid;
