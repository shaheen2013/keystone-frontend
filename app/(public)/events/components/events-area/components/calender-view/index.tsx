// import FullCalendar from "@fullcalendar/react";
// import dayGridPlugin from "@fullcalendar/daygrid";
// import { INITIAL_EVENTS } from "../../constant";
// import { EventContentArg } from "@fullcalendar/core";
// import { useGetEventsQuery } from "@/features/public/eventSlice";
// const CalenderView = () => {

//     const { data, isLoading, isFetching }: any = useGetEventsQuery({
//      limit:12
//     });

//     const events = data?.data?.events || [];

//     const loading = isLoading || isFetching;

//   const handleEventClick = (clickInfo: any) => {
//     console.log("Event Clicked", clickInfo.event.id);
//   };

//   const handleEvents = () => {};

//   const handleDateClick = (info: any) => {
//     console.log("Date Clicked", info);

//     // const selectedDate = info.dateStr;
//     // const eventsOnDate = INITIAL_EVENTS.filter((event) =>
//     //   event?.start?.includes(selectedDate)
//     // );
//   };
//     return (
//         <>
//            {/* calender area */}

//               <FullCalendar
//                 plugins={[dayGridPlugin]}
//                 headerToolbar={{
//                   left: "prev",
//                   center: "title",
//                   right: "next",
//                 }}
//                 height="820px"
//                 initialView="dayGridMonth"
//                 selectable={true}
//                 dayMaxEvents={true}
//                 initialEvents={INITIAL_EVENTS}
//                 eventContent={renderEventContent}
//                 eventClick={handleEventClick}
//                 eventsSet={handleEvents}
//                 eventTextColor="#2B2B2B"
//                 datesSet={handleDateClick}
//               />

//             {/* mobile view */}
//             <div className="block md:hidden">
//               <div className="flex flex-col gap-3">
//                 <span className="text-gray-9 font-semibold text-base">
//                   April 09 @ 5:30pm - 9:30pm
//                 </span>
//                 <p className="bg-secondary-4 rounded-md px-4 py-2 text-gray-9 text-sm font-medium text-center">
//                   Webminar
//                 </p>
//               </div>
//             </div>
//         </>
//     );
// }
// function renderEventContent(eventContent: EventContentArg) {
//   return (
//     <div className="hidden md:block">
//       <span>{eventContent.timeText}</span>
//       <span>{eventContent.event.title}</span>
//       {/* <span className="bg-secondary-4 rounded-md py-1 px-3 text-gray-9 text-sm font-semibold">
//         {eventContent.event.title}
//       </span> */}
//     </div>
//   );
// }

// export default CalenderView


import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction"
import { EventContentArg } from "@fullcalendar/core";
import { useGetEventsQuery } from "@/features/public/eventSlice";
import { useRouter } from "next/navigation";
import moment from "moment";
import { useCallback } from "react";

const CalenderView = () => {
  const router = useRouter();
  const { data, isLoading, isFetching }: any = useGetEventsQuery({ limit: 12 });
  const events = data?.data?.events || [];
  const loading = isLoading || isFetching;

  // Transform API events to FullCalendar format
  const formattedEvents = events.map((event: any) => ({
    id: event.id.toString(),
    title: event.name,
    start: event.start_date,
    end: event.end_date,
    extendedProps: {
      slug: event.slug,
      type: event.event_type_id,
      location: event.location,
      meetingLink: event.meeting_link,
      description: event.short_brief,
      image: event.featured_image?.path
    }
  }));

  // Properly typed event handlers
  const handleEventClick = useCallback((clickInfo:any) => {
    router.push(`/events/${clickInfo.event.extendedProps.slug}`);
  }, []);

  const handleEvents = useCallback((events: any) => {
    console.log("Events loaded", events);
  }, []);

  const handleDateClick = useCallback((info: any) => {
    console.log("Date Clicked", info.dateStr);
  }, []);

  // Memoized event content renderer
  const renderEventContent = useCallback((eventContent: EventContentArg) => {
    return (
      <div className="hidden md:block">
        <span>{eventContent.event.title}</span>
      </div>
    );
  }, []);

  return (
    <>
      {/* Calendar area */}
     
        <FullCalendar
          plugins={[dayGridPlugin, interactionPlugin]}
          headerToolbar={{
            left: "prev",
            center: "title",
            right: "next",
          }}
          height="820px"
          initialView="dayGridMonth"
          selectable={true}
          dayMaxEvents={true}
          events={formattedEvents}
          eventContent={renderEventContent}
          eventClick={handleEventClick}
          eventTextColor="#2B2B2B"
          dateClick={handleDateClick}
        />
    

      {/* Mobile view */}
      <div className="block md:hidden space-y-4">
        {formattedEvents.map((event: any) => (
          <div key={event.id} className="bg-white rounded-lg p-4 shadow">
            <div className="flex flex-col gap-2">
              <span className="text-gray-9 font-semibold text-base">
                {moment(event.start).format('MMM DD @ h:mm a')} - {moment(event.end).format('h:mm a')}
              </span>
              <div className="bg-secondary-4 rounded-md px-4 py-2 text-gray-9 text-sm font-medium">
                {event.title}
              </div>
              {event.extendedProps.location && (
                <div className="text-gray-700 text-sm">
                  Location: {event.extendedProps.location}
                </div>
              )}
              {event.extendedProps.description && (
                <p className="text-gray-600 text-sm mt-2">
                  {event.extendedProps.description}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default CalenderView;