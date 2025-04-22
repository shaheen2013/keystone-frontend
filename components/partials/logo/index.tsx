import Image from "next/image";
import { useGetHeaderQuery } from "@/features/public/headerSlice";
import { Skeleton } from "@/components/shadcn/skeleton";
import Link from "next/link";
const Logo = () => {
  const { data, isLoading, isFetching }: any = useGetHeaderQuery({});

  const loading = isLoading || isFetching;

  const logo = data?.data?.website_logo;
  return (
    <>
      {loading ? (
        <Skeleton className="h-12 w-[110px] lg:mb-8 mb-6" />
      ) : (
        logo && (
          <Link href={"/"}>
            <Image
              src={logo}
              alt="logo"
              width={150}
              height={65}
              className="lg:w-[150px] w-[120px] lg:h-[65px] h-[50px]"
              priority
            />
          </Link>
        )
      )}
    </>
  );
};

export default Logo;
