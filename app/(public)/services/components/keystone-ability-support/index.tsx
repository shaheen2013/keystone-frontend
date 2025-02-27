import { KeystoneAbilitySupportDataType } from "./types";

const KeyStoneAbilitySupport = ({
  data,
}: {
  data: KeystoneAbilitySupportDataType;
}) => {
  const { title, description, features } = data;

  return (
    <section className="py-12 md:py-28 bg-primary-2">
      <div className="container flex flex-col gap-6 md:gap-12">
        <div className="flex flex-col items-center justify-center">
          <h3 className="text-center mb-4 md:mb-6 text-2xl md:text-5xl font-bold text-gray-9">
            {title}
          </h3>
          <p className="max-w-[960px] mx-auto text-center text-base md:text-xl text-gray-8">
            {description}
          </p>
        </div>
        <div className="grid  grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
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
