// "use client";

// import PaginationWrapper from "@/components/partials/pagination-wrapper";
// import { PaginationSkeleton } from "@/components/skeletons";
// import { useGetJoinedEventsQuery } from "@/features/public/eventSlice";
// import { PAGINATION_LIMIT, USER_EVENTS_LIMIT } from "@/lib/constants";

// import { Suspense, useState } from "react";
// import EventCardSkeleton from "./components/skeletons";
// import moment from "moment";

// export default function AccountEvents() {
//   const [page, setPage] = useState(1);
//   type Event = {
//     name: string;
//     time: string;
//     type: "cancelled" | "ended" | "ongoing";
//   };

//   const events: Event[] = [
//     { name: "Event 1", time: "06:00 PM - 06:30 PM", type: "ongoing" },
//     { name: "Event 2", time: "06:00 PM - 06:30 PM", type: "ongoing" },
//     { name: "Event 3", time: "06:00 PM - 06:30 PM", type: "ongoing" },
//     { name: "Event 4", time: "", type: "cancelled" },
//     { name: "Event 5", time: "", type: "ended" },
//     { name: "Event 6", time: "", type: "ended" },
//   ];

//   const { data, isFetching, isLoading }: any = useGetJoinedEventsQuery({
//     page: page,
//     pagi_limit: PAGINATION_LIMIT,
//   });

//   const loading = isLoading || isFetching;

//   const joinedEvents = data?.data?.joined_events?.data || [];
//   const totalJoinedEvents = data?.data?.joined_events?.total || 0;

//   return (
//     <div className="bg-primary-1 rounded-2xl">
//       <div className="font-semibold lg:text-2xl text-lg lg:py-6 lg:px-8 p-4  bg-primary-2 rounded-t-2xl">
//         Events
//       </div>

//       {/* content */}
//       <div className="lg:p-8 p-4">
//         {/* events */}
//         <div className="flex flex-col gap-6 mb-4 md:mb-6">

//           {loading ? (
//             Array.from({ length: USER_EVENTS_LIMIT }).map((_, index) => (
//               <EventCardSkeleton key={`skeleton-${index}`} />
//             ))
//           ) : joinedEvents?.length > 0 ? (
//             joinedEvents?.map((event: any, index: number) => {
//               return (
//                 <div
//                   key={index}
//                   className="bg-white lg:p-6 py-3 px-4 rounded-xl border border-primary-2 flex justify-between hover:border-secondary-4"
//                 >
//                   <div>
//                     <p className="lg:text-xl text-sm font-medium">
//                       {event.name}
//                     </p>
//                   </div>

//                   <div>
//                     {(event.status === "Published" && new Date(event.end_date).getTime() > Date.now()) && (
//                       <p className="text-secondary-6 lg:text-xl text-sm font-medium">
//                         {moment(event.start_date).isSame(event.end_date, 'day')
//                           ? `${moment(event.start_date).format("ddd, MMM D [at] h:mm A")} - ${moment(event.end_date).format("h:mm A")}`
//                           : `${moment(event.start_date).format("ddd, MMM D [at] h:mm A")} to ${moment(event.end_date).format("ddd, MMM D [at] h:mm A")}`
//                         }
//                       </p>
//                     )}

//                     {(event.status === "Published" && new Date(event.end_date).getTime() < Date.now()) && (
//                       <p className="text-gray-5 lg:text-xl text-sm font-medium">
//                         Ended
//                       </p>
//                     )}

//                     {event.status === "cancelled" && (
//                       <p className="text-[#FDB022] lg:text-xl text-sm font-medium">
//                         Event Canceled
//                       </p>
//                     )}
//                   </div>

//                 </div>
//               );
//             })
//           ) : (
//             <div className="col-span-full text-center">No events found</div>
//           )}
//         </div>
//         {totalJoinedEvents > PAGINATION_LIMIT && (
//           <hr className="bg-primary-2 mb-4 md:mb-7" />
//         )}
//         {/* pagination area */}
//         <Suspense fallback={<div className="h-10" />}>
//           {/* pagination area */}
//           {loading ? (
//             <PaginationSkeleton className="mt-4" />
//           ) : (
//             <>
//               {totalJoinedEvents > PAGINATION_LIMIT && (
//                 <PaginationWrapper
//                   page={page}
//                   setPage={setPage}
//                   total={totalJoinedEvents}
//                   limit={PAGINATION_LIMIT}
//                   className="col-span-full"
//                 />
//               )}
//             </>
//           )}
//         </Suspense>
//       </div>
//     </div>
//   );
// }


"use client";

import PaginationWrapper from "@/components/partials/pagination-wrapper";
import { PaginationSkeleton } from "@/components/skeletons";
import { useGetJoinedEventsQuery } from "@/features/public/eventSlice";
import { PAGINATION_LIMIT, USER_EVENTS_LIMIT } from "@/lib/constants";
import { Suspense, useState } from "react";
import EventCardSkeleton from "./components/skeletons";
import moment from "moment";

export default function AccountEvents() {
  const [page, setPage] = useState(1);
  
  const { 
    data, 
    isFetching, 
    isLoading, 
    error 
  }: any = useGetJoinedEventsQuery({
    page: page,
    pagi_limit: PAGINATION_LIMIT,
  });

  const loading = isLoading || isFetching;
  const joinedEvents = data?.data?.joined_events?.data || [];
  const totalJoinedEvents = data?.data?.joined_events?.total || 0;

  const formatEventDates = (start: string, end: string) => {
    const startMoment = moment(start);
    const endMoment = moment(end);
    
    if (startMoment.isSame(endMoment, 'day')) {
      return `${startMoment.format("ddd, MMM D [at] h:mm A")} - ${endMoment.format("h:mm A")}`;
    }
    return `${startMoment.format("ddd, MMM D [at] h:mm A")} - ${endMoment.format("ddd, MMM D [at] h:mm A")}`;
  };

  const isEventActive = (endDate: string) => {
    return moment(endDate).isAfter(moment());
  };

  return (
    <div className="bg-primary-1 rounded-2xl">
      <div className="font-semibold lg:text-2xl text-lg lg:py-6 lg:px-8 p-4 bg-primary-2 rounded-t-2xl">
        Events
      </div>

      <div className="lg:p-8 p-4">
        <div className="flex flex-col gap-6 mb-4 md:mb-6">
          {error ? (
            <div className="text-red-500 text-center">Error loading events</div>
          ) : loading ? (
            Array.from({ length: USER_EVENTS_LIMIT }).map((_, index) => (
              <EventCardSkeleton key={`skeleton-${index}`} />
            ))
          ) : joinedEvents.length > 0 ? (
            joinedEvents.map((event: any) => (
              <div
                key={event.id}
                className="bg-white lg:p-6 py-3 px-4 rounded-xl border border-primary-2 flex justify-between hover:border-secondary-4"
              >
                <div>
                  <p className="lg:text-xl text-sm font-medium">
                    {event.name}
                  </p>
                </div>

                <div>
                  {event.status === "Published" && isEventActive(event.end_date) ? (
                    <p className="text-secondary-6 lg:text-xl text-sm font-medium">
                      {formatEventDates(event.start_date, event.end_date)}
                    </p>
                  ) : event.status === "Published" ? (
                    <p className="text-gray-5 lg:text-xl text-sm font-medium">
                      Ended
                    </p>
                  ) : (
                    <p className="text-[#FDB022] lg:text-xl text-sm font-medium">
                      Event Canceled
                    </p>
                  )}
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center">No events found</div>
          )}
        </div>

        {totalJoinedEvents > PAGINATION_LIMIT && (
          <hr className="bg-primary-2 mb-4 md:mb-7" />
        )}

        <Suspense fallback={<div className="h-10" />}>
          {loading ? (
            <PaginationSkeleton className="mt-4" />
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