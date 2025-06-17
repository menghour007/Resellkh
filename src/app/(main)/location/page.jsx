'use client';
import { useRouter } from 'next/navigation';

export default function SelectLocationPage() {
  const router = useRouter();

  const handleConfirm = () => {
    const mockLocation = {
      lat: 11.562108,
      lng: 104.888535,
      name: 'National University of Management',
    };

    localStorage.setItem('meetup_location', JSON.stringify(mockLocation));
    router.back(); // Go back to the previous page
  };

  return (
    <>
      <div className="relative w-full h-[530px] px-[7%] py-4 mb-[40px]">
        {/* Map iframe */}
        <iframe
          src="https://maps.google.com/maps?q=national%20university%20of%20management%20phnom%20penh&z=15&output=embed"
          className="w-full h-[520px] border-none rounded-2xl"
          allowFullScreen
          loading="lazy"
        />

        {/* Confirm Button (overlay) */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10">
          <button
            onClick={handleConfirm}
            className="bg-orange-500 text-white font-semibold px-6 py-2 rounded-full shadow hover:bg-orange-600 transition"
          >
            Confirm
          </button>
        </div>
      </div>
    </>
  );
}
