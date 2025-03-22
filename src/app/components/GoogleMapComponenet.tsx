'use client'

import React from 'react'
import { MapMarker } from '../lib/types'


interface GoogleMapProps {
    markers: MapMarker[]
}

// If no markers are available, the map defaults to Hyderabad's coordinates.

export default function GoogleMapComponenet({markers}: GoogleMapProps) {
  
console.log("Markers in GoogleMapComponenet: ", markers);
  
    return (
    <div>
Google Map 
    </div>
  )
}

