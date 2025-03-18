"use client";

import { Play } from "@/components/icons";
import dynamic from "next/dynamic";

const ReactPlayer = dynamic(() => import("react-player/youtube"), {
  ssr: false,
});

const AboutOurService = ({ data }: { data: any }) => {
  const { url, title, description } = data;
  return (
    <section className="py-12 md:py-28 bg-white">
      <div className="container grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12">
        <div className="flex flex-col items-start justify-center text-gray-9">
          <h3 className="mb-4 md:mb-6 text-2xl md:text-5xl font-bold">
            {title}
          </h3>
          <p className="mb-8 md:mb-12 text-base md:text-xl">{description}</p>
        </div>
        <div className="max-w-[776px] w-full min-h-60">
          <ReactPlayer
            url={url}
            loop
            playIcon={<Play className="size-16 md:size-24 " />}
            controls
            light
            width="100%"
            height="100%"
          />
        </div>
      </div>
    </section>
  );
};

export default AboutOurService;
