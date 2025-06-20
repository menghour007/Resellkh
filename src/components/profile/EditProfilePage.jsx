"use client";

import Image from "next/image";
import CustomDropdown from "./someComponent/CustomDropdown";
import Link from "next/link";
import { useRef, useState } from 'react';
import { Move } from 'lucide-react';

const provinceOptions = [
  "Phnom Penh",
  "Banteay Meanchey",
  "Battambang",
  "Kampong Cham",
  "Kampong Chhnang",
  "Kampong Speu",
  "Kampong Thom",
  "Kandal",
  "Kep",
  "Koh Kong",
  "Kratie",
  "Mondulkiri",
  "Oddar Meanchey",
  "Pailin",
  "Preah Sihanouk",
  "Preah Vihear",
  "Prey Veng",
  "Pursat",
  "Ratanakiri",
  "Siem Reap",
  "Stung Treng",
  "Svay Rieng",
  "Takeo",
  "Tbong Khmum",
  "Bavet"
];

export default function EditProfilePage() {
  const [formData, setFormData] = useState({
    username: "leakhena92_q",
    firstName: "Bou",
    lastName: "Leakhena",
    bio: "Working towards a sustainable future by giving my treasured items a better home! No refunds!",
    location: "Phnom Penh",
    address: "",
    telegram: "",
    mobile: "097 47 99 099",
    gender: "",
    birthday: "",
  });

  const handleChange = (field) => (e) =>
    setFormData((prev) => ({ ...prev, [field]: e.target.value }));

  const handleSave = () => {
    console.log("Saved:", formData);
    alert("Changes saved");
  };

  const fileInputRef = useRef(null);
  const [selectedImage, setSelectedImage] = useState('/girl 2.jpg');

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageURL = URL.createObjectURL(file);
      setSelectedImage(imageURL);

      // TODO: Upload this file to backend
      // const formData = new FormData();
      // formData.append("file", file);
      // await fetch('/api/upload', { method: 'POST', body: formData });
    }
  };

  const triggerFileSelect = () => {
    fileInputRef.current?.click();
  };

  return (
    <>
      <div className="relative w-full mb-6">
        {/* Cover Image */}
        <div className="relative w-full h-[180px] rounded-2xl overflow-hidden">
          <Image src="/cover.jpg" alt="Cover" fill className="object-cover" />
        </div>

        {/* Info Card */}
        <div className="absolute left-6 right-6 bottom-[-1414px] md:bottom-[-1382px] lg:bottom-[-1385px] bg-white rounded-xl shadow px-6 pt-6 ">
          <div className="w-full mb-6">
            <h1 className="text-lg font-bold mb-1">Edit Profile</h1>
            <div className="flex items-center">
              <div className="flex items-center text-gray-500">
                <Link href="/profile/sellerId" className="hover:text-black">Profile</Link>
                <svg className='mx-1' width="20" height="20" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" clipRule="evenodd" d="M6.98558 5.06864C7.32339 4.7931 7.8211 4.8128 8.13643 5.12775L13.0048 9.99638C13.1679 10.1596 13.2563 10.3779 13.2563 10.6044C13.2563 10.8309 13.1681 11.0488 13.0048 11.2127L8.13633 16.0811C7.80004 16.417 7.2557 16.417 6.92029 16.0811C6.58388 15.7451 6.58388 15.2006 6.92019 14.8648L11.1802 10.6044L6.92029 6.34407C6.60492 6.02908 6.5852 5.53088 6.86112 5.19302L6.92025 5.12769L6.98558 5.06864Z" fill="#343A40" />
                </svg>
                <span className="text-orange-500 cursor-default">Edit profile</span>
              </div>
            </div>

            <div className="max-w-4xl mx-auto px-2 mb-10 mt-5">
              {/* Profile photo and bio section */}
              <div className="flex items-center gap-6 mb-10">
                <Image
                  src={selectedImage}
                  alt="avatar"
                  width={120}
                  height={120}
                  className="rounded-full border-4 border-white object-cover w-[120px] h-[120px]"
                />
                <div className="flex flex-col justify-center">
                  <p className="text-sm text-gray-700 mb-2 max-w-md">{formData.bio}</p>

                  {/* Hidden file input */}
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    accept="image/*"
                    className="hidden"
                  />

                  {/* Trigger button */}
                  <button
                    onClick={triggerFileSelect}
                    className="text-sm border px-4 py-1 rounded hover:bg-gray-100 w-fit"
                  >
                    Update a photo
                  </button>
                </div>
              </div>

              {/* Form section */}
              <div className="rounded-2xl">
                <div className="">
                  {/* Public profile */}
                  <section className="mb-6">
                    <h2 className="font-semibold text-lg mb-3">
                      Public profile
                    </h2>
                    <Input
                      label="Username"
                      placeholder="Enter Username"
                      value={formData.username}
                      onChange={handleChange("username")}
                    />
                    <Input
                      label="First name"
                      placeholder="Enter First Name"
                      value={formData.firstName}
                      onChange={handleChange("firstName")}
                    />

                    <Input
                      label="Last name"
                      placeholder="Enter Last Name"
                      value={formData.lastName}
                      onChange={handleChange("lastName")}
                    />

                    <Textarea
                      label=""
                      placeholder="bio"
                      value={formData.bio}
                      onChange={handleChange("bio")}
                      maxLength={255}
                    />
                  </section>

                  <h2 className="text-black  font-semibold text-lg mb-3">
                    Location
                  </h2>
                  <CustomDropdown
                    // label="Location"
                    value={formData.location}
                    options={provinceOptions}
                    onChange={handleChange("location")}

                  />

                  {/* Business Address */}
                  <section className="mb-6 mt-5">
                    <h2 className="text-black font-semibold text-lg mb-3">
                      Business address
                    </h2>
                    <Link
                      href="/location"
                      className="flex items-center space-x-2 text-orange-500 font-medium hover:opacity-80"
                    >
                      <div className="w-6 h-6 rounded-full bg-orange-500 flex items-center justify-center text-white">
                        <Move className="w-4 h-4" />
                      </div>
                      <span>Add Location</span>
                    </Link>
                  </section>

                  {/* Telegram */}
                  <h2 className="text-black font-semibold text-lg mb-3">
                    Telegram URL
                  </h2>
                  <Input
                    // label="Telegram URL"
                    placeholder="Your telegram URL"
                    value={formData.telegram}
                    onChange={handleChange("telegram")}
                  />

                  {/* Private info */}
                  <section className="mt-10">
                    <h2 className="font-semibold text-lg mb-1 flex items-center gap-1">
                      Private Information
                    </h2>

                    <p className="text-xs text-gray-500 mb-4 flex items-center gap-1">
                      <svg
                        className="inline-block w-8 md:w-5 lg:w-5 "
                        // width="20"
                        // height="18"
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
                      We do not share this information with other users unless
                      explicit permission is given by you.
                    </p>
                    <Input
                      label="Mobile number"
                      placeholder="097 47 99 099"
                      value={formData.mobile}
                      onChange={handleChange("mobile")}
                    />

                    <h2 className="block text-sm font-medium text-black mb-1">
                      Gender
                    </h2>
                    <CustomDropdown
                      value={formData.gender}
                      options={["Male", "Female", "Other"]}
                      onChange={handleChange("gender")}
                      dropdownHeight="110px"
                    />

                    {/* <Input
                      label="Birthday"
                      type="date"
                      value={formData.birthday}
                      onChange={handleChange("birthday")}
                    /> */}

                    {/* Updated Birthday field using react-datepicker */}
                    <div className="mb-4 relative">
                      <label className="block text-sm font-semibold text-gray-900 mb-1 ">
                        Birthday
                      </label>
                      <Input
                        type="date"
                        value={formData.birthday}
                        onChange={handleChange("birthday")}
                        placeholder="Select your birthday"
                      // className="w-full border h-[45px] rounded-[24px] border-gray-900 px-3 py-2 text-sm bg-white focus:outline-none focus:border-orange-400"
                      />
                    </div>
                  </section>

                  {/* Save Button */}
                  <div className="flex justify-end mt-10">
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
        </div>
      </div>
      <p className="h-[1430px]"></p>
    </>
  );
}

function Input({ label, value, onChange, placeholder = "", type = "text" }) {
  return (
    <div className="mb-4">
      {label && (
        <label className="block text-sm font-semibold text-gray-900 mb-1">
          {label}
        </label>
      )}
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full border h-[45px] rounded-[24px] border-gray-900 px-3 py-2 text-sm focus:outline-none focus:border-orange-400"
      />
    </div>
  );
}

function Textarea({ label, value, onChange, maxLength, placeholder = "" }) {
  return (
    <div className="pt-5">
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}

      <div className="relative">
        <textarea
          value={value}
          onChange={onChange}
          maxLength={maxLength}
          placeholder={placeholder}
          rows={4}
          className="w-full border border-gray-900 rounded-[24px] px-3 py-4 pr-12 pb-6 text-sm resize-none focus:outline-none focus:border-orange-400"
        />
        <p className="absolute bottom-4 right-3 text-xs text-gray-400">
          {value.length}/{maxLength}
        </p>
      </div>
    </div>
  );
}
