'use client'

import React, { useEffect, useRef } from 'react'
import { MapMarker } from '../lib/types'


interface GoogleMapProps {
    markers: MapMarker[]
}

const DEFAULT_CENTER = { lat: 17.3850, lng: 78.4867 }; // Hyderabad
export default function GoogleMapComponent() {
    const mapRef = useRef<HTMLDivElement | null>(null);
    const mapInstance = useRef<google.maps.Map | null>(null);
  
    useEffect(() => {
      if (!mapRef.current || !window.google || !window.google.maps) {
        console.warn("Google Maps API not loaded");
        return;
      }
  
      // Initialize the map if it's not already created
      if (!mapInstance.current) {
        mapInstance.current = new window.google.maps.Map(mapRef.current, {
          center: DEFAULT_CENTER, // Hyderabad coordinates
          zoom: 10,
        });
      }
    }, []); // Runs only once on mount
  
    return <div ref={mapRef} style={{ width: '100%', height: '300px' }} />;
  }