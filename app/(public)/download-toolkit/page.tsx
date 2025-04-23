import { Metadata } from "next";
import GetTouch from "@/components/partials/get-touch";
import { downloadToolkits, recommendedService } from "./constant";
import RecommendService from "./components/recommend-services";
import Toolkits from "./components/toolkits";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Download Toolkits | Keystone",
  description:
    "A platform for online communities, the Disability Platform, and Atypical Advantage",
};

export default function DownloadToolkitsPage() {
  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <Toolkits data={downloadToolkits} />
      </Suspense>
      <RecommendService data={recommendedService} />
      <GetTouch />
    </>
  );
}
