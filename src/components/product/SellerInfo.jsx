'use client'; // The "Message" button suggests client-side interaction

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { FaStar } from 'react-icons/fa';

const sellerRating = 4;
const sellerReviewCount = 59;

const SellerInfo = () => {
  const router = useRouter();
  return (

    <div className="bg-[#EBE6E8] rounded-xl p-6 shadow-sm">
      {/* <h3 className="font-bold text-gray-900 mb-4">Contact the seller</h3> */}

      <div className="flex items-center space-x-3 mb-4 cursor-pointer"
        onClick={() => {
          router.push('/profile/seller');
        }}>
        <div className="w-12 h-12 bg-gray-300 rounded-full overflow-hidden">
          <Image
            src="/girl 2.jpg"
            alt="Seller"
            width={48}
            height={48}
            className="w-full h-full object-cover"
          />
        </div>
        <div>
          <h4 className="font-medium text-gray-900">Bou Leakhena</h4>
          <div className="flex items-center">
            <div className="flex text-yellow-400">
               {[...Array(5)].map((_, i) => (
                <FaStar
                  key={i}
                  className={i < sellerRating ? 'text-orange-500' : 'text-gray-300'}
                />
              ))}
            </div>
            <span className="text-sm text-gray-500 ms-4 mt-[2px]">{sellerReviewCount} reviews</span>
          </div>
        </div>
      </div>


      <div className="text-sm text-t-black mb-4">
        <p>Tel: +855 97 416 939</p>
      </div>
      <a href="https://t.me/echandevid">
        <button className="w-full bg-orange-500 text-white py-2 rounded-[50px] font-medium hover:bg-orange-600 transition-colors">
          Telegram
        </button>
      </a>
    </div>
  );
};

export default SellerInfo;