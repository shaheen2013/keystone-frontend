import React from "react";
import Hero from "./components/hero";
import { heroData, workshopAbout } from "@/static/eventdetails";
import AboutWorkshop from "./components/about-workshop";
import Agenda from "./components/agenda";
import MeetOurSpeaker from "../components/meet-our-speaker";
import ExploreRecommendEvents from "@/components/partials/explore-recommend-events";
import GetTouch from "@/components/partials/get-touch";

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
      <Agenda />
      <MeetOurSpeaker />
      <ExploreRecommendEvents />
      <GetTouch />
    </>
  );
}
