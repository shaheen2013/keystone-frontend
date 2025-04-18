import { Share } from "@/components/icons";
import { Button } from "@/components/shadcn/button";
import { Skeleton } from "@/components/shadcn/skeleton";
import { Copy } from "lucide-react";
import Image from "next/image";

const BlogContent = ({ data, loading }: { data: any; loading: boolean }) => {
  return (
    <section className="flex flex-col">
      <div className="container flex flex-col gap-8 md:gap-16">
        {loading ? (
          // Skeleton loading state
          <>
            {[...Array(3)].map((_, index) => (
              <section key={index} className="flex flex-col gap-6">
                <Skeleton className="h-8 w-3/4 md:h-9" />
                <div className="space-y-3">
                  <Skeleton className="h-5 w-full" />
                  <Skeleton className="h-5 w-full" />
                  <Skeleton className="h-5 w-full" />
                  <Skeleton className="h-5 w-full" />
                </div>
              </section>
            ))}
          </>
        ) : (
          // Actual content
          data?.sections?.map((item: any, index: number) => (
            <section key={index} className="flex flex-col gap-6">
              <h2 className="text-gray-9 text-2xl md:text-3xl font-semibold">
                {item.title}
              </h2>
              <div
                className="text-gray-8 text-base md:text-lg font-medium"
                dangerouslySetInnerHTML={{ __html: item.content }}
              ></div>
            </section>
          ))
        )}
      </div>

      <div className="container border-t mt-9 border-gray-2 pt-6 flex justify-between items-center">
        {loading ? (
          // Footer skeleton
          <>
            <Skeleton className="h-6 w-32" />
            <div className="flex items-center gap-3">
              <Skeleton className="h-10 w-24 rounded-lg" />
              <Skeleton className="size-10 rounded-lg" />
              <Skeleton className="size-10 rounded-lg" />
            </div>
          </>
        ) : (
          // Actual footer content
          <>
            <div className="flex items-center gap-3 cursor-pointer">
              <Share className="size-6 text-[#2B2B2B]" />
              <span className="text-gray-9 text-lg font-medium">
                Share this post
              </span>
            </div>
            <div className="flex items-center gap-3">
              <Button
                size="sm"
                className="px-3.5 h-10 text-sm rounded-lg gap-1"
                variant="outline"
              >
                <Copy className="size-6 text-[#2B2B2B]" />
                <span className="text-gray-9 text-sm font-semibold">
                  Copy Link
                </span>
              </Button>
              <Image
                src="/icons/facebook.svg"
                alt="arrow right"
                width={40}
                height={40}
                className="w-full h-full object-cover object-center"
              />
              <Image
                src="/icons/twitter.svg"
                alt="arrow right"
                width={40}
                height={40}
                className="w-full h-full object-cover object-center"
              />
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default BlogContent;
