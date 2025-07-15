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
    <div className="flex flex-col sm:flex-row gap-4">
      {/* Thumbnails */}
      <div className="flex sm:flex-col gap-2 overflow-x-auto sm:overflow-x-visible no-scrollbar px-1 sm:px-0">
        {mediaItems.map((src, index) => (
          <button
            key={index}
            onClick={() => setSelectedImageIndex(index)}
            aria-current={selectedImageIndex === index ? 'true' : undefined}
            className={`relative w-[94px] h-[94px] rounded-lg overflow-hidden border transition-all flex-shrink-0
              ${
                selectedImageIndex === index
                  ? 'border-orange-500 ring-2 ring-orange-500'
                  : 'border-gray-200 hover:border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500'
              }
            `}
          >
            <Image
              src={src}
              alt={`Thumbnail ${index + 1}`}
              width={94}
              height={94}
              className="object-cover"
              priority={index === 0} // prioritize first image
            />
            {src.endsWith('.mp4') && (
              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 pointer-events-none">
                <svg
                  className="w-6 h-6 text-white"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            )}
          </button>
        ))}
      </div>

      {/* Main Display */}
      <div className="flex-grow w-full max-h-[400px] rounded-lg overflow-hidden border border-gray-200 relative">
        {isVideo ? (
          <video
            src={mediaItems[selectedImageIndex]}
            controls
            autoPlay
            loop
            muted
            className="w-full h-full object-cover"
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
              sizes="(max-width: 640px) 100vw, 50vw"
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
