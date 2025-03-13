"use client";

import { Button } from "@/components/shadcn/button";
import {
  Carousel,
  CarouselContent,
  CarouselDots,
  CarouselItem,
} from "@/components/shadcn/Carousel2";
import Autoplay from "embla-carousel-autoplay";
import Link from "next/link";
import BlogCard from "@/components/shadcn/blog-card";

const InsightsAndStories = ({ data }: { data: any }) => {
  const { title, cta, articles } = data;
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
          {articles.map((article:any, index:any) => (
            <CarouselItem key={index} className="basis-full md:basis-1/3">
              <BlogCard article={article} />
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
