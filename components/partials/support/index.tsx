import { Button } from "@/components/shadcn/button";
import { Skeleton } from "@/components/shadcn/skeleton";
import { cn } from "@/lib/utils";
import Link from "next/link";
const Support = ({ data, loading }: { data: any; loading: boolean }) => {
  const { title, description, cta } = data;
  return (
    <section className="container my-12 md:my-28">
      <div
        className={cn(
          "flex flex-col md:flex-row justify-between items-center gap-6 md:gap-12 bg-primary-8 rounded-2xl p-6 md:p-16",
          loading && "bg-primary-2"
        )}
      >
        {loading ? (
          <>
            <div className="flex flex-col gap-4 md:gap-6 w-full">
              <Skeleton className="h-8 w-3/4 md:h-10 md:w-96" />
              <Skeleton className="h-5 w-full md:h-6 md:w-[480px]" />
            </div>
            <Skeleton className="h-12 w-full md:w-40" />
          </>
        ) : (
          <>
            <div className="flex flex-col gap-4 md:gap-6">
              <h4 className="text-white text-2xl md:text-4xl font-bold">
                {title}
              </h4>
              <p className="text-sm md:text-lg text-white">{description}</p>
            </div>
            <Button
              variant="secondary"
              size="lg"
              className="w-full md:w-fit"
              asChild
            >
              <Link href={cta.link}>{cta.text}</Link>
            </Button>
          </>
        )}
      </div>
    </section>
  );
};

export default Support;
