'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const ProductGallery = ({ product }) => {
  const defaultMediaItems = [
    '/Product-Detail-Image/image1.png',
    '/Product-Detail-Image/image2.png',
    '/Product-Detail-Image/image3.png',
    '/Product-Detail-Image/video.mp4',
  ];

  const mediaItems = product?.images?.length > 0 ? product.images : defaultMediaItems;
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const isSelectedMediaVideo = mediaItems[selectedImageIndex]?.endsWith('.mp4');

  if (!product || !mediaItems || mediaItems.length === 0) {
    return (
      <div className="text-center text-gray-500 p-8 border rounded-lg">
        No product images or media available.
      </div>
    );
  }

  return (
    <div className="flex gap-4">
      {/* Thumbnails Column */}
      <div className="flex flex-col gap-2">
        {mediaItems.map((itemSrc, index) => (
          <button
            key={index}
            onClick={() => setSelectedImageIndex(index)}
            className={`
              w-[94px] h-[94px] rounded-lg overflow-hidden relative flex-shrink-0
              border transition-all duration-200
              ${selectedImageIndex === index ? 'border-orange-500 ring-2 ring-orange-500' : 'border-gray-200 hover:border-gray-300'}
            `}
          >
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
              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            )}
          </button>
        ))}
      </div>

      {/* Main Media Display Area */}
      <div className="flex-grow w-full h-[400px] md:h-[300px] lg:h-[400px] rounded-lg overflow-hidden relative border border-gray-200">
        {isSelectedMediaVideo ? (
          <video
            src={mediaItems[selectedImageIndex]}
            controls
            loop
            muted
            autoPlay
            className="w-full h-full object-contain"
          />
        ) : (
          <Link href={`/product/${product.id}/media/${selectedImageIndex}`} className="block w-full h-full relative">
            <Image
              src={mediaItems[selectedImageIndex]}
              alt="Main product image"
              fill
              sizes="100%"
              className="object-cover"
              priority={true}
            />
          </Link>
        )}
      </div>
    </div>
  );
};

export default ProductGallery;
