"use client";

import React, { useEffect, useRef } from "react";
import { MapMarker } from "../lib/types";
import markerImage from "../../public/marker.png";

interface GoogleMapProps {
  markers: MapMarker[];
}

const DEFAULT_CENTER = { lat: 17.385, lng: 78.4867 }; // Hyderabad

export default function GoogleMapComponent({ markers }: GoogleMapProps) {
  console.log("Markers in GoogleMapComponent:", markers);
  const mapRef = useRef<HTMLDivElement | null>(null);
  const mapInstance = useRef<google.maps.Map | null>(null);

  useEffect(() => {
    if (!mapRef.current || !window.google || !window.google.maps) {
      console.warn("Google Maps API not loaded");
      return;
    }

    if (markers.length === 0) {
      console.warn("No valid markers available.");
    }

    // Center map based on markers
    const avgLat = markers.length
      ? markers.reduce((sum, marker) => sum + marker.latitude, 0) /
        markers.length
      : DEFAULT_CENTER.lat;

    const avgLng = markers.length
      ? markers.reduce((sum, marker) => sum + marker.longitude, 0) /
        markers.length
      : DEFAULT_CENTER.lng;

    // Initialize the map if it's not already created
    if (!mapInstance.current) {
      mapInstance.current = new window.google.maps.Map(mapRef.current, {
        center: { lat: avgLat, lng: avgLng },
        zoom: markers.length > 0 ? 12 : 10,
        mapTypeId: "hybrid", // Set to satellite view with street labels
      });
    } else {
      mapInstance.current.setCenter({ lat: avgLat, lng: avgLng });
    }
    // Add markers
    const infoWindow = new window.google.maps.InfoWindow();
    markers.forEach((markerData) => {
      const position = { lat: markerData.latitude, lng: markerData.longitude };

      const marker = new window.google.maps.Marker({
        position,
        map: mapInstance.current!,
        title: `${markerData.total_acres} Acres`,
        icon: {
          url: markerImage.src,
          scaledSize: new window.google.maps.Size(30, 30),
        },
      });

      // Add click event to marker
      marker.addListener("click", () => {
        infoWindow.setContent(`
          <div style="font-size: 14px; width: 200px; gap: 10px; font-weight: 500; display: flex; flex-direction: column; justify-content: center; align-items: center;">
          <div style="display: flex; justify-content: center; align-items: center; gap: 10px;">
            <h3>${markerData?.total_acres} Acres</h3>
            -
            <p>₹ ${markerData?.price_per_acre} Lakh / acre</p>
           </div>
        <button style=" background-color: yellow; color: black; border: none; padding: 10px 10px; text-align: center; text-decoration: none; display: inline-block; font-size: 14px; margin-left: 10px; cursor: pointer;">View Details</button>
          </div>
        `);
        infoWindow.open(mapInstance.current!, marker);
      });
    });
  }, [markers]); // Runs only once on mount

  return (
    <div
      ref={mapRef}
      style={{ width: "100%", height: "300px" }}
      className=" rounded-xl"
    />
  );
}
