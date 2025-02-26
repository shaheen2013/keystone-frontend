import { Metadata } from "next";

import Support from "@/components/partials/support";
import HeroSection from "@/components/partials/Hero";
import OurImpact from "@/components/partials/OurImpact";
import ServiceSection from "@/components/partials/Service";
import UpComingEvents from "@/components/partials/upcoming-events";
import WhyKeystoneSection from "@/components/partials/WhyKeystone";
import InsightsAndStories from "@/components/partials/insights-and-stories";
import KeyStoneAbilitySupport from "@/components/partials/keystone-ability-support";
import Testimonials from "@/components/partials/testimonials";

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
      <OurImpact />
      <Testimonials />
      <InsightsAndStories />
      <Support />
    </>
  );
}
