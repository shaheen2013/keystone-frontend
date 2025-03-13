import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";
import Loader from "@/components/partials/Loader";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-md transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        primary:
          "bg-primary text-primary-foreground shadow hover:bg-primary-7 bg-primary-6",
        secondary:
          "text-white shadow bg-secondary-6 hover:bg-secondary-7 active:bg-secondary-6 focus:ring-4 focus:ring-secondary-2",
        destructive:
          "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
        outline:
          "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",

        ghost: "hover:bg-accent hover:text-accent-foreground",

        link: "text-gray-8 underline-offset-4",
        "link-secondary": "text-secondary-6",
      },
      size: {
        default: "h-12 rounded-xl px-8 text-lg font-semibold",
        sm: "h-6 rounded-xl px-6 text-base font-semibold",
        md: "h-7 text-lg font-semibold",
        lg: "h-14 rounded-xl px-8 text-lg font-semibold",
        icon: "h-9 w-9",
        none: "",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  loading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { children, className, variant, size, asChild = false, loading, ...props },
    ref
  ) => {
    const Comp = asChild ? Slot : "button";

    return (
      <Comp
        disabled={loading}
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      >
        {loading ? <Loader /> : children}
      </Comp>
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
