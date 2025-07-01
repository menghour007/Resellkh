"use client";

import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import { useEffect, useState } from "react";

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
    <MapContainer
      center={[11.5564, 104.9282]}
      zoom={13}
      className="h-[400px] w-full rounded-2xl"
    >
      <TileLayer
        attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <LocationMarker onSelect={onLocationSelect} />
    </MapContainer>
  );
}
