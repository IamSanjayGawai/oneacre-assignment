'use client'
import React from 'react'
import {fetchProperties} from '../lib/api'
import { useEffect, useState } from 'react';

const PropertyGrid = () => {
    useEffect(() => {
        async function loadProperties() {
            try{
                const data = await fetchProperties();
                console.log("Property data testing",data);
            }
            catch(error) {
                console.error("Failed to fetch properties", error);
            }
        }
        loadProperties();
    }
    , []);
  return (
    <div>PropertyGrid</div>
  )
}

export default PropertyGrid