"use client";

import { Button } from "@/components/shadcn/button";
import Link from "next/link";
import { useGetServicesQuery } from "@/features/public/services";
import ServiceCard from "./components/service-card";
import { Skeleton } from "@/components/shadcn/skeleton";

const ServiceSection = ({
  keyService,
  title,
  subtitle,
}: {
  keyService?: boolean;
  title: string;
  subtitle: string;
}) => {
  const { data, isLoading, isFetching }: any = useGetServicesQuery({});
  const services = data?.data?.services || [];

  const loading = isLoading || isFetching;

  return (
    <section className="container my-12 md:my-28 flex flex-col items-center">
      {loading ? (
        <Skeleton className="mb-4 md:mb-6 h-8 md:h-14 w-3/4 md:w-1/2" />
      ) : (
        <h2 className="mb-4 md:mb-6 text-2xl md:text-5xl font-bold text-gray-9 text-center">
          {title}
        </h2>
      )}
      {loading ? (
        <Skeleton className="mb-6 md:mb-12 h-6 md:h-8 w-5/6 md:w-2/3" />
      ) : (
        <p className="mb-6 md:mb-12 text-base md:text-2xl text-gray-8 text-center">
          {subtitle}
        </p>
      )}

      <div className="mb-6 md:mb-12 flex flex-col md:flex-row md:flex-wrap justify-center gap-4 md:gap-8 w-full">
        {loading && (
          <>
            {Array.from({ length: 3 }).map((_, index) => (
              <div
                key={index}
                className="bg-primary-2 p-4 md:p-8 rounded-2xl flex flex-col gap-6 items-start  max-w-[512px] w-full"
              >
                <Skeleton className="p-4 rounded-xl size-12" />
                <div className="flex flex-col gap-4 w-full">
                  <Skeleton className="h-8 w-3/4" />
                  <div className="space-y-2 w-full">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-5/6" />
                    <Skeleton className="h-4 w-2/3" />
                  </div>
                </div>
                <Skeleton className="h-6 w-32" />
              </div>
            ))}
          </>
        )}

        {services.length > 0 &&
          services?.map((service: any, index: any) => (
            <ServiceCard key={index} service={service} />
          ))}
      </div>
      {keyService &&
        (loading ? (
          <Skeleton className="h-10 md:h-16 w-32" />
        ) : (
          <Button variant="secondary" size="lg" asChild>
            <Link href="/service">See All</Link>
          </Button>
        ))}
    </section>
  );
};

export default ServiceSection;
