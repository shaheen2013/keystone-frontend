import { Skeleton } from "@/components/shadcn/skeleton";
import { cn } from "@/lib/utils";

const ServiceCardSkeleton = ({
  classes,
}: {
  classes?: {
    root?: string;
    icon?: string;
  };
}) => {
  return (
    <div
      className={cn(
        "bg-primary-2 p-4 md:p-8 rounded-2xl flex flex-col gap-6 items-start  max-w-[512px] w-full",
        classes?.root
      )}
    >
      <Skeleton className="p-4 rounded-xl size-12" />
      <div className="flex flex-col gap-4 w-full">
        <Skeleton className="h-8 w-3/4" />
        <div className="space-y-2 w-full">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
          <Skeleton className="h-4 w-2/3" />
        </div>
      </div>
      <Skeleton className="h-6 w-32" />
    </div>
  );
};

export default ServiceCardSkeleton;
