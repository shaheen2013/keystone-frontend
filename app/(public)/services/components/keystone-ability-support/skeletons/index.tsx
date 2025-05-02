import { Skeleton } from "@/components/shadcn/skeleton";

export const KeyStoneAbilitySupportSkeleton = () => {
  return (
    <section className="py-12 md:py-28 bg-primary-2">
      <div className="container flex flex-col gap-6 md:gap-12">
        {/* Header section skeleton */}
        <div className="flex flex-col items-center justify-center gap-4 md:gap-6">
          <Skeleton className="h-8 md:h-12 w-3/4 md:w-1/2 mx-auto" />
          <Skeleton className="h-5 md:h-6 w-5/6 md:w-2/3 mx-auto" />
          <Skeleton className="h-5 md:h-6 w-5/6 md:w-2/3 mx-auto" />
        </div>

        {/* Ability supports grid skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          {[...Array(3)].map((_, index) => (
            <div
              key={index}
              className="bg-white p-4 md:p-8 rounded-2xl border border-primary-7 flex flex-col gap-4"
            >
              <Skeleton className="h-7 md:h-9 w-3/4" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />
                <Skeleton className="h-4 w-4/5" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
