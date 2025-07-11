export const deleteProduct = async (productId, token) => {
  try {
    const response = await fetch(
      `https://phil-whom-hide-lynn.trycloudflare.com/api/v1/products/${productId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        errorData.message || `Error deleting product: ${response.statusText}`
      );
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error in deleteProduct service:", error);
    throw error;
  }
};
