import { Skeleton } from "@/components/shadcn/skeleton";

const GuidesSkeleton = () => {
  return (
    <section className="bg-white py-12 md:py-28">
      <div className="container flex flex-col items-center justify-center gap-6 md:gap-12">
        {/* Title Skeleton */}
        <Skeleton className="h-8 md:h-12 w-1/3" />

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-8 w-full">
          {[...Array(4)].map((_, index) => (
            <div
              key={index}
              className="p-6 rounded-2xl flex flex-col gap-4 md:gap-6 bg-primary-2"
            >
              {/* Number icon skeleton */}

              <Skeleton className="size-12 bg-white rounded-xl" />

              <div className="flex flex-col gap-3 md:gap-4">
                {/* Guide label skeleton */}
                <Skeleton className="h-7 md:h-9 w-3/4" />
                {/* Guide description skeleton - line 1 */}
                <Skeleton className="h-5 w-full" />
                {/* Guide description skeleton - line 2 */}
                <Skeleton className="h-5 w-5/6" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GuidesSkeleton;
