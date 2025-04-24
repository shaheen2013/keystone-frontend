"use client";

import Support from "@/components/partials/support";
import HeroSection from "@/components/partials/Hero";
import OurImpact from "@/components/partials/OurImpact";
import ServiceSection from "@/components/partials/Service";
import UpComingEvents from "@/components/partials/upcoming-events";
import WhyKeystoneSection from "@/components/partials/WhyKeystone";
import InsightsAndStories from "@/components/partials/insights-and-stories";
import KeyStoneAbilitySupport from "@/components/partials/keystone-ability-support";
import Testimonials from "@/components/partials/testimonials";

import { upcomingEventsData } from "@/static/homepage";
import { useGetHomePageContentsQuery } from "@/features/public/homePageSlice";

export default function Home() {
  const { data, isLoading, isFetching }: any = useGetHomePageContentsQuery({});
  const loading = isLoading || isFetching;

  const heroData = {
    title: data?.data?.homepage?.title,
    description: data?.data?.homepage?.subtitle,
    backgroundImage: data?.data?.homepage?.background_image,
    buttons: [
      {
        url: "/events",
        text: "Join an Event",
      },
    ],
  };

  const WhyKeystoneData = {
    videoUrl: data?.data?.homepage?.why_us?.youtube_url,
    title: data?.data?.homepage?.why_us?.title,
    description: data?.data?.homepage?.why_us?.description,
    cta: {
      text: "Learn More",
      link: "/why-us",
    },
  };

  const keystoneAbilitySupportData = {
    title: data?.data?.homepage?.ability_supports?.title,
    description: data?.data?.homepage?.ability_supports?.description,
    cta: {
      text: "Get Started",
      link: "/services",
    },
    features: data?.data?.homepage?.ability_supports?.ability_supports,
  };

  const impactsData = {
    title: "Our Impact",
    subtitle:
      "Support for Families provided information, education and support for",
    stats: data?.data?.homepage?.our_impacts,
  };

  const supportSectionData = {
    title: data?.data?.homepage?.contact_actions?.title,
    description: data?.data?.homepage?.contact_actions?.description,
    cta: {
      text: "Contact Us",
      link: "/contact-us",
    },
  };

  return (
    <>
      <HeroSection data={heroData} loading={loading} />
      {data?.data?.homepage?.service_show && (
        <ServiceSection
          keyService
          title="Our Key Services"
          subtitle="Comprehensive Services for Families with Children with Special Needs"
        />
      )}
      {data?.data?.homepage?.why_us_show && (
        <WhyKeystoneSection data={WhyKeystoneData} loading={loading} />
      )}
      {data?.data?.homepage?.event_show && (
        <UpComingEvents data={upcomingEventsData} />
      )}

      {data?.data?.homepage?.ability_supports_show && (
        <KeyStoneAbilitySupport
          data={keystoneAbilitySupportData}
          loading={loading}
        />
      )}

      {data?.data?.homepage?.our_impacts_show && (
        <OurImpact data={impactsData} loading={loading} />
      )}

      {data?.data?.homepage?.testimonial_show && (
        <Testimonials
          title="Parents Are Saying"
          subtitle="Real stories from families we've helped—because every child deserves the right support and opportunities to thrive."
        />
      )}
      {data?.data?.homepage?.blog_show && <InsightsAndStories />}
      {data?.data?.homepage?.contact_actions_show && (
        <Support data={supportSectionData} loading={loading} />
      )}
    </>
  );
}
