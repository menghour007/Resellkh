'use client';

import { useState } from 'react';
// import ProductCard from './ProductCard';
import ProductCart from '../domain/ProductCart';

const allProducts = [
  {
    id: 1,
    imageUrl: '/Product-Detail-Image/more-1.png',
    title: 'Vintage White Hoodie',
    description: 'Comfortable vintage style hoodie...',
    productPrice: 7,

  },
  {
    id: 2,
    imageUrl: '/Product-Detail-Image/more-2.png',
    title: 'Coho Hoodie in brown',
    description: 'Coho Hoodie in brown...',
    productPrice: 45,
  },
  {
    id: 3,
    imageUrl: '/Product-Detail-Image/more-3.png',
    title: 'Brandy Melville Graphic Hoodie',
    description: 'Graphic Hoodie size one size...',
    productPrice: 22,

  },
  {
    id: 4,
    imageUrl: '/Product-Detail-Image/more-4.png',
    title: 'Brandy Hoodie',
    description: 'Brandy Melville Hoodie...',
    productPrice: 15,

  },
  {
    id: 5,
    imageUrl: '/Product-Detail-Image/more-5.png',
    title: 'OCT 100% cotton beige Hoodies',
    description: 'Beige cotton hoodie...',
    productPrice: 18,

  },
  {
    id: 6,
    imageUrl: '/Product-Detail-Image/more-6.png',
    title: 'Classic Black Hoodie',
    description: 'Simple black hoodie...',
    productPrice: 25,
    discountPercent: 10,
  },
  {
    id: 7,
    imageUrl: '/Product-Detail-Image/more-7.png',
    title: 'Urban Street Hoodie',
    description: 'Street-style hoodie...',
    productPrice: 35,

  },
  {
    id: 8,
    imageUrl: '/Product-Detail-Image/more-8.png',
    title: 'Tie-Dye Hoodie',
    description: 'Trendy tie-dye pattern...',
    productPrice: 40,
    discountPercent: 45,
  },
  {
    id: 9,
    imageUrl: '/Product-Detail-Image/more-9.png',
    title: 'Khaki Zip Hoodie',
    description: 'Full-zip khaki hoodie...',
    productPrice: 28,

  },
  {
    id: 10,
    imageUrl: '/Product-Detail-Image/more-10.png',
    title: 'Oversized Fleece Hoodie',
    description: 'Warm fleece hoodie...',
    productPrice: 32,

  },
  {
    id: 11,
    imageUrl: '/Product-Detail-Image/more-4.png',
    title: 'Oversized Fleece Hoodie',
    description: 'Warm fleece hoodie...',
    productPrice: 32,
    discountPercent: 40,
  },
  {
    id: 12,
    imageUrl: '/Product-Detail-Image/more-5.png',
    title: 'Tie-Dye Hoodie',
    description: 'Trendy tie-dye pattern...',
    productPrice: 40,
  },
];

const PRODUCTS_PER_LOAD = 10;

const OtherProducts = () => {
  const [visibleCount, setVisibleCount] = useState(PRODUCTS_PER_LOAD);

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + PRODUCTS_PER_LOAD);
  };

  const visibleProducts = allProducts.slice(0, visibleCount);

  return (
    <section className="mb-12 md:mt-12 lg:mt-12">
      <h2 className="text-xl font-bold text-gray-900 mb-6">Other products you may like</h2>
      <div className="grid grid-cols-2 px-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-[26] justify-items-center">
        {visibleProducts.map((item) => {
          const price =
            typeof item.productPrice === "number"
              ? item.discountPercent
                ? (item.productPrice * (100 - item.discountPercent)) / 100
                : item.productPrice
              : 0;

          return (
            <ProductCart
              key={item.id}
              id={item.id}
              imageUrl={item.imageUrl}
              title={item.title}
              description={item.description}
              price={price.toFixed(2)}
              originalPrice={item.discountPercent ? item.productPrice : null}
              discountText={
                item.discountPercent ? `${item.discountPercent}% OFF` : null
              }
            />
          );
        })}
      </div>

      {visibleCount < allProducts.length && (
        <div className="text-center mt-8">
          <button
            onClick={handleLoadMore}
            className="px-6 py-2 mt-2 bg-orange-500 text-white rounded-full hover:bg-orange-600 transition"
          >
            View more
          </button>
        </div>
      )}
    </section>
  );
};

export default OtherProducts;
