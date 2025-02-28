"use client";

import { Button } from "@/components/shadcn/button";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselDots,
  CarouselItem,
} from "@/components/shadcn/Carousel";
import Link from "next/link";
import EventCard from "@/components/shadcn/event-card";

const UpComingEvents = ({ data }: { data: any }) => {
  const { title, cta, events } = data;
  return (
    <section className="container my-12 md:my-28 flex flex-col gap-6 md:gap-12">
      <div className="flex gap-6 justify-between items-center md:items-start">
        <h3 className="text-2xl md:text-5xl font-bold text-gray-9 grow">
          {title}
        </h3>
        <Button className="shrink-0" asChild variant="secondary" size="lg">
          <Link href={cta.link}>{cta.text}</Link>
        </Button>
      </div>
      <Carousel
        opts={{
          loop: false,
          duration: 60,
          align: "start",
        }}
        plugins={[
          Autoplay({
            delay: 8000,
            stopOnInteraction: false,
            stopOnMouseEnter: true,
          }),
        ]}
      >
        <CarouselContent>
          {events.map((event, index) => (
            <CarouselItem key={index} className="basis-full md:basis-1/3">
              <EventCard event={event} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className="mt-6 md:mt-12">
          <CarouselDots />
        </div>
      </Carousel>
    </section>
  );
};

export default UpComingEvents;
