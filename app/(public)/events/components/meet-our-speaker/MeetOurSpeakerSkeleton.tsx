import { Skeleton } from "@/components/shadcn/skeleton";

export function MeetOurSpeakerSkeleton() {
  return (
    <section className="bg-white py-12 md:py-32">
      <div className="container flex flex-col items-center justify-center gap-4 md:gap-12">
        {/* Title Skeleton */}
        <Skeleton className="h-8 md:h-12 w-1/3" />

        {/* Speakers Grid Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8 w-full">
          {[...Array(3)].map((_, index) => (
            <div
              key={index}
              className="flex flex-col gap-4 md:gap-6 p-4 md:p-6 rounded-2xl bg-primary-2"
            >
              {/* Image Placeholder */}
              <Skeleton className="w-full h-80 md:h-[400px] rounded-xl" />

              {/* Content Placeholder */}
              <div className="flex flex-col gap-3 md:gap-4">
                <Skeleton className="h-6 md:h-8 w-3/4" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-5/6" />
                  <Skeleton className="h-4 w-4/5" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
