"use client";

import CenteredHero from "@/components/partials/Hero/centered-hero";

import { useGetTermsAndConditionsQuery } from "@/features/public/termsAndConditionsSlice";

export default function TermsAndCondition() {
  const { data }: any = useGetTermsAndConditionsQuery({});
  console.log("data", data);

  // const tableOfContents = data?.data?.table_of_contents || [];
  const tableOfContents = [
    { id: "section1", title: "Section 1" },
    { id: "section2", title: "Section 2" },
    { id: "section3", title: "Section 3" },
    { id: "section4", title: "Section 4" },
    { id: "section5", title: "Section 5" },
    { id: "section6", title: "Section 6" },
  ];
  const termsAndConditionData = data?.data?.page || {};

  console.log("termsAndConditionData", termsAndConditionData);

  const heroData = {
    title: termsAndConditionData?.title,
    subtitle: termsAndConditionData?.subtitle,
    banner: termsAndConditionData?.banner || "",
  };

  return (
    <>
      <CenteredHero data={heroData} />
      <div className="container py-12 md:py-28">
        <div className="dev text-center">Terms & Condition</div>
      </div>
    </>
  );
}
