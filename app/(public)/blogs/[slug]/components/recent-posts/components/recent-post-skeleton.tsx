import { Skeleton } from "@/components/shadcn/skeleton";

const RecentPostCardSkeleton = () => {
  return (
    <div className="grid grid-cols-[124px_1fr] md:grid-cols-[144px_1fr] rounded-2xl overflow-hidden">
      <Skeleton className="w-full h-[124px] md:h-[144px]" />

      <div className="p-4 bg-white flex flex-col gap-2">
        <div className="flex items-center gap-2 justify-between">
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-4 w-16" />
        </div>
        <Skeleton className="h-5 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-3/4" />
      </div>
    </div>
  );
};

export default RecentPostCardSkeleton;
