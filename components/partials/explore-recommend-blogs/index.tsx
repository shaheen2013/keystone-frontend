"use client";

import Autoplay from "embla-carousel-autoplay";
import BlogCard from "@/components/shadcn/blog-card";
import {
  Carousel,
  CarouselContent,
  CarouselDots,
  CarouselItem,
} from "@/components/shadcn/carousel";
import {
  useGetblogsQuery,
  useSaveToggleMutation,
} from "@/features/public/blogSlice";
import { PAGINATION_LIMIT } from "@/lib/constants";
import { Skeleton } from "@/components/shadcn/skeleton";
import { BlogCardSkeleton } from "@/components/skeletons";
import { useEffect, useState } from "react";

const ExploreRecommendBlogs = () => {
  const [blogsData, saveBlogsData] = useState([]);
  const { data, isLoading, isFetching }: any = useGetblogsQuery({
    page: 1,
    pagi_limit: PAGINATION_LIMIT,
  });
  const [saveToggle] = useSaveToggleMutation();

  const loading = isLoading || isFetching;

  const handleToggle = async (id: string) => {
    try {
      //  immediately update UI
      saveBlogsData((prevBlogs: any) =>
        prevBlogs.map((blog: any) =>
          blog.id === id ? { ...blog, is_saved: !blog.is_saved } : blog
        )
      );

      // Send API request
      await saveToggle({ blog_id: id }).unwrap();
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      // Revert on error
      saveBlogsData((prevBlogs: any) =>
        prevBlogs.map((blog: any) =>
          blog.id === id ? { ...blog, is_saved: !blog.is_saved } : blog
        )
      );
    }
  };

  useEffect(() => {
    if (data?.data?.blogs?.data) {
      saveBlogsData(data.data.blogs.data);
    }
  }, [data]);

  return (
    <section className="bg-primary-2 py-12 md:py-28">
      <div className="container flex flex-col gap-6 md:gap-12">
        {loading ? (
          <Skeleton className="mx-auto mb-4 md:mb-6 h-8 md:h-14 w-3/4 md:w-1/2" />
        ) : (
          <h3 className="text-center text-2xl md:text-5xl font-bold text-gray-9">
            Explore Recommended Blogs
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
            {loading && (
              <>
                {[...Array(3)].map((_, index) => (
                  <CarouselItem key={index} className="basis-full md:basis-1/3">
                    <BlogCardSkeleton className="bg-white" />
                  </CarouselItem>
                ))}
              </>
            )}
            {blogsData?.map((blog: any, index: any) => (
              <CarouselItem key={index} className="basis-full md:basis-1/3">
                <BlogCard
                  article={blog}
                  key={index}
                  classes={{ root: "bg-white" }}
                  handleToggle={handleToggle}
                />
              </CarouselItem>
            ))}

            {!loading && blogsData?.length === 0 && (
              <CarouselItem className="basis-full">
                <h4 className="text-center self-center text-gray-9 text-lg font-semibold">
                  No Blogs Found
                </h4>
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

export default ExploreRecommendBlogs;
