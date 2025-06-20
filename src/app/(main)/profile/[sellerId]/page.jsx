// File: src/app/(main)/profile/[userId]/page.jsx
"use client";

import ProfileBanner from "@/components/profile/ProfileBanner";
import ProfileTabs from "@/components/profile/ProfileTabs";
import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { Edit } from "lucide-react";
import EditProfilePage from "@/components/profile/EditProfilePage";
// import { useSession } from 'next-auth/react'; // or any auth state


export default function SellerProfilePage() {
  //  const [activeTab, setActiveTab] = useState("listings");
   const searchParams = useSearchParams();
  const defaultTab = searchParams.get("tab") || "listings";
  const [activeTab, setActiveTab] = useState(defaultTab);

  // const { data: session } = useSession(); // assuming you're using NextAuth
  // const isOwner = session?.user?.id === profileUser?.id;

  const userData = {
    name: "Bou Leakhena",
    avatar: "/girl 2.jpg",
    cover: "/cover.jpg",
    rating: 4.5,
    reviewsCount: 2,
  };


  return (
    <>
    <div className="max-w-full px-[7%] py-4 mx-auto">
      <ProfileBanner isOwner={true} user={userData} />
      {/* <ProfileBanner isOwner={isOwner} user={profileUser} /> */}
      <ProfileTabs activeTab={activeTab} setActiveTab={setActiveTab}/>
    </div>
    </>
  );
}
