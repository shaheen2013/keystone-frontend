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
      <div className="container py-12 md:py-28">
        <iframe
          title="Google Maps "
          className="w-full h-[350px] md:h-[800px] border-0 rounded-3xl"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3651.569618646788!2d90.35653387592784!3d23.762722188302003!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c17cc73cedd3%3A0xa64a90f7a9e6475b!2sMediusware%20Ltd.%20%7C%20Best%20Software%20Company%20in%20Bangladesh!5e0!3m2!1sen!2sbd!4v1741753072446!5m2!1sen!2sbd"
          allowFullScreen
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </>
  );
}
