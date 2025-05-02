import { Skeleton } from "@/components/shadcn/skeleton";

const WhyChooseKeystoneAbilitySupportSkeleton = () => {
  return (
    <section className="py-12 md:py-28 bg-white">
      <div className="container grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12">
        {/* Left column - Content */}
        <div className="flex flex-col gap-4 md:gap-12">
          {/* Title Skeleton */}
          <Skeleton className="h-8 md:h-12 w-3/4" />

          {/* Reasons list */}
          <div className="flex flex-col gap-4">
            {[...Array(3)].map((_, index) => (
              <div
                key={index}
                className="p-4 md:p-8 flex flex-col gap-3 md:gap-4 bg-primary-2 rounded-2xl"
              >
                {/* Reason title skeleton */}
                <Skeleton className="h-7 md:h-9 w-2/3" />
                {/* Reason description skeleton - line 1 */}
                <Skeleton className="h-4 md:h-5 w-full" />
                {/* Reason description skeleton - line 2 */}
                <Skeleton className="h-4 md:h-5 w-5/6" />
              </div>
            ))}
          </div>
        </div>

        {/* Right column - Image */}
        <Skeleton className="w-full aspect-[776/450] rounded-lg" />
      </div>
    </section>
  );
};

export default WhyChooseKeystoneAbilitySupportSkeleton;
