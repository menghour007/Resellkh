'use client';

import { ChevronDown } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

const categories = [
  'Accessories', 'Beauty', 'Equipment Bag & Shoes', 'Book', 'Fashion',
  'Home', 'Sports & Kids', 'Electronic', 'Vehicle', 'Other'
];

export default function CategorySelector({ selected, onSelect }) {
  const [open, setOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const dropdownRef = useRef();

  const filtered = categories.filter(c =>
    c.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative z-10 w-full max-w-md mx-auto" ref={dropdownRef}>
      <div
        onClick={() => setOpen(!open)}
        className="cursor-pointer flex justify-between items-center border px-4 py-3 rounded-xl bg-white shadow-sm w-full"
      >
        <span className="text-gray-700 text-sm sm:text-base truncate">
          {selected || 'Select a category'}
        </span>
        <ChevronDown className="h-5 w-5 text-gray-500" />
      </div>

      {open && (
        <div className="absolute top-full mt-2 w-full bg-white border rounded-xl shadow-lg max-h-80 overflow-y-auto">
          <input
            type="text"
            placeholder="Search for category"
            className="w-full px-4 py-2 border-b text-sm sm:text-base outline-none"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <ul className="divide-y">
            {filtered.length > 0 ? (
              filtered.map((cat) => (
                <li
                  key={cat}
                  onClick={() => {
                    onSelect(cat);
                    setOpen(false);
                  }}
                  className="px-4 py-3 hover:bg-gray-100 cursor-pointer text-sm sm:text-base"
                >
                  {cat}
                </li>
              ))
            ) : (
              <li className="px-4 py-3 text-gray-400 text-sm">No match found</li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
}
