
/**
 * Fetches a single product by its ID from the API.
 * @param {string} productId - The ID of the product to fetch.
 * @returns {Promise<Object>} A promise that resolves to the product data.
 * @throws {Error} If the network response is not ok.
 */
export const getProductById = async (productId) => {
  // Replace this URL with your actual API endpoint
  const API_URL = `https://685b5b1189952852c2d9435c.mockapi.io/api/products/v1/products${productId}`;

  try {
    const response = await fetch(API_URL, {
      next: { revalidate: 60 },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch product data.');
    }

    const productData = await response.json();
    return productData;

  } catch (error) {
    console.error("Error fetching product:", error);
    throw error;
  }
};

// You can add other product-related API functions here
// export const getProductsByCategory = async (category) => { ... }
// export const createReview = async (productId, reviewData) => { ... }