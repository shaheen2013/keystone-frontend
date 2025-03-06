import GetTouch from "@/components/partials/get-touch";
import CenteredHero from "@/components/partials/Hero/centered-hero";
import { contactInfo } from "@/static/shared";
import { Metadata } from "next";
import { allUpcomingEventsData, heroData } from "./constant";
import AllUpComingEvents from "./components/all-upcoming-events";
import EventsCalender from "./components/events-calender";

export const metadata: Metadata = {
  title: "Service Details | Keystone",
  description:
    "A platform for online communities, the Disability Platform, and Atypical Advantage",
};

export default function ServiceDetails() {
  return (
    <>
      <CenteredHero data={heroData} />
      <EventsCalender />
      <AllUpComingEvents data={allUpcomingEventsData} />
      <GetTouch data={contactInfo} />
    </>
  );
}
