'use client';

import { useState } from 'react';
import { ImagePlus } from 'lucide-react';

export default function PhotoUploader({ files, setFiles }) {
  const [isDragging, setIsDragging] = useState(false);

  const handleFileChange = (e) => {
    const selected = Array.from(e.target.files);
    addFiles(selected);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files) {
      const droppedFiles = Array.from(e.dataTransfer.files);
      addFiles(droppedFiles);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const addFiles = (newFiles) => {
    const combined = [...files, ...newFiles];
    const unique = Array.from(new Set(combined.map(f => f.name)))
      .map(name => combined.find(f => f.name === name));

    const limited = unique.slice(0, 5); // Max 5 files
    setFiles(limited);
  };

  const handleRemove = (index) => {
    const updated = [...files];
    updated.splice(index, 1);
    setFiles(updated);
  };

  return (
    <>
      {/* Upload Drop Zone */}
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        className={`bg-orange-50 border-2 border-dashed rounded-2xl flex flex-col items-center justify-center h-80 p-6 text-center group transition
          ${isDragging ? 'border-orange-500 bg-orange-100' : 'border-gray-300 hover:border-orange-400 hover:bg-orange-100'}`}
      >
        <label className="cursor-pointer w-full h-full flex flex-col items-center justify-center">
          <input
            type="file"
            multiple
            accept="image/*,video/*"
            onChange={handleFileChange}
            className="hidden"
          />
          <div className="mb-4">
            {/* <ImagePlus className="w-12 h-12 text-gray-400 group-hover:text-orange-500" /> */}
            <img src="/images/story set/image.jpg" alt="" className='w-[40px]' />
          </div>
          <div className="mb-4">
            <span className="px-6 py-2 mt-2 bg-orange-500 text-white rounded-full hover:bg-orange-600 transition">
              Select photos
            </span>
          </div>
          <p className="text-gray-700 text-[15px]">
            or drag photo here<br />(up to 5 photos/videos)
          </p>
        </label>
      </div>

      <p className="text-[13px] text-gray-400 mt-2">Tip: Re-arrange photos to change cover.</p>

      {/* Image Previews */}
      {files.length > 0 && (
        <>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-4">
            {files.map((file, index) => (
              <div
                key={index}
                className="rounded-2xl overflow-hidden border bg-white shadow-sm relative"
              >
                <div className="flex items-center justify-between px-3 py-2 border-b">
                  <span className="text-sm font-medium text-black">
                    {index === 0 ? 'Cover' : ''}
                  </span>
                  <button
                    onClick={() => handleRemove(index)}
                    className="text-gray-500 hover:text-red-500 transition"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 text-gray-500"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="3 6 5 6 21 6" />
                      <path d="M19 6L18.4 19.1a2 2 0 0 1-2 1.9H7.6a2 2 0 0 1-2-1.9L5 6m1 0L6 4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2l0 2" />
                    </svg>
                  </button>
                </div>

                <img
                  src={URL.createObjectURL(file)}
                  alt={`preview-${index}`}
                  className="w-full h-48 object-cover"
                />
              </div>
            ))}
          </div>

          <p className="text-sm text-gray-500 text-right mt-1">{files.length}/5</p>
        </>
      )}
    </>
  );
}
