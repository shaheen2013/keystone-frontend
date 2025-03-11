"use client";

import Link from "next/link";
import Image from "next/image";
import { useForm, SubmitHandler, Controller } from "react-hook-form";

import { Input } from "@/components/shadcn/input";
import { Button } from "@/components/shadcn/button";

export default function forgotPasswordForm() {
  type FormValues = {
    email: string;
  };

  const { handleSubmit, control } = useForm<FormValues>({
    defaultValues: {
      email: "",
    },
  });

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    console.log(data);
  };

  return (
    <div className="flex flex-col justify-between items-center h-screen px-4 lg:pt-5 pt-20">
      <div className=" flex justify-center h-full items-center">
        <div className="max-w-[520px] w-full  bg-primary-2 rounded-2xl lg:p-10 p-5">
          {/* brand logo */}
          <div className="flex items-center justify-center lg:mb-8 mb-6">
            <Image
              src="/icons/brand-logo.svg"
              alt="logo"
              width={150}
              height={65}
              className="lg:w-[150px] w-[120px] lg:h-[65px] h-[50px]"
              priority
            />
          </div>

          {/* title */}
          <h2 className="lg:text-3xl text-xl font-bold text-center mb-4">
            Forgot Your Password?
          </h2>

          {/* subtitle  */}
          <p className="text-gray-8 lg:text-base text-sm text-center lg:mb-8 mb-6">
            Enter your email address below and we will send you an Verification
            code to reset it.
          </p>

          {/* form */}
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* email */}
            <div className="mb-6">
              <div>
                <label htmlFor="email" className="text-base text-gray-9 mb-2">
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
                      classes={{ input: "bg-white" }}
                      placeholder="Enter email address"
                      onChange={onChange}
                      onBlur={onBlur}
                      value={value}
                      errorText={error?.message}
                    />
                  )}
                />
              </div>
            </div>

            {/* submit */}
            <Button
              variant="secondary"
              className="w-full py-1 mb-3"
              loading={false}
            >
              Login
            </Button>
          </form>

          <div className="flex justify-center">
            <p className="lg:text-base text-sm">
              Back to{" "}
              <Link href="/login" className="text-secondary-6 font-semibold">
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>

      <p className="text-gray-9 lg:text-base text-xs font-medium py-6 lg:mt-0 mt-8">
        © 2025 Keystone Ability Support. All Rights Reserved.
      </p>
    </div>
  );
}
