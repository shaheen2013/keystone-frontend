import { Skeleton } from "@/components/shadcn/skeleton";

export function AgendaSkeleton() {
  return (
    <section className="py-12 md:py-28 bg-primary-2">
      <div className="container flex flex-col gap-6 md:gap-12">
        {/* Title Skeleton */}
        <Skeleton className="h-8 md:h-12 w-1/2 mx-auto" />

        {/* Agenda Items Skeleton */}
        <div className="flex flex-col gap-4 md:gap-6">
          {[...Array(4)].map((_, index) => (
            <div
              key={index}
              className="p-4 md:p-6 rounded-xl bg-white flex flex-col md:flex-row md:justify-between gap-4"
            >
              <Skeleton className="h-5 md:h-6 w-3/4 md:w-1/2" />
              <Skeleton className="h-5 md:h-6 w-1/6 md:w-1/6" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
