import { Facebook, Share, Twitter } from "@/components/icons";
import { Button } from "@/components/shadcn/button";
import { Skeleton } from "@/components/shadcn/skeleton";
import { toast } from "@/hooks/use-toast";
import { Copy } from "lucide-react";
import Head from "next/head";
import { useEffect, useState } from "react";
import { FacebookShareButton, TwitterShareButton } from "next-share";

const BlogContent = ({ data, loading }: { data: any; loading: boolean }) => {
  const [copied, setCopied] = useState(false);
  const [shareUrl, setShareUrl] = useState("");
  console.log("share  url", shareUrl);

  const handleCopyLink = () => {
    const currentUrl = window.location.href;
    navigator.clipboard.writeText(currentUrl);
    setCopied(true);
    toast({
      description: "Link copied to clipboard!",
    });
  };

  useEffect(() => {
    if (copied) {
      const timeout = setTimeout(() => setCopied(false), 2000);
      return () => clearTimeout(timeout);
    }
  }, [copied]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setShareUrl(window.location.href);
    }
  }, []);

  return (
    <>
      {!loading && data && (
        <Head>
          <title>{data?.title}</title>
          <meta property="og:title" content={data?.title} />
          <meta property="og:description" content={data?.subtitle} />
          <meta property="og:image" content={data?.banner?.path} />
          <meta
            property="og:url"
            content={`https://yourdomain.com/blogs/${data?.id}`}
          />
          <meta property="og:type" content="article" />

          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content={data?.title} />
          <meta name="twitter:description" content={data?.subtitle} />
          <meta name="twitter:image" content={data?.banner?.path} />
        </Head>
      )}
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
              <div className="flex items-center gap-3">
                <Share className="size-6 text-[#2B2B2B]" />
                <span className="text-gray-9 text-lg font-medium">
                  Share this post
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Button
                  onClick={handleCopyLink}
                  size="sm"
                  className="px-3.5 h-10 text-sm rounded-lg gap-1"
                  variant="outline"
                >
                  <Copy className="size-6 text-[#2B2B2B]" />
                  <span className="text-gray-9 text-sm font-semibold">
                    {copied ? "Copied!" : "Copy Link"}
                  </span>
                </Button>

                <FacebookShareButton
                  url={"https://github.com/next-share"}
                  quote={
                    "next-share is a social share buttons for your next React apps."
                  }
                  blankTarget
                >
                  <Facebook className="size-10 rounded-lg" />
                </FacebookShareButton>

                <TwitterShareButton
                  url={"https://github.com/next-share"}
                  title={
                    "next-share is a social share buttons for your next React apps."
                  }
                  blankTarget
                >
                  <Twitter className="size-10 rounded-lg" />
                </TwitterShareButton>
              </div>
            </>
          )}
        </div>
      </section>
    </>
  );
};

export default BlogContent;
