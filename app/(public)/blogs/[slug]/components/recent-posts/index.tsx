"use client";

import { useGetblogsQuery } from "@/features/public/blogSlice";
import RecentPostCard from "./components/recent-post-card";
import { PAGINATION_LIMIT } from "@/lib/constants";
import { Skeleton } from "@/components/shadcn/skeleton";
import RecentPostCardSkeleton from "./components/recent-post-skeleton";

const RecentPosts = () => {
  const { data, isLoading, isFetching }: any = useGetblogsQuery({
    page: 1,
    pagi_limit: PAGINATION_LIMIT,
  });

  const recentPost = data?.data?.blogs.data.slice(0, 4);

  const loading = isLoading || isFetching;

  return (
    <section className="rounded-2xl bg-primary-2 overflow-hidden h-fit">
      {loading ? (
        <div className="bg-primary-3 p-6">
          <Skeleton className="h-8 w-48" />
        </div>
      ) : (
        <h4 className="bg-primary-3 p-6 text-gray-9 font-semibold text-2xl">
          Recent Posts
        </h4>
      )}
      <div className="flex flex-col gap-4 p-6">
        {loading && (
          <>
            {[...Array(4)].map((_, index) => (
              <RecentPostCardSkeleton key={index} />
            ))}
          </>
        )}
        {!loading && recentPost?.length === 0 && (
          <div className="p-4 text-gray-5 font-semibold text-sm text-center">
            No recent posts found
          </div>
        )}
        {recentPost?.map((item: any, index: any) => (
          <RecentPostCard key={index} data={item} />
        ))}
      </div>
    </section>
  );
};

export default RecentPosts;
