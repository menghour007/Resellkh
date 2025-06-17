'use client';
import { useEffect, useMemo, useState } from 'react';

export default function useNotifications() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('all');

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        // ✅ MOCK DATA
        const mockData = [
          {
            id: 1,
            type: 'New Arrival',
            content: 'Big sale on new items! Don’t miss out.',
            timestamp: 'Just Now',
            unread: true,
          },
          {
            id: 2,
            type: 'Promotion',
            content: 'Get free shipping today only!',
            timestamp: '30 mins ago',
            unread: false,
          },
          {
            id: 3,
            type: 'New Arrival',
            content: 'New collection dropped! Shop now.',
            timestamp: '19/05/2025',
            unread: true,
          },
        ];
        setNotifications(mockData);
      } catch (err) {
        console.error('Failed to fetch notifications:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();
  }, []);

  const filtered = useMemo(() => {
    return activeTab === 'all'
      ? notifications
      : notifications.filter((n) => n.unread);
  }, [activeTab, notifications]);

  const today = useMemo(() => {
    return filtered.filter(
      (n) =>
        n.timestamp.toLowerCase().includes('now') ||
        n.timestamp.toLowerCase().includes('ago')
    );
  }, [filtered]);

  const lastWeek = useMemo(() => {
    return filtered.filter(
      (n) =>
        n.timestamp.includes('/') ||
        n.timestamp.toLowerCase().includes('week')
    );
  }, [filtered]);

  return {
    activeTab,
    setActiveTab,
    today,
    lastWeek,
    loading,
    allCount: notifications.length,
    unreadCount: notifications.filter((n) => n.unread).length,
  };
}
