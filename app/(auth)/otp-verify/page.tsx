import { Metadata } from "next";
import OTPForm from "@/app/(auth)/otp-verify/components/otpForm";

export const metadata: Metadata = {
  title: "Reset Password | Keystone | A Place for Connection & Support",
  description:
    "A platform for online communities, the Disability Platform, and Atypical Advantage",
};

export default function OTPVerify() {
  return (
    <div>
      <OTPForm />
    </div>
  );
}
