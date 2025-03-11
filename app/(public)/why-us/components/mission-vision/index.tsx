import sectionImg from "@/public/assets/why-us/mission-vision/Image.png";
import Image from "next/image";

const MissionAndVision = () => {
  return (
    <section className="py-12 md:py-28 bg-white">
      <div className="container grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12 items-center">
        <Image src={sectionImg} alt="Image" width={776} height={450} />
        <div className="flex flex-col gap-4 md:gap-8">
          <div className="flex flex-col gap-4">
            <h2 className="text-gray-9 text-xl md:text-5xl font-bold">
              Mission
            </h2>
            <p className="text-gray-9 text-base md:text-xl">
              To provide families with the tools, resources, and community
              support they need to nurture their children with special needs,
              empowering them to lead fulfilling lives.
            </p>
          </div>
          <div className="flex flex-col gap-4">
            <h2 className="text-gray-9 text-xl md:text-5xl font-bold">
              Vision
            </h2>
            <p className="text-gray-9 text-base md:text-xl">
              A world where every child with special needs can thrive and reach
              their full potential with the unwavering support of their family
              and community.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MissionAndVision;
