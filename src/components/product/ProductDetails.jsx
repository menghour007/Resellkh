'use client'; // This component will use useState for toggling content

import { useState } from 'react';

const ProductDetails = ({ product }) => { // Assuming product data is passed as a prop
  const [isExpanded, setIsExpanded] = useState(false);
  const maxDescriptionLength = 150; // Max characters before "Read more" appears

  // Use dummy data if product prop is not provided for isolated testing
  const dummyProduct = {
    name: 'Lululemon Cropped Full Zip Hoodie - XS/S - light grey',
    price: '$7.5',
    originalPrice: '$15',
    condition: 'Like new',
    category: 'Fashion',
    description: "it’s probably is the prettiest thing i own in my closet now. super happy with my item! ◡̈ I wore it just once for a chill outing, and it looked amazing. Super soft and lightweight - perfect for layering or wearing on its own. Honestly, I love it, but it's a way too many similar tops, so I'm thinking about selling this item because I have a way too many similar tops, so I'm trying to declutter my closet. Great condition  basically like new! Bought from taobao, but size too big. M sizez please refer to 2nd ohoto for sizing guide.",
  };

  const currentProduct = product || dummyProduct;

  const description = currentProduct.description;
  const isTruncated = description.length > maxDescriptionLength;
  const displayedDescription = isExpanded || !isTruncated
    ? description
    : `${description.substring(0, maxDescriptionLength)}...`;

  return (
    <div className="space-y-6">
      {/* Product Title and Price (as per previous examples) */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          {currentProduct.name}
        </h1>
        <div className="flex items-center space-x-4">
          <span className="text-3xl font-bold text-orange-500">{currentProduct.price}</span>
          <span className="text-lg text-gray-500 line-through">{currentProduct.originalPrice}</span>
        </div>
      </div>

      {/* Condition and Category (as per previous examples) */}
      <div className="space-y-3">
        <div className="flex items-center">
          <span className="font-medium text-gray-700 w-24">Condition:</span>
          <span className="text-gray-600">{currentProduct.condition}</span>
        </div>
        <div className="flex items-center">
          <span className="font-medium text-gray-700 w-24">Category:</span>
          <span className="text-gray-600">{currentProduct.category}</span>
        </div>
      </div>

      {/* Description with "Read more" functionality */}

      <div className="relative h-[120px]">
  <div className="absolute top-0 left-0 right-0 bg-white z-10">
    <h3 className="font-bold text-gray-900 mb-3">Description</h3>
    <p className={`text-gray-600 leading-relaxed transition-all duration-300 ${isExpanded ? '' : 'line-clamp-4'}`}>
      {description}
    </p>
    {isTruncated && (
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="mt-2 bg-orange-500 text-white px-6 py-2 rounded-[50px] text-sm hover:bg-orange-600 transition-colors"
      >
        {isExpanded ? 'Read less' : 'Read more'}
      </button>
    )}
  </div>
</div>




      {/* Buy Now button */}
      {/* <button className="w-full bg-orange-500 text-white py-3 rounded-lg font-medium hover:bg-orange-600 transition-colors">
        Buy now
      </button> */}
    </div>
  );
};

export default ProductDetails;