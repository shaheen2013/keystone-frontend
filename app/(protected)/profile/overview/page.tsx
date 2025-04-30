"use client";

import Image from "next/image";
import Cookies from "js-cookie";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { useEffect, useRef, useState } from "react";

import { Button } from "@/components/shadcn/button";
import { Input } from "@/components/shadcn/input";
import { useMeQuery, useUpdateMeMutation } from "@/features/auth/authSlice";
import { AccountOverviewSkeleton } from "./skeletons";
import { useRouter } from "next/navigation";

type FormValues = {
  name: string;
  email: string;
  phone: string;
  address: string;
  avatar?: File;
};

export default function AccountOverview() {
  const router = useRouter();
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [fileError, setFileError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { data, isLoading, isFetching, isError, error }: any = useMeQuery({});
  const [
    updateMe,
    { isLoading: isUpdating, isError: isUpdatingError, error: updateError },
  ]: any = useUpdateMeMutation();

  const loading = isLoading || isFetching;

  const { handleSubmit, control, reset, setError } = useForm<FormValues>({
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      address: "",
    },
  });

  useEffect(() => {
    if (data) {
      reset({
        name: data?.name || "",
        email: data?.email || "",
        phone: data?.phone || "",
        address: data?.address || "",
      });
      if (data?.avatar) {
        setPreviewImage(data.avatar);
      }
    }
  }, [data, reset]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Check file size (2MB = 2 * 1024 * 1024 bytes)
    const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB
    if (file.size > MAX_FILE_SIZE) {
      setFileError(
        "File size exceeds 2MB limit. Please choose a smaller file."
      );
      e.target.value = ""; // Clear the file input
      return;
    }

    setFileError(null);

    // Create preview URL if file is acceptable size
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewImage(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const onSubmit: SubmitHandler<FormValues> = async (formData) => {
    const formPayload = new FormData();

    // Append all form fields
    formPayload.append("name", formData.name);
    formPayload.append("email", formData.email);
    formPayload.append("phone", formData.phone);
    formPayload.append("address", formData.address);

    // Append the image file if it exists
    if (fileInputRef.current?.files?.[0]) {
      formPayload.append("avatar", fileInputRef.current.files[0]);
    }
    // Log FormData contents properly
    console.log("Form submitted with data:");
    for (const [key, value] of formPayload.entries()) {
      console.log(key, value);
    }

    try {
      const res = await updateMe(formPayload).unwrap();
      console.log("res", res);
    } catch (error: any) {
      const errors = error?.data?.errors;
      if (errors.name?.length) {
        setError("name", {
          type: "manual",
          message: errors.name.join(", "),
        });
      }
      if (errors.email?.length) {
        setError("email", {
          type: "manual",
          message: errors.email.join(", "),
        });
      }
      if (errors.phone?.length) {
        setError("phone", {
          type: "manual",
          message: errors.phone.join(", "),
        });
      }
      if (errors.address?.length) {
        setError("address", {
          type: "manual",
          message: errors.address.join(", "),
        });
      }
      if (errors.avatar?.length) {
        setFileError(errors.avatar.join(", "));
      }
    }
  };
  useEffect(() => {
    if (
      (isError && error.status === 401) ||
      (isUpdatingError && updateError.status === 401)
    ) {
      console.log("error", error);
      Cookies.remove("key_stone_token");
      router.push("/login");
    }
  }, [router, isError, error, isUpdatingError, updateError]);

  if (loading) return <AccountOverviewSkeleton />;

  return (
    <div className="bg-primary-1 rounded-2xl">
      <div className="font-semibold lg:text-2xl text-lg lg:py-6 lg:px-8 p-4  bg-primary-2 rounded-t-2xl">
        Profile Overview
      </div>

      {/* profile/upload */}
      <div className="lg:p-8 p-4">
        {/* Hidden file input */}

        <input
          type="file"
          ref={fileInputRef}
          onChange={handleImageChange}
          accept="image/*"
          className="hidden"
          title="Upload your profile picture"
        />

        {/* image/button */}
        <div className="lg:mb-12 mb-6">
          <div className="flex gap-6 items-end ">
            {(previewImage || data?.avatar) && (
              <Image
                src={previewImage || data.avatar}
                alt="profile picture"
                height={140}
                width={140}
                className="rounded-lg object-cover h-36 w-36 aspect-square"
              />
            )}

            <Button
              variant="secondary"
              type="button"
              onClick={triggerFileInput}
            >
              <span>Upload</span>
              <Image
                src="/assets/profile/upload.svg"
                alt="upload icon"
                height={24}
                width={24}
              />
            </Button>
          </div>
          {fileError && (
            <p className="text-red-500 text-sm mt-3">{fileError}</p>
          )}
        </div>

        {/* form */}
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-2 gap-x-6 gap-y-4 lg:mb-12 mb-6">
            {/*  name */}
            <div className="col-span-2">
              <label className="mb-1 block">Name</label>
              <Controller
                control={control}
                name="name"
                rules={{ required: "name is required" }}
                render={({
                  field: { onChange, value, onBlur },
                  fieldState: { error },
                }) => (
                  <Input
                    type="text"
                    className="bg-white"
                    placeholder="Enter name"
                    onChange={onChange}
                    onBlur={onBlur}
                    value={value}
                    errorText={error?.message}
                  />
                )}
              />
            </div>

            {/* email */}
            <div className="lg:col-span-1 col-span-2">
              <label htmlFor="email" className="mb-1 block">
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
                    type="email"
                    className="bg-white"
                    placeholder="Enter email address"
                    onChange={onChange}
                    onBlur={onBlur}
                    value={value}
                    errorText={error?.message}
                  />
                )}
              />
            </div>

            {/* phone number */}
            <div className="lg:col-span-1 col-span-2">
              <label className="mb-1 block">Phone Number</label>
              <Controller
                control={control}
                name="phone"
                render={({
                  field: { onChange, value, onBlur },
                  fieldState: { error },
                }) => (
                  <Input
                    type="tel"
                    className="bg-white"
                    placeholder="Enter your phone number"
                    onChange={onChange}
                    onBlur={onBlur}
                    value={value}
                    errorText={error?.message}
                  />
                )}
              />
            </div>

            {/* Address */}
            <div className="col-span-2">
              <label className="mb-1 block">Address</label>
              <Controller
                control={control}
                name="address"
                render={({
                  field: { onChange, value, onBlur },
                  fieldState: { error },
                }) => (
                  <Input
                    type="text"
                    className="bg-white"
                    placeholder="Enter your address"
                    onChange={onChange}
                    onBlur={onBlur}
                    value={value}
                    errorText={error?.message}
                  />
                )}
              />
            </div>
          </div>

          <Button variant="secondary" type="submit" disabled={isUpdating}>
            {isUpdating ? (
              <span className="flex items-center justify-center">
                <svg
                  className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Updating...
              </span>
            ) : (
              "Update"
            )}
          </Button>
        </form>
      </div>
    </div>
  );
}
