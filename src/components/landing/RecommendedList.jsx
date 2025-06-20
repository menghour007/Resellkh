"use client";

import { useState } from "react";
import ProductCart from "../domain/ProductCart";

const recommendedItems = [
  {
    id: 1,
    imageUrl: "/images/recommended/bally.jpg",
    title: "Bally Original Leather NoteBook",
    description: "Original Box. Never used.",
    productPrice: 15,
  },
  {
    id: 2,
    imageUrl: "/images/recommended/charles.jpg",
    title: "Charles & Keith Leather Metallic",
    description:
      "No visual flaws, only the handle is asymmetric... Comes with a dust bag.",
    productPrice: 29,
  },
  {
    id: 3,
    imageUrl: "/images/recommended/watch.jpg",
    title: "Watch",
    description:
      "One Piece Men's High-Quality Silicone Strap Watch Richard Quartz Men’s Watch",
    productPrice: 450,
    discountPercent: 25, // from $600
  },
  {
    id: 4,
    imageUrl: "/images/recommended/bike.jpg",
    title: "French carbon engineer bicycle",
    description: "Highly negotiable. Used once only. Bicycle too small for me.",
    productPrice: 500,
  },
  {
    id: 5,
    imageUrl: "/images/recommended/bracelet.jpg",
    title: "H bracelet",
    description: "Genuine titanium steel H bracelet. Condition: 10/10",
    productPrice: 30,
    discountPercent: 40, // from $50
  },
  {
    id: 6,
    imageUrl: "/images/recommended/luminox.jpg",
    title: "Luminox Navy SEAL Whiteout",
    description:
      "Rarely seen now in the secondary market. SEAL Ref. 3507.WO “Whiteout”.",
    productPrice: 35,
  },
  {
    id: 7,
    imageUrl: "/images/recommended/floral.jpg",
    title: "Floral sandals",
    description: "Size 8.5. Lightly used (~5 times). Clearing due to no space.",
    productPrice: 9.5,
  },
  {
    id: 8,
    imageUrl: "/images/recommended/calvin.jpg",
    title: "Calvin Klein T-Shirts",
    description:
      "First two never worn before, last one has been worn < 5 times.",
    productPrice: 20,
  },
  {
    id: 9,
    imageUrl: "/images/recommended/cloudbag.jpg",
    title: "White Puffer Cloud bag",
    description:
      "Brand New White Puffer Cloud Bag selling at $15. Second pic tote bags $5 each!",
    productPrice: 5,
  },
  {
    id: 10,
    imageUrl: "/images/recommended/lululemon.jpg",
    title: "Lululemon Cropped Full Zip",
    description:
      "Brand new white knitted top – washed but never worn. Free size, fits up to UK6 well.",
    productPrice: 7.5,
    discountPercent: 50, // from $15
  },
  {
    id: 11,
    imageUrl: "/images/recommended/racket.jpg",
    title: "BADMINTON RACKET MUSCLE",
    description: "* NOTE: It’s for a kid (short), not for an adult.",
    productPrice: 16,
  },
  {
    id: 12,
    imageUrl: "/images/recommended/seventh.jpg",
    title: "Seventh Stores V2 Hoodie size M",
    description: "Worn once or twice. Bought in Japan. Open for negotiation.",
    productPrice: 3,
  },
  {
    id: 13,
    imageUrl: "/images/recommended/redwing.jpg",
    title: "RedWing Iron Ranger 8080",
    description: "Size 8.5D. Well taken care of. Slight negotiations welcome.",
    productPrice: 20,
  },
  {
    id: 14,
    imageUrl: "/images/recommended/miu_jeans.jpg",
    title: "MIU ICONIC DENIM JEANS",
    description: "SGD 507 - Credit Card. SGD 490 - PayNow. Retail SGD 1,670",
    productPrice: 8,
  },
  {
    id: 15,
    imageUrl: "/images/recommended/newbag.jpg",
    title: "Brand new bag",
    description: "No brand. Brand new, but put in the cabinet for awhile.",
    productPrice: 10,
  },
  {
    id: 16,
    imageUrl: "/images/recommended/nb327.jpg",
    title: "New Balance 327",
    description: "Size 38.5. Used once only.",
    productPrice: 32,
  },
  {
    id: 17,
    imageUrl: "/images/recommended/laptop.jpg",
    title: "Brand new Women’s Laptop",
    description: "Laptop backpack. Fits 13 inch laptop / iPad / tablet users.",
    productPrice: 6,
  },
  {
    id: 18,
    imageUrl: "/images/recommended/babydress.jpg",
    title: "Baby sky blue shift dress work",
    description: "Worn less than 5 times. XS. Light blue color. Excellent.",
    productPrice: 7.5,
    discountPercent: 50, // from $15
  },
  {
    id: 19,
    imageUrl: "/images/recommended/miu_sweats.jpg",
    title: "Miu Miu Logo Sweatpants",
    description: "Retail SGD 1,960. Excellent condition (see pictures).",
    productPrice: 5,
  },
  {
    id: 20,
    imageUrl: "/images/recommended/title.jpg",
    title: "Title product",
    description:
      "UNIQLOCK Montu Blue Palm Leaf Shirt XLv. Casual with pearl button.",
    productPrice: 22,
  },
  {
    id: 21,
    imageUrl: "/images/recommended/maverick.jpg",
    title: "Maverick series leather watch",
    description:
      "Preloved years ago. Have to replace battery your own. Not for fussy buyer.",
    productPrice: 20,
  },
  {
    id: 22,
    imageUrl: "/images/recommended/wellington.jpg",
    title: "Daniel Wellington Watch",
    description:
      "Daniel Wellington Sheffield Silver Dapper Watch - Black. Diameter 38mm / 7mm.",
    productPrice: 13,
  },
  {
    id: 23,
    imageUrl: "/images/recommended/scuba.jpg",
    title: "Lululemon Scuba Oversized",
    description:
      "Pre-owned - Good. Might have a few signs of wear, but all imperfections shown.",
    productPrice: 22,
  },
  {
    id: 24,
    imageUrl: "/images/recommended/b600.jpg",
    title: "B-600 Muscle Badminton Racket",
    description: "2 rackets. Free jump rope. With old grip. Sold as-is.",
    productPrice: 15,
  },
  {
    id: 25,
    imageUrl: "/images/recommended/vancleef.jpg",
    title: "Authentic Van Cleef & Arpels",
    description:
      "Mother-of-pearl 1 stone. Color/features vary due to nature of gem.",
    productPrice: 19,
  },
  {
    id: 26,
    imageUrl: "/images/recommended/seventhstore.jpg",
    title: "Size M Seventh Store",
    description: "Also willing to trade for a size L. Well used hoodie.",
    productPrice: 10,
  },
  {
    id: 27,
    imageUrl: "/images/recommended/flagknit.jpg",
    title: "America flag, USA Knitted",
    description: "* NOTE: It’s for a kid (short), not for an adult.",
    productPrice: 16,
  },
  {
    id: 28,
    imageUrl: "/images/recommended/whitebag.jpg",
    title: "Shoulder bag hand white leather",
    description: "Like new. Good condition. No dustbag.",
    productPrice: 10,
  },
  {
    id: 29,
    imageUrl: "/images/recommended/zara.jpg",
    title: "Authentic Zara Men Blouse Shirt",
    description:
      "Preloved years ago. Replace battery if needed. Not for fussy buyer.",
    productPrice: 20,
  },
  {
    id: 30,
    imageUrl: "/images/recommended/blackbag.jpg",
    title: "Black leather shoulder bag",
    description:
      "Black real leather. Carry on shoulder/crossbody. Size: 25x10x17cm",
    productPrice: 10,
  },
  {
    id: 31,
    imageUrl: "/images/recommended/roadbike.jpg",
    title: "Roadbike",
    description: "Preloved roadbike with phone holder. No trade.",
    productPrice: 125,
  },
  {
    id: 32,
    imageUrl: "/images/recommended/josen.jpg",
    title: "[new] beauty josen sunscreen",
    description:
      "beauty of joseon relief sun - used once only so it's still full but no box!! rfs: switched to new sunscreen.",
    productPrice: 9,
  },
  {
    id: 33,
    imageUrl: "/images/recommended/table.jpg",
    title: "Solid wood coffee table",
    description:
      "Black real leather shoulder bag with double strap. Can carry on shoulder or crossbody.",
    productPrice: 25,
  },
  {
    id: 34,
    imageUrl: "/images/recommended/love.jpg",
    title: "Love and Co necklace",
    description: "Got it as a gift but don’t wear it.",
    productPrice: 7,
  },
  {
    id: 35,
    imageUrl: "/images/recommended/anurak.jpg",
    title: "Anurak Mens shirt white",
    description:
      "Tailored light blue cotton stripes shirt with mother of pearl buttons. Cut away collar, split yoke.",
    productPrice: 11,
  },
  {
    id: 36,
    imageUrl: "/images/recommended/gucci_rubber.jpg",
    title: "Authentic Gucci GG Rubber",
    description: "Black real leather. Refer to Gucci’s official size guide.",
    productPrice: 10,
  },
  {
    id: 37,
    imageUrl: "/images/recommended/chanel_pink.jpg",
    title: "Chanel Pink Mini Handle Bag",
    description:
      "Like new Chanel mini clutch bag. Paid for 5k+ in retail. Comes with full set, bought in Singapore MBS.",
    productPrice: 50,
  },
  {
    id: 38,
    imageUrl: "/images/recommended/puma.jpg",
    title: "Puma HYROX Edition Shorts",
    description: "Authentic from JD Sports. Used very few times.",
    productPrice: 6,
  },
  {
    id: 39,
    imageUrl: "/images/recommended/backpack.jpg",
    title: "Black Backpack",
    description:
      "Feel free to ask for more pics. Bought a year ago but kept in storage. Prefer tote bags now.",
    productPrice: 8,
  },
  {
    id: 40,
    imageUrl: "/images/recommended/uniqlo_green.jpg",
    title: "UNIQLO ARMY GREEN BLOUSE",
    description: "Fits size 2XL. ptp 63cm, length down 64cm.",
    productPrice: 4,
  },
  {
    id: 41,
    imageUrl: "/images/recommended/anta.jpg",
    title: "Anta Shockwave Pro 5 US 9",
    description:
      "Preloved shockwave 5 pro basketball shoe. Still has decent traction. Can be used for outdoor court.",
    productPrice: 14,
  },
  {
    id: 42,
    imageUrl: "/images/recommended/bonito.jpg",
    title: "Love Bonito Lime Green",
    description:
      "Brand: Love Bonito. Size: Small. Selling $10 with tracked mail postage",
    productPrice: 3,
  },
  {
    id: 43,
    imageUrl: "/images/recommended/josie.jpg",
    title: "Starry Co ’Josie’ necklace",
    description: "Worn once to try, didn’t like the way it looked on me.",
    productPrice: 6,
  },
  {
    id: 44,
    imageUrl: "/images/recommended/blacktop.jpg",
    title: "[Female] Black & White Top",
    description: "Size stated in shirt is L but fits more like M.",
    productPrice: 5,
  },
  {
    id: 45,
    imageUrl: "/images/recommended/gucci_ballerina.jpg",
    title: "Gucci Black Ballerina",
    description:
      "Bought in MBS Singapore, only come with item only. Enforced base with anti-slip.",
    productPrice: 15,
  },
  {
    id: 46,
    imageUrl: "/images/recommended/flagknit.jpg",
    title: "america flag, USA Knitted",
    description: "* NOTE: It’s for a kid (short), not for an adult.",
    productPrice: 16,
  },
  {
    id: 47,
    imageUrl: "/images/recommended/whitebag.jpg",
    title: "Shoulder bag hand white leather",
    description: "Like new. Good condition. No dustbag.",
    productPrice: 10,
  },
  {
    id: 48,
    imageUrl: "/images/recommended/zara.jpg",
    title: "Authentic Zara Men Blouse Shirt",
    description:
      "Preloved years ago. Replace battery if needed. Not for fussy buyer.",
    productPrice: 20,
  },
  {
    id: 49,
    imageUrl: "/images/recommended/blackbag.jpg",
    title: "Black leather shoulder bag",
    description:
      "Black real leather. Carry on shoulder/crossbody. Size: 25x10x17cm",
    productPrice: 10,
  },
  {
    id: 50,
    imageUrl: "/images/recommended/roadbike.jpg",
    title: "Roadbike",
    description: "Preloved roadbike with phone holder. No trade.",
    productPrice: 125,
  },
  {
    id: 51,
    imageUrl: "/images/recommended/josen.jpg",
    title: "[new] beauty josen sunscreen",
    description:
      "beauty of joseon relief sun - used once only so it's still full but no box!! rfs: switched to new sunscreen.",
    productPrice: 9,
  },
  {
    id: 52,
    imageUrl: "/images/recommended/table.jpg",
    title: "Solid wood coffee table",
    description:
      "Black real leather shoulder bag with double strap. Can carry on shoulder or crossbody.",
    productPrice: 25,
  },
  {
    id: 53,
    imageUrl: "/images/recommended/love.jpg",
    title: "Love and Co necklace",
    description: "Got it as a gift but don’t wear it.",
    productPrice: 7,
  },
];

export default function RecommendedList() {
  const [visibleCount, setVisibleCount] = useState(25);

  const handleViewMore = () => {
    setVisibleCount((prev) => prev + 25);
  };

  const itemsToShow = recommendedItems.slice(0, visibleCount);

  return (
    <section className="w-full pt-[5px] md:pt-[40px] lg:pt-[40px] mb-[40px]">
      <div className="w-full">
        <h2 className="text-xl sm:text-xl font-bold text-gray-900 mb-4">
          Recommended For You
        </h2>

        <div className="grid grid-cols-2 px-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-[26] justify-items-center">
          {itemsToShow.map((item) => {
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

        {visibleCount < recommendedItems.length && (
          <div className="text-center mt-8">
            <button
              onClick={handleViewMore}
              className="px-6 py-2 mt-2 bg-orange-500 text-white rounded-full hover:bg-orange-600 transition"
            >
              View more
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
