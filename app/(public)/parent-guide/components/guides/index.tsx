import { Support } from "@/components/icons";

const Guides = ({ data }: any) => {
  const { title, steps } = data;
  return (
    <section className="bg-white py-12 md:py-28">
      <div className="container flex flex-col items-center justify-center gap-6 md:gap-12">
        <h3 className="text-2xl md:text-5xl font-bold text-gray-9">{title}</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-8">
          {steps.map((step: any, index: number) => (
            <div
              key={index}
              className="p-6 rounded-2xl flex flex-col gap-4 md:gap-6 bg-primary-2"
            >
              <div className="size-12 md:size-[72px] rounded-xl bg-white flex items-center justify-center">
                <Support className="size-6 md:size-10 text-secondary-6" />
              </div>
              <div className="flex flex-col gap-3 md:gap-4">
                <h3 className="text-gray-9 text-xl md:text-2xl font-bold">
                  {step.title}
                </h3>
                <p className="text-gray-9 text-lg">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Guides;
