import { Metadata } from "next";
import SignupForm from "@/app/(auth)/signup/components/signupForm";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Signup | Keystone | A Place for Connection & Support",
  description:
    "A platform for online communities, the Disability Platform, and Atypical Advantage",
};

export default function SignUp() {
  return (
    <Suspense>
      <SignupForm />
    </Suspense>
  );
}
