import { Button } from "@/components/shadcn/button";
import { Skeleton } from "@/components/shadcn/skeleton";
import { cn } from "@/lib/utils";
import Link from "next/link";

export default function HeroSection({
  data,
  loading,
}: {
  data: any;
  loading: boolean;
}) {
  const { title, description, backgroundImage, buttons } = data;

  return (
    <section className="relative w-full h-[520px] md:h-screen flex items-center justify-center bg-white">
      {/* Background image with skeleton */}
      <div className="absolute inset-0 w-full h-full">
        {loading ? (
          <Skeleton className="w-full h-full" />
        ) : (
          <div
            className="w-full h-full"
            style={{
              background: `linear-gradient(0deg, rgba(0, 0, 0, 0.20) 0%, rgba(0, 0, 0, 0.20) 100%), 
                         linear-gradient(90deg, rgba(0, 0, 0, 0.85) 0%, rgba(0, 0, 0, 0.80) 22.5%, rgba(0, 0, 0, 0.00) 79.21%), 
                         url(${backgroundImage}) lightgray 50% / cover no-repeat`,
            }}
          />
        )}
      </div>

      <div className="container relative z-10">
        <div className="max-w-4xl text-white">
          {loading ? (
            <>
              <Skeleton className="h-12 w-3/4 mb-6" />
              <Skeleton className="h-6 w-full mb-4" />
              <Skeleton className="h-6 w-5/6 mb-8" />
              <Skeleton className="h-12 w-32" />
            </>
          ) : (
            <>
              <h1 className="text-4xl lg:text-7xl font-bold !leading-[1.2]">
                {title}
              </h1>
              <p className="mt-5 md:mt-6 text-base md:text-xl font-medium">
                {description}
              </p>
              <div
                className={cn(
                  "flex flex-col md:flex-row gap-4 mt-8 md:mt-12",
                  buttons.length === 1 && "items-start"
                )}
              >
                {buttons?.map((item: any, index: number) => (
                  <Button
                    key={index}
                    variant={index % 2 === 0 ? "secondary" : "outline"}
                    size="lg"
                    className={cn(index % 2 === 1 && "bg-transparent")}
                    asChild
                  >
                    <Link href={item.url}>{item.text}</Link>
                  </Button>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
