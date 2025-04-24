import { Button } from "@/components/shadcn/button";
import { Skeleton } from "@/components/shadcn/skeleton";
import Link from "next/link";

const KeyStoneAbilitySupport = ({
  data,
  loading,
}: {
  data: any;
  loading: boolean;
}) => {
  const { title, description, cta, features } = data;

  return (
    <section className="py-12 md:py-28 bg-primary-2">
      <div className="container grid grid-cols-1 md:grid-cols-2 items-start gap-6 md:gap-12">
        {/* Left Column - Content */}
        <div className="flex flex-col items-start justify-center">
          {loading ? (
            <>
              <Skeleton className="h-8 w-3/4 mb-6 md:h-12" />
              <Skeleton className="h-4 w-full mb-4 md:h-6" />
              <Skeleton className="h-4 w-full mb-4 md:h-6" />
              <Skeleton className="h-4 w-full mb-8 md:h-6" />

              <Skeleton className="h-12 w-32" />
            </>
          ) : (
            <>
              <h3 className="mb-4 md:mb-6 text-2xl md:text-5xl font-bold text-gray-9">
                {title}
              </h3>
              <p className="mb-8 md:mb-12 text-base md:text-xl text-gray-8">
                {description}
              </p>
              <Button variant="secondary" size="lg" asChild>
                <Link href={cta.link}>{cta.text}</Link>
              </Button>
            </>
          )}
        </div>

        {/* Right Column - Features */}
        <div className="flex flex-col gap-4 md:gap-6">
          {loading ? (
            <>
              {[...Array(3)].map((_, index) => (
                <div
                  key={index}
                  className="bg-white p-4 md:p-8 rounded-2xl flex flex-col gap-4"
                >
                  <Skeleton className="h-6 w-3/4 md:h-8" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-5/6" />
                </div>
              ))}
            </>
          ) : (
            features?.map((feature: any, index: any) => (
              <div
                key={index}
                className="bg-white p-4 md:p-8 rounded-2xl border border-primary-7 flex flex-col gap-4"
              >
                <h4 className="text-gray-9 text-xl md:text-2xl font-bold">
                  {feature.name}
                </h4>
                <p className="text-gray-7 text-sm md:text-lg line-clamp-3">
                  {feature.description}
                </p>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default KeyStoneAbilitySupport;
