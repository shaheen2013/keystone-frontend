import { Skeleton } from "@/components/shadcn/skeleton";
import React from "react";

export const OurImpactSkeleton = () => {
  return (
    <div className="container lg:py-28 py-12">
      {/* Title Skeleton */}
      <Skeleton className="mx-auto h-8 w-2/4 lg:h-12 lg:mb-6 mb-4" />

      {/* Subtitle Skeleton */}
      <Skeleton className="mx-auto h-5 w-4/6 lg:h-7 lg:mb-12 mb-6" />

      {/* Stats Grid Skeleton */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        {Array.from({ length: 4 }).map((_, index) => (
          <div className="lg:p-8 p-4 bg-primary-2 rounded-xl" key={index}>
            <Skeleton className="h-10 w-3/4 lg:h-14 lg:mb-4 mb-3" />
            <Skeleton className="h-5 w-full" />
          </div>
        ))}
      </div>
    </div>
  );
};
