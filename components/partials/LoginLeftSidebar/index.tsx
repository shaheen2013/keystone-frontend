import React from "react";
import classNames from "classnames";
import Image from "next/image";

export default function LoginLeftSidebar({ className }: { className: string }) {
  const clx = classNames("", className);

  return (
    <div className={clx}>
      <Image
        src="https://dummyimage.com/720x480"
        alt="logo"
        width={720}
        height={480}
        className="object-cover w-full h-full"
      />
    </div>
  );
}
