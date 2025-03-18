import Image from "next/image";
import { Calendar } from "../icons";
import { cn } from "@/lib/utils";

const EventCard = ({
  event,
  className,
}: {
  event: any;
  className?: string;
}) => {
  return (
    <div
      className={cn(
        "bg-primary-2 p-4 md:p-8 rounded-2xl flex flex-col gap-4 md:gap-6 items-start h-full",
        className
      )}
    >
      <div className="max-h-[314px] w-full overflow-hidden">
        <Image
          src={event.image}
          width={1000}
          height={760}
          alt={event.title}
          className="w-full h-full object-cover"
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
        <p className="text-gray-9 text-sm md:text-lg">{event.description}</p>
      </div>
    </div>
  );
};

export default EventCard;
