// ====== src/components/sell/DraftCard.js ======
'use client';

import Link from 'next/link';
import Image from 'next/image';

export default function DraftCard({ draft }) {
  // Corrected: Ensure the image URL is fetched correctly
  const imageUrl = draft.fileUrls?.[0] || '/placeholder.png';

  // CORRECTED: Use draft.draftId for the link, not draft.productId
  const draftId = draft.draftId ?? null; // <<< FIX IS HERE

  // Add robust error handling for Image component for debugging
  const handleImageError = (e) => {
    e.target.src = '/placeholder.png'; // Fallback image on error
    console.error('Failed to load image:', imageUrl, e); // Log the error for debugging
  };

  return (
    <div className="rounded-2xl overflow-hidden shadow-sm border border-gray-200 bg-white flex flex-col">
      {/* Render the Link and Image only if a valid draftId exists */}
      {draftId ? (
        <Link href={`/sell/new?draftId=${draftId}`} className="relative w-full aspect-[4/5] h-[260px] rounded-t-2xl overflow-hidden">
          <Image
            src={imageUrl}
            alt={draft.productName || 'Draft Image'}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 260px"
            priority
            unoptimized // Use unoptimized for external images like IPFS if not using Next.js image optimization service
            onError={handleImageError} // Add error handler for image
          />
        </Link>
      ) : (
        // Fallback div if no valid draftId
        <div className="relative w-full aspect-[4/5] h-[260px] rounded-t-2xl overflow-hidden bg-gray-100 flex items-center justify-center text-gray-400">
          No draft link
        </div>
      )}

      <div className="px-4 py-2 text-center text-gray-700 font-medium">
        {/* Display the draft name, or a generic 'Unnamed Draft' */}
        {draft.productName || 'Draft'}
      </div>
    </div>
  );
}