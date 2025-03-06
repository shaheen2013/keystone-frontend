import { cn } from "@/lib/utils";
import React from "react";

export default function Loader({ className }: { className?: string }) {
  const clx = cn("loader", "w-8 h-8", className);

  return <div className={clx}></div>;
}
