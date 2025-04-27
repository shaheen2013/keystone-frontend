import { Calendar, Category, Location } from "@/components/icons";
import { Button } from "@/components/shadcn/button";
import EventConfirmation from "./EventConfirmation";
import moment from "moment";
import { HeroSkeleton } from "./HeroSkeleton";

export default function Hero({
  data,
  loading,
}: {
  data: any;
  loading: boolean;
}) {
  const { title, description, backgroundImage, startTime, location, type, slug } =
    data;

  if (loading) {
    return <HeroSkeleton />;
  }

  return (
    <section
      className="relative w-full h-[788px] flex items-center justify-center"
      style={{
        background: `linear-gradient(0deg, rgba(0, 0, 0, 0.20) 0%, rgba(0, 0, 0, 0.20) 100%), 
                   linear-gradient(90deg, rgba(0, 0, 0, 0.85) 0%, rgba(0, 0, 0, 0.80) 22.5%, rgba(0, 0, 0, 0.00) 79.21%), 
                   url(${backgroundImage}) lightgray 50% / cover no-repeat`,
      }}
    >
      <div className="container">
        <div className="max-w-4xl text-white flex flex-col items-start gap-6">
          <Button size="sm" className="px-4 h-[30px] text-xs rounded-full">
            Event
          </Button>
          <h1 className="text-3xl md:text-5xl font-bold !leading-[1.2]">
            {title}
          </h1>
          <p className="text-base md:text-lg font-medium ">{description}</p>
          <div className="mt-6 p-6 flex flex-col gap-4 bg-primary-8 rounded-xl w-fit">
            <span className="text-white text-sm md:text-base font-medium inline-flex">
              <Calendar className="mr-2 size-6" />
              {moment(startTime).format("h:mm A, Do MMM YYYY")}
            </span>
            <span className="text-white text-sm md:text-base font-medium inline-flex">
              <Location className="mr-2 size-6" />
              {location}
            </span>
            <span className="text-white text-sm md:text-base font-medium inline-flex">
              <Category className="mr-2 size-6 " />
              {type}
            </span>
          </div>
          <EventConfirmation slug={slug} />
        </div>
      </div>
    </section>
  );
}
