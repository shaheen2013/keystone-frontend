import { Metadata } from "next";
import ForgotPassword from "@/app/(auth)/forgot-password/components/forgotPasswordForm";

export const metadata: Metadata = {
  title: "Forgot Password | Keystone | A Place for Connection & Support",
  description:
    "A platform for online communities, the Disability Platform, and Atypical Advantage",
};

export default function Login() {
  return (
    <div className="flex flex-col justify-between items-center h-screen px-4 lg:pt-5 pt-20">
      <div className="flex justify-center lg:h-full items-center">
        <ForgotPassword />
      </div>
      <p className="text-gray-9 lg:text-base text-xs font-medium py-6 lg:mt-0 mt-8">
        © 2025 Keystone Ability Support. All Rights Reserved.
      </p>
    </div>
  );
}
