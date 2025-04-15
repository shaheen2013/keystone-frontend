import { Metadata } from "next";
import CenteredHero from "@/components/partials/Hero/centered-hero";
import { heroData } from "../../terms-and-condition/constant";

// Define the expected structure of props
type Props = {
  params: {
    slug: any;
  };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return {
    title: `Page for ${params.slug}`,
  };
}

const DynamicPage = async ({ params }: Props) => {
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
