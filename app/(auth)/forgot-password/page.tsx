import { Metadata } from "next";
import ForgotPassword from "@/app/(auth)/forgot-password/components/forgotPasswordForm";

export const metadata: Metadata = {
  title: "Forgot Password | Keystone | A Place for Connection & Support",
  description:
    "A platform for online communities, the Disability Platform, and Atypical Advantage",
};

export default function Login() {
  return (
    <div>
      <ForgotPassword />
    </div>
  );
}
