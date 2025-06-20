"use client";

import Image from "next/image";
import { FaFacebook, FaTiktok, FaTelegramPlane } from "react-icons/fa";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#f1edef] text-gray-800 py-10 px-6 sm:px-10 lg:px-20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        {/* Logo + Description */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Link href="/">
            <Image src="/Logo.png" alt="ResellKH Logo" width={100} height={50} />
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
            <li><a href="#" className="hover:underline">Fashion</a></li>
            <li><a href="#" className="hover:underline">Accessory</a></li>
            <li><a href="#" className="hover:underline">Sport</a></li>
            <li><a href="#" className="hover:underline">Beauty</a></li>
          </ul>
        </div>

        {/* Category 2 */}
        <div>
          <h2 className="text-lg font-semibold text-orange-500 mb-3">Categories</h2>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:underline">Electronic</a></li>
            <li><a href="#" className="hover:underline">Furniture</a></li>
            <li><a href="#" className="hover:underline">Kitchen</a></li>
            <li><a href="#" className="hover:underline">Book</a></li>
          </ul>
        </div>

        {/* Legal */}
        <div>
          <h2 className="text-lg font-semibold text-orange-500 mb-3">Legal</h2>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:underline">Privacy Policy</a></li>
            <li><a href="#" className="hover:underline">FAQ</a></li>
            <li><a href="#" className="hover:underline">Terms & Conditions</a></li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
