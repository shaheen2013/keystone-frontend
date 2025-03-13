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
import { carouselContent } from "@/static/carousel";

export default function AuthLeftSidebar({ className }: { className: string }) {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  // const [count, setCount] = useState(0);

  const clx = classNames("relative", className);

  const content = carouselContent[current - 1];

  useEffect(() => {
    if (!api) {
      return;
    }

    // setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  return (
    <div className={clx}>
      <Carousel setApi={setApi}>
        <CarouselContent className="w-full h-screen">
          {carouselContent.map((carouselData, index) => (
            <CarouselItem key={index} className="">
              <Image
                src={carouselData.image}
                alt="1"
                width={1200}
                height={800}
                className="w-full h-full  "
              />
              <div className="p-1">hey #{index}</div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      {/* information */}
      <div className="absolute bottom-0 left-0 right-0 backdrop-blur-lg bg-[#141F1FB2] p-8">
        {/* star */}
        <div className="flex items-center space-x-1 mb-4">
          <Image
            src="/icons/star.svg"
            alt="star"
            width={20}
            height={20}
            className="h-5 w-5"
          />

          <Image
            src="/icons/star.svg"
            alt="star"
            width={20}
            height={20}
            className="h-5 w-5"
          />

          <Image
            src="/icons/star.svg"
            alt="star"
            width={20}
            height={20}
            className="h-5 w-5"
          />

          <Image
            src="/icons/star.svg"
            alt="star"
            width={20}
            height={20}
            className="h-5 w-5"
          />

          <Image
            src="/icons/star.svg"
            alt="star"
            width={20}
            height={20}
            className="h-5 w-5"
          />
        </div>

        {/* description */}
        <p className="text-white font-semibold text-3xl mb-8">
          {content?.description}
        </p>

        {/* name, role, arrow */}
        <div className="flex justify-between">
          {/* name, role */}
          <div className="">
            <p className="text-white font-semibold text-xl mb-1">
              {content?.name}
            </p>
            <p className="text-white text-base">{content?.role}</p>
          </div>

          {/* arrow */}
          <div className="flex gap-x-8">
            <button
              className="border border-white h-14 w-14 rounded-full flex items-center justify-center"
              onClick={() => api?.scrollPrev()}
            >
              <ArrowLeft size={24} stroke="#fff" />
            </button>
            <button
              className="border border-secondary-6 h-14 w-14 rounded-full flex items-center justify-center bg-secondary-6"
              onClick={() => api?.scrollNext()}
            >
              <ArrowRight size={24} stroke="#fff" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
