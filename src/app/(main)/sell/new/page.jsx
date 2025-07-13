'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from "next-auth/react";
import PhotoUploader from '@/components/sell/PhotoUploader';
import CategorySelector from '@/components/sell/CategorySelector';
import ConditionSelector from '@/components/sell/ConditionSelector';
import ItemDetailForm from '@/components/sell/ItemDetailForm';
import DealMethod from '@/components/sell/DealMethod';
import PricingInput from '@/components/sell/PricingInput';
<<<<<<< HEAD
import { postProduct } from '@/components/services/postProduct.service';

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
=======
// import Footer from '@/components/layout/Footer';
import { useEffect} from 'react';
import { useRouter } from 'next/navigation';
import { createProduct } from '@/components/services/sell.service';
>>>>>>> 2ae46c46d22d602588e08349358b04a77243d1f2

export const SellNewPage = () => {
  const router = useRouter();
  const { data: session, status } = useSession();

  // Form state
  const [files, setFiles] = useState([]);
  const [category, setCategory] = useState('');
  const [condition, setCondition] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [telegram, setTelegram] = useState('');
  const [price, setPrice] = useState('');
  const [discount, setDiscount] = useState('');
<<<<<<< HEAD
  const [latLng, setLatLng] = useState({ lat: null, lng: null });
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Authentication check
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login?redirect=/sell");
    }
  }, [status, router]);
=======
  
 const handleSubmit = async () => {
  const formData = new FormData();
  files.forEach(file => {
    formData.append('images', file);
  });
  
  formData.append('title', title);
  formData.append('category', category);
  formData.append('price', price);
  formData.append('discount', discount);
  formData.append('description', description);
  formData.append('condition', condition);
  formData.append('location', location);
  formData.append('telegram', telegram);

  const result = await createProduct(formData);
  if (result.success !== false) {
    router.push('/profile/seller');
  } else {
    alert("Error: " + result.error);
  }
};
>>>>>>> 2ae46c46d22d602588e08349358b04a77243d1f2

  // Restore uploaded image files from localStorage
  useEffect(() => {
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
        console.error('Error restoring files:', error);
      } finally {
        localStorage.removeItem('uploadedPreviews');
      }
    }
  }, []);

  const handleListNow = async () => {
    // Validate required fields
    if (!files || files.length === 0) {
      alert('Please upload at least one image');
      return;
    }

    if (!title.trim()) {
      alert('Product name is required');
      return;
    }

    if (!condition) {
      alert('Please select product condition');
      return;
    }

<<<<<<< HEAD
    if (!price || isNaN(parseFloat(price))) {
      alert('Please enter a valid price');
      return;
    }

    if (status !== "authenticated") {
      alert('Please login to continue');
      router.push("/login?redirect=/sell");
      return;
    }

    setIsLoading(true);

    try {
      const selectedCategory = staticCategories.find(cat => cat.name === category);
      const mainCategoryId = selectedCategory ? selectedCategory.id : 0;

      const productData = {
        productName: title,
        userId: session.user.id,
        mainCategoryId,
        productPrice: parseFloat(price),
        discountPercent: parseFloat(discount) || 0,
        productStatus: 'available',
        description: description || '',
        location: location || '',
        latitude: latitude || 0,
        longitude: longitude || 0,
        condition,
        telegramUrl: telegram || '',
        files
      };

      const result = await postProduct(productData, session.accessToken);
      
      if (result) {
        router.push(`/profile/${session.user.id}`);
      } else {
        throw new Error('Failed to upload product');
      }
    } catch (error) {
      console.error('Submission Error:', error);
      alert(`Upload failed: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  if (status !== "authenticated") {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-center">
          <p>Redirecting to login...</p>
=======
        {/* Bottom Button */}
        <div className="text-end mt-8">
          <button
            className="px-6 py-2 mt-2 bg-orange-500 text-white rounded-full hover:bg-orange-600 transition"
            onClick={handleSubmit}
            >
            List now
          </button>
>>>>>>> 2ae46c46d22d602588e08349358b04a77243d1f2
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto px-[7%] py-8">
      <h1 className="text-xl font-semibold text-gray-800 mb-1">List an item</h1>
      <div className="flex flex-col md:flex-row gap-8">
        {/* Left: Image Upload */}
        <div className="flex-1 space-y-4">
          <PhotoUploader files={files} setFiles={setFiles} />
        </div>

        {/* Right: Dynamic Form */}
        <div className="w-full md:w-1/2 space-y-6">
          <CategorySelector 
            selected={category} 
            onSelect={setCategory} 
            categories={staticCategories} 
          />
          
          {category && (
            <>
              <ConditionSelector 
                selected={condition} 
                onSelect={setCondition} 
              />
              <ItemDetailForm
                title={title}
                setTitle={setTitle}
                description={description}
                setDescription={setDescription}
              />
              <DealMethod
                location={location}
                setLocation={setLocation}
                telegram={telegram}
                setTelegram={setTelegram}
                setLatLng={setLatLng}
                setLatitude={setLatitude}
                setLongitude={setLongitude}
              />
              <PricingInput
                price={price}
                setPrice={setPrice}
                discount={discount}
                setDiscount={setDiscount}
              />
            </>
          )}
        </div>
      </div>

      {/* Bottom Button */}
      <div className="text-end mt-8">
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
  );
};

export default SellNewPage;