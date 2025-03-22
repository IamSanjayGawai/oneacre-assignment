import React from 'react'
import { Property } from '../lib/types';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Card, CardContent, CardFooter } from '../components/ui/card';
interface PropertyCardProps {
    property: Property | null; // Allow null for loading state
  }
  
  export default function PropertyCard({ property }: PropertyCardProps) {
    const [liked, setLiked] = useState(false);
  const [loading, setLoading] = useState(true);

   // Extract images from API response
   const images =
   property?.land_media?.map((media: { image: any }) => media.image).filter(Boolean) || [];
 const placeholderImages = ['/placeholder-land-1.jpg', '/placeholder-land-2.jpg'];
 const propertyImages = images.length > 0 ? images : placeholderImages;

 // Format price and size
 const formatPrice = () => `₹ ${property?.price_per_acre || 0} ${property?.price_type || 'lakhs'}/acre`;
 const formatSize = () => {
   if (!property?.land_size?.total_land_size_in_acres) return 'Unknown Size';
   const { acres, cents, guntas } = property.land_size.total_land_size_in_acres;
   return `${acres || 0} Acres${guntas ? ` ${guntas} Guntas` : ''}${cents ? ` ${cents} Cents` : ''}`;
 };

 // Format location
 const formatLocation = () => {
   if (!property?.slug) return 'Unknown Location';
   const parts = property.slug.split('/');
   const state = parts[0] || 'Unknown State';
   const district = parts[2] || 'Unknown District';
   const village = parts[4] || '';
   return `${state}, ${district}${village ? `, ${village}` : ''}`;
 };
    return (
 
        <Card className="overflow-hidden h-full flex flex-col shadow-2xl rounded-2xl border-0">
        <CardContent className="p-0">
        {propertyImages.map((image: string, index:  null | undefined) => (
            
            <div key={index} className="relative h-48 w-full">
                  <Image

                    src={image}
                    alt="Property Image"
                    layout="fill"
                   
                  />
                </div>
                            ))}

</CardContent>
<CardFooter className="flex flex-col items-start p-4 gap-2">
            <h2 className="text-xl font-semibold">   {formatPrice()} • {formatSize()}</h2>
  
            <p className="text-gray-800 font-bold">
            {formatLocation()}
            </p>
     
        </CardFooter>
    </Card>
  )
}

