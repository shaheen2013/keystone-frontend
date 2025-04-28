import { Skeleton } from "@/components/shadcn/skeleton";

const MobileEventsSkeleton = () => (
  <div className="space-y-4 mt-4 block md:hidden">
    {[...Array(3)].map((_, i) => (
      <div key={i} className="bg-white rounded-lg p-4 shadow">
        <div className="flex flex-col gap-3">
          <Skeleton className="h-5 w-48" />
          <Skeleton className="h-10 w-full" />
        </div>
      </div>
    ))}
  </div>
);

export default MobileEventsSkeleton;
