import { cn } from "@/lib/utils";
import OurProcessSkeleton from "./skeletons";

const OurProcess = ({
  classes,
  data,
  loading,
  stepsCount,
}: {
  classes?: any;
  data: any;
  loading: boolean;
  stepsCount: number;
}) => {
  const { title, steps } = data;

  if (loading) {
    return <OurProcessSkeleton classes={classes} stepsCount={stepsCount} />;
  }
  return (
    <section className="py-12 md:py-28 bg-primary-2">
      <div className="container flex flex-col gap-6 md:gap-12">
        <h3 className="text-2xl md:text-5xl font-bold text-gray-9 text-center">
          {title}
        </h3>
        <div
          className={cn(
            "grid grid-cols-1 md:grid-cols-4 justify-center  gap-4 md:gap-8",
            classes?.cards
          )}
        >
          {steps?.length === 0 ? (
            <p className="col-span-full text-center">Not found</p>
          ) : (
            <>
              {steps?.map((step: any, index: any) => (
                <div
                  key={index}
                  className="flex flex-col gap-4 md:gap-6 p-4 md:p-8 rounded-2xl border border-primary-7 bg-white"
                >
                  <div className="flex items-center justify-center bg-secondary-2 size-12 md:size-[72px] rounded-lg">
                    <span className="text-secondary-6 font-bold text-2xl">
                      {index + 1}
                    </span>
                  </div>
                  <div className="flex flex-col gap-3 md:gap-4">
                    <h3 className="text-xl md:text-2xl font-bold text-gray-9">
                      {step.name}
                    </h3>
                    <p className="text-sm md:text-lg text-gray-9">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default OurProcess;
