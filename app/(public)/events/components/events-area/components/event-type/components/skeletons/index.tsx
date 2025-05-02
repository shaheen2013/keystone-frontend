import { Skeleton } from "@/components/shadcn/skeleton";

const EventTypesSkeleton = () => (
  <div className="m-4 md:m-6 bg-white rounded-xl">
    <div className="flex flex-col">
      <div className="px-4 md:px-5 py-3">
        <Skeleton className="h-6 w-24" />
      </div>
      <hr className="border-gray-2" />
      {[...Array(4)].map((_, index) => (
        <div
          key={index}
          className="flex items-center space-x-2 px-4 md:px-5 py-3"
        >
          <Skeleton className="h-5 w-5 rounded" />
          <Skeleton className="h-5 w-32" />
        </div>
      ))}
    </div>
  </div>
);

export default EventTypesSkeleton;
