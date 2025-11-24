import { type ButtonHTMLAttributes, forwardRef } from "react";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost";
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "secondary", className = "", ...props }, ref) => {
    const baseStyles =
      "inline-flex items-center justify-center rounded-md px-3 py-2 text-sm font-medium transition focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60";

    const variantStyles = {
      primary:
        "border border-blue-600 bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500",
      secondary:
        "border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 focus:ring-gray-500",
      ghost:
        "border border-transparent bg-transparent text-gray-700 hover:bg-gray-100 focus:ring-gray-500",
    };

    const combinedClassName = `${baseStyles} ${variantStyles[variant]} ${className}`;

    return <button ref={ref} className={combinedClassName} {...props} />;
  }
);

Button.displayName = "Button";

export default Button;
