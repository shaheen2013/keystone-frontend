import { Button } from "@/components/shadcn/button";
import { keystoneAbilitySupportData } from "./constant";

const KeyStoneAbilitySupport = () => {
  const { title, description, cta, features } = keystoneAbilitySupportData;

  return (
    <section className="py-12 md:py-28 bg-primary-2">
      <div className="max-w-[1600px] md:mx-auto mx-5 grid grid-cols-1 md:grid-cols-2 items-start gap-6 md:gap-12">
        <div className="flex flex-col items-start justify-center ">
          <h3 className="mb-4 md:mb-6 text-2xl md:text-5xl font-bold text-gray-9">
            {title}
          </h3>
          <p className="mb-8 md:mb-12 text-base md:text-xl text-gray-8">
            {description}
          </p>
          <Button>{cta.text}</Button>
        </div>
        <div className="flex flex-col gap-4 md:gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white p-4 md:p-8 rounded-2xl border border-primary-7 flex flex-col gap-4"
            >
              <h4 className="text-gray-9 text-xl md:text-2xl font-bold">
                {feature.title}
              </h4>
              <p className="text-gray-7 text-sm md:text-lg line-clamp-3">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default KeyStoneAbilitySupport;
