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
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";

import PaginationWrapper from "@/components/partials/pagination-wrapper";
import {
  useGetblogscategoriesQuery,
  useGetblogsQuery,
} from "@/features/public/blogSlice";
import BlogCardSkeleton from "@/components/skeletons/blog-card";
import { PAGINATION_LIMIT } from "@/lib/constants";
import { PaginationSkeleton } from "@/components/skeletons";
import NotFound from "@/components/partials/not-found";
import { notFoundData } from "../../constant";
import ExploreRecommendBlogs from "@/components/partials/explore-recommend-blogs";
import { useDebounceCallback } from "usehooks-ts";

const Blogs = () => {
  const searchParams = useSearchParams();

  const [inputValue, setInputValue] = useState("");

  // State for filters
  const [search, setSearch] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [page, setPage] = useState(1);

  // Debounce the search input with 500ms delay
  const debouncedSearch = useDebounceCallback(setSearch, 500);

  const [blogsData, setBlogsData] = useState([]);

  // Initialize state from URL params on first render
  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    const pageParam = params.get("page");
    setPage(pageParam ? Math.max(1, parseInt(pageParam)) : 1);
  }, [searchParams]);

  // Fetch blogs data using state values
  const { data, isLoading, isFetching }: any = useGetblogsQuery({
    query: search,
    page: page,
    pagi_limit: PAGINATION_LIMIT,
    blog_category_ids: selectedCategories,
  });

  const { data: categoriesData }: any = useGetblogscategoriesQuery({});

  const loading = isLoading || isFetching;
  const totalBlogs = data?.data?.blogs?.total || 0;
  const categories = categoriesData?.data.blog_categories || [];

  const handleSearch = (value: string) => {
    setInputValue(value);
    debouncedSearch(value);
    handlePageChange(1);
  };

  const handleCategorySelect = (categoryID: string) => {
    setSelectedCategories((prev) => {
      const newCategories = prev.includes(categoryID)
        ? prev.filter((c) => c !== categoryID)
        : [...prev, categoryID];
      return newCategories;
    });
    handlePageChange(1);
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    updateUrlParams("page", newPage.toString());
  };

  const updateUrlParams = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set(key, value);
    window.history.replaceState({}, "", `?${params.toString()}`);
  };

  useEffect(() => {
    if (data?.data?.blogs?.data) {
      setBlogsData(data.data.blogs.data);
    }
  }, [data]);

  return (
    <>
      <section className="py-12 md:py-28">
        <div className="container flex flex-col">
          {/* filter area */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 md:mb-12">
            <h4 className="text-gray-9 text-2xl md:text-4xl font-semibold">
              {search ? "Search Results" : "All Blogs"}
            </h4>

            <div className="flex flex-col md:flex-row gap-4">
              <Input
                placeholder="Search by blog name"
                endIcon={<Search className="text-gray-7 size-6" />}
                value={inputValue}
                onChange={(event) => handleSearch(event.target.value)}
              />
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    className="ml-auto font-semibold text-gray-5 px-4 py-3 w-full md:w-fit justify-between"
                  >
                    Filter by category
                    <ChevronDown className="ml-10 size-6 text-gray-7" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end">
                  <DropdownMenuLabel>Filter</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {categories.map((category: any) => (
                    <DropdownMenuItem
                      key={category.id}
                      onClick={() => handleCategorySelect(category.id)}
                      className={cn(
                        "my-1",
                        selectedCategories.includes(category.id) && "bg-gray-1"
                      )}
                    >
                      {category.name}
                      {selectedCategories.includes(category.id) && (
                        <Check className="ml-auto size-6 text-primary-6" />
                      )}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          {/* blogs area */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 md:mb-12">
            {loading ? (
              Array.from({ length: PAGINATION_LIMIT }).map((_, index) => (
                <BlogCardSkeleton key={`skeleton-${index}`} />
              ))
            ) : blogsData?.length > 0 ? (
              blogsData.map((blog: any) => (
                <BlogCard key={blog.id} article={blog} />
              ))
            ) : (
              <div className="col-span-full">
                <NotFound data={notFoundData} />
              </div>
            )}
          </div>

          {totalBlogs > 0 && <hr className="bg-primary-2 mb-4 md:mb-7" />}

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
        </div>
      </section>

      {!loading && blogsData?.length === 0 && <ExploreRecommendBlogs />}
    </>
  );
};

export default Blogs;
