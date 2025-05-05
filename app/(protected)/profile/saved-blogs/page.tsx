"use client";

import Cookies from "js-cookie";
import PaginationWrapper from "@/components/partials/pagination-wrapper";
import BlogCard from "@/components/shadcn/blog-card";
import { BlogCardSkeleton, PaginationSkeleton } from "@/components/skeletons";
import { useGetSavedBlogsQuery } from "@/features/public/blogSlice";
import { PAGINATION_LIMIT } from "@/lib/constants";
import { useRouter } from "next/navigation";
import React, { Suspense, useEffect, useState } from "react";

export default function AccountSavedBlogs() {
  const router = useRouter();
  const [page, setPage] = useState(1);
  const [savedBlogs, setSavedBlogs] = useState<any[]>([]);

  const { data, isFetching, isLoading, isError, error }: any =
    useGetSavedBlogsQuery({
      page: page,
      pagi_limit: PAGINATION_LIMIT,
    });

  const loading = isLoading || isFetching;

  const totalBlogs = data?.data?.saved_blogs?.total || 0;

  useEffect(() => {
    if (data?.data?.saved_blogs?.data) {
      setSavedBlogs(data.data.saved_blogs.data);
    }
  }, [data]);

  useEffect(() => {
    if (isError && error.status === 401) {
      console.log("error", error);
      Cookies.remove("key_stone_token");
      router.push("/login");
    }
  }, [router, isError, error]);

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
          ) : savedBlogs?.length > 0 ? (
            savedBlogs?.map((blog: any) => (
              <BlogCard
                key={blog.id}
                article={blog}
                userPanel
                classes={{
                  image: "h-[230px] md:h-[214px]",
                  title: "text-xl md:text-xl font-semibold",
                }}
                setBlogsData={setSavedBlogs}
              />
            ))
          ) : (
            <div className="col-span-full text-center py-12 text-gray-5">
              You haven&#39;t not saved any blog
            </div>
          )}
        </div>
        {totalBlogs > PAGINATION_LIMIT && (
          <hr className="bg-primary-2 mb-4 md:mb-7" />
        )}

        {/* pagination area */}
        <Suspense fallback={<div className="h-10" />}>
          {/* pagination area */}
          {loading ? (
            <PaginationSkeleton className="mt-4 col-span-full text-center" />
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
