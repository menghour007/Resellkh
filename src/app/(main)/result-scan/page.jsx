'use client';

import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Cart from '@/components/profile/someComponent/Cart';
import { searchProductsByImage } from '@/components/services/ScanProduct.service';

// SVG Icons
const MagnifyingGlassIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
  </svg>
);

const ArrowPathIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
  </svg>
);

export default function ResultScanPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const imgSrc = searchParams.get('imgSrc');
  const [scanResults, setScanResults] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const getAuthToken = () => {
    try {
      if (typeof window !== 'undefined') {
        return localStorage.getItem('token');
      }
      return null;
    } catch (error) {
      console.error('Error accessing localStorage:', error);
      return null;
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    
    const fetchSimilarProducts = async () => {
      if (!imgSrc) {
        setIsLoading(false);
        return;
      }
      
      try {
        setIsLoading(true);
        setError(null);
        
        const token = getAuthToken();
        if (!token) {
          throw new Error('Please login to use this feature');
        }

        const response = await fetch(imgSrc);
        if (!response.ok) {
          throw new Error(`Failed to fetch image: ${response.status}`);
        }
        
        const blob = await response.blob();
        const file = new File([blob], 'search-image.jpg', { type: blob.type });
        
        const result = await searchProductsByImage(file, token);
        
        if (result.payload?.length > 0) {
          const formattedResults = result.payload.map((product, index) => ({
            id: product.productId || index,
            title: product.productName,
            description: product.description,
            productPrice: product.productPrice,
            discountPercent: product.discountPercent,
            imageUrl: product.fileUrls?.[0] || '/images/placeholder-product.jpg',
            condition: product.condition,
            location: product.location,
          }));
          setScanResults(formattedResults);
        } else {
          setError({
            title: "No matches found",
            message: "We couldn't find similar products. Try with a different image or check back later.",
            icon: <MagnifyingGlassIcon />
          });
          setScanResults([]);
        }
      } catch (err) {
        setError({
          title: "Search failed",
          message: err.message || "Something went wrong. Please try again.",
          icon: <ArrowPathIcon />
        });
        setScanResults([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSimilarProducts();
  }, [imgSrc]);

  const handleTryAgain = async () => {
    const token = getAuthToken();
    if (!token) {
      router.push('/login');
    } else {
      try {
        setIsLoading(true);
        setError(null);
        
        const response = await fetch(imgSrc);
        const blob = await response.blob();
        const file = new File([blob], 'search-image.jpg', { type: blob.type });
        
        const result = await searchProductsByImage(file, token);
        
        if (result.payload?.length > 0) {
          const formattedResults = result.payload.map((product, index) => ({
            id: product.productId || index,
            title: product.productName,
            description: product.description,
            productPrice: product.productPrice,
            discountPercent: product.discountPercent,
            imageUrl: product.fileUrls?.[0] || '/images/placeholder-product.jpg',
            condition: product.condition,
            location: product.location,
          }));
          setScanResults(formattedResults);
        } else {
          setError({
            title: "No matches found",
            message: "We couldn't find similar products. Try with a different image or check back later.",
            icon: <MagnifyingGlassIcon />
          });
          setScanResults([]);
        }
      } catch (err) {
        setError({
          title: "Search failed",
          message: err.message || "Something went wrong. Please try again.",
          icon: <ArrowPathIcon />
        });
      } finally {
        setIsLoading(false);
      }
    }
  };

  const EmptyState = ({ error }) => (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="mb-6 p-4 bg-gray-100 rounded-full">
        {error?.icon || <MagnifyingGlassIcon />}
      </div>
      <h2 className="font-semibold text-xl mb-2">
        {error?.title || "No similar products found"}
      </h2>
      <p className="text-gray-600 max-w-md mb-6">
        {error?.message || "We couldn't find any matching products. Try with a different image."}
      </p>
      <div className="flex gap-4">
        <button
          onClick={() => router.back()}
          className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
        >
          Try Different Image
        </button>
        <button
          onClick={handleTryAgain}
          className="px-6 py-2 bg-[#ea580c] text-white rounded-lg hover:bg-[#d95f0e] flex items-center gap-2"
        >
          <ArrowPathIcon className="w-5 h-5" />
          Search Again
        </button>
      </div>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      {imgSrc && (
        <div className="bg-[#f2edef] rounded-2xl p-6 mb-8 shadow relative">
          <button
            onClick={() => router.back()}
            className="absolute top-3 right-3 text-gray-500 hover:text-black text-xl"
            aria-label="Close"
          >
            ✕
          </button>
          <h2 className="text-center text-base font-semibold text-gray-800 mb-4">
            Search any image with Lens
          </h2>
          <div className="flex justify-center">
            <img
              src={imgSrc}
              alt="Scanned Image"
              className="w-[300px] h-auto rounded-xl border object-contain"
            />
          </div>
        </div>
      )}

      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-16">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#ea580c] mb-4"></div>
          <p>Searching for similar products...</p>
        </div>
      ) : scanResults.length > 0 ? (
        <>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">Similar Products</h2>
            <button 
              onClick={handleTryAgain}
              className="text-[#ea580c] hover:text-[#d95f0e] flex items-center gap-1"
            >
              <ArrowPathIcon className="w-4 h-4" />
              Refresh results
            </button>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-2 px-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 justify-items-center">
            {scanResults.map((item) => (
              <Cart
                key={item.id}
                id={item.id}
                imageUrl={item.imageUrl}
                title={item.title}
                description={item.description}
                price={(item.productPrice * (100 - (item.discountPercent || 0)) / 100).toFixed(2)}
                originalPrice={item.discountPercent ? item.productPrice : null}
                discountText={item.discountPercent ? `${item.discountPercent}% OFF` : null}
              />
            ))}
          </div>
        </>
      ) : (
        <EmptyState error={error} />
      )}
    </div>
  );
}