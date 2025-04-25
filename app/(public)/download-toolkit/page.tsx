import { Metadata } from "next";
import GetTouch from "@/components/partials/get-touch";
import Toolkits from "./components/toolkits";
import { Suspense } from "react";
import ExploreOtherServices from "@/components/partials/explore-other-services";

export const metadata: Metadata = {
  title: "Download Toolkits | Keystone",
  description:
    "A platform for online communities, the Disability Platform, and Atypical Advantage",
};

export default function DownloadToolkitsPage() {
  return (
    <>
      <Suspense fallback={<div className="h-3"></div>}>
        <Toolkits />
      </Suspense>
      <ExploreOtherServices title="Explore Recommended Services" />
      <GetTouch />
    </>
  );
}
