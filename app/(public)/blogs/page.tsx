import { Metadata } from "next";

import GetTouch from "@/components/partials/get-touch";
import CenteredHero from "@/components/partials/Hero/centered-hero";
import { heroData } from "./constant";
import Blogs from "./components/blogs";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Blog | Keystone",
  description:
    "A platform for online communities, the Disability Platform, and Atypical Advantage",
};

export default function BlogPage() {
  return (
    <>
      <CenteredHero data={heroData} loading={false} />
      <Suspense fallback={<div className="h-3"></div>}>
        <Blogs />
      </Suspense>
      <GetTouch />
    </>
  );
}
