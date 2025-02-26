import HeroSection from "@/components/partials/Hero";
import ServiceSection from "@/components/partials/Service";
import WhyKeystoneSection from "@/components/partials/WhyKeystone";
import InsightsAndStories from "@/components/partials/insights-and-stories";
import KeyStoneAbilitySupport from "@/components/partials/keystone-ability-support";
import Support from "@/components/partials/support";
import UpComingEvents from "@/components/partials/upcoming-events";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Homepage | Keystone",
  description:
    "A platform for online communities, the Disability Platform, and Atypical Advantage",
};

export default function Home() {
  return (
    <>
      <HeroSection />
      <ServiceSection />
      <WhyKeystoneSection />
      <UpComingEvents />
      <KeyStoneAbilitySupport />
      <InsightsAndStories />
      <Support />
    </>
  );
}
