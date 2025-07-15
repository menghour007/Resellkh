export default function ItemDetailForm({ title,setTitle, productStatus, setProductStatus, description, setDescription }) {
  return (
    <div className="p-5 border rounded-3xl bg-white space-y-4">
      <p className="font-semibold text-[17px]">Item Detail</p>

      {/* Title input */}
      <input
        type="text"
        placeholder="Listing title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full rounded-2xl bg-[#f1edef] px-5 py-3 placeholder-gray-500 text-gray-800 focus:outline-none"
      />

       <input
        type="text"
        placeholder="Listing status"
        value={productStatus}
        onChange={(e) => setProductStatus(e.target.value)}
        className="w-full rounded-2xl bg-[#f1edef] px-5 py-3 placeholder-gray-500 text-gray-800 focus:outline-none"
      />

      {/* Tip */}
      <p className="text-sm text-gray-700">
        With these additional details, buyers can find your listing more easily and ask fewer questions.
      </p>

      {/* Description box */}
      <div className="relative">
        <textarea
          placeholder="Description (Optional)"
          rows={5}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full rounded-2xl bg-[#f1edef] px-5 py-3 placeholder-gray-500 text-gray-800 resize-none focus:outline-none"
        />
        <p className="text-sm text-gray-500 absolute bottom-2 right-4">{description.length}/150 words</p>
      </div>
    </div>
  );
}
