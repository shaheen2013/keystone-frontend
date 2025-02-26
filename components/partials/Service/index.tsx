import { Button } from "@/components/shadcn/button";
import { serviceData } from "./constant";

const ServiceSection = () => {
  const { title, subtitle, services } = serviceData;
  return (
    <section className="max-w-[1600px] mx-5 md:mx-auto my-12 md:my-28 flex flex-col items-center">
      <h2 className="mb-4 md:mb-6 text-2xl md:text-5xl font-bold text-gray-9 text-center">
        {title}
      </h2>
      <p className="mb-6 md:mb-12 text-base md:text-2xl text-gray-8 text-center">
        {subtitle}
      </p>
      <div className="mb-6 md:mb-12 grid md:grid-cols-3 gap-4 md:gap-8">
        {services.map((service, index) => (
          <div
            key={index}
            className="bg-primary-2 p-4 md:p-8 rounded-2xl flex flex-col gap-6 items-start"
          >
            <div className="p-4 rounded-xl bg-white text-secondary-6">
              <service.icon />
            </div>

            <div className="flex flex-col gap-4">
              <h3 className="text-xl md:text-3xl font-bold text-gray-9">
                {service.title}
              </h3>
              <p className="text-sm md:text-lg text-gray-9 line-clamp-3">
                {service.description}
              </p>
            </div>
            <Button>{service.linkText}</Button>
          </div>
        ))}
      </div>
      <Button>Explore All</Button>
    </section>
  );
};

export default ServiceSection;
