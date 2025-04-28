import { Skeleton } from "@/components/shadcn/skeleton";

const CalendarSkeleton = () => (
  <div className="space-y-4">
    {/* Calendar header skeleton */}
    <div className="flex justify-between items-center mb-4">
      <Skeleton className="h-8 w-8 rounded-full" />
      <Skeleton className="h-8 w-32" />
      <Skeleton className="h-8 w-8 rounded-full" />
    </div>

    {/* Calendar grid skeleton */}
    <div className="grid grid-cols-7 gap-2">
      {[...Array(35)].map((_, i) => (
        <Skeleton key={i} className="h-24 rounded-md" />
      ))}
    </div>
  </div>
);

export default CalendarSkeleton;
