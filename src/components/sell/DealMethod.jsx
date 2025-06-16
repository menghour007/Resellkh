'use client';
import { useEffect, useState } from 'react';
import { Move } from 'lucide-react';
import Link from 'next/link';

export default function DealMethod({ location, setLocation, telegram, setTelegram }) {
  const [showLocationInput, setShowLocationInput] = useState(false);

  useEffect(() => {
    // Get location from location page
    const saved = localStorage.getItem('meetup_location');
    if (saved) {
      const parsed = JSON.parse(saved);
      const name = parsed.name || `${parsed.lat}, ${parsed.lng}`;
      setLocation(name);
      setShowLocationInput(true);

      // Replace the saved form draft with this new location
      const draft = JSON.parse(localStorage.getItem('sell_form_draft') || '{}');
      draft.location = name;
      localStorage.setItem('sell_form_draft', JSON.stringify(draft));

      // Clear this so it doesn't auto-run on refresh
      localStorage.removeItem('meetup_location');
    }

    // Show input if there's already a value
    if (location) {
      setShowLocationInput(true);
    }
  }, []);

  return (
    <div className="p-5 border rounded-3xl bg-white space-y-4">
      <p className="font-semibold text-lg">Deal Method</p>

      <div>
        <p className="text-sm font-medium mb-1">Meet-up</p>
        {!showLocationInput ? (
          <Link
            href="/location"
            className="flex items-center space-x-2 text-orange-500 font-medium hover:opacity-80"
          >
            <div className="w-6 h-6 rounded-full bg-orange-500 flex items-center justify-center text-white">
              <Move className="w-4 h-4" />
            </div>
            <span>Add Location</span>
          </Link>
        ) : (
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full mt-2 rounded-2xl bg-gray-100 px-5 py-3 placeholder-gray-500 text-gray-800 focus:outline-none"
          />
        )}
      </div>

      <div>
        <p className="text-sm font-medium mb-1">Telegram</p>
        <input
          type="text"
          placeholder="Add link or @username"
          value={telegram}
          onChange={(e) => setTelegram(e.target.value)}
          className="w-full rounded-2xl bg-gray-100 px-5 py-3 placeholder-gray-500 text-gray-800 focus:outline-none"
        />
      </div>
    </div>
  );
}
