import React from "react";
import Image from "next/image";

import LoginLeftSidebar from "@/components/partials/LoginLeftSidebar";

export default function AuthLayout({ children }: any) {
  return (
    <div className="grid grid-cols-12 h-screen">
      <LoginLeftSidebar className="dev lg:block hidden col-span-7" />
      <div className="lg:col-span-5 col-span-12 relative">
        {children}

        {/* <Image
          src="/assets/auth/pattern.png"
          alt="logo"
          width={720}
          height={480}
          className="object-fill w-full absolute bottom-[60px] right-0 -z-10"
          priority
        /> */}
      </div>
    </div>
  );
}
