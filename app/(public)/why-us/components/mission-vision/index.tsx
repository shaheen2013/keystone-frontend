import YoutubeVideoPlayer from "@/components/partials/youtube-player";
import MissionAndVisionSkeleton from "./skeletons";

const MissionAndVision = ({
  data,
  loading,
}: {
  data: any;
  loading: boolean;
}) => {
  const { mission, vision, videoUrl } = data;

  if (loading) {
    return <MissionAndVisionSkeleton />;
  }
  return (
    <section className="py-12 md:py-28 bg-white">
      <div className="container grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12 items-center">
        <div className="max-w-[776px] w-full h-auto max-h-60 md:max-h-[450px] rounded-xl overflow-hidden">
          <YoutubeVideoPlayer url={videoUrl} />
        </div>
        <div className="flex flex-col gap-4 md:gap-8">
          <div className="flex flex-col gap-4">
            <h2 className="text-gray-9 text-xl md:text-5xl font-bold">
              Mission
            </h2>
            <p className="text-gray-9 text-base md:text-xl">{mission}</p>
          </div>
          <div className="flex flex-col gap-4">
            <h2 className="text-gray-9 text-xl md:text-5xl font-bold">
              Vision
            </h2>
            <p className="text-gray-9 text-base md:text-xl">{vision}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MissionAndVision;
