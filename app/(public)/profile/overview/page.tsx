"use client";

import Image from "next/image";
import { useForm, SubmitHandler, Controller } from "react-hook-form";

import { Button } from "@/components/shadcn/button";
import { Input } from "@/components/shadcn/input";

export default function AccountOverview() {
  type FormValues = {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    address: string;
  };

  const { handleSubmit, control } = useForm<FormValues>({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      address: "",
    },
  });

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    console.log(data);
  };

  return (
    <div className="bg-primary-1 rounded-2xl">
      <div className="font-semibold text-2xl py-6 px-8 bg-primary-2 rounded-t-2xl ">
        Profile Overview
      </div>

      {/* profile/upload */}
      <div className="p-8">
        {/* image/button */}
        <div className="flex gap-6 items-end mb-12">
          <Image
            src="https://dummyimage.com/140x140"
            alt="profile picture"
            height={140}
            width={140}
            className="rounded-lg"
          />

          <Button variant="secondary">
            <span>Upload</span>
            <Image
              src="/assets/profile/upload.svg"
              alt="upload icon"
              height={24}
              width={24}
            />
          </Button>
        </div>

        {/* form */}
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-2 gap-x-6 gap-y-4 mb-12">
            {/* first name */}
            <div className="lg:col-span-1 col-span-2">
              <label className="mb-1 block">First Name</label>
              <Controller
                control={control}
                name="firstName"
                rules={{ required: "First name is required" }}
                render={({
                  field: { onChange, value, onBlur },
                  fieldState: { error },
                }) => (
                  <Input
                    className="bg-white"
                    placeholder="Enter first name"
                    onChange={onChange}
                    onBlur={onBlur}
                    value={value}
                    errorText={error?.message}
                  />
                )}
              />
            </div>

            {/* last name */}
            <div className="lg:col-span-1 col-span-2">
              <label className="mb-1 block">Last Name</label>
              <Controller
                control={control}
                name="lastName"
                rules={{ required: "Last name is required" }}
                render={({
                  field: { onChange, value, onBlur },
                  fieldState: { error },
                }) => (
                  <Input
                    className="bg-white"
                    placeholder="Enter last name"
                    onChange={onChange}
                    onBlur={onBlur}
                    value={value}
                    errorText={error?.message}
                  />
                )}
              />
            </div>

            {/* email */}
            <div className="lg:col-span-1 col-span-2">
              <label htmlFor="email" className="mb-1 block">
                Email
              </label>
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
                    className="bg-white"
                    placeholder="Enter email address"
                    onChange={onChange}
                    onBlur={onBlur}
                    value={value}
                    errorText={error?.message}
                  />
                )}
              />
            </div>

            {/* phone number */}
            <div className="lg:col-span-1 col-span-2">
              <label className="mb-1 block">Phone Number</label>
              <Controller
                control={control}
                name="phone"
                rules={{ required: "Phone number is required" }}
                render={({
                  field: { onChange, value, onBlur },
                  fieldState: { error },
                }) => (
                  <Input
                    className="bg-white"
                    placeholder="(123) 456-7890"
                    onChange={onChange}
                    onBlur={onBlur}
                    value={value}
                    errorText={error?.message}
                  />
                )}
              />
            </div>

            {/* Address */}
            <div className="col-span-2">1</div>
          </div>
          <Button variant="secondary">Save Changes</Button>
        </form>
      </div>
    </div>
  );
}
