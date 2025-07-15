// services/productService.js
const API_BASE_URL = "https://phil-whom-hide-lynn.trycloudflare.com/api/v1";

export const fetchNearbyProducts = async (latitude, longitude, token) => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/products/nearby/${latitude}/${longitude}`,
      {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data.payload || [];
  } catch (error) {
    console.error("Error fetching nearby products:", error);
    throw error;
  }
};