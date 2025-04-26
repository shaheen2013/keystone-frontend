"use client";

import React, { useState } from "react";
import { Button } from "@/components/shadcn/button";
import { Input } from "@/components/shadcn/input";
import { Search } from "@/components/icons";
import PaginationWrapper from "@/components/partials/pagination-wrapper";
import EventCard from "@/components/shadcn/event-card";
import ExploreEvents from "@/components/partials/explore-events";
import AllUpComingEvents from "../all-upcoming-events";
import SearchDrawer from "./components/search-drawer";
import FilterDrawer from "./components/filter-drawer";
import { useDebounceCallback } from "usehooks-ts";
import { PAGINATION_LIMIT } from "@/lib/constants";
import { useGetEventsQuery } from "@/features/public/eventSlice";
import EventTypes from "./components/event-type";
import Services from "./components/services";
import CalenderView from "./components/calender-view";
import NotFound from "@/components/partials/not-found";

const EventsArea = () => {
  const [inputValue, setInputValue] = useState("");

  // State for filters
  const [search, setSearch] = useState("");
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [selectedEventTypes, setSelectedEventTypes] = useState<string[]>([]);
  const [page, setPage] = useState(1);

  const isFiltered =
    search || selectedServices?.length || selectedEventTypes?.length;

  console.log("isFiltered", isFiltered);  

  // Debounce the search input with 500ms delay
  const debouncedSearch = useDebounceCallback(setSearch, 500);

  // Fetch blogs data using state values

  const { data, isLoading, isFetching }: any = useGetEventsQuery({
    query: search,
    page: page,
    pagi_limit: PAGINATION_LIMIT,
    service_ids: selectedServices,
    event_type_ids: selectedEventTypes,
  },{
    skip: !isFiltered
  });

   // eslint-disable-next-line @typescript-eslint/no-unused-vars
   const loading = isFetching || isLoading;

   const filteredEvents = data?.data?.events?.data || [];


   console.log("filteredEvents", filteredEvents);
 
   const filteredEventsCount = data?.data?.events?.total || 0;

  // Debounced search value
  const handleSearch = (value: string) => {
    setInputValue(value);
    debouncedSearch(value);
    setPage(1);
  };

  const handleResetFilter = () => {
    setSearch("");
    setSelectedServices([]);
    setSelectedEventTypes([]);
  };

  return (
    <>
      <section className="py-12 md:py-28">
        <div className="container flex flex-col gap-6 md:gap-12">
          <div className="flex justify-between items-center gap-4 md:gap-8">
            <h3 className="text-2xl md:text-4xl font-semibold text-gray-9 ">
              {isFiltered ? "Search Results" : "Upcoming Events"}
            </h3>
            <Input
              placeholder="Search by event name"
              classes={{ root: "hidden md:block w-7/12 justify-self-end" }}
              endIcon={<Search className="text-gray-7" />}
              value={inputValue}
              onChange={(event) => handleSearch(event.target.value)}
            />
            <div className="flex gap-2 md:hidden">
              <SearchDrawer
               setSearch={setSearch}
              />
              <FilterDrawer selectedServices={selectedServices} setSelectedServices={setSelectedServices} selectedEventTypes={selectedEventTypes} setSelectedEventTypes={setSelectedEventTypes}
              handleResetFilter={handleResetFilter}
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-[1fr_3fr] gap-4 md:gap-8 items-start">
            {/* {renderSidebar(weekendsVisible, handleWeekendsToggle, currentEvents)} */}
            {/* filter area */}
            <div className="hidden md:block bg-primary-1 rounded-xl overflow-hidden">
              <div className="p-6 bg-primary-2 flex items-center justify-between ">
                <h3 className="text-gray-9 text-2xl font-semibold">Filter</h3>
                <Button
                  className="text-secondary-6 hover:bg-primary-1 hover:text-secondary-6"
                  variant="ghost"
                  onClick={handleResetFilter}
                >
                  Reset
                </Button>
              </div>
               <EventTypes selectedEventTypes={selectedEventTypes} setSelectedEventTypes={setSelectedEventTypes}/>
               <Services selectedServices={selectedServices} setSelectedServices={setSelectedServices}/>
            </div>
            {
              !isFiltered && (
                <CalenderView />
              )
            }
           
            {isFiltered && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                {
                  filteredEvents.length === 0 && (
                    <div className="col-span-full">
                    <NotFound data={{title: "No Results Found", description: "No events found matching your search criteria."}} />
                    </div>
                  )
                }
                {filteredEvents?.map((event: any, index: any) => (
                  <EventCard
                    event={event}
                    key={index}
                    className="bg-primary-2"
                  />
                ))}
                {filteredEventsCount > PAGINATION_LIMIT && (
                  <PaginationWrapper
                    page={page}
                    setPage={setPage}
                    total={filteredEventsCount}
                    limit={PAGINATION_LIMIT}
                    className="col-span-full"
                  />
                )}
              </div>
            )}
          </div>
        </div>
      </section>
      {isFiltered && (
        <ExploreEvents title="Explore Recommended Events" isRecommended />
      )}
      {!isFiltered && <AllUpComingEvents />}
    </>
  );
};



export default EventsArea;
