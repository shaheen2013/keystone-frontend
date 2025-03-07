import { Metadata } from "next";
import ResetForm from "@/app/(auth)/reset-password/components/resetForm";

export const metadata: Metadata = {
  title: "Reset Password | Keystone | A Place for Connection & Support",
  description:
    "A platform for online communities, the Disability Platform, and Atypical Advantage",
};

export default function ResetPassword() {
  return (
    <div>
      <ResetForm />
    </div>
  );
}
