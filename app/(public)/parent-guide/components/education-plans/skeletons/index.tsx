import { Skeleton } from "@/components/shadcn/skeleton";

const EducationPlansSkeleton = () => {
  return (
    <section className="py-12 md:py-28 bg-primary-2">
      <div className="container grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12">
        {/* Left Column - Content */}
        <div className="flex flex-col items-start justify-center text-gray-9">
          {/* Title Skeleton */}
          <Skeleton className="h-8 md:h-12 w-3/4 mb-4 md:mb-6" />

          {/* Subtitle Skeleton (multiple lines) */}
          <div className="mb-8 md:mb-12 w-full space-y-3">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
            <Skeleton className="h-4 w-4/5" />
            <Skeleton className="h-4 w-3/4" />
          </div>

          {/* Buttons Skeleton */}
          <div className="flex gap-4">
            <Skeleton className="h-10 w-32 rounded-md" />
            <Skeleton className="h-10 w-28 rounded-md" />
          </div>
        </div>

        {/* Right Column - Video */}
        <div className="max-w-[776px] w-full h-60 md:h-[400px] rounded-xl overflow-hidden">
          <Skeleton className="w-full h-full" />
        </div>
      </div>
    </section>
  );
};

export default EducationPlansSkeleton;
