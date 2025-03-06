import React from "react";
import Hero from "./components/hero";
import { heroData } from "@/static/eventdetails";

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
    </>
  );
}
