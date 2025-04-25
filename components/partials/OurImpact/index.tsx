import { Skeleton } from "@/components/shadcn/skeleton";
import React from "react";

export default function OurImpact({
  data,
  loading,
}: {
  data: any;
  loading: boolean;
}) {
  const title = data?.title || "";
  const subtitle = data?.subtitle || "";
  const stats = data?.stats || [];

  return (
    <div className="container lg:py-28 py-12">
      {/* Title */}
      {loading ? (
        <Skeleton className="mx-auto h-8 w-2/4 lg:h-12 lg:mb-6 mb-4" />
      ) : (
        <h2 className="text-center text-gray-9 lg:text-5xl text-2xl font-bold lg:mb-6 mb-4">
          {title}
        </h2>
      )}

      {/* Subtitle */}
      {loading ? (
        <Skeleton className="mx-auto h-5 w-4/6 lg:h-7 lg:mb-12 mb-6" />
      ) : (
        <p className="text-gray-8 text-base lg:text-2xl text-center lg:mb-12 mb-6">
          {subtitle}
        </p>
      )}

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        {loading
          ? Array.from({ length: 4 }).map((_, index) => (
              <div className="lg:p-8 p-4 bg-primary-2 rounded-xl" key={index}>
                <Skeleton className="h-10 w-3/4 lg:h-14 lg:mb-4 mb-3" />
                <Skeleton className="h-5 w-full" />
              </div>
            ))
          : stats.map((stat: any, index: number) => (
              <div className="lg:p-8 p-4 bg-primary-2 rounded-xl" key={index}>
                <h2 className="text-gray-9 font-bold lg:text-5xl text-3xl lg:mb-4 mb-3">
                  {stat.counter}
                </h2>
                <p className="text-gray-900 lg:text-base text-sm">
                  {stat.label}
                </p>
              </div>
            ))}
      </div>
    </div>
  );
}
