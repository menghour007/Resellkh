// app/(main)/seller/dashboard/page.jsx
"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import DashboardHeader from "@/components/sellerDashboard/DashboardHeader2";
import MetricsGrid from "@/components/sellerDashboard/MetricsGrid2";
import PaymentSummary from "@/components/sellerDashboard/PaymentSummary";
import RecentActivitySection from "@/components/sellerDashboard/RecentActivity2";
import HelpSection from "@/components/sellerDashboard/HelpSection2";

import { Store, ShoppingCart } from "lucide-react";

import { getPaymentSummaryBySellerId } from "@/components/services/paymentsummary.service";
import { getProductCountBySellerId } from "@/components/services/countProductByUserId.service";

import useDashboardView from "@/components/sellerDashboard/useDashboardView";
import IgniteSalesSection from "@/components/sellerDashboard/IgniteSalesSection";
import NoHaveOrder from "@/components/sellerDashboard/NoHaveOrder";
import { fetchUserProfile } from "@/components/services/userprofile.service";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8080/api/v1";

export default function SellerDashboardPage() {
  const router = useRouter();
  const [currentSellerId, setCurrentSellerId] = useState(null);

  const getDynamicGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) {
      return "Good morning";
    } else if (hour < 18) {
      return "Good afternoon";
    } else {
      return "Good evening";
    }
  };

  // Helper to extract first name
  const getFirstName = (fullName) => {
    return fullName.split(" ")[0];
  };

  const [sellerProfile, setSellerProfile] = useState({
    // <-- Add setSellerProfile here
    fullName: "Loading...",
    role: "Seller",
    avatar: "https://via.placeholder.com/150/CCCCCC/FFFFFF?text=...",
  });

  const [dashboardData, setDashboardData] = useState({
    totalProducts: 0,
    totalSales: "0.00",
    newOrders: 0,
    conversionRate: 0,
    recentActivities: [],
    paymentRecords: [],
  });

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const { activeView, handleMetricCardClick } = useDashboardView(dashboardData);

  const transformApiDataToDashboardData = (apiData, productCount) => {
    const totalOrders = apiData.length;
    const totalSalesAmount = apiData.reduce(
      (sum, order) => sum + order.orderTotalAmount,
      0
    );

    const paymentRecords = apiData.map((order) => {
      const firstProduct = order.orderItems[0] || {};
      return {
        id: order.orderId,
        paymentId: `PAY-${new Date().getFullYear()}-${String(
          order.orderId
        ).padStart(3, "0")}`,
        date: new Date(order.orderCreatedAt).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        }),
        time: new Date(order.orderCreatedAt).toLocaleTimeString("en-US", {
          hour: "numeric",
          minute: "2-digit",
          hour12: true,
        }),
        status: "Completed",
        paymentMethod: "Bank",
        product: {
          name: firstProduct.productName || "Unknown Product",
          sku: `SKU-${firstProduct.orderedProductId || "XXX"}`,
          qty: order.orderItems.length,
          unitPrice: firstProduct.itemPriceAtPurchase || 0,
          imageUrl:
            firstProduct.productCoverImageUrl ||
            "https://via.placeholder.com/150",
        },
        buyer: {
          name: order.buyerFullName,
          email: order.buyerEmail,
          phone: order.buyerPhoneNumber,
        },
        shippingAddress: {
          street: order.buyerAddress,
          city: "N/A",
          state: "N/A",
          postalCode: "N/A",
          country: "Cambodia",
        },
        breakdown: {
          subtotal: order.orderSubTotal,
          shipping: order.orderDeliveryCharge,
          tax: 0,
          total: order.orderTotalAmount,
        },
        allItems: order.orderItems.map((item) => ({
          name: item.productName,
          price: item.itemPriceAtPurchase,
          image: item.productCoverImageUrl,
        })),
      };
    });

    const recentActivities = apiData.slice(0, 4).map((order) => ({
      id: order.orderId,
      type: "order",
      content: `New order #ORD-${new Date().getFullYear()}-${String(
        order.orderId
      ).padStart(3, "0")} received from ${order.buyerFullName}`,
      time: getRelativeTime(order.orderCreatedAt),
      amount: `$${order.orderTotalAmount.toFixed(2)}`,
      status: "new",
    }));

    return {
      totalProducts: productCount,
      totalSales: totalSalesAmount.toFixed(2),
      newOrders: totalOrders,
      conversionRate:
        totalOrders > 0
          ? ((totalOrders / (totalOrders + 10)) * 100).toFixed(1)
          : 0,
      recentActivities,
      paymentRecords,
    };
  };

  const getRelativeTime = (dateString) => {
    const now = new Date();
    const orderDate = new Date(dateString);
    const diffInMinutes = Math.floor((now - orderDate) / (1000 * 60));

    if (diffInMinutes < 1) return "Just now";
    if (diffInMinutes < 60) return `${diffInMinutes} minutes ago`;
    if (diffInMinutes < 1440)
      return `${Math.floor(diffInMinutes / 60)} hours ago`;
    return `${Math.floor(diffInMinutes / 1440)} days ago`;
  };

  const refreshToken = async () => {
    try {
      const refreshToken = localStorage.getItem("refreshToken");
      if (!refreshToken) {
        throw new Error("No refresh token available");
      }

      const response = await fetch(`${API_BASE_URL}/auth/refresh`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ refreshToken }),
      });
      if (!response.ok) {
        throw new Error("Failed to refresh token");
      }
      const data = await response.json();
      localStorage.setItem("authToken", data.accessToken || data.token);
      if (data.refreshToken) {
        localStorage.setItem("refreshToken", data.refreshToken);
      }
      return data.accessToken || data.token;
    } catch (error) {
      console.error("Token refresh failed:", error);
      throw error;
    }
  };

  const isTokenExpired = (token) => {
    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      const currentTime = Date.now() / 1000;
      return payload.exp < currentTime;
    } catch (error) {
      return true;
    }
  };

  // --- NEW useEffect for fetching seller profile data ---
  useEffect(() => {
    const loadSellerProfile = async () => {
      const token =
        localStorage.getItem("token") ||
        localStorage.getItem("authToken") ||
        localStorage.getItem("accessToken");
      const userId =
        localStorage.getItem("userId") || localStorage.getItem("sellerId");
      setCurrentSellerId(userId);

      if (!token || !userId) {
        setSellerProfile({
          fullName: "Guest",
          role: "N/A",
          avatar:
            "[https://via.placeholder.com/150/CCCCCC/FFFFFF?text=G](https://via.placeholder.com/150/CCCCCC/FFFFFF?text=G)",
        });
        // Redirect to login if not authenticated for seller dashboard
        router.replace("/login");
        return;
      }

      try {
        const profileData = await fetchUserProfile(userId, token); // Use your service to fetch profile
        console.log("profile is:", profileData);

        setSellerProfile({
          // Use firstName and lastName for fullName, fallback to userName or "Seller"
          fullName:
            `${profileData.firstName || ""} ${
              profileData.lastName || ""
            }`.trim() ||
            profileData.userName ||
            "Seller",
          role: profileData.seller ? "Seller" : "User", // Determine role dynamically
          avatar:
            profileData.profileImage ||
            "[https://media.istockphoto.com/id/1495088043/vector/user-profile-icon-avatar-or-person-icon-profile-picture-portrait-symbol-default-portrait.jpg?s=612x612&w=0&k=20&c=dhV2p1JwmloBTOaGAtaA3AW1KSnjsdMt7-U_3EZElZ0=](https://media.istockphoto.com/id/1495088043/vector/user-profile-icon-avatar-or-person-icon-profile-picture-portrait-symbol-default-portrait.jpg?s=612x612&w=0&k=20&c=dhV2p1JwmloBTOaGAtaA3AW1KSnjsdMt7-U_3EZElZ0=)",
        });
      } catch (err) {
        console.error(
          "Error fetching seller profile for DashboardHeader:",
          err
        );
        setSellerProfile({
          fullName: "Error",
          role: "N/A",
          avatar:
            "[https://via.placeholder.com/150/FF0000/FFFFFF?text=](https://via.placeholder.com/150/FF0000/FFFFFF?text=)!",
        });
        // If it's an auth error (e.g., token expired), redirect to login
        if (
          err.message.includes("Failed to fetch user profile: 401") ||
          err.message.includes("token")
        ) {
          localStorage.clear(); // Clear all auth related storage
          router.replace("/login");
        }
      }
    };

    loadSellerProfile();
  }, [router]); // Dependency on router to re-run on route changes (e.g., after login)

  useEffect(() => {
    const fetchAllDashboardData = async () => {
      try {
        setIsLoading(true);
        setError(null);

        let token =
          localStorage.getItem("authToken") ||
          localStorage.getItem("token") ||
          localStorage.getItem("accessToken");
        const sellerId =
          localStorage.getItem("sellerId") || localStorage.getItem("userId");

        if (!token) {
          throw new Error("No authentication token found. Please login again.");
        }
        if (!sellerId) {
          throw new Error("Seller ID not found. Please login again.");
        }

        if (isTokenExpired(token)) {
          console.log("Token is expired, attempting to refresh...");
          try {
            token = await refreshToken();
            console.log("Token refreshed successfully");
          } catch (refreshError) {
            console.error("Token refresh failed:", refreshError);
            throw new Error("Session expired. Please login again.");
          }
        }

        const [productCountResult, paymentSummaryApiData] = await Promise.all([
          getProductCountBySellerId(parseInt(sellerId), token),
          getPaymentSummaryBySellerId(parseInt(sellerId), token),
        ]);

        const transformedData = transformApiDataToDashboardData(
          paymentSummaryApiData,
          productCountResult
        );

        setDashboardData(transformedData);
      } catch (err) {
        console.error("Error fetching dashboard data:", err);
        setError(err.message);

        if (
          err.message.includes("JWT token is expired") ||
          err.message.includes("Invalid JWT token") ||
          err.message.includes("Session expired") ||
          err.message.includes("authentication")
        ) {
          localStorage.removeItem("authToken");
          localStorage.removeItem("token");
          localStorage.removeItem("accessToken");
          localStorage.removeItem("refreshToken");

          setTimeout(() => {
            router.push("/login");
          }, 2000);
        }

        setDashboardData({
          totalProducts: 0,
          totalSales: "0.00",
          newOrders: 0,
          conversionRate: 0,
          recentActivities: [],
          paymentRecords: [],
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchAllDashboardData();
  }, [router]);

  const NoOrdersHelp = () => (
    <div className="mt-8 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-2xl p-6 border border-yellow-200/30">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-xl flex items-center justify-center">
            <ShoppingCart className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">
              No New Orders Yet!
            </h3>
            <p className="text-gray-600 text-sm">
              Don't worry, sales often take a little time. Ensure your products
              are appealing.
            </p>
          </div>
        </div>
        <button
          onClick={() => router.push("/seller/products")}
          className="px-4 py-2 bg-gradient-to-r from-orange-500 to-red-600 text-white rounded-lg text-sm font-medium hover:from-orange-600 hover:to-red-700 transition-all duration-300"
        >
          View Your Products
        </button>
      </div>
    </div>
  );

  const handleGoToProducts = () => {
    alert("Navigating to Product Management...");
  };
  const handleGoToOrders = () => {
    alert("Navigating to Order Management...");
  };
  const handleViewReports = () => {
    alert("Navigating to Performance Reports...");
  };
  const handleAccountSettings = () => {
    alert("Navigating to Account Settings...");
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
        <DashboardHeader userName="Loading..." userRole="Seller" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            <span className="ml-3 text-lg text-gray-600">
              Loading dashboard...
            </span>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    const isAuthError =
      error.includes("token") ||
      error.includes("Session expired") ||
      error.includes("authentication");

    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
        <DashboardHeader userName="john doe" userRole="Seller" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div
            className={`border rounded-lg p-6 ${
              isAuthError
                ? "bg-yellow-50 border-yellow-200"
                : "bg-red-50 border-red-200"
            }`}
          >
            <h3
              className={`font-medium mb-2 ${
                isAuthError ? "text-yellow-800" : "text-red-800"
              }`}
            >
              {isAuthError
                ? "Authentication Required"
                : "Error Loading Dashboard"}
            </h3>
            <p className={isAuthError ? "text-yellow-600" : "text-red-600"}>
              {isAuthError
                ? "Your session has expired. Redirecting to login..."
                : error}
            </p>
            {!isAuthError && (
              <button
                onClick={() => window.location.reload()}
                className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
              >
                Retry
              </button>
            )}
            {isAuthError && (
              <button
                onClick={() => router.push("/login")}
                className="mt-4 px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700"
              >
                Go to Login
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <DashboardHeader
        userName={sellerProfile.fullName}
        userRole="Seller"
        userAvatar={sellerProfile.avatar}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            {getDynamicGreeting()}, {getFirstName(sellerProfile.fullName)}! 👋
          </h2>
          <p className="text-gray-600">
            Here's what's happening with your store today.
          </p>
        </div>

        <MetricsGrid
          metrics={dashboardData}
          onMetricClick={handleMetricCardClick}
        />

        {/* Start of the adjusted conditional rendering */}
        {activeView === "defaultSection" && (
          // Apply mt-8 directly to the PaymentSummary if it's the first element
          // or to a fragment if there are multiple elements that need a top margin.
          // Since PaymentSummary likely has its own margin-top, you might not need mt-8 here.
          // Let's assume PaymentSummary has enough internal top margin or its own external spacing.

          <div className="mt-8">
            {" "}
            {/* Added mt-8 for spacing from MetricsGrid */}
            <IgniteSalesSection sellerId={currentSellerId} />
            {/* <PaymentSummary allPaymentRecords={dashboardData.paymentRecords} /> */}
            {/* <RecentActivitySection
              activities={dashboardData.recentActivities}
            /> */}
            {/* <HelpSection /> */}
            {/* The placeholder text should only be for testing. Replaced with actual components. */}
            {/* <p className="text-lg text-gray-700 font-semibold mt-4">
              Showing Default Dashboard Section
            </p> */}
          </div>
        )}

        {activeView === "newOrdersSection" && (
          // Use a Fragment directly, and apply mt-8 to the first component inside it
          <>
            <PaymentSummary
              allPaymentRecords={dashboardData.paymentRecords}
              className="mt-8"
            />{" "}
            {/* Apply mt-8 here if needed and PaymentSummary accepts className */}
            {/* Optional: Keep placeholder text for debug, or remove */}
          </>
        )}

        {activeView === "productsListedSection" && (
          // Apply mt-8 directly to the specific HelpSection/product-related content
          <>
            {/* <NoHaveOrder /> */}
            <IgniteSalesSection sellerId={currentSellerId} />
          </>
        )}
        {/* Add conditions for 'emptyOrdersHelp' or 'error' views if you intend to use them. */}
        {/* For example:
        {activeView === "emptyOrdersHelp" && (
            <NoOrdersHelp />
        )}
        */}
      </div>
    </div>
  );
}
