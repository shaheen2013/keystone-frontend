import HeroSection from "@/components/partials/Hero";
import { Metadata } from "next";

import GetTouch from "@/components/partials/get-touch";
import { contactInfo } from "@/static/shared";
import { heroData, ourProcessData } from "./constant";
import Testimonials from "@/components/partials/testimonials";
import OurImpact from "@/components/partials/OurImpact";
import OurProcess from "@/components/partials/our-process";
import MissionAndVision from "./components/mission-vision";

export const metadata: Metadata = {
  title: "Why Us | Keystone",
  description:
    "A platform for online communities, the Disability Platform, and Atypical Advantage",
};

export default function ParentGuides() {
  return (
    <>
      <HeroSection data={heroData} />
      <MissionAndVision />
      <OurProcess data={ourProcessData} classes={{ cards: "md:grid-cols-3" }} />
      <OurImpact />
      <Testimonials
        title="Parents Are Saying"
        subtitle="Real stories from families we've helped—because every child deserves the right support and opportunities to thrive."
        classes={{ root: "bg-primary-2", card: "bg-white" }}
      />
      <GetTouch data={contactInfo} />
    </>
  );
}
