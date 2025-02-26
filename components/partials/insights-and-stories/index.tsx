"use client";

import Image from "next/image";
import { insightsAndStoriesData } from "./constant";
import { Button } from "@/components/shadcn/button";
import { Heart } from "@/components/icons";
import {
  Carousel,
  CarouselContent,
  CarouselDots,
  CarouselItem,
} from "@/components/shadcn/Carousel";
import Autoplay from "embla-carousel-autoplay";
import Link from "next/link";

const InsightsAndStories = () => {
  const { title, cta, articles } = insightsAndStoriesData;
  return (
    <section className="container my-12 md:my-28 flex flex-col gap-6 md:gap-12">
      <div className="flex gap-6 justify-between items-center md:items-start">
        <h3 className="text-2xl md:text-5xl font-bold text-gray-9 grow">
          {title}
        </h3>

        <Button variant="secondary" size="lg" className="shrink-0" asChild>
          <Link href={cta.link}>{cta.text}</Link>
        </Button>
      </div>
      <Carousel
        opts={{
          loop: false,
          duration: 60,
          align: "start",
        }}
        plugins={[
          Autoplay({
            delay: 8000,
            stopOnInteraction: false,
            stopOnMouseEnter: true,
          }),
        ]}
      >
        <CarouselContent>
          {articles.map((article, index) => (
            <CarouselItem key={index} className="basis-full md:basis-1/3">
              <div className="bg-primary-2 p-4 md:p-8 rounded-2xl flex flex-col gap-4 md:gap-6 items-start">
                <div className="relative">
                  <Image
                    src={article.image}
                    width={1000}
                    height={760}
                    alt={article.title}
                  />
                  <div className="absolute top-4 right-4 bg-white rounded-xl py-2.5 px-6 flex gap-2 cursor-pointer">
                    <Heart className="text-gray-9" />
                    <span className="text-gray-9 text-sm font-semibold">
                      Save for Later
                    </span>
                  </div>
                </div>
                <div className="flex flex-col gap-3 md:gap-4">
                  <div className="flex gap-2 justify-between text-secondary-6 font-medium text-base">
                    <span>{article.date}</span>
                    <span>{article.readTime}</span>
                  </div>
                  <h3 className="text-gray-9 text-xl md:text-3xl font-bold">
                    {article.title}
                  </h3>
                  <p className="text-gray-9 text-sm md:text-lg line-clamp-3">
                    {article.description}
                  </p>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className="mt-6 md:mt-12">
          <CarouselDots />
        </div>
      </Carousel>
    </section>
  );
};

export default InsightsAndStories;
