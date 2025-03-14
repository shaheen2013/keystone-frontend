"use client";

import PaginationWrapper from "@/components/partials/pagination-wrapper";
import EventCard from "@/components/shadcn/event-card";
import { useState } from "react";

const AllUpComingEvents = ({ data }: { data: any }) => {
  const { title, description, events } = data;
  const [page, setPage] = useState(1);
  return (
    <section className="bg-primary-2 py-12 md:py-28">
      <div className="container flex flex-col gap-6 md:gap-12">
        <div className="flex flex-col gap-4 md:gap-6 justify-between items-center max-w-3xl mx-auto">
          <h3 className="text-2xl md:text-5xl font-bold text-gray-9 grow">
            {title}
          </h3>
          <p className="text-base md:text-2xl text-gray-9 text-center ">
            {description}
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-6">
          {events.map((event: any, index: any) => (
            <EventCard event={event} key={index} className="bg-white" />
          ))}
          <PaginationWrapper
            page={page}
            setPage={setPage}
            total={200}
            className="col-span-full"
          />
        </div>
      </div>
    </section>
  );
};

export default AllUpComingEvents;
