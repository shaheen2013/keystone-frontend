import * as React from "react";

import { cn } from "@/lib/utils";

const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.ComponentProps<"textarea"> & {
    errorText?: string;
  }
>(({ className, errorText, ...props }, ref) => {
  const hasError = Boolean(errorText);
  return (
    <>
      <textarea
        className={cn(
          "flex min-h-[60px] w-full rounded-xl border border-gray-2 hover:border-secondary-5 bg-transparent px-4 py-3 text-base shadow-sm placeholder:text-gray-6 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-secondary-5 disabled:cursor-not-allowed disabled:opacity-50",
          hasError && "border-red-500 focus-visible:ring-red-500",
          className
        )}
        ref={ref}
        {...props}
      />
      {/* Helper Text & Error Message */}
      {errorText && (
        <p className="text-red-500 text-sm mt-1 ml-1">{errorText}</p>
      )}
    </>
  );
});
Textarea.displayName = "Textarea";

export { Textarea };
