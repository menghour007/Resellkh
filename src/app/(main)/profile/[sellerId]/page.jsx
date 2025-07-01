// File: src/app/(main)/profile/[userId]/page.jsx
"use client";

import ProfileBanner from "@/components/profile/ProfileBanner";
import ProfileTabs from "@/components/profile/ProfileTabs";
import { useState, useEffect } from "react"; // ✅ FIXED HERE
import { useSearchParams } from "next/navigation";
import { Edit } from "lucide-react";
import EditProfilePage from "@/components/profile/EditProfilePage";

export default function SellerProfilePage() {
  //  const [activeTab, setActiveTab] = useState("listings");
  const searchParams = useSearchParams();
  const defaultTab = searchParams.get("tab") || "listings";
  const [activeTab, setActiveTab] = useState(defaultTab);

  const [userData, setUserData] = useState(null);

  function parseJwt(token) {
    try {
      return JSON.parse(atob(token.split(".")[1]));
    } catch (e) {
      console.error("Failed to parse JWT:", e);
      return null;
    }
  }

  useEffect(() => {
    const checkLogin = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        const decodedToken = parseJwt(token);
        const userId = decodedToken?.userId;

        if (userId) {
          try {
            const res = await fetch(
              `https://phil-whom-hide-lynn.trycloudflare.com/api/v1/profile/${userId}`,
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );

            if (!res.ok) throw new Error("Failed to fetch user profile");
            const data = await res.json();
            console.log("User profile API response:", data);
            if (data.payload) {
              setUserData({
                name: `${data.payload.firstName} ${data.payload.lastName}`,
                avatar: data.payload.profileImage || "/default-avatar.jpg",
                cover: data.payload.coverImage || "/cover.jpg",
                rating: 4.5,
                reviewsCount: 2,
              });
            } else {
              setUserData(null);
            }
          } catch (err) {
            console.error("Error fetching user:", err);
            setUserData(null);
          }
        }
      } else {
        setUserData(null);
      }
    };

    checkLogin();
    window.addEventListener("storage", checkLogin);
    return () => window.removeEventListener("storage", checkLogin);
  }, []);

  return (
    <>
      <div className="max-w-full px-[7%] py-4 mx-auto">
        <ProfileBanner isOwner={true} user={userData} />
        {/* <ProfileBanner isOwner={isOwner} user={profileUser} /> */}
        <ProfileTabs activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>
    </>
  );
}
