import { Metadata } from "next";
import { heroData } from "../events/constant";
import CenteredHero from "@/components/partials/Hero/centered-hero";
import Support from "@/components/partials/support";
import { supportSectionData } from "@/static/homepage";
import Faqs from "./components/faqs";

export const metadata: Metadata = {
  title: "FAQs | Keystone",
  description:
    "A platform for online communities, the Disability Platform, and Atypical Advantage",
};

export default function FaqsPage() {
  return (
    <>
      <CenteredHero data={heroData} />
      <Faqs />
      <Support data={supportSectionData} />
    </>
  );
}
