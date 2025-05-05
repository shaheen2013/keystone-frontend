"use client";

import Link from "next/link";
import { useState } from "react";
import Image from "next/image";
import { useForm, SubmitHandler, Controller } from "react-hook-form";

import Cookies from "js-cookie";
import Modal from "@/components/partials/Modal";
import { Button } from "@/components/shadcn/button";
import { InputPassword } from "@/components/shadcn/input";
import { useUpdatePasswordMutation } from "@/features/auth/authSlice";
import { useRouter } from "next/navigation";

export default function AccountPassword() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [updatePassword, { isLoading }]: any = useUpdatePasswordMutation();

  type FormValues = {
    oldPassword: string;
    newPassword: string;
    confirmPassword: string;
  };

  interface updatePasswordError {
    data?: {
      errors?: {
        current_password?: string[];
        password?: string[];
        password_confirmation?: string[];
      };
    };
  }

  const { handleSubmit, control, getValues, clearErrors, reset, setError } =
    useForm<FormValues>({
      defaultValues: {
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
      },
    });

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    const payload = {
      current_password: data.oldPassword,
      password: data.newPassword,
      password_confirmation: data.confirmPassword,
    };
    try {
      await updatePassword(payload).unwrap();
      setOpen(false);
      reset();
    } catch (error: any) {
      if (error.status === 401) {
        router.push("/login");
        Cookies.remove("key_stone_token");
      } else {
        handleError(error as updatePasswordError);
      }
    }
  };

  const handleError = (error: updatePasswordError) => {
    const errors = error?.data?.errors;

    if (!errors) return;

    if (errors.current_password?.length) {
      setError("oldPassword", {
        type: "manual",
        message: errors.current_password.join(", "),
      });
    }

    if (errors.password?.length) {
      setError("newPassword", {
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
    <div className="bg-primary-1 rounded-2xl">
      <div className="font-semibold lg:text-2xl text-lg lg:py-6 lg:px-8 p-4  bg-primary-2 rounded-t-2xl">
        Password
      </div>

      {/* content */}
      <div
        className="lg:p-8 p-4"
        onClick={() => {
          clearErrors();
          setOpen(true);
        }}
      >
        <div className="bg-white lg:p-6 py-3 px-4 rounded-xl border border-primary-2 flex justify-between hover:border-secondary-4">
          <div>
            <p className="lg:text-xl text-sm font-medium">Change Password</p>
          </div>

          <div>
            <Image
              src="/icons/chevron-right.svg"
              width={24}
              height={24}
              alt=""
            />
          </div>
        </div>
      </div>

      {/* modal */}
      <Modal title="Change Password" open={open} onOpenChange={setOpen}>
        <form onSubmit={handleSubmit(onSubmit)} className="">
          {/* old password */}
          <div className="mb-3">
            <Controller
              control={control}
              name="oldPassword"
              rules={{
                required: "Old password is required",
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
                    className="text-base text-gray-9 mb-1 block"
                  >
                    Old Password
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

          {/* new password */}
          <div className="mb-3">
            <Controller
              control={control}
              name="newPassword"
              rules={{
                required: "New password is required",
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
                    className="text-base text-gray-9 mb-1 block"
                  >
                    New Password
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

          {/* confirm password */}
          <div className="mb-6">
            <Controller
              control={control}
              name="confirmPassword"
              rules={{
                required: "Confirm password is required",
                minLength: { value: 8, message: "Minimum length is 8" },
                maxLength: { value: 100, message: "Maximum length is 100" },
                validate: (value) => {
                  if (value === getValues("newPassword")) {
                    return true;
                  }
                  return "Passwords do not match";
                },
              }}
              render={({
                field: { onChange, value, onBlur },
                fieldState: { error },
              }) => (
                <div>
                  <label
                    htmlFor="password"
                    className="text-base text-gray-9 mb-1 block"
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

          {/* submit button */}
          <div className="flex justify-between gap-3 mb-4">
            <Button
              type="button"
              variant="outline"
              className="w-full md:w-1/2"
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>

            <Button
              type="submit"
              variant="secondary"
              className="w-full md:w-1/2"
              loading={isLoading}
            >
              Change
            </Button>
          </div>

          <p className="text-center mb-1 text-gray-700">
            If you don&apos;t remember your password, forget it.
          </p>

          <Button
            asChild
            className="block h-auto text-center text-sm"
            variant="link-secondary"
            type="button"
          >
            <Link href="/forgot-password">Forgot Password</Link>
          </Button>
        </form>
      </Modal>
    </div>
  );
}
