'use client'

import React, { use } from 'react'
import {fetchMapMarkers} from '../lib/api'
import { useEffect } from 'react';
import GoogleMapComponenet from './GoogleMapComponenet';
import Script from 'next/script';
import { useState } from 'react';
import { MapMarker } from '../lib/types';


const MAP_API_KEY = process.env.NEXT_PUBLIC_MAP_API_KEY;

const PropertyMap = ({}) => {
    const [isMapScriptLoaded, setIsMapScriptLoaded] = useState(false);
    const [markers, setMarkers] = useState<MapMarker[]>([]);
    useEffect(() => {
        fetchMapMarkers();
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

      {!isMapScriptLoaded ? (
        <p>Loading Google Maps...</p>
      ) : (
        <GoogleMapComponenet markers={markers} />
      )}
    </div>
  )
}

export default PropertyMap