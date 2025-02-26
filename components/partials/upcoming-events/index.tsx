import { Calendar } from "@/components/icons";
import { Button } from "@/components/shadcn/button";
import { upcomingEventsData } from "./constant";
import Image from "next/image";

const UpComingEvents = () => {
  const { title, cta, events } = upcomingEventsData;
  return (
    <section className="max-w-[1600px] mx-5 md:mx-auto my-12 md:my-28 flex flex-col gap-6 md:gap-12">
      <div className="flex gap-6 justify-between items-center md:items-start">
        <h3 className="text-2xl md:text-5xl font-bold text-gray-9 grow">
          {title}
        </h3>
        <Button className="shrink-0">{cta.text}</Button>
      </div>
      <div className="grid md:grid-cols-3 gap-4 md:gap-8">
        {events.map((event, index) => (
          <div
            key={index}
            className="bg-primary-2 p-4 md:p-8 rounded-2xl flex flex-col gap-4 md:gap-6 items-start"
          >
            <div className="">
              <Image
                src={event.image}
                width={1000}
                height={760}
                alt={event.title}
              />
            </div>
            <div className="flex flex-col gap-3 md:gap-4">
              <div className="flex gap-2 text-secondary-6">
                <Calendar />
                <span className="font-medium text-base">{event.time}</span>
              </div>
              <h3 className="text-gray-9 text-xl md:text-3xl font-bold">
                {event.title}
              </h3>
              <p className="text-gray-9 text-sm md:text-lg">
                {event.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default UpComingEvents;
