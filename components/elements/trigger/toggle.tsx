"use client";

import {
  type ChangeEvent,
  forwardRef,
  type InputHTMLAttributes,
  useCallback,
  useId,
  useState,
} from "react";

import { cn } from "@/styles/functions";

type ToggleStatus = "default" | "error" | "success";

type ToggleSize = "default" | "large";

type ToggleProps = {
  label?: string;
  size?: ToggleSize;
  checked?: boolean;
  helperText?: string;
  error?: string;
  success?: string;
  required?: boolean;
  onChange?: (checked: boolean) => void;
} & Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "type" | "checked" | "size" | "onChange"
>;

export const Toggle = forwardRef<HTMLInputElement, ToggleProps>(
  (
    {
      id,
      label,
      size = "default",
      checked = false,
      helperText,
      error,
      success,
      required,
      disabled,
      className,
      onChange,
      "aria-describedby": ariaDescribedBy,
      ...props
    },
    ref,
  ) => {
    const [isChecked, setIsChecked] = useState<boolean>(checked);

    const change = useCallback(
      (e: ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.checked;
        setIsChecked(newValue);

        if (onChange) {
          onChange(newValue);
        }
      },
      [onChange],
    );

    const defaultId = useId();

    const inputId = id || defaultId;

    const messageId = `${inputId}-message`;

    const hasError = !!error;

    const hasSuccess = !hasError && !!success;

    const message = error || success || helperText;

    const status: ToggleStatus = hasError
      ? "error"
      : hasSuccess
        ? "success"
        : "default";

    const statusTextStyles = {
      default: "text-secondary",
      success: "text-success",
      error: "text-error",
    };

    const statusBorderStyles = {
      default: "border-outline",
      success: "border-success",
      error: "border-error",
    };

    const labelSizeStyles = {
      default: "text-base",
      large: "text-lg",
    };

    const toggleSizeStyles = {
      default: "h-6 w-11",
      large: "h-8 w-14",
    };

    const thumbnailSizeStyles = {
      default: "h-5 w-5 translate-x-0.5",
      large: "h-7 w-7 translate-x-0.5",
    };

    const thumbnailTranslateStyles = {
      default: "translate-x-5.5",
      large: "translate-x-6.5",
    };

    const classNames = cn("peer sr-only", className);

    return (
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-2">
          <div className="relative flex items-center">
            <input
              ref={ref}
              type="checkbox"
              id={inputId}
              checked={isChecked}
              disabled={disabled}
              required={required}
              className={classNames}
              aria-invalid={hasError}
              aria-describedby={message ? messageId : ariaDescribedBy}
              onChange={change}
              {...props}
            />
            <label
              htmlFor={inputId}
              className={cn(
                "relative inline-flex cursor-pointer items-center rounded-full bg-outline transition-colors duration-200",
                isChecked ? "bg-brand" : "bg-outline",
                toggleSizeStyles[size],
                disabled && "disabled",
                statusBorderStyles[status],
              )}
            >
              <span className="sr-only">{label || "切り替えスイッチ"}</span>
              <span
                className={cn(
                  "absolute rounded-full bg-foreground transition-transform duration-200",
                  thumbnailSizeStyles[size],
                  isChecked ? thumbnailTranslateStyles[size] : "",
                )}
              />
            </label>
          </div>

          {label && (
            <label
              htmlFor={inputId}
              className={cn(
                "flex cursor-pointer items-center font-medium text-primary",
                labelSizeStyles[size],
                disabled && "disabled",
              )}
            >
              {label}
              {required && <span className="mt-1 ml-1 text-error">*</span>}
            </label>
          )}
        </div>

        {message && (
          <p
            id={messageId}
            className={cn("mt-1 select-none text-sm", statusTextStyles[status])}
          >
            {message}
          </p>
        )}
      </div>
    );
  },
);

Toggle.displayName = "Toggle";
