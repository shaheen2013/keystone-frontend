"use client";

import Cookies from "js-cookie";
import { Suspense, useEffect, useState } from "react";
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

import { Badge } from "@/components/shadcn/badge";
import { MapPin, Clock, AlertCircle } from "lucide-react";
import { Person } from "@/components/icons";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function AccountEvents() {
  const router = useRouter();
  const [page, setPage] = useState(1);
  const { data, isFetching, isLoading, isError, error }: any =
    useGetJoinedEventsQuery({
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
      return `${startMoment.format(
        "ddd, MMM D [at] h:mm A"
      )} - ${endMoment.format("h:mm A")}`;
    }
    return `${startMoment.format(
      "ddd, MMM D [at] h:mm A"
    )} - ${endMoment.format("ddd, MMM D [at] h:mm A")}`;
  };

  const formatTime = (date: string) => moment(date).format("h:mm A");

  const isEventActive = (endDate: string) => moment(endDate).isAfter(moment());

  const getEventStatus = (event: any) => {
    if (event.status === "Cancelled") return "Cancelled";
    if (!isEventActive(event.end_date)) return "Ended";
    return "Active";
  };

  const renderEventStatusBadge = (status: string) => {
    switch (status) {
      case "Active":
        return <Badge className="bg-primary-3 text-primary-9">Active</Badge>;
      case "Cancelled":
        return <Badge variant="secondary">Cancelled</Badge>;
      case "Ended":
        return <Badge variant="secondary">Cancelled</Badge>;
      default:
        return <Badge className="bg-gray-2 text-gray-8">Unknown</Badge>;
    }
  };

  useEffect(() => {
    if (isError && error.status === 401) {
      console.log("error", error);
      Cookies.remove("key_stone_token");
      router.push("/login");
    }
  }, [router, isError, error]);

  return (
    <div className="bg-primary-1 rounded-2xl">
      <div className="font-semibold lg:text-2xl text-lg lg:py-6 lg:px-8 p-4 bg-primary-2 rounded-t-2xl">
        <h2 className="flex items-center gap-2 text-primary-9">
          {/* <Calendar className="w-5 h-5 text-primary-7" /> */}
          My Events
        </h2>
      </div>

      <div className="lg:p-8 p-4">
        <div className="flex flex-col gap-4 mb-4 md:mb-6">
          {error ? (
            <div className="text-secondary-7 text-center py-8 flex flex-col items-center gap-2">
              <AlertCircle className="w-8 h-8 text-secondary-5" />
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
                    className="bg-white p-0 rounded-xl border border-primary-2 overflow-hidden hover:shadow-sm transition-shadow"
                  >
                    <AccordionTrigger className="hover:no-underline px-6 py-4 [&[data-state=open]>svg]:rotate-180 items-start">
                      <div className="w-full flex flex-col md:flex-row justify-between items-start gap-3 md:gap-8 mr-4">
                        <h3
                          className={cn(
                            "lg:text-lg font-medium text-left",
                            isActive ? "text-primary-9" : "text-gray-6"
                          )}
                        >
                          {event.name}
                        </h3>
                        <div className="shrink-0 flex items-center gap-4">
                          {renderEventStatusBadge(status)}
                          <p
                            className={cn(
                              "text-sm md:text-base",
                              isActive ? "text-primary-7" : "text-gray-5"
                            )}
                          >
                            {formatEventDates(event.start_date, event.end_date)}
                          </p>
                        </div>
                      </div>
                    </AccordionTrigger>

                    <AccordionContent className="px-6 pb-6 pt-0 space-y-6">
                      <hr />
                      <div className="grid md:grid-cols-2 gap-6 pt-4">
                        <div>
                          <h4 className="font-medium text-primary-8 mb-3 flex items-center gap-2">
                            <MapPin className="w-4 h-4 text-primary-6" />
                            Event Details
                          </h4>
                          <div className="space-y-3">
                            <p className="text-sm text-primary-7">
                              <span className="font-medium text-primary-8">
                                Type:
                              </span>{" "}
                              {event.event_type.name || "N/A"}
                            </p>
                            <p className="text-sm text-primary-7">
                              <span className="font-medium text-primary-8">
                                Location:
                              </span>{" "}
                              {event.location || "Online"}
                            </p>
                          </div>
                        </div>

                        {isActive && event.meeting_link ? (
                          <div>
                            <div className="flex gap-2">
                              <Zoom className="w-5 h-5 cursor-pointer text-secondary-6" />
                              <h4 className="font-medium text-primary-8 mb-3 flex items-center gap-2">
                                Zoom Link
                              </h4>
                            </div>
                            <Link
                              href={event.meeting_link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-sm text-blue-600 hover:underline"
                            >
                              Join on Zoom
                            </Link>
                          </div>
                        ) : (
                          <div></div>
                        )}

                        <div>
                          <h4 className="font-medium text-primary-8 mb-3 flex items-center gap-2">
                            <Person className="w-4 h-4 text-primary-6" />
                            Speakers
                          </h4>
                          {event?.event_speakers?.length > 0 ? (
                            <div className="space-y-3">
                              {event?.event_speakers?.map(
                                (speaker: any, index: number) => (
                                  <div
                                    key={index}
                                    className="flex justify-between items-center p-3 bg-primary-2 rounded-lg border border-primary-3"
                                  >
                                    <Image
                                      src={
                                        speaker?.profile_picture?.path ||
                                        "/icons/user.png"
                                      }
                                      alt={speaker?.name}
                                      width={20}
                                      height={20}
                                      className="size-5 rounded-full object-cover object-center bg-transparent"
                                    />
                                    <span className="font-medium text-sm text-primary-8">
                                      {speaker.name}
                                    </span>
                                  </div>
                                )
                              )}
                            </div>
                          ) : (
                            <p className="text-sm text-primary-6">
                              No Speakers available
                            </p>
                          )}
                        </div>
                        <div>
                          <h4 className="font-medium text-primary-8 mb-3 flex items-center gap-2">
                            <Clock className="w-4 h-4 text-primary-6" />
                            Agenda
                          </h4>
                          {event.agenda?.length > 0 ? (
                            <div className="space-y-3">
                              {event.agenda.map((item: any, index: number) => (
                                <div
                                  key={index}
                                  className="flex justify-between items-center p-3 bg-primary-2 rounded-lg border border-primary-3"
                                >
                                  <span className="font-medium text-sm text-primary-8">
                                    {item.title}
                                  </span>
                                  <span className="text-xs text-primary-6">
                                    {formatTime(item.start_time)} -{" "}
                                    {formatTime(item.end_time)}
                                  </span>
                                </div>
                              ))}
                            </div>
                          ) : (
                            <p className="text-sm text-primary-6">
                              No agenda items available
                            </p>
                          )}
                        </div>
                      </div>

                      {event.short_brief && (
                        <p className="pt-2 text-sm text-primary-7 whitespace-pre-line">
                          {event.short_brief}
                        </p>
                      )}
                    </AccordionContent>
                  </AccordionItem>
                );
              })}
            </Accordion>
          ) : (
            <div className="col-span-full text-center py-12 text-gray-5">
              You haven&#39;t not confirmed any events
            </div>
          )}
        </div>

        {totalJoinedEvents > PAGINATION_LIMIT && (
          <div className="border-t border-primary-3 my-6"></div>
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
