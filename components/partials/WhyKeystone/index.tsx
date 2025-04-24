"use client";

import Link from "next/link";
import { Button } from "@/components/shadcn/button";
import YoutubeVideoPlayer from "../youtube-player";
import { Skeleton } from "@/components/shadcn/skeleton";

const WhyKeystoneSection = ({
  data,
  loading,
}: {
  data: any;
  loading: boolean;
}) => {
  const { videoUrl, title, description, cta } = data;

  return (
    <section className="py-12 md:py-28 bg-primary-2">
      <div className="container grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12">
        {/* Video Column */}
        <div className="max-w-[776px] w-full min-h-60">
          {loading ? (
            <Skeleton className="w-full h-full aspect-video" />
          ) : (
            <YoutubeVideoPlayer url={videoUrl} />
          )}
        </div>

        {/* Content Column */}
        <div className="flex flex-col items-start justify-center text-gray-9">
          {loading ? (
            <>
              <Skeleton className="h-8 w-3/4 mb-6 md:h-12" />
              <Skeleton className="h-4 w-full mb-4 md:h-6" />
              <Skeleton className="h-4 w-5/6 mb-8 md:h-6" />
              <Skeleton className="h-12 w-32" />
            </>
          ) : (
            <>
              <h3 className="mb-4 md:mb-6 text-2xl md:text-5xl font-bold">
                {title}
              </h3>
              <p className="mb-8 md:mb-12 text-base md:text-xl">
                {description}
              </p>
              <Button variant="secondary" size="lg" asChild>
                <Link href={cta.link}>{cta.text}</Link>
              </Button>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default WhyKeystoneSection;
