// "use client";

// import { Suspense, useState } from "react";
// import Link from "next/link";
// import moment from "moment";
// import { cn } from "@/lib/utils";
// import Zoom from "@/components/icons/Zoom";
// import PaginationWrapper from "@/components/partials/pagination-wrapper";
// import { PaginationSkeleton } from "@/components/skeletons";
// import { useGetJoinedEventsQuery } from "@/features/public/eventSlice";
// import { PAGINATION_LIMIT, USER_EVENTS_LIMIT } from "@/lib/constants";
// import EventCardSkeleton from "./components/skeletons";

// import {
//   Accordion,
//   AccordionContent,
//   AccordionItem,
//   AccordionTrigger,
// } from "@/components/shadcn/accordion";
// import {
//   Tooltip,
//   TooltipContent,
//   TooltipProvider,
//   TooltipTrigger,
// } from "@/components/shadcn/tooltip";

// export default function AccountEvents() {
//   const [page, setPage] = useState(1);
//   const { data, isFetching, isLoading, error }: any = useGetJoinedEventsQuery({
//     page,
//     pagi_limit: PAGINATION_LIMIT,
//   });

//   const loading = isLoading || isFetching;
//   const joinedEvents = data?.data?.joined_events?.data || [];
//   const totalJoinedEvents = data?.data?.joined_events?.total || 0;

//   const formatEventDates = (start: string, end: string) => {
//     const startMoment = moment(start);
//     const endMoment = moment(end);

//     if (startMoment.isSame(endMoment, "day")) {
//       return `${startMoment.format("ddd, MMM D [at] h:mm A")} - ${endMoment.format("h:mm A")}`;
//     }
//     return `${startMoment.format("ddd, MMM D [at] h:mm A")} - ${endMoment.format("ddd, MMM D [at] h:mm A")}`;
//   };

//   const formatTime = (date: string) => moment(date).format("h:mm A");

//   const isEventActive = (endDate: string) => moment(endDate).isAfter(moment());

//   const getEventStatus = (event: any) => {
//     if (event.status !== "Published") return "Cancelled";
//     if (!isEventActive(event.end_date)) return "Ended";
//     return "Active";
//   };

//   const renderEventStatus = (event: any) => {
//     if (event.status !== "Published") {
//       return (
//         <>
//           <p className="text-gray-5 lg:text-xl text-sm font-medium">Canceled</p>
//         </>
//       );
//     }

//     if (!isEventActive(event.end_date)) {
//       return (
//         <>
//           <p className="text-gray-5 lg:text-xl text-sm font-medium">Ended</p>
//         </>
//       );
//     }

//     return (
//       <>
//         <p className="text-secondary-6 lg:text-xl text-sm font-medium">
//           {formatEventDates(event.start_date, event.end_date)}
//         </p>
//       </>
//     );
//   };

//   return (
//     <div className="bg-primary-1 rounded-2xl">
//       <div className="font-semibold lg:text-2xl text-lg lg:py-6 lg:px-8 p-4 bg-primary-2 rounded-t-2xl">
//         Events
//       </div>

//       <div className="lg:p-8 p-4">
//         <div className="flex flex-col gap-4 mb-4 md:mb-6">
//           {error ? (
//             <div className="text-red-500 text-center">Error loading events</div>
//           ) : loading ? (
//             Array.from({ length: USER_EVENTS_LIMIT }).map((_, index) => (
//               <EventCardSkeleton key={`skeleton-${index}`} />
//             ))
//           ) : joinedEvents.length > 0 ? (
//             <Accordion type="single" collapsible className="w-full space-y-4">
//               {joinedEvents.map((event: any) => {
//                 const status = getEventStatus(event);
//                 return (
//                   <AccordionItem
//                     key={event.id}
//                     value={event.id.toString()}
//                     className="bg-white p-6 rounded-xl border border-primary-2"
//                   >
//                     <div className="w-full">
//                       <AccordionTrigger className="hover:no-underline p-0 [&[data-state=open]>svg]:rotate-180">
//                         <div className="w-full flex flex-col md:flex-row justify-between md:items-center gap-2 md:gap-8 mr-8">
//                           <h3
//                             className={cn(
//                               "lg:text-xl text-sm font-medium text-left",
//                               status === "Active"
//                                 ? "text-gray-9"
//                                 : "text-gray-5"
//                             )}
//                           >
//                             {event.name}
//                           </h3>
//                           <div className="shrink-0">
//                             {renderEventStatus(event)}
//                           </div>
//                         </div>
//                       </AccordionTrigger>
//                     </div>

//                     <AccordionContent className="pt-4 space-y-4">
//                       <hr />
//                       <div className="grid gap-4">
//                         <div className="grid grid-cols-2 ">
//                           <div className="space-y-2">
//                             <p className="text-sm text-gray-6 mt-1">
//                               Type: {event.event_type}
//                             </p>
//                             <p className="text-sm text-gray-6 mt-1">
//                               Location: {event.location}
//                             </p>
//                             {status !== "Active" && (
//                               <p className="text-sm text-gray-6">
//                                 {formatEventDates(
//                                   event.start_date,
//                                   event.end_date
//                                 )}
//                               </p>
//                             )}
//                           </div>
//                           {event.meeting_link && (
//                             <div className="flex justify-end">
//                               <Link
//                                 href={event.meeting_link}
//                                 target="_blank"
//                                 rel="noopener noreferrer"
//                                 aria-label={`Join ${event.name} Zoom meeting`}
//                                 className="hover:opacity-80 transition-opacity"
//                               >
//                                 <TooltipProvider>
//                                   <Tooltip>
//                                     <TooltipTrigger>
//                                       <Zoom className="w-10 h-10 cursor-pointer" />
//                                     </TooltipTrigger>
//                                     <TooltipContent>
//                                       <p>Join Zoom Meeting</p>
//                                     </TooltipContent>
//                                   </Tooltip>
//                                 </TooltipProvider>
//                               </Link>
//                             </div>
//                           )}
//                         </div>
//                       </div>
//                       <hr />

//                       {event.agenda?.length > 0 && (
//                         <div>
//                           <h4 className="font-medium text-gray-7 mb-2">
//                             Agenda
//                           </h4>
//                           <div className="space-y-2">
//                             {event.agenda.map((item: any, index: number) => (
//                               <div
//                                 key={index}
//                                 className="flex justify-between items-center p-3 bg-gray-50 rounded-lg"
//                               >
//                                 <span className="font-medium text-sm">
//                                   {item.title}
//                                 </span>
//                                 <span className="text-xs text-gray-500">
//                                   {formatTime(item.start_time)} -{" "}
//                                   {formatTime(item.end_time)}
//                                 </span>
//                               </div>
//                             ))}
//                           </div>
//                         </div>
//                       )}
//                     </AccordionContent>
//                   </AccordionItem>
//                 );
//               })}
//             </Accordion>
//           ) : (
//             <div className="col-span-full text-center">No events found</div>
//           )}
//         </div>

//         {totalJoinedEvents > PAGINATION_LIMIT && (
//           <hr className="bg-primary-2 mb-4 md:mb-7" />
//         )}

//         <Suspense fallback={<div className="h-10" />}>
//           {loading ? (
//             <PaginationSkeleton className="mt-4 col-span-full text-center" />
//           ) : (
//             totalJoinedEvents > PAGINATION_LIMIT && (
//               <PaginationWrapper
//                 page={page}
//                 setPage={setPage}
//                 total={totalJoinedEvents}
//                 limit={PAGINATION_LIMIT}
//                 className="col-span-full"
//               />
//             )
//           )}
//         </Suspense>
//       </div>
//     </div>
//   );
// }

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
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/shadcn/accordion";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/shadcn/tooltip";
import { Badge } from "@/components/shadcn/badge";
import { Calendar, MapPin, Clock, AlertCircle } from "lucide-react";

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

  const formatTime = (date: string) => moment(date).format("h:mm A");

  const isEventActive = (endDate: string) => moment(endDate).isAfter(moment());

  const getEventStatus = (event: any) => {
    if (event.status !== "Published") return "Cancelled";
    if (!isEventActive(event.end_date)) return "Ended";
    return "Active";
  };

  const renderEventStatusBadge = (status: string) => {
    switch (status) {
      case "Active":
        return <Badge className="bg-green-100 text-green-800">Active</Badge>;
      case "Cancelled":
        return <Badge className="bg-red-100 text-red-800">Cancelled</Badge>;
      case "Ended":
        return <Badge className="bg-gray-100 text-gray-800">Ended</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200">
      <div className="font-semibold lg:text-2xl text-lg lg:py-6 lg:px-8 p-4 bg-gray-50 rounded-t-2xl border-b border-gray-200">
        <h2 className="flex items-center gap-2">
          <Calendar className="w-5 h-5" />
          My Events
        </h2>
      </div>

      <div className="lg:p-8 p-4">
        <div className="flex flex-col gap-4 mb-4 md:mb-6">
          {error ? (
            <div className="text-red-500 text-center py-8 flex flex-col items-center gap-2">
              <AlertCircle className="w-8 h-8 text-red-400" />
              Error loading events
            </div>
          ) : loading ? (
            Array.from({ length: USER_EVENTS_LIMIT }).map((_, index) => (
              <EventCardSkeleton key={`skeleton-${index}`} />
            ))
          ) : joinedEvents.length > 0 ? (
            <Accordion type="single" collapsible className="w-full space-y-4">
              {joinedEvents.map((event: any) => {
                const status = getEventStatus(event);
                const isActive = status === "Active";
                
                return (
                  <AccordionItem
                    key={event.id}
                    value={event.id.toString()}
                    className="bg-white p-0 rounded-xl border border-gray-200 overflow-hidden hover:shadow-sm transition-shadow"
                  >
                    <AccordionTrigger className="hover:no-underline px-6 py-4 [&[data-state=open]>svg]:rotate-180">
                      <div className="w-full flex flex-col md:flex-row justify-between md:items-center gap-3 md:gap-8 mr-4">
                        <div className="flex items-center gap-3">
                          <h3
                            className={cn(
                              "lg:text-lg font-medium text-left line-clamp-1",
                              isActive ? "text-gray-900" : "text-gray-500"
                            )}
                          >
                            {event.name}
                          </h3>
                          {renderEventStatusBadge(status)}
                        </div>
                        
                        <div className="flex items-center gap-4">
                          <p className={cn(
                            "text-sm md:text-base",
                            isActive ? "text-gray-700" : "text-gray-500"
                          )}>
                            {formatEventDates(event.start_date, event.end_date)}
                          </p>
                          
                          {isActive && event.meeting_link && (
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <Link
                                    href={event.meeting_link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={`Join ${event.name} Zoom meeting`}
                                    className="hover:opacity-80 transition-opacity"
                                  >
                                    <Zoom className="w-5 h-5 cursor-pointer text-blue-600" />
                                  </Link>
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p>Join Zoom Meeting</p>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          )}
                        </div>
                      </div>
                    </AccordionTrigger>

                    <AccordionContent className="px-6 pb-6 pt-0 space-y-6">
                      <div className="grid md:grid-cols-2 gap-6 pt-4">
                        <div className="space-y-4">
                          <div>
                            <h4 className="font-medium text-gray-700 mb-3 flex items-center gap-2">
                              <MapPin className="w-4 h-4" />
                              Event Details
                            </h4>
                            <div className="space-y-3">
                              <p className="text-sm text-gray-600">
                                <span className="font-medium">Type:</span> {event.event_type || "N/A"}
                              </p>
                              <p className="text-sm text-gray-600">
                                <span className="font-medium">Location:</span> {event.location || "Online"}
                              </p>
                              {event.youtube_link && (
                                <p className="text-sm">
                                  <span className="font-medium text-gray-600">Recording:</span>{" "}
                                  <Link
                                    href={event.youtube_link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-600 hover:underline"
                                  >
                                    Watch on YouTube
                                  </Link>
                                </p>
                              )}
                            </div>
                          </div>
                        </div>

                        <div>
                          <h4 className="font-medium text-gray-700 mb-3 flex items-center gap-2">
                            <Clock className="w-4 h-4" />
                            Schedule
                          </h4>
                          {event.agenda?.length > 0 ? (
                            <div className="space-y-3">
                              {event.agenda.map((item: any, index: number) => (
                                <div
                                  key={index}
                                  className="flex justify-between items-center p-3 bg-gray-50 rounded-lg border border-gray-100"
                                >
                                  <span className="font-medium text-sm text-gray-700">
                                    {item.title}
                                  </span>
                                  <span className="text-xs text-gray-500">
                                    {formatTime(item.start_time)} - {formatTime(item.end_time)}
                                  </span>
                                </div>
                              ))}
                            </div>
                          ) : (
                            <p className="text-sm text-gray-500">No agenda items available</p>
                          )}
                        </div>
                      </div>

                      {event.about && (
                        <div className="pt-2">
                          <h4 className="font-medium text-gray-700 mb-2">About This Event</h4>
                          <p className="text-sm text-gray-600 whitespace-pre-line">
                            {event.about}
                          </p>
                        </div>
                      )}
                    </AccordionContent>
                  </AccordionItem>
                );
              })}
            </Accordion>
          ) : (
            <div className="col-span-full text-center py-12 text-gray-500">
              You haven't joined any events yet
            </div>
          )}
        </div>

        {totalJoinedEvents > PAGINATION_LIMIT && (
          <div className="border-t border-gray-200 my-6"></div>
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

