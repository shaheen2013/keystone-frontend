"use client";

import HeroSection from "@/components/partials/Hero";
import AboutOurService from "./components/about-our-service";
import KeyBenefits from "./components/key-benefits";
import WhyChooseKeystoneAbilitySupport from "./components/why-choose-keystone-ability-support";
import Testimonials from "@/components/partials/testimonials";
import GetTouch from "@/components/partials/get-touch";
import OurProcess from "@/components/partials/our-process";
import ExploreServices from "@/components/partials/explore-other-services";
import { use } from "react";
import NotFound from "@/components/partials/dynamic-page-not-found";
import { useGetServiceDetailsQuery } from "@/features/public/services";

export default function ServiceDetails({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);

  const { data, isLoading, isFetching, isError, error }: any =
    useGetServiceDetailsQuery({
      slug,
    });

  // Show skeletons while loading
  const loading = isLoading || isFetching;

  const serviceData = data?.data?.service || {};

  console.log("serviceData", serviceData);

  const heroData = {
    title: serviceData?.name,
    description: serviceData?.short_brief,
    backgroundImage: serviceData?.background_image?.path,
    buttons: [
      {
        text: "Contact Us",
        url: "/contact-us",
      },
    ],
  };

  const ourServiceData = {
    videoUrl: serviceData?.youtube_link,
    title: serviceData?.title,
    about: serviceData?.about,
  };

  const benefitsData = {
    title: "Key Benefits",
    benefits: serviceData?.benefits,
  };

  const ourProcessData = {
    title: "Our Process",
    steps: serviceData?.our_processes,
  };

  const whyChooseKeystoneAbilitySupportData = {
    title: "Why Choose Keystone Ability Support?",
    reasons: serviceData?.ability_supports,
    image: {
      src: serviceData?.ability_support_image?.path,
    },
  };
  // Handle 404 errors using your custom component
  if (isError && error?.status === 404) {
    return <NotFound />;
  }
  return (
    <>
      <HeroSection data={heroData} loading={loading} />
      <AboutOurService data={ourServiceData} loading={loading} />
      <KeyBenefits data={benefitsData} loading={loading} />
      <WhyChooseKeystoneAbilitySupport
        data={whyChooseKeystoneAbilitySupportData}
        loading={loading}
      />
      <OurProcess data={ourProcessData} loading={loading} />
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
