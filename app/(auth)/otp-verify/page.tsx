import { Metadata } from "next";
import OTPForm from "@/app/(auth)/otp-verify/components/otpForm";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Reset Password | Keystone | A Place for Connection & Support",
  description:
    "A platform for online communities, the Disability Platform, and Atypical Advantage",
};

export default function OTPVerify() {
  return (
    <div className="flex flex-col justify-between items-center h-screen px-4 lg:pt-5 pt-20">
      <div className=" flex justify-center items-center lg:h-full">
        <Suspense fallback={<div className="h-full w-full"> Loading...</div>}>
          <OTPForm />
        </Suspense>
      </div>
      <p className="text-gray-9 lg:text-base text-xs font-medium py-6 lg:mt-0 mt-8">
        © {new Date().getFullYear()} Keystone Ability Support. All Rights
        Reserved.
      </p>
    </div>
  );
}
