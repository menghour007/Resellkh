"use client";

import { useEffect, useState } from "react";
import EditProfilePage from "@/components/profile/EditProfilePage";

export default function EditProfileWrapper() {
  const [sellerId, setSellerId] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");

    if (token && userId) {
      setSellerId(userId);
    }

    setLoading(false);
  }, []);

  if (loading) return <p className="text-center py-10">Checking auth...</p>;

  if (!sellerId) {
    return (
      <p className="text-center py-10 text-red-500">
        Please login to view this profile
      </p>
    );
  }

  return <EditProfilePage sellerId={sellerId} />;
}
