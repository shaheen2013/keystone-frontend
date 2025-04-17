import { Skeleton } from "@/components/shadcn/skeleton";
import { cn } from "@/lib/utils";

const BlogCardSkeleton = ({ className }: { className?: string }) => {
  return (
    <div
      className={cn(
        "bg-primary-2 p-4 md:p-6 rounded-2xl flex flex-col gap-4 md:gap-6 items-start h-full",
        className
      )}
    >
      {/* Image placeholder */}
      <div className="relative w-full aspect-video">
        <Skeleton className="w-full h-full rounded-xl" />
      </div>

      {/* Content section */}
      <div className="flex flex-col gap-3 md:gap-4 w-full">
        {/* Date and reading time */}
        <div className="flex gap-2 justify-between">
          <Skeleton className="h-5 w-20" />
          <Skeleton className="h-5 w-24" />
        </div>

        {/* Title */}
        <Skeleton className="h-7 w-full md:h-9" />

        {/* Subtitle */}
        <div className="space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
        </div>
      </div>
    </div>
  );
};

export default BlogCardSkeleton;
