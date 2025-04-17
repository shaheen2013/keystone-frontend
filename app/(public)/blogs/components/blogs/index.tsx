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

const Blogs = () => {
  const searchParams = useSearchParams();

  // State for filters
  const [search, setSearch] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [page, setPage] = useState(1);

  // Initialize state from URL params on first render
  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    setPage(Number(params.get("page")) || 1);
  }, [searchParams]);

  // Fetch blogs data using state values
  const { data, isLoading, isFetching }: any = useGetblogsQuery({
    query: search,
    blog_category_ids: selectedCategories,
    page: page,
    pagi_limit: PAGINATION_LIMIT,
  });

  const { data: categoriesData }: any = useGetblogscategoriesQuery({});

  const loading = isLoading || isFetching;
  const blogsData = data?.data || [];
  const totalBlogs = blogsData?.blogs?.total;
  const categories = categoriesData?.data.blog_categories || [];

  const handleSearch = (value: string) => {
    setSearch(value);
    setPage(1);
  };

  const handleCategorySelect = (categoryID: string) => {
    setSelectedCategories((prev) => {
      if (prev.includes(categoryID)) {
        return prev.filter((c) => c !== categoryID);
      } else {
        return [...prev, categoryID];
      }
    });
    setPage(1);
  };

  return (
    <section className="py-12 md:py-28">
      <div className="container flex flex-col">
        {/* filter area */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 md:mb-12">
          <h4 className="text-gray-9 text-2xl md:text-4xl font-semibold">
            {search ? "Search Results" : " All Blogs"}
          </h4>

          <div className="flex flex-col md:flex-row gap-4">
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
            <>
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
