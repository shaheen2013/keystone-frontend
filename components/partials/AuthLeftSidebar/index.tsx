"use client";

import Image from "next/image";
import classNames from "classnames";
import { useEffect, useState } from "react";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  CarouselApi,
} from "@/components/partials/auth-carousel";
import { carouselContent } from "@/static/carousel";

export default function AuthLeftSidebar({ className }: { className: string }) {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  const clx = classNames("", className);

  useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  return (
    <div className={clx}>
      <Carousel setApi={setApi}>
        <CarouselContent className=" w-full h-screen">
          {carouselContent.map((carouselData, index) => (
            <CarouselItem key={index} className="">
              <Image
                src={carouselData.image}
                alt="1"
                width={1200}
                height={800}
                className="w-full h-full object-cover "
              />
              <div className="p-1">hey #{index}</div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
}
