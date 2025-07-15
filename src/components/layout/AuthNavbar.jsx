// AuthNavbar.js
"use client";

import { useState, useEffect, useRef } from "react";
import LocationDropdown from "./navbar/LocationDropdown";
import SearchBar from "./navbar/SearchBar";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import ImageScanModal from "./navbar/ImageScanModal";
import ConfirmLogout from "./navbar/Confirmlogout";
import { signOut } from "next-auth/react";
import { encryptId } from "@/utils/encryption";
import { Store, LayoutDashboard, ShoppingCart } from "lucide-react";
import Image from "next/image"; // Import Image for user avatar

export default function AuthNavbar() {
  const [user, setUser] = useState(null);
  const [scanOpen, setScanOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const profileRef = useRef(null);
  const router = useRouter();
  const pathname = usePathname();
  const [categoryOpen, setCategoryOpen] = useState(false);
  const desktopCategoryRef = useRef(null);
  const mobileCategoryRef = useRef(null);
  const [cartItemCount, setCartItemCount] = useState(0);

  const categoryMap = {
    accessories: 1, beauty: 2, equipment_bag_shoes: 3, book: 4, fashion: 5,
    home: 6, sports_kids: 7, electronic: 8, vehicle: 9, other: 10,
  };

  const topCategories = [
    { name: "Fashion", key: "fashion" },
    { name: "Accessories", key: "accessories" },
    { name: "Equipment & Shoes", key: "equipment_bag_shoes" },
    { name: "Beauty", key: "beauty", showOn: "lg" },
    { name: "Book", key: "book", showOn: "lg" },
  ];

  const dropdownCategories = [
    { name: "Home", key: "home" },
    { name: "Sports & Kids", key: "sports_kids" },
    { name: "Electronic", key: "electronic" },
    { name: "Vehicle", key: "vehicle" },
    { name: "Other", key: "other" },
  ];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setProfileOpen(false);
      }
      if (
        desktopCategoryRef.current &&
        !desktopCategoryRef.current.contains(event.target) &&
        mobileCategoryRef.current &&
        !mobileCategoryRef.current.contains(event.target)
      ) {
        setCategoryOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const fetchCartCount = async () => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");

    if (!token || !userId) {
      setCartItemCount(0);
      return;
    }

    try {
      const res = await fetch(
        `https://phil-whom-hide-lynn.trycloudflare.com/api/v1/cart/count?userId=${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (res.ok) {
        const data = await res.json();
        setCartItemCount(data.payload?.count || 0);
      } else {
        console.error("Failed to fetch cart count:", res.statusText);
        setCartItemCount(0);
      }
    } catch (err) {
      console.error("Error fetching cart count:", err);
      setCartItemCount(0);
    }
  };

  useEffect(() => {
    const loadInitialData = async () => {
      const cachedUser = localStorage.getItem("cachedUser");
      if (cachedUser) {
        try {
          const parsedUser = JSON.parse(cachedUser);
          setUser(parsedUser);
          setCartItemCount(parsedUser.cartItemCount || 0);
        } catch (e) {
          console.error("Error parsing cached user data", e);
        }
      }

      const token = localStorage.getItem("token");
      const userId = localStorage.getItem("userId");

      if (!token || !userId) {
        setUser(null);
        setCartItemCount(0);
        return;
      }

      try {
        const res = await fetch(
          `https://phil-whom-hide-lynn.trycloudflare.com/api/v1/profile/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (res.ok) {
          const data = await res.json();
          const userProfile = {
            id: userId,
            name: `${data.payload?.firstName || ""} ${data.payload?.lastName || ""}`.trim() || "User",
            avatar: data.payload?.profileImage || "https://media.istockphoto.com/id/1495088043/vector/user-profile-icon-avatar-or-person-icon-profile-picture-portrait-symbol-default-portrait.jpg?s=612x612&w=0&k=20&c=dhV2p1JwmloBTOaGAataA3AW1KSnjsdMt7-U_3EZElZ0=",
            isSellerFormCompleted: data.payload?.seller || false,
            cartItemCount: data.payload?.cartItemCount || 0,
          };
        
          
          localStorage.setItem("cachedUser", JSON.stringify(userProfile));
          setUser(userProfile);
          setCartItemCount(userProfile.cartItemCount);
        } else {
          console.error("Failed to fetch user profile:", res.statusText);
          setUser(null);
          setCartItemCount(0);
        }
      } catch (err) {
        console.error("Error fetching user profile:", err);
        setUser(null);
        setCartItemCount(0);
      } finally {
        fetchCartCount(); // Ensures accuracy after initial load
      }
    };

    loadInitialData();

    // --- MODIFIED: Event listener to handle cart updates directly ---
    const handleCartUpdatedEvent = (event) => {
      if (event.detail && event.detail.type === 'increment') {
        setCartItemCount(prevCount => prevCount + event.detail.quantity);
      } else if (event.detail && event.detail.type === 'decrement') {
        setCartItemCount(prevCount => Math.max(0, prevCount - event.detail.quantity));
      } else {
        // Fallback: If event type is unknown or just a generic 'cart-updated', refetch
        fetchCartCount(); 
      }
    };

    const handleAuthChange = () => loadInitialData();
    const handleProfileUpdate = () => loadInitialData();


    window.addEventListener("cart-updated", handleCartUpdatedEvent);
    window.addEventListener("auth-change", handleAuthChange);
    window.addEventListener("profile-updated", handleProfileUpdate);

    return () => {
      window.removeEventListener("cart-updated", handleCartUpdatedEvent);
      window.removeEventListener("auth-change", handleAuthChange);
      window.removeEventListener("profile-updated", handleProfileUpdate);
    };
  }, []);

  useEffect(() => {
    setProfileOpen(false);
    setCategoryOpen(false);
  }, [pathname]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("email");
    localStorage.removeItem("role");
    localStorage.removeItem("firstName");
    localStorage.removeItem("lastName");
    localStorage.removeItem("profileImage");
    localStorage.removeItem("cachedUser");

    setShowLogoutModal(false);
    setUser(null);
    setCartItemCount(0);
    signOut({ callbackUrl: "/" });
  };

  const handleBecomeSellerClick = () => {
    setProfileOpen(false);
    router.push("/seller/register");
  };

  const handleSellerDashboardClick = () => {
    setProfileOpen(false);
    router.push("/seller/dashboard");
  };

  const getEncryptedProfileId = (id) => {
    try {
      if (!id) return "";
      const encrypted = encryptId(id.toString());
      return encodeURIComponent(encrypted);
    } catch (error) {
      console.error("Profile ID encryption failed:", error);
      return "";
    }
  };

  return (
    <div className="w-full sticky top-0 z-[200] bg-white px-[7%] py-4">
      <div className="max-w-screen-full mx-auto flex flex-col gap-3">
        <div className="flex justify-between items-center">
          <img
            src="/images/auth/logo.jpg"
            alt="ResellKH Logo"
            onClick={() => router.push("/")}
            className="text-2xl cursor-pointer h-[40px]"
          />

          <nav className="hidden md:flex gap-6 text-sm text-gray-800">
            {topCategories.map((cat) => {
              if (cat.showOn === "lg") {
                return (
                  <Link
                    key={cat.key}
                    href={`/category/${categoryMap[cat.key]}`}
                    className="hover:text-orange-500 md:hidden lg:block"
                  >
                    {cat.name}
                  </Link>
                );
              }
              return (
                <Link
                  key={cat.key}
                  href={`/category/${categoryMap[cat.key]}`}
                  className="hover:text-orange-500"
                >
                  {cat.name}
                </Link>
              );
            })}
            <div className="relative" ref={desktopCategoryRef}>
              <button
                onClick={() => setCategoryOpen(!categoryOpen)}
                className="group flex items-center gap-1 text-gray-800 hover:text-orange-500"
              >
                <svg
                  className="w-5 h-5 group-hover:text-orange-500 transition-colors duration-200"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M5.99829 4.75C5.99829 4.33579 6.33408 4 6.74829 4H17.2483C17.6625 4 17.9983 4.33579 17.9983 4.75C17.9983 5.16421 17.6625 5.5 17.2483 5.5H6.74829C6.33408 5.5 5.99829 5.16421 5.99829 4.75ZM5.99829 10C5.99829 9.58579 6.33408 9.25 6.74829 9.25H17.2483C17.6625 9.25 17.9983 9.58579 17.9983 10C17.9983 10.4142 17.6625 10.75 17.2483 10.75H6.74829C6.33408 10.75 5.99829 10.4142 5.99829 10ZM5.99829 15.25C5.99829 14.8358 6.33408 14.5 6.74829 14.5H17.2483C17.6625 14.5 17.9983 14.8358 17.9983 15.25C17.9983 15.6642 17.6625 16 17.2483 16H6.74829C6.33408 16 5.99829 15.6642 5.99829 15.25Z" />
                  <path d="M1.98828 4.75C1.98828 4.19772 2.436 3.75 2.98828 3.75H2.99828C3.55057 3.75 3.99828 4.19772 3.99828 4.75V4.76C3.99828 5.31228 3.55057 5.76 2.99828 5.76H2.98828C2.436 5.76 1.98828 5.31228 1.98828 4.76V4.75Z" />
                  <path d="M1.98828 15.25C1.98828 14.6977 2.436 14.25 2.98828 14.25H2.99828C3.55057 14.25 3.99828 14.6977 3.99828 15.25V15.26C3.99828 15.8123 3.55057 16.26 2.99828 16.26H2.98828C2.436 16.26 1.98828 15.8123 1.98828 15.26V15.25Z" />
                  <path d="M1.98828 10C1.98828 9.44772 2.436 9 2.98828 9H2.99828C3.55057 9 3.99828 9.44772 3.99828 10V10.01C3.99828 10.5623 3.55057 11.01 2.99828 11.01H2.98828C2.436 11.01 1.98828 10.5623 1.98828 10.01V10Z" />
                </svg>
                <span className="group-hover:text-orange-500 transition-colors duration-200">
                  All Categories
                </span>
              </button>

              {categoryOpen && (
                <div className="absolute z-50 mt-2 w-48 bg-white border rounded-xl shadow-lg py-2">
                  {dropdownCategories.map((cat) => (
                    <Link
                      key={cat.key}
                      href={`/category/${categoryMap[cat.key]}`}
                      className="block px-4 py-2 hover:bg-gray-100 text-sm text-gray-700"
                    >
                      {cat.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </nav>

          <div className="flex items-center gap-4 text-gray-700 text-sm">
            {!user ? (
              <>
                <Link
                  href="/register"
                  className="hover:text-orange-500 font-medium"
                >
                  Register
                </Link>
                <Link
                  href="/login"
                  className="hover:text-orange-500 font-medium"
                >
                  Log in
                </Link>
                <button
                  onClick={() => router.push("/sell")}
                  className="bg-orange-500 text-white px-4 py-1.5 rounded-full text-sm hover:bg-orange-600"
                >
                  Sell
                </button>
              </>
            ) : (
              <>
                {/* Shopping Cart Icon with Badge */}
                <Link
                  href={user?.id ? `/buy/payment` : "/login"}
                  className="cursor-pointer hover:text-orange-500"
                >
                  <div className="relative">
                    <ShoppingCart className="w-6 h-6 stroke-[1.5] stroke-gray-900" />
                    {cartItemCount > 0 && (
                      <span className="absolute -top-1 -right-1.5 w-4 h-4 flex items-center justify-center bg-orange-500 text-white text-xs font-bold rounded-full">
                        {cartItemCount}
                      </span>
                    )}
                  </div>
                </Link>

                <Link
                  href="/favourites"
                  className="cursor-pointer hover:text-orange-500"
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M3 3C3 2.20435 3.31607 1.44129 3.87868 0.87868C4.44129 0.316071 5.20435 0 6 0L18 0C18.7956 0 19.5587 0.316071 20.1213 0.87868C20.6839 1.44129 21 2.20435 21 3V23.25C20.9999 23.3857 20.9631 23.5188 20.8933 23.6351C20.8236 23.7515 20.7236 23.8468 20.604 23.9108C20.4844 23.9748 20.3497 24.0052 20.2142 23.9988C20.0787 23.9923 19.9474 23.9492 19.8345 23.874L12 19.6515L4.1655 23.874C4.05256 23.9492 3.92135 23.9923 3.78584 23.9988C3.65033 24.0052 3.5156 23.9748 3.396 23.9108C3.2764 23.8468 3.17641 23.7515 3.10667 23.6351C3.03694 23.5188 3.00007 23.3857 3 23.25V3ZM6 1.5C5.60218 1.5 5.22064 1.65804 4.93934 1.93934C4.65804 2.22064 4.5 2.60218 4.5 3V21.849L11.5845 18.126C11.7076 18.0441 11.8521 18.0004 12 18.0004C12.1479 18.0004 12.2924 18.0441 12.4155 18.126L19.5 21.849V3C19.5 2.60218 19.342 2.22064 19.0607 1.93934C18.7794 1.65804 18.3978 1.5 18 1.5H6Z"
                      fill="black"
                    />
                  </svg>
                </Link>

                <Link
                  href="/notifications"
                  className="cursor-pointer hover:text-orange-500"
                >
                  <div className="relative">
                    <svg
                      className="w-6 h-6 stroke-[1.5] stroke-gray-900"
                      viewBox="0 0 30 30"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M15.0243 3.63745C10.8868 3.63745 7.52426 6.99995 7.52426 11.1375V14.75C7.52426 15.5125 7.19926 16.6749 6.81176 17.3249L5.37426 19.7125C4.48676 21.1875 5.09926 22.825 6.72426 23.375C12.1118 25.175 17.9243 25.175 23.3118 23.375C24.8243 22.875 25.4868 21.0875 24.6618 19.7125L23.2243 17.3249C22.8493 16.6749 22.5243 15.5125 22.5243 14.75V11.1375C22.5243 7.01245 19.1493 3.63745 15.0243 3.63745Z"
                        fill="none"
                      />
                      <path
                        d="M17.3379 4.00005C16.9504 3.88755 16.5504 3.80005 16.1379 3.75005C14.9379 3.60005 13.7879 3.68755 12.7129 4.00005C13.0754 3.07505 13.9754 2.42505 15.0254 2.42505C16.0754 2.42505 16.9754 3.07505 17.3379 4.00005Z"
                        fill="none"
                      />
                      <path
                        d="M18.7754 23.825C18.7754 25.8875 17.0879 27.575 15.0254 27.575C14.0004 27.575 13.0504 27.15 12.3754 26.475C11.7004 25.8 11.2754 24.85 11.2754 23.825"
                        fill="none"
                      />
                    </svg>
                    <span className="absolute left-3 -top-0 -right-1 w-2.5 h-2.5 bg-red-500 rounded-full"></span>
                  </div>
                </Link>

                <div className="relative" ref={profileRef}>
                  <img
                    src={user.avatar}
                    alt="User Avatar"
                    width={32}
                    height={32}
                    className="rounded-full object-cover cursor-pointer"
                    onClick={() => setProfileOpen((prev) => !prev)}
                  />
                  {profileOpen && user && (
                    <div className="absolute right-0 mt-2 w-56 bg-white border border-gray-200 rounded-xl shadow-lg z-30">
                      <Link
                        href={`/profile/${getEncryptedProfileId(user.id)}`}
                        className="cursor-pointer"
                      >
                        <div className="flex items-center gap-3 px-4 py-3 border-b">
                          <img
                            src={user.avatar}
                            alt="User Avatar"
                            width={50}
                            height={50}
                            className="rounded-full object-cover"
                          />
                          <div>
                            <p className="text-sm font-medium text-gray-900">
                              {user.name}
                            </p>
                            <p className="text-xs text-gray-500">
                              View your profile
                            </p>
                          </div>
                        </div>
                      </Link>

                      {user.isSellerFormCompleted ? (
                        <button
                          onClick={handleSellerDashboardClick}
                          className="w-full px-4 py-3 flex items-center gap-2 text-sm text-gray-700 hover:bg-orange-50 hover:text-orange-600 border-b transition-all duration-200"
                        >
                          <LayoutDashboard className="w-5 h-5 text-orange-500" />
                          <span className="ps-2">Seller Dashboard</span>
                        </button>
                      ) : (
                        <button
                          onClick={handleBecomeSellerClick}
                          className="w-full px-4 py-3 flex items-center gap-2 text-sm text-gray-700 hover:bg-orange-50 hover:text-orange-600 border-b transition-all duration-200 group"
                        >
                          <Store className="w-5 h-5 text-orange-500 group-hover:text-orange-600" />
                          <span className="ps-2">Become a Seller</span>
                        </button>
                      )}

                      <button
                        onClick={() => setShowLogoutModal(true)}
                        className="w-full px-4 py-3 rounded-b-xl flex items-center gap-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          className="stroke-[1.5] stroke-gray-900"
                        >
                          <path
                            d="M8.89844 7.56023C9.20844 3.96023 11.0584 2.49023 15.1084 2.49023H15.2384C19.7084 2.49023 21.4984 4.28023 21.4984 8.75023V15.2702C21.4984 19.7402 19.7084 21.5302 15.2384 21.5302H15.1084C11.0884 21.5302 9.23844 20.0802 8.90844 16.5402"
                            fill="none"
                          />
                          <path d="M15.0011 12H3.62109" fill="none" />
                          <path
                            d="M5.85 8.65039L2.5 12.0004L5.85 15.3504"
                            fill="none"
                          />
                        </svg>
                        <span className="ps-2">Log out</span>
                      </button>
                    </div>
                  )}
                </div>

                <button
                  onClick={() => router.push("/sell")}
                  className="bg-orange-500 text-white px-4 py-1.5 rounded-full text-sm hover:bg-orange-600"
                >
                  Sell
                </button>
              </>
            )}
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-3 w-full">
          <div className="block lg:hidden w-full h-[100px] md:h-[80px] space-y-2">
            <nav className="flex justify-center py-2 md:hidden lg:hidden gap-6 text-sm text-gray-800">
              {topCategories
                .filter((cat) => !cat.showOn || cat.showOn !== "lg")
                .map((cat) => (
                  <Link
                    key={cat.key}
                    href={`/category/${categoryMap[cat.key]}`}
                    className="hover:text-orange-500"
                  >
                    {cat.name}
                  </Link>
                ))}
              <div className="relative" ref={mobileCategoryRef}>
                <button
                  onClick={() => setCategoryOpen(!categoryOpen)}
                  className="group flex items-center gap-1 text-gray-800 hover:text-orange-500"
                >
                  <svg
                    className="w-5 h-5 group-hover:text-orange-500 transition-colors duration-200"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M5.99829 4.75C5.99829 4.33579 6.33408 4 6.74829 4H17.2483C17.6625 4 17.9983 4.33579 17.9983 4.75C17.9983 5.16421 17.6625 5.5 17.2483 5.5H6.74829C6.33408 5.5 5.99829 5.16421 5.99829 4.75ZM5.99829 10C5.99829 9.58579 6.33408 9.25 6.74829 9.25H17.2483C17.6625 9.25 17.9983 9.58579 17.9983 10C17.9983 10.4142 17.6625 10.75 17.2483 10.75H6.74829C6.33408 10.75 5.99829 10.4142 5.99829 10ZM5.99829 15.25C5.99829 14.8358 6.33408 14.5 6.74829 14.5H17.2483C17.6625 14.5 17.9983 14.8358 17.9983 15.25C17.9983 15.6642 17.6625 16 17.2483 16H6.74829C6.33408 16 5.99829 15.6642 5.99829 15.25Z" />
                  <path d="M1.98828 4.75C1.98828 4.19772 2.436 3.75 2.98828 3.75H2.99828C3.55057 3.75 3.99828 4.19772 3.99828 4.75V4.76C3.99828 5.31228 3.55057 5.76 2.99828 5.76H2.98828C2.436 5.76 1.98828 5.31228 1.98828 4.76V4.75Z" />
                  <path d="M1.98828 15.25C1.98828 14.6977 2.436 14.25 2.98828 14.25H2.99828C3.55057 14.25 3.99828 14.6977 3.99828 15.25V15.26C3.99828 15.8123 3.55057 16.26 2.99828 16.26H2.98828C2.436 16.26 1.98828 15.8123 1.98828 15.26V15.25Z" />
                  <path d="M1.98828 10C1.98828 9.44772 2.436 9 2.98828 9H2.99828C3.55057 9 3.99828 9.44772 3.99828 10V10.01C3.99828 10.5623 3.55057 11.01 2.99828 11.01H2.98828C2.436 11.01 1.98828 10.5623 1.98828 10.01V10Z" />
                </svg>
                <span className="group-hover:text-orange-500 transition-colors duration-200">
                  All Categories
                </span>
              </button>

              {categoryOpen && (
                <div className="absolute z-50 mt-2 w-48 bg-white border rounded-xl shadow-lg py-2">
                  {dropdownCategories.map((cat) => (
                    <Link
                      key={cat.key}
                      href={`/category/${categoryMap[cat.key]}`}
                      className="block px-4 py-2 hover:bg-gray-100 text-sm text-gray-700"
                    >
                      {cat.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
            </nav>
            <LocationDropdown />
            <SearchBar />
          </div>

          <div className="hidden lg:flex gap-3 w-full items-start">
            <div className="w-[66%]">
              <SearchBar />
            </div>
            <div className="w-[34%]">
              <LocationDropdown />
            </div>
          </div>
        </div>
      </div>

      <ImageScanModal open={scanOpen} onClose={() => setScanOpen(false)} />
      <ConfirmLogout
        isOpen={showLogoutModal}
        onClose={() => setShowLogoutModal(false)}
        onConfirm={handleLogout}
        title="Are you sure that you want to log out?"
      />
    </div>
  );
}