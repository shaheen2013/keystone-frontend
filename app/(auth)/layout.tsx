import React from "react";
import Image from "next/image";

import AuthLeftSidebar from "@/components/partials/AuthLeftSidebar";

export default function AuthLayout({ children }: any) {
  return (
    <div className="grid grid-cols-12 h-screen">
      {/* left */}
      <div className="lg:block hidden col-span-7 relative">
        <div className="fixed top-0 left-0 w-[58.33%] h-full ">
          {/* Content here */}
          <AuthLeftSidebar className=" top-0 left-0 h-full" />
        </div>
      </div>

      {/* right */}
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
