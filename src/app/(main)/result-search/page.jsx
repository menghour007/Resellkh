"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { useState } from "react";
import Cart from "@/components/profile/someComponent/Cart";

export default function ResultSearchPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get("query");

  const result = [
      {
    id: 1,
    imageUrl: "/images/handbags/recycled-shoulder.jpg",
    title: "Recycled leather shoulder bag",
    description: "A smaller version of our Recycled Leather Shoulder Bag. Enhanced in matte leather with a smooth, pebble finish and soft nude hardware.",
    productPrice: 20,
  },
  {
    id: 2,
    imageUrl: "/images/handbags/keith-white.jpg",
    title: "Keith White Shoulder Bag",
    description: "Large capacity; can fit a lot. Like-new.",
    productPrice: 2.5,
    discountPercent: 50, // from $5
  },
  {
    id: 3,
    imageUrl: "/images/handbags/ribbon-silver.jpg",
    title: "Ribbon silver shoulder bag",
    description: "Large capacity; can fit a lot. (Some dents from lack of use; see listing)",
    productPrice: 6,
  },
  {
    id: 4,
    imageUrl: "/images/handbags/white-puffer.jpg",
    title: "White Puffer Cloud bag",
    description: "Brand New White Puffer Cloud Bag selling at $15. Rsp $29.80.",
    productPrice: 5,
  },
  {
    id: 5,
    imageUrl: "/images/handbags/charles-keith-quilted.jpg",
    title: "White chain quilted shoulder bag",
    description: "Pre-loved Charles and Keith Bag. Please refer to pics for condition.",
    productPrice: 2.1,
    discountPercent: 30, // from $3
  },
  {
    id: 6,
    imageUrl: "/images/handbags/y2k-black.jpg",
    title: "Y2K tote bag shoulder bag black",
    description: "Tracked mailing only. Not an exact imitation; priced up. Feel free to ask questions.",
    productPrice: 7,
  },
  {
    id: 7,
    imageUrl: "/images/handbags/black-adjustable.jpg",
    title: "Black shoulder bag – adjustable",
    description: "Selling my brand new Black Chain Bag. 1 compartment fits phone, wallet, keys, lipsticks, tissues.",
    productPrice: 8,
  },
  {
    id: 8,
    imageUrl: "/images/handbags/white-shoulder.jpg",
    title: "White shoulder carry bag",
    description: "UNIQLO: Mott Blue Palm Leaf Print. BUTTON DOWN Short Sleeve Casual Shirt XLv mrgt3xy",
    productPrice: 22,
  },
  {
    id: 9,
    imageUrl: "/images/handbags/beige-hand.jpg",
    title: "Shoulder bag hand white leather",
    description: "Like new. Good condition. No dustbag.",
    productPrice: 10,
  },
  {
    id: 10,
    imageUrl: "/images/handbags/mini-embossed.jpg",
    title: "Mini Embossed cow leather",
    description: "Item is 99% new, as although the metal protection was removed, it was never carried out or used. Size: 19 x 13 x 6 cm",
    productPrice: 169,
  },
  {
    id: 11,
    imageUrl: "/images/handbags/denim-tote.jpg",
    title: "Denim Tote Bag",
    description: "Available in green / black / beige. Size: 45cm * 12cm W * 32cm H",
    productPrice: 8,
  },
  {
    id: 12,
    imageUrl: "/images/handbags/mini-embossed-black.jpg",
    title: "Mini Embossed cow leather",
    description: "Item is 99% new, as although the metal protection are removed, it has never carried out or used. Size: 19 x 13 x 6 cm",
    productPrice: 169,
  },
  {
    id: 13,
    imageUrl: "/images/handbags/ruched-handle.jpg",
    title: "Ruched Handle Baguette Bag",
    description: "Received as gift in late 2023. 100% authentic. Kept in wardrobe for so long. Black tote, perfect for travelling or even as diaper bag.",
    productPrice: 4.2,
    discountPercent: 65, // from $12
  },
  {
    id: 14,
    imageUrl: "/images/handbags/black-leather-goldchain.jpg",
    title: "Black leather shoulder bag",
    description: "Black real leather shoulder bag with double strap. Can carry on shoulder or crossbody. Dimensions: 25 x 10 x 17 cm. Meet up...",
    productPrice: 10,
  },
  {
    id: 15,
    imageUrl: "/images/handbags/sun-rises-cloud.jpg",
    title: "When the sun rises cloud bag",
    description: "RTP: $42.90. Selling as the bag is a little small for me.",
    productPrice: 25,
  },
  {
    id: 16,
    imageUrl: "/images/handbags/rattan-sling.jpg",
    title: "Rattan Sling Bag",
    description: "Not used before, no defects.",
    productPrice: 6,
  },
  {
    id: 17,
    imageUrl: "/images/handbags/tofu-bun.jpg",
    title: "Tofu Bun bag",
    description: "YSL Tofu Bun. Size: 23 x 14cm",
    productPrice: 65,
  },
  {
    id: 18,
    imageUrl: "/images/handbags/charles-keith-black.jpg",
    title: "Charles and Keith bag",
    description: "Worn less than 5 times, good condition. It is made of premium quality embossed calfskin or cowhide.",
    productPrice: 25,
  },
  {
    id: 19,
    imageUrl: "/images/handbags/mini-sling-blue.jpg",
    title: "Brand New Mini Sling Bag",
    description: "Free with any purchase on my listing. Brand new and never used, but interior of the strap shell might peel off. Bought around $30.",
    productPrice: 3,
  },
  {
    id: 20,
    imageUrl: "/images/handbags/anekka-crossbody.jpg",
    title: "Anekka cross body bag",
    description: "Well used. Selling as the bag is a little small for me.",
    productPrice: 8,
  },
];


  const [visibleCount, setVisibleCount] = useState(10);

  const handleViewMore = () => {
    setVisibleCount((prev) => prev + 10);
  };

  const itemsToShow = result.slice(0, visibleCount);

  return (
    <>
      <div className="flex ps-[7%] mt-3 items-center">
        <p className=" text-gray-500 flex items-center">
          <Link href="/">Home</Link>
        </p>
        <svg className='mx-1' width="20" height="20" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fillRule="evenodd" clipRule="evenodd" d="M6.98558 5.06864C7.32339 4.7931 7.8211 4.8128 8.13643 5.12775L13.0048 9.99638C13.1679 10.1596 13.2563 10.3779 13.2563 10.6044C13.2563 10.8309 13.1681 11.0488 13.0048 11.2127L8.13633 16.0811C7.80004 16.417 7.2557 16.417 6.92029 16.0811C6.58388 15.7451 6.58388 15.2006 6.92019 14.8648L11.1802 10.6044L6.92029 6.34407C6.60492 6.02908 6.5852 5.53088 6.86112 5.19302L6.92025 5.12769L6.98558 5.06864Z" fill="#343A40" />
        </svg>

        <span className="pointer-events-none text-orange-500">
          Search results for "{query}"
        </span>
      </div>
      {/* <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">Search Results</h1>
        {query ? (
          <p className="text-lg text-gray-700">
            Showing results for: <strong>{query}</strong>
          </p>
        ) : (
          <p className="text-lg text-gray-500">No query provided.</p>
        )}
        You can add product fetch logic here based on `query`
      </div> */}
      <div className="px-[7%]">
        <div className="p-4 md:p-6">
          <div className="p-4 rounded-[24px] border border-gray-200">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
              <h2 className="text-sm md:text-lg lg:text-lg font-semibold text-gray-800">
                100+ search results for '{query}' in Cambodia
              </h2>
            </div>

            {/* Listing Grid or Empty State */}
            {result.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <img
                  src="/images/story set/no listing.jpg"
                  alt="No Listings"
                  className="w-[350px] h-auto mb-6"
                />
                <h2 className="font-semibold text-xl mb-2">
                  Nothing to see here yet
                </h2>
                <span className="text-sm text-gray-600">
                  Start favoriting items to compare, shop, and keep track of
                  things you love.
                </span>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-2 px-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 justify-items-center">
                {itemsToShow.map((item) => {
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
            {visibleCount < result.length && (
              <div className=" w-full text-center mt-6 mb-1">
                <button
                  onClick={handleViewMore}
                  className="px-6 py-2 bg-orange-500 text-white rounded-full hover:bg-orange-600 transition"
                >
                  View more
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
