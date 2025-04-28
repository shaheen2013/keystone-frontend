import Cookies from "js-cookie";
import Image from "next/image";
import { Delete, Heart, HeartFilled } from "../icons";
import { cn } from "@/lib/utils";
import moment from "moment";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { useSaveToggleMutation } from "@/features/public/blogSlice";

const BlogCard = ({
  userPanel,
  article,
  classes,
  setBlogsData,
}: {
  userPanel?: boolean;
  article: any;
  classes?: {
    root?: string;
    image?: string;
    title?: string;
  };
  setBlogsData?: any;
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [saveToggle, { isError, error }] = useSaveToggleMutation();

  const handleToggle = async (slug: string) => {
    try {
      //  immediately update UI
      setBlogsData((prevBlogs: any) =>
        prevBlogs.map((blog: any) =>
          blog.slug === slug ? { ...blog, is_saved: !blog.is_saved } : blog
        )
      );

      // Send API request
      await saveToggle({ blog_slug: slug }).unwrap();
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      // Revert on error
      setBlogsData((prevBlogs: any) =>
        prevBlogs.map((blog: any) =>
          blog.slug === slug ? { ...blog, is_saved: !blog.is_saved } : blog
        )
      );
    }
  };

  const handleClick = () => {
    const token = Cookies.get("key_stone_token");

    if (!token) {
      // Get current URL with query parameters
      const currentUrl = `${pathname}${searchParams.toString() ? `?${searchParams.toString()}` : ""}`;
      // Encode it for safe URL passing
      const returnUrl = encodeURIComponent(currentUrl);
      router.replace(`/login?returnUrl=${returnUrl}`);
    } else {
      handleToggle(article.slug);
    }
  };

  useEffect(() => {
    if (isError && error) {
      const status = (error as any)?.status || (error as any)?.originalStatus;

      console.log("status", status);

      if (status === 401) {
        // Get current URL with query parameters
        const currentUrl = `${pathname}${searchParams.toString() ? `?${searchParams.toString()}` : ""}`;
        // Encode it for safe URL passing
        const returnUrl = encodeURIComponent(currentUrl);
        router.replace(`/login?returnUrl=${returnUrl}`);
      }
    }
  }, [isError, error, router, pathname, searchParams]);

  return (
    <div
      className={cn(
        "bg-primary-2 p-4 md:p-6 rounded-2xl flex flex-col gap-4 md:gap-6 items-start h-full",
        classes?.root
      )}
    >
      <div className="relative w-full">
        {article?.feature_image?.path && (
          <Link href={`/blogs/${article.slug}`}>
            <Image
              src={article?.feature_image?.path}
              width={1000}
              height={760}
              alt={article.title}
              className={cn(
                "w-full h-[230px] md:h-[314px] object-cover rounded-xl",
                classes?.image
              )}
            />
          </Link>
        )}
        <div
          className="absolute top-4 right-4 rounded-xl py-2.5 px-6 flex gap-2 items-center cursor-pointer transition-all bg-white"
          onClick={handleClick}
        >
          {userPanel ? (
            <>
              <Delete className="text-gray-9 size-5" />
              <span className="text-gray-900 text-sm font-semibold">
                Remove
              </span>
            </>
          ) : article.is_saved ? (
            <>
              <HeartFilled className="text-red-500 size-5" />
              <span className="text-gray-900 text-sm font-semibold">Saved</span>
            </>
          ) : (
            <>
              <Heart className="text-gray-900 size-5" />
              <span className="text-gray-900 text-sm font-semibold">
                Save for Later
              </span>
            </>
          )}
        </div>
      </div>
      <div className="flex flex-col gap-3 md:gap-4 w-full">
        <div className="flex gap-2 justify-between text-secondary-6 font-medium text-base">
          <span>{moment(article.created_at).format("Do MMM")}</span>
          <span>{article.reading_time} minute read</span>
        </div>
        <Link
          className={cn(
            "text-gray-9 text-xl md:text-3xl font-bold",
            classes?.title
          )}
          href={`/blogs/${article.slug}`}
        >
          {article.title}
        </Link>
        <p className="text-gray-9 text-sm md:text-lg line-clamp-3">
          {article.subtitle}
        </p>
      </div>
    </div>
  );
};

export default BlogCard;
