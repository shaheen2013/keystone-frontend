"use client";

import { Skeleton } from "@/components/shadcn/skeleton";

export function AboutOurServiceSkeleton() {
  return (
    <section className="py-12 md:py-28 bg-white">
      <div className="container grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12">
        {/* Text Content Skeleton */}
        <div className="flex flex-col items-start justify-center">
          <Skeleton className="h-8 md:h-12 w-3/4 mb-4 md:mb-6" />
          <Skeleton className="h-4 md:h-5 w-full mb-2" />
          <Skeleton className="h-4 md:h-5 w-full mb-2" />
          <Skeleton className="h-4 md:h-5 w-full mb-2" />
          <Skeleton className="h-4 md:h-5 w-full mb-2" />
          <Skeleton className="h-4 md:h-5 w-full mb-2" />
        </div>

        {/* Video Player Skeleton */}
        <div className="max-w-[776px] w-full h-60 md:h-[400px] bg-gray-200 rounded-lg overflow-hidden">
          <div className="w-full h-full flex items-center justify-center">
            <Skeleton className="h-12 w-12 rounded-full" />{" "}
            {/* Play button placeholder */}
          </div>
        </div>
      </div>
    </section>
  );
}
