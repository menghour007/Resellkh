"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Move } from "lucide-react";
import CustomDropdown from "./someComponent/CustomDropdown";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { encryptId } from "@/utils/encryption";

const provinceOptions = [
  "Phnom Penh", "Banteay Meanchey", "Battambang", "Kampong Cham",
  "Kampong Chhnang", "Kampong Speu", "Kampong Thom", "Kandal", "Kep",
  "Koh Kong", "Kratie", "Mondulkiri", "Oddar Meanchey", "Pailin",
  "Preah Sihanouk", "Preah Vihear", "Prey Veng", "Pursat", "Ratanakiri",
  "Siem Reap", "Stung Treng", "Svay Rieng", "Takeo", "Tbong Khmum", "Bavet"
];

export default function EditProfilePage({ sellerId }) {
  const [formData, setFormData] = useState({
    username: "",
    firstName: "",
    lastName: "",
    bio: "",
    location: "",
    address: "",
    telegram: "",
    mobile: "",
    gender: "",
    birthday: "",
    profileImage: null,
    coverImage: null,
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();
  const fileInputRef = useRef(null);
  const coverInputRef = useRef(null);
  const [selectedImage, setSelectedImage] = useState("/default-avatar.png");
  const [selectedCoverImage, setSelectedCoverImage] = useState("/cover.jpg");

  // Get encrypted profile URL
  const getEncryptedProfileUrl = () => {
    try {
      const encrypted = encryptId(sellerId.toString());
      return `/profile/${encodeURIComponent(encrypted)}`;
    } catch (error) {
      console.error("Encryption failed:", error);
      return `/profile/${sellerId}`; // Fallback to unencrypted
    }
  };

  useEffect(() => {
    async function fetchProfile() {
      if (!sellerId) {
        setError("Please login to view this profile");
        setLoading(false);
        return;
      }

      try {
        const token = localStorage.getItem("token");

        const res = await fetch(`https://phil-whom-hide-lynn.trycloudflare.com/api/v1/profile/${sellerId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();
        if (data.status === 200 && data.payload) {
          const p = data.payload;
          setFormData({
            username: p.userName || "",
            firstName: p.firstName || "",
            lastName: p.lastName || "",
            bio: p.slogan || "",
            location: p.address || "",
            address: p.address || "",
            telegram: p.telegramUrl ? extractTelegramUsername(p.telegramUrl) : "",
            mobile: p.phoneNumber || "",
            gender: p.gender || "",
            birthday: p.birthday || "",
            profileImage: null,
            coverImage: null,
          });
          setSelectedImage(p.profileImage || "/default-avatar.png");
          setSelectedCoverImage(p.coverImage || "/cover.jpg");
        } else {
          setError("Profile not found or error in response.");
        }
      } catch (err) {
        console.error("API error:", err);
        setError("Failed to fetch profile.");
      } finally {
        setLoading(false);
      }
    }

    fetchProfile();
  }, [sellerId]);

  function extractTelegramUsername(url) {
    try {
      const u = new URL(url);
      return u.pathname.replace("/", "");
    } catch {
      return url;
    }
  }

  const validateTelegramUsername = (username) => {
    if (!username) return false;
    const cleanUsername = username.trim().startsWith('@') 
      ? username.trim().slice(1) 
      : username.trim();
    const regex = /^[a-zA-Z][a-zA-Z0-9_]{4,31}$/;
    return regex.test(cleanUsername);
  };

  const handleChange = (field) => (e) => {
    const value = e?.target?.value ?? e;
    setFormData(prev => ({
      ...prev, 
      [field]: value,
      ...(field === "location" ? { address: value } : {})
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedImage(URL.createObjectURL(file));
      setFormData(prev => ({ ...prev, profileImage: file }));
    } else {
      setSelectedImage("/default-avatar.png");
      setFormData(prev => ({ ...prev, profileImage: null }));
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const handleCoverChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedCoverImage(URL.createObjectURL(file));
      setFormData(prev => ({ ...prev, coverImage: file }));
    } else {
      setSelectedCoverImage("/cover.jpg");
      setFormData(prev => ({ ...prev, coverImage: null }));
      if (coverInputRef.current) coverInputRef.current.value = "";
    }
  };

  const handleSave = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("No token found. Please log in.");
      return;
    }

    if (formData.telegram && !validateTelegramUsername(formData.telegram)) {
      toast.error("Invalid Telegram username. Must be 5-32 characters and only contain letters, numbers, or underscores.");
      return;
    }

    const formDataToSend = new FormData();
    formDataToSend.append("userId", sellerId);
    formDataToSend.append("gender", formData.gender || "");
    formDataToSend.append("phoneNumber", formData.mobile || "");
    formDataToSend.append("birthday", formData.birthday || "");
    formDataToSend.append("address", formData.address || "");

    const cleanTelegram = formData.telegram.startsWith("@") 
      ? formData.telegram.slice(1) 
      : formData.telegram;
    formDataToSend.append("telegramUrl", `https://t.me/${cleanTelegram}`);

    formDataToSend.append("slogan", formData.bio || "");
    formDataToSend.append("userName", formData.username || "");
    formDataToSend.append("firstName", formData.firstName || "");
    formDataToSend.append("lastName", formData.lastName || "");

    if (formData.profileImage instanceof File) {
      formDataToSend.append("profileImage", formData.profileImage);
    } else if (formData.profileImage === null) {
      formDataToSend.append("removeProfileImage", "true");
    }

    if (formData.coverImage instanceof File) {
      formDataToSend.append("coverImage", formData.coverImage);
    } else if (formData.coverImage === null) {
      formDataToSend.append("removeCoverImage", "true");
    }

    const toastId = toast.loading("Saving profile...");

    try {
      const res = await fetch("https://phil-whom-hide-lynn.trycloudflare.com/api/v1/profile/edit", {
        method: "PUT",
        headers: { Authorization: `Bearer ${token}` },
        body: formDataToSend,
      });

      const data = await res.json();
      toast.dismiss(toastId);

      if (res.ok && data.status === 200) {
        localStorage.setItem("firstName", formData.firstName);
        localStorage.setItem("lastName", formData.lastName);
        localStorage.setItem("userName", formData.username);

        const imageToStore = formData.profileImage instanceof File 
          ? selectedImage 
          : "/default-avatar.png";
        localStorage.setItem("profileImage", imageToStore);

        const updatedUser = {
          id: sellerId,
          name: `${formData.firstName || ""} ${formData.lastName || ""}`.trim() || "User",
          avatar: selectedImage,
          username: formData.username,
        };
        localStorage.setItem("userData", JSON.stringify(updatedUser));

        window.dispatchEvent(new CustomEvent("profile-updated", { detail: updatedUser }));

        toast.success("Profile updated successfully!");
        router.push(getEncryptedProfileUrl());
      } else {
        toast.error(data.message || "Failed to update profile.");
      }
    } catch (err) {
      toast.dismiss(toastId);
      console.error("Error updating profile:", err);
      toast.error("Something went wrong.");
    }
  };

  if (loading) return <p className="text-center py-10">Loading profile...</p>;
  if (error) return <p className="text-center py-10 text-red-500">{error}</p>;

  return (
    <div className="mx-auto px-[7%] mb-20">
      <div className="relative w-full h-[180px] rounded-2xl overflow-hidden group">
        <Image
          src={selectedCoverImage}
          alt="Cover"
          fill
          className="object-cover w-[100%] h-[100%] rounded-2xl"
          priority
        />
        <input
          type="file"
          ref={coverInputRef}
          onChange={handleCoverChange}
          accept="image/*"
          className="hidden"
          key={selectedCoverImage}
        />
        <div className="absolute top-3 right-3 flex gap-2">
          <button
            onClick={() => coverInputRef.current?.click()}
            className="bg-white/80 hover:bg-white text-sm px-3 py-1 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity"
          >
            Edit Cover
          </button>
        </div>
      </div>

      <div className="w-full px-6 -mt-20 relative z-10">
        <div className="bg-white rounded-xl shadow px-6 pt-6">
          <h1 className="text-lg font-bold mb-1">Edit Profile</h1>

          <div className="flex items-center text-gray-500 mb-5">
            <Link href={getEncryptedProfileUrl()} className="hover:text-black">Profile</Link>
            <span className="mx-2">&gt;</span>
            <span className="text-orange-500">Edit profile</span>
          </div>

          <div className="flex items-center gap-6 mb-10 mx-auto max-w-4xl">
            <div className="relative">
              <Image
                src={selectedImage}
                alt="avatar"
                width={120}
                height={120}
                className="rounded-full border-4 border-white object-cover"
              />
            </div>
            <div>
              <p className="text-sm text-gray-700 mb-2">{formData.bio}</p>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept="image/*"
                className="hidden"
                key={selectedImage}
              />
              <button
                onClick={() => fileInputRef.current?.click()}
                className="text-sm border px-4 py-1 rounded hover:bg-gray-100"
              >
                Update photo
              </button>
            </div>
          </div>

          <div className="max-w-4xl mx-auto">
            <Section title="Public profile">
              <Input label="Username" value={formData.username} onChange={handleChange("username")} />
              <Input label="First name" value={formData.firstName} onChange={handleChange("firstName")} />
              <Input label="Last name" value={formData.lastName} onChange={handleChange("lastName")} />
              <Textarea placeholder="Bio" value={formData.bio} onChange={handleChange("bio")} maxLength={255} />
            </Section>

            <Section title="Location">
              <CustomDropdown
                value={formData.location}
                options={provinceOptions}
                onChange={handleChange("location")}
              />
            </Section>

            <Section title="Business address">
              <Link href="/location" className="flex items-center text-orange-500 font-medium">
                <div className="w-6 h-6 bg-orange-500 rounded-full text-white flex items-center justify-center mr-2">
                  <Move className="w-4 h-4" />
                </div>
                Add Location
              </Link>
            </Section>

            <Section title="Telegram Username">
              <Input
                placeholder="@yourusername"
                value={formData.telegram}
                onChange={(e) => {
                  let raw = e.target.value.trim();
                  const username = raw.startsWith("@") ? raw.slice(1) : raw;
                  const formatted = `@${username}`;
                  handleChange("telegram")(formatted);

                  if (username.length < 5) return;

                  const isValid = username.length <= 32 && /^[a-zA-Z0-9_]+$/.test(username);
                  if (!isValid) {
                    toast.dismiss();
                    toast.error("Invalid Telegram username. Must be 5–32 characters and only contain letters, numbers, or underscores.");
                  }
                }}
              />
            </Section>

            <Section title="Private Information">
              <p className="text-xs text-gray-500 mb-4 flex items-center gap-1">
                <svg
                  className="inline-block w-8 md:w-5 lg:w-5"
                  viewBox="0 0 27 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M18.2765 10.5V6.75C18.2765 4.26472 16.0448 2.25 13.2919 2.25C10.539 2.25 8.30739 4.26472 8.30739 6.75V10.5M7.47664 21.75H19.1072C20.4836 21.75 21.5995 20.7426 21.5995 19.5V12.75C21.5995 11.5074 20.4836 10.5 19.1072 10.5H7.47664C6.1002 10.5 4.98438 11.5074 4.98438 12.75V19.5C4.98438 20.7426 6.1002 21.75 7.47664 21.75Z"
                    stroke="#0F172A"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                We do not share this information with other users unless explicit permission is given by you.
              </p>
              <Input label="Mobile number" value={formData.mobile} onChange={handleChange("mobile")} />
              <h2 className="block text-sm font-bold text-black mb-1">Gender</h2>
              <CustomDropdown
                value={formData.gender}
                options={["Male", "Female", "Other"]}
                onChange={handleChange("gender")}
              />
              <Input label="Birthday" type="date" value={formData.birthday} onChange={handleChange("birthday")} />
            </Section>

            <div className="flex justify-end -mt-7 py-10">
              <button
                onClick={handleSave}
                className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-full text-sm"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Section({ title, children }) {
  return (
    <section className="mb-6">
      <h2 className="font-semibold text-lg mb-3">{title}</h2>
      {children}
    </section>
  );
}

function Input({ label, value, onChange, placeholder = "", type = "text" }) {
  return (
    <div className="mb-4">
      {label && <label className="block text-sm font-semibold mb-1">{label}</label>}
      <input
        type={type}
        value={value || ""}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full border h-[45px] rounded-[24px] border-gray-900 px-3 py-2 text-sm focus:outline-none focus:border-orange-400"
      />
    </div>
  );
}

function Textarea({ value, onChange, maxLength, placeholder = "" }) {
  return (
    <div className="pt-3">
      <textarea
        value={value || ""}
        onChange={onChange}
        maxLength={maxLength}
        placeholder={placeholder}
        rows={4}
        className="w-full border border-gray-900 rounded-[24px] px-3 py-4 pr-12 pb-6 text-sm resize-none focus:outline-none focus:border-orange-400"
      />
      <p className="text-right text-xs text-gray-400 mt-1">{(value || "").length}/{maxLength}</p>
    </div>
  );
}