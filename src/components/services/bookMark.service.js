const API_BASE = "https://phil-whom-hide-lynn.trycloudflare.com/api/v1/favourites";

export async function fetchFavouritesByUserId(userId, token) {
  if (!userId || !token) {
    throw new Error("User ID and token are required");
  }

  try {
    const response = await fetch(`${API_BASE}/with-products/${userId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      }
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      throw new Error(error.message || "Failed to fetch favorites");
    }

    const data = await response.json();
    return data.payload || [];
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
}

export async function addToFavourites(body, token) {
  if (!token) throw new Error("Authentication required");

  try {
    const response = await fetch(API_BASE, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify(body)
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      throw new Error(error.message || "Failed to add favorite");
    }

    return await response.json();
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
}

export async function removeFromFavourites(productId, userId, token) {
  if (!productId || !userId || !token) {
    throw new Error("Missing required parameters");
  }

  try {
    const response = await fetch(
      `${API_BASE}?userId=${userId}&productId=${productId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        }
      }
    );

    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      throw new Error(error.message || "Failed to remove favorite");
    }

    return await response.json();
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
}