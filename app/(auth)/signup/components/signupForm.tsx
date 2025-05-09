"use client";

import Cookies from "js-cookie";
import Link from "next/link";
import { useForm, SubmitHandler, Controller } from "react-hook-form";

import { Button } from "@/components/shadcn/button";
import { Checkbox } from "@/components/shadcn/checkbox";
import { Input, InputPassword } from "@/components/shadcn/input";
import { useRegisterMutation } from "@/features/auth/authSlice";
import { useRouter } from "next/navigation";
import GoogleSignIn from "@/components/partials/social-signin/google";
import Logo from "@/components/partials/logo";
import CopyRight from "@/components/partials/copy-right";

export default function SignupForm() {
  const router = useRouter();
  const [register, { isLoading }] = useRegisterMutation();
  type FormValues = {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
    termsAndCondition: boolean;
  };

  const { handleSubmit, control, setError } = useForm<FormValues>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      termsAndCondition: false,
    },
  });

  interface SignUpError {
    data?: {
      errors?: {
        email?: string[];
        password?: string[];
        password_confirmation?: string[];
      };
    };
  }

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    const payload = {
      name: data.name,
      email: data.email,
      password: data.password,
      password_confirmation: data.confirmPassword,
      accept: data.termsAndCondition,
    };
    try {
      const res: any = await register(payload).unwrap();

      if (res.success) {
        const token = res.data.access_token;
        Cookies.set("key_stone_token", token, {
          secure: true,
          sameSite: "strict",
          expires: 7,
        });
        router.push("/profile/overview");
      }
    } catch (error) {
      handleAuthError(error as SignUpError);
    }
  };

  const handleAuthError = (error: SignUpError) => {
    const errors = error?.data?.errors;

    if (!errors) return;

    if (errors.email?.length) {
      setError("email", {
        type: "manual",
        message: errors.email.join(", "),
      });
    }

    if (errors.password?.length) {
      setError("password", {
        type: "manual",
        message: errors.password.join(", "),
      });
    }

    if (errors.password_confirmation?.length) {
      setError("confirmPassword", {
        type: "manual",
        message: errors.password_confirmation.join(", "),
      });
    }
  };

  return (
    <div className="flex flex-col justify-between items-center h-screen px-4 pt-12">
      <div className=" flex justify-center items-center">
        <div className="max-w-[520px] w-full  bg-primary-2 rounded-2xl lg:p-10 p-5">
          {/* brand logo */}
          <div className="flex items-center justify-center lg:mb-8 mb-6">
            <Logo />
          </div>

          {/* title */}
          <h2 className="lg:text-3xl text-xl font-bold text-center mb-4">
            Join Keystone Ability Support
          </h2>

          {/* subtitle  */}
          <p className="text-gray-8 lg:text-base text-sm text-center lg:mb-8 mb-6">
            Create an account to access expert guidance, support groups,
            resources, & community connections.
          </p>

          {/* form */}
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* name */}
            <div className="mb-4">
              <div>
                <label htmlFor="name" className="text-base text-gray-9 mb-2">
                  Name <span className="text-orange-500">*</span>
                </label>

                <Controller
                  control={control}
                  name="name"
                  rules={{
                    required: "Name is required",
                    minLength: { value: 3, message: "Minimum length is 3" },
                    maxLength: { value: 100, message: "Maximum length is 100" },
                  }}
                  render={({
                    field: { onChange, value, onBlur },
                    fieldState: { error },
                  }) => (
                    <Input
                      classes={{ input: "bg-white" }}
                      placeholder="Enter full name"
                      onChange={onChange}
                      onBlur={onBlur}
                      value={value}
                      errorText={error?.message}
                    />
                  )}
                />
              </div>
            </div>

            {/* email */}
            <div className="mb-4">
              <div>
                <label htmlFor="email" className="text-base text-gray-9 mb-2">
                  Email <span className="text-orange-500">*</span>
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
                      type="email"
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
                      Password <span className="text-orange-500">*</span>
                    </label>
                    <InputPassword
                      className="bg-white"
                      placeholder="Enter password"
                      onChange={onChange}
                      onBlur={onBlur}
                      value={value}
                      errorText={error?.message}
                    />
                  </div>
                )}
              />
            </div>
            {/* confirm password */}
            <div className="mb-3">
              <Controller
                control={control}
                name="confirmPassword"
                rules={{
                  required: "Confirm Password is required",
                  minLength: { value: 8, message: "Minimum length is 8" },
                  maxLength: { value: 100, message: "Maximum length is 100" },
                }}
                render={({
                  field: { onChange, value, onBlur },
                  fieldState: { error },
                }) => (
                  <div>
                    <label
                      htmlFor="confirmPassword"
                      className="text-base text-gray-9 mb-2"
                    >
                      Confirm Password{" "}
                      <span className="text-orange-500">*</span>
                    </label>
                    <InputPassword
                      className="bg-white"
                      placeholder="Enter confirm password"
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
                  name="termsAndCondition"
                  rules={{ required: "Agree to terms and conditions" }}
                  render={({
                    field: { onChange, value, onBlur },
                    fieldState: { error },
                  }) => (
                    <Checkbox
                      id="termsAndCondition"
                      variant="secondary"
                      checked={value}
                      onCheckedChange={onChange}
                      onBlur={onBlur}
                      className={error && "border-red-500"}
                    />
                  )}
                />

                <label
                  htmlFor="termsAndCondition"
                  className="lg:text-base text-sm"
                >
                  Agree to{" "}
                  <Button
                    asChild
                    size="none"
                    variant="link-secondary"
                    type="button"
                  >
                    <Link
                      href="/terms-and-conditions"
                      className="font-semibold lg:text-base text-sm"
                    >
                      Terms
                    </Link>
                  </Button>{" "}
                  &{" "}
                  <Button
                    asChild
                    size="none"
                    variant="link-secondary"
                    type="button"
                  >
                    <Link
                      href="/privacy-policy"
                      className="font-semibold lg:text-base text-sm"
                    >
                      Privacy Policy
                    </Link>
                  </Button>
                </label>
              </div>
            </div>

            {/* submit */}
            <Button variant="secondary" className="w-full" loading={isLoading}>
              Sign Up
            </Button>
          </form>

          <div className="flex items-center gap-2 my-4">
            <div className="flex-1 border-t border-primary-3"></div>
            <div className="text-gray-800 text-sm font-medium">OR</div>
            <div className="flex-1 border-t border-primary-3"></div>
          </div>

          <GoogleSignIn />

          <div className="flex justify-center">
            <p className="lg:text-base text-sm">
              Already have an account?{" "}
              <Link href="/login" className="text-secondary-6 font-semibold">
                Log In
              </Link>
            </p>
          </div>
        </div>
      </div>

      <CopyRight />
    </div>
  );
}
