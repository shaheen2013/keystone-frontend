import CenteredHero from "@/components/partials/Hero/centered-hero";
import { Metadata } from "next";
import {
  contactInfo,
  heroData,
  keystoneAbilitySupportData,
  serviceData,
} from "./constant";
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
      <ServiceSection data={serviceData} />
      <KeyStoneAbilitySupport data={keystoneAbilitySupportData} />
      <GetTouch data={contactInfo} />
    </>
  );
}
