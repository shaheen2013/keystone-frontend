import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import { INITIAL_EVENTS } from "../../constant";
import { EventContentArg } from "@fullcalendar/core";
const CalenderView = () => {
    
  const handleEventClick = (clickInfo: any) => {
    console.log("Event Clicked", clickInfo.event.id);
  };

  const handleEvents = () => {};

  const handleDateClick = (info: any) => {
    console.log("Date Clicked", info);

    // const selectedDate = info.dateStr;
    // const eventsOnDate = INITIAL_EVENTS.filter((event) =>
    //   event?.start?.includes(selectedDate)
    // );
  };
    return (
        <>
           {/* calender area */}
          
              <FullCalendar
                plugins={[dayGridPlugin]}
                headerToolbar={{
                  left: "prev",
                  center: "title",
                  right: "next",
                }}
                height="820px"
                initialView="dayGridMonth"
                selectable={true}
                dayMaxEvents={true}
                initialEvents={INITIAL_EVENTS}
                eventContent={renderEventContent}
                eventClick={handleEventClick}
                eventsSet={handleEvents}
                eventTextColor="#2B2B2B"
                datesSet={handleDateClick}
              />
            
            {/* mobile view */}
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
        </>
    );
}
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

export default CalenderView