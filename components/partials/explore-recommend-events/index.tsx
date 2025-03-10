"use client";

import {
  Carousel,
  CarouselContent,
  CarouselDots,
  CarouselItem,
} from "@/components/shadcn/Carousel2";
import EventCard from "@/components/shadcn/event-card";
import Autoplay from "embla-carousel-autoplay";

import img1 from "@/public/assets/home/upcoming-events/parent-training.png";

const ExploreRecommendEvents = () => {
  const data = {
    title: "Explore Recommended Events",
    articles: [
      {
        time: "6:00 PM, 6th Feb 2025",
        title: "Parent Training Workshop",
        description:
          "Learn practical strategies to support your child's growth and development. Learn practical strategies to support your child's growth and development.",
        image: img1,
      },
      {
        time: "6:00 PM, 6th Feb 2025",
        title: "Parent Training Workshop",
        description:
          "Learn practical strategies to support your child's growth and development. Learn practical strategies to support your child's growth and development.",
        image: img1,
      },
      {
        time: "6:00 PM, 6th Feb 2025",
        title: "Parent Training Workshop",
        description:
          "Learn practical strategies to support your child's growth and development. Learn practical strategies to support your child's growth and development.",
        image: img1,
      },
      {
        time: "6:00 PM, 6th Feb 2025",
        title: "Parent Training Workshop",
        description:
          "Learn practical strategies to support your child's growth and development. Learn practical strategies to support your child's growth and development.",
        image: img1,
      },
      {
        time: "6:00 PM, 6th Feb 2025",
        title: "Parent Training Workshop",
        description:
          "Learn practical strategies to support your child's growth and development. Learn practical strategies to support your child's growth and development.",
        image: img1,
      },
    ],
  };
  const { title, articles } = data;
  return (
    <section className="bg-primary-2 py-12 md:py-28">
      <div className="container flex flex-col gap-6 md:gap-12">
        <h3 className="text-center text-2xl md:text-5xl font-bold text-gray-9">
          {title}
        </h3>
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
            {articles.map((event, index) => (
              <CarouselItem key={index} className="basis-full md:basis-1/3">
                <EventCard event={event} key={index} className="bg-white" />
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="mt-6 md:mt-12">
            <CarouselDots />
          </div>
        </Carousel>
      </div>
    </section>
  );
};

export default ExploreRecommendEvents;
