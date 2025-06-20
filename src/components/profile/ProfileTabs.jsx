import ListingsWithFilter from "./ListingWithFilter";
import ReviewsSection from "./ReviewsSection";

export default function ProfileTabs({ activeTab, setActiveTab }) {
  return (
    <div className="w-full py-8">
      <div className="flex px-6 space-x-6 mb-4">
        <button
          onClick={() => setActiveTab("listings")}
          className={`pb-2 text-sm font-medium ${
            activeTab === "listings"
              ? "text-orange-500 border-b-2 border-orange-500"
              : "text-gray-400 border-b-2 border-transparent"
          }`}
        >
          Listings
        </button>
        <button
          onClick={() => setActiveTab("reviews")}
          className={`pb-2 text-sm font-medium ${
            activeTab === "reviews"
              ? "text-orange-500 border-b-2 border-orange-500"
              : "text-gray-400 border-b-2 border-transparent"
          }`}
        >
          Reviews
        </button>
      </div>

      {activeTab === "listings" ? (
        <ListingsWithFilter />
      ) : (
       <ReviewsSection setActiveTab={setActiveTab} />
      )}
    </div>
  );
}
