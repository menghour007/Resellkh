"use client";

import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import Link from "next/link";
import Cart from "@/components/profile/someComponent/Cart";
import { fetchNearbyProducts } from "@/components/services/nearBy.service";

export default function ListingNearMePage() {
  const searchParams = useSearchParams();
  const query = searchParams.get("query");

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [locationError, setLocationError] = useState(null);
  const [userLocation, setUserLocation] = useState(null);
  const [token, setToken] = useState(null);

  // Get token from localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedToken = localStorage.getItem('token');
      setToken(storedToken);
    }
  }, []);

  // Function to get user's location
  const getUserLocation = () => {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error("Geolocation is not supported by this browser."));
        return;
      }

      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          resolve({ latitude, longitude });
        },
        (error) => {
          let errorMessage = "Unable to retrieve your location.";
          switch (error.code) {
            case error.PERMISSION_DENIED:
              errorMessage = "Location access denied by user.";
              break;
            case error.POSITION_UNAVAILABLE:
              errorMessage = "Location information is unavailable.";
              break;
            case error.TIMEOUT:
              errorMessage = "Location request timed out.";
              break;
          }
          reject(new Error(errorMessage));
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 600000, // 10 minutes
        }
      );
    });
  };

  // Main effect to get location and fetch products
  useEffect(() => {
    const initializeData = async () => {
      try {
        if (!token) {
          setError("Authentication required. Please log in.");
          setLoading(false);
          return;
        }

        setLoading(true);
        setError(null);
        setLocationError(null);

        // Get user location
        const location = await getUserLocation();
        setUserLocation(location);

        // Fetch nearby products
        const nearbyProducts = await fetchNearbyProducts(
          location.latitude,
          location.longitude,
          token
        );
        setProducts(nearbyProducts);
      } catch (err) {
        if (
          err.message.includes("Location") ||
          err.message.includes("Geolocation")
        ) {
          setLocationError(err.message);
        } else {
          setError(err.message);
        }
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      initializeData();
    }
  }, [token]);

  // Retry location access
  const retryLocation = async () => {
    try {
      if (!token) {
        setError("Authentication required. Please log in.");
        return;
      }

      setLoading(true);
      setLocationError(null);
      setError(null);

      const location = await getUserLocation();
      setUserLocation(location);

      const nearbyProducts = await fetchNearbyProducts(
        location.latitude,
        location.longitude,
        token
      );
      setProducts(nearbyProducts);
    } catch (err) {
      if (
        err.message.includes("Location") ||
        err.message.includes("Geolocation")
      ) {
        setLocationError(err.message);
      } else {
        setError(err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  // Transform API product data to match Cart component props
  const transformProduct = (product) => {
    let price;
    if (typeof product.productPrice === "number") {
      if (
        typeof product.discountPercent === "number" &&
        !isNaN(product.discountPercent)
      ) {
        price = (product.productPrice * (100 - product.discountPercent)) / 100;
      } else {
        price = product.productPrice;
      }
    } else {
      price = 0;
    }

    return {
      id: product.productId,
      imageUrl: product.fileUrls?.[0] || "/images/placeholder.jpg",
      title: product.productName,
      description: product.description,
      price: price.toFixed(2),
      originalPrice: product.discountPercent > 0 ? product.productPrice : null,
      discountText:
        product.discountPercent > 0 ? `${product.discountPercent}% OFF` : null,
    };
  };

  // Authentication error state
  if (!token) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="p-8 text-center">
          <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-red-50 mb-4">
            <svg
              className="h-8 w-8 text-red-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
              />
            </svg>
          </div>
          
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Access Restricted
          </h2>
          
          <p className="text-gray-600 mb-6">
            Please sign in to view nearby listings and personalize your experience.
          </p>
          
          <div className="space-y-4">
            <Link
              href="/login"
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-medium text-white bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition-all duration-200"
            >
              Sign In to Your Account
            </Link>
            
            <p className="text-sm text-gray-500">
              Don't have an account?{' '}
              <Link
                href="/register"
                className="font-medium text-orange-600 hover:text-orange-500"
              >
                Create one
              </Link>
            </p>
          </div>
        </div>
        
        <div className="bg-gray-50 px-6 py-4">
          <div className="text-center text-xs text-gray-500">
            By continuing, you agree to our{' '}
            <a href="" className="underline hover:text-gray-700">
              Terms of Service
            </a>{' '}
            and{' '}
            <a href="/privacy-policy" className="underline hover:text-gray-700">
              Privacy Policy
            </a>
            .
          </div>
        </div>
      </div>
    </div>
  );
}

  return (
    <>
      <div className="flex ps-[7%] mt-3 items-center">
        <p className="text-gray-500 flex items-center">
          <Link href="/">Home</Link>
        </p>
        <svg
          className="mx-1"
          width="20"
          height="20"
          viewBox="0 0 20 21"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M6.98558 5.06864C7.32339 4.7931 7.8211 4.8128 8.13643 5.12775L13.0048 9.99638C13.1679 10.1596 13.2563 10.3779 13.2563 10.6044C13.2563 10.8309 13.1681 11.0488 13.0048 11.2127L8.13633 16.0811C7.80004 16.417 7.2557 16.417 6.92029 16.0811C6.58388 15.7451 6.58388 15.2006 6.92019 14.8648L11.1802 10.6044L6.92029 6.34407C6.60492 6.02908 6.5852 5.53088 6.86112 5.19302L6.92025 5.12769L6.98558 5.06864Z"
            fill="#343A40"
          />
        </svg>
        <span className="pointer-events-none text-orange-500">
          Listing near me
        </span>
      </div>

      <div className="px-[7%]">
        <div className="p-4 md:p-6">
          <div className="p-4 rounded-[24px] border border-gray-200">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
              {/* Title */}
              <h2 className="text-sm md:text-lg lg:text-lg font-semibold text-gray-800">
                {loading
                  ? "Loading..."
                  : `${products.length} found results of listing near you in Cambodia`}
              </h2>

              {/* Distance Info */}
              <div className="flex items-center gap-2 text-gray-600 text-sm whitespace-nowrap">
                <svg
                  className="text-white"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M2.28906 7.77998V17.51C2.28906 19.41 3.63906 20.19 5.27906 19.25L7.62906 17.91C8.13906 17.62 8.98906 17.59 9.51906 17.86L14.7691 20.49C15.2991 20.75 16.1491 20.73 16.6591 20.44L20.9891 17.96C21.5391 17.64 21.9991 16.86 21.9991 16.22V6.48998C21.9991 4.58998 20.6491 3.80998 19.0091 4.74998L16.6591 6.08998C16.1491 6.37998 15.2991 6.40998 14.7691 6.13998L9.51906 3.51998C8.98906 3.25998 8.13906 3.27998 7.62906 3.56998L3.29906 6.04998C2.73906 6.36998 2.28906 7.14998 2.28906 7.77998Z"
                    stroke="#4b5563"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M8.55859 4V17"
                    stroke="#4b5563"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M15.7305 6.62012V20.0001"
                    stroke="#4b5563"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span>Less than 5km</span>
              </div>
            </div>

            {/* Loading State */}
            {loading && (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mb-4"></div>
                <p className="text-gray-600">
                  Getting your location and fetching nearby products...
                </p>
              </div>
            )}

            {/* Location Error State */}
            {locationError && (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <div className="text-red-500 mb-4">
                  <svg
                    className="w-16 h-16 mx-auto"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                </div>
                <h2 className="font-semibold text-xl mb-2 text-red-600">
                  Location Access Required
                </h2>
                <p className="text-gray-600 mb-4 max-w-md">{locationError}</p>
                <button
                  onClick={retryLocation}
                  className="bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600 transition-colors"
                >
                  Try Again
                </button>
                <p className="text-sm text-gray-500 mt-4">
                  Please allow location access to see products near you
                </p>
              </div>
            )}

            {/* API Error State */}
            {error && !locationError && (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <div className="text-red-500 mb-4">
                  <svg
                    className="w-16 h-16 mx-auto"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h2 className="font-semibold text-xl mb-2 text-red-600">
                  Failed to Load Products
                </h2>
                <p className="text-gray-600 mb-4">{error}</p>
                <button
                  onClick={retryLocation}
                  className="bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600 transition-colors"
                >
                  Retry
                </button>
              </div>
            )}

            {/* Empty State */}
            {!loading && !error && !locationError && products.length === 0 && (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <img
                  src="/images/story set/no listing.jpg"
                  alt="No Listings"
                  className="w-[350px] h-auto mb-6"
                />
                <h2 className="font-semibold text-xl mb-2">
                  No listings found near you
                </h2>
                <p className="text-gray-600">
                  Try expanding your search radius or check back later.
                </p>
              </div>
            )}

            {/* Products Grid */}
            {!loading && !error && !locationError && products.length > 0 && (
              <div className="grid grid-cols-2 sm:grid-cols-2 px-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 justify-items-center">
                {products.map((product) => {
                  const transformedProduct = transformProduct(product);
                  return (
                    <Cart
                      key={transformedProduct.id}
                      id={transformedProduct.id}
                      imageUrl={transformedProduct.imageUrl}
                      title={transformedProduct.title}
                      description={transformedProduct.description}
                      price={transformedProduct.price}
                      originalPrice={transformedProduct.originalPrice}
                      discountText={transformedProduct.discountText}
                    />
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}