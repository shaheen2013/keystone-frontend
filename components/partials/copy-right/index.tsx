import { Skeleton } from "@/components/shadcn/skeleton";
import { useGetFooterQuery } from "@/features/public/footerSlice";
const CopyRight = () => {
  const { data, isLoading, isFetching }: any = useGetFooterQuery({});

  const loading = isLoading || isFetching;

  const copyRightText = data?.data?.copyright;
  return (
    <>
      {loading ? (
        <Skeleton className="h-6 w-full md:w-1/2 lg:mt-0 mt-8" />
      ) : (
        <p className="text-gray-9 lg:text-base text-xs font-medium py-6 lg:mt-0 mt-8">
          {copyRightText}
        </p>
      )}
    </>
  );
};

export default CopyRight;
