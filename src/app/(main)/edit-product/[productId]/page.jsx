"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import PhotoUploader from "@/components/sell/PhotoUploader";
import CategorySelector from "@/components/sell/CategorySelector";
import ConditionSelector from "@/components/sell/ConditionSelector";
import ItemDetailForm from "@/components/sell/ItemDetailForm";
import DealMethod from "@/components/sell/DealMethod";
import PricingInput from "@/components/sell/PricingInput";

import { deleteProduct } from "@/components/services/deleteProduct.service";
import { updateProduct } from "@/components/services/updateProduct.service";

const staticCategories = [
  { id: 1, name: "Accessories" },
  { id: 2, name: "Beauty" },
  { id: 3, name: "Equipment Bag & Shoes" },
  { id: 4, name: "Book" },
  { id: 5, name: "Fashion" },
  { id: 6, name: "Home" },
  { id: 7, name: "Sports & Kids" },
  { id: 8, name: "Electronic" },
  { id: 9, name: "Vehicle" },
  { id: 10, name: "Other" },
];

export default function EditProductPage({ params }) {
  const router = useRouter();
  const { data: session, status } = useSession();
  const { productId } = params;

  // Form state
  const [files, setFiles] = useState([]);
  const [category, setCategory] = useState("");
  const [condition, setCondition] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [telegram, setTelegram] = useState("");
  const [price, setPrice] = useState("");
  const [discount, setDiscount] = useState("");
  const [latLng, setLatLng] = useState({ lat: null, lng: null });
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingProduct, setIsLoadingProduct] = useState(true);
  const [error, setError] = useState(null);
  const [originalProduct, setOriginalProduct] = useState(null);

  // Authentication check
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login?redirect=/edit-product/" + productId);
    }
  }, [status, router, productId]);

  // Fetch product data
  useEffect(() => {
    if (productId && status === "authenticated") {
      fetchProductData();
    }
  }, [productId, status]);

  const fetchProductData = async () => {
    try {
      setIsLoadingProduct(true);
      const token = localStorage.getItem("token");

      const response = await fetch(
        `https://phil-whom-hide-lynn.trycloudflare.com/api/v1/products/getproductbyuserid/${session.user.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch product data");
      }

      const data = await response.json();

      // Find the specific product
      const product = data.payload.find(
        (p) => p.productId === parseInt(productId)
      );

      if (!product) {
        throw new Error("Product not found");
      }

      // Check if user owns this product
      if (product.userId !== session.user.id) {
        throw new Error("Unauthorized to edit this product");
      }

      setOriginalProduct(product);

      // Pre-fill form with existing data
      setTitle(product.productName || "");
      setDescription(product.description || "");
      setLocation(product.location || "");
      setTelegram(product.telegramUrl || "");
      setPrice(product.productPrice?.toString() || "");
      setDiscount(product.discountPercent?.toString() || "");
      setCondition(product.condition || "");
      setLatitude(product.latitude);
      setLongitude(product.longitude);
      setLatLng({ lat: product.latitude, lng: product.longitude });

      // Set category based on mainCategoryId
      const selectedCategory = staticCategories.find(
        (cat) => cat.id === product.mainCategoryId
      );
      if (selectedCategory) {
        setCategory(selectedCategory.name);
      }

      // Convert existing images to File objects for the uploader
      if (product.fileUrls && product.fileUrls.length > 0) {
        convertUrlsToFiles(product.fileUrls);
      }
    } catch (err) {
      setError(err.message);
      console.error("Error fetching product:", err);
    } finally {
      setIsLoadingProduct(false);
    }
  };

  const convertUrlsToFiles = async (urls) => {
    try {
      const filePromises = urls.map(async (url, index) => {
        try {
          const response = await fetch(url);
          const blob = await response.blob();
          const filename = `existing-image-${index + 1}.jpg`;
          return new File([blob], filename, {
            type: blob.type || "image/jpeg",
          });
        } catch (error) {
          console.error(`Error converting URL to file: ${url}`, error);
          return null;
        }
      });

      const convertedFiles = await Promise.all(filePromises);
      const validFiles = convertedFiles.filter((file) => file !== null);
      setFiles(validFiles);
    } catch (error) {
      console.error("Error converting URLs to files:", error);
    }
  };

  const handleSaveEdit = async () => {
    // Validate required fields
    if (!files || files.length === 0) {
      alert("Please upload at least one image");
      return;
    }

    if (!title.trim()) {
      alert("Product name is required");
      return;
    }

    if (!condition) {
      alert("Please select product condition");
      return;
    }

    if (!price || isNaN(parseFloat(price))) {
      alert("Please enter a valid price");
      return;
    }

    if (status !== "authenticated") {
      alert("Please login to continue");
      router.push("/login?redirect=/edit-product/" + productId);
      return;
    }

    setIsLoading(true);

    try {
      const selectedCategory = staticCategories.find(
        (cat) => cat.name === category
      );
      const mainCategoryId = selectedCategory ? selectedCategory.id : 0;

      const productData = {
        productId: parseInt(productId),
        productName: title,
        userId: session.user.id,
        mainCategoryId,
        productPrice: parseFloat(price),
        discountPercent: parseFloat(discount) || 0,
        productStatus: originalProduct?.productStatus || "Public",
        description: description || "",
        location: location || "",
        latitude: latitude || 0,
        longitude: longitude || 0,
        condition,
        telegramUrl: telegram || "",
        // Ensure files are passed correctly
        files,
      };

      // Call your update product API
      const result = await updateProduct(
        productId,
        productData,
        files,
        session.accessToken
      );

      alert("Product updated successfully!");
      router.push(`/profile/${session.user.id}`);
    } catch (error) {
      console.error("Update Error:", error);
      alert(`Update failed: ${error.message}`);
      // Optionally redirect if the error is related to authentication
      if (error.message.includes("Unauthorized")) {
        router.push("/login?redirect=/edit-product/" + productId);
      }
    } finally {
      setIsLoading(false);
    }
  };
  // Your existing handleDelete function in EditProductPage.js

  const handleDelete = async () => {
    if (
      !confirm(
        "Are you sure you want to delete this product? This action cannot be undone."
      )
    ) {
      return;
    }

    setIsLoading(true);

    try {
      const token = session.accessToken; // Get token for delete call
      // Call your deleteProduct service with productId and token
      const result = await deleteProduct(productId, token);

      console.log("Delete API response:", result); // Log the response for debugging

      // Check the response from your deleteProduct service
      // Based on your API response structure: { message: "Product deleted successfully", payload: {...}, status: 200, ...}
      if (result && result.status === 200) {
        alert("Product deleted successfully!");
        router.push(`/profile/${session.user.id}`); // Redirect on success
      } else {
        // If the API indicates an error but response.ok was true (unlikely with a good API)
        throw new Error(result.message || "Failed to delete product.");
      }
    } catch (error) {
      console.error("Delete Error:", error);
      alert(`Delete failed: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  if (status !== "authenticated") {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-center">
          <p>Redirecting to login...</p>
        </div>
      </div>
    );
  }

  if (isLoadingProduct) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
          <p>Loading product data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-center">
          <p className="text-red-500 mb-4">Error: {error}</p>
          <button
            onClick={() => router.back()}
            className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto px-[7%] py-8">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-xl font-semibold text-gray-800">Edit Product</h1>
        <button
          onClick={() => router.back()}
          className="px-4 py-2 text-gray-600 hover:text-gray-800 transition"
        >
          ← Back
        </button>
      </div>

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
              <ConditionSelector selected={condition} onSelect={setCondition} />
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

      {/* Bottom Buttons */}
      <div className="flex justify-between mt-8">
        <button
          disabled={isLoading}
          onClick={handleDelete}
          className={`px-6 py-2 rounded-full transition ${
            isLoading
              ? "bg-gray-400 cursor-not-allowed text-white"
              : "bg-red-500 hover:bg-red-600 text-white"
          }`}
        >
          {isLoading ? "Processing..." : "Delete Product"}
        </button>

        <button
          disabled={isLoading}
          onClick={handleSaveEdit}
          className={`px-6 py-2 rounded-full text-white transition ${
            isLoading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-orange-500 hover:bg-orange-600"
          }`}
        >
          {isLoading ? "Saving..." : "Save Changes"}
        </button>
      </div>
    </div>
  );
}