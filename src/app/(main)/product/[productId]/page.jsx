// src/app/product/page.jsx
// This is a Server Component by default

import ProductGallery from '@/components/product/ProductGallery';
import ProductDetails from '@/components/product/ProductDetails';
import SellerInfo from '@/components/product/SellerInfo';
import Reviews from '@/components/product/Reviews';
import MoreFromSeller from '@/components/product/MoreFromSeller';
import OtherProducts from '@/components/product/OtherProducts';
import ContactSellerHeader from '@/components/product/ContactSellerHeader';
import Link from 'next/link';

const ProductPage = () => {
  // Define actual image URLs for the hoodie from the provided image
  // const hoodieImageUrls = [
  //   '/image1.png', // Main image on the right
  //   '/image2.png', // Top thumbnail
  //   '/image3.png', // Second thumbnail
  //   '/Product-Detail-Image/video.mp4', // Third thumbnail
  // ];


  const productData = {
    id: 'lulu-hoodie-123',
    name: 'Lululemon Cropped Full Zip Hoodie - XS/S - light grey',
    price: '$7.5',
    originalPrice: '$15',
    condition: 'Like new',
    category: 'Fashion',
    description: "I wore it just once for a chill outing, and it looked amazing. Super soft and lightweight - perfect for layering or wearing on its own. Honestly, I love it, but it's a way too many similar tops, so I'm...",
    // images: hoodieImageUrls, 
  };

  return (
    //max-w-7xl           change to  px-[7%] max-w-full px-[7%] py-4 mx-auto
    <>
      <div className=" mx-auto px-[7%] py-4 bg-white text-black">
        {/* Breadcrumb on the Right */}
        <div className="flex items-center text-gray-500 mb-8">
          <Link href="/" className="hover:text-black">Home</Link>
          <svg className='mx-1' width="20" height="20" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" clipRule="evenodd" d="M6.98558 5.06864C7.32339 4.7931 7.8211 4.8128 8.13643 5.12775L13.0048 9.99638C13.1679 10.1596 13.2563 10.3779 13.2563 10.6044C13.2563 10.8309 13.1681 11.0488 13.0048 11.2127L8.13633 16.0811C7.80004 16.417 7.2557 16.417 6.92029 16.0811C6.58388 15.7451 6.58388 15.2006 6.92019 14.8648L11.1802 10.6044L6.92029 6.34407C6.60492 6.02908 6.5852 5.53088 6.86112 5.19302L6.92025 5.12769L6.98558 5.06864Z" fill="#343A40" />
          </svg>
          <span className="text-orange-500 cursor-default">Detail</span>
        </div>
      

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Pass the productData to ProductGallery */}
          <ProductGallery product={productData} />
          <ProductDetails />
        </div>

        <ContactSellerHeader />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          <div>
            <SellerInfo />
          </div>
          <div className="lg:col-span-2">
            <Reviews />
          </div>
        </div>

        <MoreFromSeller />
        <OtherProducts />

      </div>


    </>
  );
};

export default ProductPage;