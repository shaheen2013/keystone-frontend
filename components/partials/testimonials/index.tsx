"use client";

import { Quote } from "@/components/icons";
import Image from "next/image";
import { Star } from "lucide-react";

import Autoplay from "embla-carousel-autoplay";
import { cn } from "@/lib/utils";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselDots,
  CarouselItem,
} from "@/components/shadcn/carousel";
import { useEffect, useState } from "react";

const Testimonials2 = ({
  data,
  classes = {},
}: {
  data: any;
  classes?: {
    root?: string;
    card?: string;
  };
}) => {
  const { title, subtitle, testimonials } = data;
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!api) {
      return;
    }
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);
  return (
    <section className={cn("py-12 md:py-28 bg-primary-2", classes.root)}>
      <div className="container">
        <h2 className="mb-4 md:mb-6 text-2xl md:text-5xl font-bold text-gray-9 text-center">
          {title}
        </h2>
        <p className="max-w-4xl mx-auto mb-6 md:mb-12 text-base md:text-2xl text-gray-8 text-center">
          {subtitle}
        </p>
        <Carousel
          opts={{
            loop: false,
            duration: 60,
            align: "center",
          }}
          plugins={[
            Autoplay({
              delay: 5000,
              stopOnInteraction: false,
              stopOnMouseEnter: true,
            }),
          ]}
          setApi={setApi}
        >
          <CarouselContent>
            {testimonials.map((testimonial: any, index: number) => (
              <CarouselItem key={index} className="basis-full md:basis-1/3">
                <div
                  key={index}
                  className={cn(
                    "mx-2 my-6 p-4 md:p-8 bg-white rounded-2xl flex flex-col justify-center items-center border border-secondary-7 md:border-transparent",
                    classes.card,
                    {
                      "md:border-secondary-7 scale-110 mx-6": index === current,
                    }
                  )}
                >
                  <Quote className="text-secondary-5 mb-4 size-10 md:size-16" />
                  <p className="text-center mb-6 md:mb-8 text-base text-gray-9 line-clamp-6 md:line-clamp-4 font-semibold">
                    {testimonial.quote}
                  </p>
                  <div className="flex flex-col gap-4 md:gap-4 items-center">
                    <div className="size-16 rounded-full">
                      <Image
                        height={620}
                        width={560}
                        src={testimonial.author.image}
                        alt={testimonial.author.name}
                      />
                    </div>
                    <span className="text-sm md:text-base text-gray-9 font-semibold">
                      {testimonial.author.name},{" "}
                      {testimonial.author.description}
                    </span>
                    <div className="flex items-center gap-1">
                      {Array.from({ length: testimonial.rating }).map(
                        (_, index) => (
                          <Star
                            key={index}
                            className="text-warning-4 size-5"
                            fill="currentColor"
                          />
                        )
                      )}
                    </div>
                  </div>
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

export default Testimonials2;
