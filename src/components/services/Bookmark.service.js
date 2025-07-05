const API_BASE = "https://phil-whom-hide-lynn.trycloudflare.com/api/v1/favourites";

export async function fetchFavouritesByUserId(userId, token) {
  const res = await fetch(`${API_BASE}/with-products/${userId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) throw new Error(await res.text());
  const json = await res.json();
  return Array.isArray(json.payload) ? json.payload : [];
}

export async function addToFavourites(product, token) {
  const res = await fetch(API_BASE, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(product),
  });

  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

export async function removeFromFavourites(productId, userId, token) {
  const url = `${API_BASE}?userId=${userId}&productId=${productId}`;

  const res = await fetch(url, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    const errorBody = await res.text();
    throw new Error(`Failed to remove from favorites: ${res.status} ${errorBody}`);
  }

  return res.json();
}
