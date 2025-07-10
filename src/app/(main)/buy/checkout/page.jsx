'use client';

import React, { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import CheckoutCart from '@/components/buy/CheckoutCart';
import CheckoutSummary from '@/components/buy/CheckoutSummary';

// --- Main Checkout Page Component ---
export default function CheckoutPage() {
  const router = useRouter();
  // The state still holds the product data, including the quantity for price calculation.
  const [items, setItems] = useState([
    {
      "productId": 1,
      "productName": "G2000 smart fit shirt long sleeve",
      "productPrice": 15.00,
      "description": "Brand new never used. Bought for wedding but not my style to wear formal. Negotiable if u can come and collect. Bought Retail at 25$ Size: 16-34 Non iron, DRY Material feels super comfortable, great for SG weather. Come view to believe it.",
      "condition": "Like New",
      "fileUrls": ["http://localhost:3000/_next/image?url=https%3A%2F%2Fgateway.pinata.cloud%2Fipfs%2FQmSL9cZKQRoB8mcYXBFrVpkUk1NyvwXCdinP7bH7D9UW13&w=1920&q=75"],
      "quantity": 2
    },
    {
      "productId": 2,
      "productName": "Bellroy waist pouch dark green",
      "productPrice": 18.00,
      "description": "In mint condition. Measure 27cm long and 15cm high.",
      "condition": "Like New",
      "fileUrls": ["http://localhost:3000/_next/image?url=https%3A%2F%2Fgateway.pinata.cloud%2Fipfs%2FQmVTrgqpPJ1BJs4zu8C3PSiWXjp6s35XBJmHURQ5DHnPA8&w=1920&q=75"],
      "quantity": 1
    },
    {
      "productId": 3,
      "productName": "Diesel – Slim Skinny Fit Jeans",
      "productPrice": 20.00,
      "description": "Barely worn and in good-as-new condition. Dark gray slim skinny-fit jeans with a low waist and button placket. W31 L32. Unfortunately I didn’t stay slim long enough to wear them! The slim fit jeans by Diesel Sleenker 069EQ are characterized by fashionable used look effects. Stretch denim with 89% cotton, 9% elasto­multi­ester, 2% elastane.",
      "condition": "New",
      "fileUrls": ["http://localhost:3000/_next/image?url=https%3A%2F%2Fgateway.pinata.cloud%2Fipfs%2FQmXEQPsGhPruCeaKnTNC56KB71Bhzz2S5qtk1EL3ET2E6L&w=1920&q=75"],
      "quantity": 2
    }
  ]);

  const handleRemove = (productId) => {
    setItems(prevItems => prevItems.filter(item => item.productId !== productId));
  };

  const handleCheckout = () => {
    router.push('/buy/payment');
  };

  const subtotal = useMemo(() => items.reduce((sum, item) => sum + item.productPrice * item.quantity, 0), [items]);
  const tax = 20.00;
  const delivery = 0.00;
  const total = subtotal + tax + delivery;

  return (
    <div className="bg-gray-50 min-h-screen font-sans p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <CheckoutCart items={items} onRemove={handleRemove} />
        <CheckoutSummary
          subtotal={subtotal}
          delivery={delivery}
          total={total}
          onCheckout={handleCheckout}
        />
      </div>
    </div>
  );
}
