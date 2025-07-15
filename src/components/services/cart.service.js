
import axios from 'axios';

const API_BASE_URL = 'https://phil-whom-hide-lynn.trycloudflare.com/api/v1';

export const fetchCart = async (token) => {
  try {
    if (!token) return { count: 0, items: [] };

    const response = await axios.get(`${API_BASE_URL}/cart`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      timeout: 3000
    });

    if (response.status === 200 && response.data?.payload) {
      return {
        count: response.data.payload.length,
        items: response.data.payload
      };
    }
    return { count: 0, items: [] };
  } catch (error) {
    console.error('Cart fetch error:', error.message);
    return { count: 0, items: [] };
  }
};

export const fetchCartCount = async (token) => {
  try {
    if (!token) return 0;

    const response = await axios.get(`${API_BASE_URL}/cart`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      timeout: 3000
    });

    if (response.status === 200 && response.data?.payload) {
      return response.data.payload.length;
    }
    return 0;
  } catch (error) {
    console.error('Cart count fetch error:', error.message);
    return 0;
  }
};