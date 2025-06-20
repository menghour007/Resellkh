import Image from 'next/image';

export default function DraftCard({ draft }) {
  return (
    <div className="rounded-2xl overflow-hidden shadow-sm border border-gray-200 bg-white flex flex-col">
      {/* Image */}
      <div className="w-full aspect-[4/5] relative h-[260px]">
        <Image
          src={draft.imageUrl}
          alt={draft.alt}
          layout="fill"
          objectFit="cover"
          className="rounded-t-2xl"
        />
      </div>

      {/* Label */}
      <div className="text-center py-2 text-[15px] font-semibold text-[#3A4B46]">
        Draft
      </div>
    </div>
  );
}
