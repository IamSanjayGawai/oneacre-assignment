"use client";
import React from "react";
import { fetchProperties } from "../lib/api";
import { useEffect } from "react";
import PropertyCard from "./PropertyCard";
import { Property } from "../lib/types";
import { useInView } from "react-intersection-observer";
import { useInfiniteQuery } from "@tanstack/react-query";

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
    queryKey: ["properties"],
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
    },
    initialPageParam: 1,
  });

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      console.log("Fetching next page..."); // Debugging log
      fetchNextPage();
    }
  }, [inView, fetchNextPage, hasNextPage, isFetchingNextPage]);

  if (status === "error") {
    return (
      <div className="bg-red-50 p-4 rounded-md text-red-700 my-4">
        Error loading properties: {error.message}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {data?.pages.map((page, i) =>
        page.results.map((property: Property) => (
          <PropertyCard key={`${property.id}-${i}`} property={property} />
        ))
      )}

      <div
        ref={ref}
        className="col-span-full h-20 flex justify-center items-center"
      >
        {isFetchingNextPage && (
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-yellow-500"></div>
        )}
      </div>
    </div>
  );
};

export default PropertyGrid;
