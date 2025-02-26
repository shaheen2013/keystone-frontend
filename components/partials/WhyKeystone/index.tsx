"use client";
import { Button } from "@/components/shadcn/button";
import { WhyKeystoneData } from "./constants";
import { Play } from "@/components/icons";
import Image from "next/image";
import dynamic from "next/dynamic";
import Link from "next/link";

const ReactPlayer = dynamic(() => import("react-player"), { ssr: false });

const WhyKeystoneSection = () => {
  const { thumbnail, url, title, description, cta } = WhyKeystoneData;
  return (
    <section className="py-12 md:py-28 bg-primary-2">
      <div className="container grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12">
        <div className="max-w-[776px] w-full">
          <ReactPlayer
            url={url}
            muted
            loop
            playIcon={<Play />}
            controls
            light={
              <Image
                src={thumbnail.src}
                alt="Thumbnail"
                width={776}
                height={450}
              />
            }
            width="100%"
            height="100%"
          />
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
