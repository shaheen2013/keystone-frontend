import { Metadata } from "next";
import ResetForm from "@/app/(auth)/reset-password/components/resetForm";
import { Suspense } from "react";
import CopyRight from "@/components/partials/copy-right";

export const metadata: Metadata = {
  title: "Reset Password | Keystone | A Place for Connection & Support",
  description:
    "A platform for online communities, the Disability Platform, and Atypical Advantage",
};

export default function ResetPassword() {
  return (
    <div className="flex flex-col justify-between items-center h-screen px-4 lg:pt-5 pt-20">
      <div className=" flex justify-center items-center lg:h-full">
        <Suspense fallback={<div className="h-full w-full"> Loading...</div>}>
          <ResetForm />
        </Suspense>
      </div>
      <CopyRight />
    </div>
  );
}
