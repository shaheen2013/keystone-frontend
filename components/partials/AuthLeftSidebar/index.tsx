"use client";

import Image from "next/image";
import classNames from "classnames";
import { useEffect, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";

import {
  Carousel,
  CarouselApi,
  CarouselItem,
  CarouselContent,
} from "@/components/partials/auth-carousel";
import { useGetTestimonialQuery } from "@/features/public/testimonialSlice";

export default function AuthLeftSidebar({ className }: { className: string }) {
  const { data, isLoading, isFetching }: any = useGetTestimonialQuery({});
  const testimonials = data?.data?.parent_reviews || [];
  const loading = isLoading || isFetching;

  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  const clx = classNames("relative", className);

  useEffect(() => {
    if (!api) return;

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  // Handle loading state
  if (loading) {
    return (
      <div className={clx}>
        <div className="w-full h-screen bg-gray-200 animate-pulse" />
      </div>
    );
  }

  return (
    <div className={clx}>
      {testimonials?.length === 0 && (
        <div className="w-full h-screen">
          <Image
            src="/assets/auth/carousel/welcome.webp"
            alt="welcome"
            fill
            className="object-cover object-top h-full w-full"
          />
        </div>
      )}
      <Carousel setApi={setApi} className="w-full h-screen">
        <CarouselContent>
          {testimonials?.map((carouselData: any, index: number) => (
            <CarouselItem key={index} className="relative h-screen">
              {
                // Testimonial Image
                carouselData?.background_image?.path && (
                  <Image
                    src={carouselData?.background_image?.path}
                    alt={`Testimonial ${index + 1}`}
                    fill
                    className="object-cover object-center h-full w-full"
                  />
                )
              }

              {/* Testimonial Content */}
              <div className="absolute bottom-0 left-0 right-0 backdrop-blur-lg bg-[#141F1FB2] p-8">
                {/* Rating */}
                <div className="flex items-center space-x-1 mb-4">
                  {Array.from({ length: carouselData?.rating || 0 }).map(
                    (_, i) => (
                      <Image
                        key={i}
                        src="/icons/star.svg"
                        alt="star"
                        width={20}
                        height={20}
                        className="h-5 w-5"
                      />
                    )
                  )}
                </div>

                {/* Feedback */}
                <p className="text-white font-semibold text-3xl mb-8 line-clamp-4">
                  {carouselData?.feedback}
                </p>

                {/* Author Info */}
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-white font-semibold text-xl mb-1">
                      {carouselData?.parent_name}
                    </p>
                    <p className="text-white text-base">
                      {carouselData?.parent_designation}
                    </p>
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}

          {testimonials?.length === 0 && (
            <CarouselItem className="relative h-screen flex justify-center items-center">
              <p className="text-gray-9 text-2xl font-semibold">
                No Testimonial Found
              </p>
            </CarouselItem>
          )}
        </CarouselContent>

        {/* Navigation Arrows */}
        <div className="absolute bottom-4 right-4 flex gap-x-8 z-10">
          <button
            className={`border border-white h-14 w-14 rounded-full flex items-center justify-center transition-colors ${
              current === 1
                ? "opacity-50 cursor-not-allowed"
                : "hover:border-secondary-6 hover:bg-secondary-6"
            }`}
            onClick={() => api?.scrollPrev()}
            disabled={current === 1}
            aria-label="Previous testimonial"
            title="Previous testimonial"
            type="button"
          >
            <ArrowLeft size={24} stroke="#fff" />
          </button>
          <button
            className={`border border-white h-14 w-14 rounded-full flex items-center justify-center transition-colors ${
              current === count
                ? "opacity-50 cursor-not-allowed"
                : "hover:border-secondary-6 hover:bg-secondary-6"
            }`}
            onClick={() => api?.scrollNext()}
            disabled={current === count}
            aria-label="Next testimonial"
            title="Next testimonial"
            type="button"
          >
            <ArrowRight size={24} stroke="#fff" />
          </button>
        </div>
      </Carousel>
    </div>
  );
}
