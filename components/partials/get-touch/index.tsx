"use client";

import { Button } from "@/components/shadcn/button";
import { Input } from "@/components/shadcn/input";
import { Label } from "@/components/shadcn/label";
import { Textarea } from "@/components/shadcn/textarea";
import { useContactMutation } from "@/features/public/contactSlice";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import {
  Clock3Icon,
  Mail,
  MapPin,
  Phone,
  SendHorizonalIcon,
} from "lucide-react";
import { Controller, useForm } from "react-hook-form";

const GetTouch = ({ data, classes }: { data: any; classes?: any }) => {
  const { toast } = useToast();
  const { title, description, contactInfo } = data;
  const [contact, { isLoading }] = useContactMutation();

  const { handleSubmit, control } = useForm({
    defaultValues: {
      first_name: "",
      last_name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    },
  });

  const onSubmit = async (data: any) => {
    console.log(data);

    try {
      const response = await contact(data).unwrap();
      if (response) {
        toast({
          description: "Successfully submitted your message.",
        });
      }
    } catch (error) {
      console.log(error);
      toast({
        variant: "destructive",
        description: "Something went wrong. Please try again later.",
      });
    }
  };

  return (
    <section className={cn(" py-12 md:py-28 bg-white", classes?.root)}>
      <div className="container grid grid-cols-1 md:grid-cols-2 gap-12">
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
        <form
          className={cn(
            "flex flex-col gap-8 md:gap-12 p-4 md:p-8 bg-primary-2 rounded-2xl",
            classes?.form
          )}
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="first_name">
                First Name <span className="text-orange-500">*</span>
              </Label>
              <Controller
                name="first_name"
                control={control}
                rules={{ required: "First Name is required" }}
                render={({
                  field: { onChange, value, onBlur },
                  fieldState: { error },
                }) => (
                  <Input
                    id="first_name"
                    type="text"
                    onChange={onChange}
                    onBlur={onBlur}
                    value={value}
                    classes={{ input: "bg-white" }}
                    placeholder="Enter First Name"
                    errorText={error?.message}
                  />
                )}
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="last_name">Last Name </Label>
              <Controller
                name="last_name"
                control={control}
                render={({
                  field: { onChange, value, onBlur },
                  fieldState: { error },
                }) => (
                  <Input
                    id="last_name"
                    type="text"
                    onChange={onChange}
                    onBlur={onBlur}
                    value={value}
                    classes={{ input: "bg-white" }}
                    placeholder="Enter Last Name"
                    errorText={error?.message}
                  />
                )}
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="email">
                Email <span className="text-orange-500">*</span>
              </Label>
              <Controller
                name="email"
                control={control}
                rules={{ required: "Email is required" }}
                render={({
                  field: { onChange, onBlur, value },
                  fieldState: { error },
                }) => (
                  <Input
                    id="email"
                    type="text"
                    classes={{ input: "bg-white" }}
                    placeholder="Enter Email Address"
                    onChange={onChange}
                    onBlur={onBlur}
                    value={value}
                    errorText={error?.message}
                  />
                )}
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="phone">Phone</Label>
              <Controller
                name="phone"
                control={control}
                render={({
                  field: { onChange, onBlur, value },
                  fieldState: { error },
                }) => (
                  <Input
                    id="phone"
                    type="text"
                    classes={{ input: "bg-white" }}
                    placeholder="Enter Phone Number"
                    onChange={onChange}
                    onBlur={onBlur}
                    value={value}
                    errorText={error?.message}
                  />
                )}
              />
            </div>
            <div className="col-span-full flex flex-col gap-1.5">
              <Label htmlFor="subject">
                Subject <span className="text-orange-500">*</span>
              </Label>
              <Controller
                name="subject"
                control={control}
                rules={{ required: "Subject is required" }}
                render={({
                  field: { onChange, onBlur, value },
                  fieldState: { error },
                }) => (
                  <Input
                    id="subject"
                    type="text"
                    classes={{ input: "bg-white" }}
                    placeholder="Enter Subject"
                    onChange={onChange}
                    onBlur={onBlur}
                    value={value}
                    errorText={error?.message}
                  />
                )}
              />
            </div>
            <div className="col-span-full flex flex-col gap-1.5">
              <Label htmlFor="message">
                Message <span className="text-orange-500">*</span>
              </Label>
              <Controller
                name="message"
                control={control}
                rules={{ required: "Message is required" }}
                render={({
                  field: { onChange, onBlur, value },
                  fieldState: { error },
                }) => (
                  <Textarea
                    id="message"
                    className="bg-white"
                    placeholder="Enter Message"
                    rows={4}
                    onChange={onChange}
                    onBlur={onBlur}
                    value={value}
                    errorText={error?.message}
                  />
                )}
              />
            </div>
          </div>
          <Button
            variant="secondary"
            size="lg"
            className="w-full md:w-fit self-end"
          >
            Submit
            <SendHorizonalIcon
              className={cn("ml-1 text-white", isLoading && "animate-pulse")}
            />
          </Button>
        </form>
      </div>
    </section>
  );
};

export default GetTouch;
