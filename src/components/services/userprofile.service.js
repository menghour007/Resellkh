const API_BASE_URL = "https://phil-whom-hide-lynn.trycloudflare.com/api/v1"; // Your API base URL

export const fetchUserProfile = async (userId, token) => {
  if (!userId || !token) {
    throw new Error("User ID or authentication token is missing.");
  }

  try {
    const res = await fetch(
      `${API_BASE_URL}/profile/${userId}`, // Your profile endpoint
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (!res.ok) {
      // Attempt to parse error message from backend
      const errorData = await res
        .json()
        .catch(() => ({ message: "Failed to parse error response" }));
      throw new Error(
        errorData.message || `Failed to fetch user profile: ${res.status}`
      );
    }

    const json = await res.json();
    return json.payload; // Assuming your API returns { payload: userProfileData }
  } catch (err) {
    console.error("Error in fetchUserProfile:", err);
    throw err; // Re-throw to be handled by the calling component
  }
};
