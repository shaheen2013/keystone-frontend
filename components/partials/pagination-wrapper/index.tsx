import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/shadcn/pagination";
import { cn } from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

const PaginationWrapper = ({ className, page, setPage, total, limit }: any) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const totalPages = Math.ceil(total / limit);

  const handleNext = () => {
    const nextPage = page + 1;
    handlePageChange(nextPage);
  };

  const handlePrevious = () => {
    const previousPage = page - 1;
    handlePageChange(previousPage);
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

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    if (newPage === 1) {
      updateUrlParams("page", null);
    } else {
      updateUrlParams("page", newPage.toString());
    }
  };

  useEffect(() => {
    const currentPage = searchParams.get("page");
    if (currentPage) {
      handlePageChange(parseInt(currentPage));
    } else {
      handlePageChange(1);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Pagination className={className}>
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
  );
};

export default PaginationWrapper;
