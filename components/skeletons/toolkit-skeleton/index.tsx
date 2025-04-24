import { Skeleton } from "@/components/shadcn/skeleton";

export const ToolkitSkeleton = () => {
  return (
    <div className="bg-primary-2 w-full p-5 md:p-6 rounded-2xl">
      <div className="rounded-xl flex items-center justify-center h-48 w-full mb-4 overflow-hidden relative">
        <Skeleton className="h-full w-full" />
      </div>
      <div className="flex justify-between items-center gap-2">
        <Skeleton className="h-6 w-3/4" />
        <Skeleton className="h-6 w-6 rounded-full" />
      </div>
    </div>
  );
};
