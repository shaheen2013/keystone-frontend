import { Checkbox } from "@/components/shadcn/checkbox";
import { Label } from "@/components/shadcn/label";
import { useGetServicesQuery } from "@/features/public/services";
import ServicesSkeleton from "./components/skeletons";

const Services = ({
  selectedServices,
  setSelectedServices,
}: {
  selectedServices: string[];
  setSelectedServices: React.Dispatch<React.SetStateAction<string[]>>;
}) => {
  // services

  const {
    data: servicesResponse,
    isLoading: isServicesLoading,
    isFetching: isServicesFetching,
  }: any = useGetServicesQuery({});
  const servicesData = servicesResponse?.data?.services || [];
  const servicesLoading = isServicesLoading || isServicesFetching;

  if (servicesLoading) {
    return <ServicesSkeleton />;
  }

  return (
    <div className="m-4 md:m-6 bg-white rounded-xl">
      <div className="flex flex-col">
        <h3 className="text-gray-9 text-base md:text-lg font-semibold px-4 md:px-5 py-3">
          Services
        </h3>
        <hr className="border-gray-2" />
        {servicesData?.map((service: any, index: number) => (
          <div
            key={index}
            className="flex items-center space-x-2 px-4 md:px-5 py-3"
          >
            <Checkbox
              id={service.slug}
              variant="secondary"
              checked={selectedServices?.includes(service.id)}
              onCheckedChange={() =>
                setSelectedServices((prev) => {
                  if (prev.includes(service.id)) {
                    return prev.filter((e) => e !== service.id);
                  } else {
                    return [...prev, service.id];
                  }
                })
              }
            />
            <Label
              htmlFor={service.slug}
              className="text-sm md:text-lg text-gray-5"
            >
              {service.name}
            </Label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Services;
