'use client';
import Image from 'next/image';
import { FaStar } from 'react-icons/fa';
import Link from 'next/link';
export default function ProfileBanner({ isOwner, user }) {
  const {
    name = 'Bou Leakhena',
    avatar = '/images/avatar.jpg',
    cover = 'cover.jpg',
    rating = 4.5,
    reviewsCount = 59,
  } = user || {};

  return (
    <div className="relative w-full mb-6">
      {/* Cover Image */}
      <div className="relative w-full h-[180px] rounded-2xl overflow-hidden">
        <Image
          src={cover}
          alt="Cover"
          fill
          className="object-cover"
        />
      </div>


      {/* Info Card */}
      <div className="absolute left-6 h-[100px] -bottom-5 right-6 bg-white rounded-xl shadow px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          {/* Avatar */}
          <Image
            src={avatar}
            alt="User Avatar"
            width={50}
            height={50}
            className="rounded-full object-cover"
          />
          <div>
            <h2 className="text-base font-semibold text-black">{name}</h2>
            <p className="text-sm text-gray-500">Profile Detail &gt;</p>
          </div>
        </div>

        {/* Rating + Edit */}
        <div className="flex items-center gap-6">
          <div className="text-right">
            {reviewsCount > 0 ? (
              <>
                <p className="text-sm font-medium text-gray-800 flex items-center gap-1">
                  {rating}
                  <FaStar className="w-[15px] h-[15px] text-orange-500" />
                </p>
                <p className="text-xs text-gray-500">{reviewsCount} reviews</p>

              </>
            ) : (
              <>
                <p className="text-sm font-medium text-gray-800 pe-[30px]">N/A</p>
                <p className="text-xs text-gray-500 pe-1">No reviews yet</p>
              </>
            )}
          </div>

          {isOwner && (
            <button className="border px-4 py-1 rounded-full text-sm hover:bg-gray-100">
              <Link href="/profile/edit-profile">Edit Profile</Link>
               
            </button>
          )}


        </div>

      </div>
    </div>
  );
}
