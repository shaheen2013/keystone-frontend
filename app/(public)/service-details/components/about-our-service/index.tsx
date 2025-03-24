import YoutubeVideoPlayer from "@/components/partials/youtube-player";

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
          <YoutubeVideoPlayer url={url} />
        </div>
      </div>
    </section>
  );
};

export default AboutOurService;
