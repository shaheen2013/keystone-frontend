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
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useDebounceCallback } from "usehooks-ts";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/shadcn/pagination";

const Blogs = ({ data }: { data: any }) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [search, setSearch] = useState(searchParams.get("search") || "");
  const [selectedCategory, setSelectedCategory] = useState(
    searchParams.get("category") || "Select Category"
  );
  const [page, setPage] = useState(searchParams.get("page") || 1);

  console.log("page", page);
  const dataLength = 200;
  const limit = 6;
  const totalPages = Math.ceil(dataLength / limit);
  // Debounced search value
  const debouncedSearch = useDebounceCallback((value: string) => {
    setSearch(value);
    updateUrlParams("search", value);
  }, 100);

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

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    updateUrlParams("page", newPage.toString());
  };

  const handleNext = () => {
    const nextPage = page + 1;
    handlePageChange(nextPage);
  };

  const handlePrevious = () => {
    const previousPage = page - 1;
    handlePageChange(previousPage);
  };

  useEffect(() => {
    const currentPage = searchParams.get("page");
    if (currentPage) {
      handlePageChange(parseInt(currentPage));
    } else {
      handlePageChange(1);
    }
  }, []);

  return (
    <section className="py-12 md:py-28">
      <div className="container flex flex-col gap-6 md:gap-12">
        {/* filter area */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <h4 className="text-gray-9 text-2xl md:text-4xl font-semibold">
            {search ? "Search Results" : " All Blogs"}
          </h4>
          <div className="flex gap-4">
            <Input
              placeholder="Search by blog name"
              endIcon={<Search className="text-gray-7 size-6" />}
              value={search}
              onChange={(event) => debouncedSearch(event.target.value)}
            />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  className="ml-auto font-semibold text-gray-5 px-4 py-3"
                >
                  {selectedCategory}
                  <ChevronDown className="ml-10 size-6 text-gray-7" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
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
          </div>
        </div>
        {/* blogs area */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {data.map((blog: any, index) => (
            <BlogCard key={index} article={blog} />
          ))}

          <Pagination className="col-span-full">
            <PaginationContent className="justify-between w-full">
              {/* Previous Button */}
              <PaginationItem
                onClick={page > 1 ? handlePrevious : undefined}
                className={cn(
                  "cursor-pointer",
                  page === 1 && "cursor-not-allowed opacity-50"
                )}
              >
                <PaginationPrevious />
              </PaginationItem>

              <div className="hidden md:flex gap-2">
                {/* First Page */}
                <PaginationItem
                  onClick={() => handlePageChange(1)}
                  className="cursor-pointer"
                >
                  <PaginationLink isActive={1 === page}>1</PaginationLink>
                </PaginationItem>

                {/* Left Ellipsis */}
                {page > 3 && <PaginationEllipsis />}

                {/* Middle Pages (Dynamically Show Pages Around Current Page) */}
                {Array.from({ length: totalPages }, (_, index) => index + 1)
                  .filter(
                    (pageNumber) =>
                      pageNumber === page || // Always show the current page
                      pageNumber === page - 1 || // Show previous page
                      pageNumber === page + 1 // Show next
                  )
                  .map((pageNumber) => (
                    <PaginationItem
                      key={pageNumber}
                      onClick={() => handlePageChange(pageNumber)}
                      className="cursor-pointer"
                    >
                      {pageNumber !== 1 && pageNumber !== totalPages && (
                        <PaginationLink isActive={pageNumber === page}>
                          {pageNumber}
                        </PaginationLink>
                      )}
                    </PaginationItem>
                  ))}

                {/* Right Ellipsis */}
                {page < totalPages - 2 && <PaginationEllipsis />}

                {/* Last Page */}
                <PaginationItem
                  onClick={() => handlePageChange(totalPages)}
                  className="cursor-pointer"
                >
                  <PaginationLink isActive={totalPages === page}>
                    {totalPages}
                  </PaginationLink>
                </PaginationItem>
              </div>

              <span className="block md:hidden text-gray-9 text-sm font-medium">
                Page {page} of {totalPages}
              </span>

              {/* Next Button */}
              <PaginationItem
                onClick={page < totalPages ? handleNext : undefined}
                className={cn(
                  "cursor-pointer",
                  page === totalPages && "cursor-not-allowed opacity-50"
                )}
              >
                <PaginationNext />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </div>
    </section>
  );
};

export default Blogs;
