import { Skeleton } from "@/components/shadcn/skeleton";

const KeyBenefitsSkeleton = () => {
  return (
    <section className="py-12 md:py-28 bg-primary-2">
      <div className="container flex flex-col gap-6 md:gap-12">
        {/* Title Skeleton */}
        <Skeleton className="h-8 md:h-12 w-1/3 mx-auto" />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8">
          {[...Array(3)].map((_, index) => (
            <div
              key={index}
              className="flex flex-col gap-4 md:gap-6 p-4 md:p-8 rounded-2xl  bg-white"
            >
              {/* Icon Skeleton */}
              <Skeleton className="size-14 rounded-xl" />

              <div className="flex flex-col gap-3 md:gap-4">
                {/* Benefit Name Skeleton */}
                <Skeleton className="h-7 md:h-9 w-3/4" />
                {/* Description Skeleton - line 1 */}
                <Skeleton className="h-4 md:h-5 w-full" />
                {/* Description Skeleton - line 2 */}
                <Skeleton className="h-4 md:h-5 w-5/6" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default KeyBenefitsSkeleton;
