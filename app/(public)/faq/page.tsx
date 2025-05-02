import { Metadata } from "next";
import { heroData } from "../events/constant";
import CenteredHero from "@/components/partials/Hero/centered-hero";
import Support from "@/components/partials/support";
import Faqs from "./components/faqs";
import { contactUSSectionData } from "./constant";

export const metadata: Metadata = {
  title: "FAQs | Keystone",
  description:
    "A platform for online communities, the Disability Platform, and Atypical Advantage",
};

export default function FaqsPage() {
  return (
    <>
      <CenteredHero data={heroData} loading={false} />
      <Faqs />
      <Support data={contactUSSectionData} loading={false} />
    </>
  );
}
