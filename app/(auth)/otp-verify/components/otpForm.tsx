"use client";

import Link from "next/link";
import Image from "next/image";
import { useForm, SubmitHandler } from "react-hook-form";

import { Button } from "@/components/shadcn/button";
import { InputOTP, InputOTPSlot } from "@/components/shadcn/input-otp";

export default function ResetPasswordForm() {
  type FormValues = {
    password: string;
    confirm_password: string;
  };

  const { handleSubmit, control, getValues } = useForm<FormValues>({
    defaultValues: {
      password: "",
      confirm_password: "",
    },
  });

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    console.log(data);
  };

  return (
    <div className="flex flex-col justify-between items-center h-screen px-4 lg:pt-5 pt-20">
      <div className=" flex justify-center items-center lg:h-full">
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
            Verify OTP
          </h2>

          {/* subtitle  */}
          <p className="text-gray-8 lg:text-base text-sm text-center lg:mb-8 mb-6">
            Please check your{" "}
            <Link
              href="mailto:example@gmail.com"
              className="text-secondary-6 font-semibold"
            >
              example@mail.com
            </Link>{" "}
            and enter your OTP code in the box below.
          </p>

          {/* form */}
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-6">
              <InputOTP maxLength={4}>
                <InputOTPSlot index={0} className="bg-white" />
                <InputOTPSlot index={1} className="bg-white" />
                <InputOTPSlot index={2} className="bg-white" />
                <InputOTPSlot index={3} className="bg-white" />
              </InputOTP>
            </div>

            {/* submit */}
            <Button variant="secondary" className="w-full" loading={false}>
              Verify & Proceed
            </Button>
          </form>
        </div>
      </div>

      <p className="text-gray-9 lg:text-base text-xs font-medium py-6 lg:mt-0 mt-8">
        © 2025 Keystone Ability Support. All Rights Reserved.
      </p>
    </div>
  );
}
