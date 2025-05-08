"use client";

import ServiceCard from "@/components/partials/Service/components/service-card";
import {
  Carousel,
  CarouselContent,
  CarouselDots,
  CarouselItem,
} from "@/components/shadcn/carousel";
import { Skeleton } from "@/components/shadcn/skeleton";
import { ServiceCardSkeleton } from "@/components/skeletons";
import { useGetServicesQuery } from "@/features/public/services";
import { CAROUSEL_LIMIT } from "@/lib/constants";
import Autoplay from "embla-carousel-autoplay";
import { useEffect, useState } from "react";

const ExploreServices = ({
  title,
  recommended,
}: {
  title: string;
  recommended?: boolean;
}) => {
  const [services, setServices] = useState<any>([]);
  const { data, isLoading, isFetching }: any = useGetServicesQuery({
    limit: CAROUSEL_LIMIT,
    recommended,
  });

  const loading = isLoading || isFetching;

  useEffect(() => {
    if (data?.data?.services) {
      setServices(data?.data?.services);
    }
  }, [data]);

  return (
    <section className="py-12 md:py-28 bg-primary-2">
      <div className="container flex flex-col gap-6 md:gap-12">
        {loading ? (
          <Skeleton className="mx-auto  h-8 md:h-14 w-3/4 md:w-1/2" />
        ) : (
          <h3 className="text-2xl md:text-5xl font-bold text-gray-9 text-center">
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
            {loading ? (
              <>
                {[...Array(3)].map((_, index) => (
                  <CarouselItem key={index} className="basis-full md:basis-1/3">
                    <ServiceCardSkeleton
                      classes={{
                        root: "bg-white",
                      }}
                    />
                  </CarouselItem>
                ))}
              </>
            ) : services?.length > 0 ? (
              <>
                {services.map((service: any, index: any) => (
                  <CarouselItem key={index} className="basis-full md:basis-1/3">
                    <ServiceCard
                      service={service}
                      classes={{
                        root: "bg-white h-full",
                      }}
                    />
                  </CarouselItem>
                ))}
              </>
            ) : (
              <CarouselItem className="basis-full text-center text-gray-5">
                Not found
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

export default ExploreServices;
