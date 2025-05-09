import Image from "next/image";
import { Calendar } from "../icons";
import { cn } from "@/lib/utils";
import moment from "moment";
import Link from "next/link";

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
      {event?.featured_image && (
        <Link href={`/events/${event.slug}`}>
          <div className="w-full overflow-hidden h-[230px] md:h-[314px] rounded-xl">
            <Image
              src={event?.featured_image?.path}
              width={1000}
              height={760}
              alt={event.title}
              className="w-full h-full object-cover rounded-xl"
            />
          </div>
        </Link>
      )}

      <div className="flex flex-col gap-3 md:gap-4">
        <div className="flex gap-2 text-secondary-6">
          <Calendar />
          <span className="font-medium text-base">
            {moment(event.start_date).format("h:mm A, Do MMM YYYY")}
          </span>
        </div>
        <Link href={`/events/${event.slug}`}>
          <h3 className="text-gray-9 text-xl md:text-3xl font-bold line-clamp-2">
            {event.name}
          </h3>
        </Link>
        <p className="text-gray-9 text-sm md:text-lg line-clamp-4">
          {event.short_brief}
        </p>
      </div>
    </div>
  );
};

export default EventCard;
