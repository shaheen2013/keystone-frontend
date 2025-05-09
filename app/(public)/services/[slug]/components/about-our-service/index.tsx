import YoutubeVideoPlayer from "@/components/partials/youtube-player";
import { AboutOurServiceSkeleton } from "./skeletons/AboutOurServiceSkeleton";

const AboutOurService = ({
  data,
  loading,
}: {
  data: any;
  loading: boolean;
}) => {
  const { videoUrl, title, about } = data;

  if (loading) {
    return <AboutOurServiceSkeleton />;
  }

  return (
    <section className="py-12 md:py-28 bg-white">
      <div className="container grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12">
        <div className="flex flex-col items-start justify-center text-gray-9">
          <h3 className="mb-4 md:mb-6 text-2xl md:text-5xl font-bold">
            {title}
          </h3>
          <div
            className="prose mb-6 md:mb-8 !max-w-full"
            dangerouslySetInnerHTML={{ __html: about }}
          ></div>
        </div>
        <div className="max-w-[776px] w-full h-auto max-h-60 md:max-h-[450px] rounded-xl overflow-hidden">
          <YoutubeVideoPlayer url={videoUrl} />
        </div>
      </div>
    </section>
  );
};

export default AboutOurService;
