'use client';

import { useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import AuthNavbar from '@/components/layout/AuthNavbar';
import Cart from '@/components/profile/someComponent/Cart';

export default function ResultScanPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const imgSrc = searchParams.get('imgSrc');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const ScanResults = [
    {
      id: 1,
      title: "Lululemon Cropped Full Zip",
      description:
        "Brand new white knitted top – washed but never worn. Free size but fits up to L/XL well",
      productPrice: 7.5,
      originalPrice: 15,
      discountPercent: 50,
      imageUrl: "/images/scan/lulu1.jpg",
    },
    {
      id: 2,
      title: "Lululemon Cropped",
      description: "Like new",
      productPrice: 15,
      imageUrl: "/images/scan/lulu2.jpg",
    },
    {
      id: 3,
      title: "lululemon scuba hoodie",
      description: "* NOTE: it's for a kid (short), not for an adult.",
      productPrice: 15,
      imageUrl: "/images/scan/lulu3.jpg",
    },
    {
      id: 4,
      title: "Lululemon Sweatshirt Women’s",
      description: "Worn once or twice. Bought in Japan open for nego",
      productPrice: 10,
      imageUrl: "/images/scan/lulu4.jpg",
    },
    {
      id: 5,
      title: "lululemon scuba hoodie",
      description: "* NOTE: it's for a kid (short), not for an adult.",
      productPrice: 15,
      imageUrl: "/images/scan/lulu5.jpg",
    },
    {
      id: 6,
      title: "Lululemon Sweatshirt Women’s",
      description: "Worn once or twice. Bought in Japan open for nego",
      productPrice: 10,
      imageUrl: "/images/scan/lulu6.jpg",
    },
    {
      id: 7,
      title: "Lululemon Sweatshirt Women’s",
      description: "Worn once or twice. Bought in Japan open for nego",
      productPrice: 10,
      imageUrl: "/images/scan/lulu7.jpg",
    },
    {
      id: 8,
      title: "Lululemon Sweatshirt Women’s",
      description: "Worn once or twice. Bought in Japan open for nego",
      productPrice: 10,
      imageUrl: "/images/scan/lulu8.jpg",
    },
    {
      id: 9,
      title: "Lululemon Sweatshirt Women’s",
      description: "Worn once or twice. Bought in Japan open for nego",
      productPrice: 10,
      imageUrl: "/images/scan/lulu9.jpg",
    },
  ];

  return (
    <>

      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Scanned image preview */}
        {imgSrc && (
          <div className="bg-[#f2edef] rounded-2xl p-6 mb-8 shadow relative">
            {/* Close button */}
            <button
              onClick={() => router.back()}
              className="absolute top-3 right-3 text-gray-500 hover:text-black text-xl"
              aria-label="Close"
            >
              ✕
            </button>

            <h2 className="text-center text-base font-semibold text-gray-800 mb-4">
              Search any image with Lens
            </h2>
            <div className="flex justify-center">
              <img
                src={imgSrc}
                alt="Scanned Image"
                className="w-[300px] h-auto rounded-xl border object-contain"
              />
            </div>
          </div>
        )}

        {/* Grid section */}
        <h2 className="text-xl font-semibold mb-6">More to explore</h2>


        {/* Listing Grid or Empty State */}
        {ScanResults.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <img
              src="/images/story set/no listing.jpg"
              alt="No Listings"
              className="w-[350px] h-auto mb-6"
            />
            <h2 className="font-semibold text-xl mb-2">
              Nothing to see here yet
            </h2>

          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-2 px-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 justify-items-center">
            {ScanResults.map((item) => {
              let price;

              if (typeof item.productPrice === "number") {
                if (
                  typeof item.discountPercent === "number" &&
                  !isNaN(item.discountPercent)
                ) {
                  price =
                    (item.productPrice * (100 - item.discountPercent)) /
                    100;
                } else {
                  price = item.productPrice;
                }
              } else {
                price = 0;
              }

              return (
                <Cart
                  key={item.id}
                  id={item.id}
                  imageUrl={item.imageUrl}
                  title={item.title}
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
        )}

      </div>
    </>
  );
}
