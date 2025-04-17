import Support from "@/components/partials/support";
import HeroSection from "@/components/partials/Hero";
import OurImpact from "@/components/partials/OurImpact";
import ServiceSection from "@/components/partials/Service";
import UpComingEvents from "@/components/partials/upcoming-events";
import WhyKeystoneSection from "@/components/partials/WhyKeystone";
import InsightsAndStories from "@/components/partials/insights-and-stories";
import KeyStoneAbilitySupport from "@/components/partials/keystone-ability-support";
import Testimonials from "@/components/partials/testimonials";

import {
  heroData,
  insightsAndStoriesData,
  keystoneAbilitySupportData,
  supportSectionData,
  upcomingEventsData,
  WhyKeystoneData,
} from "@/static/homepage";

export default function Home() {
  return (
    <>
      <HeroSection data={heroData} />
      <ServiceSection
        keyService
        title="Our Key Services"
        subtitle="Comprehensive Services for Families with Children with Special Needs"
      />
      <WhyKeystoneSection data={WhyKeystoneData} />
      <UpComingEvents data={upcomingEventsData} />
      <KeyStoneAbilitySupport data={keystoneAbilitySupportData} />
      <OurImpact />
      <Testimonials
        title="Parents Are Saying"
        subtitle="Real stories from families we've helped—because every child deserves the right support and opportunities to thrive."
      />
      <InsightsAndStories data={insightsAndStoriesData} />
      <Support data={supportSectionData} />
    </>
  );
}
