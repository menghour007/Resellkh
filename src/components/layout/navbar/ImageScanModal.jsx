'use client';

import { useRef, useState } from 'react';
import { FiX, FiImage } from 'react-icons/fi';
import { useRouter } from 'next/navigation';



export default function ImageScanModal({ open, onClose }) {
  const fileInputRef = useRef(null);
  const [preview, setPreview] = useState(null);
  const router = useRouter();

  const navigateWithImage = (file) => {
  const url = URL.createObjectURL(file);
  
  // Close the modal before navigating
  onClose?.();

  // Navigate to result page
  router.push(`/result-scan?imgSrc=${encodeURIComponent(url)}`);
};


  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      setPreview(URL.createObjectURL(file));
      navigateWithImage(file);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
      setPreview(URL.createObjectURL(file));
      navigateWithImage(file);
    }
  };

  const handleClickUpload = () => {
    fileInputRef.current.click();
  };

  const handleDragOver = (e) => e.preventDefault();

  if (!open) return null;

  return (
    <div className="absolute bg-[#f2edef] rounded-2xl p-6 w-full">
      
      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute top-[9px] right-4 text-gray-500 hover:text-black"
        aria-label="Close"
      >
        <FiX size={20} />
      </button>

      {/* Title */}
      <h2 className="text-center text-base font-semibold text-gray-800 mb-4">
        Search any image with Lens
      </h2>

      {/* Drop Zone */}
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onClick={handleClickUpload}
        className="border border-dashed bg-slate-50 border-gray-400 rounded-xl h-[400px] flex flex-col items-center justify-center text-gray-600 cursor-pointer"
      >
        {preview ? (
          <img src={preview} alt="Preview" className="h-full object-contain" />
        ) : (
          <>
            {/* <FiImage size={36} /> */}
            <img src="/images/story set/image.jpg" alt="" className='w-[40px]' />
            <p className="mt-2 text-sm text-center">
              Drag an image here or{' '}
              <span
                onClick={(e) => {
                  e.stopPropagation();
                  handleClickUpload();
                }}
                className="text-blue-600 underline cursor-pointer"
              >
                up load file
              </span>
            </p>
          </>
        )}
      </div>

      {/* Hidden File Input */}
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
      />
     
    </div>
  );
}
