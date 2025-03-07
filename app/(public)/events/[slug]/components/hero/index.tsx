import { Calendar, Category, Location } from "@/components/icons";
import { Button } from "@/components/shadcn/button";
import EventConfirmation from "./EventConfirmation";

export default function Hero({ data }: { data: any }) {
  const { title, description, backgroundImage, dateTime, location, type } =
    data;

  return (
    <section
      className="relative w-full h-[788px] flex items-center justify-center bg-gray-200 bg-opacity-50"
      style={{
        background: `linear-gradient(0deg, rgba(0, 0, 0, 0.20) 0%, rgba(0, 0, 0, 0.20) 100%), linear-gradient(90deg, rgba(0, 0, 0, 0.95) 0%, rgba(0, 0, 0, 0.90) 22.5%, rgba(0, 0, 0, 0.65) 36%), rgba(0, 0, 0, 0.00) 79.21%)`,
        backgroundImage: `url(${backgroundImage?.src})`,
        backgroundSize: "cover",
        backgroundPosition: "90% center",
        backgroundRepeat: "no-repeat",
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
              {/* fill-rule isseues arise here  */}
              <Calendar className="mr-2 size-6" />
              {dateTime}
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
          <EventConfirmation />
        </div>
      </div>
    </section>
  );
}
