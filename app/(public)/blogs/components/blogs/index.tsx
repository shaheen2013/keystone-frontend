"use client";

import { ChevronDown, Search } from "@/components/icons";
import BlogCard from "@/components/shadcn/blog-card";
import { Button } from "@/components/shadcn/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/shadcn/dropdown-menu";
import { Input } from "@/components/shadcn/input";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import PaginationWrapper from "@/components/partials/pagination-wrapper";
import { useGetblogsQuery } from "@/features/public/blogSlice";
import BlogCardSkeleton from "@/components/skeletons/blog-card";
import { PAGINATION_LIMIT } from "@/lib/constants";
import { Skeleton } from "@/components/shadcn/skeleton";
import { PaginationSkeleton } from "@/components/skeletons";
import NotFound from "@/components/partials/not-found";
import { notFoundData } from "../../constant";

const Blogs = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [search, setSearch] = useState(searchParams.get("search") || "");
  const [selectedCategory, setSelectedCategory] = useState(
    searchParams.get("category") || "Select Category"
  );
  const [page, setPage] = useState(searchParams.get("page") || 1);

  const { data, isLoading, isFetching }: any = useGetblogsQuery({
    query: searchParams.get("search") || "",
    blog_category_ids: searchParams.get("category") || "",
    page: page,
    pagi_limit: PAGINATION_LIMIT,
  });

  const loading = isLoading || isFetching;
  const blogsData = data?.data || [];
  const totalBlogs = blogsData?.blogs?.total;
  const handleSearch = (value: string) => {
    setSearch(value);
    updateUrlParams("search", value);
  };

  // Function to update URL parameters
  const updateUrlParams = (key: string, value: string | null) => {
    const params = new URLSearchParams(searchParams.toString());

    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }

    router.push(`?${params.toString()}`, { scroll: false });
  };

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    updateUrlParams("category", category);
  };

  return (
    <section className="py-12 md:py-28">
      <div className="container flex flex-col">
        {/* filter area */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 md:mb-12">
          {loading ? (
            <Skeleton className="h-8 w-full md:h-10 md:w-64 rounded-md" />
          ) : (
            <h4 className="text-gray-9 text-2xl md:text-4xl font-semibold">
              {search ? "Search Results" : " All Blogs"}
            </h4>
          )}

          <div className="flex flex-col md:flex-row gap-4">
            {loading ? (
              <>
                {/* Search Input Skeleton */}
                <Skeleton className="h-12 w-full rounded-md" />
                {/* Dropdown Skeleton */}
                <Skeleton className="h-12 w-full md:w-48 rounded-md" />
              </>
            ) : (
              <>
                <Input
                  placeholder="Search by blog name"
                  endIcon={<Search className="text-gray-7 size-6" />}
                  value={search}
                  onChange={(event) => handleSearch(event.target.value)}
                />
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="outline"
                      className="ml-auto font-semibold text-gray-5 px-4 py-3 w-full md:w-fit justify-between"
                    >
                      {selectedCategory}
                      <ChevronDown className="ml-10 size-6 text-gray-7" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56" align="end">
                    <DropdownMenuLabel>Filter</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    {[
                      "Frontend Development",
                      "Backend Development",
                      "UI/UX Design",
                      "JavaScript Tips",
                      "React & Next.js",
                    ].map((category) => (
                      <DropdownMenuItem
                        key={category}
                        onClick={() => handleCategorySelect(category)}
                        className={cn(
                          "my-1",
                          selectedCategory === category && "bg-gray-1"
                        )}
                      >
                        {category}
                        {selectedCategory === category && (
                          <Check className="ml-auto size-6 text-primary-6" />
                        )}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            )}
          </div>
        </div>
        {/* blogs area */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 md:mb-12">
          {loading ? (
            <>
              {/*  Blog Card Skeleton */}
              {Array.from({ length: PAGINATION_LIMIT }, (_, index) => (
                <BlogCardSkeleton key={`skeleton-${index}`} />
              ))}
            </>
          ) : (
            <>
              {blogsData?.blogs?.data.map((blog: any, index: any) => (
                <BlogCard key={index} article={blog} />
              ))}
            </>
          )}
        </div>

        {/* No results found */}
        {totalBlogs === 0 && <NotFound data={notFoundData} />}

        <hr className="bg-primary-2 mb-4 md:mb-7" />

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
                className="col-span-full"
              />
            )}
          </>
        )}
      </div>
    </section>
  );
};

export default Blogs;
