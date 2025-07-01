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

  const handleLocationPick = async ({ lat, lng }) => {
    setLatLng({ lat, lng });
    setLatitude(lat);
    setLongitude(lng);

    // Fetch address using Nominatim
    try {
      const res = await fetch(
         `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`
      );
      const data = await res.json();
      setLocation(data.display_name); // Show address to user
    } catch (error) {
      console.error("Error fetching address:", error);
      // setLocation(${lat.toFixed(6)}, ${lng.toFixed(6)}); // Fallback to coordinates
      setLocation(lat.toFixed(6), lng.toFixed(6));

    }
  };

  return (
    <div className="p-5 border rounded-3xl bg-white space-y-4">
      <p className="font-semibold text-[17px]">Deal Method</p>

      {/* Meet-up Field */}
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

      {/* Telegram Field */}
      <div>
        <p className="text-sm text-gray-700 mb-1">Telegram</p>
        <input
          type="text"
          placeholder="Add link or @username"
          value={telegram}
          onChange={(e) => setTelegram(e.target.value)}
          className="w-full rounded-2xl bg-[#f1edef] px-5 py-3 placeholder-gray-500 text-gray-800 focus:outline-none"
        />
      </div>
    </div>
  );
}