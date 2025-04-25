"use client";

import React, { use } from "react";
import Hero from "./components/hero";
import AboutWorkshop from "./components/about-workshop";
import Agenda from "./components/agenda";
import MeetOurSpeaker from "../components/meet-our-speaker";
import ExploreEvents from "@/components/partials/explore-events";
import GetTouch from "@/components/partials/get-touch";
import { useGetEventDetailsQuery } from "@/features/public/eventSlice";

export default function EventDetails({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);

  const { data, isLoading, isFetching }: any = useGetEventDetailsQuery({
    slug,
  });
  // Show skeletons while loading
  const loading = isLoading || isFetching;

  const eventData = data?.data?.event || {};

  const heroData = {
    title: eventData?.name,
    description: eventData?.short_brief,
    backgroundImage: eventData?.background_image?.path,
    startTime: eventData?.start_date,
    type: "test",
    location: eventData?.location,
  };

  const aboutWorkshop = {
    title: eventData?.title,
    about: eventData?.about,
    videoUrl: eventData?.youtube_link,
  };

  const eventAgenda = eventData?.agenda || [];

  const speakers = eventData?.event_speakers || [];

  return (
    <>
      <Hero data={heroData} loading={loading} />
      <AboutWorkshop data={aboutWorkshop} loading={loading} />
      <Agenda data={eventAgenda} loading={loading} />
      <MeetOurSpeaker data={speakers} loading={loading} />
      {eventData?.event_type_id && (
        <ExploreEvents
          title="Explore Related Events"
          isRelated
          eventTypeId={eventData?.event_type_id}
        />
      )}

      <GetTouch />
    </>
  );
}
