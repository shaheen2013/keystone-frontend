import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { EventContentArg } from "@fullcalendar/core";
import { useGetEventsQuery } from "@/features/public/eventSlice";
import { useRouter } from "next/navigation";
import moment from "moment";
import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import CalendarSkeleton from "./skeleton/calender";
import MobileEventsSkeleton from "./skeleton/mobile-events";
import { useMediaQuery } from "usehooks-ts";

interface CalendarEvent {
  id: string;
  title: string;
  start: string;
  end: string;
  extendedProps: {
    slug: string;
    type: string;
    location?: string;
    meetingLink?: string;
    description?: string;
    image?: string;
  };
}

const CalendarView = () => {
  const router = useRouter();
  const isMobile = useMediaQuery("(max-width: 768px)");
  const [eventsOnDate, setEventsOnDate] = useState<CalendarEvent[]>([]);
  const [selectedDate, setSelectedDate] = useState<string>(
    moment().format("YYYY-MM-DD")
  );
  const { data, isLoading, isFetching }: any = useGetEventsQuery({ limit: 12 });

  // Memoize the raw events data
  const events = useMemo(() => data?.data?.events || [], [data?.data?.events]);
  const loading = isLoading || isFetching;

  // Transform and memoize events
  const formattedEvents = useMemo(() => {
    return events.map(
      (event: any): CalendarEvent => ({
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
          image: event.featured_image?.path,
        },
      })
    );
  }, [events]);

  // Event handlers
  const handleEventClick = useCallback(
    (clickInfo: any) => {
      router.push(`/events/${clickInfo.event.extendedProps.slug}`);
    },
    [router]
  );

  // Load events for selected date
  const loadEventsForDate = useCallback(
    (date: string) => {
      const filteredEvents = formattedEvents.filter((event: CalendarEvent) => {
        const eventStart = moment(event.start).format("YYYY-MM-DD");
        const eventEnd = moment(event.end).format("YYYY-MM-DD");
        return date >= eventStart && date <= eventEnd;
      });
      setEventsOnDate(filteredEvents);
    },
    [formattedEvents]
  );

  // Initialize with today's events
  useEffect(() => {
    if (formattedEvents.length > 0) {
      loadEventsForDate(selectedDate);
    }
  }, [formattedEvents, loadEventsForDate, selectedDate]);

  const handleDateClick = useCallback(
    (info: any) => {
      const clickedDate = info.dateStr;
      setSelectedDate(clickedDate);
      loadEventsForDate(clickedDate);
    },
    [loadEventsForDate]
  );

  const renderEventContent = useCallback((eventContent: EventContentArg) => {
    return (
      <div className="flex items-center justify-center">
        <div className="hidden md:flex text-sm truncate bg-secondary-4 rounded-lg px-3 py-1.5 text-gray-9 text-center font-medium mx-2">
          {eventContent.event.title}
        </div>
        <div className="flex md:hidden size-1.5 bg-secondary-5 rounded-full mx-2"></div>
      </div>
    );
  }, []);

  return (
    <div className="calendar-container">
      {loading ? (
        <>
          <CalendarSkeleton />
          <MobileEventsSkeleton />
        </>
      ) : (
        <>
          <FullCalendar
            plugins={[dayGridPlugin, interactionPlugin]}
            initialDate={selectedDate}
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
            eventClick={isMobile ? undefined : handleEventClick}
            dateClick={isMobile ? handleDateClick : undefined}
          />

          {/* Events list for mobile */}
          <div className="block md:hidden space-y-4 mt-4">
            {loading ? (
              <div>Loading events...</div>
            ) : eventsOnDate?.length > 0 ? (
              eventsOnDate?.map((event) => (
                <div key={event.id} className="bg-white rounded-lg p-4 shadow">
                  <div className="flex md:hidden flex-col gap-3">
                    <span className="text-gray-9 font-semibold text-base">
                      {moment(event.start).format("MMM DD @ h:mm a")} -{" "}
                      {moment(event.end).format("h:mm a")}
                    </span>
                    <Link
                      className="bg-secondary-4 rounded-md px-4 py-2 text-gray-9 text-sm font-medium text-center"
                      href={`/events/${event?.extendedProps?.slug}`}
                    >
                      {event.title}
                    </Link>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-gray-500 text-center">
                No events scheduled for this date
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default CalendarView;
