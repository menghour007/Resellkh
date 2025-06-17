import { useState } from 'react';

export default function PricingInput({ price, setPrice, discount, setDiscount }) {
  const [currency, setCurrency] = useState('USD');

  // const discountValue =
  //   price && discount ? ((parseFloat(price) * parseFloat(discount)) / 100).toFixed(2) : '0.00';

  const discountValue =
    price && discount
      ? ((price * discount) / 100).toFixed(2)
      : '0.00';


  return (
    <div className="space-y-6">
      {/* Price Section */}
      <div className="p-5 border rounded-2xl bg-white space-y-3">
        <p className="font-semibold text-[17px]">Price</p>
        <div className="flex items-center gap-2">
          {/* Input */}
          <div className="relative flex-1">
            <span className="absolute top-3 left-5 text-black text-lg">
              {currency === 'USD' ? '$' : 'R'}
            </span>
            <input
              type="number"
              inputMode="decimal"
              min="0"
              value={price}
              onChange={(e) => {
                const value = e.target.value;
                if (/^\d*\.?\d*$/.test(value)) setPrice(value);
              }}
              placeholder="0.00"
              className="w-full h-[48px] pt-4 pl-10 pr-4 py-3 rounded-2xl bg-[#f1edef] text-black placeholder:text-gray-800 focus:outline-none"
            />
          </div>

          {/* Currency Toggle */}
          <div className="flex items-center h-[48px] bg-[#f1edef] rounded-2xl p-1">
            <button
              onClick={() => setCurrency('USD')}
              className={`h-full px-4 py-2 rounded-2xl text-sm font-semibold ${currency === 'USD' ? 'bg-white text-black' : 'text-gray-800'
                }`}
            >
              $
            </button>
            <button
              onClick={() => setCurrency('KHR')}
              className={`h-full px-4 py-2 rounded-2xl text-sm font-semibold ${currency === 'KHR' ? 'bg-white text-black' : 'text-gray-800'
                }`}
            >
              R
            </button>
          </div>
        </div>
      </div>

      {/* Discount Section */}
      <div className="p-5 border rounded-2xl bg-white space-y-3">
        <p className="font-semibold text-[17px]">Discount %</p>
        <div className="flex items-center gap-2">
          {/* Input */}
          <div className="relative flex-1">
            <span className="absolute top-3 left-5 text-black text-lg">%</span>
            <input
              type="number"
              inputMode="decimal"
              min="0"
              max="100"
              value={discount}
              onChange={(e) => {
                const value = e.target.value;
                if (/^\d{0,3}(\.\d{0,2})?$/.test(value) && parseFloat(value) <= 100) {
                  setDiscount(value);
                }
              }}
              placeholder="0"
              className="w-full h-[48px] pt-4 pl-10 pr-4 py-3 rounded-2xl bg-[#f1edef] text-black placeholder:text-gray-800 focus:outline-none"
            />
          </div>

          {/* Discount Value Display */}
          <div
            className={`h-[48px] px-4 py-3 min-w-[90px] rounded-2xl border text-sm font-medium text-center flex items-center justify-center ${parseFloat(discount) === 100 ? 'text-green-500' : 'text-black'
              }`}
          >
            {parseFloat(discount) === 100
              ? 'Free'
              : `- ${discountValue} ${currency === 'USD' ? '$' : 'R'}`}
          </div>

        </div>
      </div>

    </div>
  );
}
