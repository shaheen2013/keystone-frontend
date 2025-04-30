import HeroSection from "@/components/partials/Hero";
import { Metadata } from "next";
import {
  heroData,
  keyBenefitsData,
  ourProcessData,
  ourServiceData,
  whyChooseKeystoneAbilitySupportData,
} from "./constant";
import AboutOurService from "./components/about-our-service";
import KeyBenefits from "./components/key-benefits";
import WhyChooseKeystoneAbilitySupport from "./components/why-choose-keystone-ability-support";
import Testimonials from "@/components/partials/testimonials";
import GetTouch from "@/components/partials/get-touch";
import OurProcess from "@/components/partials/our-process";
import ExploreServices from "@/components/partials/explore-other-services";

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
        title="Parents Are Saying"
        subtitle="Real stories from families we've helped—because every child deserves the right support and opportunities to thrive."
        classes={{ root: "bg-white", card: "bg-primary-1" }}
      />
      <ExploreServices title="Explore Other Services" />
      <GetTouch />
    </>
  );
}
