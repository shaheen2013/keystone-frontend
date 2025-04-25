import { Skeleton } from "@/components/shadcn/skeleton";

export function HeroSkeleton() {
  return (
    <section className="relative w-full h-[788px] flex items-center justify-center bg-gray-200">
      <div className="container">
        <div className="max-w-4xl flex flex-col items-start gap-6">
          <Skeleton className="h-[30px] w-[80px] rounded-full" />

          <div className="space-y-3 w-full">
            <Skeleton className="h-12 w-full max-w-[600px]" />
            <Skeleton className="h-4 w-full max-w-[500px]" />
            <Skeleton className="h-4 w-full max-w-[450px]" />
          </div>

          <div className="mt-6 p-6 flex flex-col gap-4 bg-gray-300 rounded-xl w-full max-w-[400px]">
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-6 w-full" />
          </div>

          <Skeleton className="h-10 w-full md:w-32" />
        </div>
      </div>
    </section>
  );
}
