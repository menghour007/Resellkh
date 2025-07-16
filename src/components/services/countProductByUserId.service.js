const API_BASE_URL = "https://phil-whom-hide-lynn.trycloudflare.com/api/v1";

export const getProductCountBySellerId = async (sellerId, token) => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/orders/countproduct/${sellerId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "*/*",
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
    // Here, `data` is a number (not an object), so just return it
    return data;
  } catch (error) {
    console.error("Error fetching product count:", error);
    throw error;
  }
};
