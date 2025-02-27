import HeroSection from "@/components/partials/Hero";
import { Metadata } from "next";
import {
  heroData,
  keyBenefitsData,
  ourServiceData,
  whyChooseKeystoneAbilitySupportData,
} from "./constant";
import AboutOurService from "./components/about-our-service";
import KeyBenefits from "./components/key-benefits";
import WhyChooseKeystoneAbilitySupport from "./components/why-choose-keystone-ability-support";

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
    </>
  );
}
