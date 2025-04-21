"use client";

import PaginationWrapper from "@/components/partials/pagination-wrapper";
import BlogCard from "@/components/shadcn/blog-card";
import { BlogCardSkeleton, PaginationSkeleton } from "@/components/skeletons";
import {
  useGetSavedBlogsQuery,
  useSaveToggleMutation,
} from "@/features/public/blogSlice";
import { PAGINATION_LIMIT } from "@/lib/constants";
import React, { Suspense, useState } from "react";

export default function AccountSavedBlogs() {
  const [page, setPage] = useState(1);

  const { data, isFetching, isLoading, refetch }: any = useGetSavedBlogsQuery({
    page: page,
    pagi_limit: PAGINATION_LIMIT,
  });

  const [saveToggle] = useSaveToggleMutation();

  const loading = isLoading || isFetching;

  const savedBlogs = data?.data.saved_blogs.data || [];
  const totalBlogs = data?.data?.saved_blogs?.total || 0;

  const handleToggle = async (id: string) => {
    try {
      const result = await saveToggle({ blog_id: id }).unwrap();
      console.log("Toggled:", result);
      refetch();
    } catch (err) {
      console.error("Failed to toggle save:", err);
    }
  };

  return (
    <div className="bg-primary-1 rounded-2xl">
      <div className="font-semibold lg:text-2xl text-lg lg:py-6 lg:px-8 p-4  bg-primary-2 rounded-t-2xl">
        Saved Blogs
      </div>

      {/* content */}
      <div className="lg:p-8 p-4">
        {/* events */}
        <div className="grid md:grid-cols-3 grid-cols-1 gap-6 mb-4 md:mb-6">
          {loading ? (
            Array.from({ length: PAGINATION_LIMIT }).map((_, index) => (
              <BlogCardSkeleton key={`skeleton-${index}`} />
            ))
          ) : totalBlogs > 0 ? (
            savedBlogs.map((blog: any) => (
              <BlogCard
                key={blog.id}
                article={blog}
                userPanel
                classes={{
                  image: "h-[230px] md:h-[214px]",
                  title: "text-xl md:text-xl font-semibold",
                }}
                handleToggle={handleToggle}
              />
            ))
          ) : (
            <div className="col-span-full text-center">No Saved Blogs</div>
          )}
        </div>
        <hr className="bg-primary-2 mb-4 md:mb-7" />
        {/* pagination area */}
        <Suspense fallback={<div className="h-10" />}>
          {/* pagination area */}
          {loading ? (
            <PaginationSkeleton className="mt-4" />
          ) : (
            <>
              {totalBlogs > PAGINATION_LIMIT && (
                <PaginationWrapper
                  page={page}
                  setPage={setPage}
                  total={totalBlogs}
                  limit={PAGINATION_LIMIT}
                  className="col-span-full"
                />
              )}
            </>
          )}
        </Suspense>
      </div>
    </div>
  );
}
