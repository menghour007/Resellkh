import PhotoUploadPrompt from '@/components/sell/PhotoUploadPrompt';
import SellDirectly from '@/components/sell/SellDirectly';
import ManageDrafts from '@/components/sell/ManageDrafts';
import Footer from '@/components/layout/Footer';

export default function SellDashboardPage() {
  return (
    <>
     
        <div className="mx-auto px-[7%] py-8">
            <h1 className="text-xl font-semibold text-gray-800 mb-1">List it yourself</h1>
            <h2 className="text-xl font-semibold text-gray-800 mb-6">Find your own buyers</h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">

            {/* LEFT: Photo Upload */}
            <div>
              <PhotoUploadPrompt />
            </div>
            {/* RIGHT: Sell Directly */}
            <div>
            {/* Header: All content aligned to the right */}
            <div className="flex flex-col items-end text-right mb-6 gap-2">
              {/* Title + Beta */}
              <div className="flex items-center justify-end">
                <h1 className="text-xl font-bold text-gray-950">Sell to Brandname</h1>
                <span className="ml-2 bg-orange-500 text-white text-xs font-semibold px-2.5 py-0.5 rounded-full">
                  Beta
                </span>
              </div>
   
   
              {/* Subtitle */}
              <p className="text-sm sm:text-base text-black font-medium">
                No listing needed, sell directly to us
              </p>
            </div>

            {/* Content Box */}
            <div className="bg-[#E4E4E4] rounded-3xl p-6 shadow-sm relative">
              <SellDirectly />
            </div>
          </div>

          </div>

          {/* BOTTOM: Draft management */}
          <div className="mt-12">
            <ManageDrafts />
          </div>
        </div>
      
    </>
  );
}
