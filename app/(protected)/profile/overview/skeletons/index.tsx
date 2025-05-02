import { Skeleton } from "@/components/shadcn/skeleton";

export function AccountOverviewSkeleton() {
  return (
    <div className="bg-primary-1 rounded-2xl">
      <div className="font-semibold lg:text-2xl text-lg lg:py-6 lg:px-8 p-4  bg-primary-2 rounded-t-2xl">
        Profile Overview
      </div>

      <div className="lg:p-8 p-4">
        {/* Profile image and upload button */}
        <div className="flex gap-6 items-end lg:mb-12 mb-6">
          <Skeleton className="h-36 w-36 rounded-lg" />
          <Skeleton className="h-10 w-32" />
        </div>

        {/* Form fields */}
        <form>
          <div className="grid grid-cols-2 gap-x-6 gap-y-4 lg:mb-12 mb-6">
            {/* Name */}
            <div className="col-span-2">
              <Skeleton className="h-5 w-16 mb-1" />
              <Skeleton className="h-10 w-full" />
            </div>

            {/* Email */}
            <div className="lg:col-span-1 col-span-2">
              <Skeleton className="h-5 w-16 mb-1" />
              <Skeleton className="h-10 w-full" />
            </div>

            {/* Phone */}
            <div className="lg:col-span-1 col-span-2">
              <Skeleton className="h-5 w-28 mb-1" />
              <Skeleton className="h-10 w-full" />
            </div>

            {/* Address */}
            <div className="col-span-2">
              <Skeleton className="h-5 w-16 mb-1" />
              <Skeleton className="h-10 w-full" />
            </div>
          </div>

          {/* Submit button */}
          <Skeleton className="h-10 w-32" />
        </form>
      </div>
    </div>
  );
}
