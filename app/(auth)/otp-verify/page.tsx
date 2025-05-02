import { Metadata } from "next";
import OTPForm from "@/app/(auth)/otp-verify/components/otpForm";
import { Suspense } from "react";
import CopyRight from "@/components/partials/copy-right";

export const metadata: Metadata = {
  title: "OTP Verify | Keystone | A Place for Connection & Support",
  description:
    "A platform for online communities, the Disability Platform, and Atypical Advantage",
};

export default function OTPVerify() {
  return (
    <div className="flex flex-col justify-between items-center h-screen px-4 lg:pt-5 pt-20">
      <div className=" flex justify-center items-center lg:h-full">
        <Suspense>
          <OTPForm />
        </Suspense>
      </div>
      <CopyRight />
    </div>
  );
}
