// src/services/productService.js or wherever you're keeping it
export const getProductById = async (productId) => {
  try {
    const res = await fetch(
      `https://phil-whom-hide-lynn.trycloudflare.com/api/v1/products/${productId}`,
      {
        cache: 'no-store',
      }
    );

    if (!res.ok) {
      throw new Error(`Failed to fetch product with ID ${productId}`);
    }

    const data = await res.json();

    // ✅ Extract only the product payload
    return data.payload || null;
  } catch (error) {
    console.error(`[getProductById] Error:`, error.message);
    return null;
  }
};
