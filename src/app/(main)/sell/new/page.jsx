'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useSession } from 'next-auth/react';
import PhotoUploader from '@/components/sell/PhotoUploader';
import CategorySelector from '@/components/sell/CategorySelector';
import ConditionSelector from '@/components/sell/ConditionSelector';
import ItemDetailForm from '@/components/sell/ItemDetailForm';
import DealMethod from '@/components/sell/DealMethod';
import PricingInput from '@/components/sell/PricingInput';
import { postProduct } from '@/components/services/postProduct.service';
import { toast } from 'react-hot-toast';
import { encryptId } from '@/utils/encryption';
import axios from 'axios';

const staticCategories = [
  { id: 1, name: 'Accessories' },
  { id: 2, name: 'Beauty' },
  { id: 3, name: 'Equipment Bag & Shoes' },
  { id: 4, name: 'Book' },
  { id: 5, name: 'Fashion' },
  { id: 6, name: 'Home' },
  { id: 7, name: 'Sports & Kids' },
  { id: 8, name: 'Electronic' },
  { id: 9, name: 'Vehicle' },
  { id: 10, name: 'Other' },
];

export const SellNewPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const draftId = searchParams.get('draftId');
  const { data: session, status } = useSession();

  const dealMethodRef = useRef();
  const [files, setFiles] = useState([]); // can be File[] or {id, url} objects for existing images
  const [category, setCategory] = useState('');
  const [condition, setCondition] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [telegram, setTelegram] = useState('');
  const [price, setPrice] = useState('');
  const [discount, setDiscount] = useState('');
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [productStatus, setProductStatus] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const [navigationTarget, setNavigationTarget] = useState(null);
  const isNavigatingRef = useRef(false);
  // We still need 'userDrafts' state if handleSaveDraft or other logic relies on refetching it,
  // but it won't be rendered directly on this page.
  const [userDrafts, setUserDrafts] = useState([]); 

  // Effect to redirect unauthenticated users
  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login?redirect=/sell');
    }
  }, [status, router]);

  // useEffect for loading a SINGLE draft (when draftId is in the URL)
  useEffect(() => {
    if (!draftId || !session?.accessToken) return; // Only run if draftId and token exist

    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Missing authentication token. Please login again.");
      router.push("/login");
      return;
    }

    const fetchSpecificDraft = async () => {
      try {
        const response = await axios.get(
          `https://phil-whom-hide-lynn.trycloudflare.com/api/v1/products/drafts/${draftId}`, // API endpoint for single draft
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const draft = response.data.payload; // Single draft object expected

        if (!draft || draft.productStatus !== "DRAFT") {
          toast.error("Draft not found or is not a draft.");
          router.replace('/sell'); // Redirect to new sell page if invalid draft
          return;
        }

        // Populate form fields with draft data
        setTitle(draft.productName || "");
        const catName =
          staticCategories.find((c) => c.id === draft.mainCategoryId)?.name || "";
        setCategory(catName);
        setCondition(draft.condition || "");
        setDescription(draft.description || "");
        setLocation(draft.location || "");
        setTelegram(draft.telegramUrl || "");
        setPrice(draft.productPrice?.toString() || "");
        setDiscount(draft.discountPercent?.toString() || "");
        setProductStatus(draft.productStatus || "");
        setLatitude(draft.latitude || null);
        setLongitude(draft.longitude || null);

        // Handle existing draft images
        if (draft.fileUrls && draft.fileUrls.length > 0) {
          const existingFiles = draft.fileUrls.map((url, index) => ({
            id: `draft-url-${index}`,
            url,
          }));
          setFiles(existingFiles);
        }
      } catch (error) {
        console.error("Failed to load specific draft:", error);
        toast.error("Failed to load draft. Please try again.");
        router.replace('/sell'); // Redirect on error
      }
    };

    fetchSpecificDraft();
  }, [draftId, session?.accessToken, router]);

  // useEffect for fetching ALL drafts for the logged-in user.
  // We still keep this effect even if not displayed, as 'handleSaveDraft' uses 'setUserDrafts'
  // to update this state after saving, potentially for other components that might use it later.
  useEffect(() => {
    const fetchAllUserDrafts = async () => {
      if (status === 'authenticated' && session?.user?.id && session?.accessToken) {
        const token = session.accessToken;
        const userId = session.user.id;
        try {
          const response = await axios.get(
            `https://phil-whom-hide-lynn.trycloudflare.com/api/v1/products/drafts/user/${userId}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          if (response.status === 200 && response.data?.payload) {
            setUserDrafts(response.data.payload);
          } else {
            setUserDrafts([]);
            // toast.error("Failed to fetch user drafts."); // Removed toast as this list isn't primary for this page
          }
        } catch (error) {
          console.error("Failed to fetch all user drafts (background):", error); // Log as background error
          setUserDrafts([]);
          // toast.error("Error fetching your drafts."); // Removed toast
        }
      } else {
          setUserDrafts([]);
      }
    };

    fetchAllUserDrafts();
  }, [status, session]);

  // Restoring files from localStorage (for new product entry, not for drafts from API)
  useEffect(() => {
    if (draftId) return;

    const stored = localStorage.getItem('uploadedPreviews');
    if (stored) {
      try {
        const previews = JSON.parse(stored);
        const reconstructedFiles = previews.map((file) => {
          const byteString = atob(file.dataUrl.split(',')[1]);
          const mimeType = file.type;
          const ab = new ArrayBuffer(byteString.length);
          const ia = new Uint8Array(ab);
          for (let i = 0; i < byteString.length; i++) {
            ia[i] = byteString.charCodeAt(i);
          }
          return new File([ab], file.name, { type: mimeType });
        });
        setFiles(reconstructedFiles);
      } catch (error) {
        console.error('Error restoring files from localStorage:', error);
      } finally {
        localStorage.removeItem('uploadedPreviews');
      }
    }
  }, [draftId]);

  // Navigation guard code
  useEffect(() => {
    const handleClick = (e) => {
      if (showPopup) {
        const insidePopup = e.target.closest('.draft-popup');
        if (!insidePopup) {
          e.preventDefault();
          e.stopPropagation();
          return;
        }
      }

      const anchor = e.target.closest('a');
      if (!anchor || !anchor.href || anchor.href === window.location.href) return;

      const isInternal = anchor.href.startsWith(window.location.origin);
      const isSamePath = anchor.pathname === window.location.pathname;

      if (files.length > 0 && !isLoading && isInternal && !isSamePath && !isNavigatingRef.current) {
        e.preventDefault();
        setNavigationTarget(anchor.href);
        setShowPopup(true);
      }
    };

    const handlePopState = () => {
      if (files.length > 0 && !isLoading && !isNavigatingRef.current) {
        history.pushState(null, '', window.location.href);
        setNavigationTarget(null);
        setShowPopup(true);
      }
    };

    document.addEventListener('click', handleClick, true);
    window.addEventListener('popstate', handlePopState);

    return () => {
      document.removeEventListener('click', handleClick, true);
      window.removeEventListener('popstate', handlePopState);
    };
  }, [files, isLoading, showPopup]);

  // Confirm navigation popup for unsaved changes
  useEffect(() => {
    if (showPopup) {
      const beforeUnloadHandler = (e) => {
        e.preventDefault();
        e.returnValue = '';
        return '';
      };
      window.addEventListener('beforeunload', beforeUnloadHandler);
      return () => {
        window.removeEventListener('beforeunload', beforeUnloadHandler);
      };
    }
  }, [showPopup]);

  const handleSaveDraft = async () => {
    const token = session?.accessToken || localStorage.getItem('token');
    if (!token) {
        toast.error("You must be logged in to save a draft.");
        return;
    }

    setIsLoading(true);

    try {
        const selectedCategory = staticCategories.find((cat) => cat.name === category);
        const mainCategoryId = selectedCategory ? selectedCategory.id : 0;

        const params = new URLSearchParams();
        params.append("productName", title || "");
        params.append("userId", String(session?.user?.id || JSON.parse(localStorage.getItem('cachedUser')).id));
        params.append("mainCategoryId", String(mainCategoryId || ""));
        params.append("productPrice", String(price || ""));
        params.append("discountPercent", String(discount || ""));
        params.append("description", description || "");
        params.append("location", location || "");
        params.append("latitude", String(latitude || ""));
        params.append("longitude", String(longitude || ""));
        params.append("condition", condition || "");
        params.append("telegramUrl", telegram || "");

        const formData = new FormData();
        files.forEach((file) => {
            if (file instanceof File) {
                formData.append("files", file);
            }
        });

        let response;
        const baseUrl = "https://phil-whom-hide-lynn.trycloudflare.com/api/v1/products/";

        if (draftId) {
            response = await axios.put(
                `${baseUrl}drafts/${draftId}?${params.toString()}`,
                formData,
                { headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'multipart/form-data' } }
            );
        } else {
            response = await axios.post(
                `${baseUrl}save-draft?${params.toString()}`,
                formData,
                { headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'multipart/form-data' } }
            );
        }

        if (response.status === 200) {
            toast.success("Draft saved successfully!");
            localStorage.removeItem("unsavedDraft");
            if (!draftId && response.data?.payload?.draftId) {
                router.replace(`/sell?draftId=${response.data.payload.draftId}`);
            }
            // Re-fetch all user drafts to update the list displayed (if another component uses it)
            if (session?.user?.id) {
                const userId = session.user.id;
                const updatedDraftsResponse = await axios.get(
                    `https://phil-whom-hide-lynn.trycloudflare.com/api/v1/products/drafts/user/${userId}`,
                    { headers: { Authorization: `Bearer ${token}` } }
                );
                if (updatedDraftsResponse.status === 200 && updatedDraftsResponse.data?.payload) {
                    setUserDrafts(updatedDraftsResponse.data.payload); // Update state for other components
                }
            }
        } else {
            toast.error("Unexpected server response when saving draft.");
        }
    } catch (error) {
        console.error("Failed to save draft:", error);
        const msg =
            error?.response?.data?.message ||
            error?.message ||
            "Failed to save draft. Please try again.";
        toast.error(msg);
    } finally {
        setIsLoading(false);
        proceedNavigation();
    }
};

  const proceedNavigation = () => {
    setShowPopup(false);
    isNavigatingRef.current = true;
    if (navigationTarget) {
      router.push(navigationTarget);
    } else {
      router.back();
    }
  };

  const discardAndLeave = () => {
    setShowPopup(false);
    isNavigatingRef.current = true;
    if (navigationTarget) {
      router.push(navigationTarget);
    } else {
      router.back();
    }
  };

  const handleListNow = async () => {
  // Validations remain the same
  if (!files.length) return toast.error('Please upload at least one image');
  if (!title.trim()) return toast.error('Product name is required');
  if (!condition) return toast.error('Please select product condition');
  if (!price || isNaN(parseFloat(price))) return toast.error('Please enter a valid price');
  if (!category) return toast.error('Please select a category');
  if (!productStatus) return toast.error('Please select product status');
  if (!location.trim()) return toast.error('Location is required');
  const isTelegramValid = dealMethodRef.current?.validateTelegram?.();
  if (!isTelegramValid) return;

  setIsLoading(true);
  
  try {
    // Get token from session or localStorage
    const token = session?.accessToken || localStorage.getItem('token');
    if (!token) {
      toast.error("You must be logged in to list an item.");
      setIsLoading(false);
      router.push('/login');
      return;
    }

    if (draftId) {
      // For publishing existing drafts
      const selectedCategory = staticCategories.find((cat) => cat.name === category);
      const mainCategoryId = selectedCategory ? selectedCategory.id : 0;

      // Create URLSearchParams for query parameters
      const params = new URLSearchParams();
      params.append('productName', title);
      params.append('mainCategoryId', mainCategoryId);
      params.append('productPrice', price);
      params.append('discountPercent', discount || '0');
      params.append('description', description);
      params.append('location', location);
      params.append('latitude', latitude || '0');
      params.append('longitude', longitude || '0');
      params.append('condition', condition);
      params.append('telegramUrl', telegram);
      params.append('productStatus', 'ON SALE'); // Force status when publishing

      // Create FormData for files
      const formData = new FormData();
      files.forEach(file => {
        if (file instanceof File) {
          formData.append('files', file);
        }
      });

      // Make the PUT request to update and publish the draft
      const response = await axios.put(
        `https://phil-whom-hide-lynn.trycloudflare.com/api/v1/products/update-draft/${draftId}?${params.toString()}`,
        formData,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'multipart/form-data'
          }
        }
      );

      if (response.status === 200) {
        toast.success("Item published successfully!");
        router.replace(`/profile/${encodeURIComponent(encryptId(session.user.id))}`);
      } else {
        throw new Error(response.data?.message || "Failed to publish draft");
      }
    } else {
      // For new listings (not from draft)
      const selectedCategory = staticCategories.find((cat) => cat.name === category);
      const mainCategoryId = selectedCategory ? selectedCategory.id : 0;

      const productData = {
        productName: title,
        userId: session.user.id,
        mainCategoryId,
        productPrice: parseFloat(price),
        discountPercent: parseFloat(discount) || 0,
        productStatus,
        description,
        location,
        latitude,
        longitude,
        condition,
        telegramUrl: telegram,
        files,
      };

      const result = await postProduct(productData, token);
      if (result) {
        toast.success("Item listed successfully!");
        const encryptedId = encodeURIComponent(encryptId(session.user.id));
        router.push(`/profile/${encryptedId}`);
      } else {
        throw new Error('Failed to upload product');
      }
    }
  } catch (error) {
    console.error('Submit error:', error);
    
    // Handle specific error cases
    if (error.response?.status === 401) {
      toast.error("Session expired. Please login again.");
      router.push('/login');
    } else {
      const errorMessage = error.response?.data?.message || 
                          error.message || 
                          "Failed to list item. Please try again.";
      toast.error(errorMessage);
    }
  } finally {
    setIsLoading(false);
  }
};

  return (
    <div className="relative">
      <div className="mx-auto px-[7%] py-8">
        <h1 className="text-xl font-semibold text-gray-800 mb-1">List an item</h1>

        {/* This section for displaying user drafts is now REMOVED as per your request */}
        {/*
        {userDrafts.length > 0 && (
          <div className="my-4 p-4 border rounded-lg bg-gray-50">
            <h2 className="text-lg font-semibold mb-2">Your Saved Drafts:</h2>
            <ul className="list-disc list-inside">
              {userDrafts.map((draft) => (
                <li key={draft.draftId} className="mb-1 flex items-center justify-between">
                  <div>
                    <span className="font-medium">{draft.productName || `Draft ${draft.draftId}`}</span>
                    <span className="text-gray-500 text-sm ml-2">
                        {draft.updatedAt ? `- Last updated: ${new Date(draft.updatedAt).toLocaleString()}` : ''}
                    </span>
                  </div>
                  <button
                    onClick={() => router.push(`/sell?draftId=${draft.draftId}`)}
                    className="ml-4 px-3 py-1 text-sm bg-blue-100 text-blue-800 rounded-full hover:bg-blue-200"
                  >
                    Load
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
        */}

        <div className="flex flex-col md:flex-row gap-8">
          <div className="flex-1 space-y-4">
            <PhotoUploader files={files} setFiles={setFiles} />
          </div>
          <div className="w-full md:w-1/2 space-y-6">
            <CategorySelector selected={category} onSelect={setCategory} categories={staticCategories} />
            {category && (
              <>
                <ConditionSelector selected={condition} onSelect={setCondition} />
                <ItemDetailForm
                  title={title}
                  setTitle={setTitle}
                  productStatus={productStatus}
                  setProductStatus={setProductStatus}
                  description={description}
                  setDescription={setDescription}
                />
                <DealMethod
                  ref={dealMethodRef}
                  location={location}
                  setLocation={setLocation}
                  telegram={telegram}
                  setTelegram={setTelegram}
                  setLatitude={setLatitude}
                  setLongitude={setLongitude}
                />
                <PricingInput price={price} setPrice={setPrice} discount={discount} setDiscount={setDiscount} />
              </>
            )}
          </div>
        </div>
        <div className="text-end mt-8 space-x-4">
          <button
            disabled={isLoading}
            onClick={handleListNow}
            className={`px-6 py-2 mt-2 rounded-full text-white transition ${
              isLoading ? 'bg-gray-400 cursor-not-allowed' : 'bg-orange-500 hover:bg-orange-600'
            }`}
          >
            {isLoading ? 'Uploading...' : 'List now'}
          </button>
        
        </div>
      </div>

      {showPopup && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="bg-white rounded-xl shadow-lg p-6 w-[90%] max-w-md text-center draft-popup">
            <p className="text-lg font-medium mb-4">Do you want to save this as a draft?</p>
            <div className="flex justify-center gap-4">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleSaveDraft();
                }}
                className="px-4 py-2 rounded-full bg-green-500 text-white"
              >
                Yes
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  discardAndLeave();
                }}
                className="px-4 py-2 rounded-full bg-gray-400 text-white"
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SellNewPage;