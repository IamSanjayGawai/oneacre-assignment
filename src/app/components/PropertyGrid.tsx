'use client'
import React from 'react'
import {fetchProperties} from '../lib/api'
import { useEffect } from 'react';
import PropertyCard from './PropertyCard';
import { Property } from '../lib/types';
import { useInView } from 'react-intersection-observer';
import { useInfiniteQuery } from '@tanstack/react-query';


const PropertyGrid = () => {
    const { ref, inView } = useInView();

    const {
        data,
        error,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        status,
      } = useInfiniteQuery({
        queryKey: ['properties'],
        queryFn: ({ pageParam = 1 }) => fetchProperties(pageParam),
        getNextPageParam: (lastPage) => {
            console.log("Last Page:", lastPage); // Debugging log
          
            // Ensure `next` exists and is a number
            if (typeof lastPage?.next === "number") {
              console.log("Next Page Number:", lastPage.next); // Debugging log
              return lastPage.next;
            }
          
            console.warn("Invalid next page value:", lastPage.next);
            return undefined; // Stop pagination if `next` is missing or invalid
          }
          ,
          
        initialPageParam: 1,
      });


      useEffect(() => {
        if (inView && hasNextPage && !isFetchingNextPage) {
          console.log("Fetching next page..."); // Debugging log
          fetchNextPage();
        }
      }, [inView, fetchNextPage, hasNextPage, isFetchingNextPage]);


      
  return (
    <div>PropertyGrid</div>
  )
}

export default PropertyGrid