'use client'

import React, { useEffect, useState } from 'react'
import { MapMarker } from '../lib/types'


interface GoogleMapProps {
    markers: MapMarker[]
}

// If no markers are available, the map defaults to Hyderabad's coordinates.

export default function GoogleMapComponenet({markers}: GoogleMapProps) {
    const [map, setMap] = React.useState<google.maps.Map | null>(null); //Stores the Google Maps instance.
    const [mapRef, setMapRef] = useState<HTMLDivElement | null>(null); //Stores a reference to the div where the map will be rendered.
  
console.log("Markers in GoogleMapComponenet: ", markers);

useEffect(() => {
    if (mapRef && !map) {
      const initialMap = new google.maps.Map(mapRef, {
        center: { lat: 17.385044, lng: 78.486671 }, // Default to Hyderabad
        zoom: 10,
      });
      setMap(initialMap);
    }
    }, [mapRef, map]);

  
    return (
    <div>
<div ref={setMapRef} style={{ width: '100%', height: '300px' }} />;
    </div>
  )
}

