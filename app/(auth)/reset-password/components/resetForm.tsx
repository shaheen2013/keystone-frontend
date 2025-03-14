"use client";

import Image from "next/image";
import { useForm, SubmitHandler, Controller } from "react-hook-form";

import { Button } from "@/components/shadcn/button";
import { InputPassword } from "@/components/shadcn/input";

export default function ResetPasswordForm() {
  type FormValues = {
    password: string;
    confirm_password: string;
  };

  const { handleSubmit, control, getValues } = useForm<FormValues>({
    defaultValues: {
      password: "",
      confirm_password: "",
    },
  });

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    console.log(data);
  };

  return (
    <div className="flex flex-col justify-between items-center h-screen px-4 lg:pt-5 pt-20">
      <div className=" flex justify-center items-center lg:h-full">
        <div className="max-w-[520px] w-full  bg-primary-2 rounded-2xl lg:p-10 p-5">
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
            Create a New Password
          </h2>

          {/* subtitle  */}
          <p className="text-gray-8 lg:text-base text-sm text-center lg:mb-8 mb-6">
            Please enter your new password, which must be different from
            previously used passwords.
          </p>

          {/* form */}
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* password */}
            <div className="mb-4">
              <div>
                <label htmlFor="email" className="text-base text-gray-9 mb-2">
                  New Password
                </label>

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
                    <InputPassword
                      className="bg-white"
                      placeholder="********"
                      onChange={onChange}
                      onBlur={onBlur}
                      value={value}
                      errorText={error?.message}
                    />
                  )}
                />
              </div>
            </div>

            {/* confirm password */}
            <div className="lg:mb-6">
              <Controller
                control={control}
                name="confirm_password"
                rules={{
                  required: "Confirm Password is required",
                  validate: (value) =>
                    value === getValues("password") || "Passwords do not match",
                }}
                render={({
                  field: { onChange, value, onBlur },
                  fieldState: { error },
                }) => (
                  <div>
                    <label
                      htmlFor="confirm_password"
                      className="text-base text-gray-9 mb-2"
                    >
                      Confirm New Password
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

            {/* submit */}
            <Button variant="secondary" className="w-full" loading={false}>
              Reset Password
            </Button>
          </form>
        </div>
      </div>

      <p className="text-gray-9 lg:text-base text-xs font-medium py-6 lg:mt-0 mt-8">
        © 2025 Keystone Ability Support. All Rights Reserved.
      </p>
    </div>
  );
}
