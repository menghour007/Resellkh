<<<<<<< HEAD
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
=======
// ====== src/components/sell/DealMethod.js ======
'use client';

import { useState, useEffect, forwardRef, useImperativeHandle } from "react";
import { Move } from "lucide-react";
import dynamic from 'next/dynamic'; // Import dynamic for client-side component loading
import { toast } from "react-hot-toast";
import axios from "axios"; // Assuming axios is used or might be useful

// Dynamically import MapPicker to ensure it's only rendered on the client side
const MapPicker = dynamic(
  () => import('./MapPicker'), // Path to your MapPicker component
  { ssr: false } // This is crucial: disable server-side rendering for MapPicker
);

const DealMethod = forwardRef(
  (
    {
      location,
      setLocation,
      telegram,
      setTelegram,
      setLatitude,
      setLongitude,
    },
    ref
  ) => {
    const [mapVisible, setMapVisible] = useState(false);
    const [telegramInput, setTelegramInput] = useState("");
    const [telegramError, setTelegramError] = useState("");

    const handleLocationPick = async ({ lat, lng }) => {
      setLatitude(lat);
      setLongitude(lng);

      try {
        const token = localStorage.getItem('token'); // Get token for backend authentication

        // FIX: Corrected the URL to include the full backend path
        const reverseGeocodeUrl = `/api/reverse-geocode?lat=${lat}&lon=${lng}`;
        
        const res = await fetch(reverseGeocodeUrl, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (!res.ok) { // Check for non-2xx response status
          const errorText = await res.text(); // Get raw response text for debugging
          console.error(`Backend Reverse Geocoding Error: ${res.status} ${res.statusText} - ${errorText}`);
          // Provide specific error message based on status
          if (res.status === 401) {
            toast.error("Unauthorized: Please log in to use location services.");
          } else if (res.status === 404) {
            toast.error("Location service not found on server."); // Specific toast for 404
          } else {
            toast.error("Failed to get address for selected location. Please try again or enter manually.");
          }
          throw new Error(`Reverse geocoding failed: ${res.status} ${res.statusText}`);
        }

        const data = await res.json(); // Parse JSON response
        setLocation(data.display_name || `${lat.toFixed(6)}, ${lng.toFixed(6)}`); 
      } catch (error) {
        console.error("Error fetching address (reverse geocoding):", error);
        // Only show generic toast if specific one wasn't shown above
        if (!error.message.includes("Reverse geocoding failed:")) {
           toast.error("Failed to get address for selected location. Please try again or enter manually.");
        }
        setLocation(`${lat.toFixed(6)}, ${lng.toFixed(6)}`); // Fallback to coordinates
      } finally {
        setMapVisible(false); // Hide map after location selection attempt
      }
    };
>>>>>>> b1e4b4f95fb110308f624c2cb3c1d8ad8e2f712b

    const handleTelegramChange = (e) => {
      let value = e.target.value.trim();
      if (value.startsWith("@")) {
        value = value.substring(1);
      }
      setTelegramInput(value);
      if (telegramError) {
        setTelegramError("");
      }
    };

<<<<<<< HEAD
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
=======
    useImperativeHandle(ref, () => ({
      validateTelegram: () => {
        const username = telegramInput.trim();
        const isValid = /^[a-zA-Z0-9_]{5,32}$/.test(username);

        if (username && !isValid) {
          setTelegramError('Invalid Telegram username. Must be 5–32 characters and contain only letters, numbers, or underscores.');
          toast.error('Invalid Telegram username. Please check format.');
          return false;
        }
        
        if (!username) {
            setTelegram("");
            setTelegramError("");
            return true;
        }

        setTelegram(`https://t.me/${username}`);
        setTelegramError("");
        return true;
      },
    }));

    useEffect(() => {
      if (telegram && telegram.startsWith("https://t.me/")) {
        const username = telegram.replace("https://t.me/", "");
        setTelegramInput(username);
      } else if (telegram === "") {
        setTelegramInput("");
      }
    }, [telegram]);

    return (
      <div className="p-5 border rounded-3xl bg-white space-y-4">
        <p className="font-semibold text-[17px]">Deal Method</p>

        {/* Meet-up Location Field */}
        <div>
          <p className="text-sm text-gray-700 mb-1">Meet-up</p>

          {location && !mapVisible ? (
            <div className="space-y-2">
              <div className="mt-2 w-full rounded-2xl bg-gray-100 px-5 py-3 text-gray-800">
                {location}
              </div>
              <button
                type="button"
                onClick={() => setMapVisible(true)}
                className="text-sm text-orange-500 underline hover:opacity-80"
              >
                Change Location
              </button>
            </div>
          ) : (
            !mapVisible && (
              <button
                type="button"
                onClick={() => setMapVisible(true)}
                className="flex items-center space-x-2 text-orange-500 font-medium hover:opacity-80 mt-2"
              >
                <div className="w-6 h-6 rounded-full bg-orange-500 flex items-center justify-center text-white">
                  <Move className="w-4 h-4" />
                </div>
                <span>Add Location</span>
              </button>
            )
          )}

          {/* Map picker popup: Dynamically loaded to prevent SSR errors */}
          {mapVisible && (
            <MapPicker
              onLocationSelect={(latlng) => {
                handleLocationPick(latlng);
              }}
              // Add initialCoords only if you have initial latitude/longitude state in DealMethod
              // initialCoords={{ lat: latitude || 11.5564, lng: longitude || 104.9282 }}
            />
          )}
        </div>

        {/* Telegram Field */}
        <div>
          <label htmlFor="telegramInput" className="block text-sm font-medium text-gray-700 mb-1">
              Telegram (username only)
          </label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-black">@</span>
            <input
              type="text"
              id="telegramInput"
              placeholder="username"
              value={telegramInput}
              onChange={handleTelegramChange}
              className={`w-full pl-8 rounded-2xl bg-[#f1edef] px-5 py-3 placeholder-gray-500 text-gray-800 focus:outline-none ${telegramError ? 'border-red-500 border' : ''}`}
            />
            {telegramError && <p className="text-red-500 text-xs mt-1">{telegramError}</p>}
          </div>
        </div>
      </div>
    );
  }
);

export default DealMethod;
>>>>>>> b1e4b4f95fb110308f624c2cb3c1d8ad8e2f712b
