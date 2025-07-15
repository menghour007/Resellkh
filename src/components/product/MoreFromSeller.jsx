'use client';

import React, { useEffect, useState, useRef } from 'react';
import ProductCart from '../domain/ProductCart';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

const MoreFromSeller = ({ sellerId }) => {
  const [products, setProducts] = useState([]);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (!sellerId) return;

    const fetchProducts = async () => {
      try {
        const response = await fetch(
          `https://phil-whom-hide-lynn.trycloudflare.com/api/v1/products/getproductbyuserid/${sellerId}`
        );

        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }

        const data = await response.json();
        setProducts(data.payload || []);
      } catch (error) {
        console.error('Error fetching seller products:', error);
      }
    };

    fetchProducts();
  }, [sellerId]);

  const scroll = (dir) => {
    scrollRef.current?.scrollBy({
      left: dir === 'left' ? -320 : 320,
      behavior: 'smooth',
    });
  };

  return (
    <section className="w-full">
      <div className="w-full">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-[15px] mb-2">
          <h2 className="text-xl font-bold text-gray-900 mb-3">
            More from this seller
          </h2>
          <div className="flex gap-2 self-start sm:self-auto">
            <button
              onClick={() => scroll('left')}
              className="p-2 bg-gray-100 rounded-full hover:bg-gray-200"
            >
              <FiChevronLeft className="w-5 h-5 text-gray-700" />
            </button>
            <button
              onClick={() => scroll('right')}
              className="p-2 bg-gray-100 rounded-full hover:bg-gray-200"
            >
              <FiChevronRight className="w-5 h-5 text-gray-700" />
            </button>
          </div>
        </div>

        {/* Scrollable Cards */}
        <div
          ref={scrollRef}
          className="flex gap-[26px] overflow-x-auto scroll-smooth no-scrollbar px-[2px] py-1"
        >
          {products.length === 0 ? (
            <p className="text-gray-500">No products found from this seller.</p>
          ) : (
            products.map((item) => {
              const price =
                typeof item.productPrice === 'number'
                  ? item.discountPercent
                    ? (item.productPrice * (100 - item.discountPercent)) / 100
                    : item.productPrice
                  : 0;

              const imageUrl =
                Array.isArray(item.fileUrls) && item.fileUrls.length > 0
                  ? item.fileUrls[0]
                  : '/placeholder.png';

              return (
                <div
                  key={item.productId}
                  className="flex-shrink-0 w-[211px] sm:w-[230px] md:w-[220px] lg:w-[240px] h-[340px]"
                >
                  <ProductCart
                    id={item.productId}
                    imageUrl={imageUrl}
                    title={item.productName}
                    description={item.description}
                    price={price.toFixed(2)}
                    originalPrice={
                      item.discountPercent ? item.productPrice : null
                    }
                    discountText={
                      item.discountPercent
                        ? `${item.discountPercent}% OFF`
                        : null
                    }
                  />
                </div>
              );
            })
          )}
        </div>
      </div>
    </section>
  );
};

export default MoreFromSeller;
