import { Metadata } from "next";

import { heroData } from "./constant";

import GetTouch from "@/components/partials/get-touch";
import EventsArea from "./components/events-area";
import CenteredHero from "@/components/partials/Hero/centered-hero";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Service Details | Keystone",
  description:
    "A platform for online communities, the Disability Platform, and Atypical Advantage",
};

export default function Events() {
  return (
    <>
      <CenteredHero data={heroData} />
      <Suspense fallback={<div className="h-3"></div>}>
        <EventsArea />
      </Suspense>
      <GetTouch />
    </>
  );
}
