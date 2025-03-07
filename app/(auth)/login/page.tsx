import { Metadata } from "next";
import LoginForm from "@/app/(auth)/login/components/loginForm";

export const metadata: Metadata = {
  title: "Login | Keystone | A Place for Connection & Support",
  description:
    "A platform for online communities, the Disability Platform, and Atypical Advantage",
};

export default function Login() {
  return (
    <div>
      <LoginForm />
    </div>
  );
}
