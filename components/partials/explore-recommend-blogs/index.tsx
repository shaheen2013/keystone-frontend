"use client";

import {
  Carousel,
  CarouselContent,
  CarouselDots,
  CarouselItem,
} from "@/components/shadcn/Carousel2";
import Autoplay from "embla-carousel-autoplay";

import insightsimg1 from "@/public/assets/home/insights-and-stories/img1.png";
import insightsimg2 from "@/public/assets/home/insights-and-stories/img2.png";
import insightsimg3 from "@/public/assets/home/insights-and-stories/img3.png";
import BlogCard from "@/components/shadcn/blog-card";

const ExploreRecommendBlogs = () => {
  const data = {
    title: "Explore Recommended Blogs",
    blogs: [
      {
        date: "6th Feb",
        readTime: "6 minute Read",
        title: "5 Ways to Build Confidence Your Child with Special Needs",
        description:
          "Empower your child to thrive by fostering self-esteem, encouraging independence, and celebrating small victories. Explore practical strategies designed for parents.",
        image: insightsimg1,
        saveForLater: true,
      },
      {
        date: "6th Feb",
        readTime: "6 minute Read",
        title: "5 Ways to Build Confidence Your Child with Special Needs",
        description:
          "Empower your child to thrive by fostering self-esteem, encouraging independence, and celebrating small victories. Explore practical strategies designed for parents.",
        image: insightsimg2,
        saveForLater: true,
      },
      {
        date: "6th Feb",
        readTime: "6 minute Read",
        title: "5 Ways to Build Confidence Your Child with Special Needs",
        description:
          "Empower your child to thrive by fostering self-esteem, encouraging independence, and celebrating small victories. Explore practical strategies designed for parents.",
        image: insightsimg3,
        saveForLater: true,
      },
      {
        date: "6th Feb",
        readTime: "6 minute Read",
        title: "5 Ways to Build Confidence Your Child with Special Needs",
        description:
          "Empower your child to thrive by fostering self-esteem, encouraging independence, and celebrating small victories. Explore practical strategies designed for parents.",
        image: insightsimg1,
        saveForLater: true,
      },
      {
        date: "6th Feb",
        readTime: "6 minute Read",
        title: "5 Ways to Build Confidence Your Child with Special Needs",
        description:
          "Empower your child to thrive by fostering self-esteem, encouraging independence, and celebrating small victories. Explore practical strategies designed for parents.",
        image: insightsimg2,
        saveForLater: true,
      },
      {
        date: "6th Feb",
        readTime: "6 minute Read",
        title: "5 Ways to Build Confidence Your Child with Special Needs",
        description:
          "Empower your child to thrive by fostering self-esteem, encouraging independence, and celebrating small victories. Explore practical strategies designed for parents.",
        image: insightsimg3,
        saveForLater: true,
      },
    ],
  };
  const { title, blogs } = data;
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
            {blogs.map((blog, index) => (
              <CarouselItem key={index} className="basis-full md:basis-1/3">
                <BlogCard article={blog} key={index} className="bg-white" />
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

export default ExploreRecommendBlogs;
