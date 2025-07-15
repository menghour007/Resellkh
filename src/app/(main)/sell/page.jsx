import PhotoUploadPrompt from '@/components/sell/PhotoUploadPrompt';
import SellDirectly from '@/components/sell/SellDirectly';
import ManageDrafts from '@/components/sell/ManageDrafts';
import Footer from '@/components/layout/Footer';

export default function SellDashboardPage() {
  return (
    <>
      <div className="mx-auto px-4 sm:px-6 lg:px-[7%] py-6 sm:py-10">
        {/* Page Header */}
        <div className="mb-6">
          <h1 className="text-lg sm:text-xl font-semibold text-gray-800 mb-1">List it yourself</h1>
          <h2 className="text-lg sm:text-xl font-semibold text-gray-800">Find your own buyers</h2>
        </div>

        {/* Grid Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 items-start">
          {/* LEFT: Photo Upload */}
          <div>
            <PhotoUploadPrompt />
          </div>

          {/* RIGHT: Sell Directly */}
          <div>
            {/* Header */}
            <div className="flex flex-col items-start lg:items-end text-left lg:text-right mb-4 gap-2">
              <div className="flex items-center justify-start lg:justify-end">
                <h1 className="text-lg sm:text-xl font-bold text-gray-950">Sell to Brandname</h1>
                <span className="ml-2 bg-orange-500 text-white text-xs font-semibold px-2.5 py-0.5 rounded-full">
                  Beta
                </span>
              </div>
              <p className="text-sm sm:text-base text-black font-medium">
                No listing needed, sell directly to us
              </p>
            </div>

            {/* Content Box */}
            <div className="bg-[#E4E4E4] rounded-3xl p-4 sm:p-6 shadow-sm">
              <SellDirectly />
            </div>
          </div>
        </div>

        {/* BOTTOM: Drafts */}
        <div className="mt-10 sm:mt-12">
          <ManageDrafts />
        </div>
      </div>
    </>
  );
}
