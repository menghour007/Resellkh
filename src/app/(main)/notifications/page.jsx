"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

export const fetchNotification = async (token, userId) => {
  const response = await fetch(
    `https://phil-whom-hide-lynn.trycloudflare.com/api/v1/notifications/all/${userId}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  const data = await response.json();
  return data;
};

export const fetchUpdateIsReadToTrue = async (token, userId, id) => {
  const response = await fetch(
    `https://phil-whom-hide-lynn.trycloudflare.com/api/v1/notifications/read/${userId}/${id}`,
    {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  const data = await response.json();
  return data;
};

const parseJwt = (token) => {
  try {
    return JSON.parse(atob(token.split(".")[1]));
  } catch (e) {
    return null;
  }
};

// Helper function to format timestamp
const formatTimestamp = (timestamp) => {
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

  // For older notifications, return formatted date
  return notificationDate.toLocaleDateString();
};

// Helper function to categorize notifications
const categorizeByTime = (notifications) => {
  const now = new Date();
  const today = [];
  const lastWeek = [];

  notifications.forEach((notification) => {
    const notificationDate = new Date(notification.createdAt);
    const diffInDays = Math.floor(
      (now - notificationDate) / (1000 * 60 * 60 * 24)
    );

    if (diffInDays < 1) {
      today.push(notification);
    } else if (diffInDays < 7) {
      lastWeek.push(notification);
    }
  });

  return { today, lastWeek };
};

export default function Notifications() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("all");
  const [expandedNotifications, setExpandedNotifications] = useState(new Set());

  // Fetch notifications on component mount
  useEffect(() => {
    const loadNotifications = async () => {
      try {
        setLoading(true);
        // Get token and userId from localStorage or wherever you store them
        const token = localStorage.getItem("token"); // Adjust based on your auth implementation
        const userData = parseJwt(token);
        const userId = userData?.userId || userData?.id; // Adjust based on your JWT structure

        if (!token || !userId) {
          throw new Error("Authentication required");
        }

        const response = await fetchNotification(token, userId);

        // Map the API response to your component's expected structure
        const mappedNotifications = response.payload.map((notification) => ({
          id: notification.id,
          type: notification.title,
          content: notification.content,
          avatar: notification.iconUrl,
          timestamp: formatTimestamp(notification.createdAt),
          unread: !notification.isRead, // Convert isRead to unread
          createdAt: notification.createdAt, // Keep original for categorization
        }));

        setNotifications(mappedNotifications);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadNotifications();
  }, []);

  // Handle notification click to expand and mark as read
  const handleNotificationClick = async (notificationId) => {
    try {
      // Toggle expanded state
      const newExpanded = new Set(expandedNotifications);
      if (newExpanded.has(notificationId)) {
        newExpanded.delete(notificationId);
      } else {
        newExpanded.add(notificationId);

        // Find the notification and mark as read if it's unread
        const notification = notifications.find((n) => n.id === notificationId);
        if (notification && notification.unread) {
          const token = localStorage.getItem("token");
          const userData = parseJwt(token);
          const userId = userData?.userId || userData?.id;

          if (token && userId) {
            // Call API to mark as read
            await fetchUpdateIsReadToTrue(token, userId, notificationId);

            // Update local state
            setNotifications((prev) =>
              prev.map((n) =>
                n.id === notificationId ? { ...n, unread: false } : n
              )
            );
          }
        }
      }
      setExpandedNotifications(newExpanded);
    } catch (error) {
      console.error("Error marking notification as read:", error);
    }
  };

  // Filter notifications based on active tab
  const filteredNotifications = notifications.filter((n) =>
    activeTab === "all" ? true : n.unread
  );

  // Categorize notifications by time
  const { today, lastWeek } = categorizeByTime(filteredNotifications);

  // Calculate counts for tabs
  const allCount = notifications.length;
  const unreadCount = notifications.filter((n) => n.unread).length;

  if (loading) {
    return (
      <section className="w-full px-[7%] py-6">
        <div className="bg-white border border-gray-300 rounded-[24px] p-6 sm:p-10 shadow-sm">
          <div className="flex justify-center items-center py-10">
            <div className="text-gray-500">Loading notifications...</div>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="w-full px-[7%] py-6">
        <div className="bg-white border border-gray-300 rounded-[24px] p-6 sm:p-10 shadow-sm">
          <div className="flex justify-center items-center py-10">
            <div className="text-red-500">Error: {error}</div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="w-full px-[7%] py-6">
      <div className="bg-white border border-gray-300 rounded-[24px] p-6 sm:p-10 shadow-sm">
        {/* Title */}
        <h1 className="text-xl sm:text-2xl font-semibold mb-6">
          Notifications
        </h1>

        {/* Tabs */}
        <div className="flex justify-center items-center gap-10 border-b pb-4 mb-6 text-sm sm:text-base">
          {["all", "unread"].map((tab) => {
            const isActive = activeTab === tab;
            const count = tab === "all" ? allCount : unreadCount;

            return (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex items-center gap-2 font-medium relative pb-1 transition ${
                  isActive
                    ? "text-black border-b-2 border-black"
                    : "text-gray-600"
                }`}
              >
                <span className="bg-orange-500 text-black text-[10px] sm:text-xs px-2 py-0.5 rounded-full">
                  {count}
                </span>
                <span>{tab === "all" ? "All" : "Unread"}</span>
              </button>
            );
          })}
        </div>

        {/* Sections */}
        <Section
          title="Today"
          data={today}
          expandedNotifications={expandedNotifications}
          onNotificationClick={handleNotificationClick}
        />
        <Section
          title="Last week"
          data={lastWeek}
          expandedNotifications={expandedNotifications}
          onNotificationClick={handleNotificationClick}
        />

        {/* No notifications message */}
        {filteredNotifications.length === 0 && (
          <div className="text-center py-10 text-gray-500">
            No {activeTab === "unread" ? "unread " : ""}notifications found.
          </div>
        )}
      </div>
    </section>
  );
}

function Section({ title, data, expandedNotifications, onNotificationClick }) {
  if (!data.length) return null;

  // Helper function to truncate text with better handling
  const truncateText = (text, maxLength = 100) => {
    if (text.length <= maxLength) return text;
    // Find the last space before the maxLength to avoid cutting words
    const truncated = text.substring(0, maxLength);
    const lastSpace = truncated.lastIndexOf(" ");
    return lastSpace > 0
      ? truncated.substring(0, lastSpace) + "..."
      : truncated + "...";
  };

  return (
    <div className="mb-8">
      <h2 className="text-sm font-semibold text-gray-700 mb-4 flex items-center gap-2">
        🕴 {title}
      </h2>
      <div className="space-y-4">
        {data.map((item) => {
          const isExpanded = expandedNotifications.has(item.id);
          const shouldTruncate = item.content.length > 100;
          const displayContent = isExpanded
            ? item.content
            : truncateText(item.content, 100);

          return (
            <div key={item.id} className="flex items-start gap-3 sm:gap-5">
              {/* Avatar */}
              <Image
                src={item.avatar || "/image-notifications.png"}
                alt="notification icon"
                width={48}
                height={48}
                className="w-12 h-12 rounded-full object-cover"
              />

              {/* Notification Box */}
              <div className="flex-1">
                <div
                  className={`w-full rounded-2xl px-4 py-3 flex flex-col sm:flex-row sm:justify-between sm:items-start cursor-pointer transition-colors hover:opacity-90 ${
                    item.unread ? "bg-[#eee7e7]" : "bg-gray-100"
                  }`}
                  onClick={() => onNotificationClick(item.id)}
                >
                  <div className="flex-1">
                    <h3 className="text-sm sm:text-base font-semibold text-black">
                      {item.type}
                    </h3>
                    <p className="text-sm text-gray-700 mt-1 leading-relaxed">
                      {displayContent}
                      {shouldTruncate && (
                        <span className="text-blue-600 hover:text-blue-800 ml-1 font-medium cursor-pointer">
                          {isExpanded ? " show less" : " read more"}
                        </span>
                      )}
                    </p>
                  </div>
                  <div className="flex flex-col items-end gap-1 mt-2 sm:mt-0">
                    <span className="text-xs text-gray-500 whitespace-nowrap">
                      {item.timestamp}
                    </span>
                    {item.unread && (
                      <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
