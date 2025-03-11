import { Metadata } from "next";
import GetTouch from "@/components/partials/get-touch";
import { contactInfo } from "@/static/shared";
import { downloadToolkits, recommendedService } from "./constant";
import RecommendService from "./components/recommend-services";
import Toolkits from "./components/toolkits";

export const metadata: Metadata = {
  title: "Download Toolkits | Keystone",
  description:
    "A platform for online communities, the Disability Platform, and Atypical Advantage",
};

export default function DownloadToolkitsPage() {
  return (
    <>
      <Toolkits data={downloadToolkits} />
      <RecommendService data={recommendedService} />
      <GetTouch data={contactInfo} />
    </>
  );
}
