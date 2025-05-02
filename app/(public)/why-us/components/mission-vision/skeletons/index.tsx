import { Skeleton } from "@/components/shadcn/skeleton";

const MissionAndVisionSkeleton = () => {
  return (
    <section className="py-12 md:py-28 bg-white">
      <div className="container grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12 items-center">
        {/* Video Player Skeleton */}
        <div className="max-w-[776px] w-full h-60 md:h-[400px] rounded-xl overflow-hidden">
          <Skeleton className="w-full h-full" />
        </div>

        {/* Content Side */}
        <div className="flex flex-col gap-4 md:gap-8">
          {/* Mission Section */}
          <div className="flex flex-col gap-4">
            <Skeleton className="h-8 md:h-12 w-1/4" /> {/* Mission Title */}
            <Skeleton className="h-4 md:h-6 w-full" />{" "}
            {/* Mission Text Line 1 */}
            <Skeleton className="h-4 md:h-6 w-5/6" />{" "}
            {/* Mission Text Line 2 */}
            <Skeleton className="h-4 md:h-6 w-3/4" />{" "}
            {/* Mission Text Line 3 */}
          </div>

          {/* Vision Section */}
          <div className="flex flex-col gap-4">
            <Skeleton className="h-8 md:h-12 w-1/4" /> {/* Vision Title */}
            <Skeleton className="h-4 md:h-6 w-full" />{" "}
            {/* Vision Text Line 1 */}
            <Skeleton className="h-4 md:h-6 w-4/5" /> {/* Vision Text Line 2 */}
            <Skeleton className="h-4 md:h-6 w-2/3" /> {/* Vision Text Line 3 */}
          </div>
        </div>
      </div>
    </section>
  );
};

export default MissionAndVisionSkeleton;
