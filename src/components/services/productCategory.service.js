const API_BASE_URL = 'https://phil-whom-hide-lynn.trycloudflare.com/api/v1';

export const getProductsByCategoryId = async (categoryId) => {
  // Get token from localStorage

  
 
  try {
    const response = await fetch(`${API_BASE_URL}/products/getbycategoryid/${categoryId}`, {
      method: 'GET',
      headers: {
        'accept': '*/*',
    
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data.payload || [];
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error; // Re-throw to handle in component
  }
};