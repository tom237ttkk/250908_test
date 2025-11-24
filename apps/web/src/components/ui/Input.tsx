import { type InputHTMLAttributes, forwardRef } from "react";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ error = false, className = "", ...props }, ref) => {
    const baseStyles =
      "w-full rounded-md border px-3 py-2 text-sm text-gray-900 shadow-sm transition focus:outline-none focus:ring-1";

    const stateStyles = error
      ? "border-red-300 focus:border-red-500 focus:ring-red-500"
      : "border-gray-300 focus:border-blue-500 focus:ring-blue-500";

    const disabledStyles = props.disabled
      ? "cursor-not-allowed bg-gray-50 opacity-60"
      : "bg-white";

    const combinedClassName = `${baseStyles} ${stateStyles} ${disabledStyles} ${className}`;

    return <input ref={ref} className={combinedClassName} {...props} />;
  }
);

Input.displayName = "Input";

export default Input;
