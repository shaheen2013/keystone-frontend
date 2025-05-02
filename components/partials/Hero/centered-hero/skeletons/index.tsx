import { Skeleton } from "@/components/shadcn/skeleton";

export const CenteredHeroSkeleton = () => {
  return (
    <section className="relative w-full h-[480px] flex items-center justify-center bg-white">
      <div className="container">
        <div className="max-w-4xl mx-auto text-center">
          {/* Title Skeleton */}
          <Skeleton className="h-12 lg:h-16 w-3/4 mx-auto" />

          {/* Subtitle Skeleton */}
          <Skeleton className="h-6 w-5/6 mx-auto mt-5 md:mt-6" />
        </div>
      </div>
    </section>
  );
};
