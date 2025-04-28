import { Skeleton } from "@/components/shadcn/skeleton";

const EventCardSkeleton = () => {
  return (
    <div className="bg-white lg:p-6 py-3 px-4 rounded-xl border border-primary-2 flex justify-between">
      <div className="flex-1 space-y-2">
        {/* Event name skeleton */}
        <Skeleton className="h-6 w-3/4 lg:h-7" />

        {/* Optional: Additional skeleton lines for more content */}
        {/* <Skeleton className="h-4 w-1/2 lg:h-5" /> */}
      </div>

      <div className="flex items-center ml-4">
        {/* Time/status skeleton */}
        <Skeleton className="h-6 w-20 lg:h-7 lg:w-24" />
      </div>
    </div>
  );
};

export default EventCardSkeleton;
