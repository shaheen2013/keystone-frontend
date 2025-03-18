import CenteredHero from "@/components/partials/Hero/centered-hero";
import { Metadata } from "next";
import { heroData } from "./constant";

export const metadata: Metadata = {
  title: "Terms & Condition | Keystone",
  description:
    "A platform for online communities, the Disability Platform, and Atypical Advantage",
};

export default function TermsAndCondition() {
  return (
    <>
      <CenteredHero data={heroData} />
      <div className="container py-12 md:py-28">
        <div className="dev text-center">Terms & Condition</div>
      </div>
    </>
  );
}
