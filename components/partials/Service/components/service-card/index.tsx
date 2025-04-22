import { ArrowRight } from "@/components/icons";
import Image from "next/image";
import Link from "next/link";

const ServiceCard = ({ service }: { service: any }) => {
  return (
    <div className="bg-primary-2 p-4 md:p-8 rounded-2xl flex flex-col gap-6 items-start max-w-[512px] w-full">
      {service?.icon && (
        <div className="p-4 rounded-xl bg-white text-secondary-6">
          <Image src={service.icon} width={40} height={40} alt="service" />
        </div>
      )}

      <div className="flex flex-col gap-4">
        <h3 className="text-xl md:text-3xl font-bold text-gray-9">
          {service.name}
        </h3>
        <p className="text-sm md:text-lg text-gray-9 line-clamp-3">
          {service.short_brief}
        </p>
      </div>

      <Link
        href={service.button_link}
        className="text-secondary-6 flex items-center line-clamp-1"
      >
        <span className="max-w-[80%] line-clamp-1">{service.button_text}</span>
        <ArrowRight className="ml-2 size-6 shrink-0" />
      </Link>
    </div>
  );
};

export default ServiceCard;
