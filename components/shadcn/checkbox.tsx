"use client";

import * as React from "react";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { Check } from "lucide-react";

import { cn } from "@/lib/utils";

type CheckboxRef = React.ElementRef<typeof CheckboxPrimitive.Root>;
type CheckboxVariants = "primary" | "secondary";

interface CheckboxProps
  extends React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root> {
  variant?: CheckboxVariants;
}

const Checkbox = React.forwardRef<CheckboxRef, CheckboxProps>(
  ({ className, variant, ...props }, ref) => {
    // data-[state=checked]:text-primary-foreground
    const variantClasses = {
      primary: "bg-primary-5 text-primary-foreground",
      secondary:
        "data-[state=checked]:bg-secondary-6 data-[state=checked]:border-secondary-6",
    };

    const clx = cn(
      "peer h-5 w-5 shrink-0 rounded-sm border-2 border-primary shadow focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 overflow-hidden",
      className,
      variant && variantClasses[variant]
    );

    const checkClx = cn("flex items-center justify-center");

    return (
      <CheckboxPrimitive.Root ref={ref} className={clx} {...props}>
        <CheckboxPrimitive.Indicator className={checkClx}>
          <Check className="h-4 w-4 text-white" strokeWidth={4} />
        </CheckboxPrimitive.Indicator>
      </CheckboxPrimitive.Root>
    );
  }
);

Checkbox.displayName = CheckboxPrimitive.Root.displayName;

export { Checkbox };
