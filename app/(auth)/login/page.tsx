"use client";

import { Button } from "@/components/shadcn/button";
import { Checkbox } from "@/components/shadcn/checkbox";
import { Input, InputPassword } from "@/components/shadcn/input";
import Image from "next/image";
import { useForm, SubmitHandler, Controller } from "react-hook-form";

export default function Login() {
  type FormValues = {
    email: string;
    password: string;
  };

  const { handleSubmit, control } = useForm<FormValues>();

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    console.log(data);
  };

  return (
    <div className="flex flex-col  justify-between items-center h-full px-4">
      <div className="h-full flex justify-center items-center">
        <div className="w-[520px] bg-primary-2 rounded-2xl p-10">
          {/* brand logo */}
          <div className="flex items-center justify-center mb-8">
            <Image
              src="/icons/brand-logo.svg"
              alt="logo"
              width={150}
              height={65}
              className="w-[150px] h-[65px] "
            />
          </div>

          {/* title */}
          <h2 className="text-3xl font-bold text-center mb-4">
            Welcome Back to Keystone Ability Support
          </h2>

          {/* subtitle  */}
          <p className="text-gray-8 text-base text-center mb-8">
            Log in to access your personalized resources, upcoming events, saved
            guides, and more.
          </p>

          {/* form */}
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4">
              <Controller
                control={control}
                name="email"
                render={({ field: { onChange, onBlur, value, ref } }) => (
                  <div>
                    <label
                      htmlFor="email"
                      className="text-base text-gray-9 mb-2"
                    >
                      Email
                    </label>
                    <Input
                      className="bg-white"
                      placeholder="Enter email address"
                    />
                  </div>
                )}
              />
            </div>

            <div className="mb-3">
              <Controller
                control={control}
                name="password"
                render={({ field: { onChange, onBlur, value, ref } }) => (
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
                    />
                  </div>
                )}
              />
            </div>

            {/* remember/forget password */}
            <div className="mb-8 flex justify-between">
              <div className="flex items-center gap-2">
                <Checkbox id="keepSign" />
                <label htmlFor="keepSign" className="text-base ">
                  Keep me signed in.
                </label>
              </div>

              <div>forgot password?</div>
            </div>

            {/* submit */}
            <Button variant="secondary" className="w-full">
              Login
            </Button>
          </form>
        </div>
      </div>

      <p className="text-gray-9 text-base font-medium py-6">
        © 2025 Keystone Ability Support. All Rights Reserved.
      </p>
    </div>
  );
}
