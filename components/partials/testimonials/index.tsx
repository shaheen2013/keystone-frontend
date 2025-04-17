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
import { useGetTestimonialQuery } from "@/features/public/testimonialSlice";
import { Skeleton } from "@/components/shadcn/skeleton";

const Testimonials2 = ({
  title,
  subtitle,
  classes = {},
}: {
  title?: string;
  subtitle?: string;
  classes?: {
    root?: string;
    card?: string;
  };
}) => {
  const { data, isLoading, isFetching }: any = useGetTestimonialQuery({});

  const testimonials = data?.data.parent_reviews || [];

  const loading = isLoading || isFetching;
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
      <div className="container ">
        {loading ? (
          <Skeleton className="mx-auto mb-4 md:mb-6 h-8 md:h-14 w-3/4 md:w-1/2" />
        ) : (
          <h2 className="mb-4 md:mb-6 text-2xl md:text-5xl font-bold text-gray-9 text-center">
            {title}
          </h2>
        )}
        {loading ? (
          <Skeleton className="mx-auto mb-6 md:mb-12 h-6 md:h-8 w-5/6 md:w-2/3" />
        ) : (
          <p className="max-w-4xl mx-auto mb-6 md:mb-12 text-base md:text-2xl text-gray-8 text-center">
            {subtitle}
          </p>
        )}

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
            {loading ? (
              <>
                {[...Array(3)].map((_, index) => (
                  <CarouselItem key={index} className="basis-full md:basis-1/3">
                    <div
                      className={cn(
                        "mx-2 my-6 p-4 md:p-8 bg-white rounded-2xl flex flex-col justify-center items-center",
                        classes.card
                      )}
                    >
                      <Skeleton className="size-10 md:size-16 mb-4" />
                      <Skeleton className="h-24 w-full mb-6 md:mb-8" />

                      <div className="flex flex-col gap-4 md:gap-4 items-center w-full">
                        <Skeleton className="size-16 rounded-full" />
                        <Skeleton className="h-5 w-32" />
                        <div className="flex items-center gap-1.5">
                          {[...Array(5)].map((_, i) => (
                            <Skeleton key={i} className="size-5" />
                          ))}
                        </div>
                      </div>
                    </div>
                  </CarouselItem>
                ))}
              </>
            ) : (
              <>
                {testimonials.map((testimonial: any, index: number) => (
                  <CarouselItem key={index} className="basis-full md:basis-1/3">
                    <div
                      key={index}
                      className={cn(
                        "mx-2 my-6 p-4 md:p-8 bg-white rounded-2xl flex flex-col justify-center items-center border border-secondary-7 md:border-transparent",
                        classes.card,
                        {
                          "md:border-secondary-7 scale-110 mx-6":
                            index === current,
                        }
                      )}
                    >
                      <Quote className="text-secondary-5 mb-4 size-10 md:size-16" />
                      <p className="text-center mb-6 md:mb-8 text-base text-gray-9 line-clamp-6 md:line-clamp-4 font-semibold">
                        {testimonial.feedback}
                      </p>
                      <div className="flex flex-col gap-4 md:gap-4 items-center">
                        <div className="size-16 rounded-full">
                          <Image
                            height={620}
                            width={560}
                            src={testimonial?.parent_avatar.path}
                            alt={testimonial?.parent_name}
                            className="size-16 object-cover object-center rounded-full"
                          />
                        </div>
                        <span className="text-sm md:text-base text-gray-9 font-semibold">
                          {testimonial.parent_name},{" "}
                          {testimonial.parent_designation}
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
      </div>
    </section>
  );
};

export default Testimonials2;
