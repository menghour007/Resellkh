import { useState, useRef, useEffect } from 'react';

export default function CustomDropdown({ label, options, value, onChange, dropdownHeight }) {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleSelect = (val) => {
    onChange({ target: { value: val } });
    setOpen(false);
  };

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="mb-4" ref={dropdownRef}>
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}

      <div
        tabIndex={0}
        role="button"
        className="relative w-full border h-[45px] rounded-[24px] border-gray-900 focus:outline-none focus:border-orange-400 px-4 text-sm cursor-pointer flex items-center justify-between"
        onClick={() => setOpen(!open)}
      >
        {/* Content (text + icon) */}
        <div className="flex w-full items-center justify-between">
          <span className="text-gray-800">{value || 'Select'}</span>
          <svg
            className={`w-5 h-5 text-gray-500 transform transition-transform duration-200 ${open ? 'rotate-180' : 'rotate-0'
              }`}
            fill="none"
            viewBox="0 0 30 29"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M22.8842 10.1275C23.2929 10.6174 23.2636 11.339 22.7966 11.7963L15.5766 18.8553C15.3346 19.092 15.0108 19.2201 14.675 19.2201C14.339 19.2201 14.0159 19.0922 13.7729 18.8553L6.55327 11.7961C6.05516 11.3085 6.05516 10.5192 6.55327 10.0329C7.05155 9.54506 7.859 9.54506 8.35701 10.0327L14.675 16.2098L20.9928 10.0329C21.4599 9.57558 22.1988 9.54697 22.6998 9.94706L22.7967 10.0328L22.8842 10.1275Z"
              fill="#343A40"
            />
          </svg>
        </div>

        {/* Options */}
        {open && (
          <div
            className="absolute right-[1px] top-[37px] z-10 mt-2 w-full bg-white border rounded-[16px] shadow-md overflow-y-auto focus:outline-none"
            style={{ height: dropdownHeight || "220px" }}
          >
            {options.map((opt) => (
              <div
                key={opt}
                className={`px-4 py-2 cursor-pointer hover:bg-gray-100 ${value === opt ? "text-black font-semibold" : ""
                  }`}
                onClick={() => handleSelect(opt)}
              >
                {opt}
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}
