"use client";

import PaginationWrapper from "@/components/partials/pagination-wrapper";
import EventCard from "@/components/shadcn/event-card";
import { Skeleton } from "@/components/shadcn/skeleton";
import { PaginationSkeleton } from "@/components/skeletons";
import EventCardSkeleton from "@/components/skeletons/event-card";
import { useGetEventsQuery } from "@/features/public/eventSlice";
import { PAGINATION_LIMIT } from "@/lib/constants";
import { useState } from "react";

const AllUpComingEvents = () => {
  const [page, setPage] = useState(1);
  const { data, isFetching, isLoading }: any = useGetEventsQuery({
    pagi_limit: PAGINATION_LIMIT,
  });

  const loading = isFetching || isLoading;

  const events = data?.data?.events?.data || [];
  const totalEvents = data?.data?.events?.total || 0;
  return (
    <section className="bg-primary-2 py-12 md:py-28">
      <div className="container flex flex-col gap-6 md:gap-12">
        <div className="flex flex-col gap-4 md:gap-6 justify-between items-center w-full max-w-3xl mx-auto">
          {loading ? (
            <>
              <Skeleton className="h-8 md:h-12 w-1/2 mb-2" />
              <div className="space-y-2 w-full">
                <Skeleton className="h-6 md:h-8 w-full" />
              </div>
            </>
          ) : (
            <>
              <h3 className="text-2xl md:text-5xl font-bold text-gray-9 grow">
                All Upcoming Events
              </h3>
              <p className="text-base md:text-2xl text-gray-9 text-center ">
                Stay updated with the latest events and activities. Don’t miss
                out on exciting opportunities to learn, connect, and grow!
              </p>
            </>
          )}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-6">
          {loading ? (
            Array.from({ length: PAGINATION_LIMIT }).map((_, index) => (
              <EventCardSkeleton key={`skeleton-${index}`} />
            ))
          ) : events?.length > 0 ? (
            events.map((event: any, index: any) => (
              <EventCard event={event} key={index} className="bg-white" />
            ))
          ) : (
            <div className="col-span-full text-center">Event not found</div>
          )}
          {/* pagination area */}
          {loading ? (
            <PaginationSkeleton className="mt-4 col-span-full text-center" />
          ) : (
            <>
              {totalEvents > PAGINATION_LIMIT && (
                <PaginationWrapper
                  page={page}
                  setPage={setPage}
                  total={totalEvents}
                  limit={PAGINATION_LIMIT}
                  className="col-span-full"
                />
              )}
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default AllUpComingEvents;
