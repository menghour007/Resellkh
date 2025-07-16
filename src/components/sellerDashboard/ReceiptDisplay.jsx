// components/sellerDashboard/ReceiptDisplay.jsx
"use client";

import React, { useState, useEffect } from "react";
import { XCircle, Printer } from "lucide-react";

import { getPaymentReceiptByOrderId } from "@/components/services/receiptorder.service"; // Correct path

const ReceiptDisplay = ({ orderId, onClose }) => {
  const [receiptDetails, setReceiptDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!orderId) {
      setError("No Order ID provided for receipt.");
      setIsLoading(false);
      return;
    }

    const fetchReceiptData = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const token =
          localStorage.getItem("authToken") ||
          localStorage.getItem("token") ||
          localStorage.getItem("accessToken");

        if (!token) {
          throw new Error("Authentication token not found. Please log in.");
        }

        const apiResponse = await getPaymentReceiptByOrderId(orderId, token);

        if (!apiResponse || apiResponse.length === 0) {
          setError("Receipt data not found for this order ID.");
          setReceiptDetails(null);
          return;
        }

        const orderData = apiResponse[0];

        const transformedData = {
          orderId: orderData.orderId,
          date: new Date(orderData.orderCreatedAt).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          }),
          customerName: orderData.buyerFullName,
          items: orderData.orderItems.map((item) => ({
            id: item.orderItemId,
            name: item.productName,
            qty: 1, // Assumption: Quantity is 1 if not provided by backend
            price: item.itemPriceAtPurchase,
          })),
          subtotal: orderData.orderSubTotal,
          shipping: orderData.orderDeliveryCharge,
          tax: 0,
          total: orderData.orderTotalAmount,
          paymentMethod: "Bank Transfer", // Defaulting as API response doesn't explicitly state
          deliveryAddress: orderData.buyerAddress,
        };

        setReceiptDetails(transformedData);
      } catch (err) {
        console.error("Error fetching receipt:", err);
        setError(
          err.message ||
            "An unexpected error occurred while fetching receipt details."
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchReceiptData();
  }, [orderId]);

  if (isLoading) {
    return (
      <div className="p-8 text-center bg-white rounded-lg shadow-xl min-w-[300px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p className="text-gray-700">Loading receipt...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8 text-center bg-red-50 rounded-lg shadow-xl min-w-[300px] border border-red-200">
        <p className="text-red-800 font-semibold mb-2">Error: {error}</p>
        <button
          onClick={onClose}
          className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg"
        >
          Close
        </button>
      </div>
    );
  }

  if (!receiptDetails) {
    return (
      <div className="p-8 text-center bg-gray-50 rounded-lg shadow-xl min-w-[300px]">
        <p className="text-gray-600">Receipt not found.</p>
        <button
          onClick={onClose}
          className="mt-4 px-4 py-2 bg-gray-400 text-white rounded-lg"
        >
          Close
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-4xl relative border border-gray-200">
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 z-10"
      >
        <XCircle className="w-6 h-6" />
      </button>

      <h2 className="text-2xl font-bold text-gray-900 mb-6 border-b pb-3">
        Receipt #{receiptDetails.orderId}
      </h2>

      <div className="flex flex-col sm:flex-row justify-between items-start mb-6 border-b pb-4">
        <div>
          <p className="text-sm text-gray-600">
            Date:{" "}
            <span className="font-medium text-gray-800">
              {receiptDetails.date}
            </span>
          </p>
          <p className="text-sm text-gray-600">
            Customer:{" "}
            <span className="font-medium text-gray-800">
              {receiptDetails.customerName}
            </span>
          </p>
        </div>
        <div className="sm:text-right mt-4 sm:mt-0">
          <p className="text-sm text-gray-600">
            Payment Method:{" "}
            <span className="font-medium text-gray-800">
              {receiptDetails.paymentMethod}
            </span>
          </p>
          <p className="text-sm text-gray-600">
            Delivery Address:{" "}
            <span className="font-medium text-gray-800">
              {receiptDetails.deliveryAddress}
            </span>
          </p>
        </div>
      </div>

      <div className="mb-6">
        <h3 className="font-semibold text-gray-800 mb-3">Items:</h3>
        {/* This is the div where hide-scrollbar is applied */}
        <div className="overflow-x-auto hide-scrollbar">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Product
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Qty
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Price
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {receiptDetails.items.map((item) => (
                <tr key={item.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {item.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {item.qty}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-gray-500">
                    ${item.price.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-right font-medium text-gray-900">
                    {(item.qty * item.price).toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="border-t border-gray-200 pt-4 mb-8">
        <div className="max-w-xs ml-auto space-y-2 text-sm">
          <div className="flex justify-between text-gray-700">
            <span>Subtotal:</span>
            <span>${receiptDetails.subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-gray-700">
            <span>Shipping:</span>
            <span>${receiptDetails.shipping.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-gray-700">
            <span>Tax:</span>
            <span>${receiptDetails.tax.toFixed(2)}</span>
          </div>
          <div className="flex justify-between font-bold text-lg text-gray-900 border-t pt-2 mt-2">
            <span>Total:</span>
            <span>${receiptDetails.total.toFixed(2)}</span>
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <button
          onClick={onClose}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Done
        </button>
      </div>
    </div>
  );
};

export default ReceiptDisplay;
