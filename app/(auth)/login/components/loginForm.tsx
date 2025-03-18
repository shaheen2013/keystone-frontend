"use client";

import Link from "next/link";
import Image from "next/image";
import { useForm, SubmitHandler, Controller } from "react-hook-form";

import { Button } from "@/components/shadcn/button";
import { Checkbox } from "@/components/shadcn/checkbox";
import { Input, InputPassword } from "@/components/shadcn/input";

export default function LoginForm() {
  type FormValues = {
    email: string;
    password: string;
    keepSigned: boolean;
  };

  const { handleSubmit, control } = useForm<FormValues>({
    defaultValues: {
      email: "",
      password: "",
      keepSigned: false,
    },
  });

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    console.log(data);
  };

  return (
    <div className="flex flex-col justify-between items-center h-screen px-4 lg:pt-5 pt-20">
      <div className="flex justify-center items-center lg:h-full">
        <div className="max-w-[520px] w-full bg-primary-2 rounded-2xl lg:p-10 p-5">
          {/* brand logo */}
          <div className="flex items-center justify-center lg:mb-8 mb-6">
            <Image
              src="/icons/brand-logo.svg"
              alt="logo"
              width={150}
              height={65}
              className="lg:w-[150px] w-[120px] lg:h-[65px] h-[50px]"
              priority
            />
          </div>

          {/* title */}
          <h2 className="lg:text-3xl text-xl font-bold text-center mb-4">
            Welcome Back to Keystone Ability Support
          </h2>

          {/* subtitle  */}
          <p className="text-gray-8 lg:text-base text-sm text-center lg:mb-8 mb-6">
            Log in to access your personalized resources, upcoming events, saved
            guides, and more.
          </p>

          {/* form */}
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* email */}
            <div className="mb-4">
              <div>
                <label htmlFor="email" className="text-base text-gray-9 mb-2">
                  Email
                </label>

                <Controller
                  control={control}
                  name="email"
                  rules={{
                    required: "Email is required",
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: "Invalid email address",
                    },
                  }}
                  render={({
                    field: { onChange, value, onBlur },
                    fieldState: { error },
                  }) => (
                    <Input
                      classes={{ input: "bg-white" }}
                      placeholder="Enter email address"
                      onChange={onChange}
                      onBlur={onBlur}
                      value={value}
                      errorText={error?.message}
                    />
                  )}
                />
              </div>
            </div>

            {/* password */}
            <div className="mb-3">
              <Controller
                control={control}
                name="password"
                rules={{
                  required: "Password is required",
                  minLength: { value: 8, message: "Minimum length is 8" },
                  maxLength: { value: 100, message: "Maximum length is 100" },
                }}
                render={({
                  field: { onChange, value, onBlur },
                  fieldState: { error },
                }) => (
                  <div>
                    <label
                      htmlFor="password"
                      className="text-base text-gray-9 mb-2"
                    >
                      Password
                    </label>
                    <InputPassword
                      className="bg-white"
                      placeholder="********"
                      onChange={onChange}
                      onBlur={onBlur}
                      value={value}
                      errorText={error?.message}
                    />
                  </div>
                )}
              />
            </div>

            {/* remember/forget password */}
            <div className="lg:mb-8 mb-6 flex justify-between">
              <div className="flex items-center gap-2">
                <Controller
                  control={control}
                  name="keepSigned"
                  render={({ field: { onChange, value, onBlur } }) => (
                    <Checkbox
                      id="keepSigned"
                      variant="secondary"
                      checked={value}
                      onCheckedChange={onChange}
                      onBlur={onBlur}
                    />
                  )}
                />

                <label htmlFor="keepSigned" className="lg:text-base text-sm">
                  Keep me signed in.
                </label>
              </div>

              <div>
                <Button
                  asChild
                  size="none"
                  variant="link-secondary"
                  type="button"
                >
                  <Link
                    href="/forgot-password"
                    className="font-semibold lg:text-base text-sm"
                  >
                    Forgot password
                  </Link>
                </Button>
              </div>
            </div>

            {/* submit */}
            <Button variant="secondary" className="w-full" loading={false}>
              Login
            </Button>
          </form>

          <div className="flex items-center gap-2 my-4">
            <div className="flex-1 border-t border-primary-3"></div>
            <div className="text-gray-800 text-sm font-medium">OR</div>
            <div className="flex-1 border-t border-primary-3"></div>
          </div>

          <Button
            className="w-full bg-white border border-primary-3 mb-4"
            variant="ghost"
          >
            <Image
              src="/assets/auth/google.svg"
              alt="google"
              width={24}
              height={24}
              className="h-6 w-6"
            />
            Sign in with Google
          </Button>

          <div className="flex justify-center">
            <p className="lg:text-base text-sm">
              Don&apos;t have an account?{" "}
              <Link href="/signup" className="text-secondary-6 font-semibold">
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>

      <p className="text-gray-9 lg:text-base text-xs font-medium py-6 lg:mt-0 mt-8">
        © 2025 Keystone Ability Support. All Rights Reserved.
      </p>
    </div>
  );
}
