import { Button } from "@/components/shadcn/button";
import { cn } from "@/lib/utils";
import Link from "next/link";

export default function HeroSection({ data }: { data: any }) {
  const { title, description, backgroundImage } = data;

  return (
    <section
      className="relative w-full h-[520px] md:h-screen flex items-center justify-center bg-gray-200 bg-opacity-50"
      style={{
        background: `linear-gradient(0deg, rgba(0, 0, 0, 0.20) 0%, rgba(0, 0, 0, 0.20) 100%), linear-gradient(90deg, rgba(0, 0, 0, 0.85) 0%, rgba(0, 0, 0, 0.80) 22.5%, rgba(0, 0, 0, 0.00) 79.21%)`,
        backgroundImage: `url(${backgroundImage.src})`,
        backgroundSize: "cover",
        backgroundPosition: "90% center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="container">
        <div className="max-w-4xl text-white">
          <h1 className="text-4xl lg:text-7xl font-bold !leading-[1.2]">
            {title}
          </h1>
          <p className="mt-5 md:mt-6 text-base md:text-xl font-medium">
            {description}
          </p>
          <div
            className={cn(
              "flex flex-col md:flex-row gap-4 mt-8 md:mt-12",
              data.cta.length === 1 && "items-start"
            )}
          >
            {data.cta.map((item: any, index: number) => (
              <Button
                key={index}
                variant={index % 2 === 0 ? "secondary" : "outline"}
                size="lg"
                className={cn(index % 2 === 1 && "bg-transparent")}
                asChild
              >
                <Link href={item.link}>{item.text}</Link>
              </Button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
