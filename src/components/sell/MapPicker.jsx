"use client";

import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import { useEffect, useState } from "react";
import { useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";



// A helper component to refresh layout
function MapResizeFixer() {
  const map = useMap();
  useEffect(() => {
    setTimeout(() => {
      map.invalidateSize();
    }, 100); // wait for container to render
  }, [map]);

  return null;
}

function LocationMarker({ onSelect }) {
  const [position, setPosition] = useState(null);

  useMapEvents({
    click(e) {
      setPosition(e.latlng);
      onSelect(e.latlng); // send lat/lng to parent
    },
  });

  return position === null ? null : <Marker position={position} />;
}

export default function MapPicker({ onLocationSelect }) {
  return (
    <div className="w-full h-[300px] rounded-2xl overflow-hidden">
      <MapContainer
        center={[11.5564, 104.9282]}
        zoom={13}
        className="w-full h-full z-[30]"
      >
        <TileLayer
          attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <LocationMarker onSelect={onLocationSelect} />
        <MapResizeFixer />
      </MapContainer>
    </div>
  );
}