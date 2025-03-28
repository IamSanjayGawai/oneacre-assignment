"use client";

import { fetchMapMarkers } from "../lib/api";
import { useEffect, useState } from "react";
import GoogleMapComponent from "./GoogleMapComponent";
import Script from "next/script";
import { MapMarker } from "../lib/types";

const MAP_API_KEY = process.env.NEXT_PUBLIC_MAP_API_KEY;

const PropertyMap = () => {
  const [isMapScriptLoaded, setIsMapScriptLoaded] = useState(false);
  const [markers, setMarkers] = useState<MapMarker[]>([]);
  const [error, setError] = useState<string | null>(null);


  useEffect(() => {
    async function loadMarkers() {

      setError(null);
      try {
        const data = await fetchMapMarkers();

        setMarkers(data);

      } catch (error) {
        setError("Failed to fetch markers");
        console.error("Error fetching markers:", error);
      }
    }

    loadMarkers();
  }, []);

  return (
    <div className="relative">
      {/* Load Google Maps Script */}
      {!isMapScriptLoaded && MAP_API_KEY && (
        <Script
          src={`https://maps.googleapis.com/maps/api/js?key=${MAP_API_KEY}&libraries=places`}
          onLoad={() => setIsMapScriptLoaded(true)}
          strategy="lazyOnload"
        />
      )}


      {error && <p className="text-red-500">{error}</p>}

      {!isMapScriptLoaded ? (
        <div className="w-full h-[300px] bg-gray-200 animate-pulse rounded-xl" />
      ) : (
        <GoogleMapComponent markers={markers} />
      )}
    </div>
  );
};

export default PropertyMap;
