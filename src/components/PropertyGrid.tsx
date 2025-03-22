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
    isLoading, // Add isLoading state
  } = useInfiniteQuery({
    queryKey: ["properties"],
    queryFn: ({ pageParam = 1 }) => fetchProperties(pageParam),
    getNextPageParam: (lastPage) => lastPage?.next ?? undefined,
    initialPageParam: 1,
  });

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
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
      {/* Show skeleton when loading */}
      {isLoading &&
        Array.from({ length: 12 }).map((_, i) => (
          <PropertyCard key={`skeleton-${i}`} property={null} loading={true} />
        ))}

      {/* Show properties */}
      {data?.pages.map((page, i) =>
        page.results.map((property: Property) => (
          <PropertyCard key={`${property.id}-${i}`} property={property} loading={false} />
        ))
      )}

      {/* Loading Indicator */}
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
