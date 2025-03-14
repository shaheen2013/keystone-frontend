"use client";

import {
  Pagination,
  PaginationLink,
  PaginationItem,
  PaginationNext,
  PaginationEllipsis,
  PaginationContent,
  PaginationPrevious,
} from "@/components/shadcn/pagination";

export default function AccountEvents() {
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
        <div className="flex flex-col gap-6">
          {events.map((event, index) => {
            return (
              <div
                key={index}
                className="bg-white p-6 rounded-xl border border-primary-2 flex justify-between hover:border-secondary-4"
              >
                <div>
                  <p className=" text-xl font-medium">{event.name}</p>
                </div>
                <div>
                  {event.type == "ongoing" && (
                    <p className="text-secondary-6 text-xl font-medium">
                      06:00 PM - 06:30 PM
                    </p>
                  )}

                  {event.type == "ended" && (
                    <p className="text-gray-5 text-xl font-medium">Ended</p>
                  )}

                  {event.type == "cancelled" && (
                    <p className="text-[#FDB022] text-xl font-medium">
                      Event Canceled
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        <hr className="mt-6 mb-5" />

        {/* pagination */}
        <Pagination>
          <PaginationContent className=" flex w-full justify-center">
            <PaginationItem className="">
              <PaginationPrevious href="#" />
            </PaginationItem>

            <div className="flex w-full justify-center gap-3">
              <PaginationItem>
                <PaginationLink href="#">1</PaginationLink>
              </PaginationItem>

              <PaginationItem>
                <PaginationLink href="#" isActive>
                  2
                </PaginationLink>
              </PaginationItem>

              <PaginationItem>
                <PaginationLink href="#">3</PaginationLink>
              </PaginationItem>

              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
            </div>

            <PaginationItem>
              <PaginationNext href="#" />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
}
