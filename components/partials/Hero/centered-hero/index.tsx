import { HeroData } from "./types";

export default function CenteredHero({ data }: { data: HeroData }) {
  const { title, description, backgroundImage } = data;

  return (
    <section
      className="relative w-full h-[480px] flex items-center justify-center bg-gray-200 bg-opacity-50"
      style={{
        background: `linear-gradient(0deg, rgba(0, 0, 0, 0.20) 0%, rgba(0, 0, 0, 0.20) 100%), linear-gradient(90deg, rgba(0, 0, 0, 0.85) 0%, rgba(0, 0, 0, 0.80) 22.5%, rgba(0, 0, 0, 0.00) 79.21%)`,
        backgroundImage: `url(${backgroundImage?.src})`,
        backgroundSize: "cover",
        backgroundPosition: "90% center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="container">
        <div className="max-w-4xl text-white mx-auto text-center">
          <h1 className="text-4xl lg:text-6xl font-bold !leading-[1.2]">
            {title}
          </h1>
          <p className="mt-5 md:mt-6 text-base md:text-xl font-medium ">
            {description}
          </p>
        </div>
      </div>
    </section>
  );
}
