export const getRecommendedProducts = async () => {
  const response = await fetch(
    "https://phil-whom-hide-lynn.trycloudflare.com/api/v1/products",
    {
      method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        next: {
           tags: ["recommended-products"] 
          }
    }
  );

  const data = await response.json();
  return data;
};
