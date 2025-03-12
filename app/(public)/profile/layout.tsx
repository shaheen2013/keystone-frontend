import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const menuItems = [
    { name: "Profile Overview", path: "/profile/overview" },
    { name: "Events", path: "/profile/events" },
    { name: "Saved Blogs", path: "/profile/saved-blogs" },
    { name: "Password", path: "/profile/password" },
  ];

  return (
    <div className="flex container lg:min-h-[calc(100vh-100px)] gap-8 py-12 dev">
      <div className="col-span-3 min-w-[370px] bg-primary-2 rounded-2xl">
        <div className="font-semibold text-2xl py-6 px-8 bg-primary-3 rounded-t-2xl">
          My Account
        </div>

        <div className="p-8">
          {menuItems.map((item, index) => {
            return (
              <Link
                href={item.path}
                key={index}
                className={cn(
                  "mb-2 py-3 px-6 cursor-pointer rounded-xl hover:bg-primary-4 hover:text-white block font-semibold",
                  {
                    "bg-primary-6 text-white": index == 0,
                  }
                )}
              >
                {item.name}
              </Link>
            );
          })}
        </div>
      </div>

      <div className="dev col-span-9 w-full">{children}</div>
    </div>
  );
}
