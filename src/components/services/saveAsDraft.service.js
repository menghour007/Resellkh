import axios from "axios";

const API_URL = "https://phil-whom-hide-lynn.trycloudflare.com/api/v1/products";

export const saveAsDraft = async (formData, accessToken) => {
  const response = await axios.post(`${API_URL}/save-as-draft`, formData, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "multipart/form-data",
    },
    withCredentials: true,
  });

  return response.data;
};
