'use client';

import { useState, useEffect } from 'react';
import ProductCart from '../domain/ProductCart';

const PRODUCTS_PER_LOAD = 20;

const OtherProducts = () => {
  const [products, setProducts] = useState([]);
  const [visibleCount, setVisibleCount] = useState(PRODUCTS_PER_LOAD);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(
          'https://phil-whom-hide-lynn.trycloudflare.com/api/v1/products'
        );
        if (!res.ok) throw new Error('Failed to fetch products');

        const data = await res.json();
        setProducts(data.payload || []);
      } catch (error) {
        console.error('Fetch error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + PRODUCTS_PER_LOAD);
  };

  const visibleProducts = products.slice(0, visibleCount);

  return (
    <section className="mb-12 md:mt-12 lg:mt-12">
      <h2 className="text-xl font-bold text-gray-900 mb-6">
        Other products you may like
      </h2>

      {loading ? (
        <p className="text-gray-500">Loading products...</p>
      ) : (
        <>
          <div className="grid grid-cols-2 px-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-[26px] justify-items-center">
            {visibleProducts.map((item) => {
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
                <ProductCart
                  key={item.productId}
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
              );
            })}
          </div>

          {visibleCount < products.length && (
            <div className="text-center mt-8">
              <button
                onClick={handleLoadMore}
                className="px-6 py-2 mt-2 bg-orange-500 text-white rounded-full hover:bg-orange-600 transition"
              >
                View more
              </button>
            </div>
          )}
        </>
      )}
    </section>
  );
};

export default OtherProducts;
