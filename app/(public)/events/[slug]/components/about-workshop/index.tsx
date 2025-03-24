"use client";

import YoutubeVideoPlayer from "@/components/partials/youtube-player";

const AboutWorkshop = ({ data }: { data: any }) => {
  const { vedioUrl, title, description, keyPoints } = data;
  return (
    <section className="py-12 md:py-28 bg-white">
      <div className="container grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12">
        <div className="flex flex-col items-start justify-center text-gray-9">
          <h3 className="mb-4 md:mb-6 text-2xl md:text-5xl font-bold">
            {title}
          </h3>
          <p className="mb-6 md:mb-8 text-base md:text-xl">{description}</p>
          <ul className="flex flex-col gap-4">
            {keyPoints.map((point: string, index: number) => (
              <li
                key={index}
                className="flex items-center gap-4 text-base md:text-xl font-semibold"
              >
                <span className="size-2 bg-gray-9 rounded-full shrink-0"></span>
                <span className="text-gray-9">{point}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="max-w-[776px] w-full min-h-60">
          <YoutubeVideoPlayer url={vedioUrl} />
        </div>
      </div>
    </section>
  );
};

export default AboutWorkshop;
