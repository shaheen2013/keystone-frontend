"use client";

import { Button } from "@/components/shadcn/button";
import Autoplay from "embla-carousel-autoplay";
import Link from "next/link";
import EventCard from "@/components/shadcn/event-card";
import {
  Carousel,
  CarouselContent,
  CarouselDots,
  CarouselItem,
} from "@/components/shadcn/carousel";
import { useGetEventsQuery } from "@/features/public/eventSlice";
import { CAROUSEL_LIMIT } from "@/lib/constants";
import { Skeleton } from "@/components/shadcn/skeleton";
import EventCardSkeleton from "@/components/skeletons/event-card";

const UpComingEvents = ({ title }: { title: string }) => {
  const { data, isFetching, isLoading }: any = useGetEventsQuery({
    limit: CAROUSEL_LIMIT,
  });

  const loading = isFetching || isLoading;

  const events = data?.data?.events || [];

  return (
    <section className="container my-12 md:my-28 flex flex-col gap-6 md:gap-12">
      <div className="flex gap-6 justify-between items-center md:items-start">
        {loading ? (
          <Skeleton className="h-8 md:h-12 w-40" />
        ) : (
          <h3 className="text-2xl md:text-5xl font-bold text-gray-9 grow">
            {title}
          </h3>
        )}
        {events?.length > 0 && (
          <Button className="shrink-0" asChild variant="secondary" size="lg">
            <Link href="/events">See All</Link>
          </Button>
        )}
      </div>
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
          {loading ? (
            <>
              {[...Array(3)].map((_, index) => (
                <CarouselItem key={index} className="basis-full md:basis-1/3">
                  <EventCardSkeleton key={`skeleton-${index}`} />
                </CarouselItem>
              ))}
            </>
          ) : (
            <>
              {events?.length > 0 ? (
                <>
                  {events?.map((event: any, index: any) => (
                    <CarouselItem
                      key={index}
                      className="basis-full md:basis-1/3"
                    >
                      <EventCard event={event} />
                    </CarouselItem>
                  ))}
                </>
              ) : (
                <>
                  <CarouselItem className="basis-full text-center">
                    Not found
                  </CarouselItem>
                </>
              )}
            </>
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
    </section>
  );
};

export default UpComingEvents;
