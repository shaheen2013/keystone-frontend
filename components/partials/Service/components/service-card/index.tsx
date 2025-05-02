import { ArrowRight } from "@/components/icons";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

const ServiceCard = ({
  service,
  classes,
}: {
  service: any;
  classes?: {
    root?: string;
  };
}) => {
  return (
    <div
      className={cn(
        "bg-primary-2 p-4 md:p-8 rounded-2xl flex flex-col gap-6 items-start max-w-[512px] w-full h-full",
        classes?.root
      )}
    >
      {service?.icon?.path && (
        <Image
          src={service.icon.path}
          width={56}
          height={56}
          alt="service"
          className="size-14 object-cover object-center rounded-md"
        />
      )}

      <div className="flex flex-col gap-4">
        <Link
          className="text-xl md:text-3xl font-bold text-gray-9"
          href={`/services/${service.slug}`}
        >
          {service.name}
        </Link>
        <p className="text-sm md:text-lg text-gray-9 line-clamp-3">
          {service.short_brief}
        </p>
      </div>

      <Link
        href={`/services/${service.slug}`}
        className="text-secondary-6 flex items-center line-clamp-1"
      >
        <span className="max-w-[80%] line-clamp-1"> View Details</span>
        <ArrowRight className="ml-2 size-6 shrink-0" />
      </Link>
    </div>
  );
};

export default ServiceCard;
