'use client';

import ProductCard from './ProductCard'; // Assuming ProductCard is in the same directory
import ProductCart from '../domain/ProductCart';
import { useRef } from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

const MoreFromSeller = () => {
  const products = [
    {
      id: 1,
      imageUrl: '/Product-Detail-Image/card-1.png',
      title: 'Recycled leather shoulder bag',
      description: 'A classic handbag of the Recycled leather...',
      productPrice: 100,
      discountPercent: 20
    },
    {
      id: 2,
      imageUrl: '/Product-Detail-Image/card-2.png',
      title: 'Best Bow Hairstyles',
      description: 'Best hairstyles that will be perfect to suit...',
      productPrice: 1.45,
    },
    {
      id: 3,
      imageUrl: '/Product-Detail-Image/card-3.png',
      title: 'Swatch High-Quality',
      description: 'Swatch Classic Timepiece Elegance meets...',
      productPrice: 5,
    },
    {
      id: 4,
      imageUrl: '/Product-Detail-Image/card-4.png',
      title: 'White Puller Cloud bag',
      description: 'Brand new White Puller Cloud bag selling at...',
      productPrice: 5,
    },
    {
      id: 5,
      imageUrl: '/Product-Detail-Image/card-5.png',
      title: "JACK WILLS Men's",
      description: 'Sweatshirt/jumper',
      productPrice: 29.5,
    },
    {
      id: 6,
      imageUrl: '/Product-Detail-Image/card-2.png',
      title: 'Best Bow Hairstyles',
      description: 'Best hairstyles that will be perfect to suit...',
      productPrice: 1.45,
    },
  ];

  const scrollRef = useRef(null);
  
    const scroll = (dir) => {
      scrollRef.current?.scrollBy({
        left: dir === "left" ? -320 : 320,
        behavior: "smooth",
      });
    };
  
    return (
      <section className="w-full">
        <div className="w-full ">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-[15] mb-2 lg">
            <h2 className="text-xl sm:text-xl font-bold text-gray-900 mb-3">
              More from this seller
            </h2>
            <div className="flex gap-2 self-start sm:self-auto">
              <button
                onClick={() => scroll("left")}
                className="p-2 bg-gray-100 rounded-full hover:bg-gray-200"
              >
                <FiChevronLeft className="w-5 h-5 text-gray-700" />
              </button>
              <button
                onClick={() => scroll("right")}
                className="p-2 bg-gray-100 rounded-full hover:bg-gray-200"
              >
                <FiChevronRight className="w-5 h-5 text-gray-700" />
              </button>
            </div>
          </div>
  
          {/* Scrollable Cards */}
          <div
            ref={scrollRef}
            className="flex gap-[26] overflow-x-auto scroll-smooth no-scrollbar px-[2px] py-1"
          >
            {products.map((item) => {
              const price =
                typeof item.productPrice === "number"
                  ? item.discountPercent
                    ? (item.productPrice * (100 - item.discountPercent)) / 100
                    : item.productPrice
                  : 0;
  
              return (
                <div
                  key={item.id}
                  className="flex-shrink-0 w-[211px] sm:w-[230px] md:w-[220px] lg:w-[240px] h-[340px]"
                >
                  <ProductCart
                    id={item.id}
                    imageUrl={item.imageUrl}
                    title={item.title}
                    description={item.description}
                    price={price.toFixed(2)}
                    originalPrice={
                      item.discountPercent ? item.productPrice : null
                    }
                    discountText={
                      item.discountPercent ? `${item.discountPercent}% OFF` : null
                    }
                  />
                </div>
              );
            })}
          </div>
        </div>
      </section>
    );
};

export default MoreFromSeller;
