// 'use client' directive is used in Next.js to mark a component as a Client Component.
// This allows for client-side interactivity, state, and effects.
"use client";

import React, { useState } from "react"; // Import useState
import { useRouter } from "next/navigation"; // Import useRouter for navigation placeholders
import {
  Store,
  Package,
  DollarSign,
  TrendingUp,
  CheckCircle,
  Users, // Added Users import for Buyer Details
  Clock, // Added Clock import for time
  Tag, // Added Tag import for product details
} from "lucide-react"; // Importing icons for visual appeal

/**
 * SellerDashboard Component
 *
 * This component provides a responsive seller's dashboard with sample static data.
 * It's designed to be a central hub where sellers can view key metrics,
 * manage products, orders, and access other seller-specific tools.
 *
 * It uses Tailwind CSS for styling to ensure a responsive and modern look.
 * Navigation buttons currently use alert() as placeholders, but are ready
 * for integration with Next.js router.
 */
export default function SellerDashboard() {
  const router = useRouter(); // Initialize useRouter for navigation

  // State to manage the active payment filter
  const [selectedPaymentFilter, setSelectedPaymentFilter] =
    useState("All Payments");

  // Sample static data for the dashboard
  const dashboardData = {
    totalProducts: 125,
    totalSales: "5,230.50", // Keep as string for display with currency
    newOrders: 18,
    recentActivities: [
      {
        id: 1,
        type: "order",
        content: "New order #ORD-2024-001 received.",
        time: "Just now",
      },
      {
        id: 2,
        type: "product_update",
        content: 'Product "Vintage Camera" updated.',
        time: "1 hour ago",
      },
      {
        id: 3,
        type: "payout",
        content: "Payout of $1,200 processed.",
        time: "Yesterday",
      },
      {
        id: 4,
        type: "order",
        content: "Order #ORD-2024-002 shipped.",
        time: "2 days ago",
      },
    ],
    // Sample data for payment records
    paymentRecords: [
      {
        id: 1,
        paymentId: "PAY-2024-001",
        date: "July 14, 2025", // Today
        time: "2:30 PM",
        status: "Completed",
        paymentMethod: "Credit Card",
        product: {
          name: "Wireless Bluetooth Headphones",
          sku: "WBH-2024-001",
          qty: 2,
          unitPrice: 79.99,
          imageUrl:
            "https://gateway.pinata.cloud/ipfs/Qmf6XwKyxVfyik4RJSigLntComsCgAoTZ5cheqRrXV6Je3", // Sample image URL
        },
        buyer: {
          name: "John Doe",
          email: "john.doe@email.com",
          phone: "+1 (555) 123-4567",
        },
        shippingAddress: {
          street: "123 Main Street",
          city: "New York",
          state: "NY",
          postalCode: "10001",
          country: "United States",
        },
        breakdown: {
          subtotal: 159.98,
          shipping: 9.99,
          tax: 13.6,
          total: 183.57,
        },
      },
      {
        id: 2,
        paymentId: "PAY-2024-002",
        date: "July 13, 2025", // Yesterday (within "This Week")
        time: "10:15 AM",
        status: "Completed",
        paymentMethod: "PayPal",
        product: {
          name: "Vintage Camera Collection",
          sku: "VCC-2024-001",
          qty: 1,
          unitPrice: 299.99,
          imageUrl:
            "https://gateway.pinata.cloud/ipfs/QmPbbh5P4tqmG6Z2zxyM1jKBqrwvVyuQqoM3SsuszmSHuC", // Sample image URL
        },
        buyer: {
          name: "Sarah Johnson",
          email: "sarah.j@email.com",
          phone: "+1 (555) 987-6543",
        },
        shippingAddress: {
          street: "456 Oak Avenue",
          city: "Los Angeles",
          state: "CA",
          postalCode: "90210",
          country: "United States",
        },
        breakdown: {
          subtotal: 299.99,
          shipping: 15.0,
          tax: 25.2,
          total: 340.19,
        },
      },
      {
        id: 3,
        paymentId: "PAY-2024-003",
        date: "July 12, 2025", // Day before yesterday (within "This Week")
        time: "4:45 PM",
        status: "Completed",
        paymentMethod: "Bank Transfer",
        product: {
          name: "Gaming Mechanical Keyboard",
          sku: "GMK-2024-001",
          qty: 1,
          unitPrice: 149.99,
          imageUrl:
            "https://gateway.pinata.cloud/ipfs/QmWKVVCz2XkBUSW3T3zZwoNCtGQSWvEtQzR9iQoS34F887", // Sample image URL
        },
        buyer: {
          name: "Mike Wilson",
          email: "mike.w@email.com",
          phone: "+1 (555) 456-7890",
        },
        shippingAddress: {
          street: "789 Pine Street",
          city: "Chicago",
          state: "IL",
          postalCode: "60601",
          country: "United States",
        },
        breakdown: {
          subtotal: 149.99,
          shipping: 7.99,
          tax: 12.64,
          total: 170.62,
        },
      },
      {
        id: 4,
        paymentId: "PAY-2024-004",
        date: "June 20, 2025", // Last month (within "This Month" but not "This Week" or "Today")
        time: "1:00 PM",
        status: "Completed",
        paymentMethod: "Credit Card",
        product: {
          name: "Smart Home Hub",
          sku: "SHH-2024-001",
          qty: 1,
          unitPrice: 89.99,
          imageUrl:
            "https://gateway.pinata.cloud/ipfs/QmdTtLSkDbTFb1ftkQduErQ18gYnyD4mJcZ9u2eWHCurYd",
        },
        buyer: {
          name: "Emily White",
          email: "emily.w@email.com",
          phone: "+1 (555) 111-2222",
        },
        shippingAddress: {
          street: "101 Elm Street",
          city: "Seattle",
          state: "WA",
          postalCode: "98101",
          country: "United States",
        },
        breakdown: {
          subtotal: 89.99,
          shipping: 5.0,
          tax: 7.65,
          total: 102.64,
        },
      },
    ],
  };

  // Helper function to filter payments based on the selected time frame
  const getFilteredPayments = () => {
    const today = new Date("July 14, 2025"); // Hardcoded current date for consistent sample output
    today.setHours(0, 0, 0, 0); // Normalize to start of day

    const oneDay = 24 * 60 * 60 * 1000; // milliseconds in a day
    const sevenDaysAgo = new Date(today.getTime() - 6 * oneDay); // Start of "This Week" (last 7 days including today)
    sevenDaysAgo.setHours(0, 0, 0, 0);

    const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    firstDayOfMonth.setHours(0, 0, 0, 0);

    return dashboardData.paymentRecords.filter((payment) => {
      const paymentDate = new Date(`${payment.date} ${payment.time}`);
      paymentDate.setHours(0, 0, 0, 0); // Normalize payment date to start of day

      switch (selectedPaymentFilter) {
        case "Today":
          return paymentDate.getTime() === today.getTime();
        case "This Week":
          return (
            paymentDate.getTime() >= sevenDaysAgo.getTime() &&
            paymentDate.getTime() <= today.getTime()
          );
        case "This Month":
          return (
            paymentDate.getFullYear() === today.getFullYear() &&
            paymentDate.getMonth() === today.getMonth()
          );
        case "All Payments":
        default:
          return true; // Show all payments
      }
    });
  };

  // Placeholder functions for navigation
  const handleGoToProducts = () => {
    alert("Navigating to Product Management...");
    // router.push('/seller/products');
  };

  const handleGoToOrders = () => {
    alert("Navigating to Order Management...");
    // router.push('/seller/orders');
  };

  const handleViewReports = () => {
    alert("Navigating to Performance Reports...");
    // router.push('/seller/reports');
  };

  const handleAccountSettings = () => {
    alert("Navigating to Account Settings...");
    // router.push('/seller/settings');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50 py-12 px-4 sm:px-6 lg:px-8 font-inter">
      <div className="max-w-6xl mx-auto w-full">
        {/* Header Section */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-orange-500 rounded-full mb-4 shadow-lg">
            <Store className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl font-extrabold text-gray-900 mb-3">
            Seller Dashboard
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Welcome back! Here's an overview of your business performance and
            quick access to essential tools.
          </p>
        </div>

        {/* Key Metrics Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {/* Metric Card: Total Products */}
          <div className="bg-white rounded-xl shadow-md p-6 flex items-center space-x-4 transition-all duration-300 hover:shadow-lg hover:scale-[1.02]">
            <div className="flex-shrink-0 bg-blue-100 p-3 rounded-full">
              <Package className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <p className="text-gray-500 text-sm font-medium">
                Total Products
              </p>
              <p className="text-2xl font-semibold text-gray-900">
                {dashboardData.totalProducts}
              </p>
            </div>
          </div>

          {/* Metric Card: Total Sales */}
          <div className="bg-white rounded-xl shadow-md p-6 flex items-center space-x-4 transition-all duration-300 hover:shadow-lg hover:scale-[1.02]">
            <div className="flex-shrink-0 bg-green-100 p-3 rounded-full">
              <DollarSign className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <p className="text-gray-500 text-sm font-medium">
                Total Sales (Month)
              </p>
              <p className="text-2xl font-semibold text-gray-900">
                ${dashboardData.totalSales}
              </p>
            </div>
          </div>

          {/* Metric Card: New Orders */}
          <div className="bg-white rounded-xl shadow-md p-6 flex items-center space-x-4 transition-all duration-300 hover:shadow-lg hover:scale-[1.02]">
            <div className="flex-shrink-0 bg-purple-100 p-3 rounded-full">
              <TrendingUp className="h-6 w-6 text-purple-600" />
            </div>
            <div>
              <p className="text-gray-500 text-sm font-medium">New Orders</p>
              <p className="text-2xl font-semibold text-gray-900">
                {dashboardData.newOrders}
              </p>
            </div>
          </div>
        </div>

        {/* Payment Summary Section */}
        <div className="bg-white rounded-xl shadow-xl p-8 mb-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
            <DollarSign className="w-7 h-7 text-orange-500" />
            Payment Summary
          </h2>

          {/* Payment Filter Buttons */}
          <div className="mb-6">
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedPaymentFilter("All Payments")}
                className={`px-4 py-2 rounded-lg text-sm font-medium ${
                  selectedPaymentFilter === "All Payments"
                    ? "bg-orange-500 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                All Payments
              </button>
              <button
                onClick={() => setSelectedPaymentFilter("Today")}
                className={`px-4 py-2 rounded-lg text-sm font-medium ${
                  selectedPaymentFilter === "Today"
                    ? "bg-orange-500 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                Today
              </button>
              <button
                onClick={() => setSelectedPaymentFilter("This Week")}
                className={`px-4 py-2 rounded-lg text-sm font-medium ${
                  selectedPaymentFilter === "This Week"
                    ? "bg-orange-500 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                This Week
              </button>
              <button
                onClick={() => setSelectedPaymentFilter("This Month")}
                className={`px-4 py-2 rounded-lg text-sm font-medium ${
                  selectedPaymentFilter === "This Month"
                    ? "bg-orange-500 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                This Month
              </button>
            </div>
          </div>

          {/* Payment Records */}
          <div className="space-y-6">
            {getFilteredPayments().map((payment) => (
              <div
                key={payment.id}
                className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow duration-200"
              >
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      Payment #{payment.paymentId}
                    </h3>
                    <p className="text-sm text-gray-500">
                      Paid on {payment.date} at {payment.time}
                    </p>
                  </div>
                  <div className="flex items-center gap-3 mt-2 lg:mt-0">
                    <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                      ✓ {payment.status}
                    </span>
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        payment.paymentMethod === "Credit Card"
                          ? "bg-blue-100 text-blue-800"
                          : payment.paymentMethod === "PayPal"
                          ? "bg-purple-100 text-purple-800"
                          : "bg-indigo-100 text-indigo-800"
                      }`}
                    >
                      {payment.paymentMethod}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                  {/* Product Image & Details */}
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-medium text-gray-900 mb-3">Product</h4>
                    <div className="flex items-center gap-3">
                      <img
                        src={payment.product.imageUrl}
                        alt={payment.product.name}
                        className="w-16 h-16 object-cover rounded-lg"
                        onError={(e) => {
                          e.target.onerror = null; // Prevents infinite loop
                          e.target.src = `https://placehold.co/64x64/cccccc/white?text=No+Image`; // Placeholder image
                        }}
                      />
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          {payment.product.name}
                        </p>
                        <p className="text-xs text-gray-600">
                          SKU: {payment.product.sku}
                        </p>
                        <p className="text-xs text-gray-600">
                          Qty: {payment.product.qty} × $
                          {payment.product.unitPrice.toFixed(2)}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Buyer Information */}
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-medium text-gray-900 mb-2">
                      Buyer Details
                    </h4>
                    <p className="text-sm text-gray-600">
                      {payment.buyer.name}
                    </p>
                    <p className="text-sm text-gray-600">
                      {payment.buyer.email}
                    </p>
                    <p className="text-sm text-gray-600">
                      {payment.buyer.phone}
                    </p>
                  </div>

                  {/* Shipping Address */}
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-medium text-gray-900 mb-2">
                      Shipping Address
                    </h4>
                    <p className="text-sm text-gray-600">
                      {payment.shippingAddress.street}
                    </p>
                    <p className="text-sm text-gray-600">
                      {payment.shippingAddress.city},{" "}
                      {payment.shippingAddress.state}{" "}
                      {payment.shippingAddress.postalCode}
                    </p>
                    <p className="text-sm text-gray-600">
                      {payment.shippingAddress.country}
                    </p>
                  </div>

                  {/* Payment Breakdown */}
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-medium text-gray-900 mb-2">
                      Payment Breakdown
                    </h4>
                    <div className="space-y-1 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Subtotal:</span>
                        <span className="text-gray-900">
                          ${payment.breakdown.subtotal.toFixed(2)}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Shipping:</span>
                        <span className="text-gray-900">
                          ${payment.breakdown.shipping.toFixed(2)}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Tax:</span>
                        <span className="text-gray-900">
                          ${payment.breakdown.tax.toFixed(2)}
                        </span>
                      </div>
                      <div className="flex justify-between font-semibold border-t pt-1">
                        <span className="text-gray-900">Total Paid:</span>
                        <span className="text-green-600">
                          ${payment.breakdown.total.toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  <button className="px-4 py-2 bg-green-100 text-green-700 rounded-lg text-sm font-medium hover:bg-green-200">
                    ✓ Payment Received
                  </button>
                  <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200">
                    View Receipt
                  </button>
                  <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200">
                    Download Invoice
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity Section */}
        <div className="bg-white rounded-xl shadow-xl p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Recent Activity
          </h2>
          <ul className="space-y-4">
            {dashboardData.recentActivities.map((activity) => (
              <li
                key={activity.id}
                className="flex items-center space-x-3 text-gray-700"
              >
                {activity.type === "order" && (
                  <CheckCircle className="w-5 h-5 text-green-500" />
                )}
                {activity.type === "product_update" && (
                  <Package className="w-5 h-5 text-blue-500" />
                )}
                {activity.type === "payout" && (
                  <DollarSign className="w-5 h-5 text-green-500" />
                )}
                <span>{activity.content}</span>
                <span className="text-gray-500 text-sm ml-auto">
                  {activity.time}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}