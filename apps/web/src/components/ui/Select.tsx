import { type SelectHTMLAttributes, forwardRef } from "react";

export interface SelectOption {
  value: string;
  label: string;
}

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  options?: SelectOption[];
  placeholder?: string;
  error?: boolean;
}

const Select = forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      options = [],
      placeholder,
      error = false,
      className = "",
      children,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      "w-full rounded-md border px-3 py-2 text-sm text-gray-900 shadow-sm transition focus:outline-none focus:ring-1";

    const stateStyles = error
      ? "border-red-300 focus:border-red-500 focus:ring-red-500"
      : "border-gray-300 focus:border-blue-500 focus:ring-blue-500";

    const disabledStyles = props.disabled
      ? "cursor-not-allowed bg-gray-50 opacity-60"
      : "bg-white";

    const combinedClassName = `${baseStyles} ${stateStyles} ${disabledStyles} ${className}`;

    return (
      <select ref={ref} className={combinedClassName} {...props}>
        {placeholder && <option value="">{placeholder}</option>}
        {options.length > 0
          ? options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))
          : children}
      </select>
    );
  }
);

Select.displayName = "Select";

export default Select;
