// src/components/services/category.service.js

export const getProductsByMainCategoryId = async (mainCategoryId) => {
  try {
    const response = await fetch(
      `https://phil-whom-hide-lynn.trycloudflare.com/api/v1/products`,
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

    return mainCategoryId
      ? productsArray.filter(
          (product) => parseInt(product.mainCategoryId) === parseInt(mainCategoryId)
        )
      : productsArray;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};
