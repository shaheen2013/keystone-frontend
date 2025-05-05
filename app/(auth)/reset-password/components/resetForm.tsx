/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { useSearchParams, useRouter } from "next/navigation";

import Modal from "@/components/partials/Modal";
import { Button } from "@/components/shadcn/button";
import { InputPassword } from "@/components/shadcn/input";
import { cn } from "@/lib/utils";
import { useResetPasswordMutation } from "@/features/auth/authSlice";
import { useSelector } from "react-redux";
import Logo from "@/components/partials/logo";

export default function ResetPasswordForm({
  className,
}: {
  className?: string;
}) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const otpToken = useSelector((state: any) => state.otpToken);

  const email = searchParams.get("email");

  const [open, setOpen] = useState(false);

  type FormValues = {
    password: string;
    confirm_password: string;
  };

  interface passwordResetError {
    data?: {
      errors?: {
        email?: string[];
        token?: string[];
        password?: string[];
        password_confirmation?: string[];
      };
    };
  }

  const [resetPassword, { isLoading }] = useResetPasswordMutation();
  const { handleSubmit, control, getValues, setError } = useForm<FormValues>({
    defaultValues: {
      password: "",
      confirm_password: "",
    },
  });

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    const payload = {
      ...data,
      password_confirmation: data.confirm_password,
      token: otpToken,
      email,
    };
    try {
      const response: any = await resetPassword(payload).unwrap();

      if (response?.success) {
        setOpen(true);
      }
    } catch (error) {
      handleAuthError(error as passwordResetError);
    }
  };

  const handleAuthError = (error: passwordResetError) => {
    const errors = error?.data?.errors;

    if (!errors) return;

    if (errors.token?.length) {
      router.push("/forgot-password");
    }

    if (errors.email?.length) {
      router.push("/forgot-password");
    }

    if (errors.password?.length) {
      if (
        errors.password.includes("This password reset token is invalid.") ||
        errors.password.includes(
          "We can't find a user with that email address."
        )
      ) {
        router.push("/forgot-password");
      } else {
        setError("password", {
          type: "manual",
          message: errors.password.join(", "),
        });
      }
    }

    if (errors.password_confirmation?.length) {
      setError("confirm_password", {
        type: "manual",
        message: errors.password_confirmation.join(", "),
      });
    }
  };

  const handleOpenModal = () => {
    setOpen(false);
    router.push("/login");
  };

  useEffect(() => {
    if (!email || !otpToken) router.push("/forgot-password");
  }, [email, otpToken, router]);

  return (
    <>
      <div
        className={cn(
          "max-w-[520px] w-full  bg-primary-2 rounded-2xl lg:p-10 p-5",
          className
        )}
      >
        {/* brand logo */}
        <div className="flex items-center justify-center lg:mb-8 mb-6">
          <Logo />
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
          <div className="lg:mb-6 mb-4">
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
          <Button variant="secondary" className="w-full" loading={isLoading}>
            Reset Password
          </Button>
        </form>
      </div>

      {/* modal */}
      <Modal title="" open={open} onOpenChange={handleOpenModal}>
        <div className="flex items-center justify-center mb-10">
          <Image
            src="/confirmation-reset.svg"
            alt="logo"
            width={300}
            height={190}
            className="w-[300px] h-[200px]"
            priority
          />
        </div>

        <h2 className="text-gray-9 font-semibold text-2xl text-center mb-9">
          Your password has been reset successfully! You can now log in with
          your new credentials.
        </h2>

        <Button variant="secondary" className="w-full">
          Back to Log In
        </Button>
      </Modal>
    </>
  );
}
