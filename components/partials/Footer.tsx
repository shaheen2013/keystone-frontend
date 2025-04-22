"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Button } from "../shadcn/button";
import { Input } from "../shadcn/input";
import {
  useGetFooterQuery,
  useSubscribeMutation,
} from "@/features/public/footerSlice";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "@/hooks/use-toast";
import { FooterSkeleton } from "../skeletons";
import { useSelector } from "react-redux";

type FormValues = {
  email: string;
};

export default function Footer() {
  const { data, isLoading, isFetching }: any = useGetFooterQuery({});
  const logo = useSelector((state: any) => state.logoUrl);

  console.log("logo", logo);
  const [subscribe] = useSubscribeMutation();

  const footerData = data?.data;

  console.log("data", data);

  const loading = isLoading || isFetching;

  const { handleSubmit, control, setError } = useForm<FormValues>({
    defaultValues: {
      email: "",
    },
  });

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    try {
      const response: any = await subscribe(data).unwrap();
      console.log("response", response);
      toast({
        description: "Thank you for subscribing",
      });
    } catch (error: any) {
      const emailErrors = error?.data?.errors?.email;
      setError("email", {
        type: "manual",
        message: emailErrors?.join(", ") || "email not found",
      });
    }
  };

  if (loading) {
    return <FooterSkeleton />;
  }

  return (
    <footer className="text-gray-600 bg-primary-2">
      <div className="container lg:py-24 py-12 mx-auto flex  lg:flex-row md:flex-nowrap flex-wrap flex-col gap-6">
        {/* left */}

        <div className="xl:w-80 lg:w-60">
          {(footerData?.logo || logo) && (
            <Link href="/" className="lg:mb-6 mb-5 block">
              <Image
                src={footerData?.logo || logo}
                alt="logo"
                width={100}
                height={100}
                className="h-12 w-[110px] flex-1"
              />
            </Link>
          )}

          <p className="text-base text-gray-9 mb-8">{footerData?.about}</p>

          <div className="flex gap-4">
            {footerData?.social_links?.facebook && (
              <Link href={footerData?.social_links?.facebook}>
                <Image
                  src="/icons/facebook.svg"
                  alt="facebook"
                  width={40}
                  height={40}
                />
              </Link>
            )}
            {footerData?.social_links?.instagram && (
              <Link href={footerData?.social_links?.instagram}>
                <Image
                  src="/icons/instagram.svg"
                  alt="instagram"
                  width={40}
                  height={40}
                />
              </Link>
            )}
            {footerData?.social_links?.x && (
              <Link href={footerData?.social_links?.x}>
                <Image
                  src="/icons/twitter.svg"
                  alt="twitter"
                  width={40}
                  height={40}
                />
              </Link>
            )}
            {footerData?.social_links?.linkedin && (
              <Link href={footerData?.social_links?.linkedin}>
                <Image
                  src="/icons/linkdin.png"
                  alt="linkedin"
                  width={40}
                  height={40}
                />
              </Link>
            )}
            {footerData?.social_links?.youtube && (
              <Link href={footerData?.social_links?.youtube}>
                <Image
                  src="/icons/youtube.svg"
                  alt="youtube"
                  width={40}
                  height={40}
                />
              </Link>
            )}
          </div>
        </div>

        {/* middle */}
        <div className="grid lg:grid-cols-3 grid-cols-2 flex-wrap flex-1">
          <div className="">
            <h2 className="font-bold text-gray-9 text-lg lg:mb-6 mb-4">
              Quick Links
            </h2>
            <nav className="lg:mb-10 mb-4">
              {footerData?.quick_links &&
                footerData?.quick_links?.map((link: any, index: number) => {
                  return (
                    <Link
                      key={index}
                      href={link.url}
                      className="block lg:mb-3 mb-2 text-gray-9"
                    >
                      {link.label}
                    </Link>
                  );
                })}
            </nav>
          </div>

          <div className="">
            <h2 className="font-bold text-gray-9 text-lg lg:mb-6 mb-4">
              Support & Legal
            </h2>
            <nav className="lg:mb-10 mb-4">
              {footerData?.support_links &&
                footerData?.support_links?.map((link: any, index: number) => {
                  return (
                    <Link
                      key={index}
                      href={link?.url}
                      className="block lg:mb-3 mb-2 text-gray-9"
                    >
                      {link?.label}
                    </Link>
                  );
                })}
            </nav>
          </div>

          <div className="lg:col-span-1 col-span-2">
            <h2 className="font-bold text-gray-9 text-lg lg:mb-6 mb-4">
              Get in Touch
            </h2>
            <nav className="lg:mb-10 mb-4">
              <div className="flex gap-2 mb-4">
                <div className="h-6 w-6">
                  <Image
                    src="/icons/mail.svg"
                    alt="location"
                    width={60}
                    height={60}
                    className="email"
                  />
                </div>
                {footerData?.get_in_touch?.email && (
                  <Link
                    href={`mailto:${footerData?.get_in_touch?.email}`}
                    className=" text-gray-9"
                  >
                    {footerData?.get_in_touch?.email}
                  </Link>
                )}
              </div>

              <div className="flex gap-2 mb-4">
                <div className="h-6 w-6">
                  <Image
                    src="/icons/phonecall.svg"
                    alt="location"
                    width={60}
                    height={60}
                    className=""
                  />
                </div>
                {footerData?.get_in_touch?.phone && (
                  <Link
                    href={`tel:${footerData?.get_in_touch?.phone}`}
                    className=" text-gray-9"
                  >
                    {footerData?.get_in_touch?.phone}
                  </Link>
                )}
              </div>
            </nav>
          </div>
        </div>

        {/* right */}
        <div className="xl:w-80 lg:w-60">
          <h2 className="font-bold text-gray-9 text-lg mb-6">Subscribe</h2>

          <p className="text-base text-gray-9 mb-6">
            Stay informed with the latest resources, events, and support tools.
          </p>

          <form className="flex gap-3" onSubmit={handleSubmit(onSubmit)}>
            <Controller
              control={control}
              name="email"
              rules={{
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Invalid email address",
                },
              }}
              render={({
                field: { onChange, value, onBlur },
                fieldState: { error },
              }) => (
                <Input
                  classes={{ input: "bg-white" }}
                  placeholder="Enter email address"
                  onChange={onChange}
                  onBlur={onBlur}
                  value={value}
                  errorText={error?.message}
                />
              )}
            />
            <Button
              variant="secondary"
              size="sm"
              className="h-12"
              type="submit"
            >
              Sign Up
            </Button>
          </form>
        </div>
      </div>

      {/* copyright */}
      <div className="bg-primary-3">
        <div className="container mx-auto py-8 px-5 flex flex-wrap flex-col justify-center items-center sm:flex-row">
          <p className="text-gray-9 font-medium text-base">
            {footerData?.copyright}
          </p>
        </div>
      </div>
    </footer>
  );
}
