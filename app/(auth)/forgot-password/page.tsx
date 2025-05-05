import { Metadata } from "next";
import ForgotPassword from "@/app/(auth)/forgot-password/components/forgotPasswordForm";
import CopyRight from "@/components/partials/copy-right";

export const metadata: Metadata = {
  title: "Forgot Password | Keystone | A Place for Connection & Support",
  description:
    "A platform for online communities, the Disability Platform, and Atypical Advantage",
};

export default function Login() {
  return (
    <div className="flex flex-col justify-between items-center h-screen px-4 pt-12">
      <div className="flex justify-center lg:h-full items-center">
        <ForgotPassword />
      </div>
      <CopyRight />
    </div>
  );
}
