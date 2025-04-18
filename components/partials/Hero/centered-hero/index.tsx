import { HeroData } from "./types";

export default function CenteredHero({ data }: { data: HeroData }) {
  const { title, subtitle, banner } = data;

  return (
    <section
      className="relative w-full h-[480px] flex items-center justify-center"
      style={{
        background: `linear-gradient(0deg, rgba(0, 0, 0, 0.70) 0%, rgba(0, 0, 0, 0.70) 100%), url(${banner})`,
        backgroundSize: "cover",
        backgroundPosition: "90% center",
        backgroundRepeat: "no-repeat",
        backgroundColor: "#000",
      }}
    >
      <div className="container">
        <div className="max-w-4xl text-white mx-auto text-center">
          <h1 className="text-4xl lg:text-6xl font-bold !leading-[1.2]">
            {title}
          </h1>
          <p className="mt-5 md:mt-6 text-base md:text-xl font-medium">
            {subtitle}
          </p>
        </div>
      </div>
    </section>
  );
}
