import { Button } from "@/components/shadcn/button";
import { Input } from "@/components/shadcn/input";
import { Label } from "@/components/shadcn/label";
import { Textarea } from "@/components/shadcn/textarea";
import {
  Clock3Icon,
  Mail,
  MapPin,
  Phone,
  SendHorizonalIcon,
} from "lucide-react";

const GetTouch = ({ data }: { data: any }) => {
  const { title, description, contactInfo } = data;

  return (
    <section className="container my-12 md:my-28 bg-white grid grid-cols-1 md:grid-cols-2 gap-12">
      <div className="flex flex-col">
        <h2 className="mb-4 md:mb-6 text-2xl md:text-5xl font-bold text-gray-9">
          {title}
        </h2>
        <p className="mb-6 md:mb-12 text-base md:text-xl text-gray-8">
          {description}
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-primary-1 rounded-2xl p-4 md:p-6 col-span-full flex gap-3 md:gap-4 items-center">
            <div className="bg-primary-6 size-12 md:size-16 rounded-lg flex items-center justify-center shrink-0">
              <Clock3Icon className="text-white size-6 md:size-8 " />
            </div>
            <div className="flex flex-col gap-1">
              <h4 className="text-gray-9 text-sm md:text-lg font-bold">
                Availability:
              </h4>
              <p className="flex items-center gap-1 md:gap-0 flex-col md:flex-row">
                <span className="text-xs md:text-sm">
                  Monday - Friday
                  <span className="text-primary-6 font-semibold ml-1">
                    (09:00 AM – 09:00 PM)
                  </span>
                </span>
                <span className="hidden md:block mx-2">|</span>
                <span className="text-xs md:text-sm">
                  Saturday - Sunday
                  <span className="text-primary-6 font-semibold ml-1">
                    (11:00 AM – 05:00 PM)
                  </span>
                </span>
              </p>
            </div>
          </div>
          <div className="bg-primary-1 rounded-2xl p-4 md:p-6 col-span-full flex gap-3 md:gap-4 items-center">
            <div className="bg-primary-6 size-12 md:size-16 rounded-lg flex items-center justify-center shrink-0">
              <MapPin className="text-white size-6 md:size-8 " />
            </div>
            <div className="flex flex-col gap-1">
              <h4 className="text-gray-9 text-sm md:text-lg font-bold">
                Location:
              </h4>
              <p className="text-xs md:text-sm text-gray-9">
                {contactInfo.location}
              </p>
            </div>
          </div>
          <div className="bg-primary-1 rounded-2xl p-4 md:p-6 flex gap-3 md:gap-4 items-center">
            <div className="bg-primary-6 size-12 md:size-16 rounded-lg flex items-center justify-center shrink-0">
              <Mail className="text-white size-6 md:size-8 " />
            </div>
            <div className="flex flex-col gap-1">
              <h4 className="text-gray-9 text-sm md:text-lg font-bold">
                Email:
              </h4>
              <p className="text-xs md:text-sm text-gray-9">
                {contactInfo.email}
              </p>
            </div>
          </div>
          <div className="bg-primary-1 rounded-2xl p-4 md:p-6 flex gap-3 md:gap-4 items-center">
            <div className="bg-primary-6 size-12 md:size-16 rounded-lg flex items-center justify-center shrink-0">
              <Phone className="text-white size-6 md:size-8 " />
            </div>
            <div className="flex flex-col gap-1">
              <h4 className="text-gray-9 text-sm md:text-lg font-bold">
                Phone:
              </h4>
              <p className="text-xs md:text-sm text-gray-9">
                {contactInfo.phone}
              </p>
            </div>
          </div>
        </div>
      </div>
      <form className="flex flex-col gap-8 md:gap-12 p-4 md:p-8 bg-primary-2 rounded-2xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="fname">First Name</Label>
            <Input
              id="fname"
              type="text"
              className="bg-white"
              placeholder="Enter First Name"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="lname">Last Name</Label>
            <Input
              id="lname"
              type="text"
              className="bg-white"
              placeholder="Enter Last Name"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="text"
              className="bg-white"
              placeholder="Enter Email Address"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="phone">Phone</Label>
            <Input
              id="phone"
              type="text"
              className="bg-white"
              placeholder="Enter Phone Number"
            />
          </div>
          <div className="col-span-full flex flex-col gap-1.5">
            <Label htmlFor="subject">Subject</Label>
            <Input
              id="subject"
              type="text"
              className="bg-white"
              placeholder="Enter Subject"
            />
          </div>
          <div className="col-span-full flex flex-col gap-1.5">
            <Label htmlFor="message">Message</Label>
            <Textarea
              id="message"
              className="bg-white"
              placeholder="Enter Message"
              rows={4}
            />
          </div>
        </div>
        <Button
          variant="secondary"
          size="lg"
          className="w-full md:w-fit self-end"
        >
          Submit
          <SendHorizonalIcon className="ml-1 text-white" />
        </Button>
      </form>
    </section>
  );
};

export default GetTouch;
