"use client";

import { Button } from "@/components/shadcn/button";

import Autoplay from "embla-carousel-autoplay";
import Link from "next/link";
import BlogCard from "@/components/shadcn/blog-card";
import {
  Carousel,
  CarouselContent,
  CarouselDots,
  CarouselItem,
} from "@/components/shadcn/carousel";
import { useEffect, useState } from "react";
import { useGetblogsQuery } from "@/features/public/blogSlice";
import { CAROUSEL_LIMIT } from "@/lib/constants";
import { Skeleton } from "@/components/shadcn/skeleton";
import { BlogCardSkeleton } from "@/components/skeletons";

const InsightsAndStories = () => {
  const [blogsData, setBlogsData] = useState([]);

  // Fetch blogs data using state values
  const { data, isLoading, isFetching }: any = useGetblogsQuery({
    limit: CAROUSEL_LIMIT,
  });

  const loading = isLoading || isFetching;

  useEffect(() => {
    if (data?.data?.blogs) {
      setBlogsData(data.data.blogs);
    }
  }, [data]);

  return (
    <section className="container my-12 md:my-28 flex flex-col gap-6 md:gap-12">
      <div className="flex gap-6 justify-between items-center md:items-start">
        {loading ? (
          <Skeleton className="h-8 md:h-12 w-40" />
        ) : (
          <h3 className="text-2xl md:text-5xl font-bold text-gray-9 grow">
            Insights & Stories
          </h3>
        )}
        {blogsData?.length > 0 && (
          <Button variant="secondary" size="lg" className="shrink-0" asChild>
            <Link href="/blogs">See All</Link>
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
                  <BlogCardSkeleton key={`skeleton-${index}`} />
                </CarouselItem>
              ))}
            </>
          ) : (
            <>
              {blogsData?.length > 0 ? (
                <>
                  {blogsData?.map((article: any, index: any) => (
                    <CarouselItem
                      key={index}
                      className="basis-full md:basis-1/3"
                    >
                      <BlogCard article={article} setBlogsData={setBlogsData} />
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

export default InsightsAndStories;
