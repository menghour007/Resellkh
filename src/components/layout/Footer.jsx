"use client";

import Image from "next/image";
import { FaFacebook, FaTiktok, FaTelegramPlane } from "react-icons/fa";
import Link from "next/link";

export default function Footer() {
  // Category IDs mapping - should match your backend
  const categoryMap = {
    fashion: 5,
    accessory: 1,
    sport: 3,
    beauty: 2,
    electronic: 8,
    furniture: 6, // Assuming furniture is under Home category
    kitchen: 6,   // Assuming kitchen is under Home category
    book: 4
  };

  return (
    <footer className="bg-[#f1edef] text-gray-800 py-10 px-6 sm:px-10 lg:px-20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        {/* Logo + Description */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Link href="/">
              <img 
                src="/images/auth/logo.jpg" 
                alt="ResellKH Logo" 
                width={100} 
                height={50} 
                className="cursor-pointer"
              />
            </Link>
          </div>
          <p className="text-sm text-gray-600 leading-relaxed">
            We provide high-quality services and products to meet your needs.
            Thank you for supporting us!
          </p>
          {/* Social Icons */}
          <div className="flex gap-4 mt-4 text-xl text-gray-700">
            <a href="#" aria-label="Facebook" className="hover:text-orange-500 transition-colors">
              <FaFacebook />
            </a>
            <a href="#" aria-label="TikTok" className="hover:text-orange-500 transition-colors">
              <FaTiktok />
            </a>
            <a href="#" aria-label="Telegram" className="hover:text-orange-500 transition-colors">
              <FaTelegramPlane />
            </a>
          </div>
        </div>

        {/* Category 1 */}
        <div>
          <h2 className="text-lg font-semibold text-orange-500 mb-3">Categories</h2>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href={`/category/${categoryMap.fashion}`} className="hover:underline hover:text-orange-500">
                Fashion
              </Link>
            </li>
            <li>
              <Link href={`/category/${categoryMap.accessory}`} className="hover:underline hover:text-orange-500">
                Accessory
              </Link>
            </li>
            <li>
              <Link href={`/category/${categoryMap.sport}`} className="hover:underline hover:text-orange-500">
                Sport
              </Link>
            </li>
            <li>
              <Link href={`/category/${categoryMap.beauty}`} className="hover:underline hover:text-orange-500">
                Beauty
              </Link>
            </li>
          </ul>
        </div>

        {/* Category 2 */}
        <div>
          <h2 className="text-lg font-semibold text-orange-500 mb-3">Categories</h2>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href={`/category/${categoryMap.electronic}`} className="hover:underline hover:text-orange-500">
                Electronic
              </Link>
            </li>
            <li>
              <Link href={`/category/${categoryMap.furniture}`} className="hover:underline hover:text-orange-500">
                Furniture
              </Link>
            </li>
            <li>
              <Link href={`/category/${categoryMap.kitchen}`} className="hover:underline hover:text-orange-500">
                Kitchen
              </Link>
            </li>
            <li>
              <Link href={`/category/${categoryMap.book}`} className="hover:underline hover:text-orange-500">
                Book
              </Link>
            </li>
          </ul>
        </div>

        {/* Legal */}
        <div>
          <h2 className="text-lg font-semibold text-orange-500 mb-3">Legal</h2>
          <ul className="space-y-2 text-sm">
            <li><Link href="/privacy-policy" className="hover:underline hover:text-orange-500">Privacy Policy</Link></li>
            <li><Link href="/faq" className="hover:underline hover:text-orange-500">FAQ</Link></li>
            <li><Link href="/terms" className="hover:underline hover:text-orange-500">Terms & Conditions</Link></li>
          </ul>
        </div>
      </div>
    </footer>
  );
}