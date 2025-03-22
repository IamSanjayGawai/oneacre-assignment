'use client'

import React, { use } from 'react'
import {fetchMapMarkers} from '../lib/api'
import { useEffect } from 'react';

const PropertyMap = () => {
    useEffect(() => {
        fetchMapMarkers();
    }, []);
  return (
    <div></div>
  )
}

export default PropertyMap