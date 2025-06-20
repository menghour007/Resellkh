import DraftCard from './DraftCard';

// In a real app, this data would come from your user's account via an API
const userDrafts = [
  { id: 1, imageUrl: "/Sell/draft1.png", alt: "Black backpack" },
  { id: 2, imageUrl: "/Sell/draft2.png", alt: "Beige high-heels" },
  { id: 3, imageUrl: "/Sell/draft3.png", alt: "Gray zip-up hoodie" },
  { id: 4, imageUrl: "/Sell/draft4.png", alt: "Blue handbag" },
  { id: 5, imageUrl: "/Sell/draft4.png", alt: "Black jacket" },
];

export default function ManageDrafts() {
  return (
    <section>
      <div className="flex items-center justify-between mb-4">
        {/* <button className="px-6 py-2 mt-2 bg-orange-500 text-white rounded-full hover:bg-orange-600 transition">
          Manage Drafts
        </button> */}
        <p className='text-[17px] font-semibold'>Manage Drafts</p>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {userDrafts.map((draft) => (
          <DraftCard key={draft.id} draft={draft} />
        ))}
      </div>
    </section>
  );
}