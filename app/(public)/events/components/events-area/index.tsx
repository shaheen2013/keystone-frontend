"use client";

import React, { useState } from "react";
import { EventContentArg } from "@fullcalendar/core";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { eventTypes, INITIAL_EVENTS, services } from "./constant";
import { Button } from "@/components/shadcn/button";
import { Checkbox } from "@/components/shadcn/checkbox";
import { Label } from "@/components/shadcn/label";
import { Input } from "@/components/shadcn/input";
import { Search } from "@/components/icons";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDebounceCallback } from "usehooks-ts";
import PaginationWrapper from "@/components/partials/pagination-wrapper";
import { allUpcomingEventsData, events } from "../../constant";
import EventCard from "@/components/shadcn/event-card";
import ExploreRecommendEvents from "@/components/partials/explore-recommend-events";
import AllUpComingEvents from "../all-upcoming-events";
import SearchDrawer from "./components/search-drawer";
import FilterDrawer from "./components/filter-drawer";

const EventsArea = () => {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [search, setSearch] = useState(searchParams.get("search") || "");
  const [page, setPage] = useState(searchParams.get("page") || 1);

  console.log(searchParams.get("type"));

  // Debounced search value
  const debouncedSearch = useDebounceCallback((value: string) => {
    setSearch(value);
    updateUrlParams("event", value);
  }, 50);

  // Function to update URL parameters
  const updateUrlParams = (key: string, value: string | null) => {
    const params = new URLSearchParams(searchParams.toString());

    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }

    router.push(`?${params.toString()}`, { scroll: false });
  };

  function updateUrlsParamsFilter(key: string, value: string | null) {
    const searchParams = new URLSearchParams(window.location.search);

    if (!value) return; // Prevent null values

    // Get existing values for the key
    let values = searchParams.getAll(key);

    if (values.includes(value)) {
      // Remove value if already present (unchecked)
      values = values.filter((v) => v !== value);
    } else {
      // Add value if not present (checked)
      values.push(value);
    }

    // Reset the key and update with new values
    searchParams.delete(key);
    values.forEach((v) => searchParams.append(key, v));

    // Push the updated URL
    router.push(`${pathname}?${searchParams.toString()}`, { scroll: false });
  }

  const handleEventClick = (info: any) => {
    console.log("Event Clicked", info);
  };

  const handleEvents = () => {};

  const handleResetFilter = () => {
    const searchParams = new URLSearchParams(window.location.search);

    // Keep "page" and "event", remove "type" and "service"
    searchParams.delete("type");
    searchParams.delete("service");

    // Push updated URL
    router.push(`${pathname}?${searchParams.toString()}`, { scroll: false });
  };

  const handleDateClick = (info: any) => {
    console.log("Date Clicked", info);

    const selectedDate = info.dateStr;
    const eventsOnDate = INITIAL_EVENTS.filter((event) =>
      event?.start?.includes(selectedDate)
    );
  };

  return (
    <>
      <section className="py-12 md:py-28">
        <div className="container flex flex-col gap-6 md:gap-12">
          <div className="flex justify-between items-center gap-4 md:gap-8">
            <h3 className="text-2xl md:text-4xl font-semibold text-gray-9 ">
              {search ? "Search Results" : "Upcoming Events"}
            </h3>
            <Input
              placeholder="Search by event name"
              classes={{ root: "hidden md:block w-7/12 justify-self-end" }}
              endIcon={<Search className="text-gray-7" />}
              value={search}
              onChange={(event) => debouncedSearch(event.target.value)}
            />
            <div className="flex gap-2 md:hidden">
              <SearchDrawer search={search} setSearch={setSearch} />
              <FilterDrawer />
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
              <div className="m-6 bg-white rounded-xl">
                <div className="flex flex-col">
                  <h3 className="text-gray-9 text-lg font-semibold px-5 py-3">
                    Event Type
                  </h3>
                  <hr className="border-gray-2" />
                  {eventTypes.map((eventType, index) => (
                    <div
                      key={index}
                      className="flex items-center space-x-2 px-5 py-3"
                    >
                      <Checkbox
                        id={eventType}
                        checked={searchParams
                          .getAll("type")
                          .includes(eventType)}
                        onCheckedChange={() =>
                          updateUrlsParamsFilter("type", eventType)
                        }
                        variant="secondary"
                      />
                      <Label
                        htmlFor={eventType}
                        className="text-lg text-gray-500"
                      >
                        {eventType}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="m-6 bg-white rounded-xl">
                <div className="flex flex-col">
                  <h3 className="text-gray-9 text-lg font-semibold px-5 py-3">
                    Services
                  </h3>
                  <hr className="border-gray-2" />
                  {services.map((service, index) => (
                    <div
                      key={index}
                      className="flex items-center space-x-2 px-5 py-3"
                    >
                      <Checkbox
                        id={service}
                        variant="secondary"
                        checked={searchParams
                          .getAll("service")
                          .includes(service)}
                        onCheckedChange={() =>
                          updateUrlsParamsFilter("service", service)
                        }
                      />
                      <Label htmlFor={service} className="text-lg text-gray-5">
                        {service}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* calender area */}
            {!search && (
              <FullCalendar
                plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                headerToolbar={{
                  left: "prev,next",
                  center: "title",
                  right: "dayGridMonth,timeGridWeek,timeGridDay",
                }}
                height="auto"
                initialView="dayGridMonth"
                selectable={true}
                dayMaxEvents={true}
                initialEvents={INITIAL_EVENTS}
                eventContent={renderEventContent}
                eventClick={handleEventClick}
                eventsSet={handleEvents}
                eventTextColor="#2B2B2B"
                dateClick={handleDateClick}
              />
            )}
            <div className="block md:hidden">
              <div className="flex flex-col gap-3">
                <span className="text-gray-9 font-semibold text-base">
                  April 09 @ 5:30pm - 9:30pm
                </span>
                <p className="bg-secondary-4 rounded-md px-4 py-2 text-gray-9 text-sm font-medium text-center">
                  Webminar
                </p>
              </div>
            </div>
            {search && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                {events.map((event: any, index: any) => (
                  <EventCard
                    event={event}
                    key={index}
                    className="bg-primary-2"
                  />
                ))}
                <PaginationWrapper
                  page={page}
                  setPage={setPage}
                  total={30}
                  className="col-span-full"
                />
              </div>
            )}
          </div>
        </div>
      </section>
      {search && <ExploreRecommendEvents />}
      {!search && <AllUpComingEvents data={allUpcomingEventsData} />}
    </>
  );
};

function renderEventContent(eventContent: EventContentArg) {
  return (
    <div className="hidden md:block">
      <span>{eventContent.timeText}</span>
      <span>{eventContent.event.title}</span>
      {/* <span className="bg-secondary-4 rounded-md py-1 px-3 text-gray-9 text-sm font-semibold">
        {eventContent.event.title}
      </span> */}
    </div>
  );
}

export default EventsArea;
