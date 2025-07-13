'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const ProductGallery = ({ product }) => {
  const mediaItems = product?.fileUrls?.length ? product.fileUrls : [];
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const isVideo = mediaItems[selectedImageIndex]?.endsWith('.mp4');

  if (mediaItems.length === 0) {
    return (
      <div className="text-center text-gray-500 p-8 border rounded-lg">
        No product images or media available.
      </div>
    );
  }

  return (
    <div className="flex gap-4">
      {/* Thumbnails */}
      <div className="flex flex-col gap-2">
        {mediaItems.map((src, index) => (
          <button
            key={index}
            onClick={() => setSelectedImageIndex(index)}
            className={`w-[94px] h-[94px] rounded-lg overflow-hidden border transition-all ${
              selectedImageIndex === index
                ? 'border-orange-500 ring-2 ring-orange-500'
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
<<<<<<< HEAD
            <Image
              src={src}
              alt={`Thumbnail ${index + 1}`}
              width={94}
              height={94}
              className="object-cover"
            />
            {src.endsWith('.mp4') && (
=======
            {itemSrc.endsWith('.mp4') ? (
              <video
                src={itemSrc}
                className="object-cover w-full h-full"
                muted
                playsInline
              />
            ) : (
              <Image
                src={itemSrc}
                alt={`Product thumbnail ${index + 1}`}
                width={70}
                height={70}
                className="object-cover w-full h-full"
              />
            )}
  
            {itemSrc.endsWith('.mp4') && (
>>>>>>> 2ae46c46d22d602588e08349358b04a77243d1f2
              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            )}
          </button>
        ))}
      </div>

      {/* Main Display */}
      <div className="flex-grow w-full h-[400px] rounded-lg overflow-hidden border border-gray-200 relative">
        {isVideo ? (
          <video
            src={mediaItems[selectedImageIndex]}
            controls
            autoPlay
            loop
            muted
            className="w-full h-full object-contain"
          />
        ) : (
          <Link
            href={`/product/${product.productId}/media/${selectedImageIndex}`}
            className="block w-full h-full relative"
          >
            <Image
              src={mediaItems[selectedImageIndex]}
              alt="Main product image"
              fill
              sizes="100vw"
              className="object-cover"
              priority
            />
          </Link>
        )}
      </div>
    </div>
  );
};

export default ProductGallery;
