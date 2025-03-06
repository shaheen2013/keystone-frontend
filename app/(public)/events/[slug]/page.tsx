import React from "react";
import Hero from "./components/hero";
import { heroData, workshopAbout } from "@/static/eventdetails";
import AboutWorkshop from "./components/about-workshop";

export default async function EventDetails({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  console.log(slug);

  return (
    <>
      <Hero data={heroData} />
      <AboutWorkshop data={workshopAbout} />
    </>
  );
}
