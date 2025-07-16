// components/sellerDashboard/PaymentSummary.jsx
"use client";

import React, { useState } from "react";
import {
  Search,
  ChevronDown,
  Filter,
  DollarSign,
  Receipt,
  Plus,
} from "lucide-react"; // Ensure Plus is imported for the button
import PaymentRecordCard from "./PaymentRecordCard";
import Modal from "./Modal";
import ReceiptDisplay from "./ReceiptDisplay";

const PaymentSummary = ({ allPaymentRecords }) => {
  const [selectedFilter, setSelectedFilter] = useState("All Payments");
  const [searchTerm, setSearchTerm] = useState("");
  const [showReceiptModal, setShowReceiptModal] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState(null);

  const handleFilterChange = (filter) => {
    setSelectedFilter(filter);
    // Filtering logic is in getFilteredPayments, which is called on render
  };

  const handleViewReceipt = (orderId) => {
    setSelectedOrderId(orderId);
    setShowReceiptModal(true);
  };

  const handleCloseReceiptModal = () => {
    setShowReceiptModal(false);
    setSelectedOrderId(null);
  };

  const getFilteredPayments = () => {
    // Use a fixed reference date for "Today", "This Week", "This Month" for consistent testing.
    // In a real application, you would use `new Date()` for the current actual date.
    // For demonstration using your provided data (July 15, 2025):
    const referenceDate = new Date("2025-07-16T00:00:00.000"); // Example: July 16, 2025, 00:00:00
    referenceDate.setHours(0, 0, 0, 0); // Normalize to start of day

    const oneDay = 24 * 60 * 60 * 1000;

    // Calculate dates relative to the referenceDate
    const todayStart = new Date(referenceDate);
    todayStart.setHours(0, 0, 0, 0);

    // This week: Start of the current week (e.g., Monday or Sunday)
    // For simplicity, let's consider "This Week" as the last 7 days including today.
    const sevenDaysAgo = new Date(referenceDate.getTime() - 6 * oneDay); // Last 7 full days (including today's start)
    sevenDaysAgo.setHours(0, 0, 0, 0);

    const thisMonthStart = new Date(
      referenceDate.getFullYear(),
      referenceDate.getMonth(),
      1
    );
    thisMonthStart.setHours(0, 0, 0, 0);

    const filteredByDate = allPaymentRecords.filter((payment) => {
      // Parse orderCreatedAt string into a Date object
      const orderDate = new Date(payment.orderCreatedAt);
      orderDate.setHours(0, 0, 0, 0); // Normalize order date to start of day

      switch (selectedFilter) {
        case "Today":
          return orderDate.getTime() === todayStart.getTime();
        case "This Week":
          // Check if the order date is within the last 7 days (inclusive of today)
          return (
            orderDate.getTime() >= sevenDaysAgo.getTime() &&
            orderDate.getTime() <= todayStart.getTime()
          );
        case "This Month":
          // Check if the order is in the same year and month as the reference date
          return (
            orderDate.getFullYear() === thisMonthStart.getFullYear() &&
            orderDate.getMonth() === thisMonthStart.getMonth()
          );
        case "All Payments":
        default:
          return true; // No date filter applied
      }
    });

    // Apply search term filtering to the date-filtered results
    return filteredByDate.filter((payment) => {
      if (searchTerm === "") return true; // No search term, include all
      const lowerCaseSearchTerm = searchTerm.toLowerCase();

      // Check payment ID, buyer name, or product name for the search term
      return (
        payment.paymentId
          .toString()
          .toLowerCase()
          .includes(lowerCaseSearchTerm) ||
        (payment.buyerFullName &&
          payment.buyerFullName.toLowerCase().includes(lowerCaseSearchTerm)) ||
        payment.orderItems.some(
          (item) =>
            item.productName &&
            item.productName.toLowerCase().includes(lowerCaseSearchTerm)
        )
      );
    });
  };

  const filteredRecords = getFilteredPayments();

  return (
    <div className="mt-8 bg-white rounded-2xl p-6 shadow-soft border border-gray-200">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
          <span className="p-2 bg-emerald-100 rounded-full">
            <DollarSign className="w-6 h-6 text-emerald-500" />
          </span>
          Payment Summary
        </h2>
        <div className="flex items-center space-x-2">
          <Filter className="w-4 h-4 text-gray-500" />
          <span className="text-sm text-gray-500">Filter by:</span>
        </div>
      </div>

      {/* Filter Buttons */}
      <div className="mb-6">
        <div className="flex flex-wrap gap-2">
          {["All Payments"].map((filter) => (
            <button
              key={filter}
              onClick={() => handleFilterChange(filter)}
              className={`px-6 py-3 rounded-xl text-sm font-medium transition-all duration-300 ${
                selectedFilter === filter
                  ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg transform scale-105"
                  : "bg-white/50 text-gray-700 hover:bg-white/80 border border-gray-200/50"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      {/* Conditional Rendering for Payment Records */}
      <div className="space-y-6">
        {filteredRecords.length > 0 ? (
          filteredRecords.map((payment) => (
            <PaymentRecordCard
              key={payment.id}
              payment={payment}
              onViewReceipt={handleViewReceipt}
            />
          ))
        ) : (
          <div className="text-center py-10 text-gray-500 bg-gray-50 rounded-lg">
            <Receipt className="w-16 h-16 mx-auto mb-4 text-gray-300" />
            <p className="text-lg font-semibold mb-2">No Payments Found</p>
            <p className="max-w-md mx-auto mb-6">
              It looks like there are no payment records for the selected
              period. Start selling to see your earnings here!
            </p>
            <button className="px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl text-base font-medium hover:from-blue-600 hover:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
              <Plus className="w-5 h-5 inline-block mr-2" /> List Your First
              Product
            </button>
          </div>
        )}
      </div>

      {/* Modal for ReceiptDisplay */}
      {showReceiptModal && (
        <Modal onClose={handleCloseReceiptModal}>
          <ReceiptDisplay
            orderId={selectedOrderId}
            onClose={handleCloseReceiptModal}
          />
        </Modal>
      )}
    </div>
  );
};

export default PaymentSummary;
