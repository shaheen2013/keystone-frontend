"use client";

import React from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";

import { cn } from "@/lib/utils";
import {
  Select,
  SelectItem,
  SelectValue,
  SelectTrigger,
  SelectContent,
} from "@/components/shadcn/select";
import PublicLayout from "@/app/(public)/layout";

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();

  const menuItems = [
    { name: "Profile Overview", path: "/profile/overview" },
    { name: "Events", path: "/profile/events" },
    { name: "Saved Blogs", path: "/profile/saved-blogs" },
    { name: "Password", path: "/profile/password" },
  ];

  return (
    <PublicLayout>
      <div className="lg:flex container lg:min-h-[calc(100vh-100px)] gap-8 py-12">
        <div className="col-span-3 min-w-[370px] bg-primary-2 rounded-2xl hidden lg:block">
          <div className="font-semibold text-2xl py-6 px-8 bg-primary-3 rounded-t-2xl">
            My Account
          </div>

          <div className="p-8">
            {menuItems.map((item, index) => (
              <Link
                href={item.path}
                key={index}
                className={cn(
                  "mb-2 py-3 px-6 cursor-pointer rounded-xl hover:bg-primary-4 hover:text-white block font-semibold",
                  { "bg-primary-6 text-white": pathname === item.path }
                )}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>

        {/* mobile menu */}
        <div className="lg:hidden w-full mb-6">
          <div className="font-bold text-2xl mb-4">My Account</div>
          <Select
            onValueChange={(value) => router.push(value)}
            value={menuItems.find((item) => item.path === pathname)?.path}
          >
            <SelectTrigger>
              <SelectValue
                placeholder={
                  menuItems.find((item) => item.path === pathname)?.name
                }
              />
            </SelectTrigger>
            <SelectContent>
              {menuItems.map((item, index) => (
                <SelectItem
                  key={index}
                  value={item.path}
                  className={cn(
                    "cursor-pointer rounded-lg hover:bg-primary-4 hover:text-white block font-normal text-sm py-2 mb-1",
                    { "!bg-primary-6 !text-white": pathname === item.path }
                  )}
                >
                  {item.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* main content */}
        <div className="lg:col-span-9 w-full">{children}</div>
      </div>
    </PublicLayout>
  );
}
