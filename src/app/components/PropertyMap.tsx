'use client'

import React, { use } from 'react'
import {fetchMapMarkers} from '../lib/api'
import { useEffect } from 'react';
import GoogleMapComponenet from './GoogleMapComponenet';
import Script from 'next/script';
import { useState } from 'react';


const MAP_API_KEY = process.env.NEXT_PUBLIC_MAP_API_KEY;

const PropertyMap = ({}) => {
    const [isMapLoaded, setIsMapLoaded] = useState(false);

    useEffect(() => {
        fetchMapMarkers();
    }, []);


  return (
    <div className="relative">
      {/* Load Google Maps Script */}
      {!isMapLoaded && MAP_API_KEY && (
        <Script
          src={`https://maps.googleapis.com/maps/api/js?key=${MAP_API_KEY}&libraries=places`}
          onLoad={() => setIsMapLoaded(true)}
          strategy="lazyOnload"
        />
      )}

      {!isMapLoaded ? (
        <p>Loading Google Maps...</p>
      ) : (
        <p>Google Maps loaded successfully!</p>
      )}
    </div>
  )
}

export default PropertyMap