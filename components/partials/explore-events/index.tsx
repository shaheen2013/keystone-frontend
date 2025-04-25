"use client";

import EventCard from "@/components/shadcn/event-card";
import Autoplay from "embla-carousel-autoplay";

import {
  Carousel,
  CarouselContent,
  CarouselDots,
  CarouselItem,
} from "@/components/shadcn/carousel";
import { useGetEventsQuery } from "@/features/public/eventSlice";
import { CAROUSEL_LIMIT } from "@/lib/constants";
import EventCardSkeleton from "@/components/skeletons/event-card";
import { Skeleton } from "@/components/shadcn/skeleton";

const ExploreEvents = ({
  title,
  isRelated,
  isRecommended,
  eventTypeId,
}: {
  title: string;
  isRelated?: boolean;
  isRecommended?: boolean;
  eventTypeId?: number;
}) => {
  const restQuery = {
    ...(isRelated && { event_type_ids: [eventTypeId] }),
    ...(isRecommended && { recommended: 1 }),
  };

  console.log("restQuery", restQuery);

  const { data, isLoading, isFetching }: any = useGetEventsQuery({
    limit: CAROUSEL_LIMIT,
    ...restQuery,
  });

  const loading = isLoading || isFetching;

  const events = data?.data?.events || [];

  return (
    <section className="bg-primary-2 py-12 md:py-28">
      <div className="container flex flex-col gap-6 md:gap-12">
        {loading ? (
          <Skeleton className="mx-auto mb-4 md:mb-6 h-8 md:h-14 w-3/4 md:w-1/2" />
        ) : (
          <h3 className="text-center text-2xl md:text-5xl font-bold text-gray-9">
            {title}
          </h3>
        )}
        <Carousel
          opts={{
            loop: false,
            duration: 60,
            align: "start",
          }}
          plugins={[
            Autoplay({
              delay: 5000,
              stopOnInteraction: false,
              stopOnMouseEnter: true,
            }),
          ]}
        >
          <CarouselContent>
            {loading && (
              <>
                {[...Array(3)].map((_, index) => (
                  <CarouselItem key={index} className="basis-full md:basis-1/3">
                    <EventCardSkeleton className="bg-white" />
                  </CarouselItem>
                ))}
              </>
            )}
            {events?.map((event: any, index: any) => (
              <CarouselItem key={index} className="basis-full md:basis-1/3">
                <EventCard event={event} key={index} className="bg-white" />
              </CarouselItem>
            ))}

            {!loading && events?.length === 0 && (
              <CarouselItem className="basis-full">
                <h4 className="text-center self-center text-gray-9 text-lg font-semibold">
                  No Events Found
                </h4>
              </CarouselItem>
            )}
          </CarouselContent>
          <div className="mt-6 md:mt-12">
            {loading ? (
              <div className="flex items-center justify-center gap-2">
                {[...Array(3)].map((_, index) => (
                  <Skeleton key={index} className="size-4 rounded-full" />
                ))}
              </div>
            ) : (
              <CarouselDots />
            )}
          </div>
        </Carousel>
      </div>
    </section>
  );
};

export default ExploreEvents;
