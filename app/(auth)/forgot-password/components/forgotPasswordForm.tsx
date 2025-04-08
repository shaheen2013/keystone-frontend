"use client";

import Link from "next/link";
import Image from "next/image";
import { useForm, SubmitHandler, Controller } from "react-hook-form";

import { Input } from "@/components/shadcn/input";
import { Button } from "@/components/shadcn/button";
import { cn } from "@/lib/utils";
import { useForgotPasswordMutation } from "@/features/auth/authSlice";
import { useRouter } from "next/navigation";

export default function ForgotPasswordForm({
  className,
}: {
  className?: string;
}) {
  type FormValues = {
    email: string;
  };

  const router = useRouter();

  const { handleSubmit, control } = useForm<FormValues>({
    defaultValues: {
      email: "",
    },
  });
  const [forgotPassword, { isLoading }] = useForgotPasswordMutation();
  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    console.log(data);
    try {
      const response = await forgotPassword(data).unwrap();
      if (response.success) {
        console.log(response);
        router.push(`/otp-verify?email=${data.email}`);
      }
    } catch (error) {
      console.log(error);
      router.push(`/otp-verify?email=${data.email}`);
    }
  };

  return (
    <div
      className={cn(
        "max-w-[520px] w-full  bg-primary-2 rounded-2xl lg:p-10 p-5",
        className
      )}
    >
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
        Forgot Your Password?
      </h2>

      {/* subtitle  */}
      <p className="text-gray-8 lg:text-base text-sm text-center lg:mb-8 mb-6">
        Enter your email address below and we will send you an Verification code
        to reset it.
      </p>

      {/* form */}
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* email */}
        <div className="mb-6">
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

        {/* submit */}
        <Button
          variant="secondary"
          className="w-full py-1 mb-3"
          loading={isLoading}
          type="submit"
        >
          Send OTP
        </Button>
      </form>

      <div className="flex justify-center">
        <p className="lg:text-base text-sm">
          Back to{" "}
          <Link href="/login" className="text-secondary-6 font-semibold">
            Log In
          </Link>
        </p>
      </div>
    </div>
  );
}
