import React from "react";
import Image from "next/image";
import { Button } from "@/components/shadcn/button";
import Link from "next/link";

export default function NotFound() {
  return (
    <main className="h-[calc(100vh-100px)] container mx-auto max-w-[620px] flex flex-col items-center justify-center px-4">
      <Image
        src="/assets/not-found.svg"
        alt="404"
        width={600}
        height={600}
        className="mb-20"
      />

      <p className="text-gray-9 font-semibold text-center mb-12">
        The page you are trying to access doesnt exist or has been moved. Try
        going back to our homepage.
      </p>

      <Button variant="secondary" asChild>
        <Link href="/">Go to homepage</Link>
      </Button>
    </main>
  );
}
