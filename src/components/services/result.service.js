const API_BASE_URL = 'https://phil-whom-hide-lynn.trycloudflare.com/api/v1/products/search-by-image';

export async function searchByImage(imageInput) {
  try {
    const formData = new FormData();

    if (typeof imageInput === 'string') {
      const response = await fetch(imageInput);
      if (!response.ok) throw new Error('Unable to fetch image from URL');
      const blob = await response.blob();
      formData.append('image', blob, 'scanned-image.jpg');
    } else {
      formData.append('image', imageInput);
    }

    const res = await fetch(`${API_BASE_URL}/products/search-by-image`, {
      method: 'POST',
      body: formData,
      cache: 'no-store'
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      throw new Error(errorData.message || 'Image search failed');
    }

    return await res.json();
  } catch (err) {
    console.error('searchByImage error:', err);
    throw err;
  }
}

export async function searchByText(query) {
  try {
    const res = await fetch(`${API_BASE_URL}/products/search?query=${encodeURIComponent(query)}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      next: {
        tags: ['search-results'],
        revalidate: 60,
      },
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      throw new Error(errorData.message || 'Text search failed');
    }

    return await res.json();
  } catch (err) {
    console.error('searchByText error:', err);
    throw err;
  }
}
