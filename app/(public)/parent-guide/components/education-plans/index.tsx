import YoutubeVideoPlayer from "@/components/partials/youtube-player";
import { Button } from "@/components/shadcn/button";
import Link from "next/link";
import EducationPlansSkeleton from "./skeletons";

const EducationPlans = ({ data, loading }: { data: any; loading: boolean }) => {
  const { title, subtitle, btns, youtube_url } = data;

  if (loading) {
    return <EducationPlansSkeleton />;
  }
  return (
    <section className="py-12 md:py-28 bg-primary-2">
      <div className="container grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12">
        <div className="flex flex-col items-start justify-center text-gray-9">
          <h3 className="mb-4 md:mb-6 text-2xl md:text-5xl font-bold">
            {title}
          </h3>
          <div
            className="prose mb-8 md:mb-12 !max-w-full"
            dangerouslySetInnerHTML={{ __html: subtitle }}
          ></div>
          {btns?.map((btn: any, index: number) => (
            <Button key={index} variant="secondary" size="lg" asChild>
              <Link href={btn.url}>{btn.text}</Link>
            </Button>
          ))}
        </div>
        <div className="max-w-[776px] w-full h-auto max-h-60 md:max-h-[450px] rounded-xl overflow-hidden">
          <YoutubeVideoPlayer url={youtube_url} />
        </div>
      </div>
    </section>
  );
};

export default EducationPlans;
