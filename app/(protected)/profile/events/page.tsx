"use client";

import { Suspense, useState } from "react";
import Link from "next/link";
import moment from "moment";
import { cn } from "@/lib/utils";
import Zoom from "@/components/icons/Zoom";
import PaginationWrapper from "@/components/partials/pagination-wrapper";
import { PaginationSkeleton } from "@/components/skeletons";
import { useGetJoinedEventsQuery } from "@/features/public/eventSlice";
import { PAGINATION_LIMIT, USER_EVENTS_LIMIT } from "@/lib/constants";
import EventCardSkeleton from "./components/skeletons";

export default function AccountEvents() {
  const [page, setPage] = useState(1);
  const { data, isFetching, isLoading, error }: any = useGetJoinedEventsQuery({
    page,
    pagi_limit: PAGINATION_LIMIT,
  });

  const loading = isLoading || isFetching;
  const joinedEvents = data?.data?.joined_events?.data || [];
  const totalJoinedEvents = data?.data?.joined_events?.total || 0;

  const formatEventDates = (start: string, end: string) => {
    const startMoment = moment(start);
    const endMoment = moment(end);

    if (startMoment.isSame(endMoment, "day")) {
      return `${startMoment.format("ddd, MMM D [at] h:mm A")} - ${endMoment.format("h:mm A")}`;
    }
    return `${startMoment.format("ddd, MMM D [at] h:mm A")} - ${endMoment.format("ddd, MMM D [at] h:mm A")}`;
  };

  const isEventActive = (endDate: string) => moment(endDate).isAfter(moment());

  const renderEventStatus = (event: any) => {
    if (event.status !== "Published") {
      return (
        <>
          <p className="text-gray-5 lg:text-xl text-sm font-medium">Canceled</p>
          <Zoom className="w-10 h-10 opacity-50 transition-opacity grayscale-[1]" />
        </>
      );
    }

    if (!isEventActive(event.end_date)) {
      return (
        <>
          <p className="text-gray-5 lg:text-xl text-sm font-medium">Ended</p>
          <Zoom className="w-10 h-10 opacity-50 transition-opacity grayscale-[1]" />
        </>
      );
    }

    return (
      <>
        <p className="text-secondary-6 lg:text-xl text-sm font-medium">
          {formatEventDates(event.start_date, event.end_date)}
        </p>
        <Link
          href={event.meeting_link}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Join ${event.name} Zoom meeting`}
          className="hover:opacity-80 transition-opacity"
        >
          <Zoom className="w-10 h-10 cursor-pointer" />
        </Link>
      </>
    );
  };

  return (
    <div className="bg-primary-1 rounded-2xl">
      <div className="font-semibold lg:text-2xl text-lg lg:py-6 lg:px-8 p-4 bg-primary-2 rounded-t-2xl">
        Events
      </div>

      <div className="lg:p-8 p-4">
        <div className="flex flex-col gap-6 mb-4 md:mb-6">
          {error ? (
            <div className="text-red-500 text-center">Error loading events</div>
          ) : loading ? (
            Array.from({ length: USER_EVENTS_LIMIT }).map((_, index) => (
              <EventCardSkeleton key={`skeleton-${index}`} />
            ))
          ) : joinedEvents.length > 0 ? (
            joinedEvents.map((event: any) => (
              <div
                key={event.id}
                className="bg-white lg:p-6 py-3 px-4 rounded-xl border border-primary-2 flex md:flex-row flex-col gap-4 justify-between"
              >
                <p
                  className={cn(
                    "lg:text-xl text-sm font-medium",
                    event.status === "Published" &&
                      isEventActive(event.end_date)
                      ? "text-gray-9"
                      : "text-gray-5"
                  )}
                >
                  {event.name}
                </p>

                <div className="flex gap-4 items-center justify-between">
                  <div className="w-full flex gap-12 items-center justify-between">
                    {renderEventStatus(event)}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center">No events found</div>
          )}
        </div>

        {totalJoinedEvents > PAGINATION_LIMIT && (
          <hr className="bg-primary-2 mb-4 md:mb-7" />
        )}

        <Suspense fallback={<div className="h-10" />}>
          {loading ? (
            <PaginationSkeleton className="mt-4 col-span-full text-center" />
          ) : (
            totalJoinedEvents > PAGINATION_LIMIT && (
              <PaginationWrapper
                page={page}
                setPage={setPage}
                total={totalJoinedEvents}
                limit={PAGINATION_LIMIT}
                className="col-span-full"
              />
            )
          )}
        </Suspense>
      </div>
    </div>
  );
}
