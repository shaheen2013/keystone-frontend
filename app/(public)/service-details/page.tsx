import HeroSection from "@/components/partials/Hero";
import { Metadata } from "next";
import {
  exploreOtherServicesData,
  heroData,
  keyBenefitsData,
  ourProcessData,
  ourServiceData,
  testimonialsData,
  whyChooseKeystoneAbilitySupportData,
} from "./constant";
import AboutOurService from "./components/about-our-service";
import KeyBenefits from "./components/key-benefits";
import WhyChooseKeystoneAbilitySupport from "./components/why-choose-keystone-ability-support";
import Testimonials from "@/components/partials/testimonials";
import GetTouch from "@/components/partials/get-touch";
import { contactInfo } from "@/static/shared";
import ExploreOtherServices from "./components/explore-other-services";
import OurProcess from "@/components/partials/our-process";

export const metadata: Metadata = {
  title: "Service Details | Keystone",
  description:
    "A platform for online communities, the Disability Platform, and Atypical Advantage",
};

export default function ServiceDetails() {
  return (
    <>
      <HeroSection data={heroData} />
      <AboutOurService data={ourServiceData} />
      <KeyBenefits data={keyBenefitsData} />
      <WhyChooseKeystoneAbilitySupport
        data={whyChooseKeystoneAbilitySupportData}
      />
      <OurProcess data={ourProcessData} />
      <Testimonials
        data={testimonialsData}
        classes={{ root: "bg-white", card: "bg-primary-1" }}
      />
      <ExploreOtherServices data={exploreOtherServicesData} />
      <GetTouch data={contactInfo} />
    </>
  );
}
