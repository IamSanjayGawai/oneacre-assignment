import React from 'react'
import { Property } from '../lib/types';
interface PropertyCardProps {
    property: Property | null; // Allow null for loading state
  }
  
  export default function PropertyCard({ property }: PropertyCardProps) {
  return (
    <div>PropertyCard</div>
  )
}

