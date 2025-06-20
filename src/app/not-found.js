// src/app/not-found.jsx
'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white text-center px-4">
      <div className="relative w-full max-w-md h-[300px] sm:h-[400px] mb-6">
        <Image
          src="/images/story set/not found.jpg"
          alt="404 Page Not Found"
          fill
          className="object-contain"
        />
      </div>

      <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4">
        OPPS! PAGE NOT FOUND
      </h1>

      <button
        onClick={() => router.push('/')}
        className="px-6 py-2 bg-orange-500 text-white rounded-full shadow hover:bg-orange-600 transition"
      >
        Back to Home
      </button>
    </div>
  );
}
