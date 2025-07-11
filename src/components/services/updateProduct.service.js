export const updateProduct = async (
  productId,
  productData,
  newFiles,
  token
) => {
  try {
    const formData = new FormData();
    for (const key in productData) {
      if (productData[key] !== null && productData[key] !== undefined) {
        formData.append(key, productData[key]);
      }
    }
    if (newFiles && newFiles.length > 0) {
      newFiles.forEach((file) => {
        formData.append("files", file);
      });
    }

    const response = await fetch(
      `https://phil-whom-hide-lynn.trycloudflare.com/api/v1/products/updateproduct/${productId}`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      }
    );

    if (!response.ok) {
      let errorMessage = "Failed to update product";
      try {
        const errorData = await response.json();
        errorMessage = errorData.message || errorMessage;
      } catch (e) {
        console.error("Failed to parse error response:", e);
      }
      throw new Error(errorMessage);
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error updating product:", error);
    throw error;
  }
};
