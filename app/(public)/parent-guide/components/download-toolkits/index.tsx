"use client";

import Toolkit from "@/components/shadcn/toolkit";
import { useGetResourcesQuery } from "@/features/public/resourcesSlice";
import { TOOLKIT_LIMIT } from "@/lib/constants";
import { ToolkitsSkeleton } from "./skeleton";

const Toolkits = ({ isShowLoading }: { isShowLoading: boolean }) => {
  const { data, isLoading, isFetching }: any = useGetResourcesQuery({
    limit: TOOLKIT_LIMIT,
  });

  const loading = isLoading || isFetching || isShowLoading;
  const resources = data?.data?.resources || [];

  if (loading) {
    return <ToolkitsSkeleton />;
  }

  return (
    <section className="py-12 md:py-28 bg-white">
      <div className="container flex flex-col gap-6 md:gap-12">
        <div className="flex flex-col items-center gap-4 md:gap-6">
          <h3 className="text-gray-9 text-2xl md:text-5xl font-bold text-center">
            Download Toolkits and Checklists
          </h3>
          <span className="text-gray-8 text-base md:text-xl">
            Download Recourse
          </span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 justify-center items-center gap-4 md:gap-8">
          {resources?.length > 0 ? (
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
