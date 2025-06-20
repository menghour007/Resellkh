"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Cart from "@/components/profile/someComponent/Cart";

const mockData = [
  {
    id: 1,
    categoryId: 5,
    imageUrl: "/images/categoryImage/books/RainbowFish.jpg",
    title: "The Rainbow Fish",
    description: "Part of the Rainbow Fish Series\nBy Marcus Pfister",
    productPrice: 20.19,
  },
  {
    id: 2,
    categoryId: 5,
    imageUrl: "/images/categoryImage/books/TheKissingHand.jpg",
    title: "The Kissing Hand [With Stickers]",
    description: "Book #1 in the Chester the Raccoon Series\nBy Audrey Penn",
    productPrice: 18.0,
  },
  {
    id: 3,
    categoryId: 5,
    imageUrl: "/images/categoryImage/books/ChesterRaccoon.jpg",
    title: "Chester Raccoon and the Big Bad Bully",
    description: "Book #4 in the Chester the Raccoon Series\nBy Audrey Penn",
    productPrice: 17.80,
  },
  {
    id: 4,
    categoryId: 5,
    imageUrl: "/images/categoryImage/books/BigRedLollipop.jpg",
    title: "Big Red Lollipop",
    description: "By Rukhsana Khan",
    productPrice: 19.0,
  },
{
    id: 5,
    categoryId: 5,
    imageUrl: "/images/categoryImage/books/CityDogCountryFrog.jpg",
    title: "City Dog, Country Frog",
    description: "By Mo Willems",
    productPrice: 16.0,
  },
  {
    id: 6,
    categoryId: 5,
    imageUrl: "/images/categoryImage/books/ChickenBig.jpg",
    title: "Chicken Big",
    description: "By Keith Graves",
    productPrice: 19.0,
  },
  {
    id: 7,
    categoryId: 5,
    imageUrl: "/images/categoryImage/books/BridgetsBeret.jpg",
    title: "Bridget's Beret",
    description: "By Tom Lichtenheld",
    productPrice: 15.0,
  },
  {
    id: 8,
    categoryId: 5,
    imageUrl: "/images/categoryImage/books/CementMixersABC.jpg",
    title: "Cement Mixer's ABC: Goodnight, Goodnight, Construction Site",
    description: "By Sherri Duskey Rinker and Ethan Long",
    productPrice: 22.0,
  },
  {
    id: 9,
    categoryId: 9,
    imageUrl: "/images/categoryImage/bikes/DiamondbackOutlook.jpg",
    title: "Vinyl record display unUsed Diamondback OUTLOOK Mountain Bike",
    description: "Mens Navy Blue 38-42cm – 15-16” – SM",
    productPrice: 98.82,
  },
  {
    id: 10,
   categoryId: 9,
    imageUrl: "/images/categoryImage/bikes/MurrayMeteorFlite.jpg",
    title: "mid-century Murray Meteor Flite bicycle",
    description: "",
    productPrice: 98.89,
  },
  {
    id: 11,
   categoryId: 9,
    imageUrl: "/images/categoryImage/bikes/FahrradMTB.jpg",
    title: "Fahrrad MTB Mountainbike Fully Full Suspension",
    description: "26 Zoll Bikesport Parallax Shimano 18",
    productPrice: 122.0,
  },
  {
    id: 12,
   categoryId: 9,
    imageUrl: "/images/categoryImage/bikes/BicicletaBeach.jpg",
    title: "Bicicleta 26 Beach Caiçara Praiana Retro",
    description: "100% Alumínio Inox – Azul Claro",
    productPrice: 212.0,
  },
  {
    id: 13,
    categoryId: 3,
    imageUrl: "/images/categoryImage/sports/SoccerBall.jpg",
    title: "Bestsky Soccer Ball",
    description: "Official Size 5 Soccer Ball, Premium Soccer Gear",
    productPrice: 20.19,
  },
  {
    id: 14,
    categoryId: 3,
    imageUrl: "/images/categoryImage/sports/YellowVolleyball.jpg",
    title: "Blank Yellow Volleyball",
    description: "Ball isolated on white background",
    productPrice: 8.80,
  },
  {
    id: 15,
    categoryId: 3,
    imageUrl: "/images/categoryImage/sports/FranklinFootball.jpg",
    title: "Used Franklin Junior Football",
    description: "",
    productPrice: 10.0,
  },
  {
    id: 16,
    categoryId: 3,
    imageUrl: "/images/categoryImage/sports/WilsonBasketball.jpg",
    title: "Used Wilson EVOLUTION Basketball Adult",
    description: "Indoor 29 1/2”",
    productPrice: 20.0,
  },
  // snakers
  {
    id: 17,
    categoryId: 3,
    imageUrl: "/images/categoryImage/sneakers/HokaCarbonX2.jpg",
    title: "Hoka Carbon X 2 Road-Running Shoes",
    description: "",
    productPrice: 12.0,
  },
  {
    id: 18,
    categoryId: 3,
    imageUrl: "/images/categoryImage/sneakers/PumaFuture7.jpg",
    title: "Puma Future 7 Ultimate MG",
    description: "",
    productPrice: 17.65,
  },
  {
    id: 19,
    categoryId: 3,
    imageUrl: "/images/categoryImage/sneakers/JordanWomens.jpg",
    title: "Jordan Women's Sneakers",
    description: "",
    productPrice: 9.50,
  },
  {
    id: 20,
    categoryId: 3,
    imageUrl: "/images/categoryImage/sneakers/NikeWomens.jpg",
    title: "Nike Women's Sneakers",
    description: "",
    productPrice: 10.0,
  },
  // shoes
  {
    id: 21,
    categoryId: 3,
    imageUrl: "/images/categoryImage/shoes/PurpleCustomAF1.jpg",
    title: "Purple Custom Nike Air Force 1s",
    description: "Personalized Sneaker",
    productPrice: 120.0,
  },
  {
    id: 22,
    categoryId: 3,
    imageUrl: "/images/categoryImage/shoes/CustomJordan1.jpg",
    title: "Custom Air Jordan 1 Shoes",
    description: "NBA, CLIPPERS, handmade, low-top sneakers",
    productPrice: 125.0,
  },
  {
    id: 23,
    categoryId: 3,
    imageUrl: "/images/categoryImage/shoes/CyberpunkAF1.jpg",
    title: "Custom AF1 Cyberpunk Shoes",
    description: "Handmade custom Air Force 1 sneakers",
    productPrice: 29.0,
  },
  {
    id: 24,
    categoryId: 3,
    imageUrl: "/images/categoryImage/shoes/LeatherDressShoes.jpg",
    title: "Handmade Polished Leather Dress Shoe",
    description: "Men’s Premium Genuine Leather Shoes",
    productPrice: 25.0,
  },
  //shirts
  {
    id: 25,
    categoryId: 1,
    imageUrl: "/images/categoryImage/shirts/OliveLinenShirt.jpg",
    title: "Men's Olive Linen Shirt TWILIGHT",
    description: "",
    productPrice: 21.0,
  },
  {
    id: 26,
    categoryId: 1,
    imageUrl: "/images/categoryImage/shirts/OrganicMensShirt.jpg",
    title: "Organic Men's Shirt",
    description: "Grandpa Collar, Handwoven, Natural Dyes, Men's Organic Cotton Fashion",
    productPrice: 25.0,
  },
  {
    id: 27,
    categoryId: 1,
    imageUrl: "/images/categoryImage/shirts/FarewellTourShirt.jpg",
    title: "Retirement FAREWELL TOUR Shirt",
    description: "Custom retired funny t-shirt",
    productPrice: 29.0,
  },
  {
    id: 28,
    categoryId: 1,
    imageUrl: "/images/categoryImage/shirts/CustomLogoHoodie.jpg",
    title: "Fox Embroidered Fjallraven Kanken Hoodie",
    description: "Fjallraven Kanken Backpack Flowers",
    productPrice: 29.0,
  },
  // backpacks
  {
    id: 29,
    categoryId: 1,
    imageUrl: "/images/categoryImage/backpacks/WomenMiniBackpack.jpg",
    title: "Small Backpack for Women",
    description: "Perfect Mini Backpack, Vegan Leather",
    productPrice: 21.0,
  },
  {
    id: 30,
    categoryId: 1,
    imageUrl: "/images/categoryImage/backpacks/PinkFloralBackpack.jpg",
    title: "ELLUMININT RAINY Baby Pink Backpack",
    description: "Embroidered Floral High-Top",
    productPrice: 25.0,
  },
  {
    id: 31,
    categoryId: 1,
    imageUrl: "/images/categoryImage/backpacks/VintageCanvasRucksack.jpg",
    title: "Canvas BACKPACK / RUCKSACK",
    description: "100% cotton in a lovely vintage Caramel",
    productPrice: 29.0,
  },
  {
    id: 32,
    categoryId: 1,
    imageUrl: "/images/categoryImage/backpacks/FoxEmbroideredFjallraven.jpg",
    title: "Fox Embroidered Fjallraven Kanken",
    description: "Fjallraven Kanken Backpack Flowers",
    productPrice: 29.0,
  },
  // watches
  {
    id: 33,
    categoryId: 2,
    imageUrl: "/images/categoryImage/watch/BREDAEsther.jpg",
    title: "BREDA Esther Watch",
    description: "",
    productPrice: 20.19,
  },
  {
    id: 34,
    categoryId: 2,
    imageUrl: "/images/categoryImage/watch/CasioClassicUnisex.jpg",
    title: "Casio Classic Collection Unisex Watch",
    description: "Jacamo",
    productPrice: 20.0,
  },
  {
    id: 35,
    categoryId: 2,
    imageUrl: "/images/categoryImage/watch/SekondaSmartPeach.jpg",
    title: "Sekonda Flex Plus Smart Watch - Peach",
    description: "Simply Be",
    productPrice: 50.0,
  },
  {
    id: 36,
    categoryId: 2,
    imageUrl: "/images/categoryImage/watch/BREDATaylorLaShae.jpg",
    title: "BREDA x Taylor LaShae",
    description: "",
    productPrice: 59.0,
  },
  {
    id: 37,
    categoryId: 2,
    imageUrl: "/images/categoryImage/jewellery/PuffyHeartNecklace.jpg",
    title: "The Puffy Heart Necklace in Gold",
    description: "",
    productPrice: 700.0,
  },
  {
    id: 38,
    categoryId: 2,
    imageUrl: "/images/categoryImage/jewellery/80sCantileverChairNecklace.jpg",
    title: "80s Cantilever Chair Necklace",
    description: "Vintage Desk Chain | Office Chrome Stools | Mid-century Modern Mart Stam Style Armchair",
    productPrice: 317.65,
  },
  {
    id: 39,
    categoryId: 2,
    imageUrl: "/images/categoryImage/jewellery/JuliettaFashionNecklace.jpg",
    title: "Julietta Fashion Collections For Women",
    description: "Moda Operandi",
    productPrice: 240.50,
  },
  {
    id: 40,
    categoryId: 2,
    imageUrl: "/images/categoryImage/jewellery/PearlWoodBeadNecklace.jpg",
    title: "Handmade Solid Wood Bead Necklace",
    description: "Natural Wood Look, Home Office Computer Desk Theme",
    productPrice: 750.0,
  },


  //glasses
  {
    id: 41,
    categoryId: 2,
    imageUrl: "/images/categoryImage/glasses/DarkPurpleCheaters.jpg",
    title: "CHEATERS - Dark Purple",
    description: "",
    productPrice: 8.82,
  },
  {
    id: 42,
    categoryId: 2,
    imageUrl: "/images/categoryImage/glasses/BlueLightReading.jpg",
    title: "Narrow Lens Blue Light Blocking Reading Glasses",
    description: "Women Men",
    productPrice: 15.0,
  },
  {
    id: 43,
    categoryId: 2,
    imageUrl: "/images/categoryImage/glasses/GreenPrescription.jpg",
    title: "Stylish Prescription Eyeglasses",
    description: "",
    productPrice: 22.0,
  },
  {
    id: 44,
    categoryId: 2,
    imageUrl: "/images/categoryImage/glasses/GentleMonsterClear.jpg",
    title: "gentle monster dhayegre glasses",
    description: "",
    productPrice: 12.0,
  },





];




const categoryNames = {
  1: "Fashion",
  2: "Accessories",
  3: "Sports",
  4: "Beauty",
  5: "Book",
  6: "Home",
  7: "Sports & Kids",
  8: "Electronic",
  9: "Vehicle",
};

export default function CategoryPage() {
  const { categoryId } = useParams();
  const parsedCategoryId = parseInt(categoryId);

  const [products, setProducts] = useState([]);
  const [visibleCount, setVisibleCount] = useState(10);

  useEffect(() => {
    const filtered = mockData.filter(
      (item) => item.categoryId === parsedCategoryId
    );
    setProducts(filtered);
  }, [parsedCategoryId]);

  const itemsToShow = products.slice(0, visibleCount);
  const handleViewMore = () => setVisibleCount((prev) => prev + 10);
  const categoryName = categoryNames[parsedCategoryId] || "All Items";

  return (
    <>
      <div className="flex ps-[7%] mt-3 items-center">
        <p className=" text-gray-500 flex items-center">
          <Link href="/">Home</Link>
        </p>
        <svg
          className="mx-1"
          width="20"
          height="20"
          viewBox="0 0 20 21"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M6.98558 5.06864C7.32339 4.7931 7.8211 4.8128 8.13643 5.12775L13.0048 9.99638C13.1679 10.1596 13.2563 10.3779 13.2563 10.6044C13.2563 10.8309 13.1681 11.0488 13.0048 11.2127L8.13633 16.0811C7.80004 16.417 7.2557 16.417 6.92029 16.0811C6.58388 15.7451 6.58388 15.2006 6.92019 14.8648L11.1802 10.6044L6.92029 6.34407C6.60492 6.02908 6.5852 5.53088 6.86112 5.19302L6.92025 5.12769L6.98558 5.06864Z"
            fill="#343A40"
          />
        </svg>
        <span className="pointer-events-none text-orange-500">
          {categoryName}
        </span>
      </div>

      <div className="px-[7%]">
        <div className="p-4 md:p-6">
          <div className="p-4 rounded-[24px] border border-gray-200">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
              <h2 className="text-sm md:text-lg lg:text-lg font-semibold text-gray-800">
                {products.length}+ items found for '{categoryName}' in Cambodia
              </h2>
            </div>

            {products.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <img
                  src="/images/story set/no listings.jpg"
                  alt="No Listings"
                  className="w-[350px] h-auto mb-6"
                />
                <h2 className="font-semibold text-xl mb-2">
                  Nothing to see here yet
                </h2>
                <span className="text-sm text-gray-600">
                  Try another category.
                </span>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-2 px-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 justify-items-center">
                {itemsToShow.map((item) => {
                  const price =
                    item.discountPercent && !isNaN(item.discountPercent)
                      ? (item.productPrice * (100 - item.discountPercent)) / 100
                      : item.productPrice;

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

            {visibleCount < products.length && (
              <div className="w-full text-center mt-6 mb-1">
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
