"use client";

import React from "react";
import { EventContentArg } from "@fullcalendar/core";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { INITIAL_EVENTS } from "./constant";
import { Button } from "@/components/shadcn/button";
import { Checkbox } from "@/components/shadcn/checkbox";
import { Label } from "@/components/shadcn/label";
import { Input } from "@/components/shadcn/input";
import { Search } from "@/components/icons";

const EventsCalender = () => {
  const handleEventClick = () => {};

  const handleEvents = () => {};

  return (
    <section className="py-12 md:py-28">
      <div className="container flex flex-col gap-6 md:gap-12">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_3fr] gap-4 md:gap-8">
          <h3 className="text-4xl font-semibold text-gray-9">
            Upcoming Events
          </h3>
          <Input
            placeholder="Search by event name"
            classes={{ root: "w-full md:w-9/12 justify-self-end" }}
            endIcon={<Search className="text-gray-7" />}
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-[1fr_3fr] gap-4 md:gap-8 ">
          {/* {renderSidebar(weekendsVisible, handleWeekendsToggle, currentEvents)} */}
          {/* filter area */}
          <div className="bg-primary-1 rounded-xl overflow-hidden">
            <div className="p-6 bg-primary-2 flex items-center justify-between ">
              <h3 className="text-gray-9 text-2xl font-semibold">Filter</h3>
              <Button className="text-secondary-6" variant="outline">
                Reset
              </Button>
            </div>
            <div className="m-6 bg-white rounded-xl">
              <div className="flex flex-col">
                <h3 className="text-gray-9 text-lg font-semibold px-5 py-3">
                  Event Type
                </h3>
                <hr className="border-gray-2" />
                <div className="flex items-center space-x-2 px-5 py-3">
                  <Checkbox id="live-webinar" />
                  <Label htmlFor="live-webinar" className="text-lg text-gray-5">
                    Live Webinar
                  </Label>
                </div>
                <div className="flex items-center space-x-2 px-5 py-3">
                  <Checkbox id="on-demand-workshop" />
                  <Label
                    htmlFor="on-demand-workshop"
                    className="text-lg text-gray-5"
                  >
                    On-Demand Workshop
                  </Label>
                </div>
                <div className="flex items-center space-x-2 px-5 py-3">
                  <Checkbox id="virtual-support-group" />
                  <Label
                    htmlFor="virtual-support-group"
                    className="text-lg text-gray-5"
                  >
                    Virtual Support Group
                  </Label>
                </div>
              </div>
            </div>

            <div className="m-6 bg-white rounded-xl">
              <div className="flex flex-col">
                <h3 className="text-gray-9 text-lg font-semibold px-5 py-3">
                  Services
                </h3>
                <hr className="border-gray-2" />
                <div className="flex items-center space-x-2 px-5 py-3">
                  <Checkbox id="live-webinar" />
                  <Label htmlFor="live-webinar" className="text-lg text-gray-5">
                    Live Webinar
                  </Label>
                </div>
                <div className="flex items-center space-x-2 px-5 py-3">
                  <Checkbox id="on-demand-workshop" />
                  <Label
                    htmlFor="on-demand-workshop"
                    className="text-lg text-gray-5"
                  >
                    On-Demand Workshop
                  </Label>
                </div>
                <div className="flex items-center space-x-2 px-5 py-3">
                  <Checkbox id="virtual-support-group" />
                  <Label
                    htmlFor="virtual-support-group"
                    className="text-lg text-gray-5"
                  >
                    Virtual Support Group
                  </Label>
                </div>
              </div>
            </div>
          </div>

          <FullCalendar
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            headerToolbar={{
              left: "prev,next",
              center: "title",
              right: "dayGridMonth,timeGridWeek,timeGridDay",
            }}
            // customButtons={{
            //   prev: {
            //     text: "Prev",
            //     click: () => {
            //       handlePrevClick();
            //     },
            //   },
            //   next: {
            //     text: "Next",
            //     click: () => {
            //       handleNextClick();
            //     },
            //   },
            // }}
            height="700px"
            initialView="dayGridMonth"
            selectable={true}
            dayMaxEvents={true}
            initialEvents={INITIAL_EVENTS}
            eventContent={renderEventContent}
            eventClick={handleEventClick}
            eventsSet={handleEvents}
          />
        </div>
      </div>
    </section>
  );
};

function renderEventContent(eventContent: EventContentArg) {
  return (
    <>
      <b>{eventContent.timeText}</b>
      <i>{eventContent.event.title}</i>
    </>
  );
}

export default EventsCalender;
