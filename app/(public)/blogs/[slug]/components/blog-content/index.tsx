"use client";

import { Facebook, Share, Twitter } from "@/components/icons";
import { Button } from "@/components/shadcn/button";
import { Skeleton } from "@/components/shadcn/skeleton";
import { toast } from "@/hooks/use-toast";
import { Copy } from "lucide-react";
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
                  className="prose"
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
                  url={shareUrl}
                  quote={data?.title || "Check out this article"}
                  hashtag="#blog"
                  blankTarget
                >
                  <Facebook className="size-10 rounded-lg" />
                </FacebookShareButton>

                <TwitterShareButton
                  url={shareUrl}
                  title={data?.title || "Check out this article"}
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
