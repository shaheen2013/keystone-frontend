import { Metadata } from "next";
import { notFound } from "next/navigation";

import { contactInfo } from "@/static/shared";
import { allUpcomingEventsData, heroData } from "./constant";

import GetTouch from "@/components/partials/get-touch";
import EventsCalender from "./components/events-calender";
import AllUpComingEvents from "./components/all-upcoming-events";
import CenteredHero from "@/components/partials/Hero/centered-hero";

export const metadata: Metadata = {
  title: "Service Details | Keystone",
  description:
    "A platform for online communities, the Disability Platform, and Atypical Advantage",
};

export default function ServiceDetails() {
  // if not found then throw Not Found
  if (true) {
    notFound();
  }

  return (
    <>
      {/* <CenteredHero data={heroData} /> */}
      <HeroSection data={heroData} />
      <EventsCalender />
      <AllUpComingEvents data={allUpcomingEventsData} />
      <GetTouch data={contactInfo} />
    </>
  );
}
