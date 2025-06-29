'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { FiSearch, FiCamera } from 'react-icons/fi';
import dynamic from 'next/dynamic';

const ImageScanModal = dynamic(() => import('./ImageScanModal'), {
  ssr: false,
});

const sampleResults = [
  'shelf',
  'shirt dress',
  'shoes',
  'shorts',
  'shoulder bag',
  'shopping trolley',
];

export default function SearchBar() {
  const [query, setQuery] = useState('');
  const [filteredResults, setFilteredResults] = useState([]);
  const [scanOpen, setScanOpen] = useState(false);
  const wrapperRef = useRef(null);
  const router = useRouter();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setFilteredResults([]);
        setScanOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleChange = (e) => {
    const value = e.target.value;
    setQuery(value);

    if (value.trim() === '') {
      setFilteredResults([]);
    } else {
      const results = sampleResults.filter((item) =>
        item.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredResults(results);
      setScanOpen(false);
    }
  };

  const handleScanClick = () => {
    setQuery('');
    setFilteredResults([]);
    setScanOpen(true);
  };

  const handleResultClick = (item) => {
    setQuery('');
    setFilteredResults([]);
    router.push(`/result-search?query=${encodeURIComponent(item)}`);
  };

  return (
    <div ref={wrapperRef} className="relative w-full">
      {!scanOpen && (
        <div className="absolute w-full rounded-2xl bg-[#f2edef] shadow-sm border border-gray-200">
          <div className="flex items-center px-4 py-2">
            {/* <FiSearch className="text-gray-500 mr-2 text-base" />  */}
            <svg className="text-gray-500 mr-2 text-base" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M18.031 16.617L22.314 20.899L20.899 22.314L16.617 18.031C15.0237 19.3082 13.042 20.0029 11 20C6.032 20 2 15.968 2 11C2 6.032 6.032 2 11 2C15.968 2 20 6.032 20 11C20.0029 13.042 19.3082 15.0237 18.031 16.617ZM16.025 15.875C17.2941 14.5699 18.0029 12.8204 18 11C18 7.132 14.867 4 11 4C7.132 4 4 7.132 4 11C4 14.867 7.132 18 11 18C12.8204 18.0029 14.5699 17.2941 15.875 16.025L16.025 15.875Z" fill="black" />
            </svg>

            <input
              type="text"
              placeholder="Search for anything"
              value={query}
              onChange={handleChange}
              className="bg-transparent w-full outline-none text-sm text-black placeholder-gray-500"
            />
            {/* <FiCamera
              className="text-gray-500 ml-2 text-lg cursor-pointer"
              onClick={handleScanClick}
            /> */}
            <svg className="text-gray-500 ml-2 text-lg cursor-pointer"
              onClick={handleScanClick} width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M2 9V6.5C2 4.01 4.01 2 6.5 2H9" stroke="#171717" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M15 2H17.5C19.99 2 22 4.01 22 6.5V9" stroke="#171717" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M22 16V17.5C22 19.99 19.99 22 17.5 22H16" stroke="#171717" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M9 22H6.5C4.01 22 2 19.99 2 17.5V15" stroke="#171717" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M17 9.5V14.5C17 16.5 16 17.5 14 17.5H10C8 17.5 7 16.5 7 14.5V9.5C7 7.5 8 6.5 10 6.5H14C16 6.5 17 7.5 17 9.5Z" stroke="#171717" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M19 12H5" stroke="#171717" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>

          </div>

          {filteredResults.length > 0 && (
            <ul className="border-t border-gray-300 text-sm text-gray-800">
              {filteredResults.map((item, index) => (
                <li
                  key={index}
                  className="px-5 py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => handleResultClick(item)}
                >
                  {item}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}

      {scanOpen && (
        <div className="relative rounded-2xl bg-[#f2edef]">
          <ImageScanModal open={scanOpen} onClose={() => setScanOpen(false)} />
        </div>
      )}
    </div>
  );
}
