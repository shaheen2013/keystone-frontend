"use client";

import Link from "next/link";
import Image from "next/image";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { useSearchParams, useRouter } from "next/navigation";

import { Button } from "@/components/shadcn/button";
import { InputOTP, InputOTPSlot } from "@/components/shadcn/input-otp";
import { cn } from "@/lib/utils";
import { useDispatch } from "react-redux";
import { shareOtpToken } from "@/features/auth/otpSlice";
import {
  useForgotPasswordMutation,
  useVerifyOtpMutation,
} from "@/features/auth/authSlice";
import { useEffect } from "react";

export default function OTPForm({ className }: { className?: string }) {
  type FormValues = {
    otp: string;
  };

  // const [isDisabled, setIsDisabled] = useState(true);
  // console.log("isDisabled", isDisabled);

  const dispatch = useDispatch();

  const searchParams = useSearchParams();
  const router = useRouter();
  const email = searchParams.get("email");
  // let resetTime = searchParams.get("reset-time");
  const {
    handleSubmit,
    control,

    reset,
    setError,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      otp: "",
    },
  });

  const [verifyOtp, { isLoading }] = useVerifyOtpMutation();
  console.log("verifyOtp", verifyOtp);
  const [forgotPassword] = useForgotPasswordMutation();

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    console.log(data);
    const payload = { ...data, email };
    try {
      const response: any = await verifyOtp(payload).unwrap();
      if (response?.success) {
        dispatch(shareOtpToken(response.data.password_reset_token));
        router.push(`/reset-password?email=${email}`);
      }
    } catch (error: any) {
      const otpErrors = error?.data?.errors?.otp;
      setError("otp", {
        type: "manual",
        message: otpErrors?.join(", "),
      });
    }
  };

  const handleResendOtp = async () => {
    reset();
    dispatch(shareOtpToken(""));
    try {
      await forgotPassword({ email }).unwrap();
    } catch (error: any) {
      const otpErrors = error?.data?.errors?.email;

      setError("otp", {
        type: "manual",
        message: otpErrors?.join(", "),
      });
    }
  };

  useEffect(() => {
    if (!email) router.push("/forgot-password");
  }, [email, router]);

  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     setIsDisabled(false);
  //   }, 3000);

  //   return () => clearTimeout(timer);
  // }, [resetTime]);

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
        Verify OTP
      </h2>

      {/* subtitle  */}
      <p className="text-gray-8 lg:text-base text-sm text-center lg:mb-8 mb-6">
        Please check your{" "}
        <Link
          href={`mailto:${email}`}
          className="text-secondary-6 font-semibold"
        >
          {email}
        </Link>{" "}
        and enter your OTP code in the box below.
      </p>

      {/* form */}
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
        <div className="mb-6">
          <Controller
            control={control}
            name="otp"
            rules={{ required: true, minLength: 4 }}
            render={({ field }) => (
              <InputOTP
                maxLength={6}
                value={field.value}
                onChange={field.onChange}
              >
                {[0, 1, 2, 3, 4, 5].map((i) => (
                  <InputOTPSlot
                    key={i}
                    index={i}
                    className="bg-white rounded-xl border-gray-2"
                  />
                ))}
              </InputOTP>
            )}
          />
          <span className="text-red-500 text-sm block mt-2">
            {errors.otp && errors.otp.message}
          </span>
        </div>

        <Button
          variant="secondary"
          className="w-full mb-4"
          loading={isLoading}
          type="submit"
        >
          Verify & Proceed
        </Button>

        <button
          className="text-secondary-6 lg:text-base text-sm text-center font-semibold cursor-pointer disabled:text-gray-5 disabled:cursor-not-allowed"
          // disabled={isDisabled}
          onClick={handleResendOtp}
          type="button"
        >
          Resend OTP
        </button>
      </form>
    </div>
  );
}
