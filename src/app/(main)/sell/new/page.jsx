"use client";

import { useState } from "react";
import PhotoUploader from "@/components/sell/PhotoUploader";
import CategorySelector from "@/components/sell/CategorySelector";
import ConditionSelector from "@/components/sell/ConditionSelector";
import ItemDetailForm from "@/components/sell/ItemDetailForm";
import DealMethod from "@/components/sell/DealMethod";
import PricingInput from "@/components/sell/PricingInput";
import Footer from "@/components/layout/Footer";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function SellNewPage() {
  const router = useRouter();
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

  useEffect(() => {
    const stored = localStorage.getItem("uploadedPreviews");
    if (stored) {
      const previews = JSON.parse(stored);
      const reconstructedFiles = previews.map((file) => {
        const byteString = atob(file.dataUrl.split(",")[1]);
        const mimeType = file.type;
        const ab = new ArrayBuffer(byteString.length);
        const ia = new Uint8Array(ab);
        for (let i = 0; i < byteString.length; i++) {
          ia[i] = byteString.charCodeAt(i);
        }
        return new File([ab], file.name, { type: mimeType });
      });

      setFiles(reconstructedFiles);
      localStorage.removeItem("uploadedPreviews");
    }
  }, []);

  const handleSubmit = async () => {
    console.log({
      title,
      description,
      category,
      condition,
      price,
      latitude,
      longitude,
      location,
    });
    if (
      !title ||
      !description ||
      !category ||
      !condition ||
      !price ||
      !latitude ||
      !longitude
    ) {
      alert("Please fill in all required fields.");
      return;
    }

    try {
      const token = localStorage.getItem("authToken"); // assuming you're using JWT auth
      console.log("Token:", token);

      const formData = new FormData();
      formData.append("productName", title);
      formData.append("categoryId", category);
      formData.append("productCondition", condition);
      formData.append("productStatus", "Available"); // or let user choose
      formData.append("productDescription", description);
      formData.append("telegramLink", telegram);
      formData.append("productPrice", price);
      formData.append("discountPercent", discount || "0");
      formData.append("latitude", latitude);
      formData.append("longitude", longitude);

      // formData.append("latitude", latLng.lat);
      // formData.append("longitude", latLng.lng);
      // const finalLat = latitude || latLng.lat;
      // const finalLng = longitude || latLng.lng;

      // formData.append("latitude", finalLat);
      // formData.append("longitude", finalLng);

      const newData = {
        name: "sok",
        description: "sssssss",
      };
      console.log("new", newData);

      files.forEach((file) => {
        formData.append("images", file);
      });
      for (let [key, value] of formData.entries()) {
        console.log(`${key}:`, value);
      }
      console.log("data to push", formData);

      const response = await fetch(
        "http://localhost:8080/api/products/create-with-images",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );

      if (!response.ok) throw new Error("Failed to upload");

      const data = await response.json();
      console.log("Upload success", data);
      router.push("/profile/seller");
    } catch (err) {
      console.error("Upload failed", err);
      alert("Upload failed. Please try again.");
    }
  };

  return (
    <>
      <div className="mx-auto px-[7%] py-8">
        <h1 className="text-xl font-semibold text-gray-800 mb-1">
          List and items
        </h1>
        <div className="flex flex-col md:flex-row gap-8">
          {/* Left: Image Upload */}
          <div className="flex-1 space-y-4">
            <PhotoUploader files={files} setFiles={setFiles} />
          </div>

          {/* Right: Dynamic Form */}
          <div className="w-full md:w-1/2 space-y-6">
            <CategorySelector selected={category} onSelect={setCategory} />

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
        <div
          className="text-end mt-8"
          // onClick={() => router.push("/profile/seller")}
        >
          <button
            onClick={handleSubmit}
            className="px-6 py-2 mt-2 bg-orange-500 text-white rounded-full hover:bg-orange-600 transition"
          >
            List now
          </button>
        </div>
      </div>
    </>
  );
}
