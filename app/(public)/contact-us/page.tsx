import GetTouch from "@/components/partials/get-touch";
import { contactInfo } from "@/static/shared";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us | Keystone",
  description:
    "A platform for online communities, the Disability Platform, and Atypical Advantage",
};

export default function ContactUs() {
  return (
    <>
      <GetTouch
        data={contactInfo}
        classes={{ root: "bg-primary-2", form: "bg-white" }}
      />
      
    </>
  );
}
