"use client";

import Link from "next/link";
import { Button } from "@/components/shadcn/button";
import { useGetBillingPricesQuery } from "@/features/public/billingSlice";
import YoutubeVideoPlayer from "../youtube-player";

const WhyKeystoneSection = ({ data }: { data: any }) => {
  const { vedioUrl, title, description, cta } = data;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { data: dataGet, error, isLoading } = useGetBillingPricesQuery({});

  return (
    <section className="py-12 md:py-28 bg-primary-2">
      <div className="container grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12">
        <div className="max-w-[776px] w-full min-h-60 ">
          <YoutubeVideoPlayer url={vedioUrl} />
        </div>
        <div className="flex flex-col items-start justify-center text-gray-9">
          <h3 className="mb-4 md:mb-6 text-2xl md:text-5xl font-bold">
            {title}
          </h3>
          <p className="mb-8 md:mb-12 text-base md:text-xl">{description}</p>
          <Button variant="secondary" size="lg" asChild>
            <Link href={cta.link}>{cta.text}</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default WhyKeystoneSection;
