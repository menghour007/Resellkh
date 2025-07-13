"use client";
import { useState } from "react";
import { Move } from "lucide-react";
import MapPicker from "./MapPicker";

export default function DealMethod({
  location,
  setLocation,
  telegram,
  setTelegram,
  setLatLng,
  setLatitude,
  setLongitude,
}) {
  const [showLocationInput, setShowLocationInput] = useState(false);
  // const [latLng, setLatLng] = useState({ lat: null, lng: null });
  const [mapVisible, setMapVisible] = useState(false);
  const [telegramInput, setTelegramInput] = useState('');
  const [telegramLink, setTelegramLink] = useState('');

  const handleLocationPick = async ({ lat, lng }) => {
  setLatLng({ lat, lng });
  setLatitude(lat);
  setLongitude(lng);

  try {
    const res = await fetch(`/api/reverse-geocode?lat=${lat}&lon=${lng}`);
    const data = await res.json();
    setLocation(data.display_name); 
  } catch (error) {
    console.error("Error fetching address:", error);
    setLocation(`${lat.toFixed(6)}, ${lng.toFixed(6)}`); 
  }
};


  const handleTelegramChange = (e) => {
    const input = e.target.value.trim();
    setTelegramInput(input);

    // Remove "@" if present and generate link
    const username = input.startsWith('@') ? input.slice(1) : input;
    setTelegramLink(`https://t.me/${username}`);
  };


<<<<<<< HEAD
=======
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
>>>>>>> 2ae46c46d22d602588e08349358b04a77243d1f2

  return (
    <div className="p-5 border rounded-3xl bg-white space-y-4">
      <p className="font-semibold text-[17px]">Deal Method</p>

<<<<<<< HEAD
      {/* Meet-up Field */}
=======
>>>>>>> 2ae46c46d22d602588e08349358b04a77243d1f2
      <div>
        <p className="text-sm text-gray-700 mb-1">Meet-up</p>

        {/* Show address if picked */}
        {location && !mapVisible && (
          <div className="space-y-2">
            <div className="mt-2 w-full rounded-2xl bg-gray-100 px-5 py-3 text-gray-800">
              {location}
            </div>
            <button
              onClick={() => setMapVisible(true)}
              className="text-sm text-orange-500 underline hover:opacity-80"
            >
              Change Location
            </button>
          </div>
        )}

        {/* Show “Add Location” button if not picked yet */}
        {!location && !mapVisible && (
          <button
            onClick={() => setMapVisible(true)}
            className="flex items-center space-x-2 text-orange-500 font-medium hover:opacity-80 mt-2"
          >
            <div className="w-6 h-6 rounded-full bg-orange-500 flex items-center justify-center text-white">
              <Move className="w-4 h-4" />
            </div>
            <span>Add Location</span>
          </button>
        )}

        {/* Map picker popup */}
        {mapVisible && (
          <MapPicker
            onLocationSelect={(latlng) => {
              handleLocationPick(latlng); // Reverse geocode and store
              setMapVisible(false); // Hide after pick
            }}
          />
        )}
      </div>

<<<<<<< HEAD
      {/* Telegram Field */}
=======
>>>>>>> 2ae46c46d22d602588e08349358b04a77243d1f2
      <div>
        <p className="text-sm text-gray-700 mb-1">Telegram</p>
        <input
          type="text"
          placeholder="Add link or @username"
          value={telegramInput}
          onChange={handleTelegramChange}
          className="w-full rounded-2xl bg-[#f1edef] px-5 py-3 placeholder-gray-500 text-gray-800 focus:outline-none"
        />
      </div>
    </div>
  );
}