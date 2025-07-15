export const getProductById = async (productId) => {
  try {
    const response = await fetch(`https://phil-whom-hide-lynn.trycloudflare.com/api/v1/products/${productId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Error fetching product: ${response.statusText}`);
    }

    const data = await response.json();
    return data.payload; // directly return the product object
  } catch (error) {
    console.error('Error in getProduct service:', error);
    throw error;
  }
}
