import Image from "next/image";
import WhyChooseKeystoneAbilitySupportSkeleton from "./skeletons";

const WhyChooseKeystoneAbilitySupport = ({
  data,
  loading,
}: {
  data: any;
  loading: boolean;
}) => {
  const { title, reasons, image } = data;

  if (loading) {
    return <WhyChooseKeystoneAbilitySupportSkeleton />;
  }
  return (
    <section className="py-12 md:py-28 bg-white">
      <div className="container grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12">
        <div className="flex flex-col gap-4 md:gap-12">
          <h3 className="text-gray-9 text-2xl md:text-5xl font-bold">
            {title}
          </h3>
          <div className="flex flex-col gap-4">
            {reasons?.map((reason: any, index: any) => (
              <div
                key={index}
                className="p-4 md:p-8 flex flex-col gap-3 md:gap-4 bg-primary-2 rounded-2xl"
              >
                <h4 className="text-xl md:text-2xl font-bold text-gray-9">
                  {reason.name}
                </h4>
                <p className="text-sm md:text-lg text-gray-9">
                  {reason.description}
                </p>
              </div>
            ))}
          </div>
        </div>
        {image?.src && (
          <Image
            src={image.src}
            alt="why choose keystone ability support"
            width={1000}
            height={760}
            className="w-full max-w-[776px] h-auto rounded-xl object-cover object-center"
          />
        )}
      </div>
      {!loading && reasons?.length === 0 && (
        <div className="text-gray-5 text-center">Not Found</div>
      )}
    </section>
  );
};

export default WhyChooseKeystoneAbilitySupport;
