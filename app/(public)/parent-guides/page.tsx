import HeroSection from "@/components/partials/Hero";
import { Metadata } from "next";

import GetTouch from "@/components/partials/get-touch";
import { contactInfo } from "@/static/shared";
import { downloadToolkits, educationPlans, guides, heroData } from "./constant";
import Guides from "./components/guides";
import EducationPlans from "./components/education-plans";
import DownloadToolkits from "./components/download-toolkits";
import Testimonials from "@/components/partials/testimonials";
import { testimonialsData } from "@/static/homepage";

export const metadata: Metadata = {
  title: "Service Details | Keystone",
  description:
    "A platform for online communities, the Disability Platform, and Atypical Advantage",
};

export default function ParentGuides() {
  return (
    <>
      <HeroSection data={heroData} />
      <Guides data={guides} />
      <EducationPlans data={educationPlans} />
      <DownloadToolkits data={downloadToolkits} />
      <Testimonials
        data={testimonialsData}
        classes={{ root: "bg-primary-2", card: "bg-white" }}
      />
      <GetTouch data={contactInfo} />
    </>
  );
}
