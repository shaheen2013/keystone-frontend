"use client";

import HeroSection from "@/components/partials/Hero";

import GetTouch from "@/components/partials/get-touch";
import Testimonials from "@/components/partials/testimonials";
import OurImpact from "@/components/partials/OurImpact";
import OurProcess from "@/components/partials/our-process";

import { useGetWhyUsPageContentsQuery } from "@/features/public/whyUsSlice";
import MissionAndVision from "./components/mission-vision";

export default function WhyUs() {
  const { data, isLoading, isFetching }: any = useGetWhyUsPageContentsQuery({});
  const loading = isLoading || isFetching;

  const heroData = {
    title: data?.data?.why_us_page?.title,
    description: data?.data?.why_us_page?.subtitle,
    backgroundImage: data?.data?.why_us_page?.background_image,
    buttons: [
      {
        url: "/services",
        text: "Discover Our Services",
      },
      {
        url: "/contact-us",
        text: "Contact Us",
      },
    ],
  };

  const missionAndVision = {
    mission: data?.data?.why_us_page?.mission_vision?.mission,
    vision: data?.data?.why_us_page?.mission_vision?.vision,
    videoUrl: data?.data?.why_us_page?.mission_vision?.youtube_url,
  };

  const ourProcessData = {
    title: "What Makes Us Unique?",
    steps: data?.data?.why_us_page?.our_uniqueness,
  };

  const ourImpactData = {
    title: "Our Impact",
    subtitle:
      "Support for Families provided information, education and support for",
    stats: data?.data?.why_us_page?.our_impacts,
  };
  return (
    <>
      <HeroSection data={heroData} loading={loading} />

      {data?.data?.why_us_page?.mission_vision_show && (
        <MissionAndVision data={missionAndVision} loading={loading} />
      )}

      {data?.data?.why_us_page?.our_uniqueness_show && (
        <OurProcess
          data={ourProcessData}
          classes={{ cards: "md:grid-cols-3" }}
          loading={loading}
          stepsCount={3}
        />
      )}
      {data?.data?.why_us_page?.our_impact_show && (
        <OurImpact data={ourImpactData} loading={loading} />
      )}

      {data?.data?.why_us_page?.testimonial_show && (
        <Testimonials
          title="Parents Are Saying"
          subtitle="Real stories from families we've helped—because every child deserves the right support and opportunities to thrive."
          classes={{ root: "bg-primary-2", card: "bg-white" }}
        />
      )}
      {data?.data?.why_us_page?.contact_us_show && <GetTouch />}
    </>
  );
}
