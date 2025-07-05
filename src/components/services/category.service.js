export const getProductsByMainCategoryId = async (mainCategoryId) => {
  try {
    const response = await fetch(
      `https://phil-whom-hide-lynn.trycloudflare.com/api/v1/products?mainCategoryId=${mainCategoryId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        next: {
          tags: ["category-products"],
        },
      }
    );

    const data = await response.json();

    const productsArray = Array.isArray(data.payload)
      ? data.payload
      : Array.isArray(data)
      ? data
      : [];

    console.log("🔍 Sample product:", productsArray[0]); 
    // Debug field names

    return productsArray.filter(
      (product) =>
        parseInt(product.mainCategoryId) === parseInt(mainCategoryId) // ✅ Use actual correct field name
    );
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};
