export const productService = {
  fetchRecommendedProducts: async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        "https://phil-whom-hide-lynn.trycloudflare.com/api/v1/products",
        {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to fetch: ${response.status}`);
      }

      const data = await response.json();
      return data.payload || [];
    } catch (error) {
      console.error("Error fetching products:", error);
      throw error;
    }
  },
};