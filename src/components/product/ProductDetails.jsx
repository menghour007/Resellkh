'use client';

import { useState } from 'react';

const ProductDetails = ({ product }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const maxDescriptionLength = 50;

  if (!product) return null;

  const {
    productName,
    productPrice,
    discountPercent,
    condition,
    categoryName,
    productStatus,
    location,
    description = '',
  } = product;

  const productPriceNumber = Number(productPrice);
  const hasDiscount = discountPercent > 0;
  const discountedPrice = hasDiscount
    ? (productPriceNumber * (100 - discountPercent)) / 100
    : productPriceNumber;

  const isTruncated = description.length > maxDescriptionLength;
  const displayedDescription =
    isExpanded || !isTruncated
      ? description
      : description.substring(0, maxDescriptionLength) + '...';

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">{productName}</h1>
        <div className="flex items-center space-x-4">
          <span className="text-3xl font-bold text-orange-500">
            ${discountedPrice.toFixed(2)}
          </span>
          {hasDiscount && (
            <>
              <span className="text-xl text-gray-500 line-through">
                ${productPriceNumber.toFixed(2)}
              </span>
              <span className="text-sm bg-red-100 text-red-600 px-2 py-1 rounded-full font-semibold">
                {discountPercent}% OFF
              </span>
            </>
          )}
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex items-center">
          <span className="font-medium text-gray-700 w-24">Condition:</span>
          <span className="text-gray-600">{condition}</span>
        </div>
        <div className="flex items-center">
          <span className="font-medium text-gray-700 w-24">Category:</span>
          <span className="text-gray-600">{categoryName}</span>
        </div>
        <div className="flex items-center">
          <span className="font-medium text-gray-700 w-24">Status:</span>
          <span className="text-gray-600">{productStatus}</span>
        </div>
        <div className="flex items-center">
          <span className="font-medium text-gray-700 w-24">Location:</span>
          <span className="text-gray-600">{location}</span>
        </div>
      </div>
      <div>
        <h3 className="font-bold text-gray-900 mb-3">Description</h3>
        <p className="text-gray-600 leading-relaxed">{displayedDescription}</p>
        {isTruncated && (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="mt-2 bg-orange-500 text-white px-6 py-2 rounded-full text-sm hover:bg-orange-600 transition-colors"
          >
            {isExpanded ? 'Read less' : 'Read more'}
          </button>
        )}
      </div>
    </div>
  );
};

export default ProductDetails;
