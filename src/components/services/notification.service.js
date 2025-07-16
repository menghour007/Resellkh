const API_BASE_URL = "https://phil-whom-hide-lynn.trycloudflare.com/api/v1";

// ✅ Safe fetch with error handling
export const fetchAllNotifications = async (token, userId) => {
  const response = await fetch(`${API_BASE_URL}/notifications/all/${userId}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    // Read response as text to avoid .json() crash
    const errorText = await response.text();
    throw new Error(errorText || `HTTP error! status: ${response.status}`);
  }

  const data = await response.json();
  return data.payload || [];
};

export const markNotificationAsRead = async (token, userId, notificationId) => {
  const response = await fetch(
    `${API_BASE_URL}/notifications/read/${userId}/${notificationId}`,
    {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || `HTTP error! status: ${response.status}`);
  }

  return await response.json();
};

// ✅ JWT decode
export const parseJwt = (token) => {
  try {
    return JSON.parse(atob(token.split(".")[1]));
  } catch (e) {
    return null;
  }
};

// ✅ Timestamp formatting
export const formatTimestamp = (timestamp) => {
  const now = new Date();
  const notificationDate = new Date(timestamp);
  const diffInMs = now - notificationDate;
  const diffInMins = Math.floor(diffInMs / (1000 * 60));
  const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

  if (diffInMins < 1) return "Just Now";
  if (diffInMins < 60) return `${diffInMins} mins ago`;
  if (diffInHours < 24) return `${diffInHours}h ago`;
  if (diffInDays < 7) return `${diffInDays} days ago`;

  return notificationDate.toLocaleDateString();
};
