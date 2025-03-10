"use client";

import { Button } from "@/components/shadcn/button";
import Link from "next/link";
import { ArrowRight } from "@/components/icons";
import {
  Carousel,
  CarouselContent,
  CarouselDots,
  CarouselItem,
} from "@/components/shadcn/Carousel";
import Autoplay from "embla-carousel-autoplay";

const RecommendService = ({ data }: { data: any }) => {
  const { title, services } = data;
  return (
    <section className="py-12 md:py-28 bg-primary-2">
      <div className="container flex flex-col items-center gap-6 md:gap-12">
        <h3 className="text-2xl md:text-5xl font-bold text-gray-9 text-center">
          {title}
        </h3>
        <Carousel
          className="w-full"
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
              <CarouselItem
                key={index}
                className="basis-full sm:basis-1/2 md:basis-1/3"
              >
                <div className="bg-white p-4 md:p-8 rounded-2xl flex flex-col gap-6 items-start border border-primary-7">
                  <div className="p-4 rounded-xl bg-secondary-2 text-secondary-6 size-12 md:size-[72px] flex items-center justify-center">
                    {index + 1}
                  </div>

                  <div className="flex flex-col gap-4">
                    <h3 className="text-xl md:text-3xl font-bold text-gray-9">
                      {service.title}
                    </h3>
                    <p className="text-sm md:text-lg text-gray-9 line-clamp-3">
                      {service.description}
                    </p>
                  </div>
                  <Button
                    variant="link"
                    size="md"
                    asChild
                    className="text-secondary-6"
                  >
                    <Link href={service.linkUrl}>
                      {service.linkText}
                      <ArrowRight className="ml-2 size-6" />
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

export default RecommendService;
