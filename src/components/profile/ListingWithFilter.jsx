"use client";

import { useState } from "react";
import { FiSearch, FiFilter } from "react-icons/fi";
import Cart from "@/components/profile/someComponent/Cart";

const products = [
  {
    id: 1,
    imageUrl: "/images/product/cropped_hoodie.jpg",
    title: "Asics x Jound GT-2160 ",
    description: "Lightly used, size 42. rtry rtytryy ttryryhr try ryrtjhjd hsrty rtytrshshgu erhugreut ertyrguy ryyu ygyuug yur yur gyugfguyg",
    productPrice: 249,
  },
  {
    id: 2,
    imageUrl: "/images/product/av1.jpg",
    title: "ASICS Gel Nimbus 26",
    description: "No box, worn 3 times.",
    productPrice: 180,
    discountPercent: 15,
  },
  {
    id: 3,
    imageUrl: "/images/product/ck.jpg",
    title: "Men Gel-Cumulus",
    description: "In great condition.",
    productPrice: 75,
  },
  {
    id: 4,
    imageUrl: "/images/product/ck zoom.jpg",
    title: "cotton beige hoodies",
    description:
      "oversize hoodie. fast deal, clearing wardrobe selling as I don’t reach for it often",
    productPrice: 20,
    discountPercent: 10,
  },
  {
    id: 5,
    imageUrl: "/images/product/sbek jerng keng.jpg",
    title: "COTTON Beige hoodies",
    description:
      "oversize hoodie. fast deal, clearing wardrobe selling as I don’t reach for it often",
    productPrice: 20,
    discountPercent: 10,
  },
  {
    id: 6,
    imageUrl: "/images/product/lb_puff.jpg",
    title: "Cotton Beige hoodies",
    description:
      "oversize hoodie. fast deal, clearing wardrobe selling as I don’t reach for it often",
    productPrice: 20,
    discountPercent: 10,
  },
];

export default function ListingsWithFilter() {
  const [searchTerm, setSearchTerm] = useState("");
  const [showFilter, setShowFilter] = useState(false);
  const [sortBy, setSortBy] = useState("");
  const [condition, setCondition] = useState("");
  const [status, setStatus] = useState("");

  const toggleFilter = () => setShowFilter(!showFilter);
  const resetFilters = () => {
    setSortBy("");
    setCondition("");
    setStatus("");
  };

  let filteredProducts = products.filter((p) => {
    const matchesSearch =
      p.title.toLowerCase().includes(searchTerm.toLowerCase()) 
      // || p.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCondition = !condition || p.condition === condition;
    const matchesStatus = !status || p.status === status;
    return matchesSearch && matchesCondition && matchesStatus;
  });

  if (sortBy === "price-high") {
    filteredProducts.sort((a, b) => b.productPrice - a.productPrice);
  } else if (sortBy === "price-low") {
    filteredProducts.sort((a, b) => a.productPrice - b.productPrice);
  }

  return (
    <>
    <div className="p-4 md:p-6">
      <div className=" p-4 rounded-[24px] border border-gray-200">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
          <h2 className="text-lg font-semibold text-gray-800">Listings</h2>

          <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
            {/* Search Bar */}
            <div className="relative w-full sm:max-w-xs">
              <svg
                className="absolute top-[9px] left-3 w-5 h-5 text-gray-400"
                viewBox="0 0 24 25"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M18.0232 17.3983L22.3062 21.6803L20.8912 23.0952L16.6092 18.8123C15.0159 20.0895 13.0342 20.7842 10.9922 20.7812C6.02419 20.7812 1.99219 16.7493 1.99219 11.7812C1.99219 6.81325 6.02419 2.78125 10.9922 2.78125C15.9602 2.78125 19.9922 6.81325 19.9922 11.7812C19.9951 13.8233 19.3004 15.805 18.0232 17.3983ZM16.0172 16.6562C17.2863 15.3511 17.9951 13.6017 17.9922 11.7812C17.9922 7.91325 14.8592 4.78125 10.9922 4.78125C7.12419 4.78125 3.99219 7.91325 3.99219 11.7812C3.99219 15.6483 7.12419 18.7812 10.9922 18.7812C12.8126 18.7841 14.5621 18.0754 15.8672 16.8062L16.0172 16.6562Z"
                  fill="currentColor"
                />
              </svg>
              <input
                type="text"
                placeholder="Search Listings..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-sm border border-gray-300 rounded-full focus:outline-none focus:ring-1 focus:ring-orange-500"
              />
            </div>

            {/* Filter Button */}
            <button
              onClick={toggleFilter}
              className="flex items-center  justify-center gap-1 px-3 py-2 border border-gray-300 rounded-full text-sm text-gray-800 hover:bg-gray-100"
            >
              Filters
              <svg
                className="ml-1 mt-[2px] text-gray-700"
                width="13"
                height="13"
                viewBox="0 0 16 15"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M14.6914 11.25H4.84766V10.7812C4.84766 10.5234 4.63672 10.3125 4.37891 10.3125H3.44141C3.18359 10.3125 2.97266 10.5234 2.97266 10.7812V11.25H0.628906C0.371094 11.25 0.160156 11.4609 0.160156 11.7188V12.6562C0.160156 12.9141 0.371094 13.125 0.628906 13.125H2.97266V13.5938C2.97266 13.8516 3.18359 14.0625 3.44141 14.0625H4.37891C4.63672 14.0625 4.84766 13.8516 4.84766 13.5938V13.125H14.6914C14.9492 13.125 15.1602 12.9141 15.1602 12.6562V11.7188C15.1602 11.4609 14.9492 11.25 14.6914 11.25ZM14.6914 6.5625H12.3477V6.09375C12.3477 5.83594 12.1367 5.625 11.8789 5.625H10.9414C10.6836 5.625 10.4727 5.83594 10.4727 6.09375V6.5625H0.628906C0.371094 6.5625 0.160156 6.77344 0.160156 7.03125V7.96875C0.160156 8.22656 0.371094 8.4375 0.628906 8.4375H10.4727V8.90625C10.4727 9.16406 10.6836 9.375 10.9414 9.375H11.8789C12.1367 9.375 12.3477 9.16406 12.3477 8.90625V8.4375H14.6914C14.9492 8.4375 15.1602 8.22656 15.1602 7.96875V7.03125C15.1602 6.77344 14.9492 6.5625 14.6914 6.5625ZM14.6914 1.875H8.59766V1.40625C8.59766 1.14844 8.38672 0.9375 8.12891 0.9375H7.19141C6.93359 0.9375 6.72266 1.14844 6.72266 1.40625V1.875H0.628906C0.371094 1.875 0.160156 2.08594 0.160156 2.34375V3.28125C0.160156 3.53906 0.371094 3.75 0.628906 3.75H6.72266V4.21875C6.72266 4.47656 6.93359 4.6875 7.19141 4.6875H8.12891C8.38672 4.6875 8.59766 4.47656 8.59766 4.21875V3.75H14.6914C14.9492 3.75 15.1602 3.53906 15.1602 3.28125V2.34375C15.1602 2.08594 14.9492 1.875 14.6914 1.875Z"
                  fill="currentColor"
                />
              </svg>


            </button>
          </div>
        </div>

        {/* Filter Panel */}
        {showFilter && (
          <div className="relative z-50 w-full lg:right-[147px] md:absolute md:right-[110px] md:w-[310px] bg-white border rounded-2xl shadow p-4 mb-4 md:mb-0">
            <div className="text-sm font-medium text-gray-700 mb-2">Sort</div>
            <div className="space-y-1 mb-3">
              <label className="block"><input type="radio" name="sort" value="" checked={sortBy === ""} onChange={() => setSortBy("")} /> Recent</label>
              <label className="block"><input type="radio" name="sort" value="price-high" checked={sortBy === "price-high"} onChange={() => setSortBy("price-high")} /> Price - High to Low</label>
              <label className="block"><input type="radio" name="sort" value="price-low" checked={sortBy === "price-low"} onChange={() => setSortBy("price-low")} /> Price - Low to High</label>
            </div>

            <div className="text-sm font-medium text-gray-700 mb-2">Item Condition</div>
            <div className="space-y-1 mb-3">
              {['new', 'like', 'lightly', 'used', 'heavily'].map((c) => (
                <label key={c} className="block">
                  <input type="radio" name="condition" value={c} checked={condition === c} onChange={() => setCondition(c)} /> {c.charAt(0).toUpperCase() + c.slice(1)} used
                </label>
              ))}
            </div>

            <div className="text-sm font-medium text-gray-700 mb-2">Listings status</div>
            <div className="space-y-1 mb-3">
              {['public', 'private', 'draft', 'sold'].map((s) => (
                <label key={s} className="block">
                  <input type="radio" name="status" value={s} checked={status === s} onChange={() => setStatus(s)} /> {s}
                </label>
              ))}
            </div>

            <div className="flex justify-between mt-4">
              <button
                className="text-sm text-gray-500 hover:underline"
                onClick={resetFilters}
              >
                Reset
              </button>
              <button
                className="bg-orange-500 text-white text-sm px-4 py-[6px] rounded-full hover:bg-orange-600"
                onClick={() => setShowFilter(false)}
              >
                Apply
              </button>
            </div>
          </div>
        )}

        {/* Listing Grid or Empty State */}
        {filteredProducts.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <img
              src="/images/story set/no listings.jpg"
              alt="No Listings"
              className="w-[350px] h-auto mb-6"
            />
            <p className="text-sm text-gray-600">
              <span className="font-semibold">@leackhena12_Q</span> doesn’t have any listings yet
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-2 px-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 justify-items-center">
            {filteredProducts.map((item) => {
              const price =
                typeof item.productPrice === "number"
                  ? item.discountPercent
                    ? (item.productPrice * (100 - item.discountPercent)) / 100
                    : item.productPrice
                  : 0;

              return (
                <Cart
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
        )}
      </div>
      
    </div>
    </>
  );
}
