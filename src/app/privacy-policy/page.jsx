'use client';

import Link from "next/link";
import React from "react";

export default function PrivacyPolicy() {
  return (
    <main className="flex justify-center px-4 py-12 bg-gray-50 min-h-screen">
      <div className="w-full max-w-4xl bg-white p-8 rounded-2xl shadow-lg text-gray-800">
        {/* Title */}
        <h1 className="text-4xl font-bold text-orange-500 mb-4 text-center">
          Privacy Policy
        </h1>

        {/* Intro */}
        <p className="mb-3 text-start ">
          Welcome to <span className="font-semibold text-orange-500">ResellKH</span>!
          Your privacy is our top priority. This document explains how we collect, use,
          and protect your information while ensuring transparency and trust.
        </p>
        <p className="mb-8 text-center">
          By using our services, you agree to the terms outlined in this Privacy Policy.
        </p>

        {/* Section 1 */}
        <section className="mb-10">
          <h2 className="flex items-center gap-2 text-xl font-semibold mb-3 text-gray-800">
            <span className="w-7 h-7 rounded-full bg-orange-500 text-white flex items-center justify-center font-bold">1</span>
            Information We Collect
          </h2>
          <ul className="list-disc pl-6 space-y-2 text-gray-700">
            <li><strong>Account Information:</strong> name, email, phone, Telegram username</li>
            <li><strong>Profile Info:</strong> profile image, display name</li>
            <li><strong>Location Data:</strong> for matching buyers/sellers</li>
            <li><strong>Product Listings:</strong> title, images, price</li>
            <li><strong>Transaction Info:</strong> KHQR via ABA (no banking credentials stored)</li>
            <li><strong>Device Info:</strong> IP address, browser, etc.</li>
            <li><strong>Cookies & Analytics:</strong> for performance and bug tracking</li>
          </ul>
        </section>

        {/* Section 2 */}
        <section className="mb-10">
          <h2 className="flex items-center gap-2 text-xl font-semibold mb-3 text-gray-800">
            <span className="w-7 h-7 rounded-full bg-orange-500 text-white flex items-center justify-center font-bold">2</span>
            How We Use Your Data
          </h2>
          <ul className="list-disc pl-6 space-y-2 text-gray-700">
            <li>To create and manage your account</li>
            <li>To facilitate product listings and payments</li>
            <li>To show listings based on your location</li>
            <li>To improve the platform and prevent fraud</li>
            <li>To provide support and notify you about updates</li>
          </ul>
        </section>

        {/* Section 3 */}
        <section className="mb-10">
          <h2 className="flex items-center gap-2 text-xl font-semibold mb-3 text-gray-800">
            <span className="w-7 h-7 rounded-full bg-orange-500 text-white flex items-center justify-center font-bold">3</span>
            Sharing Your Information
          </h2>
          <p className="mb-2">We do not sell your data. We may share information with:</p>
          <ul className="list-disc pl-6 space-y-2 text-gray-700">
            <li>Trusted third-party service providers</li>
            <li>Payment providers like ABA Bank (for KHQR transactions)</li>
            <li>Authorities, when required by law</li>
          </ul>
        </section>

        {/* Section 4-9 */}
        {[
          { num: 4, title: "Cookies", text: "We use cookies to enhance your experience. You can disable cookies in your browser settings, but some features may not work correctly." },
          { num: 5, title: "Security", text: "We use standard security practices to protect your data. However, no method of online transmission or storage is 100% secure." },
          { num: 6, title: "Third-Party Links", text: "ResellKH may contain links to third-party services such as Telegram or ABA. We are not responsible for the privacy policies or content of these sites." },
          { num: 7, title: "Children’s Privacy", text: "Our platform is not intended for children under 13. We do not knowingly collect personal information from children." },
          { num: 8, title: "Updates to This Policy", text: "We may update this policy occasionally. Changes will be posted here. Please check back regularly for updates." },
          {
            num: 9,
            title: "Contact Us",
            text: <>If you have questions or suggestions, feel free to contact us at: <a href="mailto:info@resellkh.com" className="text-blue-600 underline">info@resellkh.com</a></>,
          },
        ].map(({ num, title, text }) => (
          <section key={num} className="mb-10">
            <h2 className="flex items-center gap-2 text-xl font-semibold mb-3 text-gray-800">
              <span className="w-7 h-7 rounded-full bg-orange-500 text-white flex items-center justify-center font-bold">
                {num}
              </span>
              {title}
            </h2>
            <p className="text-gray-700">{text}</p>
          </section>
        ))}

        {/* Go to Home Button */}
        <div className="text-center mt-12">
          <Link
            href="/"
            className="inline-block bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-2 rounded-lg shadow-md transition-all"
          >
            Go to Home
          </Link>
        </div>
      </div>
    </main>
  );
}
