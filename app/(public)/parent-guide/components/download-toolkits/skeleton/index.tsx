"use client";

import { Skeleton } from "@/components/shadcn/skeleton";
import { ToolkitSkeleton } from "@/components/skeletons/toolkit-skeleton";
import { TOOLKIT_LIMIT } from "@/lib/constants";

export const ToolkitsSkeleton = () => {
  return (
    <section className="py-12 md:py-28 bg-white">
      <div className="container flex flex-col gap-6 md:gap-12">
        <div className="flex flex-col items-center gap-4 md:gap-6">
          {/* Title Skeleton */}
          <Skeleton className="h-8 md:h-14 w-3/4 md:w-1/2" />
          {/* Subtitle Skeleton */}
          <Skeleton className="h-6 md:h-8 w-5/6 md:w-2/3" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 justify-center items-center gap-4 md:gap-8">
          {Array.from({ length: TOOLKIT_LIMIT }).map((_, index) => (
            <ToolkitSkeleton key={`skeleton-${index}`} />
          ))}
        </div>
      </div>
    </section>
  );
};
