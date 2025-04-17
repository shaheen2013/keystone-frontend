import {
  Pagination,
  PaginationContent,
  PaginationItem,
} from "@/components/shadcn/pagination";
import { Skeleton } from "@/components/shadcn/skeleton";

const PaginationSkeleton = ({ className }: { className?: string }) => {
  return (
    <Pagination className={className}>
      <PaginationContent className="justify-between w-full">
        {/* Previous Button Skeleton */}
        <PaginationItem>
          <Skeleton className="size-10 rounded-md" />
        </PaginationItem>

        {/* Page Numbers Skeleton */}
        <div className="hidden md:flex gap-2">
          <PaginationItem>
            <Skeleton className="size-10 rounded-md" />
          </PaginationItem>

          <PaginationItem>
            <Skeleton className="size-10 rounded-md" />
          </PaginationItem>

          <PaginationItem>
            <Skeleton className="size-10 rounded-md" />
          </PaginationItem>

          <PaginationItem>
            <Skeleton className="size-10 rounded-md" />
          </PaginationItem>

          <PaginationItem>
            <Skeleton className="size-10 rounded-md" />
          </PaginationItem>
        </div>

        {/* Mobile Page Info Skeleton */}
        <span className="block md:hidden">
          <Skeleton className="h-10 w-24" />
        </span>

        {/* Next Button Skeleton */}
        <PaginationItem>
          <Skeleton className="size-10 rounded-md" />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default PaginationSkeleton;
