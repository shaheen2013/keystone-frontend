"use client";

import PaginationWrapper from "@/components/partials/pagination-wrapper";
import { Suspense, useState } from "react";

export default function AccountEvents() {
  const [page, setPage] = useState(1);
  type Event = {
    name: string;
    time: string;
    type: "cancelled" | "ended" | "ongoing";
  };

  const events: Event[] = [
    { name: "Event 1", time: "06:00 PM - 06:30 PM", type: "ongoing" },
    { name: "Event 2", time: "06:00 PM - 06:30 PM", type: "ongoing" },
    { name: "Event 3", time: "06:00 PM - 06:30 PM", type: "ongoing" },
    { name: "Event 4", time: "", type: "cancelled" },
    { name: "Event 5", time: "", type: "ended" },
    { name: "Event 6", time: "", type: "ended" },
  ];

  return (
    <div className="bg-primary-1 rounded-2xl">
      <div className="font-semibold lg:text-2xl text-lg lg:py-6 lg:px-8 p-4  bg-primary-2 rounded-t-2xl">
        Events
      </div>

      {/* content */}
      <div className="lg:p-8 p-4">
        {/* events */}
        <div className="flex flex-col gap-6 mb-4 md:mb-6">
          {events.map((event, index) => {
            return (
              <div
                key={index}
                className="bg-white lg:p-6 py-3 px-4 rounded-xl border border-primary-2 flex justify-between hover:border-secondary-4"
              >
                <div>
                  <p className="lg:text-xl text-sm font-medium">{event.name}</p>
                </div>

                <div>
                  {event.type == "ongoing" && (
                    <p className="text-secondary-6 lg:text-xl text-sm font-medium">
                      06:00 PM - 06:30 PM
                    </p>
                  )}

                  {event.type == "ended" && (
                    <p className="text-gray-5 lg:text-xl text-sm font-medium">
                      Ended
                    </p>
                  )}

                  {event.type == "cancelled" && (
                    <p className="text-[#FDB022] lg:text-xl text-sm font-medium">
                      Event Canceled
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        <hr className="bg-primary-2 mb-4 md:mb-7" />
        {/* pagination area */}
        <Suspense fallback={<div className="h-10" />}>
          <PaginationWrapper
            page={page}
            setPage={setPage}
            total={200}
            className="col-span-full"
          />
        </Suspense>
      </div>
    </div>
  );
}
