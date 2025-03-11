import { Metadata } from "next";

import { contactInfo } from "@/static/shared";

import GetTouch from "@/components/partials/get-touch";
import CenteredHero from "@/components/partials/Hero/centered-hero";
import { blogs, heroData } from "./constant";
import Blogs from "./components/blogs";

export const metadata: Metadata = {
  title: "Blog | Keystone",
  description:
    "A platform for online communities, the Disability Platform, and Atypical Advantage",
};

export default function BlogPage() {
  return (
    <>
      <CenteredHero data={heroData} />
      <Blogs data={blogs} />
      <GetTouch data={contactInfo} />
    </>
  );
}
