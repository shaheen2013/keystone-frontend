"use client";

import Link from "next/link";
import Image from "next/image";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { useSearchParams, useRouter } from "next/navigation";

import { Button } from "@/components/shadcn/button";
import { InputOTP, InputOTPSlot } from "@/components/shadcn/input-otp";
import { cn } from "@/lib/utils";
import { useDispatch, useSelector } from "react-redux";
import { setOtp } from "@/features/auth/tokenSlice";

export default function OTPForm({ className }: { className?: string }) {
  type FormValues = {
    otp: string;
  };

  const token = useSelector((state: any) => state.token);
  const dispatch = useDispatch();

  console.log(token, "token");

  const searchParams = useSearchParams();
  const router = useRouter();
  const email = searchParams.get("email");
  const { handleSubmit, control } = useForm<FormValues>({
    defaultValues: {
      otp: "",
    },
  });

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    console.log(data);
    // router.push("/reset-password");

    dispatch(setOtp("123"));
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
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-6">
          <Controller
            control={control}
            name="otp"
            rules={{ required: true, minLength: 4 }}
            render={({ field }) => (
              <InputOTP
                maxLength={4}
                value={field.value}
                onChange={field.onChange}
              >
                {[0, 1, 2, 3].map((i) => (
                  <InputOTPSlot
                    key={i}
                    index={i}
                    className="bg-white rounded-xl border-gray-2"
                  />
                ))}
              </InputOTP>
            )}
          />
        </div>

        <Button
          variant="secondary"
          className="w-full mb-4"
          loading={false}
          type="submit"
        >
          Verify & Proceed
        </Button>

        <p className="text-gray-8 lg:text-base text-sm text-center">
          <Link href="#" className="text-secondary-6 font-semibold">
            Resend OTP
          </Link>
        </p>
      </form>
    </div>
  );
}
