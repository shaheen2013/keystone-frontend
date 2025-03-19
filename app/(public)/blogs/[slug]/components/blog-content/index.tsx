import { Share } from "@/components/icons";
import { Button } from "@/components/shadcn/button";
import { Copy } from "lucide-react";
import Image from "next/image";

const BlogContent = () => {
  return (
    <section className="flex flex-col ">
      <div className="container dev">
        <h1>Blog Details</h1>
      </div>
      <div className="container border-t mt-9 border-gray-2 pt-6 flex justify-between items-center">
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
            <span className="text-gray-9 text-sm font-semibold">Copy Link</span>
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
      </div>
    </section>
  );
};

export default BlogContent;
