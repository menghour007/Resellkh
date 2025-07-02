export const getRecommendedProducts = async () => {
  const response = await fetch(
    "https://phil-whom-hide-lynn.trycloudflare.com/api/v1/products",
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      next: {
        tags: ["recommended-products"],
      },
    }
  );

  const data = await response.json();

  // Make sure you return the array of products only
  if (Array.isArray(data)) {
    return data;
  }

  // Try common patterns (adjust if your API structure is different)
  if (Array.isArray(data.payload)) {
    return data.payload;
  }

  if (Array.isArray(data.data)) {
    return data.data;
  }

  return []; // fallback if no products found
};
