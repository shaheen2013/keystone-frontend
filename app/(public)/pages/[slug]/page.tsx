import CenteredHero from "@/components/partials/Hero/centered-hero";
import { heroData } from "../../terms-and-condition/constant";

const DynamicPage = ({ params }: { params: { slug: string } }) => {
  const { slug } = params;
  return (
    <>
      <CenteredHero data={heroData} />
      <div className="container py-12 md:py-28">
        <div className="dev text-center">dynamic Page for {slug}</div>
      </div>
    </>
  );
};

export default DynamicPage;
