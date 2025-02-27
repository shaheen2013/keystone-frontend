"use client";

import { ArrowRight } from "@/components/icons";
import { Button } from "@/components/shadcn/button";
import {
  Carousel,
  CarouselContent,
  CarouselDots,
  CarouselItem,
} from "@/components/shadcn/Carousel";
import Autoplay from "embla-carousel-autoplay";
import Link from "next/link";

const ExploreOtherServices = ({ data }: { data: any }) => {
  const { title, services } = data;
  return (
    <section className="py-12 md:py-28 bg-primary-2">
      <div className="container flex flex-col gap-6 md:gap-12">
        <h3 className="text-2xl md:text-5xl font-bold text-gray-9 text-center">
          {title}
        </h3>
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
            {services.map((service, index) => (
              <CarouselItem key={index} className="basis-full md:basis-1/3">
                <div
                  key={index}
                  className="bg-primary-2 p-4 md:p-8 rounded-2xl flex flex-col gap-6 items-start"
                >
                  {/* <div className="p-4 rounded-xl bg-white text-secondary-6">
                    <service.icon />
                  </div> */}

                  <div className="flex flex-col gap-4">
                    <h3 className="text-xl md:text-3xl font-bold text-gray-9">
                      {service.title}
                    </h3>
                    <p className="text-sm md:text-lg text-gray-9 line-clamp-3">
                      {service.description}
                    </p>
                  </div>
                  <Button variant="link" size="md" asChild>
                    <Link href={service.link.url}>
                      {service.link.text}
                      <ArrowRight className="text-secondary-6" />
                    </Link>
                  </Button>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="mt-6 md:mt-12">
            <CarouselDots />
          </div>
        </Carousel>
      </div>
    </section>
  );
};

export default ExploreOtherServices;
