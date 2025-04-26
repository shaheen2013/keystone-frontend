
import CenteredHero from "@/components/partials/Hero/centered-hero";
import { Metadata } from "next";
import { heroData, keystoneAbilitySupportData } from "./constant";
import ServiceSection from "@/components/partials/Service";
import KeyStoneAbilitySupport from "./components/keystone-ability-support";
import GetTouch from "@/components/partials/get-touch";

export const metadata: Metadata = {
  title: "Services | Keystone",
  description:
    "A platform for online communities, the Disability Platform, and Atypical Advantage",
};

export default function Services() {
  return (
    <>
      <CenteredHero data={heroData} />
      <ServiceSection
        title="Our Services"
        subtitle="Comprehensive Services for Families with Children with Special Needs"
      />
      <KeyStoneAbilitySupport data={keystoneAbilitySupportData} />
      <GetTouch />
    </>
  );
}
