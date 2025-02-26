"use client";

import { Calendar } from "@/components/icons";
import { Button } from "@/components/shadcn/button";
import { upcomingEventsData } from "./constant";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselDots,
  CarouselItem,
} from "@/components/shadcn/Carousel";

const UpComingEvents = () => {
  const { title, cta, events } = upcomingEventsData;
  return (
    <section className="max-w-[1600px] mx-5 md:mx-auto my-12 md:my-28 flex flex-col gap-6 md:gap-12">
      <div className="flex gap-6 justify-between items-center md:items-start">
        <h3 className="text-2xl md:text-5xl font-bold text-gray-9 grow">
          {title}
        </h3>
        <Button className="shrink-0">{cta.text}</Button>
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
            <CarouselItem key={index} className="basis-1 md:basis-1/3">
              <div className="bg-primary-2 p-4 md:p-8 rounded-2xl flex flex-col gap-4 md:gap-6 items-start">
                <div className="max-h-[314px] w-full overflow-hidden">
                  <Image
                    src={event.image}
                    width={1000}
                    height={760}
                    alt={event.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex flex-col gap-3 md:gap-4">
                  <div className="flex gap-2 text-secondary-6">
                    <Calendar />
                    <span className="font-medium text-base">{event.time}</span>
                  </div>
                  <h3 className="text-gray-9 text-xl md:text-3xl font-bold">
                    {event.title}
                  </h3>
                  <p className="text-gray-9 text-sm md:text-lg">
                    {event.description}
                  </p>
                </div>
              </div>
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
