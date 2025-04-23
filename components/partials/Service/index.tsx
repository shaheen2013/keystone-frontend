"use client";

import { Button } from "@/components/shadcn/button";
import Link from "next/link";
import { useGetServicesQuery } from "@/features/public/services";
import ServiceCard from "./components/service-card";
import { Skeleton } from "@/components/shadcn/skeleton";
import { ServiceCardSkeleton } from "@/components/skeletons";
import { PAGINATION_LIMIT } from "@/lib/constants";
import { useState } from "react";

const ServiceSection = ({
  keyService,
  title,
  subtitle,
}: {
  keyService?: boolean;
  title: string;
  subtitle: string;
}) => {
  const [page, setPage] = useState(1);

  const limit = 3;

  const queryParams = keyService
    ? { limit: limit }
    : {
        page: page,
        pagi_limit: PAGINATION_LIMIT,
      };

  const { data, isLoading, isFetching }: any = useGetServicesQuery(queryParams);
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
              <ServiceCardSkeleton key={index} />
            ))}
          </>
        )}

        {services?.length > 0 &&
          services?.map((service: any, index: any) => (
            <ServiceCard key={index} service={service} />
          ))}

        {!loading && services?.length === 0 && (
          <p className="text-gray-8 text-base md:text-2xl text-center">
            No Services Found.
          </p>
        )}
      </div>
      {keyService &&
        (loading ? (
          <Skeleton className="h-10 md:h-16 w-32" />
        ) : (
          <>
            {services?.length > 0 && (
              <Button variant="secondary" size="lg" asChild>
                <Link href="/services">See All</Link>
              </Button>
            )}
          </>
        ))}
    </section>
  );
};

export default ServiceSection;
