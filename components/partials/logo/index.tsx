import Image from "next/image";
import { useGetHeaderQuery } from "@/features/public/headerSlice";
import { Skeleton } from "@/components/shadcn/skeleton";
import Link from "next/link";
import { cn } from "@/lib/utils";
const Logo = ({
  classes,
}: {
  classes?: {
    root?: string;
    skeleton?: string;
  };
}) => {
  const { data, isLoading, isFetching }: any = useGetHeaderQuery({});

  const loading = isLoading || isFetching;

  const logo = data?.data?.website_logo;
  return (
    <>
      {loading ? (
        <Skeleton
          className={cn("w-20 md:w-24 md:h-14 h-10", classes?.skeleton)}
        />
      ) : (
        <div className={cn("w-20 md:w-24 h-auto", classes?.root)}>
          {logo && (
            <Link href={"/"}>
              <Image
                src={logo}
                alt="logo"
                width={1000}
                height={760}
                className="w-full h-auto object-contain object-center"
                priority
              />
            </Link>
          )}
        </div>
      )}
    </>
  );
};

export default Logo;
