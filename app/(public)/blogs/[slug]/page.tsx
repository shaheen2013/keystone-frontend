import React from "react";

import GetTouch from "@/components/partials/get-touch";
import { contactInfo } from "@/static/shared";
import Hero from "./components/hero";
import { heroData, recentPosts } from "./constant";
import BlogContent from "./components/blog-content";
import RecentPosts from "./components/recent-posts";
import ExploreRecommendBlogs from "@/components/partials/explore-recommend-blogs";

export default async function BlogDetails({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  console.log(slug);

  return (
    <>
      <Hero data={heroData} />
      <div className="grid grid-cols-1 md:grid-cols-[1fr_512px] py-12 md:py-28 container gap-8">
        <BlogContent />
        <RecentPosts data={recentPosts} />
      </div>
      <ExploreRecommendBlogs />

      <GetTouch data={contactInfo} />
    </>
  );
}
