import { Skeleton } from "@/components/shadcn/skeleton";
import { cn } from "@/lib/utils";

const EventCardSkeleton = ({ className }: { className?: string }) => {
  return (
    <div
      className={cn(
        "bg-primary-2 p-4 md:p-8 rounded-2xl flex flex-col gap-4 md:gap-6 items-start h-full",
        className
      )}
    >
      {/* Image placeholder */}
      <Skeleton className="w-full h-[230px] md:h-[314px] rounded-xl" />

      <div className="flex flex-col gap-3 md:gap-4 w-full">
        {/* Date placeholder */}
        <Skeleton className="h-5 w-32" />

        {/* Title placeholder */}
        <Skeleton className="h-8 w-3/4" />

        {/* Description placeholder */}
        <div className="space-y-2 w-full">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
        </div>
      </div>
    </div>
  );
};

export default EventCardSkeleton;
