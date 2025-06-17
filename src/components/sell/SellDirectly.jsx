'use client';
import Image from 'next/image';
import Link from 'next/link';

const directSellCategories = [
  {
    name: "Men’s & Women’s Fashion",
    description: "clean out your closet",
    icon: "/sell/fashion.png",
    href: "#",
  },
  {
    name: "Accessories Women Luxury",
    description: "beauty",
    icon: "/sell/beauty.png",
    href: "#",
  },
  {
    name: "Decathlon bicycles",
    description: "instant quotest",
    icon: "/sell/bicycle.png",
    href: "#",
  },
  {
    name: "Book",
    description: "grow smart",
    icon: "/sell/book.png",
    href: "#",
  },
  {
    name: "Spot",
    description: "have lots of categories of sport",
    icon: "/sell/sport.png",
    href: "#",
  },
  {
    name: "Furniture",
    description: "Home service",
    icon: "/sell/furniture.png",
    href: "#",
  },
];

export default function SellDirectly() {
  return (
    <div className="bg-[#E4E4E4] p-6 rounded-3xl">
      {/* <div className="flex items-center mb-6">
        <h2 className="text-xl font-bold text-gray-800">Sell Directly</h2>
        <span className="ml-2 bg-orange-500 text-white text-xs font-semibold px-2.5 py-0.5 rounded-full">Beta</span>
      </div> */}

      <div className="grid grid-cols-2 gap-y-8">
        {directSellCategories.map((category, idx) => (
          <Link
            href={category.href}
            key={category.name}
            className="flex items-center space-x-4 hover:opacity-90 transition-opacity"
          >
            <div className="w-[88px] h-[88px] flex-shrink-0 rounded-lg overflow-hidden">
              <Image
                src={category.icon}
                alt={category.name}
                width={88}
                height={88}
                className="object-contain w-full h-full"
              />
            </div>
            <div className="text-start">
              <h3 className="font-semibold text-[17px] text-gray-900">{category.name}</h3>
              <p className="text-[13px] text-gray-600 mt-1">{category.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
