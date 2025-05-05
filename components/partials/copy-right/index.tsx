"use client";

import { Skeleton } from "@/components/shadcn/skeleton";
import { useGetFooterQuery } from "@/features/public/footerSlice";
const CopyRight = () => {
  const { data, isLoading, isFetching }: any = useGetFooterQuery({});

  const loading = isLoading || isFetching;

  const copyRightText = data?.data?.copyright;
  return (
    <>
      {loading ? (
        <Skeleton className="w-full md:w-1/2 py-2.5 my-5" />
      ) : (
        <p className="text-gray-9 lg:text-base text-xs font-medium py-6">
          {copyRightText}
        </p>
      )}
    </>
  );
};

export default CopyRight;
