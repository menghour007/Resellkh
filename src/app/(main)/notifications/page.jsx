"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { 
  fetchAllNotifications,
  markNotificationAsRead,
  parseJwt,
  formatTimestamp
} from "@/components/services/notification.service";

// ✅ Categorize notifications
const categorizeByTime = (notifications) => {
  const now = new Date();
  const today = [];
  const lastWeek = [];
  const older = [];

  notifications.forEach((notification) => {
    const notificationDate = new Date(notification.createdAt);
    const diffInDays = Math.floor((now - notificationDate) / (1000 * 60 * 60 * 24));

    if (diffInDays < 1) {
      today.push(notification);
    } else if (diffInDays < 7) {
      lastWeek.push(notification);
    } else {
      older.push(notification);
    }
  });

  return { today, lastWeek, older };
};

export default function Notifications() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("all");
  const [expandedNotifications, setExpandedNotifications] = useState(new Set());

  useEffect(() => {
    const loadNotifications = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const token = localStorage.getItem("token");
        const userData = parseJwt(token);
        const userId = userData?.userId || userData?.id;

        if (!token || !userId) {
          throw new Error("Authentication required");
        }

        const notifications = await fetchAllNotifications(token, userId);

        const mappedNotifications = notifications.map((notification) => ({
          id: notification.id,
          type: notification.title,
          content: notification.content,
          avatar: notification.iconUrl,
          timestamp: formatTimestamp(notification.createdAt),
          unread: !notification.isRead,
          createdAt: notification.createdAt,
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

  const handleNotificationClick = async (notificationId, newExpandedSet = null) => {
  try {
    if (notificationId === "__toggleExpandOnly__" && newExpandedSet) {
      setExpandedNotifications(newExpandedSet);
      return;
    }

    const newExpanded = new Set(expandedNotifications);
    if (newExpanded.has(notificationId)) {
      newExpanded.delete(notificationId);
    } else {
      newExpanded.add(notificationId);
    }

    const notification = notifications.find((n) => n.id === notificationId);
    if (notification && notification.unread) {
      const token = localStorage.getItem("token");
      const userData = parseJwt(token);
      const userId = userData?.userId || userData?.id;

      if (token && userId) {
        await markNotificationAsRead(token, userId, notificationId);
        setNotifications((prev) =>
          prev.map((n) =>
            n.id === notificationId ? { ...n, unread: false } : n
          )
        );
      }
    }

    setExpandedNotifications(newExpanded);
  } catch (error) {
    console.error("Error marking notification as read:", error);
  }
};


  const filteredNotifications = notifications.filter((n) =>
    activeTab === "all" ? true : n.unread
  );

  const { today, lastWeek, older } = categorizeByTime(filteredNotifications);
  const allCount = notifications.length;
  const unreadCount = notifications.filter((n) => n.unread).length;

  if (loading) return <NotificationLoadingState />;
  if (error) return <NotificationErrorState error={error} />;

  return (
    <section className="w-full px-[7%] py-6">
      <div className="bg-white border border-gray-300 rounded-[24px] p-6 sm:p-10 shadow-sm">
        <h1 className="text-xl sm:text-2xl font-semibold mb-6">Notifications</h1>

        <NotificationTabs 
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          allCount={allCount}
          unreadCount={unreadCount}
        />

        {today.length === 0 && lastWeek.length === 0 && older.length === 0 ? (
          <NoNotificationsMessage activeTab={activeTab} />
        ) : (
          <>
            {today.length > 0 && (
              <NotificationSection
                title="Today"
                data={today}
                expandedNotifications={expandedNotifications}
                onNotificationClick={handleNotificationClick}
              />
            )}
            {lastWeek.length > 0 && (
              <NotificationSection
                title="Last week"
                data={lastWeek}
                expandedNotifications={expandedNotifications}
                onNotificationClick={handleNotificationClick}
              />
            )}
            {older.length > 0 && (
              <NotificationSection
                title="Earlier"
                data={older}
                expandedNotifications={expandedNotifications}
                onNotificationClick={handleNotificationClick}
              />
            )}
          </>
        )}
      </div>
    </section>
  );
}

// Subcomponents

function NotificationLoadingState() {
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

function NotificationErrorState({ error }) {
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

function NotificationTabs({ activeTab, setActiveTab, allCount, unreadCount }) {
  return (
    <div className="flex justify-center items-center gap-10 border-b pb-4 mb-6 text-sm sm:text-base">
      {["all", "unread"].map((tab) => {
        const isActive = activeTab === tab;
        const count = tab === "all" ? allCount : unreadCount;

        return (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex items-center gap-2 font-medium relative pb-1 transition ${
              isActive ? "text-black border-b-2 border-black" : "text-gray-600"
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
  );
}

function NotificationSection({ title, data, expandedNotifications, onNotificationClick }) {
  if (!data.length) return null;

  const truncateText = (text, maxLength = 100) => {
    if (text.length <= maxLength) return text;
    const truncated = text.substring(0, maxLength);
    const lastSpace = truncated.lastIndexOf(" ");
    return lastSpace > 0
      ? truncated.substring(0, lastSpace) + "..."
      : truncated + "...";
  };

  return (
    <div className="mb-8">
      <h2 className="text-sm font-semibold text-gray-700 mb-4 flex items-center gap-2">
        <span role="img" aria-label="Time-based section">🕒</span> {title}
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
              <Image
                src={item.avatar || "/image-notifications.png"}
                alt="notification icon"
                width={48}
                height={48}
                className="w-12 h-12 rounded-full object-cover"
              />

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
                        <span
                          className="text-blue-600 hover:text-blue-800 ml-1 font-medium cursor-pointer"
                          onClick={(e) => {
                            e.stopPropagation(); // 🔒 Prevent toggling read state
                            const newExpanded = new Set(expandedNotifications);
                            if (newExpanded.has(item.id)) {
                              newExpanded.delete(item.id);
                            } else {
                              newExpanded.add(item.id);
                            }
                            // 🔄 Call setter to re-render
                            onNotificationClick("__toggleExpandOnly__", newExpanded);
                          }}
                        >
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


function NoNotificationsMessage({ activeTab }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
    <img
      src="/images/story set/no notification.jpg"
      alt="No Notifications"
      className="w-[320px] h-auto mb-6"
    />
    <p className="text-sm text-gray-600">
      You don’t have any <span className="font-semibold">{activeTab}</span> notifications yet.
    </p>
  </div>
  );
}
