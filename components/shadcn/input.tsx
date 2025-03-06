import * as React from "react";
import { cn } from "@/lib/utils";
import { EyeIcon, EyeOffIcon } from "lucide-react";

interface InputProps extends React.ComponentProps<"input"> {
  classes?: {
    root?: string;
    input?: string;
  };
  helperText?: string;
  errorText?: string;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    { classes, type, helperText, errorText, startIcon, endIcon, ...props },
    ref
  ) => {
    const hasError = Boolean(errorText);

    return (
      <div className={cn("w-full", classes.root)}>
        <div className="relative flex items-center">
          {startIcon && (
            <span className="absolute left-4 text-gray-500">{startIcon}</span>
          )}
          <input
            type={type}
            className={cn(
              "flex h-12 w-full rounded-xl border bg-transparent px-4 py-3 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-gray-6 focus-visible:outline-none focus-visible:ring-1 disabled:cursor-not-allowed disabled:opacity-50",
              hasError
                ? "border-red-500 focus-visible:ring-red-500"
                : "border-gray-300  focus-visible:ring-secondary-5",
              startIcon && "pl-12",
              endIcon && "pr-12",
              classes.input
            )}
            ref={ref}
            {...props}
          />
          {endIcon && (
            <span className="absolute right-4 text-gray-500">{endIcon}</span>
          )}
        </div>

        {/* Helper Text & Error Message */}
        {errorText ? (
          <p className="text-red-500 text-sm mt-1">{errorText}</p>
        ) : (
          helperText && (
            <p className="text-gray-500 text-sm mt-1">{helperText}</p>
          )
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

const InputPassword = React.forwardRef<HTMLInputElement, InputProps>(
  (
    { className, type, helperText, errorText, startIcon, endIcon, ...props },
    ref
  ) => {
    const [showPassword, setShowPassword] = React.useState(false);

    const handleTogglePassword = () => setShowPassword((prev) => !prev);

    const hasError = Boolean(errorText);

    return (
      <div className="w-full">
        <div className="relative flex items-center">
          {startIcon && (
            <span className="absolute left-4 text-gray-500">{startIcon}</span>
          )}
          <input
            type={showPassword ? "text" : "password"}
            className={cn(
              "flex h-12 w-full rounded-xl border bg-transparent px-4 py-3 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-gray-6 focus-visible:outline-none focus-visible:ring-1 disabled:cursor-not-allowed disabled:opacity-50",
              hasError
                ? "border-red-500 focus-visible:ring-red-500"
                : "border-gray-300  focus-visible:ring-secondary-5",
              startIcon && "pl-12",
              endIcon && "pr-12",
              className
            )}
            ref={ref}
            {...props}
          />
          {endIcon && (
            <span className="absolute right-4 text-gray-500">{endIcon}</span>
          )}

          <button
            type="button"
            className="absolute right-4 text-gray-500"
            onClick={handleTogglePassword}
          >
            {showPassword ? (
              <EyeOffIcon className="w-6 h-6" />
            ) : (
              <EyeIcon className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Helper Text & Error Message */}
        {errorText ? (
          <p className="text-red-500 text-sm mt-1">{errorText}</p>
        ) : (
          helperText && (
            <p className="text-gray-500 text-sm mt-1">{helperText}</p>
          )
        )}
      </div>
    );
  }
);

export { Input, InputPassword };
