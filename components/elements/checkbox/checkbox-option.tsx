"use client";

import { Check } from "lucide-react";
import {
  type ChangeEvent,
  forwardRef,
  type InputHTMLAttributes,
  useCallback,
  useContext,
  useId,
  useState,
} from "react";
import { useKeyboard } from "@/hooks";
import { cn } from "@/styles/functions";
import { CheckboxGroupState, type CheckboxSize } from "./checkbox-group";

export type CheckboxStatus = "default" | "error" | "success";

type CheckboxOptionProps = {
  label?: string;
  size?: CheckboxSize;
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

export const CheckboxOption = forwardRef<HTMLInputElement, CheckboxOptionProps>(
  (
    {
      id,
      label,
      size,
      checked,
      helperText,
      error,
      success,
      required,
      disabled,
      value,
      className,
      onChange,
      "aria-describedby": ariaDescribedBy,
      ...props
    },
    ref,
  ) => {
    const state = useContext(CheckboxGroupState);

    const [isChecked, setIsChecked] = useState(
      !!checked || (!!value && state.value.includes(value.toString())),
    );

    const change = useCallback(
      (e: ChangeEvent<HTMLInputElement>) => {
        if (onChange) {
          onChange(e.target.checked);
        }

        setIsChecked(e.target.checked);
      },
      [onChange],
    );

    const click = useCallback(() => {
      const value = !isChecked;

      if (onChange) {
        onChange(value);
      }

      setIsChecked(value);
    }, [onChange, isChecked]);

    const { keydown } = useKeyboard({
      Enter: click,
    });

    const defaultId = useId();

    const inputId = id || defaultId;

    const messageId = `${inputId}-message`;

    const hasError = !!error;

    const hasSuccess = !hasError && !!success;

    const message = error || success || helperText;

    const status: CheckboxStatus = hasError
      ? "error"
      : hasSuccess
        ? "success"
        : "default";

    const statusStyles = {
      default: "border-outline",
      success: "border-success",
      error: "border-error",
    };

    const statusTextStyles = {
      default: "text-secondary",
      success: "text-success",
      error: "text-error",
    };

    const containerSizeStyles = {
      default: "h-6 w-6",
      large: "h-8 w-8",
    };

    const checkSizeStyles = {
      default: "h-4 w-4",
      large: "h-5 w-5",
    };

    const labelSizeStyles = {
      default: "text-base",
      large: "text-lg mb-1",
    };

    const classNames = cn("peer sr-only", className);

    return (
      <div className="flex flex-col">
        <div className="flex items-start">
          <div className="flex h-11 items-center">
            <div className="relative flex items-center">
              <input
                ref={ref}
                type="checkbox"
                id={inputId}
                value={value}
                checked={isChecked}
                disabled={disabled}
                required={required}
                className={classNames}
                aria-invalid={hasError}
                aria-describedby={message ? messageId : ariaDescribedBy}
                onChange={change}
                {...props}
              />
              <div
                className={cn(
                  "no-min-size flex cursor-pointer items-center justify-center rounded border bg-foundation",
                  containerSizeStyles[size || state.size],
                  statusStyles[status],
                  isChecked && "border-brand bg-brand",
                  disabled && "disabled",
                )}
                role="button"
                tabIndex={disabled ? undefined : 0}
                onClick={disabled ? undefined : click}
                onKeyDown={disabled ? undefined : keydown}
              >
                <Check
                  className={cn(
                    "text-foreground opacity-0",
                    checkSizeStyles[size || state.size],
                    isChecked && "opacity-100",
                  )}
                  aria-hidden="true"
                />
              </div>
            </div>
          </div>

          {label && (
            <label
              htmlFor={inputId}
              className={cn(
                "ml-2 block cursor-pointer rounded font-medium text-primary",
                "flex min-h-11 items-center",
                labelSizeStyles[size || state.size],
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
            className={cn("select-none pb-2 text-xs", statusTextStyles[status])}
          >
            {message}
          </p>
        )}
      </div>
    );
  },
);

CheckboxOption.displayName = "CheckboxOption";
