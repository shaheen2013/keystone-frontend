"use client";

import { Skeleton } from "@/components/shadcn/skeleton";
import Toolkit from "@/components/shadcn/toolkit";
import { ToolkitSkeleton } from "@/components/skeletons/toolkit-skeleton";
import { useGetResourcesQuery } from "@/features/public/resourcesSlice";
import { TOOLKIT_LIMIT } from "@/lib/constants";

const Toolkits = () => {
  const { data, isLoading, isFetching }: any = useGetResourcesQuery({
    limit: TOOLKIT_LIMIT,
  });

  const loading = isLoading || isFetching;
  const resources = data?.data?.resources || [];
  return (
    <section className="py-12 md:py-28 bg-white">
      <div className="container flex flex-col gap-6 md:gap-12">
        <div className="flex flex-col items-center gap-4 md:gap-6">
          {loading ? (
            <Skeleton className="h-8 md:h-14 w-3/4 md:w-1/2" />
          ) : (
            <h3 className="text-gray-9 text-2xl md:text-5xl font-bold text-center">
              Download Toolkits and Checklists
            </h3>
          )}
          {loading ? (
            <Skeleton className="h-6 md:h-8 w-5/6 md:w-2/3" />
          ) : (
            <span className="text-gray-8 text-base md:text-xl">
              Download PDF Recourse
            </span>
          )}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 justify-center items-center gap-4 md:gap-8">
          {loading ? (
            Array.from({ length: TOOLKIT_LIMIT }).map((_, index) => (
              <ToolkitSkeleton key={`skeleton-${index}`} />
            ))
          ) : resources?.length > 0 ? (
            resources.map((toolkit: any, index: number) => (
              <Toolkit key={index} data={toolkit} />
            ))
          ) : (
            <div className="col-span-full text-center text-gray-600">
              <p>No resources found</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Toolkits;
