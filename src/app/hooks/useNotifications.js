'use client';
import useSWR from 'swr';
import { useMemo, useState } from 'react';

// ✅ Updated fetcher: normalize payload to array
const fetcher = async (url) => {
  const res = await fetch(url);
  if (!res.ok) throw new Error('Failed to fetch notifications');

  const json = await res.json();
  const payload = json.payload;

  return Array.isArray(payload) ? payload : [payload];
};

export default function useNotifications() {
  const [activeTab, setActiveTab] = useState('all');

  const { data, error, isLoading } = useSWR(
    'https://exchange-solely-finest-makers.trycloudflare.com/api/v1/notifications',
    fetcher
  );

  const notifications = data ?? [];

  const filtered = useMemo(() => {
    return activeTab === 'all'
      ? notifications
      : notifications.filter((n) => n.unread);
  }, [activeTab, notifications]);

  // ✅ Updated "Today" filter using real dates
  const today = useMemo(() => {
    return filtered.filter((n) => {
      const date = new Date(n.createdAt);
      const now = new Date();
      return date.toDateString() === now.toDateString();
    });
  }, [filtered]);

  const lastWeek = useMemo(() => {
    return filtered.filter((n) => {
      const date = new Date(n.createdAt);
      const now = new Date();
      const sevenDaysAgo = new Date();
      sevenDaysAgo.setDate(now.getDate() - 7);
      return date < now && date >= sevenDaysAgo && date.toDateString() !== now.toDateString();
    });
  }, [filtered]);

  return {
    activeTab,
    setActiveTab,
    today,
    lastWeek,
    loading: isLoading,
    error,
    allCount: notifications.length,
    unreadCount: notifications.filter((n) => n.unread).length,
  };
}
