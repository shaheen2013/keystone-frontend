"use client";
import { Skeleton } from "@/components/shadcn/skeleton";
import { cn } from "@/lib/utils";

const GetTouchSkeleton = ({ classes }: { classes?: any }) => {
  return (
    <section className={cn("py-12 md:py-28 bg-white", classes?.root)}>
      <div className="container grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Left Column */}
        <div className="flex flex-col">
          <Skeleton className="mb-4 md:mb-6 h-8 md:h-12 w-3/4" />
          <Skeleton className="mb-6 md:mb-12 h-4 md:h-6 w-full" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Availability Card */}
            <div className="bg-primary-1 rounded-2xl p-4 md:p-6 col-span-full flex gap-3 md:gap-4 items-center">
              <Skeleton className="size-12 md:size-16 rounded-lg shrink-0" />
              <div className="flex flex-col gap-1 w-full">
                <Skeleton className="h-5 w-1/3" />
                <Skeleton className="h-4 w-full" />
              </div>
            </div>

            {/* Location Card */}
            <div className="bg-primary-1 rounded-2xl p-4 md:p-6 col-span-full flex gap-3 md:gap-4 items-center">
              <Skeleton className="size-12 md:size-16 rounded-lg shrink-0" />
              <div className="flex flex-col gap-1 w-full">
                <Skeleton className="h-5 w-1/3" />
                <Skeleton className="h-4 w-full" />
              </div>
            </div>

            {/* Email Card */}
            <div className="bg-primary-1 rounded-2xl p-4 md:p-6 flex gap-3 md:gap-4 items-center">
              <Skeleton className="size-12 md:size-16 rounded-lg shrink-0" />
              <div className="flex flex-col gap-1 w-full">
                <Skeleton className="h-5 w-1/3" />
                <Skeleton className="h-4 w-full" />
              </div>
            </div>

            {/* Phone Card */}
            <div className="bg-primary-1 rounded-2xl p-4 md:p-6 flex gap-3 md:gap-4 items-center">
              <Skeleton className="size-12 md:size-16 rounded-lg shrink-0" />
              <div className="flex flex-col gap-1 w-full">
                <Skeleton className="h-5 w-1/3" />
                <Skeleton className="h-4 w-full" />
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Form */}
        <div
          className={cn(
            "flex flex-col gap-8 md:gap-12 p-4 md:p-8 bg-primary-2 rounded-2xl",
            classes?.form
          )}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            {/* First Name */}
            <div className="flex flex-col gap-1.5">
              <Skeleton className="h-5 w-1/2" />
              <Skeleton className="h-10 w-full" />
            </div>

            {/* Last Name */}
            <div className="flex flex-col gap-1.5">
              <Skeleton className="h-5 w-1/2" />
              <Skeleton className="h-10 w-full" />
            </div>

            {/* Email */}
            <div className="flex flex-col gap-1.5">
              <Skeleton className="h-5 w-1/2" />
              <Skeleton className="h-10 w-full" />
            </div>

            {/* Phone */}
            <div className="flex flex-col gap-1.5">
              <Skeleton className="h-5 w-1/2" />
              <Skeleton className="h-10 w-full" />
            </div>

            {/* Subject */}
            <div className="col-span-full flex flex-col gap-1.5">
              <Skeleton className="h-5 w-1/2" />
              <Skeleton className="h-10 w-full" />
            </div>

            {/* Message */}
            <div className="col-span-full flex flex-col gap-1.5">
              <Skeleton className="h-5 w-1/2" />
              <Skeleton className="h-32 w-full" />
            </div>
          </div>

          {/* Submit Button */}
          <Skeleton className="h-10 w-32 self-end" />
        </div>
      </div>
    </section>
  );
};

export default GetTouchSkeleton;
