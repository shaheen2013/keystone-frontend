"use client";

import HeroSection from "@/components/partials/Hero";

import GetTouch from "@/components/partials/get-touch";
import Guides from "./components/guides";
import EducationPlans from "./components/education-plans";
import Testimonials from "@/components/partials/testimonials";
import Toolkits from "./components/download-toolkits";
import { useGetParentGuidesContentsQuery } from "@/features/public/parentGuidesSlice";

export default function ParentGuides() {
  const { data, isLoading, isFetching }: any = useGetParentGuidesContentsQuery(
    {}
  );
  const loading = isLoading || isFetching;

  const heroData = {
    title: data?.data?.why_us_page?.title,
    description: data?.data?.why_us_page?.subtitle,
    backgroundImage: data?.data?.why_us_page?.background_image,
    buttons: [
      {
        url: "/contact-us",
        text: "Contact Us",
      },
    ],
  };

  const guidesData = {
    title: "Our Guides",
    guides: data?.data?.why_us_page?.our_guides,
  };

  const educationPlans = {
    title: data?.data?.why_us_page?.education_plan.title,
    subtitle: data?.data?.why_us_page?.education_plan.subtitle,
    youtube_url: data?.data?.why_us_page?.youtube_url,
    btns: [
      {
        text: "Contact Us",
        url: "/contact-us",
      },
    ],
  };

  return (
    <>
      <HeroSection data={heroData} loading={loading} />
      {data?.data.why_us_page?.our_guides_show && (
        <Guides data={guidesData} loading={loading} />
      )}
      {data?.data.why_us_page?.education_plan_show && (
        <EducationPlans data={educationPlans} loading={loading} />
      )}

      {data?.data.why_us_page?.resource_show && (
        <Toolkits isShowLoading={loading} />
      )}
      {data?.data.why_us_page?.testimonial_show && (
        <Testimonials
          title="Inspiring Stories from Our Community"
          classes={{ root: "bg-primary-2", card: "bg-white" }}
        />
      )}
      {data?.data.why_us_page?.contact_us_show && <GetTouch />}
    </>
  );
}
