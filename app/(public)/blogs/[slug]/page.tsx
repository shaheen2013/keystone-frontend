"use client";

import React from "react";

import GetTouch from "@/components/partials/get-touch";
import Hero from "./components/hero";
import BlogContent from "./components/blog-content";
import RecentPosts from "./components/recent-posts";
import ExploreRecommendBlogs from "@/components/partials/explore-recommend-blogs";
import { useGetblogQuery } from "@/features/public/blogSlice";
import NotFound from "@/components/partials/dynamic-page-not-found";
import { use } from "react";

export default function BlogDetails({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);

  const { data, isLoading, isFetching, isError, error }: any = useGetblogQuery({
    slug,
  });

  console.log(slug);

  // Show skeletons while loading
  const loading = isLoading || isFetching;

  const blogData = data?.data?.blog || {};

  const heroData = {
    title: blogData?.title,
    subtitle: blogData?.subtitle,
    banner: blogData?.banner?.path || "",
    readTime: blogData?.reading_time,
    dateTime: blogData?.created_at,
  };

  // Handle 404 errors using your custom component
  if (isError && error?.status === 404) {
    return <NotFound />;
  }

  return (
    <>
      <Hero data={heroData} loading={loading} />
      <div className="grid grid-cols-1 md:grid-cols-[1fr_512px] py-12 md:py-28 container gap-8">
        <BlogContent data={blogData} loading={loading} />
        <RecentPosts />
      </div>
      <ExploreRecommendBlogs />

      <GetTouch />
    </>
  );
}
