// src/services/paymentsummary.service.js
const API_BASE_URL = "https://phil-whom-hide-lynn.trycloudflare.com/api/v1";

export const getPaymentReceiptByOrderId = async (orderId, token) => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/orders/seller/receipt/${orderId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          accept: "*/*",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      try {
        const errorJson = JSON.parse(errorText);
        throw new Error(
          `HTTP error! Status: ${response.status}, Message: ${
            errorJson.message || "Unknown error"
          }`
        );
      } catch {
        throw new Error(
          `HTTP error! Status: ${response.status}, Message: ${
            errorText || "Unknown error"
          }`
        );
      }
    }

    const data = await response.json();
    // IMPORTANT: Adjust 'data.payload' or 'data.orders' based on your actual API response structure
    // If your API directly returns an array of payment records, use 'data || []'
    return data.payload || data.orders || data || [];
  } catch (error) {
    console.error("Error fetching payment summary:", error);
    throw error;
  }
};
