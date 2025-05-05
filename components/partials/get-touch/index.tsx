"use client";

import { Button } from "@/components/shadcn/button";
import { Input } from "@/components/shadcn/input";
import { Label } from "@/components/shadcn/label";
import { Textarea } from "@/components/shadcn/textarea";
import { GetTouchSkeleton } from "@/components/skeletons";
import { useContactMutation } from "@/features/public/contactSlice";
import { useGetFooterQuery } from "@/features/public/footerSlice";
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

const GetTouch = ({ classes }: { classes?: any }) => {
  const { toast } = useToast();
  const [contact, { isLoading: postLoading }] = useContactMutation();
  const { data, isLoading, isFetching }: any = useGetFooterQuery({});

  const loading = isLoading || isFetching;

  const getContactInfo = data?.data?.get_in_touch;

  const { handleSubmit, control, setError, reset } = useForm({
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

    try {
      const response: any = await contact(data).unwrap();
      if (response?.success) {
        toast({
          description: "Successfully submitted your message.",
        });
        reset();
      }
    } catch (error: any) {
      const errors = error?.data?.errors;

      if (errors.first_name?.length) {
        setError("first_name", {
          type: "manual",
          message: errors.first_name.join(", "),
        });
      }
      if (errors.last_name?.length) {
        setError("last_name", {
          type: "manual",
          message: errors.last_name.join(", "),
        });
      }
      if (errors.email?.length) {
        setError("email", {
          type: "manual",
          message: errors.email.join(", "),
        });
      }

      if (errors.subject?.length) {
        setError("subject", {
          type: "manual",
          message: errors.subject.join(", "),
        });
      }

      if (errors.phone?.length) {
        setError("phone", {
          type: "manual",
          message: errors.phone.join(", "),
        });
      }
      if (errors.message?.length) {
        setError("message", {
          type: "manual",
          message: errors.message.join(", "),
        });
      }
    }
  };

  if (loading) {
    return <GetTouchSkeleton classes={classes} />;
  }

  return (
    <section className={cn(" py-12 md:py-28 bg-white", classes?.root)}>
      <div className="container grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="flex flex-col">
          <h2 className="mb-4 md:mb-6 text-2xl md:text-5xl font-bold text-gray-9">
            We’re Here to Help
          </h2>
          <p className="mb-6 md:mb-12 text-base md:text-xl text-gray-8">
            {getContactInfo?.contact_info}
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
                    {getContactInfo?.availability}
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
                  {getContactInfo?.location}
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
                  {getContactInfo?.email}
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
                  {getContactInfo?.phone}
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
              <Label htmlFor="last_name">
                Last Name <span className="text-orange-500">*</span>
              </Label>
              <Controller
                name="last_name"
                control={control}
                rules={{ required: "Last Name is required" }}
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
              <Label htmlFor="phone">
                Phone <span className="text-orange-500">*</span>
              </Label>
              <Controller
                name="phone"
                control={control}
                rules={{ required: "Phone Number is required" }}
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
              className={cn("ml-1 text-white", postLoading && "animate-pulse")}
            />
          </Button>
        </form>
      </div>
    </section>
  );
};

export default GetTouch;
